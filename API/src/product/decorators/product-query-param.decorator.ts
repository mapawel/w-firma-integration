import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const ProductQuery = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const { query } = ctx.switchToHttp().getRequest();

        return {
            supplierIndex: query.supplierIndex,
            currency: query.currency,
            supplier: query.supplier,
            status: query.status,
            invoice: query.invoice,
            PN: query.PN,
            sortParam: query.sortParam || 'addedAt',
            sortDirect: query.sortDirect || 'DESC',
            records: query.records || 250,
            skip: query.skip || 0,
        };
    },
);
