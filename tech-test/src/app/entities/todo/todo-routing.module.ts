import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoResolver } from './services/todo.resolver';
import { TodoComponent } from './todo.component';

const routes: Routes = [
  {
    path: '',
    component: TodoComponent,
    resolve: { todos: TodoResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule {
}
