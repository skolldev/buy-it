import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { CartService } from "src/app/cart/cart.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  constructor(
    public auth: AuthService,
    public cart: CartService,
    public router: Router
  ) {}

  public showCartPopup = false;

  handleCheckout() {
    this.showCartPopup = false;
    this.router.navigate(["/checkout"]);
  }
  ngOnInit() {}
}
