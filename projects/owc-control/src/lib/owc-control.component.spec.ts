import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwcControlComponent } from './owc-control.component';

describe('OwcControlComponent', () => {
  let component: OwcControlComponent;
  let fixture: ComponentFixture<OwcControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwcControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwcControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
