import { TestBed, ComponentFixture } from '@angular/core/testing';

import { CookieAlertService } from './cookie-alert.service';
import { CookieAlertComponent } from './cookie-alert.component';

describe('CookieAlertService', () => {
  let component: CookieAlertComponent;
  let fixture: ComponentFixture<CookieAlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CookieAlertComponent]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(CookieAlertComponent);

    // get test component from the fixture
    component = fixture.componentInstance;

  });

  it('should be created', () => {
    const service: CookieAlertService = TestBed.get(CookieAlertService);
    expect(service).toBeTruthy();
  });

  it('should have Input alert-text', () => {
    const alertText = 'test alert text';
    component.text = alertText;
    fixture.detectChanges();
    expect(component.text).toEqual(alertText);
  });

  it('should have Input privacy-link', () => {
    const alertLink = 'http://test.de';
    component.link = alertLink;
    fixture.detectChanges();
    expect(component.link).toEqual(alertLink);
  });
});
