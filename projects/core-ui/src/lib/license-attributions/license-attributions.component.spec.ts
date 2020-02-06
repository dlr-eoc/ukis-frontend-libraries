import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseAttributionsComponent } from './license-attributions.component';

describe('LicenseAttributionsComponent', () => {
  let component: LicenseAttributionsComponent;
  let fixture: ComponentFixture<LicenseAttributionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseAttributionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseAttributionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
