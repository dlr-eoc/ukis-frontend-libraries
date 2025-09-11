import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalAlertComponent } from './global-alert.component';

describe('GlobalAlertComponent', () => {
  let component: GlobalAlertComponent;
  let fixture: ComponentFixture<GlobalAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
