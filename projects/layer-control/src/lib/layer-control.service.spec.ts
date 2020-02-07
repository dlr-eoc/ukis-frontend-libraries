import { TestBed } from '@angular/core/testing';

import { LayerControlService } from './layer-control.service';

describe('LayerControlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LayerControlService = TestBed.get(LayerControlService);
    expect(service).toBeTruthy();
  });
});
