import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThreejsExample } from './threejs-example';

describe('ThreejsExample', () => {
  let component: ThreejsExample;
  let fixture: ComponentFixture<ThreejsExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreejsExample],
    }).compileComponents();

    fixture = TestBed.createComponent(ThreejsExample);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
