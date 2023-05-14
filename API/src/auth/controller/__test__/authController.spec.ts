import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { Response } from 'express';
import { AuthController } from '../Auth.controller';
import { AuthService } from '../../../auth/service/Auth.service';

describe('authController', () => {
    let authController: AuthController;
    let authService: AuthService;

    const responseMock: Response = {
        redirect: jest.fn((url: string) => url),
        cookie: jest.fn(() => responseMock),
    } as unknown as Response;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: ['.env', '.env.auth'],
                }),
            ],
            controllers: [AuthController],
            providers: [AuthService],
        }).compile();

        authController = moduleRef.get<AuthController>(AuthController);
        authService = moduleRef.get<AuthService>(AuthService);
    });

    it('authController should be defined', () => {
        expect(authController).toBeDefined();
    });

    it('authController should be defined', () => {
        expect(authService).toBeDefined();
    });

    describe('startAuth', () => {
        it('should return a redirect url from connected service to this controller method', () => {
            // given
            const exampleUrl = 'https://example.com';
            const getAuthUrlSpy = jest
                .spyOn(authService, 'getAuthUrl')
                .mockReturnValue(exampleUrl);

            //when
            const responeUrl = authController.startAuth(responseMock);

            //then
            expect(getAuthUrlSpy).toBeCalledTimes(1);
            expect(responeUrl).toStrictEqual(exampleUrl);
        });
    });

    describe('getToken', () => {
        it('should return return redirect', async () => {
            // given
            const exampleToken = 'access_token';
            const getTokenSpy = jest
                .spyOn(authService, 'getToken')
                .mockResolvedValue(exampleToken);

            //when
            await authController.getToken('code', responseMock);

            //then
            expect(getTokenSpy).toBeCalledTimes(1);
        });
    });
});
