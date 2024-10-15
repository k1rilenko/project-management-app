import { Component } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { boardsActions } from '../../../store/boards/boards.actions';
import { FormFieldComponent } from '../../form/form-field/form-field.component';
import { FormFieldLabelComponent } from '../../form/form-field-label/form-field-label.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormWrapperComponent } from '../../form/form-wrapper/form-wrapper.component';
import { ButtonComponent } from '../../../shared/button/button.component';

@Component({
  selector: 'app-create-board',
  standalone: true,
  imports: [ReactiveFormsModule, FormFieldComponent, FormFieldLabelComponent, TranslateModule, FormWrapperComponent, ButtonComponent],
  templateUrl: './create-board.component.html',
  styleUrl: './create-board.component.scss',
})
export class CreateBoardComponent {
  public form: ReturnType<typeof this.getForm>;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private store: Store,
  ) {
    this.form = this.getForm();
  }

  public submit() {
    const formValue = this.form.getRawValue();
    this.store.dispatch(boardsActions.createBoard({ board: formValue }));
  }

  private getForm() {
    return this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }
}
