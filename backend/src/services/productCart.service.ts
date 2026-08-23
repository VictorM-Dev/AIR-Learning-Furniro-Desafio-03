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

  async removeProductCartBySlug(slug: string) {
    const productCartExists =
      await this.productCartRepository.findBySlug(slug);
    if (productCartExists === null) {
      throw new NotFoundException("Product not found!");
    }
    return this.productCartRepository.removeProductCartBySlug(slug);
  }

  async removeAllProducts(userId: string) {
    return this.productCartRepository.removeAllProducts(userId);
  }

  async updateProductCart(productCart: ProductCartDTO) {
    const productCartExists = await this.productCartRepository.findBySlug(
      productCart.productSlug.toString(),
    );
    if (productCartExists === null) {
      throw new NotFoundException("Product not found!");
    }
    return await this.productCartRepository.updateProductCart(productCart);
  }
}
