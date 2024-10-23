import { Component, OnInit, HostBinding, AfterViewInit } from '@angular/core';
import { LayersService } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { MapOlService, IMapControls } from '@dlr-eoc/map-ol';
import { OsmTileLayer } from '@dlr-eoc/base-layers-raster';
import { LargeLayersService } from './services/largelayers.service';
import { Fill as olFill, Stroke as olStroke, Style as olStyle } from 'ol/style';
import { Feature } from 'ol';

import { ClarityIcons, layersIcon, clockIcon } from '@cds/core/icon';
import { MapOlComponent } from '@dlr-eoc/map-ol';
import { ClrVerticalNavModule, ClrStandaloneCdkTrapFocus, ClrNavigationModule, ClrIconModule } from '@clr/angular';
import { PerformanceComponent } from '../../components/performance/performance.component';
import { LayerControlComponent } from '@dlr-eoc/layer-control';
ClarityIcons.addIcons(...[layersIcon, layersIcon, clockIcon]);

@Component({
    selector: 'app-route-map7',
    templateUrl: './route-map7.component.html',
    styleUrls: ['./route-map7.component.scss'],
    providers: [LayersService, MapStateService, MapOlService],
    standalone: true,
    imports: [MapOlComponent, ClrVerticalNavModule, ClrStandaloneCdkTrapFocus, ClrNavigationModule, ClrIconModule, PerformanceComponent, LayerControlComponent]
})
export class RouteMap7Component implements OnInit, AfterViewInit {
  @HostBinding('class') class = 'content-container';

  controls: IMapControls;

  constructor(
    public layersSvc: LayersService,
    private dataSvc: LargeLayersService,
    public mapStateSvc: MapStateService,
    public mapSvc: MapOlService,
  ) {
    this.controls = {
      attribution: true,
      scaleLine: true
    };
  }

  ngOnInit(): void {
    this.mapSvc.setProjection('EPSG:4326');

    const styleFunc = (feature: Feature<any>, resolution: number) => {
      const fullId = feature.getId().toString();
      const idStr = fullId.match(/(\d+)/)[0];
      const id = parseFloat(idStr);
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
  }

  ngAfterViewInit(): void {
    const extent = [-107.14, 51.85, -106.14, 52.33] as [number, number, number, number];
    /**
     * Currently, there is a small bug in mapStateSvc.setExtent:
     * this method does not work as long as the 'duration' parameter is given.
     * As a short-term workaround, we work on the olMap directly.
     */
    // this.mapStateSvc.setExtent(extent);
    this.mapSvc.map.getView().fit(
      extent, {
      size: this.mapSvc.map.getSize(),
    });
  }

}
