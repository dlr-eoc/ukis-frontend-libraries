import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleGroupAction } from './example-group-action';

describe('ExampleGroupAction', () => {
  let component: ExampleGroupAction;
  let fixture: ComponentFixture<ExampleGroupAction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleGroupAction],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleGroupAction);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
