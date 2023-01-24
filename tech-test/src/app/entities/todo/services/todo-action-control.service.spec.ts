import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';

import { TodoActionControlService } from './todo-action-control.service';

describe('TodoActionControlService', () => {
  let service: TodoActionControlService;

  const matDialogSpy = jasmine.createSpyObj('MatDialog', ['open', 'afterClosed']);
  const todoActionControlService = jasmine.createSpyObj<TodoActionControlService>('TodoActionControlService', ['getActions']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TodoActionControlService, useValue: todoActionControlService },
        { provide: MatDialog, useValue: matDialogSpy },
      ]
    });
    service = TestBed.inject(TodoActionControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
