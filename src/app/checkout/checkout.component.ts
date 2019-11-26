import { Component, OnInit } from "@angular/core";
import { CartService } from "../cart/cart.service";
import { AuthService } from "../auth/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NotificationService } from "../components/notification.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ICheckoutInfo } from "../api/models/checkout-info.interface";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"]
})
export class CheckoutComponent implements OnInit {
  constructor(
    public cart: CartService,
    public auth: AuthService,
    private notification: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    formBuilder: FormBuilder
  ) {
    this.checkoutForm = formBuilder.group({
      street: ["", [Validators.required]],
      city: ["", Validators.required]
    });
  }

  public checkoutForm: FormGroup;
  ngOnInit() {
    this.cart.addToCart(
      {
        id: 1,
        name: "Coolcumber",
        description: "Just a very cool cucumber",
        stock: 2,
        price: 150,
        image: "/assets/food-bread-cheese-sauce-product.jpg"
      },
      2
    );

    this.cart.addToCart(
      {
        id: 2,
        name: "Coolcumber",
        description: "Just a very cool cucumber",
        stock: 2,
        price: 150,
        image: "/assets/food-bread-cheese-sauce-product.jpg"
      },
      2
    );
    this.cart.addToCart(
      {
        id: 3,
        name: "Coolcumber",
        description: "Just a very cool cucumber",
        stock: 2,
        price: 150,
        image: "/assets/food-bread-cheese-sauce-product.jpg"
      },
      2
    );
    this.cart.addToCart(
      {
        id: 4,
        name: "Coolcumber",
        description: "Just a very cool cucumber",
        stock: 2,
        price: 150,
        image: "/assets/food-bread-cheese-sauce-product.jpg"
      },
      2
    );
    this.cart.addToCart(
      {
        id: 5,
        name: "Coolcumber",
        description: "Just a very cool cucumber",
        stock: 2,
        price: 150,
        image: "/assets/food-bread-cheese-sauce-product.jpg"
      },
      2
    );
    this.cart.addToCart(
      {
        id: 6,
        name: "Coolcumber",
        description: "Just a very cool cucumber",
        stock: 2,
        price: 150,
        image: "/assets/food-bread-cheese-sauce-product.jpg"
      },
      2
    );
  }

  handleOrder() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      this.notification.notifyAboutFormErrors(this.checkoutForm);
      return;
    }

    // Do the actual order processing here

    const { name, email, bankAccount } = this.auth.currentUser;
    const { street, city } = this.checkoutForm.value;

    const checkoutInfo: ICheckoutInfo = {
      name,
      email,
      bankAccount,
      street,
      city
    };

    const orderNumber = Math.floor(Math.random() * 23453) + 1;
    sessionStorage.setItem(
      orderNumber.toString(),
      JSON.stringify(checkoutInfo)
    );

    this.cart.resetCart();

    this.router.navigate(["./confirmation"], {
      relativeTo: this.route,
      queryParams: { orderNumber }
    });
  }
}
