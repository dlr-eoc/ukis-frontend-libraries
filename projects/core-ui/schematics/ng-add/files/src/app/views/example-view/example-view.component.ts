import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { ClrNavigationModule, ClrVerticalNavModule, } from '@clr/angular';



@Component({
    selector: 'app-example-view',
    templateUrl: './example-view.component.html',
    imports: [ClrNavigationModule, ClrVerticalNavModule],
    styleUrls: ['./example-view.component.scss']
})
export class ExampleViewComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'content-container';
  constructor() { }
  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    
  }
}
