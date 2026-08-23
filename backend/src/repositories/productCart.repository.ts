import type { ProductCart } from "@prisma/client";

export type ProductCartDTO = {
  userId: string;
  productSlug: string;
  currentColor: string;
  currentCount: number;
  currentSize: string;
};

export interface ProductCartRepository {
  findById(id: string): Promise<ProductCart | null>;
  addProductCart(productCard: ProductCartDTO): Promise<ProductCart>;
  removeProductCartById(productCardId: string): Promise<void>
  removeAllProducts(userId: string): Promise<void>;
  updateProductCart(productCart: ProductCart): Promise<ProductCart>;
}
