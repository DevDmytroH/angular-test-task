import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { IOptionsMenuItem } from '../../../../shared/components/options-menu/interfaces/options-menu-item.interface';

import { ITodoItem } from '../../todo.interface';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent {
  @Input() todo!: ITodoItem;
  @Input() itemMenu!: IOptionsMenuItem[];
}
