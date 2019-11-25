import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class RedirectService {
  public lastVisitedURL: string;

  constructor(private router: Router) {}

  /**
   * Returns the user to the last visited url, if there is one
   *
   * Afterwards clears the last visited url
   */
  public returnToLastURL() {
    if (!this.lastVisitedURL) {
      return;
    }

    const temp = this.lastVisitedURL;
    this.lastVisitedURL = undefined;
    this.router.navigate([temp]);
  }
}
