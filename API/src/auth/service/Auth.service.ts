import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';
import { Routes } from '../../routes/Routes.enum';
import { AuthException } from '../exceptions/auth.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { NonceEntity } from '../entity/nonce.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    private readonly BASE_URL: string;
    private readonly AUTH0_BASE_URL: string;
    private readonly AUTH0_CLIENT_ID: string;
    private readonly AUTH0_CLIENT_SECRET: string;
    private readonly AUTH0_AUTHORIZE_ROUTE: string;
    private readonly AUTH0_GET_TOKEN_ROUTE: string;
    private readonly AUTH0_AUTH_API_AUDIENCE: string;
    private readonly AUTH0_SCOPE: string;

    constructor(
        @InjectRepository(NonceEntity)
        private readonly nonceRepository: Repository<NonceEntity>,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) {
        this.BASE_URL = this.configService.get<string>('BASE_URL', '');
        this.AUTH0_BASE_URL = this.configService.get<string>(
            'AUTH0_BASE_URL',
            '',
        );
        this.AUTH0_CLIENT_ID = this.configService.get<string>(
            'AUTH0_CLIENT_ID',
            '',
        );
        this.AUTH0_CLIENT_SECRET = this.configService.get<string>(
            'AUTH0_CLIENT_SECRET',
            '',
        );
        this.AUTH0_AUTHORIZE_ROUTE = this.configService.get<string>(
            'AUTH0_AUTHORIZE_ROUTE',
            '',
        );
        this.AUTH0_GET_TOKEN_ROUTE = this.configService.get<string>(
            'AUTH0_GET_TOKEN_ROUTE',
            '',
        );
        this.AUTH0_AUTH_API_AUDIENCE = this.configService.get<string>(
            'AUTH0_AUTH_API_AUDIENCE',
            '',
        );
        this.AUTH0_SCOPE = this.configService.get<string>('AUTH0_SCOPE', '');
    }

    public async getAuthUrl(): Promise<string> {
        const nonce = this.generateRandomString();
        await this.nonceRepository.save({ nonce });
        const signedNonce = await this.jwtService.signAsync({ nonce });

        const queryParams: URLSearchParams = new URLSearchParams({
            audience: this.AUTH0_AUTH_API_AUDIENCE,
            response_type: 'code',
            client_id: this.AUTH0_CLIENT_ID,
            redirect_uri: `${this.BASE_URL}${Routes.BASE_API_ROUTE}${Routes.AUTH_ROUTE}${Routes.AUTH_CALLBACK_ROUTE}`,
            scope: this.AUTH0_SCOPE,
            state: signedNonce,
        });
        console.log(
            'redirect url: ',
            `${this.BASE_URL}${Routes.BASE_API_ROUTE}${Routes.AUTH_ROUTE}${Routes.AUTH_CALLBACK_ROUTE}`,
        );
        return `${this.AUTH0_BASE_URL}${this.AUTH0_AUTHORIZE_ROUTE}?${queryParams}`;
    }

    public async getToken(code: string, state: string): Promise<string> {
        try {
            const { nonce } = await this.jwtService.verifyAsync(state);
            await this.handleNonce(nonce);

            const response: AxiosResponse = await axios({
                method: 'POST',
                url: `${this.AUTH0_BASE_URL}${this.AUTH0_GET_TOKEN_ROUTE}`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: {
                    grant_type: 'authorization_code',
                    client_id: this.AUTH0_CLIENT_ID,
                    client_secret: this.AUTH0_CLIENT_SECRET,
                    code,
                    redirect_uri: `${this.BASE_URL}${Routes.BASE_API_ROUTE}${Routes.AUTH_ROUTE}${Routes.AUTH_CALLBACK_ROUTE}`,
                },
            });

            // if (!isStatusValid(response.status))
            //   throw new Error(`Auth API error while getting a token: ${status}`);

            return response.data.access_token;
        } catch (err: any) {
            throw new AuthException('Error while getting an auth token', {
                cause: err,
            });
        }
    }

    public async refreshToken(refreshToken: string): Promise<void> {
        try {
            const response: AxiosResponse = await axios({
                method: 'POST',
                url: `${this.AUTH0_BASE_URL}${this.AUTH0_GET_TOKEN_ROUTE}`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: {
                    grant_type: 'refresh_token',
                    client_id: this.AUTH0_CLIENT_ID,
                    client_secret: this.AUTH0_CLIENT_SECRET,
                    refresh_token: refreshToken,
                },
            });
        } catch (err: any) {
            throw new AuthException('Error while refreshing an auth token', {
                cause: err,
            });
        }
    }

    public logOut(): string {
        try {
            const queryParams: URLSearchParams = new URLSearchParams({
                client_id: this.AUTH0_CLIENT_ID,
                returnTo: this.BASE_URL,
            });

            return `${this.AUTH0_BASE_URL}/v2/logout?${queryParams}`;
        } catch (err: any) {
            throw new AuthException('Error while logging out', {
                cause: err,
            });
        }
    }

    private async handleNonce(nonce: string): Promise<void> {
        const foundNonceEntity = await this.nonceRepository.findOne({
            where: { nonce },
        });

        if (!foundNonceEntity)
            throw new AuthException(
                'Nonce not found while getting a login token ! ! !',
            );
        await this.nonceRepository.remove(foundNonceEntity);
    }

    private generateRandomString(): string {
        return Math.floor(Math.random() * Date.now()).toString(36);
    }
}
