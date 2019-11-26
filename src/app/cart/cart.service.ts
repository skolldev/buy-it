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

  /**
   * The price the customer needs to pay for shipping
   */
  public priceForShipping = 4;

  constructor(private notification: NotificationService) {}

  /**
   * Adds a product to the cart.
   * The amount will be deducted from the product's stock.
   * If a product with the same ID is already in the cart, its amount will be increased
   * @param product The product to add to the cart
   * @param amount The amount of products to be added to the cart. If this is more than the
   * current stock, the maximum possible amount will be added.
   */
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

  /**
   * Completely removed the given product from the cart, readding its amount to the stock
   * @param id The unique identifier of the product
   */
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

  /**
   * Call this to confirm a customer's order.
   * Will clear the cart without readding the amounts to the stock and recalculate all totals
   */
  public confirmOrder() {
    this.currentCart.length = 0;
    this.calculateTotals();
  }

  /**
   * Handles the addition of a product to the cart. Either pushes it in, or increases the amount of an existing item
   * @param existingProduct The existing product in the cart. Might be undefined
   * @param newProduct The product that should be added to the cart
   * @param amount How many of the product should be added
   */
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

  /**
   * Recalculates the current total and the amount of products in the cart
   */
  private calculateTotals() {
    this.currentTotal = 0;
    this.amountOfProducts = 0;
    this.currentCart.forEach(item => {
      this.currentTotal += item.amount * item.product.price;
      this.amountOfProducts += item.amount;
    });
  }
}
