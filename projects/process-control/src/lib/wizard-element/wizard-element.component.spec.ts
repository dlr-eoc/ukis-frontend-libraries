import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardElementComponent } from './wizard-element.component';

describe('WizardElementComponent', () => {
  let component: WizardElementComponent;
  let fixture: ComponentFixture<WizardElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
