import { Injectable } from "@angular/core";
import { IUser } from "../api/models/user.interface";
import { APIService } from "../api/api.service";
import { untilDestroyed } from "ngx-take-until-destroy";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public isLoggedIn = false;

  public currentUser: IUser;

  constructor(private api: APIService) {}

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

  public logout() {
    this.currentUser = undefined;
    this.isLoggedIn = false;
  }
}
