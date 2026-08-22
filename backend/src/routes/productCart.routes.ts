import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import PrismaProductCartRepository from "../repositories/prisma.productCart.repository.js";
import { ProductCartService } from "../services/productCart.service.js";
import ProductCartControlle from "../controllers/productCart.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

const prisma = new PrismaClient();
const productCartRepository = new PrismaProductCartRepository(prisma);
const productCartService = new ProductCartService(productCartRepository);
const productCartController = new ProductCartControlle(productCartService);

router.post("/add", authMiddleware, (req, res, next) => {
  productCartController.addProductCart(req, res, next);
});

router.delete("/remove", authMiddleware, (req, res, next) => {
  productCartController.removeAllProducts(req, res, next);
});

export { router as productCartRoutes };
