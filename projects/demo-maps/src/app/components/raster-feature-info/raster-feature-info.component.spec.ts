import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RasterFeatureInfoComponent } from './raster-feature-info.component';

describe('RasterFeatureInfoComponent', () => {
  let component: RasterFeatureInfoComponent;
  let fixture: ComponentFixture<RasterFeatureInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RasterFeatureInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RasterFeatureInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
