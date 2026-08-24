import type { ProductCart } from "@prisma/client";
import type {
  ProductCartDTO,
  ProductCartRepository,
} from "../repositories/productCart.repository.js";
import { NotFoundException } from "../middlewares/http-exception.middleware.js";

export class ProductCartService {
  constructor(private productCartRepository: ProductCartRepository) {}

  async addProductCart(productCart: ProductCartDTO) {
    return this.productCartRepository.addProductCart(productCart);
  }

  async removeProductCartBySlug(userId: string, slug: string) {
    const productCartExists =
      await this.productCartRepository.findBySlug(userId, slug);
    if (productCartExists === null) {
      throw new NotFoundException("Product not found!");
    }
    return this.productCartRepository.removeProductCartBySlug(userId, slug);
  }

  async removeAllProducts(userId: string) {
    return this.productCartRepository.removeAllProducts(userId);
  }

  async updateProductCart(productCart: ProductCartDTO) {
    const productCartExists = await this.productCartRepository.findBySlug(
      productCart.userId.toString(),
      productCart.productSlug.toString(),
    );
    if (productCartExists === null) {
      throw new NotFoundException("Product not found!");
    }
    return await this.productCartRepository.updateProductCart(productCart);
  }

  async findProductCartBySlug(userId: string, slug: string) {
    const productCart = await this.productCartRepository.findBySlug(userId, slug);
    if (productCart === null) {
      throw new NotFoundException("Product not found!");
    }
    return productCart;
  }
}
