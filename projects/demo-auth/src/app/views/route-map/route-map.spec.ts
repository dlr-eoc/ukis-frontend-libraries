import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouteMap } from './route-map';
import { MockResizeObserver } from '@dlr-eoc/shared-assets/testing';
import { vi } from 'vitest';
import { provideAnimations } from '@angular/platform-browser/animations';
vi.stubGlobal('ResizeObserver', MockResizeObserver);

describe('RouteMap', () => {
  let component: RouteMap;
  let fixture: ComponentFixture<RouteMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteMap],
      providers: [provideAnimations()] //TODO: why do we need to provide this here??
    }).compileComponents();

    fixture = TestBed.createComponent(RouteMap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
