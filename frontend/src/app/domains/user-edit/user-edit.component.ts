import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalService } from '../modal/modal.service';
import { UserEntity } from '../../store/users/models/user.entity';
import { filter, map, Observable } from 'rxjs';
import { usersSelectors } from '../../store/users/users.selectors';
import { AsyncPipe } from '@angular/common';
import { FormFieldComponent } from '../form/form-field/form-field.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { FormFieldLabelComponent } from '../form/form-field-label/form-field-label.component';
import { passwordMatchValidator } from '../../validators/password-match.validator';
import { CustomFormFieldErrors } from '../form/form-control-validation/models/form-field-errors';
import { CUSTOM_FIELD_ERRORS } from '../form/form-control-validation/models/custom-form-field-errors';
import { usersActions } from '../../store/users/users.actions';
import { ModalPathEnum } from '../modal/modal-path.enum';
import { ConfirmationDialogName } from '../confirmation-dialog/models/confirmation-dialog-name.enum';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [AsyncPipe, FormFieldComponent, FormFieldLabelComponent, ReactiveFormsModule, ButtonComponent],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEditComponent {
  public form$: Observable<ReturnType<typeof this.getForm>>;
  formFieldErrors: CustomFormFieldErrors = CUSTOM_FIELD_ERRORS['password'];

  constructor(
    private store: Store,
    private formBuilder: NonNullableFormBuilder,
    private modalService: ModalService,
  ) {
    this.form$ = this.store.select(usersSelectors.currentUser).pipe(
      filter(userEntity => !!userEntity),
      map(currentUser => this.getForm(currentUser)),
    );
  }

  private getForm(user: UserEntity) {
    return this.formBuilder.group({
      name: [user.name, Validators.required],
      login: [user.login, Validators.required],
      password: ['', [Validators.required, Validators.minLength(7)]],
      confirmPassword: ['', [Validators.required, passwordMatchValidator()]],
    });
  }

  submit(form: ReturnType<typeof this.getForm>) {
    if (form.valid) {
      const { name, login, password } = form.getRawValue();
      this.store.dispatch(usersActions.updateCurrentUser({ updateUserRequestBody: { name, login, password } }));
    }
  }

  deleteUser() {
    this.modalService.open([ModalPathEnum.CONFIRMATION_DIALOG, ConfirmationDialogName.DELETE_USER]);
  }
}
