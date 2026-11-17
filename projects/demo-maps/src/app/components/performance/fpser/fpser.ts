import { ChangeDetectorRef, Component, inject, NgZone, signal } from '@angular/core';
import { ClrConditionalModule, ClrPopoverHostDirective, ClrSignpostModule, ClrStopEscapePropagationDirective } from '@clr/angular';
import { meanFps, round } from './helpers';

@Component({
  imports: [ClrStopEscapePropagationDirective, ClrPopoverHostDirective, ClrSignpostModule, ClrConditionalModule],
  selector: 'app-fpser',
  styleUrl: './fpser.scss',
  templateUrl: './fpser.html',
})
export class Fpser {
  public fps = signal<number>(0);
  private pollingRate = 1000;
  private precission = 2;
  private nrSamples = 10;


  private ngZone = inject(NgZone);
  private cdRef = inject(ChangeDetectorRef);

  constructor(){
    this.cdRef.detach();

    this.ngZone.runOutsideAngular(() => {
      this.updateFps(this.pollingRate);
    });
  }

  private updateFps(every: number) {
    setTimeout(() => {

      meanFps(this.nrSamples).then(fps => {
        this.fps.set(round(fps, this.precission));
        this.cdRef.detectChanges();
        this.updateFps(every);
      });


    }, every);
  }
}
