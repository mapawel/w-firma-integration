import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserData = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();

        console.log('request.user ----> ', request.user);

        const name: string | undefined =
            request?.user?.[`${process.env.AUTH0_NAMESPACE}/userInfo`].name;
        const roles: string[] | undefined =
            request?.user?.[`${process.env.AUTH0_NAMESPACE}/roles`];

        return { name, roles };
    },
);
