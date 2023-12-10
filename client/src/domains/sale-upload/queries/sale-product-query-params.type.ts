import { Status } from "../status/status.enum";
import { SaleProductResDTO } from "@/domains/sale-upload/dto/sale-products-res.dto";

export type SaleProductQueryParams = {
    supplierCode?: string;
    productCode?: string;
    currency?: string;
    customerId?: string;
    status?: Status | "all";
    reservationId?: string;
    sortParam?: keyof SaleProductResDTO;
    sortDirect?: "ASC" | "DESC";
    records?: string;
    skip?: string;
    addedAt?: string;
};
