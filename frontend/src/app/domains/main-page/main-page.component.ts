import { Component, inject, OnInit } from '@angular/core';
import { provideRouter, RouterModule, RouterOutlet, Routes } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { Store } from '@ngrx/store';
import { usersActions } from '../../store/users/users.actions';

const routes: Routes = [];

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  providers: [],
})
export class MainPageComponent implements OnInit {
  private store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(usersActions.getUsers());
  }
}
