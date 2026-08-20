// src/repositories/product.repository.ts
import type { PrismaClient } from '@prisma/client'
import type { ProductRepository } from './product.repository.js'

export type ProductFilters = {
    category?: string
    page?: number
    limit?: number
    sort?: 'price_asc' | 'price_desc'
}

export type PaginatedProducts = {
    products: Awaited<ReturnType<PrismaClient['product']['findMany']>>
    total: number
    page: number
    limit: number
    totalPages: number
}

export default class PrismaProductRepository implements ProductRepository {
    constructor(private prisma: PrismaClient) {}

    async findAllProducts(filters?: ProductFilters): Promise<PaginatedProducts> {
        const page = filters?.page || 1
        const limit = filters?.limit || 16
        const skip = (page - 1) * limit

        const orderBy = filters?.sort === 'price_asc'
        ? { price: 'asc' as const }
        : filters?.sort === 'price_desc'
        ? { price: 'desc' as const }
        : undefined

        const where = {
        ...(filters?.category && {
            category: { contains: filters.category, mode: 'insensitive' as const }
        })
        }

        const [products, total] = await Promise.all([
        this.prisma.product.findMany({ where, skip, take: limit, ...(orderBy && { orderBy }) }),
        this.prisma.product.count({ where })
        ])


        return { products,total, page, limit, totalPages: Math.ceil(total / limit) }
    }

    async findProductBySlug(slug: string) {
        return this.prisma.product.findUnique({ where: { slug } })
    }

    async findProductById(id: string) {
        return this.prisma.product.findUnique({ where: { id } })
    }
}