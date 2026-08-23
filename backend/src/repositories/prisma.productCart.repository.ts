import type { PrismaClient, ProductCart } from "@prisma/client";
import type {
  ProductCartDTO,
  ProductCartRepository,
} from "./productCart.repository.js";
import { NotFoundException } from "../middlewares/http-exception.middleware.js";

export default class PrismaProductCartRepository implements ProductCartRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<ProductCart | null> {
    return this.prisma.productCart.findUnique({
      where: {
        id,
      },
    });
  }

  async addProductCart(productCart: ProductCartDTO) {
    return this.prisma.productCart.create({
      data: {
        currentColor: productCart.currentColor,
        currentCount: productCart.currentCount,
        currentSize: productCart.currentSize,
        productSlug: productCart.productSlug,
        user: { connect: { id: productCart.userId } },
      },
    });
  }

  async removeProductCartById(productCartId: string): Promise<void> {
    await this.prisma.productCart.delete({
      where: {
        id: productCartId,
      },
    });
  }

  async removeAllProducts(userId: string): Promise<void> {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (userExists === null) {
      throw new NotFoundException("User not found");
    }
    await this.prisma.productCart.deleteMany({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async updateProductCart(productCart: ProductCart) {
    return this.prisma.productCart.update({
      where: {
        id: productCart.id,
      },
      data: {
        currentColor: productCart.currentColor,
        currentCount: productCart.currentCount,
        currentSize: productCart.currentSize,
        productSlug: productCart.productSlug,
      },
    });
  }
}
