import { Component, model, computed } from '@angular/core';
import { IProgress } from './global-progress-svc';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ngx-ukis-global-progress',
  imports: [NgClass],
  styleUrl: './global-progress.scss',
  templateUrl: './global-progress.html',
})
export class GlobalProgressComponent {
  progress = model.required<null | IProgress>();

  getProgressClass = computed(() => {
    const progress = this.progress();
    const pclass = progress?.class;
    return (pclass) ? pclass : '';
  })
}
