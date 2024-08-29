import { ChangeDetectionStrategy, Component, ContentChild, Host, Inject, Input, Optional } from '@angular/core';
import { distinctUntilChanged, EMPTY, map, merge, Observable, ReplaySubject, shareReplay, startWith, switchMap } from 'rxjs';
import { AbstractControl, FormControlStatus, NgControl } from '@angular/forms';
import { FormFiledErrorKey } from '../form-control-validation/models/form-filed-error-key';
import { CustomFormFieldErrors, FORM_FIELD_ERRORS, FormFieldErrors } from '../form-control-validation/models/form-field-errors';
import { FormSubmitDirective } from '../form-control-validation/directives/form-submit.directive';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent {
  @Input() customErrors: CustomFormFieldErrors = {};

  public disabled$: Observable<boolean>;
  public valid$: Observable<boolean>;
  public errorMessage$: Observable<string> | null = null;

  private control$ = new ReplaySubject<AbstractControl>(1);
  private formSubmit$: Observable<SubmitEvent>;

  @ContentChild(NgControl) set ngControl(ngControl: NgControl) {
    if (ngControl?.control) {
      this.control$.next(ngControl.control);
    }
  }

  constructor(
    @Inject(FORM_FIELD_ERRORS) private formFieldErrors: FormFieldErrors,
    @Optional() @Host() private form: FormSubmitDirective,
  ) {
    const statusChange$: Observable<FormControlStatus> = this.control$.pipe(
      switchMap(({ statusChanges, status }) => statusChanges.pipe(startWith(status))),
    );

    this.formSubmit$ = this.form ? this.form.submit$ : EMPTY;

    this.disabled$ = statusChange$.pipe(
      map(status => status === 'DISABLED'),
      shareReplay(1),
    );

    this.valid$ = statusChange$.pipe(
      map(status => status === 'VALID'),
      shareReplay(1),
    );

    this.errorMessage$ = this.control$.pipe(
      switchMap(control =>
        merge(this.formSubmit$, control.statusChanges).pipe(
          map(() => {
            const controlErrors = control.errors;
            if (!controlErrors) {
              return null;
            } else {
              const firstKey = Object.keys(controlErrors)[0] as FormFiledErrorKey;
              const formFieldErrors = { ...this.formFieldErrors, ...this.form?.customErrors, ...this.customErrors };
              const errorText = formFieldErrors[firstKey];
              let errorData = controlErrors[firstKey];
              errorData = Array.isArray(errorData) ? errorData.join(' ') : errorData;
              return errorText ? errorText : errorData || `Unknown error: ${firstKey}`;
            }
          }),
          distinctUntilChanged(),
        ),
      ),
      shareReplay(1),
    );
  }
}
