import { Component, HostListener } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [RouterOutlet],
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
