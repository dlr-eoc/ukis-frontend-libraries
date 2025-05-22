import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { ClrStopEscapePropagationDirective, ClrPopoverHostDirective, ClrSignpostModule, ClrConditionalModule } from '@clr/angular';


/**
 * This component changes its color any time change-detection runs.
 * We do this by getting a new color on `ngAfterContentChecked`.
 * This hook is called after change detection, but before the view is built,
 * thus allowing us to be notified of change-detection while also
 * avoiding `ExpressionHasChangedAfterItHasBeenChecked` errors.
 */

@Component({
    selector: 'ukis-blinker',
    templateUrl: './blinker.component.html',
    styleUrls: ['./blinker.component.scss'],
    imports: [ClrStopEscapePropagationDirective, ClrPopoverHostDirective, ClrSignpostModule, ClrConditionalModule]
})
export class BlinkerComponent implements AfterContentChecked {

  public color = 'white';

  constructor() { }

  ngAfterContentChecked(): void {
    this.color = this.getRandomColor();
  }

  private getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
