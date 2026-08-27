import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { IProgress } from './progress.service';
import { NgClass } from '@angular/common';

@Component({
    selector: 'ukis-global-progress',
    templateUrl: './global-progress.component.html',
    styleUrls: ['./global-progress.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [NgClass]
})
export class GlobalProgressComponent implements OnInit {
  @Input() progress!: null | IProgress;
  @Output() progressChange = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
