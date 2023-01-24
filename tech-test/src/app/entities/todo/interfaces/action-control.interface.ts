import { IOptionsMenuItem } from '../../../shared/components/options-menu/interfaces/options-menu-item.interface';

export interface IActionControl<T> {
  getActions: (entity: T) => IOptionsMenuItem[]
}
