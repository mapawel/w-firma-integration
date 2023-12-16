export type FromSystemReservationCreateResDto = {
    warehouse_documents: Record<
        string,
        {
            warehouse_document: {
                id: string;
                fullnumber: string;
            };
        }
    >;
    status: {
        code: string;
    };
};
