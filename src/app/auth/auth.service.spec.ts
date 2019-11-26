import { TestBed } from "@angular/core/testing";

import { AuthService } from "./auth.service";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { IUser } from "../api/models/user.interface";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";

describe("AuthService", () => {
  let authService: AuthService;

  const testUser: IUser = {
    name: "Arthur Dent",
    email: "arthur.dent@aol.com",
    password: "hitchhiker",
    bankAccount: "123123123"
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([])
      ]
    });
    authService = TestBed.get(AuthService);
  });

  it("should register and then login", done => {
    authService.register(testUser).subscribe(result => {
      expect(result).toBe(true);
      authService.login(testUser.email, testUser.password).subscribe(login => {
        expect(login).toBe(true);
        done();
      });
    });
  });

  it("should logout", done => {
    authService.register(testUser).subscribe(() => {
      authService.login(testUser.email, testUser.password).subscribe(() => {
        expect(authService.isLoggedIn).toBe(true);
        expect(authService.currentUser).toEqual(testUser);
        authService.logout();
        expect(authService.isLoggedIn).toBe(false);
        expect(authService.currentUser).not.toBeDefined();
        done();
      });
    });
  });

  it("should not register a user with the same email", done => {
    spyOn(authService["api"], "addUser").and.callThrough();

    const secondUser: IUser = {
      name: "Impostor",
      email: "arthur.dent@aol.com",
      password: "secret124",
      bankAccount: "givemeallyourmoney"
    };

    authService.register(testUser).subscribe(result => {
      expect(result).toBe(true);
      authService.register(secondUser).subscribe(secondResult => {
        expect(secondResult).toBe(false);
        expect(authService["api"].addUser).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });
});
