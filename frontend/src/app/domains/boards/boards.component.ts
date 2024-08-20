import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { boardsActions } from '../../store/boards/boards.actions';
import { Observable } from 'rxjs';
import { BoardEntity } from '../../store/boards/models/board.entity';
import { boardsSelector } from '../../store/boards/boards.selectors';
import { CommonModule } from '@angular/common';
import { BoardPreviewComponent } from '../board-preview/board-preview.component';

@Component({
  selector: 'app-boards',
  standalone: true,
  imports: [CommonModule, BoardPreviewComponent],
  templateUrl: './boards.component.html',
  styleUrl: './boards.component.scss',
})
export class BoardsComponent implements OnInit {
  public boards$: Observable<BoardEntity[]>;
  public loading$: Observable<boolean>;

  constructor(private store: Store) {
    this.boards$ = this.store.select(boardsSelector.boards);
    this.loading$ = this.store.select(boardsSelector.loading);
  }

  ngOnInit(): void {
    this.store.dispatch(boardsActions.getBoards());
  }
}
