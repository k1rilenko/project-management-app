import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (formControl: AbstractControl): ValidationErrors | null => {
    const passwordFormControl = formControl.parent?.get('password');
    if (!passwordFormControl) {
      return null;
    }
    const confirmPasswordValue = formControl.value;
    if (passwordFormControl.value !== confirmPasswordValue) {
      return {
        passwordMismatch: true,
      };
    }
    return null;
  };
}
