import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { SignUpRequestBody } from '../../../services/api/requests/sign-up.request';
import { Store } from '@ngrx/store';
import { signUpActions } from '../../../store/sign-up/sign-up.actions';
import { FormFieldComponent } from '../../form/form-field/form-field.component';
import { FormFieldLabelComponent } from '../../form/form-field-label/form-field-label.component';
import { TranslateModule } from '@ngx-translate/core';
import { passwordMatchValidator } from '../../../validators/password-match.validator';
import { CustomFormFieldErrors } from '../../form/form-control-validation/models/form-field-errors';
import { CUSTOM_FIELD_ERRORS } from '../../form/form-control-validation/models/custom-form-field-errors';
import { FormWrapperComponent } from '../../form/form-wrapper/form-wrapper.component';
import { slideIn } from '../../../animations/slide-in.animation';
import { marginBottom } from '../../../animations/margin-bottom';
import { ButtonComponent } from '../../../shared/button/button.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    FormFieldComponent,
    FormFieldLabelComponent,
    TranslateModule,
    FormWrapperComponent,
    ButtonComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  animations: [slideIn(), marginBottom(16)],
})
export class SignUpComponent {
  public form: FormGroup<{
    login: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
    name?: FormControl<string>;
  }>;
  public formFieldErrors: CustomFormFieldErrors = CUSTOM_FIELD_ERRORS['password'];
  public isShownNameField = false;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private store: Store,
  ) {
    this.form = this.getSignUpForm();
  }

  private getSignUpForm() {
    return this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(7)]],
      confirmPassword: ['', [Validators.required, passwordMatchValidator()]],
    });
  }

  toggleNameInput() {
    if (!this.isShownNameField) {
      this.form.addControl('name', this.formBuilder.control('', Validators.minLength(6)));
      this.isShownNameField = true;
    } else {
      this.form.removeControl('name');
      this.isShownNameField = false;
    }
  }

  onSubmit() {
    const formValue = this.form.getRawValue();
    if (!formValue.name) {
      formValue.name = formValue.login;
    }
    this.store.dispatch(signUpActions.signUp({ requestBody: formValue as SignUpRequestBody }));
  }
}
