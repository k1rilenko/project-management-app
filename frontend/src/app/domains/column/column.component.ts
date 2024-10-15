import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ColumnEntity } from '../../store/columns/models/column.entity';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TaskEntity } from '../../store/tasks/models/task.entity';
import { tasksSelectors } from '../../store/tasks/tasks.selectors';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { TaskPreviewComponent } from '../task-preview/task-preview.component';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../shared/button/button.component';
import { columnsActions } from '../../store/columns/columns.actions';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { tasksActions } from '../../store/tasks/tasks.actions';
import { ModalService } from '../modal/modal.service';
import { ModalPathEnum } from '../modal/modal-path.enum';
import { ConfirmationDialogName } from '../confirmation-dialog/models/confirmation-dialog-name.enum';
import { TranslateModule } from '@ngx-translate/core';
import { slideIn } from '../../animations/slide-in.animation';
import { FormFieldComponent } from '../form/form-field/form-field.component';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    TaskPreviewComponent,
    ButtonComponent,
    ReactiveFormsModule,
    CdkDropList,
    CdkDrag,
    TranslateModule,
    NgIf,
    FormFieldComponent,
  ],
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideIn()],
})
export class ColumnComponent implements OnInit {
  @Input() column!: ColumnEntity;
  public tasks$: Observable<TaskEntity[]> | undefined;
  public columnTitle: FormControl<string>;
  public isFocus = false;

  constructor(
    private store: Store,
    private formBuilder: NonNullableFormBuilder,
    private modalService: ModalService,
  ) {
    this.columnTitle = this.formBuilder.control('', [Validators.minLength(3)]);
  }

  ngOnInit() {
    this.columnTitle.setValue(this.column.title);
    this.tasks$ = this.store.select(tasksSelectors.tasksForColumn(this.column.id));
  }

  renameColumnTitle() {
    if (this.columnTitle.valid) {
      if (this.column.title !== this.columnTitle.value) {
        this.store.dispatch(
          columnsActions.updateColumn({
            columnId: this.column.id,
            data: { title: this.columnTitle.value },
          }),
        );
      }
      this.changeFocusStatus(false);
    }
  }

  changeFocusStatus(status: boolean) {
    this.isFocus = status;
  }

  drop(event: CdkDragDrop<TaskEntity[], TaskEntity[], TaskEntity>) {
    const { container, previousContainer, previousIndex, currentIndex, item } = event;
    const taskId = item.data.id;
    if (container.id !== previousContainer.id || previousIndex !== currentIndex) {
      this.store.dispatch(
        tasksActions.dragTask({
          currentColumnId: container.id,
          prevColumnId: previousContainer.id,
          currentIndex,
          prevIndex: previousIndex,
          taskId,
        }),
      );
    }
  }

  deleteColumn() {
    this.modalService.open([ModalPathEnum.CONFIRMATION_DIALOG, ConfirmationDialogName.DELETE_COLUMN, this.column.id]);
  }

  abortRename() {
    if (this.column.title !== this.columnTitle.value) {
      this.columnTitle.setValue(this.column.title);
    }
    this.changeFocusStatus(false);
  }
}
