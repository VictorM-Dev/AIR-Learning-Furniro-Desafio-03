import api from "./api";
import type PaginatedProducts from "../interface/PaginatedProducts";
import type ProductFilters from "../interface/ProductFilters";

export async function getProducts(
    filters?: ProductFilters,
): Promise<PaginatedProducts> {
    const { data } = await api.get<PaginatedProducts>("/products", {
        params: filters,
    });

    return data;
}
