import { Component } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { usersSelectors } from '../../../store/users/users.selectors';
import { UserEntity } from '../../../store/users/models/user.entity';
import { AsyncPipe } from '@angular/common';
import { ColumnEntity } from '../../../store/columns/models/column.entity';
import { columnsSelectors } from '../../../store/columns/columns.selectors';
import { CreateTaskActionParam, tasksActions } from '../../../store/tasks/tasks.actions';
import { FormFieldLabelComponent } from '../../form/form-field-label/form-field-label.component';
import { FormFieldComponent } from '../../form/form-field/form-field.component';
import { TranslateModule } from '@ngx-translate/core';

export interface UserSelectOptionsInterface {
  text: UserEntity['name'];
  value: UserEntity['id'];
}

export interface ColumnSelectOptionsInterface {
  text: ColumnEntity['title'];
  value: ColumnEntity['id'];
}

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, FormFieldLabelComponent, FormFieldComponent, TranslateModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
})
export class CreateTaskComponent {
  public form: ReturnType<typeof this.getForm>;
  public userSelectOptions$: Observable<UserSelectOptionsInterface[]>;
  public columnSelectOptions$: Observable<ColumnSelectOptionsInterface[]>;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private store: Store,
  ) {
    this.form = this.getForm();
    this.userSelectOptions$ = this.store.select(usersSelectors.users).pipe(
      map(users =>
        users.map(user => ({
          value: user.id,
          text: user.name,
        })),
      ),
    );

    this.columnSelectOptions$ = this.store.select(columnsSelectors.columns).pipe(
      map(columns =>
        columns.map(column => ({
          value: column.id,
          text: column.title,
        })),
      ),
    );
  }

  private getForm() {
    return this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      user: ['', [Validators.required]],
      column: ['', [Validators.required]],
    });
  }

  submit() {
    const { column, description, user, title } = this.form.getRawValue();
    const createTaskActionParam: CreateTaskActionParam = {
      body: {
        title,
        description,
        userId: user,
      },
      columnId: column,
    };
    this.store.dispatch(tasksActions.createTask({ params: createTaskActionParam }));
  }
}
