import type { ProductCart } from "@prisma/client";

export type ProductCartDTO = {
  userId: string;
  productSlug: string;
  currentColor: string;
  currentCount: number;
  currentSize: string;
};

export interface ProductCartRepository {
  findBySlug(productCartSlug: string): Promise<ProductCart | null>;
  addProductCart(productCart: ProductCartDTO): Promise<ProductCart>;
  removeProductCartBySlug(productCartSlug: string): Promise<void>
  removeAllProducts(userId: string): Promise<void>;
  updateProductCart(productCart: ProductCartDTO): Promise<ProductCart>;
}
