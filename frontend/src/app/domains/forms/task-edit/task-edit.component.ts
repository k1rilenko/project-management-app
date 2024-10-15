import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, filter, map, Observable, switchMap, tap } from 'rxjs';
import { TaskEditOptions, TaskEditViewModel } from './models/task-edit.view-model';
import { routerSelectors } from '../../../store/router/router.selectors';
import { boardsSelector } from '../../../store/boards/boards.selectors';
import { columnsSelectors } from '../../../store/columns/columns.selectors';
import { usersSelectors } from '../../../store/users/users.selectors';
import { isNotUndefined } from '../../../utils/is-not-undefined';
import { tasksSelectors } from '../../../store/tasks/tasks.selectors';
import { AsyncPipe } from '@angular/common';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskEditFormControls, TaskEditFormParams } from './models/form.models';
import { FormFieldComponent } from '../../form/form-field/form-field.component';
import { FormFieldLabelComponent } from '../../form/form-field-label/form-field-label.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { tasksActions } from '../../../store/tasks/tasks.actions';
import { UpdateTaskRequestBody } from '../../../services/api/requests/task/update-task.request';
import { TranslateModule } from '@ngx-translate/core';
import { FormWrapperComponent } from '../../form/form-wrapper/form-wrapper.component';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    FormFieldComponent,
    FormFieldLabelComponent,
    ButtonComponent,
    TranslateModule,
    FormWrapperComponent,
  ],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskEditComponent {
  public vm$: Observable<TaskEditViewModel | undefined>;
  public form$ = new BehaviorSubject<FormGroup<TaskEditFormControls> | null>(null);

  constructor(
    private store: Store,
    private formBuilder: NonNullableFormBuilder,
  ) {
    this.vm$ = combineLatest([
      this.store.select(routerSelectors.params.taskId).pipe(filter(isNotUndefined)),
      this.store.select(boardsSelector.boards),
      this.store.select(columnsSelectors.columns),
      this.store.select(usersSelectors.users),
    ]).pipe(
      switchMap(([taskId, boardEntities, columnEntities, userEntities]) =>
        this.store.select(tasksSelectors.taskById(taskId)).pipe(
          filter(isNotUndefined),
          map(taskEntity => {
            const vm: TaskEditViewModel = {
              id: taskId,
              title: taskEntity.title,
              description: taskEntity.description,
              boardOptions: boardEntities.map(boardEntity => ({
                name: boardEntity.title,
                value: boardEntity.id,
                selected: boardEntity.id === taskEntity.boardId,
              })),
              columnOptions: columnEntities.map(columnEntity => ({
                name: columnEntity.title,
                value: columnEntity.id,
                selected: columnEntity.id === taskEntity.columnId,
              })),
              userOptions: userEntities.map(userEntity => ({
                name: userEntity.name,
                value: userEntity.id,
                selected: userEntity.id === taskEntity.userId,
              })),
            };
            return vm;
          }),
          tap(vm =>
            this.form$.next(
              this.getForm({
                title: vm.title,
                description: vm.description,
                user: this.getSelectedOption(vm, 'userOptions'),
                board: this.getSelectedOption(vm, 'boardOptions'),
                column: this.getSelectedOption(vm, 'columnOptions'),
              }),
            ),
          ),
        ),
      ),
    );
  }

  submit(taskId: string) {
    const formValue = this.form$.value?.getRawValue();
    if (formValue) {
      const body: Omit<UpdateTaskRequestBody, 'order'> = {
        title: formValue.title,
        description: formValue.description,
        columnId: formValue.column,
        userId: formValue.user,
        boardId: formValue.board,
      };
      this.store.dispatch(tasksActions.updateTask({ params: { taskId, body } }));
    }
  }

  private getForm(params: TaskEditFormParams) {
    return this.formBuilder.group({
      title: [params.title, [Validators.required, Validators.minLength(3)]],
      description: [params.description, [Validators.required, Validators.minLength(3)]],
      board: [params.board, [Validators.required]],
      column: [params.column, [Validators.required]],
      user: [params.user, [Validators.required]],
    });
  }

  private getSelectedOption(vm: TaskEditViewModel, optionName: keyof Partial<TaskEditOptions>): string {
    const selectedOption = vm[optionName].find(el => el.selected)?.value;
    return selectedOption || '';
  }
}
