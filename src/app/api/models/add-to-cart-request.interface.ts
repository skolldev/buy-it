import { IProduct } from "./product.interface";

export interface IAddToCartRequest {
  product: IProduct;
  amount: number;
}
