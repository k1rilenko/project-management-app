import { Component } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { createBoardRequest } from '../../services/api/requests/create-board.request';

@Component({
  selector: 'app-create-board',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-board.component.html',
  styleUrl: './create-board.component.scss',
})
export class CreateBoardComponent {
  public form: ReturnType<typeof this.getForm>;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private apiService: ApiService,
  ) {
    this.form = this.getForm();
  }

  public submit() {
    const formValue = this.form.getRawValue();
    //NEED MOVE LOGIC IN EFFECT!
    this.apiService.send(createBoardRequest(formValue)).subscribe(v => console.log(v));
  }

  private getForm() {
    return this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }
}
