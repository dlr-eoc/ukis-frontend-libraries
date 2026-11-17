import { KeyValuePipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  imports: [KeyValuePipe],
  selector: 'app-popup2',
  styleUrl: './popup2.scss',
  templateUrl: './popup2.html',
})
export class Popup2 {
  data = input.required<any>();
}
