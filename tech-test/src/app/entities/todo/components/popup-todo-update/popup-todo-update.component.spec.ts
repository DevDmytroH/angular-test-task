/* tslint:disable:no-string-literal */
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

import { getElementByTestId } from '../../../../core/utils/get-element-by-test-id.constant';
import { PopupTodoUpdateComponent } from './popup-todo-update.component';

@Pipe({ name: 'inputValidationError' })
class MockInputValidationPipe implements PipeTransform {
  transform(value: string): boolean {
    return !!value;
  }
}

@Component({
  selector: 'app-input',
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: StubInputComponent,
      multi: true,
    },
  ],
})
class StubInputComponent implements ControlValueAccessor {
  writeValue(obj: any) {}

  registerOnChange(fn: any) {}

  registerOnTouched(fn: any) {}

  setDisabledState(isDisabled: boolean) {}
}

describe('PopupTodoUpdateComponent', () => {
  let component: PopupTodoUpdateComponent;
  let fixture: ComponentFixture<PopupTodoUpdateComponent>;

  const matDialogRefSpy = jasmine.createSpyObj<MatDialogRef<any>>('MatDialogRef', ['close', 'addPanelClass']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupTodoUpdateComponent, MockInputValidationPipe, StubInputComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { mode: 'create', todo: {} } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).overrideComponent(PopupTodoUpdateComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupTodoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should successfully call pre-configuration popup functions', () => {
    const defineModeSpy = spyOn<any>(component, '_definePopupMode');
    const initFormSpy = spyOn<any>(component, '_initForm');
    const setContainerSpy = spyOn<any>(component, '_setDefaultContainerClass');
    const defineTitleSpy = spyOn<any>(component, '_definePopupTitle');

    component.ngOnInit();

    const initFunctions = [defineModeSpy, initFormSpy, setContainerSpy, defineTitleSpy];

    initFunctions.forEach(fn => {
      expect(fn).toHaveBeenCalledTimes(1);
    })
  });

  it('should close popup by clicking at the close button', () => {
    const closeSpy = spyOn(component, 'close');

    const closeBtn = getElementByTestId(fixture, 'close-btn');
    closeBtn.click();

    expect(closeSpy).toHaveBeenCalledTimes(1);
  });

  it('should correctly form and render current title popup (Create mode)', () => {
    const titleEl = getElementByTestId(fixture, 'popup-title');
    expect(titleEl.innerText).toEqual('Create new task');
  });

  it('should correctly render form control items', () => {
    const inputFields = fixture.debugElement.queryAll(By.css('app-input'));
    const submitBtn = getElementByTestId(fixture, 'submit-btn');

    expect(submitBtn).toBeDefined();
    expect(inputFields.length).toEqual(3);
  });

  it('should correctly define popup mode', () => {
    component['_definePopupMode']();
    expect(component.isUpdateMode).toEqual(false);

    component.data.type = 'update';
    component['_definePopupMode']();
    expect(component.isUpdateMode).toEqual(true);
  });

  it('should cancel onSubmit function when form is invalid', () => {
    matDialogRefSpy.close.calls.reset();
    component.updateForm.reset();
    component.onSubmit();

    expect(matDialogRefSpy.close).not.toHaveBeenCalled();
  });

  it('should successfully submit data if form data is valid', () => {
    component.updateForm.setValue({
      label: 'some label',
      description: 'some description',
      category: 'some category'
    });


    fixture.detectChanges();

    component.onSubmit();

    expect(matDialogRefSpy.close).toHaveBeenCalledWith(component.updateForm.value);
  });

  it('should set update form data when data is exist in the mat token', () => {
    component.data.type = 'update';
    component.data.todo = {
      id: 1,
      label: 'some label',
      description: 'some description',
      category: 'category',
      done: false
    };

    component.ngOnInit();

    expect(component.updateForm.value).toEqual({
      label: component.data.todo.label,
      description: component.data.todo.description,
      category: component.data.todo.category,
    });
  });
});
