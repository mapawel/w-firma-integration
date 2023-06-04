export type FromSystemProductsResDTO = {
    goods: Record<
        string,
        {
            good: {
                id: string;
                code: string;
            };
        }
    >;
};
