import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-form-field-label',
  standalone: true,
  imports: [],
  templateUrl: './form-field-label.component.html',
  styleUrl: './form-field-label.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldLabelComponent {}
