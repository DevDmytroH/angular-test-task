import { ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { getElementByTestId } from '../../../../core/utils/get-element-by-test-id.constant';
import { MOCK_TODO_ITEM } from './constants/todo-item.mock';

import { TodoItemComponent } from './todo-item.component';

@Pipe({ name: 'defineCompletion' })
class MockDefineCompletionPipe implements PipeTransform {
  transform(value: string): string {
    return value || 'Uncompleted';
  }
}


describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoItemComponent, MockDefineCompletionPipe],
      imports: [],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).overrideComponent(TodoItemComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;

    component.todo = { ...MOCK_TODO_ITEM };
    component.itemMenu = [];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly render item title & description', () => {
    const title = getElementByTestId(fixture, 'todo-title');
    const description = getElementByTestId(fixture, 'todo-description');

    expect(title.innerText).toEqual(MOCK_TODO_ITEM.label);
    expect(description.innerText).toEqual(MOCK_TODO_ITEM.description);
  });
});
