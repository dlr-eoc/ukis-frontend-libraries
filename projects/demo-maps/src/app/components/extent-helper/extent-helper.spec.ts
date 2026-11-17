import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExtentHelper } from './extent-helper';
import { MapStateService } from '@dlr-eoc/services-map-state';

describe('ExtentHelper', () => {
  let component: ExtentHelper;
  let fixture: ComponentFixture<ExtentHelper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtentHelper],
      providers: [{ provide: MapStateService, useClass: MapStateService }]
    }).compileComponents();

    fixture = TestBed.createComponent(ExtentHelper);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('mapStateSvc', new MapStateService());
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
