import { Component, Input, OnInit } from '@angular/core';
import { ColumnEntity } from '../../store/columns/models/column.entity';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TaskEntity } from '../../store/tasks/models/task.entity';
import { tasksSelectors } from '../../store/tasks/tasks.selectors';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { TaskPreviewComponent } from '../task-preview/task-preview.component';
import { FormBuilder, FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../shared/button/button.component';
import { columnsActions } from '../../store/columns/columns.actions';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, TaskPreviewComponent, ButtonComponent, ReactiveFormsModule, CdkDropList, CdkDrag],
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss',
})
export class ColumnComponent implements OnInit {
  @Input() column!: ColumnEntity;
  public tasks$: Observable<TaskEntity[]> | undefined;
  public columnTitle: FormControl<string>;
  public isFocus = false;

  constructor(
    private store: Store,
    private formBuilder: NonNullableFormBuilder,
  ) {
    this.columnTitle = this.formBuilder.control('', [Validators.minLength(3)]);
  }

  ngOnInit() {
    this.columnTitle.setValue(this.column.title);
    this.tasks$ = this.store.select(tasksSelectors.tasksForColumn(this.column.id));
  }

  renameColumnTitle() {
    if (this.columnTitle.valid) {
      this.store.dispatch(
        columnsActions.updateColumn({
          columnId: this.column.id,
          data: { title: this.columnTitle.value },
        }),
      );
    }
  }

  changeFocusStatus(status: boolean) {
    this.isFocus = status;
  }

  drop(event: CdkDragDrop<any, any, TaskEntity>) {
    console.log(event);
  }
}