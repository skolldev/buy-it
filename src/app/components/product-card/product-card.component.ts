import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { IProduct } from "src/app/api/models/product.interface";
import { IAddToCartRequest } from "src/app/api/models/add-to-cart-request.interface";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.scss"]
})
export class ProductCardComponent implements OnInit {
  @Input()
  public product: IProduct;

  @Output()
  public addToCartClicked: EventEmitter<IAddToCartRequest> = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  public addToCart() {
    this.addToCartClicked.emit({
      product: this.product,
      amount: 1
    });
  }
}
