import { TestBed } from "@angular/core/testing";

import { CartService } from "./cart.service";
import { IProduct } from "../api/models/product.interface";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe("CartService", () => {
  let cartService: CartService;
  let testProduct: IProduct;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, NoopAnimationsModule]
    });
    cartService = TestBed.get(CartService);
    testProduct = {
      id: 1,
      name: "Coolcumber",
      description: "Just a very cool cucumber",
      stock: 2,
      price: 1.5,
      image: "none"
    };
  });

  it("should add products to the cart", () => {
    cartService.addToCart(testProduct, 1);
    expect(cartService.currentCart.length).toBe(1);
  });

  it("should remove products from the cart", () => {
    cartService.addToCart(testProduct, 1);
    cartService.addToCart(testProduct, 1);
    cartService.removeFromCart(testProduct.id);
    expect(cartService.currentCart.length).toBe(0);
  });

  it("should calculate the current sum", () => {
    cartService.addToCart(testProduct, 1);
    expect(cartService.currentTotal).toBe(1.5);
    cartService.addToCart(testProduct, 1);
    expect(cartService.currentTotal).toBe(3);
    cartService.removeFromCart(testProduct.id);
    expect(cartService.currentTotal).toBe(0);
  });

  it("should correctly handle stock going up and down", () => {
    cartService.addToCart(testProduct, 1);
    expect(testProduct.stock).toBe(1);
    cartService.addToCart(testProduct, 1);
    expect(testProduct.stock).toBe(0);
    cartService.removeFromCart(testProduct.id);
    expect(testProduct.stock).toBe(2);
  });

  it("should avoid stock underflow :-)", () => {
    cartService.addToCart(testProduct, 3);
    expect(testProduct.stock).toBe(0);
    expect(cartService.currentCart[0].amount).toBe(2);
  });

  it("should keep stock when confirming the order", () => {
    cartService.addToCart(testProduct, 2);
    cartService.confirmOrder();
    expect(testProduct.stock).toBe(0);
    expect(cartService.currentTotal).toBe(0);
    expect(cartService.amountOfProducts).toBe(0);
    expect(cartService.currentCart.length).toBe(0);
  });
});
