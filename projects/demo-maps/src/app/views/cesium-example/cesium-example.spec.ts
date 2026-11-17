import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CesiumExample } from './cesium-example';

describe('CesiumExample', () => {
  let component: CesiumExample;
  let fixture: ComponentFixture<CesiumExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CesiumExample],
    }).compileComponents();

    fixture = TestBed.createComponent(CesiumExample);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
