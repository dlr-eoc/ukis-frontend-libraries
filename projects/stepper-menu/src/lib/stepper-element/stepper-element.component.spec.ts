import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperElementComponent } from './stepper-element.component';

describe('StepperElementComponent', () => {
  let component: StepperElementComponent;
  let fixture: ComponentFixture<StepperElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepperElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
