import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapOlEventsExample } from './map-ol-events-example';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('MapOlEventsExample', () => {
  let component: MapOlEventsExample;
  let fixture: ComponentFixture<MapOlEventsExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapOlEventsExample],
      providers: [provideRouter(routes)]
    }).compileComponents();

    fixture = TestBed.createComponent(MapOlEventsExample);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
