import { TestBed } from '@angular/core/testing';

import { OwcJsonService } from './owc-json.service';
import { IOwsContext } from '@ukis/datatypes-owc-json';

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
});
