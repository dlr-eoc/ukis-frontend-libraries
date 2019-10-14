import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MousePositionComponent } from './mouse-position.component';

describe('MousePositionComponent', () => {
  let component: MousePositionComponent;
  let fixture: ComponentFixture<MousePositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MousePositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MousePositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
