import { TestBed } from '@angular/core/testing';
import { Largelayers } from './largelayers';

describe('Largelayers', () => {
  let service: Largelayers;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Largelayers);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
