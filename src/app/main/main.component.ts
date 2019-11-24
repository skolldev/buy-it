import { Component, OnInit } from "@angular/core";
import { APIService } from "../api/api.service";
import { IProduct } from "../api/models/product.interface";
import { Observable } from "rxjs";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {
  public products: Observable<IProduct[]>;

  constructor(public api: APIService) {}

  ngOnInit() {
    this.products = this.api.getAllProducts();
  }
}
