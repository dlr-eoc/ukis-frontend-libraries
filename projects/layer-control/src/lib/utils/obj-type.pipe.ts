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
