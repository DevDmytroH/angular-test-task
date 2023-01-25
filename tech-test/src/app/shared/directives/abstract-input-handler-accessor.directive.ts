import { Directive, Inject, Injector, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

import { InputValidationErrorPipe } from '../pipes/input-validation-error.pipe';
import { AbstractValueAccessor } from './abstract-value-accessor.directive';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class AbstractInputHandlerAccessor<T>
  extends AbstractValueAccessor<T>
  implements OnInit {
  private _ngControl: NgControl;

  constructor(
    @Inject(InputValidationErrorPipe) private _errorValidationPipe: InputValidationErrorPipe,
    @Inject(Injector) private injector: Injector) {
    super();
  }

  public ngOnInit(): void {
    this._defineNgControl();
  }

  public get hasError(): boolean {
    return !!(this._ngControl.invalid && this._ngControl.dirty);
  }

  private _defineNgControl(): void {
    this._ngControl = this.injector.get(NgControl);
  }

  public get error(): string | null {
    return this._errorValidationPipe.transform(this._ngControl.errors);
  }
}
