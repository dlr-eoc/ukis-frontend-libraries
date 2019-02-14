import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteLegalNoticeComponent } from './route-legal-notice.component';

describe('RouteLegalNoticeComponent', () => {
  let component: RouteLegalNoticeComponent;
  let fixture: ComponentFixture<RouteLegalNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteLegalNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteLegalNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
