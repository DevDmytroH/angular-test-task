import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-todo-label',
  template: `
    <div class="flex items-center font-light text-sm">
      <mat-icon data-testing="label-icon" class=" mr-1" [svgIcon]="icon" *ngIf="icon"></mat-icon>
      <span data-testing="label-value">{{label}}</span>
    </div>
  `,
  styles: [
    `
      mat-icon {
        max-width: 16px;
        min-width: 16px;
        height: 16px;
        color: inherit;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoLabelComponent {
  @Input() icon?: string;
  @Input() label!: string;
}
