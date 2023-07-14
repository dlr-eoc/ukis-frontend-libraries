import { TestBed } from '@angular/core/testing';

import { MapCesiumService } from './map-cesium.service';
import { Viewer } from '@cesium/widgets';
import { ICesiumControls } from './map-cesium.component';

let mapTarget: { size: number[], container: HTMLDivElement };

const createMapTarget = (size: number[]) => {
  const container = document.createElement('div');
  container.style.border = 'solid 1px #000';
  container.style.width = `${size[0]}px`;
  container.style.height = `${size[1]}px`;
  document.body.appendChild(container);
  return {
    size,
    container
  };
};

describe('MapCesiumService', () => {
  let service: MapCesiumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    mapTarget = createMapTarget([1024, 768]);
    (window as Record<string, any>)['CESIUM_BASE_URL'] = 'assets/cesium/';
    service = TestBed.inject(MapCesiumService);

    const controls: ICesiumControls = {
      infoBox: true,
      selectionIndicator: true
    }
    service.setControls(controls);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a viewer', () => {
    service.createMap(mapTarget.container);
    expect(service.viewer.container).toEqual(mapTarget.container);
    expect(service.viewer instanceof Viewer).toBeTruthy();
  });
});
