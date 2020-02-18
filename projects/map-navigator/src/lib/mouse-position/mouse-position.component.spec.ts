import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MousePositionComponent } from './mouse-position.component';
import { FormsModule } from '@angular/forms';
import { MapOlService } from '@dlr-eoc/map-ol';

describe('MousePositionComponent', () => {
  let component: MousePositionComponent;
  let fixture: ComponentFixture<MousePositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MousePositionComponent],
      imports: [FormsModule],
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
