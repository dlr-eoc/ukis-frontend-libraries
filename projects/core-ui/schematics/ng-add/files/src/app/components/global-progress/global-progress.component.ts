import { Component, OnInit, Input } from '@angular/core';
import { IProgress } from './progress.service';

@Component({
  selector: 'ukis-global-progress',
  templateUrl: './global-progress.component.html',
  styleUrls: ['./global-progress.component.scss']
})
export class GlobalProgressComponent implements OnInit {
  @Input() progress: null | IProgress;
  constructor() { }

  ngOnInit() {
    console.log(this.progress)
  }

}
