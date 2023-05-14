import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserId = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request?.user?.[`${process.env.AUTH0_NAMESPACE}/userInfo`]
            .user_id;
    },
);
