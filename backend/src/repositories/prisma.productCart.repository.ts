import type { PrismaClient, ProductCart } from "@prisma/client";
import type {
  ProductCartDTO,
  ProductCartRepository,
} from "./productCart.repository.js";
import { NotFoundException } from "../middlewares/http-exception.middleware.js";

export default class PrismaProductCartRepository implements ProductCartRepository {
  constructor(private prisma: PrismaClient) {}

  async findBySlug(userId: string, slug: string): Promise<ProductCart | null> {
    return this.prisma.productCart.findUnique({
      where: {
        userId_productSlug: {
          userId,
          productSlug: slug,
        },
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

  async removeProductCartBySlug(userId: string, slug: string): Promise<void> {
    await this.prisma.productCart.delete({
      where: {
        userId_productSlug: {
          userId,
          productSlug: slug,
        },
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

  async updateProductCart(productCart: ProductCartDTO) {
    return this.prisma.productCart.update({
      where: {
        userId_productSlug: {
          userId: productCart.userId,
          productSlug: productCart.productSlug,
        },
      },
      data: {
        currentColor: productCart.currentColor,
        currentCount: productCart.currentCount,
        currentSize: productCart.currentSize,
      },
    });
  }
}
