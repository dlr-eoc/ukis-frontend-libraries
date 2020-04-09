import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';




@Component({
  selector: 'app-test-view',
  templateUrl: './test-view.component.html',
  styleUrls: ['./test-view.component.scss']
})
export class TestViewComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'content-container';
  constructor() { }
  ngOnInit() {

  }

  ngOnDestroy() {

  }
}
