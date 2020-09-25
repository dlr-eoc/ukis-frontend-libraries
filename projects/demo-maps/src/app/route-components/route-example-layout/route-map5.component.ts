import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { LayersService, VectorLayer } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { EocLitemap, EocLiteoverlayTile, WorldReliefBwTile } from '@dlr-eoc/base-layers-raster';
import { MapOlService, IMapControls } from '@dlr-eoc/map-ol';
import { Subscription } from 'rxjs';

/** this needs: resolveJsonModule and allowSyntheticDefaultImports in tsconfig */
import testFeatureCollection from '../../../assets/data/geojson/testFeatureCollection.json';

@Component({
  selector: 'app-route-map5',
  templateUrl: './route-map5.component.html',
  styleUrls: ['./route-map5.component.scss'],
  /** use differnt instances of the services only for testing with diffenr routs  */
  providers: [LayersService, MapStateService, MapOlService]
})
export class RouteMap5Component implements OnInit, OnDestroy {
  @HostBinding('class') class = 'content-container';
  controls: IMapControls;


  public geojsonData: any;
  showTable = false;
  subs: Subscription[] = [];
  constructor(
    public layersSvc: LayersService,
    public mapStateSvc: MapStateService) {

    this.controls = {
      attribution: true,
      scaleLine: true
    };
  }


  ngOnInit(): void {
    this.addBaseLayers();
    this.addLayers();
    this.addOverlays();
    /** set map extent or IMapState (zoom, center...) with the MapStateService */
    this.mapStateSvc.setExtent([-14, 33, 40, 57]);
    this.checkVisibleLayers();
  }

  addBaseLayers() {
    const eocLitemapLayer = new EocLitemap({
      visible: true
    });

    // not working in WGS84
    const worldRelief = new WorldReliefBwTile();

    const layers = [eocLitemapLayer, worldRelief];

    /** add layers with the LayersService */
    layers.map(layer => this.layersSvc.addLayer(layer, 'Baselayers'));
  }

  addLayers() {
    this.geojsonData = testFeatureCollection;

    const vectorLayer = new VectorLayer({
      id: 'geojson_test',
      name: 'GeoJSON Vector Layer',
      type: 'geojson',
      data: this.geojsonData,
      visible: false,
      popup: true
    });

    this.layersSvc.addLayer(vectorLayer, 'Layers');
  }

  checkVisibleLayers() {
    const sub = this.layersSvc.getLayers().subscribe((layers) => {
      layers.map((layer) => {
        if (layer) {
          if (layer.id === 'geojson_test' && layer.visible === true) {
            this.showTable = true;
          } else if (layer.id === 'geojson_test' && layer.visible === false) {
            this.showTable = false;
          }
        }
      });
    });
    this.subs.push(sub);
  }

  addOverlays() {
    const onTopp = new EocLiteoverlayTile();
    this.layersSvc.addLayer(onTopp, 'Overlays');
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
