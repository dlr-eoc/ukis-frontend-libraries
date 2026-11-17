import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { CookieAlertComponent } from './cookie-alert';
import { UtilStoreService } from '@dlr-eoc/services-util-store';
import { MockLocalStorage } from '@dlr-eoc/shared-assets/testing';
vi.stubGlobal('localStorage', new MockLocalStorage());

describe('CookieAlertComponent', () => {
  let component: CookieAlertComponent;
  let fixture: ComponentFixture<CookieAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookieAlertComponent],
      providers: [UtilStoreService]
    }).compileComponents();

    fixture = TestBed.createComponent(CookieAlertComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
