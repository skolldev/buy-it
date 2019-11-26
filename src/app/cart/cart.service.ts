import { Injectable } from "@angular/core";
import { ICartProduct } from "../api/models/cart-product.interface";
import { IProduct } from "../api/models/product.interface";
import { NotificationService } from "../components/notification.service";

@Injectable({
  providedIn: "root"
})
export class CartService {
  /**
   * Contains all products that are currently in the cart, as well as the amounts
   */
  public currentCart: ICartProduct[] = [];

  /**
   * Contains the current total amount of products in the cart
   */
  public amountOfProducts = 0;

  /**
   * The total price of the cart, based on the products and their amounts
   */
  public currentTotal = 0;

  public priceForShipping = 4;

  constructor(private notification: NotificationService) {}

  public addToCart(product: IProduct, amount: number) {
    const existingProduct = this.currentCart.find(
      item => item.product.id === product.id
    );

    if (product.stock >= amount) {
      product.stock -= amount;
      this.addProduct(existingProduct, product, amount);
    } else {
      this.addProduct(existingProduct, product, product.stock);
      this.notification.notify(
        `Not enough stock to add ${amount} ${product.name}(s) to the cart. ${product.stock} were added.`
      );
      product.stock = 0;
    }
    this.calculateTotals();
  }

  public removeFromCart(id: number) {
    const removalIndex = this.currentCart.findIndex(
      val => val.product.id === id
    );
    if (removalIndex !== -1) {
      const removedProduct = this.currentCart.splice(removalIndex, 1);
      removedProduct[0].product.stock += removedProduct[0].amount;
      this.calculateTotals();
    }
  }

  public resetCart() {
    this.currentCart.length = 0;
    this.calculateTotals();
  }

  private addProduct(
    existingProduct: ICartProduct,
    newProduct: IProduct,
    amount: number
  ) {
    if (existingProduct) {
      existingProduct.amount += amount;
    } else {
      this.currentCart.push({ product: newProduct, amount });
    }
  }

  private calculateTotals() {
    this.currentTotal = 0;
    this.amountOfProducts = 0;
    this.currentCart.forEach(item => {
      this.currentTotal += item.amount * item.product.price;
      this.amountOfProducts += item.amount;
    });
  }
}
