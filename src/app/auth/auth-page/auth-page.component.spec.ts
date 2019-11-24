import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AuthPageComponent } from "./auth-page.component";
import { AppModule } from "src/app/app.module";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { of } from "rxjs";

describe("AuthPageComponent", () => {
  let component: AuthPageComponent;
  let fixture: ComponentFixture<AuthPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should login if form is valid", () => {
    spyOn(component.auth, "login").and.returnValue(of(true));
    const email = "dude@dudetown.com";
    const password = "broski";
    component.loginForm.setValue({
      email,
      password
    });

    component.onLogin();
    expect(component.auth.login).toHaveBeenCalledWith(email, password);

    component.loginForm.controls.password.setValue("");
    component.onLogin();
    expect(component.auth.login).toHaveBeenCalledTimes(1);
  });

  it("should check for matching passwords", () => {
    spyOn(component.auth, "register").and.returnValue(of(true));
    component.createForm.setValue({
      name: "bla",
      email: "master@disaster",
      password: "secret",
      confirmPassword: "secret1",
      bankAccount: "got none"
    });

    component.onSignUp();
    expect(component.auth.register).not.toHaveBeenCalled();

    component.createForm.controls.confirmPassword.setValue("secret");
    component.onSignUp();
    expect(component.auth.register).toHaveBeenCalled();
  });
});
