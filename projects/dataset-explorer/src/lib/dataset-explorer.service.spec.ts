import { TestBed } from '@angular/core/testing';

import { DatasetExplorerService } from './dataset-explorer.service';

describe('DatasetExplorerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatasetExplorerService = TestBed.get(DatasetExplorerService);
    expect(service).toBeTruthy();
  });
});
