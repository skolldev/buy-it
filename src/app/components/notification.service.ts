import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormGroup, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  /**
   * Displays a notification to the user at the bottom of the page
   * @param message The message to show to the user. HTML is not supported
   */
  public notify(message: string) {
    this.snackBar.open(message, "", { duration: 5000 });
  }

  /**
   * Displays a notification with an additional action to the user.
   * Returns an observable that emits when the action was clicked.
   * @param message The message to show to the user. HTML is not supported
   * @param actionText The text of the action button
   */
  public action(message: string, actionText: string): Observable<void> {
    return this.snackBar
      .open(message, actionText, { duration: 5000 })
      .onAction();
  }

  /**
   * Searches through the given form group for validation errors, displaying them to the user via a notification
   * @param group The form group to check
   */
  public notifyAboutFormErrors(group: FormGroup) {
    let message = "";
    if (group.errors) {
      if (group.errors.passwordsMatch === true) {
        message += "The passwords do not match. ";
      }
    }

    const requiredFields = [];
    const emailFields = [];

    Object.keys(group.controls).forEach(key => {
      const controlErrors: ValidationErrors = group.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          switch (keyError) {
            case "required":
              requiredFields.push(`'${key}'`);
              break;
            case "email":
              emailFields.push(`'${key}'`);
              break;
            default:
              console.warn(`${keyError} is not a recognized error.`);
          }
        });
      }
    });

    if (requiredFields.length !== 0) {
      message += ` These fields are required: ${requiredFields.join(", ")}.`;
    }
    if (emailFields.length !== 0) {
      message += ` These fields need to be a valid email ${emailFields.join(
        ", "
      )}.`;
    }
    this.notify(message);
  }
}
