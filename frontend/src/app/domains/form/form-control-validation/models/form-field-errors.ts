import { InjectionToken } from '@angular/core';
import { FormFiledErrorKey } from './form-filed-error-key';
import { FormFieldError } from './form-field-error';

export type FormFieldErrors = Record<FormFiledErrorKey, FormFieldError>;
export type CustomFormFieldErrors = Partial<FormFieldErrors> & { [key: string]: string };

export const DEFAULT_FORM_FIELD_ERRORS: FormFieldErrors = {
  required: 'error.form-field.required',
  minlength: 'error.form-field.min-length',
  maxlength: 'error.form-field.max-length',
  minDate: 'error.form-field.min-date',
  pattern: 'error.form-field.pattern',
};

export const FORM_FIELD_ERRORS = new InjectionToken<FormFieldErrors>('FORM_FIELD_ERRORS', {
  providedIn: 'root',
  factory: () => DEFAULT_FORM_FIELD_ERRORS,
});
