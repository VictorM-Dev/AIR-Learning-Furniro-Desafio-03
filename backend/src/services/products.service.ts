import type { ProductRepository, ProductFilters, PaginatedProducts } from '../repositories/product.repository.js'
import type { Product } from '@prisma/client'
import { NotFoundException, BadRequestException} from '../middlewares/http-exception.middleware.js'
import logger from '../utils/logger/logger.js'

export class ProductService {
    constructor(private productRepository: ProductRepository) {}

    async findAllProducts(filters?: ProductFilters): Promise<PaginatedProducts> {
        logger.info(`Search products with filters: ${JSON.stringify(filters)}`)

        if (filters?.sort && !['price_asc', 'price_desc'].includes(filters.sort)) {
            logger.error('Invalid sort value. Use price_asc or price_desc')
            throw new BadRequestException('Order is invalid. Use price_asc or price_desc')
        }

        if (filters?.page && filters.page < 1) {
            logger.error('Invalid page value. Page must be greater than 0')
            throw new BadRequestException('Page is invalid')
        }

        const result = await this.productRepository.findAllProducts(filters)

        logger.info(`${result.total} products found`)

        return result
    }

    async findProductBySlug(slug: string): Promise<Product> {
        logger.info(`Search product by slug: ${slug}`)

        if (!slug) {
            logger.error('Slug is required')
            throw new BadRequestException('Slug é obrigatório')
        }

        const product = await this.productRepository.findProductBySlug(slug)

        if (!product) {
            logger.error(`Product with slug "${slug}" not found`)
            throw new NotFoundException(`Produto com slug "${slug}" não encontrado`)
            
        }

        return product
    }

    async findProductById(id: string): Promise<Product> {
        logger.info(`Search product by id: ${id}`)

        if (!id) {
            logger.error('ID is required')
            throw new BadRequestException('ID é obrigatório')
        }

        const product = await this.productRepository.findProductById(id)

        if (!product) {
            logger.error(`Product with id "${id}" not found`);
            throw new NotFoundException(`Produto com id "${id}" não encontrado`)
        }

        return product
    }
}