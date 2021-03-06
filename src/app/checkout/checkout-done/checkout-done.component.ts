import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ICheckoutInfo } from "src/app/api/models/checkout-info.interface";

@Component({
  selector: "app-checkout-done",
  templateUrl: "./checkout-done.component.html"
})
export class CheckoutDoneComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  public information: ICheckoutInfo;
  public orderNumber: number;

  ngOnInit() {
    this.orderNumber = +this.route.snapshot.queryParams.orderNumber;
    const orderInfo = sessionStorage.getItem(this.orderNumber.toString());
    if (orderInfo) {
      this.information = JSON.parse(orderInfo);
    }
  }
}
