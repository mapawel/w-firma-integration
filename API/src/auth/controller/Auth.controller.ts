import { Controller, Get, Query, Res } from '@nestjs/common';
import { AuthService } from '../service/Auth.service';
import { Routes } from '../../routes/Routes.enum';
import { Response } from 'express';

// TO REMOVE AFTER DEVELOPMENT AND IF TOKEN FLOW IMPLEMENTED IN FRONT
@Controller(`${Routes.BASE_API_ROUTE}${Routes.AUTH_ROUTE}`)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get()
    public startAuth(@Res() res: Response) {
        const url = this.authService.getAuthUrl();
        return res.redirect(url);
    }

    @Get(Routes.AUTH_CALLBACK_ROUTE)
    public async getToken(@Query('code') code: string) {
        const token: string = await this.authService.getToken(code);
        return {
            message: 'User logged in',
            token,
        };
    }
}
