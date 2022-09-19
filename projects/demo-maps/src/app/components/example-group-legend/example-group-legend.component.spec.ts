import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleGroupLegendComponent } from './example-group-legend.component';

describe('ExampleGroupLegendComponent', () => {
  let component: ExampleGroupLegendComponent;
  let fixture: ComponentFixture<ExampleGroupLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleGroupLegendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExampleGroupLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
