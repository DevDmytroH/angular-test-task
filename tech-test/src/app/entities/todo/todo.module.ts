import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';

import { SharedModule } from '../../shared/shared.module';
import { TodoRoutingModule } from './todo-routing.module';

import { TodoActionControlService } from './services/todo-action-control.service';
import { TodoDataService } from './services/todo-data.service';
import { TodoEntityService } from './services/todo-entity.service';
import { TodoResolver } from './services/todo.resolver';
import { TodoComponent } from './todo.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoLabelComponent } from './components/todo-label/todo-label.component';
import { PopupTodoUpdateComponent } from './components/popup-todo-update/popup-todo-update.component';
import { CreateTodoComponent } from './components/create-todo/create-todo.component';
import { ITodoItem } from './todo.interface';

const entityMetadata: EntityMetadataMap = {
  Todo: {
    entityDispatcherOptions: {
      optimisticUpdate: true
    },
    sortComparer: (a: ITodoItem, b: ITodoItem) => b.id - a.id
  }
}

@NgModule({
  declarations: [
    TodoComponent,
    TodoItemComponent,
    TodoLabelComponent,
    PopupTodoUpdateComponent,
    CreateTodoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TodoRoutingModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [
    TodoEntityService,
    TodoResolver,
    TodoActionControlService,
    TodoDataService,
    DatePipe
  ]
})
export class TodoModule {
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private todoDataService: TodoDataService
  ) {
    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerService('Todo', todoDataService);
  }
}
