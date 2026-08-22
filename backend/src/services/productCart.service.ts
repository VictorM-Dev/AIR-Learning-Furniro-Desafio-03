import type { ProductCartDTO, ProductCartRepository } from "../repositories/productCart.repository.js";

export class ProductCartService{
  constructor(private productCartRepository: ProductCartRepository){}

  async addProductCart(productCart:ProductCartDTO){
    return this.productCartRepository.addProductCart(productCart);
  }

  async removeAllProducts(userId: string){
    return this.productCartRepository.removeAllProducts(userId);
  }
}