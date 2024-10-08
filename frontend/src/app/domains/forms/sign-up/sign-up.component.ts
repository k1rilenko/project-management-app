import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { SignUpRequestBody } from '../../../services/api/requests/sign-up.request';
import { Store } from '@ngrx/store';
import { signUpActions } from '../../../store/sign-up/sign-up.actions';
import { FormFieldComponent } from '../../form/form-field/form-field.component';
import { FormFieldLabelComponent } from '../../form/form-field-label/form-field-label.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, FormFieldComponent, FormFieldLabelComponent, TranslateModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  public form: FormGroup<{
    login: FormControl<string>;
    password: FormControl<string>;
    name?: FormControl<string>;
  }>;

  public shownNameFormField = false;

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
    });
  }

  toggleNameInput() {
    if (!this.shownNameFormField) {
      this.form.addControl('name', this.formBuilder.control('', Validators.minLength(6)));
      this.shownNameFormField = true;
    } else {
      this.form.removeControl('name');
      this.shownNameFormField = false;
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
