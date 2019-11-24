import { Injectable } from "@angular/core";
import { ICartProduct } from "../api/models/cart-product.interface";
import { IProduct } from "../api/models/product.interface";

@Injectable({
  providedIn: "root"
})
export class CartService {
  /**
   * Contains all products that are currently in the cart, as well as the amounts
   */
  public currentCart: ICartProduct[] = [];

  /**
   * The total price of the cart, based on the products and their amounts
   */
  public currentTotal = 0;

  constructor() {}

  addToCart(product: IProduct, amount: number) {
    const existingProduct = this.currentCart.find(
      item => item.product.id === product.id
    );
    if (existingProduct) {
      existingProduct.amount += amount;
    } else {
      this.currentCart.push({ product, amount });
    }
    product.stock -= amount;
    this.calculateTotal();
  }

  removeFromCart(id: number) {
    const removalIndex = this.currentCart.findIndex(
      val => val.product.id === id
    );
    if (removalIndex !== -1) {
      const removedProduct = this.currentCart.splice(removalIndex, 1);
      removedProduct[0].product.stock += removedProduct[0].amount;
      this.calculateTotal();
    }
  }

  calculateTotal() {
    this.currentTotal = 0;
    this.currentCart.forEach(item => {
      this.currentTotal += item.amount * item.product.price;
    });
  }
}
