import { Inject, Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

import { VALIDATION_ERROR_MESSAGES } from './validation-error-messages.token';

@Pipe({
  name: 'inputValidationError'
})
export class InputValidationErrorPipe implements PipeTransform {
  constructor(@Inject(VALIDATION_ERROR_MESSAGES) private _errorMessages) {}

  transform(errors: ValidationErrors | null): string | null {
    if (errors) {
      for (const [key, value] of Object.entries(errors)) {
        if (!this._errorMessages[key]) {
          console.warn(`Missing message for ${key} validator`);
          return null;
        }

        if (value) {
          return this._errorMessages[key](value);
        }
      }
    }
    return null;
  }

}
