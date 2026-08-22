import type { ProductCart } from "@prisma/client";

export type ProductCartDTO = {
  userId: string;
  productSlug: string;
  currentColor: string;
  currentCount: number;
  currentSize: string;
};

export interface ProductCartRepository {
  addProductCart(productCard: ProductCartDTO): Promise<ProductCart>;
  removeAllProducts(userId: string): Promise<void>;
}
