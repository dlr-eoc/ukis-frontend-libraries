import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MousePositionComponent } from './mouse-position.component';
import { FormsModule } from '@angular/forms';
import { MapOlService } from '@dlr-eoc/map-ol';
import { ClarityModule } from '@clr/angular';

describe('MousePositionComponent', () => {
  let component: MousePositionComponent;
  let fixture: ComponentFixture<MousePositionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MousePositionComponent],
      imports: [FormsModule, ClarityModule],
      providers: [MapOlService]
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
