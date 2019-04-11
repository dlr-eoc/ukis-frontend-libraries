import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStringFieldComponent } from './form-string-field.component';

describe('FormStringFieldComponent', () => {
  let component: FormStringFieldComponent;
  let fixture: ComponentFixture<FormStringFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormStringFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormStringFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
