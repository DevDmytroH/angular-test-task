import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, take } from 'rxjs/operators';

import { IOptionsMenuItem } from '../../../shared/components/options-menu/interfaces/options-menu-item.interface';
import { PopupTodoUpdateComponent } from '../components/popup-todo-update/popup-todo-update.component';
import { IActionControl } from '../interfaces/action-control.interface';
import { ITodoItem } from '../todo.interface';
import { TodoEntityService } from './todo-entity.service';

@Injectable()
export class TodoActionControlService implements IActionControl<ITodoItem> {

  constructor(
    private _matDialog: MatDialog,
    private _todoEntityService: TodoEntityService,
    private _datePipe: DatePipe
  ) { }

  public getActions(todo: ITodoItem): IOptionsMenuItem[] {
    const resultActions: IOptionsMenuItem[] = [];

    resultActions.push(this._generateUpdateTodoAction(todo));
    resultActions.push(this._generateDeleteService(todo));
    resultActions.push(this._toggleTaskCompletion(todo));

    return resultActions;
  }

  private _generateUpdateTodoAction(todo: ITodoItem): IOptionsMenuItem {
    return {
      icon: 'ic-edit',
      text: 'Update',
      handler: () => {
        this._matDialog.open(PopupTodoUpdateComponent, {
          data: {
            type: 'update',
            todo
          }
        })
            .afterClosed()
            .pipe(
              take(1),
              filter(value => !!value),
            )
            .subscribe((updatedTodo: ITodoItem) => {
              this._todoEntityService.update(updatedTodo);
            });
      }
    }
  }

  private _generateDeleteService(todo: ITodoItem): IOptionsMenuItem {
    return {
      icon: 'ic-delete',
      text: 'Delete',
      handler: () => {
        this._todoEntityService.delete(todo);
      }
    }
  }

  private _toggleTaskCompletion(todo: ITodoItem): IOptionsMenuItem {
    const isCompleted = todo.done;

    return {
      icon: `${isCompleted ? 'ic-not-done' : 'ic-done'}`,
      text: `Mark as ${isCompleted ? 'uncompleted' : 'completed'}`,
      handler: () => {
        const updatedTask: ITodoItem = {
          ...todo,
          done: isCompleted ? false : this._datePipe.transform(new Date(), 'dd-MM-YYYY')
        }

        this._todoEntityService.update(updatedTask);
      }
    }
  }
}
