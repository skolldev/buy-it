import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthPageComponent } from "./auth/auth-page/auth-page.component";
import { MainComponent } from "./main/main.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: MainComponent
  },
  {
    path: "auth",
    component: AuthPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
