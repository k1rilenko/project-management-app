import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {
  @Output() appClickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  @HostListener('document:click', ['$event.target']) onClickOutside(targetElement: HTMLElement) {
    const clickedElement = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedElement) {
      this.appClickOutside.emit();
    }
  }
}
