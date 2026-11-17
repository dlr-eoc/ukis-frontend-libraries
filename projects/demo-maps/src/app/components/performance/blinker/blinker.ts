import { Component, signal, afterRenderEffect } from '@angular/core';
import { ClrConditionalModule, ClrPopoverHostDirective, ClrSignpostModule, ClrStopEscapePropagationDirective } from '@clr/angular';

@Component({
  imports: [ClrStopEscapePropagationDirective, ClrPopoverHostDirective, ClrSignpostModule, ClrConditionalModule],
  selector: 'app-blinker',
  styleUrl: './blinker.scss',
  templateUrl: './blinker.html',
})
export class Blinker {
  public color = signal('white');

  constructor() { 
    // old ngAfterContentChecked()
    afterRenderEffect(() => {
      this.color.set(this.getRandomColor());
    });
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
