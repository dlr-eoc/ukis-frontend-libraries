import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBboxFieldComponent } from './form-bbox-field.component';

describe('FormBboxFieldComponent', () => {
  let component: FormBboxFieldComponent;
  let fixture: ComponentFixture<FormBboxFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBboxFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBboxFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
