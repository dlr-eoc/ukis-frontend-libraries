import { TestBed, waitForAsync } from '@angular/core/testing/';
import { OwcJsonService, shardsExpand } from './owc-json.service';
import { barebonesContext, baseWMTSLayer, baseWMSLayer, baseWFSLayer, basicOgcOwsContext, eocOwsContext, eocProjContext, zoomedContext, baseKMLLayer, eocTMSLayer, eocTimeDimensionsSteps, eocTimeDimensionsInterval, eocTimeDimensionsIntervalPeriod, eocTimeDimensionsIntervalPeriodSteps, eocTimeDimensionsIntervalPeriodStepsAndSteps, baseWMSOffering, baseWMSGetMapParams, baseWMTSOffering, baseWMTSGetTileParams, baseWFSOffering, baseWFSGetFeatureParams, baseKMLOffering, eocGeojsonOffering, eocGeojsonLayer, eocXyzLayer, eocXyzOffering, eocVectortileLayer, eocVectortileOffering, eocTMSOffering, folderMixedContext, eocWMTSLayer, eocWMTSOffering } from '../../../assets/exampleContext';
import { Fill, Stroke, Style } from 'ol/style.js';
import { LayersService, RasterLayer, LayerGroup, TmsLayertype, Layer, WmsLayertype, WfsLayertype, WmtsLayertype, KmlLayertype, XyzLayertype, ILayerIntervalAndPeriod, WmsLayer, WmtsLayer, Filtertypes } from '@dlr-eoc/services-layers';
import { VectorLayer, GeojsonLayertype } from '@dlr-eoc/services-layers';
import { Feature, Polygon, FeatureCollection } from 'geojson';
import { IOwsOffering, IOwsResource, kmlOffering, wfsOffering, wmsOffering, wmtsOffering } from './types/owc-json';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EocLitemap } from '@dlr-eoc/base-layers-raster';
import { GetFeatureOperationCode, GetMapOperationCode, GetTileOperationCode, RESTOperationCode } from './types/owc-json.utils';
import { GeoJsonOffering, IEocOwsOffering, IEocOwsResource, tmsOffering, xyzOffering } from './types/eoc-owc-json';

import { DateTime } from 'luxon';

describe('OwcJsonService utils', () => {
  beforeEach(() => { });

  it('it should create a shards array from a string', () => {
    const shards = 'a-d';
    const test = shardsExpand(shards);
    expect(test).toEqual(['a', 'b', 'c', 'd']);
  });
});


describe('OwcJsonService: reading basic data from owc', () => {
  const allTestContexts = [barebonesContext, basicOgcOwsContext, eocOwsContext, eocProjContext, zoomedContext];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
  }));



  it('should check if the json is a ows context', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    allTestContexts.forEach(c => {
      expect(service.checkContext(c)).toBeTrue();
    });
  });

  it('should get the ows context title', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    allTestContexts.forEach(c => {
      expect(service.getContextTitle(c)).toBe(c.properties.title);
    });
  });

  it('should get the ows context Publisher', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    allTestContexts.forEach(c => {
      expect(service.getContextPublisher(c)).toBe(c.properties?.publisher || null);
    });
  });

  it('should get the ows context Extent', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    allTestContexts.forEach(c => {
      expect(service.getContextExtent(c)).toBe(c?.bbox || null);
    });
  });

  it('should get the ows context Resources', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    allTestContexts.forEach(c => {
      expect(service.getResources(c).length).toBe(c.features.length);
    });
  });

  it('should get the ows context Resource Title', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    allTestContexts.forEach(c => {
      const resources = service.getResources(c);

      resources.forEach(r => {
        expect(service.getResourceTitle(r)).toBe(r.properties.title);
      });
    });
  });



});

describe('OwcJsonService: reading basic data from owc Resource', () => {
  let allResources: IOwsResource[] = [];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    allResources = service.getResources(basicOgcOwsContext);
  }));


  it('should get the ows context Resource Title', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    allResources.forEach(r => {
      expect(service.getResourceTitle(r)).toBe(r.properties.title);
    });
  });

  it('should get the ows context Resource Folder for Layer Grouping', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    allResources.forEach(r => {
      expect(service.getResourceFolder(r)).toBe(r.properties.folder);
    });
  });

  it('should get FilterType from Folder for Layer Grouping Solt', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    allResources.forEach(r => {
      const filterType = service.getFilterType(r);
      if (filterType) {
        expect(Filtertypes[filterType]).toBe(filterType);
      } else {
        expect(filterType).toBe(undefined);
      }
    });
  });


  it('should get groupName from Folder - private function', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    allResources.forEach(r => {

      const groupName = service['getLayerGroupFromFolder'](r);
      if (groupName) {
        const filterType = service.getFilterType(r);
        if (filterType) {
          const folderParts = r.properties.folder.split('/');
          expect(folderParts[0]).toBe(filterType);
          expect(folderParts[1]).toBe(groupName);

        } else {
          expect(r.properties.folder).toBe(groupName);
        }
      } else {
        expect(groupName).toBe(undefined);
      }
    });

  });

  it('should get the ows context Resource Updated', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    allResources.forEach(r => {
      expect(service.getResourceUpdated(r)).toBe(r.properties.updated);
    });
  });

  it('should get the ows context Resource Date', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    allResources.forEach(r => {
      const rDate = service.getResourceDate(r);
      if (rDate) {
        expect(DateTime.fromISO(rDate).isValid).toBeTrue();
      }
    });
  });

  it('should get the ows context Resource Active', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    allResources.forEach(r => {
      if (r.properties.active) {
        expect(service.isActive(r)).toBe(r.properties.active);
      } else {
        // set default to true
        expect(service.isActive(r)).toBeTrue();
      }
    });
  });

  it('should get the ows context Resource Description', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    allResources.forEach(r => {
      const description = service.getResourceDescription(r);
      if (r.properties.abstract) {
        expect(description).toBe(r.properties.abstract);
      } else {
        // set default to ''
        expect(description).toBe('');
      }
    });
  });

  it('should get the ows context Resource Offerings', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    allResources.forEach(r => {
      const offerings = service.getResourceOfferings(r);
      expect(offerings.length).toBe(r.properties.offerings.length);
    });
  });
});


describe('OwcJsonService: reading data from IEocOwsResource', () => {
  let allResources: IEocOwsResource[] = [];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    allResources = service.getResources(eocOwsContext);
  }));

  it('should get the Resource Opacity', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    allResources.forEach(r => {
      if (r.properties.opacity) {
        expect(service.getResourceOpacity(r)).toBe(r.properties.opacity);
      } else {
        expect(service.getResourceOpacity(r)).toBe(1);
      }
    });
  });

  it('should get the Resource Attribution or Rights', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    allResources.forEach(r => {
      if (r.properties.attribution || r.properties.rights) {
        expect(service.getResourceAttribution(r)).toBe(r.properties.attribution || r.properties.rights);
      } else {
        // set default to ''
        expect(service.getResourceAttribution(r)).toBe('');
      }
    });
  });

  it('should get the Resource Shards for RasterLayer urls', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    allResources.forEach(r => {
      expect(service.getResourceShards(r)).toBe(r.properties.shards);
    });
  });

  it('should get the Resource Dimensions', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    allResources.forEach(r => {
      const dimensions = service.getResourceDimensions(r);
      if (dimensions?.time) {
        expect(dimensions.time.values).toBeTruthy();
        expect(dimensions.time.units).toBeTruthy();
      } else if (dimensions?.elevation) {
        expect(dimensions.elevation.values).toBeTruthy();
        expect(dimensions.elevation.units).toBeTruthy();
      }
    });
  });


  it('it should get Time steps from Dimensions values', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    const dimensionsSteps = service.getTimeValueFromDimensions(eocTimeDimensionsSteps.values);
    const stepArray = eocTimeDimensionsSteps.values.split(',');
    expect(Array.isArray(dimensionsSteps)).toBeTrue();
    if (Array.isArray(dimensionsSteps)) {
      expect(typeof dimensionsSteps[0]).toEqual('string');
      expect((dimensionsSteps as string[]).length).toBe(stepArray.length);
      expect(dimensionsSteps).toEqual(stepArray);
    }
  });

  it('it should get Interval from Dimensions values and period from display', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    const dimensionsInterval = service.getTimeValueFromDimensions(eocTimeDimensionsInterval.values, eocTimeDimensionsInterval?.display?.period);
    expect(typeof dimensionsInterval).toBe('object');
    expect((dimensionsInterval as ILayerIntervalAndPeriod).interval).toBe(eocTimeDimensionsInterval.values);
    expect((dimensionsInterval as ILayerIntervalAndPeriod).periodicity).toBe(eocTimeDimensionsInterval.display.period);
  });


  it('it should get Interval and Period from Dimensions values', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    const dimensionsIntervalPeriod = service.getTimeValueFromDimensions(eocTimeDimensionsIntervalPeriod.values);
    const intervalPeriodArray = eocTimeDimensionsIntervalPeriod.values.split('/');
    expect(typeof dimensionsIntervalPeriod).toBe('object');
    expect((dimensionsIntervalPeriod as ILayerIntervalAndPeriod).interval).toBe(`${intervalPeriodArray[0]}/${intervalPeriodArray[1]}`);
    expect((dimensionsIntervalPeriod as ILayerIntervalAndPeriod).periodicity).toBe(intervalPeriodArray[2]);
  });

  it('it should get multiple Interval and Period from Dimensions values', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    const dimensionsIntervalPeriodSteps = service.getTimeValueFromDimensions(eocTimeDimensionsIntervalPeriodSteps.values);
    const periodStepsArray = eocTimeDimensionsIntervalPeriodSteps.values.split(',');
    expect(Array.isArray(dimensionsIntervalPeriodSteps)).toBeTrue();
    expect((dimensionsIntervalPeriodSteps as ILayerIntervalAndPeriod[]).length).toBe(periodStepsArray.length);
    expect(typeof dimensionsIntervalPeriodSteps[0]).toBe('object');
    const intervalPeriodArray0 = periodStepsArray[0].split('/');
    expect(dimensionsIntervalPeriodSteps[0].interval).toBe(`${intervalPeriodArray0[0]}/${intervalPeriodArray0[1]}`);
    expect(dimensionsIntervalPeriodSteps[0].periodicity).toBe(intervalPeriodArray0[2]);
  });


  it('it should get Interval and Period and single steps from Dimensions values', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);

    const dimensionsIntervalPeriodStepsAndSteps = service.getTimeValueFromDimensions(eocTimeDimensionsIntervalPeriodStepsAndSteps.values);
    const intervalPeriodStepsArray = eocTimeDimensionsIntervalPeriodStepsAndSteps.values.split(',');
    expect(Array.isArray(dimensionsIntervalPeriodStepsAndSteps)).toBeTrue();
    if (Array.isArray(dimensionsIntervalPeriodStepsAndSteps)) {
      expect((dimensionsIntervalPeriodStepsAndSteps as any[]).length).toBe(intervalPeriodStepsArray.length);
      expect(typeof dimensionsIntervalPeriodStepsAndSteps[0]).toBe('object');

      const intervalPeriodArray0 = intervalPeriodStepsArray[0].split('/');
      expect((dimensionsIntervalPeriodStepsAndSteps[0] as ILayerIntervalAndPeriod).interval).toBe(`${intervalPeriodArray0[0]}/${intervalPeriodArray0[1]}`);

      /**
       * TODO: is it allowed to override the period of an Interval??
       * currently we only do this if it is a single interval without a period so we can generate timestamps for it later
       *
      */
      /* if(eocTimeDimensionsIntervalPeriodStepsAndSteps?.display?.period){
        expect((dimensionsIntervalPeriodStepsAndSteps[0] as ILayerIntervalAndPeriod).periodicity).toBe(eocTimeDimensionsIntervalPeriodStepsAndSteps?.display?.period);
      } */
      expect(typeof dimensionsIntervalPeriodStepsAndSteps[1]).toBe('string');
    }
  });



  it('should get the Resource min/max Zoom', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    allResources.forEach(r => {
      const zooms = service.getResourceMinMaxZoom(r);
      if (zooms.maxZoom) {
        expect(typeof zooms.maxZoom).toBe('number');
      }
      if (zooms.minZoom) {
        expect(typeof zooms.minZoom).toBe('number');
      }
    });
  });
});

// TODO:
describe('OwcJsonService: reading basic data from owc Offering', () => {
  let allResources: IOwsResource[] = [];
  const allOfferings: IOwsOffering[] = [];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    allResources = service.getResources(basicOgcOwsContext);
    allResources.forEach(r => {
      const offerings = service.getResourceOfferings(r);
      allOfferings.push(...offerings);
    });
  }));


  it('should get the ows Offering Code', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    const layerTypes = [WmsLayertype, WmtsLayertype, WfsLayertype, KmlLayertype];
    allOfferings.forEach(o => {
      expect(layerTypes.includes(service.getLayertypeFromOfferingCode(o))).toBeTrue();
    });
  });

  it('should check the ows Offering is a ServiceOffering', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    expect(service.checkIfServiceOffering(baseKMLOffering)).toBe(false);
    expect(service.checkIfServiceOffering(baseWFSOffering)).toBe(true);
  });

  it('should check the ows Offering is a DataOffering', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    expect(service.checkIfDataOffering(baseKMLOffering)).toBe(true);
    expect(service.checkIfDataOffering(baseWFSOffering)).toBe(false);
  });

  it('should get LegendUrl from the ows Offering', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    allOfferings.forEach(o => {
      expect(typeof service.getLegendUrl(o)).toBe('string');
    });

  });
});


describe('OwcJsonService: reading data from IEocOwsOffering', () => {
  let allResources: IEocOwsResource[] = [];
  const allOfferings: IEocOwsOffering[] = [];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    allResources = service.getResources(basicOgcOwsContext);
    allResources.forEach(r => {
      const offerings = service.getResourceOfferings(r);
      allOfferings.push(...offerings);
    });
  }));

  it('should get the ows Offering Code', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    const layerTypes = [WmsLayertype, WmtsLayertype, WfsLayertype, KmlLayertype, GeojsonLayertype, XyzLayertype, TmsLayertype];
    allOfferings.forEach(o => {
      expect(layerTypes.includes(service.getLayertypeFromOfferingCode(o))).toBeTrue();
    });
  });

  it('should get the ows Offering matrixSets - private function', waitForAsync(() => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    service['getMatrixSetForWMTS'](eocWMTSOffering, eocWMTSOffering.matrixSets[0].srs).subscribe(ms => {
      expect(ms).toEqual(eocWMTSOffering.matrixSets[0]);
    });
  }));
});


describe('OwcJsonService: reading layer data from owc', () => {
  const targetProjection = 'EPSG:4326';

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

  }));

  it('should get all layers fom the base OWS context', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    service.getLayers(basicOgcOwsContext, targetProjection).subscribe(contextLayers => {

      const layerGroupIDs = service.getGroupResources(basicOgcOwsContext)
        .map(f => service['getLayerGroupFromFolder'](f)) // get ids
        .filter((item, index, array) => array.indexOf(item) === index); // Remove Duplicates

      const layerIDs = service.getSingleResources(basicOgcOwsContext)
        .map(f => service['getLayerGroupFromFolder'](f));  // get ids

      expect(contextLayers.length).toBe(layerGroupIDs.length + layerIDs.length);
    });
  });


  it('should get all layers fom the EOC-OWS context', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    service.getLayers(eocOwsContext, targetProjection).subscribe(eocOwsContextLayers => {
      const layerGroupIDs = service.getGroupResources(eocOwsContext)
        .map(f => service['getLayerGroupFromFolder'](f)) // get ids
        .filter((item, index, array) => array.indexOf(item) === index); // Remove Duplicates

      const layerIDs = service.getSingleResources(eocOwsContext)
        .map(f => service['getLayerGroupFromFolder'](f));  // get ids

      expect(eocOwsContextLayers.length).toBe(layerGroupIDs.length + layerIDs.length);
    });
  });


  it('should get all layers fom mixed context with folders', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    service.getLayers(folderMixedContext, targetProjection).subscribe(contextLayers => {
      const layerGroupIDs = service.getGroupResources(folderMixedContext)
        .map(f => service['getLayerGroupFromFolder'](f)) // get ids
        .filter((item, index, array) => array.indexOf(item) === index); // Remove Duplicates

      const layerIDs = service.getSingleResources(folderMixedContext)
        .map(f => service['getLayerGroupFromFolder'](f));  // get ids

      expect(contextLayers.length).toBe(layerGroupIDs.length + layerIDs.length);
    });
  });

  it('should get all layers in correct order', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    service.getLayers(folderMixedContext, targetProjection).subscribe(createdLayers => {

      /**
       * Sort context Features with Folders not in correct order
       * - L1    - L1
       * - L2    - L2
       * - F1.1  - F1.1
       * - L3    - F1.2
       * - F1.2  - L3
       * - F2    - F2
       */
      const contextFeaturesIds = [];
      folderMixedContext.features.forEach((f) => {
        if (f.properties?.folder) {
          /** private function getLayerGroupFromFolder */
          const groupName = service['getLayerGroupFromFolder'](f);
          const groupResources = folderMixedContext.features.filter(r => service['getLayerGroupFromFolder'](r) === groupName);
          groupResources.forEach(r => {
            let index = `${r.properties?.folder}/${r.properties.title}`;

            /** for features with folder: Layers/<folderName> */
            const hasFiltertype = service.getFilterType(r);
            if (hasFiltertype) {
              index = `${service['getLayerGroupFromFolder'](r)}/${r.properties.title}`;
            }

            if (!contextFeaturesIds.includes(index)) {
              contextFeaturesIds.push(index);
            }
          })
        } else {
          const index = `null/${f.properties.title}`;

          if (!contextFeaturesIds.includes(index)) {
            contextFeaturesIds.push(index);
          }
        }
      });

      /**
       * Create flat array from layers and groups
       */
      const createdLayerIds = createdLayers.reduce((p: string[], lg) => {
        if (lg instanceof LayerGroup) {
          return p.concat(lg.layers.map(l => `${lg.name}/${l.name}`));
        } else {
          return p.concat(`null/${lg.name}`);
        }
      }, []);


      /**
       * Because context drawing order is from top to bottom
       * and layers in the Layerservice are added from bottom to top reverse ids
       */
      const len = createdLayerIds.length - 1;
      contextFeaturesIds.forEach((id, index) => {
        const id2 = createdLayerIds[len - index];
        expect(id).toBe(id2);
      })

    });
  });


  // this is also testing service.createLayerGroup()
  it('should create LayerGroups for Resources with properties.folder', waitForAsync(() => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    service.getLayers(basicOgcOwsContext, targetProjection).subscribe(owsContextLayers => {
      const layerGroupNames = service.getGroupResources(basicOgcOwsContext)
        .map(f => service['getLayerGroupFromFolder'](f)) // get Names
        .filter((item, index, array) => array.indexOf(item) === index); // Remove Duplicates

      const findLayerGroups = owsContextLayers.filter(l => layerGroupNames.includes(l.name));
      findLayerGroups.forEach(lg => {
        expect(lg instanceof LayerGroup).toBeTrue();
      });
      expect(findLayerGroups.length).toBe(layerGroupNames.length);
    });
  }));


  it('should create Layers for non Group Resources', waitForAsync(() => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    service.createLayerFromDefaultOffering(eocTMSLayer, eocOwsContext, targetProjection).subscribe(layer => {
      expect(layer instanceof Layer).toBeTrue();
    });
  }));


  // this is also testing service.createWmsLayerFromOffering()
  it('should create a WMS Layer', waitForAsync(() => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    service.createLayerFromOffering(baseWMSOffering, baseWMSLayer, basicOgcOwsContext, targetProjection).subscribe((layer: WmsLayer) => {
      expect(layer instanceof WmsLayer).toBeTrue();

      baseWMSGetMapParams.forEach((v, k) => {
        // this should use uppercase keys!!!
        if (layer.params[k]) {
          expect(layer.params[k]).toBe(v);
        }
      });
    });
  }));

  // this is also testing service.createWmtsLayerFromOffering() and service.getWmtsOptions()
  it('should create a WMTS Layer', waitForAsync(() => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    service.createLayerFromOffering(baseWMTSOffering, baseWMTSLayer, basicOgcOwsContext, targetProjection).subscribe((layer: WmtsLayer) => {
      expect(layer instanceof WmtsLayer).toBeTrue();

      baseWMTSGetTileParams.forEach((v, k) => {
        // for WMTS LowerCase was used!!!
        const key = k.toLocaleLowerCase();
        if (layer.params[key]) {
          expect(layer.params[key]).toBe(v);
        }
      });
    });
  }));


  it('should create a WFS Layer', waitForAsync(() => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    service.createLayerFromOffering(baseWFSOffering, baseWFSLayer, basicOgcOwsContext, targetProjection).subscribe((layer: VectorLayer) => {
      expect(layer instanceof VectorLayer).toBeTrue();

      // Make all Params UpperCase like
      const { searchParams } = service['getJsonFromUri'](baseWFSOffering.operations.find(o => o.code === GetFeatureOperationCode).href);

      expect(layer.url.split('?')[1]).toBe(searchParams.toString());
    });
  }));


  it('should create a KML Layer - link Offering', waitForAsync(() => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    service.createLayerFromOffering(baseKMLOffering, baseKMLLayer, basicOgcOwsContext, targetProjection).subscribe((layer: VectorLayer) => {
      expect(layer instanceof VectorLayer).toBeTrue();
      expect(typeof layer.url).toBe('string');
      expect(layer.url).toBe(baseKMLOffering.contents[0].href);
    });
  }));

  /** ------------------ IEocOwsContext Layers ----------------------------------- */

  it('should create a Geojson Layer - inline Offering', waitForAsync(() => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    service.createLayerFromOffering(eocGeojsonOffering, eocGeojsonLayer, eocOwsContext, targetProjection).subscribe((layer: VectorLayer) => {
      expect(layer instanceof VectorLayer).toBeTrue();
      expect(layer.data).toBeTruthy();
      expect(layer.data).toEqual(JSON.parse(eocGeojsonOffering.contents[0].content));
    });
  }));

  it('should create a Xyz Layer', waitForAsync(() => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    service.createLayerFromOffering(eocXyzOffering, eocXyzLayer, eocOwsContext, targetProjection).subscribe((layer: RasterLayer) => {
      expect(layer instanceof RasterLayer).toBeTrue();
      expect(layer.url).toBe(eocXyzOffering.operations[0].href);
      const subdomains = shardsExpand(eocXyzLayer.properties.shards);
      expect(layer.subdomains).toEqual(subdomains);
    });
  }));

  it('should create a Vectortile Layer', waitForAsync(() => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    service.createLayerFromOffering(eocVectortileOffering, eocVectortileLayer, eocOwsContext, targetProjection).subscribe((layer: VectorLayer) => {
      expect(typeof layer.url).toBe('string');
      expect(layer.url).toBe(eocVectortileOffering.operations[0].href);
      expect(layer instanceof VectorLayer).toBeTrue();
    });
  }));

  it('should create a Raster TMS Layer', waitForAsync(() => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    service.createLayerFromOffering(eocTMSOffering, eocTMSLayer, eocOwsContext, targetProjection).subscribe((layer: RasterLayer) => {
      expect(layer instanceof RasterLayer).toBeTrue();
      expect(typeof layer.url).toBe('string');
      expect(layer.url).toBe(eocTMSOffering.operations[0].href);
    });
  }));

  it('getLayers should not stop working even if an unknown offering-code has been given', waitForAsync(() => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    const testOffering: IEocOwsOffering = {
      code: 'https://some.unknown/protocol'
    };
    const testResource: IEocOwsResource = {
      id: 'weirdLayer',
      properties: {
        title: 'weird layer',
        updated: 'today',
        offerings: [
          testOffering
        ]
      },
      geometry: null,
      type: 'Feature'
    };
    service.createLayerFromOffering(testOffering, testResource, barebonesContext, targetProjection).subscribe((layer: RasterLayer) => {
      expect(layer).toBe(null);
    });
  }));

});


/** ------------------------------------------------------------------------------------------------------------------------- */

describe('OwcJsonService: writing data into owc', () => {
  const targetProjection = 'EPSG:4326';
  let ukisWmsLayer: WmsLayer;
  let ukisWMTSLayer: WmtsLayer;
  let ukisWFSLayer: VectorLayer;
  let ukisDataLayer: VectorLayer;
  let ukisTMSRasterLayer: RasterLayer;
  let ukisTMSVectorLayer: VectorLayer;
  let ukisXyzLayer: RasterLayer;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    // baseWMSLayer - assets/exampleContext.ts
    ukisWmsLayer = new WmsLayer({
      type: 'wms',
      id: 'baseWMSLayer',
      url: 'https://geoservice.dlr.de/eoc/land/wms/wms?',
      name: 'WMS Offering',
      visible: true,
      opacity: 0.8,
      minZoom: 2,
      maxZoom: 20,
      description: 'World Settlement Footprint 2015',
      attribution: '&copy; <a href="http://www.dlr.de" target="_blank">DLR</a>',
      params: {
        LAYERS: 'WSF_2015',
        VERSION: '1.3.0'
      },
      legendImg: 'https://geoservice.dlr.de/eoc/land/wms/wms?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=WSF_2015&style=wsf',
      dimensions: {
        time: {
          values: ['2020-01-08T16:07:00.000Z', '2020-01-20T16:07:00.000Z', '2020-02-01T16:07:00.000Z'],
          units: 'ISO8601'
        }
      },
      bbox: [
        -180.01007601815968,
        -60.01006609352275,
        180.01007601819816,
        78.0100585990529]
    });

    // baseWMTSLayer - assets/exampleContext.ts
    ukisWMTSLayer = new WmtsLayer({
      type: 'wmts',
      id: 'baseWMTSLayer',
      url: 'https://tiles.geoservice.dlr.de/service/wmts?',
      name: 'WMTS Offering',
      description: 'This is the basemap for DLR Service Portals',
      params: {
        layer: 'eoc%3Abasemap',
        version: '1.0.0',
        format: 'image/png',
        style: 'default',
        matrixSetOptions: {
          matrixSet: 'EPSG:3857',
          tileMatrixPrefix: 'EPSG:3857',
        }
      },
      visible: true,
      tileSize: 512,
      styles: [
        {
          default: true,
          name: 'default',
          title: 'default'
        }
      ],
      bbox: [
        -180,
        -90,
        180,
        90
      ]
    });

    // baseWFSLayer
    ukisWFSLayer = new VectorLayer({
      id: 'baseWFSLayer',
      name: 'WFS Offering',
      type: 'wfs',
      visible: true,
      url: 'https://geoservice.dlr.de/eoc/basemap/wfs/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAME=osm%3Aosm_boundaries_gen1&OUTPUTFORMAT=application%2Fjson',
      bbox: [
        -180,
        -89.0000000381628,
        179.999999917187,
        83.8751719209928
      ]
    });

    // baseKMLLayer, eocGeojsonLayer
    ukisDataLayer = new VectorLayer({
      id: 'ID-ukis-vector',
      name: 'GeoJSON Vector Layer',
      type: 'geojson',
      data: {}, // GeoJSON Object or KML String
      visible: false
    });

    // eocTMSLayer
    ukisTMSRasterLayer = new RasterLayer({
      id: 'eocRasterTMSLayer',
      name: 'TMS - EOC Basemap',
      visible: false,
      type: 'tms',
      url: 'https://tiles.geoservice.dlr.de/service/tms/1.0.0/eoc%3Abasemap@EPSG%3A3857@png/{z}/{x}/{-y}.png'
    });

    // eocVectortileLayer
    ukisTMSVectorLayer = new VectorLayer({
      id: 'eocVectorTMSLayer',
      name: 'VectorTile Layer',
      visible: false,
      opacity: 1.0,
      type: 'tms',
      subdomains: ['a', 'b', 'c', 'd'],
      attribution: '© OpenMapTiles © OpenStreetMap contributors',
      url: 'https://{s}.tiles.geoservice.dlr.de/service/tms/1.0.0/planet_eoc@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf?flipy=true',
      options: {
        styleSource: 'planet0-12',
        style: {} // OpenMapStyle
      }
    });

    // eocXyzLayer
    ukisXyzLayer = new RasterLayer({
      id: 'eocXyzLayer',
      name: 'XYZ - OSM Tiles',
      visible: false,
      type: 'xyz',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      subdomains: ['a', 'b', 'c'],
      attribution: '© OpenStreetMap contributors'
    });


  }));


  it('should generate a Resource from a layer', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    const resource = service.generateResourceFromLayer(ukisWmsLayer);
    expect(resource.id).toBe(ukisWmsLayer.id);
    expect(resource.bbox).toEqual(ukisWmsLayer.bbox);
    expect(resource.properties.active).toBe(ukisWmsLayer.visible);
    expect(resource.properties.rights).toBe(ukisWmsLayer.attribution);
    expect(resource.properties.abstract).toBe(ukisWmsLayer.description);
    expect(resource.properties.maxZoom).toBe(ukisWmsLayer.maxZoom);
    expect(resource.properties.minZoom).toBe(ukisWmsLayer.minZoom);
    expect(resource.properties.opacity).toBe(ukisWmsLayer.opacity);
    expect(resource.properties.title).toBe(ukisWmsLayer.name);
    expect(resource.properties.offerings.length).toBe(1);
  });

  /** Offerings Types ----------------------------------  */
  it('should generate WMS Offerings from a layer', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    const offering = service.generateOfferingFromLayer(ukisWmsLayer);
    expect(offering.code).toBe(wmsOffering);
    expect(offering.operations.length).toBeTruthy();
    expect(offering.operations.find(o => o.code === GetMapOperationCode).code).toBe(GetMapOperationCode);
  });

  it('should generate WMTS Offerings from a layer', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    const offering = service.generateOfferingFromLayer(ukisWMTSLayer);
    expect(offering.code).toBe(wmtsOffering);
    expect(offering.operations.length).toBeTruthy();
    expect(offering.operations.find(o => o.code === GetTileOperationCode).code).toBe(GetTileOperationCode);
  });

  it('should generate WFS Offerings from a layer', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    const offering = service.generateOfferingFromLayer(ukisWFSLayer);
    expect(offering.code).toBe(wfsOffering);
    expect(offering.operations.length).toBeTruthy();
    expect(offering.operations.find(o => o.code === GetFeatureOperationCode).href).toBeTruthy();
  });

  it('should generate Data (GeoJson) Offering from a layer', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    const offering = service.generateOfferingFromLayer(ukisDataLayer);
    expect(offering.code).toBe(GeoJsonOffering || kmlOffering);
    expect(offering.contents.length).toBeTruthy();
    expect(offering.contents.find(c => c.type === 'application/geo+json').content).toBeTruthy();
  });

  it('should generate TMS Raster Offerings from a layer', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    const offering = service.generateOfferingFromLayer(ukisTMSRasterLayer);
    expect(offering.code).toBe(tmsOffering);
    expect(offering.operations.length).toBeTruthy();
    expect(offering.operations.find(o => o.code === RESTOperationCode).href).toBe(ukisTMSRasterLayer.url);
  });

  it('should generate TMS Vector Offerings from a layer', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    const offering = service.generateOfferingFromLayer(ukisTMSVectorLayer);
    expect(offering.code).toBe(tmsOffering);
    expect(offering.operations.length).toBeTruthy();
    expect(offering.operations.find(o => o.code === RESTOperationCode).href).toBe(ukisTMSVectorLayer.url);
    // TODO: get Style for VectorTileLayer
    // expect(offering.styles.find(s => s.content && s.content.type === 'OpenMapStyle')).toBe(ukisTMSVectorLayer.url);
  });

  it('should generate XYZ Offerings from a layer', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    const offering = service.generateOfferingFromLayer(ukisXyzLayer);
    expect(offering.code).toBe(xyzOffering);
    expect(offering.operations.length).toBeTruthy();
    expect(offering.operations.find(o => o.code === RESTOperationCode).href).toBe(ukisXyzLayer.url);
  });


  /** Resource  Types ----------------------------------  */
  it('should generate a Resource from a YXZ layer', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    const resource = service.generateResourceFromLayer(ukisXyzLayer);
    const subdomains = shardsExpand(resource.properties.shards);
    expect(subdomains).toEqual(ukisXyzLayer.subdomains);
  });


  /** general ------------------------------------------  */
  it('should properly restore a selection of layers from owc format created with #generateOwsContextFrom', waitForAsync(() => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    const layersService: LayersService = TestBed.inject(LayersService);
    const osmLayer = new EocLitemap({
      visible: true,
      legendImg: null
    });
    layersService.addLayer(osmLayer, 'Baselayers');
    layersService.getBaseLayers().subscribe(baselayers => {
      const owc = service.generateOwsContextFrom('someid', baselayers, [-190, -90, 190, 90]);
      service.getLayers(owc, targetProjection).subscribe((layers) => {
        expect(layers.length).toBe(baselayers.length);
        expect(layers.find(l => l.id === osmLayer.id).id).toBe(osmLayer.id);
      });
    });
  }));

  it('#generateOwcContextFrom should properly store and restore a geojson-layer', waitForAsync(() => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);

    // creating test-layer
    interface Props {
      'name': string;
      'id': string;
    }

    const features: Feature<Polygon, Props>[] = [{
      type: 'Feature',
      properties: {
        name: 'Testfeature',
        id: 'testfeatureId'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[0, 1], [0, 3]], [[2, 3], [2, 1]]]
      }
    }];

    const featureCollection: FeatureCollection<Polygon, Props> = {
      type: 'FeatureCollection',
      features
    };

    const options = {
      style: new Style({
        stroke: new Stroke({
          color: 'rgb(214, 102, 27)',
          width: 3
        }),
        fill: new Fill({
          color: 'rgba(226, 123, 54, 0.1)'
        })
      })
    };

    const geojsonLayer = new VectorLayer({
      name: 'GeojsonLayer',
      id: 'GeojsonLayer',
      type: GeojsonLayertype,
      data: featureCollection,
      options
    });

    // encoding and decoding
    const context = service.generateOwsContextFrom('testcontext', [geojsonLayer], [-190, -90, 190, 90]);

    service.getLayers(context, targetProjection).subscribe(recoveredLayers => {
      const recoveredLayer = recoveredLayers[0] as VectorLayer;
      // testing
      expect(recoveredLayer.id).toEqual(geojsonLayer.id);
      expect(recoveredLayer.data).toEqual(geojsonLayer.data);
      // expect(recoveredLayer.options).toEqual(geojsonLayer.options); // we dont encode style.
    });
  }));

  it('#generateOwcContextFrom should work with all layers in test-contexts', waitForAsync(() => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    const allTestContexts = [barebonesContext, basicOgcOwsContext, eocOwsContext];

    for (const context of allTestContexts) {
      service.getLayers(context, 'EPSG:4326').subscribe((layers) => {
        const regeneratedContext = service.generateOwsContextFrom(context.id.toString(), layers);
        expect(regeneratedContext.features.length).toBe(context.features.length);
      });
    }
  }));


  it('should regenerated layers in same order', waitForAsync(() => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);
    const allTestContexts = [basicOgcOwsContext, eocOwsContext];

    /** This is not possible!!! because groups are sorted together for the generation and we can not where the features have been in the original array*/
    /**
       * Sort context Features with Folders not in correct order
       * - L1     - L1     - L1
       * - L2     - L2     - L2
       * - F1.1   - F1.1   - F1.1
       * - L3     - F1.2   - ? L3 | F1.2
       * - F2     - L3     - ? L3 | F1.2 | F2
       * - F1.2   - F2
       */


    /** we can only check if the order is like the created layers  */
    for (const context of allTestContexts) {
      service.getLayers(context, 'EPSG:4326').subscribe((createdLayers) => {

        /**
         * Create flat array from layers and groups
         */
        const createdLayerIds = createdLayers.reduce((p: string[], lg) => {
          if (lg instanceof LayerGroup) {
            return p.concat(lg.layers.map(l => `${lg.name}/${l.name}`));
          } else {
            return p.concat(`null/${lg.name}`);
          }
        }, []);



        const regeneratedContext = service.generateOwsContextFrom(context.id.toString(), createdLayers);
        /**
         * Create array from features with groupName
         */
        const regeneratedLayerIds = regeneratedContext.features.reduce((p: string[], r) => {
          const groupName = service['getLayerGroupFromFolder'](r);
          if (groupName) {
            return p.concat(`${groupName}/${r.properties.title}`);
          } else {
            return p.concat(`null/${r.properties.title}`);
          }
        }, []);

        /**
         * Because context drawing order is from top to bottom
         * and layers in the Layerservice are added from bottom to top reverse ids
         */
        const len = createdLayerIds.length - 1;
        regeneratedLayerIds.forEach((id, index) => {
          const id2 = createdLayerIds[len - index];
          expect(id).toBe(id2);
        })
      });
    }
  }));

  it('#generateOwcContextFrom should honor (nested) layer-groups', () => {
    const service: OwcJsonService = TestBed.inject(OwcJsonService);

    const group = new LayerGroup({
      id: 'parent',
      name: 'parent',
      layers: [
        new EocLitemap({
          name: 'child'
        }),
      ],
    });

    const context = service.generateOwsContextFrom('someId', [group]);

    expect(context.features[0].properties.folder).toEqual(`${group.filtertype}/parent`);
  });
});
