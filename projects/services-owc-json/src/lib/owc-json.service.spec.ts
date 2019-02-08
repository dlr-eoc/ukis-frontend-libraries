import { TestBed } from '@angular/core/testing';

import { OwcJsonService } from './owc-json.service';
import { IOwsContext } from '@ukis/datatypes-owc-json';
import { barebonesContext, basicContext } from '../../assets/exampleContext';


let allTestContexts = [barebonesContext, basicContext];


describe('OwcJsonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OwcJsonService = TestBed.get(OwcJsonService);
    expect(service).toBeTruthy();
  });

  it('should check if the json is a ows context', () => {
    const service: OwcJsonService = TestBed.get(OwcJsonService);
    const context: IOwsContext = {
      id: 'test context',
      type: 'FeatureCollection',
      properties: {
        links: {
          profiles: ['http://www.opengis.net/spec/owc-geojson/1.0/req/core'],
        },
        lang: 'de',
        title: 'test context',
        updated: '2018-11-28T00:00:00'
      },
      features: []
    }
    expect(service.checkContext(context)).toBeTruthy();
  });

  it('#layerGroupFromResource should properly create a LayerGroup-configuration', () => {
    for(const context of allTestContexts) {
      const service: OwcJsonService = TestBed.get(OwcJsonService);
      for(const resource of service.getResources(context)){

        const layergroup = service.layerGroupFromResource(resource);

        expect(layergroup.filtertype).toBe("Overlays"); // type is always "overlays" per default - though this might change in the future. 
        expect(layergroup.id).toBe(resource.id as string);
        expect(layergroup.name).toBe(resource.properties.title);
        expect(layergroup.removable).toBe(true); // default
        expect(layergroup.layerRemovable).toBe(false); // default
        expect(layergroup.layers).toEqual([]); // layers initially not set. @TODO: is this deliberate?
      }
    }
  });

  // @TODO: this method seems to be a stub. Shouldn't it return an array of ILayerOptions?
  //it('#getlayersFromResource should properly create an array of ILayerOptions?', () => {});
});
