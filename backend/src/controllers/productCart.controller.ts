import type { Request, Response, NextFunction } from "express";
import type { ProductCartService } from "../services/productCart.service.js";
import type { ProductCartDTO } from "../repositories/productCart.repository.js";
import { NotFoundException } from "../middlewares/http-exception.middleware.js";

export default class ProductCartControlle {
  constructor(private productCartService: ProductCartService) {}

  async addProductCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { currentCount, currentColor, currentSize, productSlug } =
        req.body;
      const productCartDTO: ProductCartDTO = {
        currentCount,
        currentColor,
        currentSize,
        productSlug,
        userId: req.userId,
      };
      await this.productCartService.addProductCart(productCartDTO);
      res.status(201).send();
    } catch (error) {
      next(error);
    }
  }

  async removeProductCartById(req: Request, res: Response, next: NextFunction){
    try {
      await this.productCartService.removeProductCartById(String(req.params.id));
      res.json({message: "Product in cart successfully deleted"});
    } catch (error) {
      next(error);
    }
  }

  async removeAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      await this.productCartService.removeAllProducts(req.userId);
      res.json({message: "All products in user successfully deleted"});
    } catch (error) {
      next(error);
    }
  }

  async updateProductCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { currentCount, currentColor, currentSize, productSlug } =
        req.body;
      const id = req.params.id as string;
      const productCart = await this.productCartService.updateProductCart({
        id,
        currentCount,
        currentColor,
        currentSize,
        productSlug,
        userId: req.userId
      });
      res.json(productCart);
    } catch (error) {
      next(error);
    }
  }
}
