import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';




@Component({
  selector: 'app-example-view',
  templateUrl: './example-view.component.html',
  styleUrls: ['./example-view.component.scss']
})
export class ExampleViewComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'content-container';
  constructor() { }
  ngOnInit() {

  }

  ngOnDestroy() {

  }
}
