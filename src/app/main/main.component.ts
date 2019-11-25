import { Component, OnInit } from "@angular/core";
import { APIService } from "../api/api.service";
import { IProduct } from "../api/models/product.interface";
import { Observable } from "rxjs";
import { CartService } from "../cart/cart.service";
import { ICartProduct } from "../api/models/cart-product.interface";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {
  public products: Observable<IProduct[]>;

  constructor(public api: APIService, public cart: CartService) {}

  ngOnInit() {
    this.products = this.api.getAllProducts();
  }

  public addToCart(product: ICartProduct) {
    this.cart.addToCart(product.product, product.amount);
  }
}
