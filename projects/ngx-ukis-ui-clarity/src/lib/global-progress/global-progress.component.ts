import { Component, Input, EventEmitter, Output } from '@angular/core';
import { IProgress } from './progress.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ngx-ukis-global-progress',
  imports: [NgClass],
  templateUrl: './global-progress.component.html',
  styleUrl: './global-progress.component.scss'
})
export class GlobalProgressComponent {
  @Input() progress!: null | IProgress;
  @Output() progressChange = new EventEmitter();

}