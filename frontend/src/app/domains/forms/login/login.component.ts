import { Component } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { loginActions } from '../../../store/login/login.actions';
import { FormFieldComponent } from '../../form/form-field/form-field.component';
import { FormFieldLabelComponent } from '../../form/form-field-label/form-field-label.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, FormFieldComponent, FormFieldLabelComponent, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public form: ReturnType<typeof this.getSignInForm>;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private store: Store,
  ) {
    this.form = this.getSignInForm();
  }

  private getSignInForm() {
    return this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit() {
    const body = this.form.getRawValue();
    this.store.dispatch(loginActions.login({ requestBody: body }));
  }
}
