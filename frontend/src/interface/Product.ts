export default interface Product {
  id: string;
  name: string;
  slug: string;
  isNew: boolean;
  description: string;
  shortDescription: string;
  price: number;
  discountPrice?: number | null;
  category: string;
  rating: number;
  reviewCount: number;
  stock: number;
  colors: string[];
  sizes: string[];
  images: string[];
  sku: string;
  additionalInfo:string;
  createdAt: Date | string;
  updatedAt: Date | string;
}