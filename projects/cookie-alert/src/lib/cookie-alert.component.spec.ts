import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieAlertComponent } from './cookie-alert.component';
import { UtilStoreService } from '@ukis/services-util-store/src/public_api';

describe('CookieAlertComponent', () => {
  let component: CookieAlertComponent;
  let fixture: ComponentFixture<CookieAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookieAlertComponent ],
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
