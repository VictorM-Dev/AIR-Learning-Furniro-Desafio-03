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

  async removeProductCartBySlug(req: Request, res: Response, next: NextFunction){
    try {
      await this.productCartService.removeProductCartBySlug(String(req.userId), String(req.params.slug));
      res.json({message: "Product in cart successfully deleted"});
    } catch (error) {
      next(error);
    }
  }

  async removeAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      await this.productCartService.removeAllProducts(String(req.userId));
      res.json({message: "All products in user successfully deleted"});
    } catch (error) {
      next(error);
    }
  }

  async updateProductCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { currentCount, currentColor, currentSize, productSlug } =
        req.body;
      const slug = req.params.slug as string;
      const productCart = await this.productCartService.updateProductCart({
        currentCount,
        currentColor,
        currentSize,
        productSlug: slug,
        userId: req.userId
      });
      res.json(productCart);
    } catch (error) {
      next(error);
    }
  }

  async findProductCartBySlug(req: Request, res: Response, next: NextFunction){
    try {
      const slug = req.params.slug as string;
      const productCart = await this.productCartService.findProductCartBySlug(String(req.userId), slug);
      if(!productCart) throw new NotFoundException("Product in cart not found");
      res.json(productCart);
    } catch (error) {
      next(error);
    }
  }
}
