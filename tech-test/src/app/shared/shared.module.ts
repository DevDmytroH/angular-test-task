import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';

import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { OptionsMenuComponent } from './components/options-menu/options-menu.component';
import { DefineCompletionPipe } from './pipes/define-completion.pipe';
import { InputValidationErrorPipe } from './pipes/input-validation-error.pipe';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    OptionsMenuComponent,
    DefineCompletionPipe,
    InputValidationErrorPipe,
    FilterPipe
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule
  ],
  exports: [
    InputComponent,
    ButtonComponent,
    OptionsMenuComponent,
    DefineCompletionPipe,
    InputValidationErrorPipe,
    FilterPipe
  ]
})
export class SharedModule {
}
