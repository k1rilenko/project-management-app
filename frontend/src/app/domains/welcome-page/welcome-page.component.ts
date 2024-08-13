import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { ModalService } from '../modal/modal.service';
import { ModalPathEnum } from '../modal/modal-path.enum';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss',
})
export class WelcomePageComponent {
  constructor(private modalService: ModalService) {}

  openModal(path: ModalPathEnum) {
    this.modalService.open(path);
  }

  protected readonly ModalPathEnum = ModalPathEnum;
}
