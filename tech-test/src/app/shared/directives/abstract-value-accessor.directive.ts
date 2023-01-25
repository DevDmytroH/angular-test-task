import { Directive } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class AbstractValueAccessor<T> implements ControlValueAccessor {
  public isDisabled: boolean;
  protected _value: T;

  public set value(value: T) {
    this._value = value;
  }

  public get value(): T {
    return this._value;
  }

  public get disabled(): boolean {
    return this.isDisabled;
  }

  setValue(value: T): void {
    if (this.isDisabled) return;

    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
  protected onChange = (_: T) => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected onTouched = () => {};

  public registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public writeValue(value: T): void {
    this._value = value;
  }
}
