import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { ModalService } from '../modal/modal.service';
import { ModalPathEnum } from '../modal/modal-path.enum';
import { UserInfoComponent } from '../user-info/user-info.component';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent, UserInfoComponent, LanguageSelectorComponent, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private modalService: ModalService) {}

  createBoard() {
    this.modalService.open(ModalPathEnum.CREATE_BOARD);
  }
}
