import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { AbstractInputHandlerAccessor } from '../../directives/abstract-input-handler-accessor.directive';
import { InputValidationErrorPipe } from '../../pipes/input-validation-error.pipe';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true
    },
    InputValidationErrorPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent extends AbstractInputHandlerAccessor<string> {

  @Input() public type: 'text' | 'number' = 'text';

  @Input() public placeholder!: string;
  @Input() public label!: string;
  @Input() public icon?: string;
}
