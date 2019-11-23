import { Injectable } from "@angular/core";
import { IUser } from "../api/models/user.interface";
import { APIService } from "../api/api.service";
import { untilDestroyed } from "ngx-take-until-destroy";

@Injectable({
  providedIn: "root"
})
export class AuthService {
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
  public login(email: string, password: string) {
    this.api
      .getUserByEmail(email)
      .pipe(untilDestroyed(this))
      .subscribe(user => {
        if (!user) {
          console.log("Login failed");
          return;
        }
        const loginSuccessful = user.password === password;
        if (!loginSuccessful) {
          console.log("Login failed");
          return;
        }

        this.currentUser = user;
        this.isLoggedIn = true;
      });
  }

  /**
   * Sets the loggedIn status to false and clears the current user
   */
  public logout() {
    this.currentUser = undefined;
    this.isLoggedIn = false;
  }
}
