import type { PrismaClient } from "@prisma/client";
import type {
  ProductCartDTO,
  ProductCartRepository,
} from "./productCart.repository.js";
import { NotFoundException } from "../middlewares/http-exception.middleware.js";

export default class PrismaProductCartRepository implements ProductCartRepository {
  constructor(private prisma: PrismaClient) {}

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
}
