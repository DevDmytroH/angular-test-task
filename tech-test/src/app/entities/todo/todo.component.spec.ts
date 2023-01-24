/* tslint:disable:no-string-literal */
import { CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, of } from 'rxjs';
import { TodoActionControlService } from './services/todo-action-control.service';
import { TodoEntityService } from './services/todo-entity.service';

import { TodoComponent } from './todo.component';

@Pipe({ name: 'filterPipe' })
class MockFilterPipe implements PipeTransform {
  transform(value: any[]): any {
    return value[0];
  }
}


describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  const todoEntityServiceSpy = jasmine.createSpyObj<TodoEntityService>('TodoEntityService', ['upsert']);
  const matDialogSpy = jasmine.createSpyObj('MatDialog', ['open', 'afterClosed']);
  const todoActionControlService = jasmine.createSpyObj<TodoActionControlService>('TodoActionControlService', ['getActions']);

  beforeEach(async () => {
    TestBed.overrideProvider(TodoEntityService, {
      useValue: {
        upsert: () => {},
        entities$: new BehaviorSubject(of([]))
      }
    });
    await TestBed.configureTestingModule({
      declarations: [TodoComponent],
      imports: [],
      providers: [
        { provide: TodoActionControlService, useValue: todoActionControlService },
        { provide: MockFilterPipe, useClass: MockFilterPipe },
        { provide: MatDialog, useValue: matDialogSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
