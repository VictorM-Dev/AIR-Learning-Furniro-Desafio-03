// src/repositories/product.repository.ts
import type { Product } from '@prisma/client'

export type ProductFilters = {
    category?: string
    page?: number
    limit?: number
    sort?: 'price_asc' | 'price_desc'
}

export type PaginatedProducts = {
    products: Product[]
    total: number
    page: number
    limit: number
    totalPages: number
}

export interface ProductRepository {
    findProductById(id: string): Promise<Product | null>
    findProductBySlug(slug: string): Promise<Product | null>
    findAllProducts(filters?: ProductFilters): Promise<PaginatedProducts>
}