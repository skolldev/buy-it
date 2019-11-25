import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ClickOutsideDirective } from "./directives/click-outside.directive";
import { ClickStopPropagationDirective } from "./directives/click-stop-propagation.directive";
import { AuthPageComponent } from "./auth/auth-page/auth-page.component";
import { MainComponent } from "./main/main.component";
import { ProductCardComponent } from "./components/product-card/product-card.component";

import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ClickOutsideDirective,
    ClickStopPropagationDirective,
    AuthPageComponent,
    MainComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTabsModule,
    MatSnackBarModule,
    PerfectScrollbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
