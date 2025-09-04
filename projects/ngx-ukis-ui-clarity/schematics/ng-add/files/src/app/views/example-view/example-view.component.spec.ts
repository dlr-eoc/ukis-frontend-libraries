import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ExampleViewComponent } from './example-view.component';
import { ClrNavigationModule, ClrVerticalNavModule } from '@clr/angular';

describe('ExampleViewComponent', () => {
  let component: ExampleViewComponent;
  let fixture: ComponentFixture<ExampleViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ClrNavigationModule, ClrVerticalNavModule],
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
