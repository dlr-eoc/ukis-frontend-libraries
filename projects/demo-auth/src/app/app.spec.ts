import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { vi } from 'vitest';
import { MockLocalStorage } from '@dlr-eoc/shared-assets/testing';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

vi.stubGlobal('localStorage', new MockLocalStorage());

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    fixture.detectChanges(); // needed for ClrMainContainer run ngOnInit() before Angular destroys the fixture
    expect(app).toBeTruthy();
  });
});
