import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'type', pure: false
})
export class ObjTypePipe implements PipeTransform {
  transform(items: Record<'type', unknown>[], type: unknown): unknown[] {
    /* TODO: check layerlist for purity console.log("reevaluated"); */
    return items.filter((o) => o.type === type);
  }
}

/**
 * e.g. usage @for(item of items | itemsfilter: callbackfn)
 */
@Pipe({
  name: 'itemsfilter', pure: false
})
export class ItemsFilterPipe<T> implements PipeTransform {
  transform(items: T[], callbackfn: (value: T, index: number, array:T[]) => boolean): T[] {
    /* TODO: check layerlist for purity console.log("reevaluated"); */
    return items.filter(callbackfn);
  }
}

