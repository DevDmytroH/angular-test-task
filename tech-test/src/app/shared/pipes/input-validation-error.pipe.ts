import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inputValidationError'
})
export class InputValidationErrorPipe implements PipeTransform {

  private _validationMessages = {
    required: 'This field is required',
    minlength: (error) => `This field must be at least ${error.requiredLength} characters long`,
    maxlength: (error) => `This field must be less than ${error.requiredLength} characters long`,
    email: 'Invalid email address',
    pattern: (error) => error.message
  }

  transform(value: { [key: string]: any } | null): string {
    if (!value) return '';

    return this._validationMessages[Object.keys(value)[0]];
  }

}
