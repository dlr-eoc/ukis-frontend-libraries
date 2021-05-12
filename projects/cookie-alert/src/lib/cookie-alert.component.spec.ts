import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CookieAlertComponent } from './cookie-alert.component';
import { UtilStoreService } from '@dlr-eoc/services-util-store';

describe('CookieAlertComponent', () => {
  let component: CookieAlertComponent;
  let fixture: ComponentFixture<CookieAlertComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CookieAlertComponent],
      providers: [UtilStoreService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookieAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
