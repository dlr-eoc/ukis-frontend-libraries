import { Component, Input, Inject, OnChanges, OnDestroy, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

import { IOwsContext, IOwsResource } from '@ukis/datatypes-owc-json';
import { Layer } from '@ukis/datatypes-layers';

import { DatasetExplorerService } from "./dataset-explorer.service";
import { LayersService } from '@ukis/services-layers';
import { MapStateService } from '@ukis/services-map-state';

import { Subscription } from 'rxjs';

export interface ColumnDescriptor {
  title: string,
  type?: string,
  prop?: string | { href: string, title: string, status: string },
  bind?: Boolean,
  hidden?: Boolean
}

export interface DataGridDescriptor {
  rowclass?: string,
  rowdetail?: string,
  columns: ColumnDescriptor[]
}

const clone = function (o) {
  return JSON.parse(JSON.stringify(o))
}


@Component({
  selector: 'ukis-dataset-explorer',
  templateUrl: './dataset-explorer.component.html',
  styleUrls: ["./dataset-explorer.scss"],
  host: {
    "[class.dataset-explorer]": "true"
  }
})
export class DatasetExplorerComponent implements OnInit, OnChanges, OnDestroy {
  @Input('layers-svc') layersSvc: LayersService;
  @Input('map-state-svc') mapStateSvc: MapStateService;
  @Input('ows-context') owsContext: IOwsContext;

  @Input('bbox-filter') bboxfilter?: (value: IOwsResource, index: number, array: IOwsResource[]) => any;
  @Input('table-props') tableProps?: { rowdetail: string, rowclass: string, columns: ColumnDescriptor[] };
  @Input('filter-props') filterProps?: any[];

  @ViewChild('treeroot') treeroot;



  datasets: IOwsResource[];
  datasetsFiltered: IOwsResource[] = [];
  datasetSelected: IOwsResource[] = [];
  datasetSelectedCache: IOwsResource[] = [];

  mapLayers: Layer[] = [];
  layerIDs: string[] = [];

  oldIds: string[] = [];

  filters: any[];
  filtersFiltered: any[];
  filterSelected: boolean = false;

  columns: ColumnDescriptor[] = [];
  layersSubscription: Subscription;
  imagesForDatatypes: any;

  //mock-up
  filterMapExtend: boolean = false;
  filterTimeRange: boolean = false;

  constructor(@Inject(DatasetExplorerService) private obsSvc: DatasetExplorerService) {
    //this.filterOnBbox = false;
  }

  ngOnInit() {
    this.imagesForDatatypes = {
      "raster": "https://wisdom.eoc.dlr.de/Elvis/img/ListGrid/raster.png",
      "point": "https://wisdom.eoc.dlr.de/Elvis/img/ListGrid/point.png",
      "line": "https://wisdom.eoc.dlr.de/Elvis/img/ListGrid/line.png",
      "polygon": "https://wisdom.eoc.dlr.de/Elvis/img/ListGrid/polygon.png",
      "literature": "https://wisdom.eoc.dlr.de/Elvis/img/ListGrid/literature.png",
      "statistics": "https://wisdom.eoc.dlr.de/Elvis/img/ListGrid/statistics.png"
    }

    this.subscribeToLayerSvc();
  }

  ngOnChanges(changes) {
    if (changes.owsContext) {


      this.datasets = this.owsContext.features;

      this.columns = this.tableProps.columns;

      // rename property to "children" in the root 
      this.filters = this.filterProps.map(f => { f.children = this.owsContext.properties[f.prop]; return f });
      // work only on the clone and keep original data unmodified
      this.filtersFiltered = clone(this.filters);

      this.applyFilters();
    }
  }

  filterAdd(node, i) {
    /**
     * save selected Array - clarity issue 2342 Datagrid clears the selection on filter or source change
     */
    if (this.datasetSelected.length != 0) {
      this.datasetSelectedCache = clone(this.datasetSelected)
    }

    this.filtersFiltered[i].selected = node;
    this.filtersFiltered[i].children = node.children;
    this.applyFilters();
  }

  filterRemove(i) {
    this.filtersFiltered[i].selected = null;
    this.filtersFiltered[i].children = clone(this.filters[i].children);
    this.applyFilters();

    /**
     * restore selected Array - clarity issue 2342 Datagrid clears the selection on filter or source change
     */
    if (this.datasetSelectedCache.length > 0) {
      this.datasetSelected = this.datasetSelectedCache;
    }
  }

  applyFilters() {

    // flatten to a simple array of filterterms
    var filterterms = this.filtersFiltered.reduce((acc, val) => {
      if (val.selected) acc.push(val.selected.id);
      return acc;
    }, []);

    if (filterterms.length) { // filter the datasets
      this.datasetsFiltered = this.datasets.filter(d =>
        filterterms.reduce((re, ft) => re && d.properties.customAttributes.categoryIds.indexOf(ft) != -1, true)
      );
    } else { // if there are no filterterms reseed the datasets in the table
      this.datasetsFiltered = this.datasets;
    }

    // get a count of available datasets for each term
    let count = {};
    this.datasetsFiltered.forEach((d) => {
      d.properties.customAttributes.categoryIds.forEach((t) => count[t] = count[t] ? count[t] + 1 : 1);
    });

    //console.log(count);
    // add the count as a property to each of the current active filterterms 
    this.filtersFiltered.forEach((fd) => {
      fd.children.forEach((c) => {
        // c.id is the property in the ows context theme / dataType lookup table
        c.count = count[c.id];
      })
    });
  }

  //TODO fix subsribe remove 
  subscribeToLayerSvc() {
    this.layersSubscription = this.layersSvc.getOverlays().subscribe(layers => {
      this.mapLayers = layers;
      this.layerIDs = this.mapLayers.map(l => l.id + "")
      //console.log('oldIds', this.oldIds)
      //console.log('layerIDs', this.layerIDs)

      //remove old layers
      // reverse loop for remove items from Array while iterating over it
      for (let i = this.oldIds.length - 1; i >= 0; --i) {
        let id = this.oldIds[i]
        if (this.layerIDs.indexOf(id) == -1) {
          let _spliceindex;
          for (let _i = this.datasetSelected.length - 1; _i >= 0; --_i) {
            let d = this.datasetSelected[_i]
            if (d.id == id) {
              _spliceindex = _i
              this.datasetSelected.splice(_spliceindex, 1)
              this.oldIds.splice(i, 1)
            }
          }
        }
      }
    });
  }

  selectionChanged(sel) {

    //console.log('-----------change')
    console.log("datasets selected after selectionChanged: ", this.datasetSelected, this.datasetSelectedCache)
    let newIds = [];

    //console.log('newIds', newIds)
    //console.log('oldIds', this.oldIds)

    sel.forEach(s => {

      newIds.push(s.id)
      this.addDataset(s);

    })


    //remove old layers
    this.oldIds.forEach(id => {
      if (newIds.indexOf(id) == -1) {
        //console.log('this.oldIds', this.oldIds)
        /**
         * Workaround to prevent removal of datasets in layer list due to clarity issue 2342: is fixed now???
         * http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/874bd84dadbde8afffa5ca79e2482eb092b24481#projects/dataset-explorer/src/lib/dataset-explorer.component.ts
         */
        this.layersSvc.removeLayerOrGroupById(id);
      }
    });

    //set old to new
    this.oldIds = newIds;

    if (newIds.length == 0) {
      this.oldIds.forEach(id => {
        //console.log('this.oldIds',this.oldIds)
        this.layersSvc.removeLayerOrGroupById(id);
      })
    }

    //console.log('newIds', newIds)
    //console.log('oldIds', this.oldIds)
  }

  addDataset(dataset) {
    let layer = this.obsSvc.addObservation(dataset);
    //console.log(">", layer)

    this.layersSvc.addLayer(layer, 'Overlays');

    //zoomTo added dataset
    if (this.mapStateSvc && layer.bbox && layer.bbox.length >= 4) {
      this.mapStateSvc.setExtent(layer.bbox);
    }
  }
  removeDataset(dataset) {
    //this.obsSvc.removeDataset(dataset);
    console.log("remove <", dataset.id)
    this.layersSvc.removeLayer(dataset, 'Overlays');
  }

  customFilter(active: boolean) {
    if (this.bboxfilter) {
      if (active) {
        this.datasetsFiltered = this.datasets.filter(this.bboxfilter)
      } else {
        this.datasetsFiltered = this.datasets;
      }
    }
  }

  pick(o: any, s: string) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
      var k = a[i];
      if (k in o) {
        o = o[k];
      } else {
        return;
      }
    }
    return o;
  }


  convertToDate(s: string) {
    return new Date(s);
  }

  ngOnDestroy() {
    this.layersSubscription.unsubscribe();
  }

}
