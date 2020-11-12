import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadDataButtonComponent } from './load-data-button.component';

describe('LoadDataButtonComponent', () => {
  let component: LoadDataButtonComponent;
  let fixture: ComponentFixture<LoadDataButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadDataButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadDataButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
