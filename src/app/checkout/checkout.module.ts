import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CheckoutRoutingModule } from "./checkout-routing.module";
import { CheckoutComponent } from "./checkout.component";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { ReactiveFormsModule } from "@angular/forms";
import { CheckoutDoneComponent } from "./checkout-done/checkout-done.component";

@NgModule({
  declarations: [CheckoutComponent, CheckoutDoneComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    PerfectScrollbarModule,
    ReactiveFormsModule
  ]
})
export class CheckoutModule {}
