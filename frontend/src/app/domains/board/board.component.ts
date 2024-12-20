import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BoardEntity } from '../../store/boards/models/board.entity';
import { distinctUntilChanged, filter, map, Observable, switchMap } from 'rxjs';
import { boardsSelector } from '../../store/boards/boards.selectors';
import { AsyncPipe, NgIf } from '@angular/common';
import { ButtonComponent } from '../../shared/button/button.component';
import { ModalService } from '../modal/modal.service';
import { ModalPathEnum } from '../modal/modal-path.enum';
import { routerSelectors } from '../../store/router/router.selectors';
import { isNotUndefined } from '../../utils/is-not-undefined';
import { ColumnEntity } from '../../store/columns/models/column.entity';
import { columnsSelectors } from '../../store/columns/columns.selectors';
import { ColumnComponent } from '../column/column.component';
import { columnsActions } from '../../store/columns/columns.actions';
import { boardsActions } from '../../store/boards/boards.actions';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    AsyncPipe,
    ButtonComponent,
    ColumnComponent,
    CdkDropList,
    CdkDrag,
    CdkDropListGroup,
    RouterLink,
    NgIf,
    TranslateModule,
    LoaderComponent,
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit {
  public board$: Observable<BoardEntity | undefined> | undefined;
  public columns$: Observable<ColumnEntity[]> | undefined;
  public isEmptyBoard$: Observable<boolean>;
  public columnsLoading$: Observable<boolean>;

  constructor(
    private store: Store,
    private modalService: ModalService,
  ) {
    this.board$ = this.store.select(routerSelectors.params.boardId).pipe(
      filter(boardId => isNotUndefined(boardId)),
      switchMap(boardId => this.store.select(boardsSelector.selectBoard(boardId))),
    );
    this.columns$ = this.store.select(columnsSelectors.columns);
    this.isEmptyBoard$ = this.store.select(columnsSelectors.selectTotal).pipe(
      distinctUntilChanged(),
      map(count => Boolean(count)),
    );
    this.columnsLoading$ = this.store.select(columnsSelectors.selectLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(boardsActions.getBoards());
    this.store.dispatch(boardsActions.getBoard());
    this.store.dispatch(columnsActions.getColumns());
  }

  createBoard() {
    this.modalService.open(ModalPathEnum.CREATE_COLUMN);
  }

  createTask() {
    this.modalService.open(ModalPathEnum.CREATE_TASK);
  }

  drop(event: CdkDragDrop<ColumnEntity[], ColumnEntity[], ColumnEntity>) {
    const { previousIndex, currentIndex } = event;
    if (currentIndex !== previousIndex) {
      const columnId = event.item.data.id;
      this.store.dispatch(
        columnsActions.dragColumn({
          prevIndex: previousIndex,
          currentIndex: currentIndex,
          columnId,
        }),
      );
    }
  }
}
