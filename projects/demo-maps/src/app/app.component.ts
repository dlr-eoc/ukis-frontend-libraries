import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ui = {
    floating: true,
    flipped: false,
    footer: false,
    alert: null,
    progress: null
  };
}
