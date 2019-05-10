import { Component } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { ProgressService, IProgress } from './components/global-progress/progress.service';

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

  routes: Routes;
  constructor(public router: Router,
    private progressService: ProgressService) {
    this.routes = this.router.config.filter(r => r.data);

    this.progressService.progress$.subscribe((ev) => {
      this.showProgress(ev);
    });
  }

  showProgress = (progress: IProgress) => {
    this.ui.progress = progress;
  }
}
