import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { ApiService } from '../../services/api/api.service';
import { signInRequest, SignInRequestBody } from '../../services/api/requests/sign-in.request';
import { Router, RouterOutlet } from '@angular/router';
import { TokenService } from '../../services/token/token.service';
import { Token } from '../../services/token/token.model';
import { ModalService } from '../modal/modal.service';

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
    private apiService: ApiService,
    private formBuilder: NonNullableFormBuilder,
    private tokenService: TokenService,
    private router: Router,
    private modalService: ModalService,
  ) {
    this.loginForm = this.getSignInForm();
  }

  private getSignInForm() {
    return this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const body = this.loginForm.getRawValue();
    this.apiService.send(signInRequest(body)).subscribe(({ token }) => {
      this.tokenService.setToken(token as Token);
      this.modalService.close().then(() => this.router.navigate(['/main']));
    });
  }
}
