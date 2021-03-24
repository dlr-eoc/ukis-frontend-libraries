import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExampleLayerActionComponent } from './example-layer-action.component';

describe('ExampleLayerActionComponent', () => {
  let component: ExampleLayerActionComponent;
  let fixture: ComponentFixture<ExampleLayerActionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleLayerActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleLayerActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
