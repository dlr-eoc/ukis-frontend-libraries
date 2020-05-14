import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchbuttonComponent } from './fetchbutton.component';

describe('FetchbuttonComponent', () => {
  let component: FetchbuttonComponent;
  let fixture: ComponentFixture<FetchbuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FetchbuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
