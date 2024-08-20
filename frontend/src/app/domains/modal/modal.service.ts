import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ModalPathEnum } from './modal-path.enum';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private router: Router) {}

  public open(path: ModalPathEnum) {
    this.router.navigate([{ outlets: { modal: path } }]);
  }

  public close() {
    return this.router.navigate([{ outlets: { modal: null } }]);
  }
}
