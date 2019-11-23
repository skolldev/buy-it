import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  constructor(public auth: AuthService) {}

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required)
  });

  showLoginForm = false;

  onLogin() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.auth.login(email, password).subscribe(success => {
      if (success) {
        this.showLoginForm = false;
      }
    });
  }

  ngOnInit() {}
}
