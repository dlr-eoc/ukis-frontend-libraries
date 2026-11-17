import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Bookmarks } from './bookmarks';

describe('Bookmarks', () => {
  let component: Bookmarks;
  let fixture: ComponentFixture<Bookmarks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bookmarks],
    }).compileComponents();

    fixture = TestBed.createComponent(Bookmarks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
