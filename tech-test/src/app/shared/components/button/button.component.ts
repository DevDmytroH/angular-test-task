import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {

  @Input() content!: string;
  @Input() isDisabledButton!: boolean;
  @Input() type!: 'submit' | 'text';

  @Output() clickButton: EventEmitter<void> = new EventEmitter<void>();

  public onClickBtn(): void {
    if (!this.isDisabledButton) {
      this.clickButton.emit();
    }
  }

}
