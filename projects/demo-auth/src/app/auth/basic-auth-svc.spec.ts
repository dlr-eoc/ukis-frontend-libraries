import { TestBed } from '@angular/core/testing';
import { BasicAuthSvc } from './basic-auth-svc';

describe('BasicAuthSvc', () => {
  let service: BasicAuthSvc;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicAuthSvc);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
