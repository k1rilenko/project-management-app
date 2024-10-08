import { Component, HostListener } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, ClickOutsideDirective],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @HostListener('document:keydown.escape', ['$event'])
  handleEscape() {
    this.closeModal();
  }

  constructor(private router: Router) {}

  public closeModal(): void {
    this.router.navigate([{ outlets: { modal: null } }]);
  }
}
