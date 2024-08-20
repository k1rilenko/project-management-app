import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { ModalService } from '../modal/modal.service';
import { ModalPathEnum } from '../modal/modal-path.enum';
import { StorageService } from '../../services/storage/storage.service';
import { fromStorage } from '../../services/storage/from-storage.function';

type ColorScheme = 'light' | 'dark';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss',
})
export class WelcomePageComponent {
  readonly preferredTheme1 = fromStorage<ColorScheme>('preferred-theme');
  readonly preferredTheme2 = fromStorage<ColorScheme>('preferred-theme');

  togglePreferredTheme(): void {
    this.preferredTheme1.update(current => (current === 'light' ? 'dark' : 'light'));
  }

  setLightTheme(): void {
    this.preferredTheme2.set('light');
  }

  constructor(
    private modalService: ModalService,
    private storageService: StorageService,
  ) {}

  openModal(path: ModalPathEnum) {
    this.modalService.open(path);
  }

  protected readonly ModalPathEnum = ModalPathEnum;
}
