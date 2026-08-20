export default interface ProductFilters {
    category?: string;
    page?: number;
    limit?: number;
    sort?: "price_asc" | "price_desc";
}
