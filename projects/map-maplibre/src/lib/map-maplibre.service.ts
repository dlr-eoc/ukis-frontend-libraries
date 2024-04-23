import { Injectable } from '@angular/core';
import {
  Layer as ukisLayer, TFiltertypesUncap, TFiltertypes,
} from '@dlr-eoc/services-layers';
import { Map as glMap, StyleSpecification, TypedStyleLayer } from 'maplibre-gl';
import { BehaviorSubject } from 'rxjs';
import { LayerSourceSpecification, UKIS_METADATA } from './maplibre.helpers';
import { createLayer, layerIsSupported, updateSource, updateStyleLayerProperties } from './maplibre-layers.helpers';

type Tgroupfiltertype = TFiltertypesUncap | TFiltertypes;

@Injectable({
  providedIn: 'root'
})
export class MapMaplibreService {

  readonly FILTER_TYPE_KEY = 'filtertype' as const;
  readonly ID_KEY = 'id' as const;
  readonly TITLE_KEY = 'title' as const;
  WebMercator = 'EPSG:3857';
  WGS84 = 'EPSG:4326';

  public map = new BehaviorSubject<glMap | null>(null);
  constructor() { }

  /**
   * This function resets/adds all layers in the StyleSpecification of a filtertype with the new UKIS-Layers
   */
  public setUkisLayers(layers: Array<ukisLayer>, filtertype: Tgroupfiltertype, map: glMap) {
    const lowerType = filtertype.toLowerCase() as Tgroupfiltertype;
    const tempLayers: (LayerSourceSpecification | StyleSpecification)[] = [];

    if (layers.length < 1 && lowerType !== 'baselayers') {
      // console.log('empty array set - remove layers of the type', layers);
      // this.removeAllLayers(lowerType);
    } else {
      layers.forEach((newLayer) => {
        const layerStyleSpec = this.createLayer(newLayer);
        if (layerStyleSpec) {

          if ('version' in layerStyleSpec) { /** StyleSpecification */
            /**
             *  TODO: merge styles in current style 
             *  - version: number
             *  - name: string
             *  - glyphs: string: 
             *  - layers: Array<>
             *  - sources: Object<>
             *  - sprite ?: string | "An array of `{id: 'my-sprite', url: 'https://example.com/sprite'}
             *  - metadata ?: Object
             *  - id ?: string
             */

            const hasLayers = layerStyleSpec.layers.map(l => map.getLayer(l.id)).filter(l => l);

            // check if layer not undefined
            if (!hasLayers.length) {
              tempLayers.push(layerStyleSpec);
            }

            // update layer if on map
            if (hasLayers.length) {
              hasLayers.forEach(l => this.updateMlLayer(l as any, newLayer, map));
            }

            // TODO: how to handle glyphs, sprite, terrain...  
            // const style = map.getStyle();
            // style.glyphs =  layer.glyphs
            // style.sprite = layer.sprite
            // style.terrain = layer.terrain

            // TODO: check if sources are the same ?? - reuse

          } else if ('sources' in layerStyleSpec && 'layers' in layerStyleSpec) { /** LayerSourceSpecification */

            const hasLayers = layerStyleSpec.layers.map(l => map.getLayer(l.id)).filter(l => l);

            // check if layer not undefined
            if (!hasLayers.length) {
              tempLayers.push(layerStyleSpec);
            }

            // update layer if on map
            if (hasLayers.length) {
              hasLayers.forEach(l => this.updateMlLayer(l as any, newLayer, map));
            }
          }
        }
      });
    }

    if (tempLayers.length > 0) {
      this.setLayers(tempLayers, map);
      const newTempLayer: { filtertype: Tgroupfiltertype, layers: (LayerSourceSpecification | StyleSpecification)[] } = {
        filtertype: lowerType, layers: tempLayers
      };
      map.style.stylesheet.metadata[`ukis:${filtertype}IDs`] = layers.map(l => l.id);
      return newTempLayer;
    } else {
      return null;
    }
  }


  /**
   * Get all maplibre layers from the style with groupfiltertype
   * 
   * see addUkisLayerMetadata
   * 
   * @returns layerSpecifications and styleLayers
   */
  public getLayers(filtertype: Tgroupfiltertype, map: glMap) {
    const style = map.getStyle();
    const layerSpecifications = style.layers.filter(l => l.metadata[UKIS_METADATA.filtertype] === filtertype);
    const styleLayers = layerSpecifications.map(ls => map.getLayer(ls.id)) as TypedStyleLayer[]; //Temp fix of : Property ... of exported class expression may not be private or protected

    return {
      layerSpecifications,
      styleLayers
    }
  }

  /**
   * Get all maplibre layers from one ukis layer
   * 
   * see addUkisLayerMetadata
   * 
   * @param id id of the ukis layer 
   * @returns layerSpecifications and styleLayers
   */
  public getLayersForId(id: string, filtertype: Tgroupfiltertype, map: glMap) {
    const alllayers = this.getLayers(filtertype, map);
    const layerSpecifications = alllayers.layerSpecifications.filter(l => l.metadata[UKIS_METADATA.layerID] === id);
    if (layerSpecifications.length) {
      const styleLayers = layerSpecifications.map(ls => map.getLayer(ls.id)) as TypedStyleLayer[]; //Temp fix of : Property ... of exported class expression may not be private or protected
      return {
        layerSpecifications,
        styleLayers
      };
    } else {
      return null;
    }
  }


  /**
   * Add layers and sources from LayerSourceSpecification | StyleSpecification if they are not already on the map.
   */
  public setLayers(layers: (LayerSourceSpecification | StyleSpecification)[], map: glMap) {
    layers.forEach(layersAndSources => {
      /* Check if StyleSpecification or LayerSourceSpecification
       * We do not use map.setStyle because we want to merge all the styles.
       *
       * if ('version' in sl) {
       * // StyleSpecification
       * map.setStyle(sl);
       * } else if ('sources' in sl && 'layers' in sl)...
       */

      if ('sources' in layersAndSources && 'layers' in layersAndSources) {  /** StyleSpecification or LayerSourceSpecification */
        layersAndSources.layers.forEach(layerSpec => {
          let sourceId: string;
          if (layerSpec.type !== 'background') {
            if (typeof layerSpec.source === 'object') {
              // see - addLayer - https://github.com/maplibre/maplibre-gl-js/blob/HEAD/src/style/style.ts#L787-L788
              sourceId = layerSpec.id;
            } else {
              sourceId = layerSpec.source;
            }

            const hasSource = map.getSource(sourceId);
            if (!hasSource) {
              const sorceDef = layersAndSources.sources[sourceId];
              if (sorceDef) {
                map.addSource(sourceId, sorceDef);
              } else {
                console.log('Source was not found in the LayerSourceSpecification!')
              }
            }

            map.addLayer(layerSpec)
          } else {
            // background does not need a source
            // https://maplibre.org/maplibre-style-spec/layers/
            map.addLayer(layerSpec)
          }
        });
      }
    });

    return layers;
  }

  public updateMlLayer(mllayer: TypedStyleLayer, layer: ukisLayer, map: glMap) {
    /**
     * update ml layer
     * - map.setLayoutProperty() > Visibility
     * - map.setPaintProperty() > Opacity
     * - map.moveLayer(layer.id, layerBeforeId) > index
     * 
     * - map.setFilter()
     * - map.setLayerZoomRange()
     */
    this.updateLayerParamsAndSource(map, mllayer, layer);

    // update visibility, opacity and other Properties (https://maplibre.org/maplibre-style-spec/layers/#layer-properties)
    updateStyleLayerProperties(map, mllayer, layer);
  }

  private updateLayerParamsAndSource(map: glMap, mllayer: TypedStyleLayer, layer: ukisLayer) {
    if (layer.type === 'wms' || layer.type === 'wmts' || layer.type === 'tms' || layer.type === 'wfs' || layer.type === 'geojson') {
      const oldSource = map.getSource(mllayer.source);
      updateSource(map, layer, oldSource);
    }
  }

  public createLayer = createLayer;
  public layerIsSupported = layerIsSupported;
}



