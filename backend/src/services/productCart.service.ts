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

  async removeProductCartById(productCartId: string) {
    const productCartExists =
      await this.productCartRepository.findById(productCartId);
    if (productCartExists === null) {
      throw new NotFoundException("Product not found!");
    }
    return this.productCartRepository.removeProductCartById(productCartId);
  }

  async removeAllProducts(userId: string) {
    return this.productCartRepository.removeAllProducts(userId);
  }

  async updateProductCart(productCart: ProductCart) {
    const productCartExists = await this.productCartRepository.findById(
      productCart.id.toString(),
    );
    if (productCartExists === null) {
      throw new NotFoundException("Product not found!");
    }
    return await this.productCartRepository.updateProductCart(productCart);
  }
}
