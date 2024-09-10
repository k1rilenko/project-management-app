import { Component } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { loginActions } from '../../store/login/login.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public loginForm: ReturnType<typeof this.getSignInForm>;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private store: Store,
  ) {
    this.loginForm = this.getSignInForm();
  }

  private getSignInForm() {
    return this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit() {
    const body = this.loginForm.getRawValue();
    this.store.dispatch(loginActions.login({ requestBody: body }));
  }
}
