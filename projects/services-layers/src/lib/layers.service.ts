import { Injectable } from '@angular/core';
//import { Layer, LayerGroup, RasterLayer } from './layers';
import { Layer, LayerGroup, RasterLayer } from '@ukis/datatypes-layers'
import { BehaviorSubject, Observable, from } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { IfStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class LayersService {
  private layergroups = new BehaviorSubject(Array<Layer | LayerGroup>());

  private baseLayers = new BehaviorSubject(Array<Layer>());

  private overlays = new BehaviorSubject(Array<Layer>());

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

  //----------------------------------------------------------------------------------------------------------------
  /**
   * add's a ukis Layer or a LayerGroup to the Layerservice
   * if toGroup is true the layer is is not added to the list of Layers and LayerGroups only used  internal
   * 
   * filtertype: "Overlays" | "Baselayers" | string
   */
  public addLayer(layer: Layer, filtertype: "Overlays" | "Baselayers" | string, toGroup?: boolean) {
    //console.log("layer.filtertype", layer.filtertype)
    if (toGroup) {
      let groups = this.layergroups.getValue();

      if (filtertype === "Baselayers") {
        this.baseLayers.next(this.filterBaseLayers())
      }
      if (filtertype === "Overlays") {
        this.overlays.next(this.filterOverlays())
      }
    }

    //this.layergroups.getValue();
    //add single layer to layergroups!!!!!
    if (!this.isInLayergroups(layer) && !toGroup) {
      let groups = this.layergroups.getValue();
      //add type to single layer for layer moving
      layer.filtertype = filtertype;
      groups.push(layer);
      //layer.zIndex = this.getZIndexForLayer(groups, layer, type)
      this.layergroups.next(groups);
      if (filtertype === "Baselayers") {
        this.baseLayers.next(this.filterBaseLayers())
      }
      if (filtertype === "Overlays") {
        this.overlays.next(this.filterOverlays())
      }
    }
  }

  /**
  * filtertype: "Overlays" | "Baselayers" | string
  */
  public removeLayer(layer: Layer, filtertype: "Overlays" | "Baselayers" | string) {
    if (this.isInLayergroups(layer)) {
      console.log('remove single layer from layergroups!!!!!')
      let groups = this.layergroups.getValue().filter((lg) => {
        if (lg instanceof Layer) {
          return lg.id != layer.id
        } else {
          return lg;
        }
      });
      this.layergroups.next(groups);
    }

    if (filtertype === "Overlays") {
      this.overlays.next(this.filterOverlays())
    }

    if (filtertype === "Baselayers") {
      this.baseLayers.next(this.filterBaseLayers());
    }
  }

  /**
  * filtertype: "Overlays" | "Baselayers" | string
  */
  public updateLayer(layer: Layer, filtertype: "Overlays" | "Baselayers" | string) {
    if (filtertype === "Overlays") {
      for (let l of this.filterOverlays()) {
        if ((l.id === layer.id)) {
          this.overlays.next(this.filterOverlays())
        }
      }
    }
    if (filtertype === "Baselayers") {
      for (let l of this.baseLayers.getValue()) {
        if ((l.id === layer.id)) {
          this.baseLayers.next(this.filterBaseLayers());
        }
      }
    }
  }


  /**
   * TODO: remove layer from grup without grup id 
   * 
   * removes a ukis Layer or a LayerGroup from the Layerservice by the Layer.id or LayerGroup.id
   * if layerGroupId is set, then it removes the Layer from a LayerGroup
   */
  public removeLayerOrGroupById(id: string) {
    this.layergroups.getValue().filter((lg) => {
      if (lg instanceof Layer) {
        if (lg.id === id) {
          this.removeLayer(lg, lg.filtertype || "Overlays")
        }
      } else if (lg instanceof LayerGroup) {
        if (lg.id === id) {
          this.removeLayerGroup(lg);
        } else {
          //this.removeLayerFromGroup
          lg.layers.forEach((_layer, index) => {
            if (_layer.id === id) {
              this.removeLayerFromGroup(_layer, lg)
            }
          })
        }
      }
    });
  }

  public addLayerToGroup(layer: Layer, layerGroup: LayerGroup) {
    /** convert filtertyle of layer to the same as the group */
    if (layer.filtertype != layerGroup.filtertype) {
      layer.filtertype = layerGroup.filtertype
    }

    layerGroup.layers.push(layer)
    //this.updateLayer(layer, layerGroup)

    this.layergroups.getValue().forEach((lg) => {
      if (lg instanceof Layer) {

      } else if (lg instanceof LayerGroup) {
        if (lg.id == layerGroup.id) {
          lg.layers = layerGroup.layers;
        }
      }
    })

    this.layergroups.next(this.layergroups.getValue());
    this.overlays.next(this.filterOverlays());
    this.baseLayers.next(this.filterBaseLayers());
  }

  public addLayerToGroupById(layer: Layer, GroupId: string) {
    this.layergroups.getValue().forEach((lg) => {
      if (lg instanceof LayerGroup && lg.id == GroupId) {
        this.addLayerToGroup(layer, lg);
      }
    })
  }

  public removeLayerFromGroup(layer: Layer, layerGroup: LayerGroup) {
    layerGroup.layers = layerGroup.layers.filter(l => l.id !== layer.id);
    this.removeLayer(layer, layerGroup.filtertype || 'Overlays')

    this.layergroups.getValue().forEach((lg) => {
      if (lg instanceof Layer) {

      } else if (lg instanceof LayerGroup) {
        if (lg.id == layerGroup.id) {
          lg.layers = layerGroup.layers
          this.layergroups.next(this.layergroups.getValue());
        }
      }
    })

    //if no layers on the group remove it
    if (layerGroup.layers.length === 0) {
      let _layergroups = this.layergroups.getValue().filter((lg) => {
        if (lg instanceof Layer) {
          return lg;
        } else if (lg instanceof LayerGroup) {
          return lg.id !== layerGroup.id
        }
      })
      this.layergroups.next(_layergroups);
    }
  }

  public setLayerIndexInGroup(layer: Layer, dir: "up" | "down", layerGroup: LayerGroup) {
    //console.log("move layer in group " + dir);
    //console.log(layerGroup);
    let groupIndex = layerGroup.layers.indexOf(layer);

    switch (dir) {
      case "up": {
        if (groupIndex == 0) {
          break;
        } else {
          this.arrayMove(layerGroup.layers, groupIndex, groupIndex - 1)
        }
        break;
      }
      case "down": {
        if (groupIndex == layerGroup.layers.length - 1) {
          break;
        } else {
          this.arrayMove(layerGroup.layers, groupIndex, groupIndex + 1)
        }
        break;
      }
    }
    this.updateLayer(layer, layerGroup.filtertype || 'Overlays')
  }


  //----------------------------------------------------------------------------------------------------------------

  public addLayerGroup(layerGroup: LayerGroup) {
    //console.log("add LayerGroup", layerGroup);
    if (!this.isInLayergroups(layerGroup)) {
      let lgroups = this.layergroups.getValue();
      lgroups.push(layerGroup)

      this.layergroups.next(lgroups);
      //add layers
      for (let layer of layerGroup.layers) {
        //console.log("layerGroup.filtertype", layerGroup.filtertype)
        this.addLayer(layer, layerGroup.filtertype || 'Overlays', true);
      }
    }
  }

  public removeLayerGroup(layerGroup: LayerGroup) {
    //remove all layers of this group from the map
    if (layerGroup.removable) {
      for (let layer of layerGroup.layers) {
        console.log('remove layerGroup layers:', layer)
        this.removeLayerFromGroup(layer, layerGroup);
      }
    } else {
      console.log('layerGroup is not removable!')
    }
  }

  public updateLayerGroup(layerGroup: LayerGroup, sort: boolean = false) {
    if (sort) {
      layerGroup = this.sortLayerGroup(layerGroup);
    }
    for (let layer of layerGroup.layers) {
      this.updateLayer(layer, layerGroup.filtertype || 'Overlays');
    }
  }

  arrayMove(array: Array<any>, fromIndex: number, toIndex: number) {
    array.splice((toIndex < 0 ? array.length + toIndex : toIndex), 0, array.splice(fromIndex, 1)[0]);
  }

  public setGroupLayerIndex(group: Layer | LayerGroup, dir: "up" | "down", layerGroup?: LayerGroup) {
    console.log("move group " + dir);
    let groupsCount;
    if (group instanceof Layer && group.filtertype) {
      groupsCount = this.getNumOfGroups(group.filtertype);
    } else if (group instanceof LayerGroup) {
      groupsCount = this.getNumOfGroups(group.filtertype);
    }

    if (groupsCount > 1) {

      //get only groups ... check if move is working with single layers!!!!!!!!
      let lgroups = this.layergroups.getValue(); //.filter(lg => lg instanceof LayerGroup);

      let groupIndex = lgroups.indexOf(group);

      //console.log('groupIndex', group.name, groupIndex)
      //console.log(lgroups)
      switch (dir) {
        case "up": {
          if (this.isGroupFirst(group)) {
            break;
          } else {
            this.arrayMove(lgroups, groupIndex, groupIndex - 1)
          }
          break;
        }
        case "down": {
          if (this.isGroupLast(group)) {
            break;
          } else {
            this.arrayMove(lgroups, groupIndex, groupIndex + 1)
          }
          break;
        }
      }
      console.log('groupIndex after', group.name, lgroups.indexOf(group))
      this.layergroups.next(lgroups);
      this.baseLayers.next(this.filterBaseLayers());
      this.overlays.next(this.filterOverlays());
    }
  }

  /**
  * filtertype: "Overlays" | "Baselayers" | string
  */
  getNumOfGroups(filtertype: "Overlays" | "Baselayers" | string): number {
    let num = 0;
    for (let lg of this.layergroups.getValue()) {
      if (lg.filtertype === filtertype) {
        //console.log(lg.type, type)
        num++;
      }
    }
    return num;
  }

  isGroupFirst(group: Layer | LayerGroup, _lgroups?: Array<Layer | LayerGroup>, filtertype?: "Overlays" | "Baselayers" | string): boolean {
    let value = false;

    let lgroups = this.layergroups.getValue();
    if (_lgroups) {
      lgroups = _lgroups
    }
    if (filtertype) {
      lgroups = lgroups.filter(l => l.filtertype == filtertype);
    }
    if (lgroups.indexOf(group) == 0) {
      //console.log(group.name, 'isFirst')
      value = true;
    }
    return value;
  }

  isGroupLast(group: Layer | LayerGroup, _lgroups?: Array<Layer | LayerGroup>, filtertype?: "Overlays" | "Baselayers" | string): boolean {
    let value = false;

    let lgroups = this.layergroups.getValue();
    if (_lgroups) {
      lgroups = _lgroups
    }
    if (filtertype) {
      lgroups = lgroups.filter(l => l.filtertype == filtertype);
    }
    if (lgroups.indexOf(group) == lgroups.length - 1) {
      value = true;
    }
    return value;
  }
  //----------------------------------------------------------------------------------------------------------------

  public isInLayergroups(layerGroup: Layer | LayerGroup): boolean {
    let value = false;
    for (let lg of this.layergroups.getValue()) {
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
    //this.overlays.next(this.filterOverlays());
    return this.overlays.asObservable();
  }

  public getOverlaysCount(): number {
    return this.overlays.getValue().length;
  }

  //all about layergroups
  public getLayerGroups(): Observable<Array<Layer | LayerGroup>> {
    return this.layergroups.asObservable();
  }

  //all about layergroups
  public setLayerGroups(layergroups: Array<Layer | LayerGroup>): Observable<Array<Layer | LayerGroup>> {
    this.layergroups.next(layergroups);
    this.baseLayers.next(this.filterBaseLayers());
    this.overlays.next(this.filterOverlays());
    return this.layergroups.asObservable();
  }

  public getLayerGroupsCount(): number {
    return this.layergroups.getValue().length;
  }
  //----------------------------------------------------------------------------------------------------------------


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
  getZIndexForLayer(layerlist: Array<Layer | LayerGroup>, layer: Layer, filtertype: "Overlays" | "Baselayers" | string): number {
    let zIndex = null;
    let baselayers = this.baseLayers.getValue();
    let arr = [];

    if (filtertype == "Overlays") {
      let flattgroups = this.flattenDeepArray(layerlist);
      arr = arr.concat(baselayers).concat(flattgroups);
      zIndex = arr.indexOf(layer);
    } else if (filtertype = "Baselayers") {
      arr = arr.concat(baselayers)
      zIndex = arr.indexOf(layer);
    }
    return zIndex;
  }

  //base and overlays ----------------------------------
  /*
  addBaseLayer(layer: Layer) {
    let baseLayers = this.baseLayers.getValue();
    baseLayers.push(layer)
    this.baseLayers.next(baseLayers);
  }

  removeBaseLayer(layer: Layer) {
    this.baseLayers.next(this.baseLayers.getValue().filter(l => l !== layer));
  }

  updateBaselayer(layer: Layer) {
    //console.log("update base layer called");
    let _baseLayers = this.baseLayers.getValue();
    for (let idx = 0; idx < _baseLayers.length; idx++) {
      if (_baseLayers[idx].id === layer.id) {
        _baseLayers[idx] = layer;
        this.baseLayers.next(_baseLayers);
        break;
      }
    }
  }
  */

  /*
    addOverlay(layer: Layer) {
      //console.log('add do nothing')
      let overlays = this.overlays.getValue();
      overlays.push(layer)
      this.overlays.next(overlays);
    }
    */

  /*
  removeOverlay(layer: Layer) {
    //console.log('remove do nothing')

    this.overlays.next(this.overlays.getValue().filter(l => l.id !== layer.id));
  }
  */

  filterOverlays() {
    let _groups = this.layergroups.getValue();
    let _overlays = this.flattenDeepArray(_groups.filter((layer) => layer.filtertype == 'Overlays' || layer.filtertype == 'Overlays'));
    return _overlays;
  }

  filterBaseLayers() {
    let _groups = this.layergroups.getValue();
    let _baselayers = this.flattenDeepArray(_groups.filter((layer) => layer.filtertype == 'Baselayers' || layer.filtertype == 'Baselayers'));
    return _baselayers;
  }


  //----------------------------------------------------------------------

  sortLayerGroup(layerGroup: LayerGroup): LayerGroup {

    //fisrt sort in order to put vectors first and then rasterlayers
    layerGroup.layers.sort((a, b) => {
      let comparison = 0;
      if (a instanceof RasterLayer) {
        comparison = 1;
      } else if (b instanceof RasterLayer) {
        comparison = -1;
      }
      return comparison;
    })
    return layerGroup;
  }
}
