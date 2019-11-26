import {
  Directive,
  Output,
  EventEmitter,
  HostListener,
  ElementRef
} from "@angular/core";

@Directive({
  selector: "[appClickOutside]"
})
/**
 * Emits an event whenever an element except this one was clicked
 * Will not emit an event when the other element does not propagate its click event
 */
export class ClickOutsideDirective {
  @Output()
  public clickOutside = new EventEmitter();

  @HostListener("document:click", ["$event.target"])
  public onClick(targetElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit(null);
    }
  }

  constructor(private elementRef: ElementRef) {}
}
