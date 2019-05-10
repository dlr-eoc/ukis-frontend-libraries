import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { Layer, RasterLayer } from './types/Layers';
import { LayerGroup } from './types/LayerGroup';

@Injectable({
  providedIn: 'root'
})
export class LayersService {
  private layergroups = new BehaviorSubject(Array<Layer | LayerGroup>());

  private baseLayers = new BehaviorSubject(Array<Layer>());

  private overlays = new BehaviorSubject(Array<Layer>());

  private layers = new BehaviorSubject(Array<Layer>());

  constructor() {

  }


  /**
   * add layer /add layer to group
   * remove layer /remove layer from group
   * update layer /update layer on grup
   *
   * add group
   * remove group
   * update group
   *
   *
   */

  // ----------------------------------------------------------------------------------------------------------------
  /**
   * add's a ukis Layer or a LayerGroup to the Layerservice
   * if toGroup is true the layer is is not added to the list of Layers and LayerGroups only used  internal
   *
   * filtertype: "Overlays" | "Baselayers" | string
   */
  public addLayer(layer: Layer, filtertype: 'Baselayers' | 'Overlays' | 'Layers', toGroup?: boolean) {
    // console.log("layer.filtertype", layer.filtertype)
    if (toGroup) {
      const groups = this.layergroups.getValue();

      if (filtertype === 'Baselayers') {
        this.baseLayers.next(this.filterBaseLayers());
      } else if (filtertype === 'Overlays') {
        this.overlays.next(this.filterOverlays());
      } else if (filtertype === 'Layers') {
        this.layers.next(this.filterLayers());
      }
    }

    // this.layergroups.getValue();
    // add single layer to layergroups!!!!!
    if (!this.isInLayergroups(layer) && !toGroup) {
      const groups = this.layergroups.getValue();
      // add type to single layer for layer moving
      layer.filtertype = filtertype;
      groups.push(layer);
      // layer.zIndex = this.getZIndexForLayer(groups, layer, type)
      this.layergroups.next(groups);
      if (filtertype === 'Baselayers') {
        this.baseLayers.next(this.filterBaseLayers());
      } else if (filtertype === 'Overlays') {
        this.overlays.next(this.filterOverlays());
      } else if (filtertype === 'Layers') {
        this.layers.next(this.filterLayers());
      }
    }
  }

  /**
  * filtertype: "Overlays" | "Baselayers" | string
  */
  public removeLayer(layer: Layer, filtertype: 'Baselayers' | 'Overlays' | 'Layers') {
    if (this.isInLayergroups(layer)) {
      // console.log('remove single layer from layergroups!!!!!');
      const groups = this.layergroups.getValue().filter((lg) => {
        if (lg instanceof Layer) {
          return lg.id !== layer.id;
        } else {
          return lg;
        }
      });
      this.layergroups.next(groups);
    }

    if (filtertype === 'Overlays') {
      this.overlays.next(this.filterOverlays());
    }

    if (filtertype === 'Baselayers') {
      this.baseLayers.next(this.filterBaseLayers());
    }

    if (filtertype === 'Layers') {
      this.layers.next(this.filterLayers());
    }
  }

  /**
  * filtertype: "Overlays" | "Baselayers" | string
  */
  public updateLayer(layer: Layer, filtertype: 'Baselayers' | 'Overlays' | 'Layers') {
    if (filtertype === 'Overlays') {
      for (const l of this.filterOverlays()) {
        if ((l.id === layer.id)) {
          this.overlays.next(this.filterOverlays());
        }
      }
    }
    if (filtertype === 'Layers') {
      for (const l of this.filterLayers()) {
        if ((l.id === layer.id)) {
          this.layers.next(this.filterLayers());
        }
      }
    }
    if (filtertype === 'Baselayers') {
      for (const l of this.baseLayers.getValue()) {
        if ((l.id === layer.id)) {
          this.baseLayers.next(this.filterBaseLayers());
        }
      }
    }
  }


  /**
   *
   * removes a ukis Layer or a LayerGroup from the Layerservice by the Layer.id or LayerGroup.id
   * if layerGroupId is set, then it removes the Layer from a LayerGroup
   */
  public removeLayerOrGroupById(id: string, removeNullGroup?: boolean) {
    this.layergroups.getValue().filter((lg) => {
      if (lg instanceof Layer) {
        if (lg.id === id) {
          this.removeLayer(lg, lg.filtertype || 'Layers');
        }
      } else if (lg instanceof LayerGroup) {
        // console.log('LayerGroup: ', lg);
        // console.log('id', id);
        if (lg.id === id) {
          this.removeLayerGroup(lg);
        } else {
          // this.removeLayerFromGroup
          lg.layers.forEach((_layer, index) => {
            if (_layer.id === id) {
              this.removeLayerFromGroup(_layer, lg, removeNullGroup);
            }
          });
        }
      }
    });
  }

  public addLayerToGroup(layer: Layer, layerGroup: LayerGroup) {
    /** convert filtertyle of layer to the same as the group */
    if (layer.filtertype !== layerGroup.filtertype) {
      layer.filtertype = layerGroup.filtertype;
    }

    layerGroup.layers.push(layer);
    // this.updateLayer(layer, layerGroup)

    this.layergroups.getValue().forEach((lg) => {
      if (lg instanceof Layer) {

      } else if (lg instanceof LayerGroup) {
        if (lg.id === layerGroup.id) {
          lg.layers = layerGroup.layers;
        }
      }
    });

    this.layergroups.next(this.layergroups.getValue());
    this.overlays.next(this.filterOverlays());
    this.baseLayers.next(this.filterBaseLayers());
  }

  public addLayerToGroupById(layer: Layer, GroupId: string) {
    this.layergroups.getValue().forEach((lg) => {
      if (lg instanceof LayerGroup && lg.id === GroupId) {
        this.addLayerToGroup(layer, lg);
      }
    });
  }

  /** defaults if no layers on the group it will remove it */
  public removeLayerFromGroup(layer: Layer, layerGroup: LayerGroup, removeNullGroup?: boolean) {
    if (removeNullGroup === undefined || removeNullGroup === null) {
      removeNullGroup = true;
    }
    layerGroup.layers = layerGroup.layers.filter(l => l.id !== layer.id);
    this.removeLayer(layer, layerGroup.filtertype || 'Layers');

    this.layergroups.getValue().forEach((lg) => {
      if (lg instanceof Layer) {

      } else if (lg instanceof LayerGroup) {
        if (lg.id === layerGroup.id) {
          lg.layers = layerGroup.layers;
          this.layergroups.next(this.layergroups.getValue());
        }
      }
    });

    // if no layers on the group remove it
    if (layerGroup.layers.length === 0 && removeNullGroup) {
      const _layergroups = this.layergroups.getValue().filter((lg) => {
        if (lg instanceof Layer) {
          return lg;
        } else if (lg instanceof LayerGroup) {
          return lg.id !== layerGroup.id;
        }
      });
      this.layergroups.next(_layergroups);
    }
  }

  /** down == + 1 and up == - 1*/
  public setLayerIndexInGroup(layer: Layer, dir: 'up' | 'down', layerGroup: LayerGroup) {
    // console.log("move layer in group " + dir);
    // console.log(layerGroup);
    const groupIndex = layerGroup.layers.indexOf(layer);

    switch (dir) {
      case 'up': {
        if (groupIndex === 0) {
          break;
        } else {
          this.arrayMove(layerGroup.layers, groupIndex, groupIndex - 1);
        }
        break;
      }
      case 'down': {
        if (groupIndex === layerGroup.layers.length - 1) {
          break;
        } else {
          this.arrayMove(layerGroup.layers, groupIndex, groupIndex + 1);
        }
        break;
      }
    }
    this.updateLayer(layer, layerGroup.filtertype || 'Layers');
  }


  // ----------------------------------------------------------------------------------------------------------------

  public addLayerGroup(layerGroup: LayerGroup) {
    // console.log("add LayerGroup", layerGroup);
    if (!this.isInLayergroups(layerGroup)) {
      const lgroups = this.layergroups.getValue();
      lgroups.push(layerGroup);

      this.layergroups.next(lgroups);
      // add layers
      for (const layer of layerGroup.layers) {
        // console.log("layerGroup.filtertype", layerGroup.filtertype)
        this.addLayer(layer, layerGroup.filtertype || 'Layers', true);
      }
    }
  }

  public removeLayerGroup(layerGroup: LayerGroup) {
    // remove all layers of this group from the map
    if (layerGroup.removable) {
      for (const layer of layerGroup.layers) {
        console.log('remove layerGroup layers:', layer);
        this.removeLayerFromGroup(layer, layerGroup);
      }
      const lgroups = this.layergroups.getValue();

      const filteredGroups = lgroups.filter(function (layer, index) {
        return layer.id !== layerGroup.id;
      });

      this.layergroups.next(filteredGroups);
    } else {
      console.log('layerGroup is not removable!');
    }
  }

  public updateLayerGroup(layerGroup: LayerGroup, sort: boolean = false) {
    if (sort) {
      layerGroup = this.sortLayerGroup(layerGroup);
    }
    for (const layer of layerGroup.layers) {
      this.updateLayer(layer, layerGroup.filtertype || 'Layers');
    }
  }

  public arrayMove(array: Array<any>, fromIndex: number, toIndex: number) {
    array.splice((toIndex < 0 ? array.length + toIndex : toIndex), 0, array.splice(fromIndex, 1)[0]);
  }

  /** set Group Or Layer Index - down == + 1 and up == - 1*/
  /*
  public setGroupLayerIndex(group: Layer | LayerGroup, dir: 'up' | 'down', layerGroup?: LayerGroup) {
    console.log('move group ' + dir);
    let groupsCount;
    if (group instanceof Layer && group.filtertype) {
      groupsCount = this.getNumOfGroups(group.filtertype);
    } else if (group instanceof LayerGroup) {
      groupsCount = this.getNumOfGroups(group.filtertype);
    }

    if (groupsCount > 1) {

      // get only groups ... check if move is working with single layers!!!!!!!!
      const lgroups = this.layergroups.getValue(); // .filter(lg => lg instanceof LayerGroup);

      const groupIndex = lgroups.indexOf(group);

      // console.log('groupIndex', group.name, groupIndex)
      // console.log(lgroups)
      switch (dir) {
        case 'up': {
          if (this.isGroupFirst(group)) {
            break;
          } else {
            this.arrayMove(lgroups, groupIndex, groupIndex - 1);
          }
          break;
        }
        case 'down': {
          if (this.isGroupLast(group)) {
            break;
          } else {
            this.arrayMove(lgroups, groupIndex, groupIndex + 1);
          }
          break;
        }
      }
      console.log('groupIndex after', group.name, lgroups.indexOf(group));
      this.layergroups.next(lgroups);
      this.baseLayers.next(this.filterBaseLayers());
      this.layers.next(this.filterLayers());
      this.overlays.next(this.filterOverlays());
    }
  }
  */

  /** set Group Or Layer Index: down == + 1 and up == - 1  */
  public setGroupLayerIndex(group: Layer | LayerGroup, dir: number | 'up' | 'down', layerGroup?: LayerGroup) {
    console.log('move group ' + dir);
    let groupsCount;
    if (group instanceof Layer && group.filtertype) {
      groupsCount = this.getNumOfGroups(group.filtertype);
    } else if (group instanceof LayerGroup) {
      groupsCount = this.getNumOfGroups(group.filtertype);
    }

    if (groupsCount > 1) {
      // get only groups ... check if move is working with single layers!!!!!!!!
      const lgroups = this.layergroups.getValue(); // .filter(lg => lg instanceof LayerGroup);

      const groupIndex = lgroups.indexOf(group);

      if (!this.isGroupFirst(group) || !this.isGroupLast(group)) {
        if (typeof dir === 'number') {
          this.arrayMove(lgroups, groupIndex, dir);
        } else if (dir === 'up') {
          this.arrayMove(lgroups, groupIndex, groupIndex - 1);
        } else if (dir === 'down') {
          this.arrayMove(lgroups, groupIndex, groupIndex + 1);
        }
      }
      console.log('groupIndex after', group.name, lgroups.indexOf(group));
      this.layergroups.next(lgroups);
      this.baseLayers.next(this.filterBaseLayers());
      this.layers.next(this.filterLayers());
      this.overlays.next(this.filterOverlays());
    }
  }

  /**
  * filtertype: "Overlays" | "Baselayers" | string
  */
  getNumOfGroups(filtertype: 'Baselayers' | 'Overlays' | 'Layers'): number {
    let num = 0;
    for (const lg of this.layergroups.getValue()) {
      if (lg.filtertype === filtertype) {
        // console.log(lg.type, type)
        num++;
      }
    }
    return num;
  }

  isGroupFirst(group: Layer | LayerGroup, _lgroups?: Array<Layer | LayerGroup>, filtertype?: 'Baselayers' | 'Overlays' | 'Layers'): boolean {
    let value = false;

    let lgroups = this.layergroups.getValue();
    if (_lgroups) {
      lgroups = _lgroups;
    }
    if (filtertype) {
      lgroups = lgroups.filter(l => l.filtertype === filtertype);
    }
    if (lgroups.indexOf(group) === 0) {
      // console.log(group.name, 'isFirst')
      value = true;
    }
    return value;
  }

  isGroupLast(group: Layer | LayerGroup, _lgroups?: Array<Layer | LayerGroup>, filtertype?: 'Baselayers' | 'Overlays' | 'Layers'): boolean {
    let value = false;

    let lgroups = this.layergroups.getValue();
    if (_lgroups) {
      lgroups = _lgroups;
    }
    if (filtertype) {
      lgroups = lgroups.filter(l => l.filtertype === filtertype);
    }
    if (lgroups.indexOf(group) === lgroups.length - 1) {
      value = true;
    }
    return value;
  }
  // ----------------------------------------------------------------------------------------------------------------

  public isInLayergroups(layerGroup: Layer | LayerGroup): boolean {
    const value = false;
    for (const lg of this.layergroups.getValue()) {
      if (lg instanceof Layer && layerGroup instanceof Layer) {
        if (lg.id === layerGroup.id) {
          return true;
        }
      } else if (lg instanceof LayerGroup && layerGroup instanceof LayerGroup) {
        if (lg.id === layerGroup.id) {
          return true;
        }
      }
    }
    return value;
  }

  public getBaseLayers(): Observable<Layer[]> {
    return this.baseLayers.asObservable();
  }

  public getBaseLayersCount(): number {
    return this.baseLayers.getValue().length;
  }


  /**
   * filter Overlays from layergroups;
   */
  public getOverlays(): Observable<Layer[]> {
    return this.overlays.asObservable();
  }

  /**
   * filter Overlays from layergroups and remove them;
   */
  removeOverlays(filter?: (value: Layer, index: number, array: Layer[]) => any): Observable<Layer[]> {
    let overlays = this.filterOverlays();
    if (filter) {
      overlays = overlays.filter(filter);
    }
    overlays.forEach((ol) => {
      this.removeLayerOrGroupById(ol.id);
    });
    return this.overlays.asObservable();
  }

  public getOverlaysCount(): number {
    return this.overlays.getValue().length;
  }

  /** all other layers not 'Overlays' or  'Baselayers'  */
  public getLayers(): Observable<Layer[]> {
    return this.layers.asObservable();
  }

  public getLayersCount(): number {
    return this.layers.getValue().length;
  }

  // all about layergroups
  public getLayerGroups(): Observable<Array<Layer | LayerGroup>> {
    return this.layergroups.asObservable();
  }

  // all about layergroups
  public setLayerGroups(layergroups: Array<Layer | LayerGroup>): Observable<Array<Layer | LayerGroup>> {
    this.layergroups.next(layergroups);
    this.baseLayers.next(this.filterBaseLayers());
    this.layers.next(this.filterLayers());
    this.overlays.next(this.filterOverlays());
    return this.layergroups.asObservable();
  }

  public getLayerGroupsCount(): number {
    return this.layergroups.getValue().length;
  }
  // ----------------------------------------------------------------------------------------------------------------


  /**
   *
   * flatten array with layers and group.layers to get zIndex
   */
  flattenDeepArray(arr: Array<Layer | LayerGroup>): Layer[] {
    return arr.reduce((acc, val) => (val instanceof LayerGroup && Array.isArray(val.layers)) ? acc.concat(this.flattenDeepArray(val.layers)) : acc.concat(val), []);
  }

  /**
  * filtertype: "Overlays" | "Baselayers" | string
  */
  getZIndexForLayer(layerlist: Array<Layer | LayerGroup>, layer: Layer, filtertype: 'Baselayers' | 'Overlays' | 'Layers'): number {
    let zIndex = null;
    const baselayers = this.baseLayers.getValue();
    const layers = this.layers.getValue();
    let arr = [];

    if (filtertype === 'Overlays') {
      const flattgroups = this.flattenDeepArray(layerlist);
      arr = arr.concat(baselayers).concat(layers).concat(flattgroups);
      zIndex = arr.indexOf(layer);
    } else if (filtertype === 'Layers') {
      const flattgroups = this.flattenDeepArray(layerlist);
      arr = arr.concat(baselayers).concat(flattgroups);
      zIndex = arr.indexOf(layer);
    } else if (filtertype === 'Baselayers') {
      arr = arr.concat(baselayers);
      zIndex = arr.indexOf(layer);
    }
    return zIndex;
  }

  filterOverlays() {
    const _groups = this.layergroups.getValue();
    const _overlays = this.flattenDeepArray(_groups.filter((layer) => layer.filtertype === 'Overlays'));
    return _overlays;
  }

  filterBaseLayers() {
    const _groups = this.layergroups.getValue();
    const _baselayers = this.flattenDeepArray(_groups.filter((layer) => layer.filtertype === 'Baselayers'));
    return _baselayers;
  }

  filterLayers() {
    const _groups = this.layergroups.getValue();
    const _baselayers = this.flattenDeepArray(_groups.filter((layer) => layer.filtertype === 'Layers'));
    return _baselayers;
  }


  // ----------------------------------------------------------------------

  sortLayerGroup(layerGroup: LayerGroup): LayerGroup {

    // fisrt sort in order to put vectors first and then rasterlayers
    layerGroup.layers.sort((a, b) => {
      let comparison = 0;
      if (a instanceof RasterLayer) {
        comparison = 1;
      } else if (b instanceof RasterLayer) {
        comparison = -1;
      }
      return comparison;
    });
    return layerGroup;
  }
}
