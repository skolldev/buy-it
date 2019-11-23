import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ClickOutsideDirective } from "./directives/click-outside.directive";
import { ClickStopPropagationDirective } from "./directives/click-stop-propagation.directive";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ClickOutsideDirective,
    ClickStopPropagationDirective
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
