import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperMenuComponent } from './stepper-menu.component';

describe('StepperMenuComponent', () => {
  let component: StepperMenuComponent;
  let fixture: ComponentFixture<StepperMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepperMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
