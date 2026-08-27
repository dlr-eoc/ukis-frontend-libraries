import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { App } from './app';

describe('App Component', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [
        RouterTestingModule,
        App
    ],
}).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'demo-maps'`, () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('demo-maps');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('demo-maps app is running!');
  });
});
