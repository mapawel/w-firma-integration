import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CodeTranslationQuery = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const { query } = ctx.switchToHttp().getRequest();

        return {
            supplierCode: query.supplierCode,
            supplier: query.supplier,
            PN: query.PN,
            sortParam: query.sortParam || 'supplier',
            sortDirect: query.sortDirect || 'ASC',
            records: query.records || 250,
            skip: query.skip || 0,
        };
    },
);
