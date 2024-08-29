import { Directive, ElementRef, Input } from '@angular/core';
import { fromEvent } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { CustomFormFieldErrors } from '../models/form-field-errors';

@Directive({
  selector: 'form',
  standalone: true,
})
export class FormSubmitDirective {
  @Input() customErrors: CustomFormFieldErrors = {};

  public submit$ = fromEvent<SubmitEvent>(this.element, 'submit').pipe(shareReplay(1));

  constructor(private elementRef: ElementRef<HTMLFormElement>) {}

  get element() {
    return this.elementRef.nativeElement;
  }
}
