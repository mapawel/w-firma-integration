export const corsConfig = {
    origin: [process.env.FRONTEND_ORIGIN || '', process.env.SSO_ORIGIN || ''],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};
