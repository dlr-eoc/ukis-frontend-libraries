import { Component } from '@angular/core';
import { BlinkerComponent } from './blinker/blinker.component';
import { FpserComponent } from './fpser/fpser.component';

@Component({
    selector: 'ukis-performance',
    templateUrl: './performance.component.html',
    styleUrls: ['./performance.component.scss'],
    standalone: true,
    imports: [BlinkerComponent, FpserComponent],
})
export class PerformanceComponent {

  constructor() {}

}
