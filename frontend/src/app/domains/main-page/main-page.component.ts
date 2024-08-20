import { Component } from '@angular/core';
import { provideRouter, RouterModule, RouterOutlet, Routes } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

const routes: Routes = [];

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  providers: [],
})
export class MainPageComponent {}
