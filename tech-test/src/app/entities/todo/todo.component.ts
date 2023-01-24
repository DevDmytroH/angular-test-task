import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { logger } from 'codelyzer/util/logger';
import { combineLatest, of, Subject } from 'rxjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, skip, startWith, switchMap, take, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { IOptionsMenuItem } from '../../shared/components/options-menu/interfaces/options-menu-item.interface';
import { FilterPipe } from '../../shared/pipes/filter.pipe';
import { PopupTodoUpdateComponent } from './components/popup-todo-update/popup-todo-update.component';
import { TodoActionControlService } from './services/todo-action-control.service';

import { TodoEntityService } from './services/todo-entity.service';
import { ITodoItem } from './todo.interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [FilterPipe]
})
export class TodoComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<void> = new Subject<void>();

  public searchBarControl: FormControl = new FormControl('');
  public tasks$: Observable<{ todo: ITodoItem, actions: IOptionsMenuItem[] }[]> =
    this._todoEntityService.entities$
        .pipe(
          map(todoItems => {
            return todoItems.map(todoItem => ({
              todo: todoItem,
              actions: this._actionControlService.getActions(todoItem)
            }));
          })
        );

  public filteredTasks$!: Observable<{ todo: ITodoItem, actions: IOptionsMenuItem[] }[]>;

  constructor(
    private _todoEntityService: TodoEntityService,
    private _actionControlService: TodoActionControlService,
    private _matDialog: MatDialog,
    private _filterPipe: FilterPipe
  ) {}

  public ngOnInit() {
    this._listenSearchBar();
  }

  public createNewTodo(): void {
    this._matDialog.open(PopupTodoUpdateComponent, {
      data: {
        mode: 'create',
        todo: {}
      }
    }).afterClosed()
        .pipe(
          take(1),
          filter(value => !!value)
        )
        .subscribe(todo => {
          this._todoEntityService.upsert(todo);
        });
  }

  private _listenSearchBar(): void {
    this.filteredTasks$ = this.searchBarControl.valueChanges
                              .pipe(
                                withLatestFrom(this.tasks$),
                                takeUntil(this._destroy$),
                                map(([searchString, tasks]) => ({ searchString, tasks })),
                                map(({
                                  searchString,
                                  tasks
                                }) => this._filterPipe.transform(tasks, searchString, ['todo', 'label']))
                              )
  }


  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
