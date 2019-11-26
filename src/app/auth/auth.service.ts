import { Injectable, OnDestroy } from "@angular/core";
import { IUser } from "../api/models/user.interface";
import { APIService } from "../api/api.service";
import { untilDestroyed } from "ngx-take-until-destroy";
import { Observable, of } from "rxjs";
import { map, tap, mergeMap } from "rxjs/operators";
import { NotificationService } from "../components/notification.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService implements OnDestroy {
  /**
   * Whether a user is currently logged in
   */
  public isLoggedIn = false;

  /**
   * Contains all data of the currently logged in user
   */
  public currentUser: IUser = {
    name: "Alexander May",
    email: "admin@system",
    password: "root",
    bankAccount: "111 222 333 444 5"
  };

  constructor(
    private api: APIService,
    private notification: NotificationService,
    private router: Router
  ) {}

  /**
   * Tries to login the user with the given credentials.
   *
   * Will display a snackbar showing whether the login was successful
   *
   * Also returns an observable containing the results of the login
   * @param email The email of the user to login
   * @param password The password of the user to login
   */
  public login(email: string, password: string): Observable<boolean> {
    return this.api.getUserByEmail(email).pipe(
      untilDestroyed(this),
      map(user => {
        if (!user) {
          this.notification.notify("Login failed");
          return false;
        }
        const loginSuccessful = user.password === password;
        if (!loginSuccessful) {
          this.notification.notify("Login failed");
          return false;
        }

        this.currentUser = user;
        this.isLoggedIn = true;
        this.notification.notify("Login successful");
        return true;
      })
    );
  }

  /**
   * Tries to create a new account for the user with the given information.
   * Will fail if a user with the given email already exists.
   * Returns an observable containing the success status
   * @param newUser The user information to create a new account for.
   */
  public register(newUser: IUser) {
    return this.api.getUserByEmail(newUser.email).pipe(
      untilDestroyed(this),
      mergeMap(user => {
        if (user) {
          this.notification.notify("A user with this email already exists.");
          return of(false);
        }

        return this.api.addUser(newUser).pipe(
          untilDestroyed(this),
          tap(result => {
            this.notification.notify(
              "Successfully registered. You can now login."
            );
          })
        );
      })
    );
  }

  /**
   * Sets the loggedIn status to false and clears the current user
   * Navigates the user back to the start page
   */
  public logout() {
    this.currentUser = undefined;
    this.isLoggedIn = false;
    this.router.navigate(["/"]);
  }
  ngOnDestroy(): void {}
}
