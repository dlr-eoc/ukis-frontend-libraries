import { TestBed } from '@angular/core/testing';
import { OwcJsonService, shardsExpand } from './owc-json-svc';
import {
  barebonesContext, baseWMTSLayer, baseWMSLayer, baseWFSLayer, basicOgcOwsContext, eocOwsContext,
  eocProjContext, zoomedContext, baseKMLLayer, eocTMSLayer, eocTimeDimensionsSteps, eocTimeDimensionsInterval,
  eocTimeDimensionsIntervalPeriod, eocTimeDimensionsIntervalPeriodSteps, eocTimeDimensionsIntervalPeriodStepsAndSteps,
  baseWMSOffering, baseWMSGetMapParams, baseWMTSOffering, baseWMTSGetTileParams, baseWFSOffering, baseKMLOffering, eocGeojsonOffering, eocGeojsonLayer, eocXyzLayer,
  eocXyzOffering, eocVectortileLayer, eocVectortileOffering, eocTMSOffering, folderMixedContext, eocWMTSOffering
} from '@dlr-eoc/shared-assets';
import { Fill, Stroke, Style } from 'ol/style.js';
import { LayersService, RasterLayer, LayerGroup, TmsLayertype, Layer, WmsLayertype, WfsLayertype, WmtsLayertype, KmlLayertype, XyzLayertype, ILayerIntervalAndPeriod, WmsLayer, WmtsLayer, Filtertypes, IWmtsParams } from '@dlr-eoc/services-layers';
import { VectorLayer, GeojsonLayertype } from '@dlr-eoc/services-layers';
import { Feature, Polygon, FeatureCollection } from 'geojson';
import { IOwsOffering, IOwsResource, kmlOffering, wfsOffering, wmsOffering, wmtsOffering, IOwsOperation } from './types/owc-json';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { EocLitemap } from '@dlr-eoc/base-layers-raster';
import { GetFeatureOperationCode, GetMapOperationCode, GetTileOperationCode, RESTOperationCode } from './types/owc-json.utils';
import { GeoJsonOffering, IEocOwsOffering, IEocOwsResource, tmsOffering, xyzOffering } from './types/eoc-owc-json';

import { DateTime } from 'luxon';
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

describe('OwcJsonService utils', () => {

  it('it should create a shards array from a string', () => {
    const shards = 'a-d';
    const test = shardsExpand(shards);
    expect(test).toEqual(['a', 'b', 'c', 'd']);
  });
});


describe('OwcJsonService: reading basic data from owc', () => {
  let service: OwcJsonService;
  const allTestContexts = [barebonesContext, basicOgcOwsContext, eocOwsContext, eocProjContext, zoomedContext];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(withXhr(), withInterceptorsFromDi()), provideHttpClientTesting()]
    });

    service = TestBed.inject(OwcJsonService);
  });



  it('should check if the json is a ows context', () => {
    allTestContexts.forEach(c => {
      expect(service.checkContext(c)).toBeTruthy();
    });
  });

  it('should get the ows context title', () => {
    allTestContexts.forEach(c => {
      expect(service.getContextTitle(c)).toBe(c.properties.title);
    });
  });

  it('should get the ows context Publisher', () => {
    allTestContexts.forEach(c => {
      expect(service.getContextPublisher(c)).toBe(c.properties?.publisher || null);
    });
  });

  it('should get the ows context Extent', () => {
    allTestContexts.forEach(c => {
      expect(service.getContextExtent(c)).toBe(c?.bbox || null);
    });
  });

  it('should get the ows context Resources', () => {
    allTestContexts.forEach(c => {
      expect(service.getResources(c).length).toBe(c.features.length);
    });
  });

  it('should get the ows context Resource Title', () => {
    allTestContexts.forEach(c => {
      const resources = service.getResources(c);

      resources.forEach(r => {
        expect(service.getResourceTitle(r)).toBe(r.properties.title);
      });
    });
  });



});

describe('OwcJsonService: reading basic data from owc Resource', () => {
  let service: OwcJsonService;
  let allResources: (IOwsResource | IEocOwsResource)[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(withXhr(), withInterceptorsFromDi()), provideHttpClientTesting()]
    });

    service = TestBed.inject(OwcJsonService);


    allResources = service.getResources(basicOgcOwsContext);
  });


  it('should get the ows context Resource Title', () => {
    allResources.forEach(r => {
      expect(service.getResourceTitle(r)).toBe(r.properties.title);
    });
  });

  it('should get the ows context Resource Folder for Layer Grouping', () => {
    allResources.forEach(r => {
      expect(service.getResourceFolder(r)).toBe(r.properties.folder);
    });
  });

  it('should get FilterType from Folder for Layer Grouping Solt', () => {
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
    allResources.forEach(r => {

      const groupName = service['getLayerGroupFromFolder'](r);
      if (groupName) {
        const filterType = service.getFilterType(r);
        if (filterType && r.properties.folder) {
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
    allResources.forEach(r => {
      expect(service.getResourceUpdated(r)).toBe(r.properties.updated);
    });
  });

  it('should get the ows context Resource Date', () => {
    allResources.forEach(r => {
      const rDate = service.getResourceDate(r);
      if (rDate) {
        expect(DateTime.fromISO(rDate).isValid).toBeTruthy();
      }
    });
  });

  it('should get the ows context Resource Active', () => {
    allResources.forEach(r => {
      if (r.properties.active) {
        expect(service.isActive(r)).toBe(r.properties.active);
      } else {
        // set default to true
        expect(service.isActive(r)).toBeTruthy();
      }
    });
  });

  it('should get the ows context Resource Description', () => {
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
    allResources.forEach(r => {
      const offerings = service.getResourceOfferings(r);
      expect(offerings?.length).toBe(r.properties.offerings?.length);
    });
  });
});


describe('OwcJsonService: reading data from IEocOwsResource', () => {
  let service: OwcJsonService;
  let allResources: IEocOwsResource[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(withXhr(), withInterceptorsFromDi()), provideHttpClientTesting()]
    });

    service = TestBed.inject(OwcJsonService);

    allResources = service.getResources(eocOwsContext);
  });

  it('should get the Resource Opacity', () => {
    allResources.forEach(r => {
      if (r.properties.opacity) {
        expect(service.getResourceOpacity(r)).toBe(r.properties.opacity);
      } else {
        expect(service.getResourceOpacity(r)).toBe(1);
      }
    });
  });

  it('should get the Resource Attribution or Rights', () => {
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
    allResources.forEach(r => {
      expect(service.getResourceShards(r)).toBe(r.properties.shards);
    });
  });

  it('should get the Resource Dimensions', () => {
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
    const dimensionsSteps = service.getTimeValueFromDimensions(eocTimeDimensionsSteps.values);
    const stepArray = eocTimeDimensionsSteps.values.split(',');
    expect(Array.isArray(dimensionsSteps)).toBeTruthy();
    if (Array.isArray(dimensionsSteps)) {
      expect(typeof dimensionsSteps[0]).toEqual('string');
      expect((dimensionsSteps as string[]).length).toBe(stepArray.length);
      expect(dimensionsSteps).toEqual(stepArray);
    }
  });

  it('it should get Interval from Dimensions values and period from display', () => {
    const dimensionsInterval = service.getTimeValueFromDimensions(eocTimeDimensionsInterval.values, eocTimeDimensionsInterval?.display?.period);
    expect(typeof dimensionsInterval).toBe('object');
    expect((dimensionsInterval as ILayerIntervalAndPeriod).interval).toBe(eocTimeDimensionsInterval.values);
    expect((dimensionsInterval as ILayerIntervalAndPeriod).periodicity).toBe(eocTimeDimensionsInterval.display?.period);
  });


  it('it should get Interval and Period from Dimensions values', () => {
    const dimensionsIntervalPeriod = service.getTimeValueFromDimensions(eocTimeDimensionsIntervalPeriod.values);
    const intervalPeriodArray = eocTimeDimensionsIntervalPeriod.values.split('/');
    expect(typeof dimensionsIntervalPeriod).toBe('object');
    expect((dimensionsIntervalPeriod as ILayerIntervalAndPeriod).interval).toBe(`${intervalPeriodArray[0]}/${intervalPeriodArray[1]}`);
    expect((dimensionsIntervalPeriod as ILayerIntervalAndPeriod).periodicity).toBe(intervalPeriodArray[2]);
  });

  it('it should get multiple Interval and Period from Dimensions values', () => {
    const dimensionsIntervalPeriodSteps = service.getTimeValueFromDimensions(eocTimeDimensionsIntervalPeriodSteps.values);
    const periodStepsArray = eocTimeDimensionsIntervalPeriodSteps.values.split(',');
    expect(Array.isArray(dimensionsIntervalPeriodSteps)).toBeTruthy();

    const dimensionsIntervalPeriodStepsArray = dimensionsIntervalPeriodSteps as ILayerIntervalAndPeriod[];
    expect(dimensionsIntervalPeriodStepsArray.length).toBe(periodStepsArray.length);
    expect(typeof dimensionsIntervalPeriodStepsArray[0]).toBe('object');
    const dimensionsIntervalPeriodItem = dimensionsIntervalPeriodStepsArray[0];
    const intervalPeriodArray0 = periodStepsArray[0].split('/');

    expect(dimensionsIntervalPeriodItem.interval).toBe(`${intervalPeriodArray0[0]}/${intervalPeriodArray0[1]}`);
    expect(dimensionsIntervalPeriodItem.periodicity).toBe(intervalPeriodArray0[2]);
  });


  it('it should get Interval and Period and single steps from Dimensions values', () => {
    const dimensionsIntervalPeriodStepsAndSteps = service.getTimeValueFromDimensions(eocTimeDimensionsIntervalPeriodStepsAndSteps.values);
    const intervalPeriodStepsArray = eocTimeDimensionsIntervalPeriodStepsAndSteps.values.split(',');
    expect(Array.isArray(dimensionsIntervalPeriodStepsAndSteps)).toBeTruthy();
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
  let service: OwcJsonService;
  let allResources: (IOwsResource | IEocOwsResource)[] = [];
  const allOfferings: IOwsOffering[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(withXhr(), withInterceptorsFromDi()), provideHttpClientTesting()]
    });

    service = TestBed.inject(OwcJsonService);

    allResources = service.getResources(basicOgcOwsContext);
    allResources.forEach(r => {
      const offerings = service.getResourceOfferings(r);
      if (offerings) {
        allOfferings.push(...offerings);
      }
    });
  });


  it('should get the ows Offering Code', () => {
    const layerTypes = [WmsLayertype, WmtsLayertype, WfsLayertype, KmlLayertype];
    allOfferings.forEach(o => {
      expect(layerTypes.includes(service.getLayertypeFromOfferingCode(o))).toBeTruthy();
    });
  });

  it('should check the ows Offering is a ServiceOffering', () => {
    expect(service.checkIfServiceOffering(baseKMLOffering)).toBe(false);
    expect(service.checkIfServiceOffering(baseWFSOffering)).toBe(true);
  });

  it('should check the ows Offering is a DataOffering', () => {
    expect(service.checkIfDataOffering(baseKMLOffering)).toBe(true);
    expect(service.checkIfDataOffering(baseWFSOffering)).toBe(false);
  });

  it('should get LegendUrl from the ows Offering', () => {
    allOfferings.forEach(o => {
      expect(typeof service.getLegendUrl(o)).toBe('string');
    });

  });
});


describe('OwcJsonService: reading data from IEocOwsOffering', () => {
  let service: OwcJsonService;
  let allResources: IEocOwsResource[] = [];
  const allOfferings: IEocOwsOffering[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(withXhr(), withInterceptorsFromDi()), provideHttpClientTesting()]
    });

    service = TestBed.inject(OwcJsonService);

    allResources = service.getResources(basicOgcOwsContext);
    allResources.forEach(r => {
      const offerings = service.getResourceOfferings(r);
      if (offerings) {
        allOfferings.push(...offerings);
      }
    });
  });

  it('should get the ows Offering Code', () => {
    const layerTypes = [WmsLayertype, WmtsLayertype, WfsLayertype, KmlLayertype, GeojsonLayertype, XyzLayertype, TmsLayertype];
    allOfferings.forEach(o => {
      expect(layerTypes.includes(service.getLayertypeFromOfferingCode(o))).toBeTruthy();
    });
  });

  it('should get the ows Offering matrixSets - private function', async () => {
    const matrixSet0 = eocWMTSOffering.matrixSets?.[0];
    if (matrixSet0) {
      const ms = await firstValueFrom(service['getMatrixSetForWMTS'](eocWMTSOffering, matrixSet0.srs));
      expect(ms).toEqual(matrixSet0);
    }
  });
});


describe('OwcJsonService: reading layer data from owc', () => {
  let service: OwcJsonService;
  const targetProjection = 'EPSG:4326';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(withXhr(), withInterceptorsFromDi()), provideHttpClientTesting()]
    });

    service = TestBed.inject(OwcJsonService);
  });

  it('should get all layers fom the base OWS context', () => {
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
      const contextFeaturesIds: string[] = [];
      folderMixedContext.features.forEach((f: any) => {
        if (f.properties?.folder) {
          /** private function getLayerGroupFromFolder */
          const groupName = service['getLayerGroupFromFolder'](f);
          const groupResources = folderMixedContext.features.filter((r: any) => service['getLayerGroupFromFolder'](r) === groupName);
          groupResources.forEach((r: any) => {
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

  it('should create layer from wms Offering', async () => {
    const wmsResource = baseWMSLayer;
    const layer = await firstValueFrom(service.createLayerFromDefaultOffering(wmsResource, barebonesContext, targetProjection));
    expect(layer instanceof WmsLayer).toBeTruthy();
  });

  it('should create layer from wfs Offering', async () => {
    const wfsResource = baseWFSLayer;
    const layer = await firstValueFrom(service.createLayerFromDefaultOffering(wfsResource, barebonesContext, targetProjection));
    expect(layer instanceof VectorLayer).toBeTruthy();
  });

  it('should create layer from wmts Offering', async () => {
    const wmtsResource = baseWMTSLayer;
    const layer = await firstValueFrom(service.createLayerFromDefaultOffering(wmtsResource, barebonesContext, targetProjection));
    expect(layer instanceof WmtsLayer).toBeTruthy();
  });

  it('should create layer from kml Offering', async () => {
    const kmlResource = baseKMLLayer;
    const layer = await firstValueFrom(service.createLayerFromDefaultOffering(kmlResource, barebonesContext, targetProjection));
    expect(layer instanceof VectorLayer).toBeTruthy();
  });


  // this is also testing service.createLayerGroup()
  it('should create LayerGroups for Resources with properties.folder', async () => {
    const layersObs = service.getLayers(basicOgcOwsContext, targetProjection);
    const owsContextLayers = await firstValueFrom(layersObs);
    expect(owsContextLayers.length).greaterThan(0);

    const layerGroupNames = service.getGroupResources(basicOgcOwsContext)
      .map(f => service['getLayerGroupFromFolder'](f)) // get Names
      .filter((item, index, array) => array.indexOf(item) === index); // Remove Duplicates

    const findLayerGroups = owsContextLayers.filter(l => layerGroupNames.includes(l.name));

    findLayerGroups.forEach(lg => {
      expect(lg instanceof LayerGroup).toBeTruthy();
    });
    expect(findLayerGroups.length).toBe(layerGroupNames.length);
  });


  it('should create Layers for non Group Resources', async () => {
    const layer = await firstValueFrom(service.createLayerFromDefaultOffering(eocTMSLayer, eocOwsContext, targetProjection));
    expect(layer instanceof Layer).toBeTruthy();
  });


  // this is also testing service.createWmsLayerFromOffering()
  it('should create a WMS Layer', async () => {
    const layer = await firstValueFrom(service.createLayerFromOffering(baseWMSOffering, baseWMSLayer, basicOgcOwsContext, targetProjection));
    expect(layer instanceof WmsLayer).toBeTruthy();

    baseWMSGetMapParams.forEach((v, k) => {
      // this should use uppercase keys!!!
      if (layer instanceof WmsLayer && layer.params[k]) {
        expect(layer.params[k]).toBe(v);
      }
    });
  });

  // this is also testing service.createWmtsLayerFromOffering() and service.getWmtsOptions()
  it('should create a WMTS Layer', async () => {
    const layer = await firstValueFrom(service.createLayerFromOffering(baseWMTSOffering, baseWMTSLayer, basicOgcOwsContext, targetProjection));
    expect(layer instanceof WmtsLayer).toBeTruthy();

    baseWMTSGetTileParams.forEach((v, k) => {
      // for WMTS LowerCase was used!!!
      const key = k.toLocaleLowerCase() as keyof IWmtsParams;
      if (layer instanceof WmtsLayer && layer.params[key]) {
        expect(layer.params[key]).toBe(v);
      }
    });
  });


  it('should create a WFS Layer', async () => {
    const layer = await firstValueFrom(service.createLayerFromOffering(baseWFSOffering, baseWFSLayer, basicOgcOwsContext, targetProjection));
    expect(layer instanceof VectorLayer).toBeTruthy();

    // Make all Params UpperCase like
    const href = baseWFSOffering.operations?.find(o => o.code === GetFeatureOperationCode)?.href;
    if (href) {
      const { searchParams } = service['getJsonFromUri'](href);
      if (layer instanceof VectorLayer) {
        expect(layer.url?.split('?')[1]).toBe(searchParams.toString());
      }
    }
  });


  it('should create a KML Layer - link Offering', async () => {
    const layer = await firstValueFrom(service.createLayerFromOffering(baseKMLOffering, baseKMLLayer, basicOgcOwsContext, targetProjection));
    expect(layer instanceof VectorLayer).toBeTruthy();
    const href = baseKMLOffering.contents?.[0].href
    if (layer instanceof VectorLayer && href) {
      expect(typeof layer.url).toBe('string');
      expect(layer.url).toBe(href);
    }
  });

  /** ------------------ IEocOwsContext Layers ----------------------------------- */

  it('should create a Geojson Layer - inline Offering', async () => {
    const layer = await firstValueFrom(service.createLayerFromOffering(eocGeojsonOffering, eocGeojsonLayer, eocOwsContext, targetProjection));
    expect(layer instanceof VectorLayer).toBeTruthy();
    const eocGeojsonOffering0 = eocGeojsonOffering?.contents?.[0];
    if (layer instanceof VectorLayer && eocGeojsonOffering0 && eocGeojsonOffering0.content) {
      expect(layer.data).toBeTruthy();
      expect(layer.data).toEqual(JSON.parse(eocGeojsonOffering0.content));
    }
  });

  it('should create a Xyz Layer', async () => {
    const layer = await firstValueFrom(service.createLayerFromOffering(eocXyzOffering, eocXyzLayer, eocOwsContext, targetProjection));
    expect(layer instanceof RasterLayer).toBeTruthy();
    const href = eocXyzOffering.operations?.[0].href;
    const shards = eocXyzLayer.properties.shards;
    if (layer instanceof RasterLayer && href && shards) {
      expect(layer.url).toBe(href);
      const subdomains = shardsExpand(shards);
      expect(layer.subdomains).toEqual(subdomains);
    }
  });

  it('should create a Vectortile Layer', async () => {
    const layer = await firstValueFrom(service.createLayerFromOffering(eocVectortileOffering, eocVectortileLayer, eocOwsContext, targetProjection));
    expect(layer instanceof VectorLayer).toBeTruthy();
    const href = eocVectortileOffering.operations?.[0].href
    if (layer instanceof VectorLayer && href) {
      expect(typeof layer.url).toBe('string');
      expect(layer.url).toBe(href);
    }
  });

  it('should create a Raster TMS Layer', async () => {
    const layer = await firstValueFrom(service.createLayerFromOffering(eocTMSOffering, eocTMSLayer, eocOwsContext, targetProjection));
    expect(layer instanceof RasterLayer).toBeTruthy();
    const href = eocTMSOffering.operations?.[0].href
    if (layer instanceof RasterLayer && href) {
      expect(typeof layer.url).toBe('string');
      expect(layer.url).toBe(href);
    }
  });

  it('getLayers should not stop working even if an unknown offering-code has been given', async () => {
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
    const layer = await firstValueFrom(service.createLayerFromOffering(testOffering, testResource, barebonesContext, targetProjection));
    expect(layer).toBe(null);
  });

});


/** ------------------------------------------------------------------------------------------------------------------------- */

describe('OwcJsonService: writing data into owc', () => {
  let service: OwcJsonService;
  const targetProjection = 'EPSG:4326';
  let ukisWmsLayer: WmsLayer;
  let ukisWMTSLayer: WmtsLayer;
  let ukisWFSLayer: VectorLayer;
  let ukisDataLayer: VectorLayer;
  let ukisTMSRasterLayer: RasterLayer;
  let ukisTMSVectorLayer: VectorLayer;
  let ukisXyzLayer: RasterLayer;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(withXhr(), withInterceptorsFromDi()), provideHttpClientTesting()]
    });

    service = TestBed.inject(OwcJsonService);

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
        styleSource: 'planet_eoc',
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


  });


  it('should generate a Resource from a layer', () => {
    const resource = service.generateResourceFromLayer(ukisWmsLayer);
    expect(resource.id).toBe(ukisWmsLayer.id);
    expect(resource.bbox).toEqual(ukisWmsLayer.bbox);
    expect(resource.properties.active).toBe(ukisWmsLayer.visible);
    expect(resource.properties.rights).toBe(ukisWmsLayer.attribution);
    expect(resource.properties.abstract).toBe(ukisWmsLayer.description as string);
    expect(resource.properties.maxZoom).toBe(ukisWmsLayer.maxZoom);
    expect(resource.properties.minZoom).toBe(ukisWmsLayer.minZoom);
    expect(resource.properties.opacity).toBe(ukisWmsLayer.opacity);
    expect(resource.properties.title).toBe(ukisWmsLayer.name);
    expect(resource.properties.offerings?.length).toBe(1);
  });

  /** Offerings Types ----------------------------------  */
  it('should generate WMS Offerings from a layer', () => {
    const offering = service.generateOfferingFromLayer(ukisWmsLayer);
    expect(offering.code).toBe(wmsOffering);
    expect(offering.operations?.length).toBeTruthy();
    const operations = offering.operations as IOwsOperation[];
    expect(operations.find(o => o.code === GetMapOperationCode)?.code).toBe(GetMapOperationCode);
  });

  it('should generate WMTS Offerings from a layer', () => {
    const offering = service.generateOfferingFromLayer(ukisWMTSLayer);
    expect(offering.code).toBe(wmtsOffering);
    expect(offering.operations?.length).toBeTruthy();
    const operations = offering.operations as IOwsOperation[];
    expect(operations.find(o => o.code === GetTileOperationCode)?.code).toBe(GetTileOperationCode);
  });

  it('should generate WFS Offerings from a layer', () => {
    const offering = service.generateOfferingFromLayer(ukisWFSLayer);
    expect(offering.code).toBe(wfsOffering);
    expect(offering.operations?.length).toBeTruthy();
    const operations = offering.operations as IOwsOperation[];
    expect(operations.find(o => o.code === GetFeatureOperationCode)?.href).toBeTruthy();
  });

  it('should generate Data (GeoJson) Offering from a layer', () => {
    const offering = service.generateOfferingFromLayer(ukisDataLayer);
    expect(offering.code).toBe(GeoJsonOffering || kmlOffering);
    expect(offering.contents?.length).toBeTruthy();
    const contents = offering.contents;
    if (contents) {
      expect(contents.find(c => c.type === 'application/geo+json')?.['content']).toBeTruthy();
    }
  });

  it('should generate TMS Raster Offerings from a layer', () => {
    const offering = service.generateOfferingFromLayer(ukisTMSRasterLayer);
    expect(offering.code).toBe(tmsOffering);
    expect(offering.operations?.length).toBeTruthy();
    const operations = offering.operations as IOwsOperation[];
    expect(operations.find(o => o.code === RESTOperationCode)?.href).toBe(ukisTMSRasterLayer.url);
  });

  it('should generate TMS Vector Offerings from a layer', () => {
    const offering = service.generateOfferingFromLayer(ukisTMSVectorLayer);
    expect(offering.code).toBe(tmsOffering);
    expect(offering.operations?.length).toBeTruthy();
    const operations = offering.operations as IOwsOperation[];
    expect(operations.find(o => o.code === RESTOperationCode)?.href).toBe(ukisTMSVectorLayer.url);
    // TODO: get Style for VectorTileLayer
    // expect(offering.styles.find(s => s.content && s.content.type === 'OpenMapStyle')).toBe(ukisTMSVectorLayer.url);
  });

  it('should generate XYZ Offerings from a layer', () => {
    const offering = service.generateOfferingFromLayer(ukisXyzLayer);
    expect(offering.code).toBe(xyzOffering);
    expect(offering.operations?.length).toBeTruthy();
    const operations = offering.operations as IOwsOperation[];
    expect(operations.find(o => o.code === RESTOperationCode)?.href).toBe(ukisXyzLayer.url);
  });


  /** Resource  Types ----------------------------------  */
  it('should generate a Resource from a YXZ layer', () => {
    const resource = service.generateResourceFromLayer(ukisXyzLayer);
    const shards = resource.properties.shards as string;
    const subdomains = shardsExpand(shards);
    expect(subdomains).toEqual(ukisXyzLayer.subdomains);
  });


  /** general ------------------------------------------  */
  it('should properly restore a selection of layers from owc format created with #generateOwsContextFrom', async () => {
    const layersService: LayersService = TestBed.inject(LayersService);
    const osmLayer = new EocLitemap({
      visible: true,
      legendImg: undefined
    });
    layersService.addLayer(osmLayer, 'Baselayers');
    const baselayers = await firstValueFrom(layersService.getBaseLayers());
    const owc = service.generateOwsContextFrom('someid', baselayers, [-190, -90, 190, 90]);

    const layers = await firstValueFrom(service.getLayers(owc, targetProjection));
    expect(layers.length).toBe(baselayers.length);
    expect(layers?.find(l => l.id === osmLayer.id)?.id).toBe(osmLayer.id);
  });

  it('#generateOwcContextFrom should properly store and restore a geojson-layer', async () => {
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

    const recoveredLayers = await firstValueFrom(service.getLayers(context, targetProjection));
    const recoveredLayer = recoveredLayers[0] as VectorLayer;
    // testing
    expect(recoveredLayer.id).toEqual(geojsonLayer.id);
    expect(recoveredLayer.data).toEqual(geojsonLayer.data);
    // expect(recoveredLayer.options).toEqual(geojsonLayer.options); // we dont encode style.

  });

  it('#generateOwcContextFrom should work with all layers in test-contexts', async () => {
    const allTestContexts = [barebonesContext, basicOgcOwsContext, eocOwsContext];

    for (const context of allTestContexts) {
      const layers = await firstValueFrom(service.getLayers(context, 'EPSG:4326'));
      const regeneratedContext = service.generateOwsContextFrom(context.id.toString(), layers);
      expect(regeneratedContext.features.length).toBe(context.features.length);
    }
  });


  it('should regenerated layers in same order', async () => {
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
      const createdLayers = await firstValueFrom(service.getLayers(context, 'EPSG:4326'));

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

    }
  });

  it('#generateOwcContextFrom should honor (nested) layer-groups', () => {
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
