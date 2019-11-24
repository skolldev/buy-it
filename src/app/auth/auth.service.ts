import { Injectable, OnDestroy } from "@angular/core";
import { IUser } from "../api/models/user.interface";
import { APIService } from "../api/api.service";
import { untilDestroyed } from "ngx-take-until-destroy";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { NotificationService } from "../components/notification.service";

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
  public currentUser: IUser;

  constructor(
    private api: APIService,
    private notification: NotificationService
  ) {}

  /**
   * Tries to login the user with the given credentials.
   * Will display a snackbar showing whether the login was successful
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
   * @param newUser The user information to create a new account for.
   */
  public register(newUser: IUser) {
    this.api
      .getUserByEmail(newUser.email)
      .pipe(untilDestroyed(this))
      .subscribe(user => {
        if (user) {
          this.notification.notify("A user with this email already exists.");
        }

        this.api
          .addUser(newUser)
          .pipe(untilDestroyed(this))
          .subscribe(result => {
            this.notification.notify(
              "Successfully registered. You can now login."
            );
          });
      });
  }

  /**
   * Sets the loggedIn status to false and clears the current user
   */
  public logout() {
    this.currentUser = undefined;
    this.isLoggedIn = false;
  }
  ngOnDestroy(): void {}
}
