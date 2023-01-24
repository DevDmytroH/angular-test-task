import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString: string, propertyPath: string[]): any {
    if (value) {
      return value.filter(item => this._getDeepValue(item, [...propertyPath]).match(new RegExp(filterString, 'i')))
    }

    return [];
  }

  private _getDeepValue(obj: object, propertyPath: string[]): any {
    if (!obj.hasOwnProperty(propertyPath[0])) return null;
    if (obj.hasOwnProperty(propertyPath[0]) && propertyPath.length === 1) return obj[propertyPath[0]];

    return this._getDeepValue(obj[propertyPath[0]], (propertyPath.shift(), propertyPath));
  }
}
