import type { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/products.service.js";
import logger from "../utils/logger/logger.js";

export default class ProductController {
    constructor(private productService: ProductService) {}

    async findAllProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { category, page, limit, sort } = req.query

            const result = await this.productService.findAllProducts({
                ...(category && { category: category as string }),
                ...(page && { page: Number(page) }),
                ...(limit && { limit: Number(limit) }),
                ...(sort && { sort: sort as 'price_asc' | 'price_desc' }),
            })

            logger.info(`GET /products - ${result.total} products found`)
            res.status(200).json(result)
        } catch (error) {
            logger.error(`Error finding products: ${error instanceof Error ? error.message : String(error)}`)
            next(error)
        }
    }

    async findProductBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const slug = req.params['slug'] as string

            const product = await this.productService.findProductBySlug(slug)

            logger.info(`GET /products/${slug} - products found`)
            res.status(200).json(product)
        } catch (error) {
            logger.error(`Error finding product by slug: ${error instanceof Error ? error.message : String(error)}`)
            next(error)
        }
    }

    async findProductById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params['id'] as string

            const product = await this.productService.findProductById(id)

            logger.info(`GET /products/id/${id} - products found`)
            res.status(200).json(product)
        } catch (error) {
            logger.error(`Error finding product by id: ${error instanceof Error ? error.message : String(error)}`)
            next(error)
        }
    }
}