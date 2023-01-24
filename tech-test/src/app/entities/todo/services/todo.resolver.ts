import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';

import { TodoEntityService } from './todo-entity.service';

@Injectable({
  providedIn: 'root'
})
export class TodoResolver implements Resolve<boolean> {

  constructor(private todosService: TodoEntityService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this.todosService.loaded$.pipe(
      tap(loaded => {
        if (!loaded) this.todosService.getAll();
      }),
      filter(loaded => !!loaded),
      first()
    );
  }
}
