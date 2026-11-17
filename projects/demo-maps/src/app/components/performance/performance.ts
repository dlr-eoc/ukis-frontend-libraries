import { Component } from '@angular/core';
import { Blinker} from './blinker/blinker'
import { Fpser } from './fpser/fpser';

@Component({
  imports: [Blinker, Fpser],
  selector: 'app-performance',
  styleUrl: './performance.scss',
  templateUrl: './performance.html',
})
export class Performance {}
