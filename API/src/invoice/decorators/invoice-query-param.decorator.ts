import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const InvoiceQuery = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const { query } = ctx.switchToHttp().getRequest();

        return {
            number: query.number,
            supplier: query.supplier,
            sortParam: query.sortParam || 'addedAt',
            sortDirect: query.sortDirect || 'DESC',
            records: query.records || 250,
            skip: query.skip || 0,
        };
    },
);
