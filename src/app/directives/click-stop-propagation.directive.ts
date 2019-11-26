import { Directive, HostListener } from "@angular/core";

@Directive({
  selector: "[appClickStopPropagation]"
})
/**
 * Stops an event on this element from bubbling up.
 */
export class ClickStopPropagationDirective {
  @HostListener("click", ["$event"])
  public onClick(event: any): void {
    event.stopPropagation();
  }
}
