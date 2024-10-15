import { Component } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { columnsActions } from '../../../store/columns/columns.actions';
import { FormFieldComponent } from '../../form/form-field/form-field.component';
import { FormFieldLabelComponent } from '../../form/form-field-label/form-field-label.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormWrapperComponent } from '../../form/form-wrapper/form-wrapper.component';
import { ButtonComponent } from '../../../shared/button/button.component';

@Component({
  selector: 'app-create-column',
  standalone: true,
  imports: [ReactiveFormsModule, FormFieldComponent, FormFieldLabelComponent, TranslateModule, FormWrapperComponent, ButtonComponent],
  templateUrl: './create-column.component.html',
  styleUrl: './create-column.component.scss',
})
export class CreateColumnComponent {
  public form: ReturnType<typeof this.getForm>;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private store: Store,
  ) {
    this.form = this.getForm();
  }

  public getForm() {
    return this.formBuilder.group({ title: ['', Validators.required] });
  }

  public submit() {
    const formValue = this.form.getRawValue();
    this.store.dispatch(columnsActions.createColumn({ body: formValue }));
  }
}
