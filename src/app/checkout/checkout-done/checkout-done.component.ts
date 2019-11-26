import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ICheckoutInfo } from "src/app/api/models/checkout-info.interface";

@Component({
  selector: "app-checkout-done",
  templateUrl: "./checkout-done.component.html",
  styleUrls: ["./checkout-done.component.scss"]
})
export class CheckoutDoneComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  public information: ICheckoutInfo;

  ngOnInit() {
    const orderNumber = this.route.snapshot.queryParams.orderNumber;
    const orderInfo = sessionStorage.getItem(orderNumber);
    if (orderInfo) {
      this.information = JSON.parse(orderInfo);
    }
  }
}
