import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateTodoComponent {
  @Output() createTodoItem: EventEmitter<void> = new EventEmitter<void>();
}
