import { Response } from 'express';
import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../service/auth.service';
import { Routes } from '../../routes/Routes.enum';
import { UserData } from '../../decorators/user-data.decorator';
import { GetTokenDTO } from '../dto/get-token.dto';

@Controller(`${Routes.BASE_API_ROUTE}${Routes.AUTH_ROUTE}`)
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {}

    @Get()
    public async startAuth(@Res() res: Response) {
        const url = await this.authService.getAuthUrl();
        return res.redirect(url);
    }

    @Get(Routes.AUTH_CALLBACK_ROUTE)
    public async getToken(
        @Query() getTokenDTO: GetTokenDTO,
        @Res({ passthrough: true }) res: Response,
    ) {
        const { code, state } = getTokenDTO;
        const token: string = await this.authService.getToken(code, state);
        res.cookie('access_token', token, {
            httpOnly: true,
            signed: true,
        }).redirect(this.configService.get<string>('BASE_URL', ''));
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(Routes.AUTH_GETUSER_ROUTE)
    public getUser(@UserData() user: { name: string; roles: string[] }) {
        return user;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(Routes.AUTH_LOGOUT_ROUTE)
    public logOut(@Res() res: Response) {
        return res
            .cookie('access_token', {
                httpOnly: true,
                signed: true,
            })
            .redirect(this.authService.logOut());
    }
}
