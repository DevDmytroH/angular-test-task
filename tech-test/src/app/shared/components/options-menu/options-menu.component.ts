import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { IOptionsMenuItem } from './interfaces/options-menu-item.interface';

@Component({
  selector: 'app-options-menu',
  templateUrl: './options-menu.component.html',
  styleUrls: ['./options-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionsMenuComponent {
  @Input() icon = 'ic-more';
  @Input() items!: IOptionsMenuItem[];
}
