import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { KeyValuePipe, NgForOf, NgIf } from '@angular/common';
import { ApiService } from '../../services/api/api.service';
import { signUpRequest, SignUpRequestBody } from '../../services/api/requests/sign-up.request';

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
    private apiService: ApiService,
  ) {
    this.signUpForm = this.getSignUpForm();
  }

  private getSignUpForm() {
    return this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  toggleNameInput() {
    if (!this.shownNameFormField) {
      this.signUpForm.addControl('name', this.formBuilder.control(''));
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

    this.apiService.send(signUpRequest(formValue as SignUpRequestBody)).subscribe();
    console.log(this.signUpForm.value);
  }
}
