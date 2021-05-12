import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ExampleViewComponent } from './example-view.component';

describe('ExampleViewComponent', () => {
  let component: ExampleViewComponent;
  let fixture: ComponentFixture<ExampleViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
