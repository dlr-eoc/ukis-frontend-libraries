import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { LayersService, RasterLayer, VectorLayer, LayerGroup, Layer, WmtsLayer, WmsLayer } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { osm, esri_world_imagery, esri_ocean_imagery, eoc_litemap, esri_grey_canvas, esri_nav_charts, open_sea_map } from '@dlr-eoc/base-layers-raster';
import { MapOlService } from '@dlr-eoc/map-ol';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-route-map6',
  templateUrl: './route-map6.component.html',
  styleUrls: ['./route-map6.component.scss'],
  /** use differnt instances of the services only for testing with diffenr routs  */
  providers: [LayersService, MapStateService, MapOlService]
})
export class RouteMap6Component implements OnInit, OnDestroy {
  @HostBinding('class') class = 'content-container';
  controls: { attribution?: boolean, scaleLine?: boolean, zoom?: boolean, crosshair?: boolean };

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
    this.mapStateSvc.setExtent([9.681317514755053, 47.425291526740125, 12.765729135848805, 49.213103602937025]);
    this.layersSvc.getLayers().subscribe(layers => console.log('layers are now ', layers))
  }

  addBaseLayers() {
    const eoc_litemap_layer = new eoc_litemap({
      legendImg: null,
      id: 'eoc_litemap_base',
      visible: true,
      tileSize: 512
    });

    this.layersSvc.addLayer(eoc_litemap_layer, 'Baselayers');
  }

  addLayers() {
    const tandemLayer = new WmtsLayer({
      type: 'wmts',
      id: 'TDM90_AMP',
      visible: false,
      url: 'https://tiles.geoservice.dlr.de/service/wmts?',
      name: 'TDM90_AMP',
      filtertype: 'Layers',
      attribution: "| TDM90 Data &copy; <a href=\"http://www.dlr.de\" target=\"_blank\">DLR</a> licensed for <a rel=\"license\" target=\"_blank\" href=\"https://geoservice.dlr.de/resources/licenses/tdm90/License_for_the_Utilization_of_90m_DEM_for_Scientific_Use.pdf\">scientific use</a>",
      params: {
        layer: 'TDM90_AMP',
        version: '1.1.0',
        format: 'image/png',
        style: 'default',
        matrixSetOptions: {
          matrixSet: 'EPSG:3857',
          tileMatrixPrefix: 'EPSG:3857',
        }
      },
      styles: [ //this is only to test updateWmtsLayerParams in map-ol
        {
          default: true,
          name: 'default',
          title: 'default'
        },
        {
          default: false,
          name: 'none',
          title: 'none'
      }
      ]
    });

    this.layersSvc.addLayer(tandemLayer, tandemLayer.filtertype);

    const agrodeLayer = new WmsLayer({
      type: 'wms',
      id: 'AGRODE_S2_EVI_P1Y',
      url: 'https://geotest.eoc.dlr.de/eoc/land/wms?',
      name: 'AGRODE',
      filtertype: 'Layers',
      attribution: '| <a href=\'https://agro-de.info/\'>AGRO-DE</a> Indices by <a href=\'http://www.dlr.de/eoc\'>DLR</a> licensed under <a rel=\'license\' href=\'http://creativecommons.org/licenses/by-sa/4.0/\'>CC-BY-SA</a>, Contains modified Copernicus Sentinel Data [__YEAR__]',
      params: {
        LAYERS: 'AGRODE_S2_EVI_P1Y',
        VERSION: '1.1.0',
        FORMAT: 'image/png',
      },
      styles: [
        {
          default: true,
          legendURL: 'https://geotest.eoc.dlr.de/eoc/land/wms?service=WMS&request=GetLegendGraphic&format=image/png&width=20&height=20&layer=land:AGRODE_S2_EVI_P1Y',
          name: 'agrode-evi-max',
          title: 'Max'
        },
        {
          default: false,
          legendURL: 'https://geotest.eoc.dlr.de/eoc/land/wms?service=WMS&request=GetLegendGraphic&format=image/png&width=20&height=20&layer=land:AGRODE_S2_EVI_P1Y',
          name: 'agrode-evi-min',
          title: 'Min'
        },
        {
          default: false,
          legendURL: 'https://geotest.eoc.dlr.de/eoc/land/wms?service=WMS&request=GetLegendGraphic&format=image/png&width=20&height=20&layer=land:AGRODE_S2_EVI_P1Y',
          name: 'agrode-evi-mean',
          title: 'Mean'
        }
      ]
    });

    this.layersSvc.addLayer(agrodeLayer, agrodeLayer.filtertype);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
