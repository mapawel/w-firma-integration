export const corsConfig = {
    origin: [process.env.SSO_ORIGIN || ''],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};
