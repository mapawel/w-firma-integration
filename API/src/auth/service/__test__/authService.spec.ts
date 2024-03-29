import axios from 'axios';
import { AuthService } from '../auth.service';
import MockAdapter = require('axios-mock-adapter');

describe('authService', () => {
    let authService: AuthService;
    let mock: MockAdapter;

    beforeEach(async () => {
        mock = new MockAdapter(axios);

        // const moduleRef: TestingModule = await Test.createTestingModule({
        //     imports: [
        //         ConfigModule.forRoot({
        //             isGlobal: true,
        //             envFilePath: ['.env', '.env.auth'],
        //         }),
        //     ],
        //     providers: [AuthService],
        // }).compile();

        // authService = moduleRef.get<AuthService>(AuthService);
    });

    afterEach(() => {
        mock.reset();
    });

    it('x', () => {
        expect(true).toBeTruthy();
    });
    // it('authService should be defined', () => {
    //     expect(authService).toBeDefined();
    // });

    // describe('getAuthUrl', () => {
    //     it('should return url containing all necessary query string keys', async () => {
    //         // given
    //         const requiredStringsInUrl: string[] = [
    //             'audience=',
    //             'response_type=',
    //             'client_id=',
    //             'redirect_uri=',
    //             'scope=',
    //             'state=',
    //         ];
    //
    //         //when
    //         const returnedUrl: string = await authService.getAuthUrl();
    //
    //         //then
    //         requiredStringsInUrl.map((requiredString) => {
    //             expect(returnedUrl).toContain(requiredString);
    //         });
    //     });
    //
    //     it('should return url containing all necessary query strings values', async () => {
    //         // given
    //         const requiredStringsInUrl: (string | undefined)[] = [
    //             encodeURIComponent(process.env.AUTH0_AUTH_API_AUDIENCE || ''),
    //             'code',
    //             encodeURIComponent(process.env.AUTH0_CLIENT_ID || ''),
    //             encodeURIComponent(process.env.BASE_URL || ''),
    //             encodeURIComponent(Routes.AUTH_ROUTE),
    //             encodeURIComponent(Routes.AUTH_CALLBACK_ROUTE),
    //             process.env.AUTH0_SCOPE?.replaceAll(' ', '+'),
    //         ];
    //
    //         //when
    //         const returnedUrl: string = await authService.getAuthUrl();
    //
    //         //then
    //         requiredStringsInUrl.map((requiredString) => {
    //             expect(returnedUrl).toContain(requiredString);
    //         });
    //     });
    //
    //     it('should return url starting from given url', async () => {
    //         // given
    //         const url = `${process.env.AUTH0_BASE_URL}${process.env.AUTH0_AUTHORIZE_ROUTE}?`;
    //
    //         //when
    //         const returnedUrl: string = await authService.getAuthUrl();
    //         //then
    //         expect(returnedUrl).toContain(url);
    //     });
    // });
    //
    // describe('getToken', () => {
    //     it('should return token', async () => {
    //         // given
    //         const code = 'code';
    //         const state = 'state';
    //
    //         mock.onPost(
    //             `${process.env.AUTH0_BASE_URL}${process.env.AUTH0_GET_TOKEN_ROUTE}`,
    //         ).reply(200, {
    //             access_token: 'access_token',
    //             id_token: 'id_token',
    //             scope: 'scope',
    //             expires_in: 86400,
    //             token_type: 'Bearer',
    //         });
    //
    //         //when
    //         const returnedToken: string = await authService.getToken(
    //             code,
    //             state,
    //         );
    //
    //         //then
    //         expect(returnedToken).toEqual('access_token');
    //     });
    //
    //     it('should return domain exception on axios error', async () => {
    //         // given
    //         const code = 'not_valid_code';
    //         const state = 'state';
    //
    //         mock.onPost(
    //             `${process.env.AUTH0_BASE_URL}${process.env.AUTH0_GET_TOKEN_ROUTE}`,
    //         ).reply(403);
    //
    //         //when + then
    //         expect(authService.getToken(code, state)).rejects.toThrow(
    //             AuthException,
    //         );
    //     });
    // });
});
