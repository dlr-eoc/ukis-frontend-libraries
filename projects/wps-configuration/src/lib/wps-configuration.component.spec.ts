import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WpsConfigurationComponent } from './wps-configuration.component';

describe('WpsConfigurationComponent', () => {
  let component: WpsConfigurationComponent;
  let fixture: ComponentFixture<WpsConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WpsConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WpsConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
