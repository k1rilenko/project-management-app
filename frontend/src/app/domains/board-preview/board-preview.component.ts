import { Component, Input } from '@angular/core';
import { BoardEntity } from '../../store/boards/models/board.entity';
import { boardsFeature } from '../../store/boards/boards.feature';
import { ButtonComponent } from '../../shared/button/button.component';
import { ModalService } from '../modal/modal.service';
import { Router } from '@angular/router';
import { ModalPathEnum } from '../modal/modal-path.enum';
import { ConfirmationDialogName } from '../confirmation-dialog/models/confirmation-dialog-name.enum';

@Component({
  selector: 'app-board-preview',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './board-preview.component.html',
  styleUrl: './board-preview.component.scss',
})
export class BoardPreviewComponent {
  @Input({ required: true }) board!: BoardEntity;

  constructor(
    private router: Router,
    private modalService: ModalService,
  ) {}

  deleteBoard(event: Event) {
    event.stopPropagation();
    this.modalService.open([ModalPathEnum.CONFIRMATION_DIALOG, ConfirmationDialogName.DELETE_BOARD, this.board.id]);
  }

  openBoard() {
    if (this.board) {
      this.router.navigate(['main', 'board', this.board.id]);
    }
  }
}
