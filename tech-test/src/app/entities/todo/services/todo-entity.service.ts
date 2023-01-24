import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

import { ITodoItem } from '../todo.interface';

@Injectable()
export class TodoEntityService extends EntityCollectionServiceBase<ITodoItem> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Todo', serviceElementsFactory);
  }
}
