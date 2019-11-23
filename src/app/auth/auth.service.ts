import { Injectable, OnDestroy } from "@angular/core";
import { IUser } from "../api/models/user.interface";
import { APIService } from "../api/api.service";
import { untilDestroyed } from "ngx-take-until-destroy";
import { Observable } from "rxjs";
import { tap, map } from "rxjs/operators";

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

  constructor(private api: APIService) {}

  /**
   * Tries to login the user with the given credentials.
   * Will (currently) log to the console if the login failed
   * @param email The email of the user to login
   * @param password The password of the user to login
   */
  public login(email: string, password: string): Observable<boolean> {
    return this.api.getUserByEmail(email).pipe(
      untilDestroyed(this),
      map(user => {
        if (!user) {
          console.log("Login failed");
          return false;
        }
        const loginSuccessful = user.password === password;
        if (!loginSuccessful) {
          console.log("Login failed");
          return false;
        }

        this.currentUser = user;
        this.isLoggedIn = true;
        return true;
      })
    );
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
