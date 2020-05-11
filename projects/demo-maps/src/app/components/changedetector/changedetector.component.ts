import { Component } from '@angular/core';

@Component({
  selector: 'ukis-changedetector',
  templateUrl: './changedetector.component.html',
  styleUrls: ['./changedetector.component.scss'],
})
export class ChangedetectorComponent {

  public display: boolean;

  constructor() {
    this.display = true;
  }

}
