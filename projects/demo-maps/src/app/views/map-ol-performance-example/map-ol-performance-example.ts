import { Component, effect, inject } from '@angular/core';
import { ClrIcon, ClrNavigationModule, ClrStandaloneCdkTrapFocus, ClrVerticalNavModule } from '@clr/angular';
import { IMapControls, MapOlComponent, MapOlService } from '@dlr-eoc/map-ol';
import { LayerControlComponent } from '@dlr-eoc/ngx-ukis-ui-clarity';
import { Performance } from '../../components/performance/performance';
import { LayersService } from '@dlr-eoc/services-layers';
import { Largelayers } from './services/largelayers';
import { MapStateService, EPSG_4326_Def } from '@dlr-eoc/services-map-state';
import { OsmTileLayer } from '@dlr-eoc/base-layers-raster';
import { Fill as olFill, Stroke as olStroke, Style as olStyle } from 'ol/style';
import { Feature } from 'ol';
import { ClarityIcons, layersIcon, clockIcon } from '@clr/angular/icon';
ClarityIcons.addIcons(layersIcon, layersIcon, clockIcon);

@Component({
  imports: [MapOlComponent, ClrVerticalNavModule, ClrStandaloneCdkTrapFocus, ClrNavigationModule, ClrIcon, Performance, LayerControlComponent],
  /** use different instances of the services only for testing with different routes  */
  providers: [LayersService, MapStateService, MapOlService],
  selector: 'app-map-ol-performance-example',
  styleUrl: './map-ol-performance-example.scss',
  templateUrl: './map-ol-performance-example.html',
  host: {
    class: 'content-container'
  }
})
export class MapOlPerformanceExample {
  controls: IMapControls;

  public layersSvc = inject(LayersService);
  public mapStateSvc = inject(MapStateService);
  public mapSvc = inject(MapOlService);
  private dataSvc = inject(Largelayers);

  constructor(){
    this.controls = {
      attribution: true,
      scaleLine: true
    };

    const init = effect(()=>{
      this.mapStateSvc.setProjection(EPSG_4326_Def);
      const styleFunc = (feature: Feature<any>, resolution: number) => {
        const fullId = feature.getId()?.toString();
        const idStr = fullId?.match(/(\d+)/)?.[0];
        const id = (idStr)? parseFloat(idStr) : 1;
        const r = id % 255;
        const g = (id + 20) % 255;
        const b = (id + 40) % 255;

        return new olStyle({
          stroke: new olStroke({
            color: 'gray',
            width: 1
          }),
          fill: new olFill({
            color: `rgba(${r}, ${g}, ${b},0.7)`
          })
        });
      }

      const bgLayer = new OsmTileLayer({
        visible: true
      });
      // const vtLayer = this.dataSvc.createVectorTileLayer('vt', 'VectorTile Base-map');
      // vtLayer.description = 'Vector tiles can be transferred faster than geojson.';
      const fullLayer = this.dataSvc.createWfsLayer('full', 'Fully loaded', 'all', styleFunc);
      fullLayer.description = 'Full dataset loaded at once.';
      const bbxLayer = this.dataSvc.createWfsLayer('bbx', 'Current extent only', 'bbox', styleFunc);
      bbxLayer.description = 'Bbox strategy: Only current bbox loaded at a time.';
      const simpleLayer = this.dataSvc.createWfsLayer('simple', 'Simplified geometry', 'simplifyGeometry', styleFunc);
      simpleLayer.description = 'Bbox strategy. Also: geometry simplified.';
      const noPropsLayer = this.dataSvc.createWfsLayer('noProps', 'No properties', 'noProps', styleFunc);
      noPropsLayer.description = 'Bbox strategy. Also: features have no properties.';
      const noStyleLayer = this.dataSvc.createWfsLayer('noStyle', 'No Styling', 'bbox');
      noStyleLayer.description = 'Bbox strategy. Also: no styling applied to features.';

      [bgLayer, fullLayer, bbxLayer, simpleLayer, noPropsLayer, noStyleLayer].map(l => this.layersSvc.addLayer(l, 'Layers'));

      init.destroy();
    });
  }


  ngAfterViewInit(): void {
    const extent = [-107.14, 51.85, -106.14, 52.33] as [number, number, number, number]
    this.mapStateSvc.setExtent(extent);
  }
}
