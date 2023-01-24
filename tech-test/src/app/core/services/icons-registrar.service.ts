import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export const SVG_ICONS_PATH = 'assets/images/icons/';
export const SVG_ICONS = [
  { name: 'ic-edit', path: SVG_ICONS_PATH + 'edit.svg' },
  { name: 'ic-search', path: SVG_ICONS_PATH + 'search.svg' },
  { name: 'ic-date', path: SVG_ICONS_PATH + 'date.svg' },
  { name: 'ic-more', path: SVG_ICONS_PATH + 'more.svg' },
  { name: 'ic-change', path: SVG_ICONS_PATH + 'change.svg' },
  { name: 'ic-create', path: SVG_ICONS_PATH + 'create.svg' },
  { name: 'ic-eye', path: SVG_ICONS_PATH + 'eye.svg' },
  { name: 'ic-delete', path: SVG_ICONS_PATH + 'delete.svg' },
  { name: 'ic-check', path: SVG_ICONS_PATH + 'check.svg' },
  { name: 'ic-close', path: SVG_ICONS_PATH + 'close.svg' },
  { name: 'ic-not-done', path: SVG_ICONS_PATH + 'remove_done.svg' },
  { name: 'ic-done', path: SVG_ICONS_PATH + 'done_all.svg' },
  { name: 'ic-category', path: SVG_ICONS_PATH + 'category.svg' },
];

@Injectable({
  providedIn: 'root'
})
export class IconsRegistrarService {

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
  }

  public registerIcons(): void {
    SVG_ICONS.forEach(({ name, path }) =>
      this.iconRegistry.addSvgIcon(name, this.sanitizer.bypassSecurityTrustResourceUrl(path)));
  }
}
