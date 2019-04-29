import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UkisComponent } from './app.component';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        UkisComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(UkisComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'ukis'`, async(() => {
    const fixture = TestBed.createComponent(UkisComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('ukis');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(UkisComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to ukis-frontend!');
  }));
});
