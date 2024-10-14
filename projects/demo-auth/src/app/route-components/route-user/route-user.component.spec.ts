import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RouteUserComponent } from './route-user.component';

describe('RouteUserComponent', () => {
  let component: RouteUserComponent;
  let fixture: ComponentFixture<RouteUserComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [RouteUserComponent]
})
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
