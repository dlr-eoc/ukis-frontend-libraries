import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FpserComponent } from './fpser.component';
import { repeatPromise, timeOneCycle, mean, meanFps } from './helpers';



describe('Fpser Helpers', () => {

  it('timeOneCycle', (done) => {

    timeOneCycle().then(t => {
      expect(t).toBeTruthy();
      done();
    });

  });

  it('Repeating promise', (done) => {

    repeatPromise<number>(timeOneCycle(), 10, []).then((results: number[]) => {
      expect(results).toBeTruthy();
      expect(results.length).toEqual(10);
      done();
    });

  });

  it('Mean FPS', (done) => {

    meanFps(30).then(m => {
      expect(m).toBeTruthy();
      expect(m > 0).toBeTruthy();
      done();
    });

  })
});

