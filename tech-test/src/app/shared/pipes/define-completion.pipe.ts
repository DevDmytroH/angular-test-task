import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defineCompletion'
})
export class DefineCompletionPipe implements PipeTransform {

  public transform(value: string | boolean): string {
    if (!value) return 'uncompleted';

    if (typeof value === 'boolean') {
      return value ? 'completed' : 'uncompleted';
    }

    return value;
  }
}
