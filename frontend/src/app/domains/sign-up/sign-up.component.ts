import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ApiService } from '../../services/api/api.service';
import { signUpRequest, SignUpRequestBody } from '../../services/api/requests/sign-up.request';
import { Store } from '@ngrx/store';
import { signUpActions } from '../../store/sign-up/sign-up.actions';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  public signUpForm: FormGroup<{
    login: FormControl<string>;
    password: FormControl<string>;
    name?: FormControl<string>;
  }>;

  public shownNameFormField = false;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private store: Store,
  ) {
    this.signUpForm = this.getSignUpForm();
  }

  private getSignUpForm() {
    return this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(7)]],
    });
  }

  toggleNameInput() {
    if (!this.shownNameFormField) {
      this.signUpForm.addControl('name', this.formBuilder.control('', Validators.minLength(6)));
      this.shownNameFormField = true;
    } else {
      this.signUpForm.removeControl('name');
      this.shownNameFormField = false;
    }
  }

  onSubmit() {
    const formValue = this.signUpForm.getRawValue();
    if (!formValue.name) {
      formValue.name = formValue.login;
    }

    this.store.dispatch(signUpActions.signUp({ requestBody: formValue as SignUpRequestBody }));
  }
}
