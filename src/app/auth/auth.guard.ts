import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { RedirectService } from "./redirect.service";
import { NotificationService } from "../components/notification.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private redirect: RedirectService,
    private notification: NotificationService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.auth.isLoggedIn) {
      this.redirect.lastVisitedURL = state.url;
      this.notification.notify(
        "Please login to continue. You will be redirected afterwards."
      );
      this.router.navigate(["/auth"]);
      return false;
    }
    return true;
  }
}
