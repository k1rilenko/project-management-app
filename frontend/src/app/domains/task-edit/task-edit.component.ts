import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskEditComponent {

}
