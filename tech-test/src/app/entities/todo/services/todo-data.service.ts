import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { getLastChanges } from '../../../core/utils/get-last-changes.constant';
import { ITodoItem } from '../todo.interface';

@Injectable()
export class TodoDataService extends DefaultDataService<ITodoItem> {
  private readonly _todoApi = `${environment.apiUrl}tasks`;


  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Todo', http, httpUrlGenerator);
  }

  public getAll(): Observable<ITodoItem[]> {
    return this.http.get<ITodoItem[]>(`${this._todoApi}`)
               .pipe(map(todos => todos.map(todo => getLastChanges(todo))));
  }

  public delete(key: number | string): Observable<number | string> {
    return this.http.delete<number | string>(`${this._todoApi}/${key}`);
  }

  public update(update: Update<ITodoItem>): Observable<ITodoItem> {
    return this.http.patch<ITodoItem>(`${this._todoApi}/${update.id}`, update).pipe(pluck('changes'));
  }

  public upsert(entity: ITodoItem): Observable<ITodoItem> {
    return this.http.post<ITodoItem>(`${this._todoApi}`, entity);
  }
}
