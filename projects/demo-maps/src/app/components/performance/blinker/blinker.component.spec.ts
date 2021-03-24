import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BlinkerComponent } from './blinker.component';

describe('BlinkerComponent', () => {
  let component: BlinkerComponent;
  let fixture: ComponentFixture<BlinkerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BlinkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlinkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
