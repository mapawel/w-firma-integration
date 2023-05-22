export class InvoiceResDTO {
    id: number;
    number: string;
    // supplier: string;
    addedBy: string;
    addedAt: Date;
    updatedBy: string;
    updatedAt: Date;
    products: any[]; //TODO to change to DTO
}