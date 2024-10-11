import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IProgress } from './progress.service';
import { NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'ukis-global-progress',
  templateUrl: './global-progress.component.html',
  styleUrls: ['./global-progress.component.scss'],
  standalone: true,
  imports: [NgIf, NgClass]
})
export class GlobalProgressComponent implements OnInit {
  @Input() progress!: null | IProgress;
  @Output() progressChange = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
