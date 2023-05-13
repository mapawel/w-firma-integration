import { Controller, Get, Query, Res } from '@nestjs/common';
import { AuthService } from '../service/Auth.service';
import { Routes } from '../../routes/Routes.enum';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

// TO REMOVE AFTER DEVELOPMENT AND IF TOKEN FLOW IMPLEMENTED IN FRONT
@Controller(`${Routes.BASE_API_ROUTE}${Routes.AUTH_ROUTE}`)
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {}

    @Get()
    public startAuth(@Res() res: Response) {
        const url = this.authService.getAuthUrl();
        return res.redirect(url);
    }

    @Get(Routes.AUTH_CALLBACK_ROUTE)
    public async getToken(
        @Query('code') code: string,
        @Res({ passthrough: true }) res: Response,
    ) {
        const token: string = await this.authService.getToken(code);
        res.cookie('access_token', token, {
            httpOnly: true,
            signed: true,
        }).redirect(this.configService.get<string>('BASE_URL', ''));
    }
}
