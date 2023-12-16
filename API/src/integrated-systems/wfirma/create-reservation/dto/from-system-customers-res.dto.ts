export type FromSystemCustomersResDTO = {
    contractors: Contractors;
};

export type Contractors = Record<string, ContractorWrapped>;

export type ContractorWrapped = {
    contractor: {
        id: string;
        name: string;
        account_number: string;
    };
};
