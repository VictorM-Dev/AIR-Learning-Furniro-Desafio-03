import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import PrismaProductRepository from '../repositories/prisma.product.repository.js'
import { ProductService } from '../services/products.service.js'
import ProductController from '../controllers/product.controller.js'
import { validateSlug, validateId } from '../middlewares/validation.middleware.js'

const router = Router()

const prisma = new PrismaClient()
const productRepository = new PrismaProductRepository(prisma)
const productService = new ProductService(productRepository)
const productController = new ProductController(productService)

router.get('/', (req, res, next) => productController.findAllProducts(req, res, next))
router.get('/id/:id', validateId, (req, res, next) => productController.findProductById(req, res, next))
router.get('/:slug', validateSlug, (req, res, next) => productController.findProductBySlug(req, res, next))

export { router as productRoutes }