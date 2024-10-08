import { FormControl, FormGroup } from '@angular/forms';

export interface TaskEditFormControls {
  title: FormControl<string>;
  description: FormControl<string>;
  board: FormControl<string>;
  column: FormControl<string>;
  user: FormControl<string>;
}

export type TaskEditFormParams = {
  [K in keyof TaskEditFormControls]: TaskEditFormControls[K]['value'];
};
