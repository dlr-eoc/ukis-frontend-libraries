import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RasterFeatureInfo } from './raster-feature-info';

describe('RasterFeatureInfo', () => {
  let component: RasterFeatureInfo;
  let fixture: ComponentFixture<RasterFeatureInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RasterFeatureInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(RasterFeatureInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
