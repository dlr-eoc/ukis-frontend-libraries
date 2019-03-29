import { Component, Input, Inject, OnChanges, OnDestroy, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

import { IOwsContext, IEocOwsResource } from '@ukis/datatypes-owc-json';
import { Layer } from '@ukis/datatypes-layers';

import { DatasetExplorerService } from "./dataset-explorer.service";
import { LayersService } from '@ukis/services-layers';
import { MapStateService } from '@ukis/services-map-state';

import { Subscription } from 'rxjs';
import * as dayjs from 'dayjs';

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

export interface Ifilter {
  children: Ifilter[]
  criterionType: "Topic"
  id: string
  leaf: boolean
  name: string
  parent: null | string
  siblings: Ifilter[]
  count?: number
}

export interface Ifilters {
  children: Ifilter[]
  prop: string
  title: string
  selected?: Ifilter
}

const clone = function (o) {
  return JSON.parse(JSON.stringify(o))
}
const DATEFORMAT = 'YYYY-MM-DD';

const minMaxDate = function (dates: Date[]) {
  var sorted = dates.sort((a, b) => {
    return a.getTime() - b.getTime();
  });
  var minDate = sorted[0];
  var maxDate = sorted[sorted.length - 1];
  return {
    min: minDate,
    max: maxDate
  }
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

  @Input('bbox-filter') bboxfilter?: (value: IEocOwsResource) => any;
  @Input('table-props') tableProps?: { rowdetail: string, rowclass: string, columns: ColumnDescriptor[] };
  @Input('filter-props') filterProps?: any[];
  @Input('is-active') isactive?: boolean;

  @ViewChild('treeroot') treeroot;



  datasets: IEocOwsResource[];
  datasetsFiltered: IEocOwsResource[] = [];
  datasetsFilteredCache: IEocOwsResource[] = [];
  datasetsFilteredLength: number;
  datasetSelected: IEocOwsResource[] = [];
  selectedMap: Map<string, IEocOwsResource> = new Map();

  mapLayers: Layer[] = [];
  //layerIDs: string[] = [];

  oldIds: string[] = [];

  filters: Ifilters[];
  filtersFiltered: Ifilters[];
  filterSelected: boolean = false;
  activeFilters: Array<Ifilter[]> = [];

  columns: ColumnDescriptor[] = [];
  layersSubscription: Subscription;
  imagesForDatatypes: any;

  //mock-up
  filterMapExtend: boolean = false;
  filterTimeRange: boolean = false;
  /**
   * A date range of the OWC Data with a min and a max and the chosen values valuemin and valuemax in format 'YYYY-MM-DD'
   */
  daterange: { min: string, max: string, valuemin: string, valuemax: string };

  constructor(@Inject(DatasetExplorerService) private obsSvc: DatasetExplorerService) {
    //this.filterOnBbox = false;
    this.daterange = {
      min: dayjs().format(DATEFORMAT), //.formt(DATEFORMAT)//moment().format(DATEFORMAT),
      max: dayjs().format(DATEFORMAT),//moment().format(DATEFORMAT),
      valuemin: dayjs().format(DATEFORMAT),//moment().format(DATEFORMAT),
      valuemax: dayjs().format(DATEFORMAT)//moment().format(DATEFORMAT)
    }
  }

  onDateChange(event) {
    if (!dayjs(this.daterange.valuemin).isValid()) {
      this.daterange.valuemin = this.daterange.min;
    }
    if (!dayjs(this.daterange.valuemax).isValid()) {
      this.daterange.valuemax = this.daterange.max;
    }
    this.applyFilters('date');
  }

  ngOnInit() {
    this.imagesForDatatypes = {
      "raster": "/assets/icons/raster.png",
      "point": "/assets/icons/point.png",
      "line": "/assets/icons/line.png",
      "polygon": "/assets/icons/polygon.png",
      "literature": "/assets/icons/literature.png",
      "statistics": "/assets/icons/statistics.png"
    }

    this.subscribeToLayerSvc();
  }

  ngOnChanges(changes) {
    if (changes.owsContext) {
      console.log('owsContext Changes')
      this.datasets = this.owsContext.features;
      this.columns = this.tableProps.columns;

      let dataDateRange = this.getMinAndMaxDate(this.datasets);
      this.daterange.min = dataDateRange.min;
      this.daterange.max = dataDateRange.max;
      this.daterange.valuemin = dataDateRange.min; //dayjs().format(DATEFORMAT);
      this.daterange.valuemax = dataDateRange.max;

      // rename property to "children" in the root 
      this.filters = this.filterProps.map(f => { f.children = this.owsContext.properties[f.prop]; return f });
      // work only on the clone and keep original data unmodified
      this.filtersFiltered = clone(this.filters);
    }

    if (changes.isactive) {
      console.log('Modal isactive Changes')
      this.getDatasetsForLayers(this.mapLayers)
    }

    //try to only apply filter once
    if (changes.isactive || changes.owsContext) {
      console.log('Modal isactive or owsContext Changes')
      this.applyFilters('ngChanges');
    }
  }

  /*
  * not used due to clarity issue 2342
  saveSelections() {
    if (this.datasetSelected.length != 0) {
      this.datasetSelected.forEach((d) => {
        let key = d.id.toString();
        if (!this.selectedMap.has(key)) {
          this.selectedMap.set(key, d);
        }
      })
    }
  }

  restoreSelections() {
    if (this.selectedMap.size > 0) {
      this.datasetSelected = Array.from(this.selectedMap.values())
    }
  }
  */
  filterAdd(node: Ifilter, i) {
    /**
     * save selected Array - clarity issue 2342 Datagrid clears the selection on filter or source change
     */
    //this.saveSelections(); * not used due to clarity issue 2342

    //store last filters in Array to get parrent if a filter is removed
    if (!this.activeFilters[i]) {
      this.activeFilters[i] = [];
    }
    this.activeFilters[i].push(node);
    this.filtersFiltered[i].selected = node;
    this.filtersFiltered[i].children = node.children;

    this.applyFilters(node.id);
  }

  filterRemove(i) {
    let activeFilters = this.activeFilters[i];
    let removed = activeFilters.pop();
    if (activeFilters.length > 0) {
      let parrent = activeFilters.slice(-1);
      this.filtersFiltered[i].children = clone(parrent[0].children);
      this.filtersFiltered[i].selected = parrent[0];
    } else {
      this.filtersFiltered[i].selected = null;
      this.filtersFiltered[i].children = clone(this.filters[i].children);
    }

    this.applyFilters(removed.id);

    /**
     * restore selected Array - clarity issue 2342 Datagrid clears the selection on filter or source change
     */
    //this.restoreSelections() * not used due to clarity issue 2342
    this.getDatasetsForLayers(this.mapLayers)
  }

  isBboxFilter() {
    return this.bboxfilter && this.filterMapExtend;
  }

  isTimeFilter() {
    return this.filterTimeRange;
  }

  isPropsFilter() {
    return this.activeFilters.map((value) => {
      return (value.length > 0) ? 1 : 0;
    }).includes(1);
  }

  isAnyFilter() {
    let allActiveFilter = [];
    if (this.isBboxFilter())
      allActiveFilter.push('bbox');
    if (this.isTimeFilter())
      allActiveFilter.push('time');
    if (this.isPropsFilter())
      allActiveFilter.push('props');
    return {
      filters: allActiveFilter,
      is: this.isBboxFilter() || this.isTimeFilter() || this.isPropsFilter()
    }
  }




  applyFilters(triggerer?) {
    if (triggerer) {
      console.log(triggerer)
    }
    // filter bbox
    if (this.isBboxFilter() && !this.isPropsFilter() && !this.isTimeFilter()) {
      this.datasetsFiltered = this.datasets.filter(this.bboxfilter);
    } else if (this.isBboxFilter() && !this.isPropsFilter() || !this.isTimeFilter()) {
      this.datasetsFiltered = this.datasetsFiltered.filter(this.bboxfilter);
    }


    // filter time 
    if (this.isTimeFilter() && !this.isPropsFilter() && !this.isBboxFilter()) {
      this.datasetsFiltered = this.datasets.filter(this.timeRangeFilter);
    }
    else if (this.isTimeFilter() && !this.isPropsFilter() || !this.isBboxFilter()) {
      this.datasetsFiltered = this.datasetsFiltered.filter(this.timeRangeFilter);
    }

    // filter on properties if the are selected by filter
    if (this.isPropsFilter()) {
      //get all ids from activefilters array to filter on child parent relationship - UKISDEV-758
      let filterterms = this.activeFilters.reduce((acc: any, val) => {
        let ids = val.map(f => f.id);
        // acc.push(ids) -> [[100,200],[vector]]
        // spread array of ids in the initial array acc e.g [] = [[100,200],[vector]]
        return [...acc, ...[...ids]];
      }, []);
      //console.log(filterterms)

      if (filterterms.length && !this.isBboxFilter() && !this.isTimeFilter()) {
        this.datasetsFiltered = this.datasets.filter(resource => {
          //categoryIds = ["100", "170", "172", "ASCAT", "raster", "remotesensingproduct"]
          //return filterterms.reduce((re, ft) => re && d.properties.customAttributes.categoryIds.indexOf(ft) != -1, true)
          let hasTerms = filterterms.reduce((re, ft) => {
            let hasId = re && resource.properties.customAttributes.categoryIds.indexOf(ft) != -1;
            //if (hasId) console.log(resource)
            return hasId;
          }, true)
          return hasTerms;
        });
      }
      if (filterterms.length && this.isTimeFilter() || this.isBboxFilter()) {
        this.datasetsFiltered = this.datasetsFiltered.filter(resource => {
          //categoryIds = ["100", "170", "172", "ASCAT", "raster", "remotesensingproduct"]
          //return filterterms.reduce((re, ft) => re && d.properties.customAttributes.categoryIds.indexOf(ft) != -1, true)
          let hasTerms = filterterms.reduce((re, ft) => {
            let hasId = re && resource.properties.customAttributes.categoryIds.indexOf(ft) != -1;
            //if (hasId) console.log(resource)
            return hasId;
          }, true)
          return hasTerms;
        });
      }

    }

    // if there are no filterterms reseed the datasets in the table
    if (!this.isAnyFilter().is) {
      this.datasetsFiltered = this.datasets;
    }

    //this.datasetsFilteredCache = clone(this.datasetsFiltered)

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
    console.log(`Filters applyed`);
    this.datasetsFilteredLength = this.datasetsFiltered.length;
  }

  getLayerFromDatasets(layer: Layer) {
    return this.datasets.filter(d => d.id == layer.id)[0];
  }

  getDatasetsForLayers(layers: Layer[]) {
    layers.forEach((l) => {
      let d = this.getLayerFromDatasets(l);
      if (d && this.datasetSelected.indexOf(d) == -1) {
        this.datasetSelected.push(d)
      }
    })
  }

  //TODO fix subsribe remove 
  subscribeToLayerSvc() {
    this.layersSubscription = this.layersSvc.getOverlays().subscribe(layers => {
      this.mapLayers = layers;

      //this.layerIDs = this.mapLayers.map(l => l.id + "")
      //console.log('sub to layers', this.mapLayers)
      //console.log('oldIds', this.oldIds)
      //console.log('layerIDs', this.layerIDs)

      //remove old layers
      // reverse loop for remove items from Array while iterating over it
      /*
      * not used due to clarity issue 2342
      *
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
      */
    });
  }

  selectionChanged(sel) {

    //console.log('-----------change')
    //console.log("datasets selected after selectionChanged: ", this.datasetSelected, this.selectedMap)
    //let newIds = []; * not used due to clarity issue 2342

    //console.log('newIds', newIds)
    //console.log('oldIds', this.oldIds)

    sel.forEach(s => {
      //newIds.push(s.id) * not used due to clarity issue 2342
      this.addDataset(s);
    })


    //remove old layers
    /*
    * * not used due to clarity issue 2342
    this.oldIds.forEach(id => {
      if (newIds.indexOf(id) == -1) {
        console.log('this.oldIds', this.oldIds, newIds)
        // we can not remove layers on selectionChanged due to clarity issue 2342 -> selectionChanged is triggered from datagrid if data or filter changes
        //http://git.ukis.eoc.dlr.de/projects/MOFRO/repos/frontend-libraries/commits/874bd84dadbde8afffa5ca79e2482eb092b24481#projects/dataset-explorer/src/lib/dataset-explorer.component.ts
         
        this.layersSvc.removeLayerOrGroupById(id);
      }
    });
    */

    //set old to new
    //this.oldIds = newIds; * not used due to clarity issue 2342

    /*
    * not used due to clarity issue 2342
    if (newIds.length == 0) {
      this.oldIds.forEach(id => {
        console.log('this.oldIds',this.oldIds)
        this.layersSvc.removeLayerOrGroupById(id);
      })
    }
    */

    //console.log('newIds', newIds)
    //console.log('oldIds', this.oldIds)
  }

  addDataset(dataset) {
    let layer = this.obsSvc.addObservation(dataset);
    //console.log(">", layer, dataset)

    this.layersSvc.addLayer(layer, 'Overlays');

    //zoomTo added dataset    
    if (this.mapStateSvc && layer.bbox && layer.bbox.length >= 4) {
      this.mapStateSvc.setExtent(layer.bbox);
    } else {
      //console.info("MapStateService: " + this.mapStateSvc + " && layer.bbox:" + layer.bbox + " && (layer.bbox.length >= 4):" + (layer.bbox.length >= 4) + ": zoom to layer cannot be conducted due to missing input");
    }
  }
  removeDataset(dataset) {
    //this.obsSvc.removeDataset(dataset);
    //console.log("remove <", dataset.id)
    this.layersSvc.removeLayer(dataset, 'Overlays');
  }

  timeRangeFilter = (resource: IEocOwsResource) => {
    let endDate = resource.properties.customAttributes.endDate,
      startDate = resource.properties.customAttributes.startDate;
    if (this.dateIsBetween(startDate, this.daterange.valuemin, this.daterange.valuemax) || this.dateIsBetween(endDate, this.daterange.valuemin, this.daterange.valuemax)) {
      return resource;
    }
  }

  /**
   * end and start are includet
   */
  dateIsBetween(date, min, max) {
    let minDate, maxDate, cDate;
    let _date = dayjs(date).format(DATEFORMAT);

    minDate = Date.parse(min);
    maxDate = Date.parse(max);
    cDate = Date.parse(_date);
    //console.log(`date: ${test} - min: ${min} - max: ${max}`, cDate >= minDate && cDate <= maxDate);
    if (cDate >= minDate && cDate <= maxDate) {
      return true;
    }
    return false;
  }

  getMinAndMaxDate(array: IEocOwsResource[]) {
    let dates = array.reduce((a, r) => {
      if (a.indexOf(r.properties.customAttributes.endDate) == -1) {
        a.push(r.properties.customAttributes.endDate)
      }
      if (a.indexOf(r.properties.customAttributes.startDate) == -1) {
        a.push(r.properties.customAttributes.startDate)
      }
      return a;
    }, []);

    dates = dates.map(value => dayjs(value).toDate())
    let range = {
      min: dayjs(minMaxDate(dates).min).format(DATEFORMAT),
      max: dayjs(minMaxDate(dates).max).format(DATEFORMAT)
    }
    return range;
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


  convertToDate(s: string, format?: string) {
    //return new Date(s);
    let _format = format || DATEFORMAT;
    return dayjs(s).format(_format);
  }

  ngOnDestroy() {
    this.layersSubscription.unsubscribe();
  }

}
