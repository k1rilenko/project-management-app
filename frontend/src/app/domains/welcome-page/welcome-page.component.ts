import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { ModalService } from '../modal/modal.service';
import { ModalPathEnum } from '../modal/modal-path.enum';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../services/translation/translation.service';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [ButtonComponent, TranslateModule, LanguageSelectorComponent],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss',
})
export class WelcomePageComponent {
  protected readonly ModalPathEnum = ModalPathEnum;

  constructor(
    private modalService: ModalService,
    private translationService: TranslationService,
  ) {}

  openModal(path: ModalPathEnum) {
    this.modalService.open(path);
  }
}
