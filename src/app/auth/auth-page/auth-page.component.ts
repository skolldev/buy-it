import { Component, OnInit } from "@angular/core";
import {
  ValidatorFn,
  FormGroup,
  ValidationErrors,
  Validators,
  FormBuilder
} from "@angular/forms";
import { AuthService } from "../auth.service";
import { NotificationService } from "src/app/components/notification.service";
import { IUser } from "src/app/api/models/user.interface";

const passwordsMatchValidator: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const password = control.get("password");
  const confirmPassword = control.get("confirmPassword");
  if (password && confirmPassword && password.value === confirmPassword.value) {
  }
  return password && confirmPassword && password.value === confirmPassword.value
    ? null
    : { passwordsMatch: true };
};

@Component({
  selector: "app-auth-page",
  templateUrl: "./auth-page.component.html",
  styleUrls: ["./auth-page.component.scss"]
})
export class AuthPageComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private notification: NotificationService,
    formBuilder: FormBuilder
  ) {
    this.loginForm = formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });

    this.createForm = formBuilder.group(
      {
        name: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        password: ["", Validators.required],
        confirmPassword: ["", Validators.required],
        bankAccount: ["", Validators.required]
      },
      {
        validators: passwordsMatchValidator
      }
    );
  }

  public loginForm: FormGroup;
  public createForm: FormGroup;

  /**
   * Called when the user presses the login button.
   * Validates the form hand tries to login the user
   */
  public onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.notification.notifyAboutFormErrors(this.loginForm);
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.auth.login(email, password).subscribe();
  }

  /**
   * Called when the user presses the Sign up button in the account creation form.
   * Validates the form and gives user feedback if fields have errors
   * Will then try to register the user
   */
  public onSignUp() {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      this.notification.notifyAboutFormErrors(this.createForm);
      return;
    }

    const user: IUser = {
      name: this.createForm.value.name,
      email: this.createForm.value.email,
      password: this.createForm.value.password,
      bankAccount: this.createForm.value.bankAccount
    };

    this.auth.register(user).subscribe();
  }

  ngOnInit() {}
}
