import { ComponentFixture, TestBed } from '@angular/core/testing';

import { getElementByTestId } from '../../../../core/utils/get-element-by-test-id.constant';
import { CreateTodoComponent } from './create-todo.component';

describe('CreateTodoComponent', () => {
  let component: CreateTodoComponent;
  let fixture: ComponentFixture<CreateTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTodoComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly emit value by clicking on the button', () => {
    const event = spyOn(component.createTodoItem, 'emit');
    const addEl = getElementByTestId(fixture, 'add-btn');

    addEl.click();
    expect(event).toHaveBeenCalledTimes(1);
  });
});
