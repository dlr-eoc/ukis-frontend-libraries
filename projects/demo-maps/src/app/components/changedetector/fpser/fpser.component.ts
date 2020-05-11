import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { round, meanFps } from './helpers';

@Component({
  selector: 'ukis-fpser',
  templateUrl: './fpser.component.html',
  styleUrls: ['./fpser.component.scss']
})
export class FpserComponent {

  public fps: number;
  private pollingRate = 1000;
  private precission = 2;

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

      meanFps(10).then(fps => {
        this.fps = round(fps, this.precission);
        this.cdRef.detectChanges();
        this.updateFps(every);
      });


    }, every);
  }

}
