import { ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getElementByTestId } from '../../../../core/utils/get-element-by-test-id.constant';

import { TodoLabelComponent } from './todo-label.component';

describe('TodoLabelComponent', () => {
  let component: TodoLabelComponent;
  let fixture: ComponentFixture<TodoLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoLabelComponent],
      imports: [],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).overrideComponent(TodoLabelComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoLabelComponent);
    component = fixture.componentInstance;
    component.label = 'some label';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('correctly render label information', () => {
    const labelText = getElementByTestId(fixture, 'label-value');
    expect(labelText.innerText).toEqual('some label');
  });
});
