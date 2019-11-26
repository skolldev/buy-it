import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CheckoutComponent } from "./checkout.component";
import { CheckoutDoneComponent } from "./checkout-done/checkout-done.component";

const routes: Routes = [
  {
    path: "",
    component: CheckoutComponent,
    pathMatch: "full"
  },
  {
    path: "confirmation",
    component: CheckoutDoneComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule {}
