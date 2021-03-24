import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'type', pure: false
})
export class ObjTypePipe implements PipeTransform {
  transform(observations: any[], type: string): any[] {
    /* TODO: check layerlist for purity console.log("reevaluated"); */
    return observations.filter((o) => o.type === type);
  }
}

/**
 * e.g. usage *ngFor="let item of items | itemsfilter: callbackfn"
 */
@Pipe({
  name: 'itemsfilter', pure: false
})
export class ItemsFilterPipe implements PipeTransform {
  transform(items: any[], callbackfn?: (value: any, index: number, array: any[]) => boolean): any[] {
    /* TODO: check layerlist for purity console.log("reevaluated"); */
    return items.filter(callbackfn);
  }
}

