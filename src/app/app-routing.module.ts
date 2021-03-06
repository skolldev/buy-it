import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthPageComponent } from "./auth/auth-page/auth-page.component";
import { MainComponent } from "./main/main.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: MainComponent
  },
  {
    path: "auth",
    component: AuthPageComponent
  },
  {
    path: "checkout",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./checkout/checkout.module").then(m => m.CheckoutModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
