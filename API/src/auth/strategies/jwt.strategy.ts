import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(readonly configService: ConfigService) {
        super({
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${configService.get(
                    'AUTH0_BASE_ISSUER',
                )}.well-known/jwks.json`,
            }),

            jwtFromRequest: (req: Request) => {
                let token = null;
                if (req && req.signedCookies) {
                    token = req.signedCookies['access_token'];
                }
                return token;
            },
            audience: configService.get('AUTH0_AUTH_API_AUDIENCE'),
            issuer: configService.get('AUTH0_BASE_ISSUER'),
            algorithms: [configService.get('JWT_ALGORITHM')],
        });
    }

    validate(payload: unknown): unknown {
        return payload;
    }
}
