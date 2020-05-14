import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { round, meanFps } from './helpers';


/**
 * This component estimates the framerate of the browser
 * by timing a call to `setTimeout(() => ..., 0)`.
 * This is done outside angular's zone so as not to trigger the change-detection mechanism.
 * Only after a poll is completed is change detection triggered (manually through cdRef) so that the new
 * fps-value can be displayed.
 */

@Component({
  selector: 'ukis-fpser',
  templateUrl: './fpser.component.html',
  styleUrls: ['./fpser.component.scss']
})
export class FpserComponent {

  public fps: number;
  private pollingRate = 1000;
  private precission = 2;
  private nrSamples = 10;

  constructor(
    private ngZone: NgZone,
    private cdRef: ChangeDetectorRef
  ) {

    cdRef.detach();

    this.ngZone.runOutsideAngular(() => {
      this.updateFps(this.pollingRate);
    });
  }

  private updateFps(every: number) {
    setTimeout(() => {

      meanFps(this.nrSamples).then(fps => {
        this.fps = round(fps, this.precission);
        this.cdRef.detectChanges();
        this.updateFps(every);
      });


    }, every);
  }

}
