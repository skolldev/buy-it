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
