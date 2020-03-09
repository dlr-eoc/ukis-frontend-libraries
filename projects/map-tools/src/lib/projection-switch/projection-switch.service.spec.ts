import { TestBed } from '@angular/core/testing';

import { ProjectionSwitchService } from './projection-switch.service';

describe('ProjectionSwitchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectionSwitchService = TestBed.get(ProjectionSwitchService);
    expect(service).toBeTruthy();
  });
});
