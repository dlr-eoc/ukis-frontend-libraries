import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
  pure: false
})
export class ReversePipe<T> implements PipeTransform {
  transform(input: string | T[]): T[] | string {
    if (typeof input === 'string') {
      return input
        .split('')
        .reverse()
        .join('');
    }
    return Array.isArray(input) ? input.slice().reverse() : input;
  }
}
