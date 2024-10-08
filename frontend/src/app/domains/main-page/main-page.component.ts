import { Component, inject, OnInit } from '@angular/core';
import { provideRouter, RouterModule, RouterOutlet, Routes } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { Store } from '@ngrx/store';
import { usersActions } from '../../store/users/users.actions';
import { animations } from '../header/header.animations';
import { AsyncPipe, DOCUMENT } from '@angular/common';
import { debounceTime, distinctUntilChanged, fromEvent, map, Observable, startWith, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, AsyncPipe],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  providers: [],
  animations: animations,
})
export class MainPageComponent implements OnInit {
  public headerAnimationTrigger$: Observable<string>;

  private store = inject(Store);
  private document = inject(DOCUMENT);

  constructor() {
    this.headerAnimationTrigger$ = fromEvent(this.document, 'scroll').pipe(
      startWith('top'),
      debounceTime(50),
      map(() => (this.document.documentElement.scrollTop >= 60 ? 'scroll' : 'top')),
      takeUntilDestroyed(),
    );
  }

  ngOnInit(): void {
    this.store.dispatch(usersActions.getUsers());
  }
}
