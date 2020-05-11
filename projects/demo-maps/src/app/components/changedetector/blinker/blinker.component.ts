import { Component, OnInit, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'ukis-blinker',
  templateUrl: './blinker.component.html',
  styleUrls: ['./blinker.component.scss']
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
