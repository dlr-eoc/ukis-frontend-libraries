import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { ClrNavigationModule, ClrVerticalNavModule, } from '@clr/angular';

import { ClarityIcons, linkIcon } from '@clr/angular/icon';
import { ClrIcon } from '@clr/angular';

ClarityIcons.addIcons(linkIcon);

@Component({
    selector: 'app-example-view',
    templateUrl: './example-view.component.html',
    imports: [ClrNavigationModule, ClrVerticalNavModule, ClrIcon],
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
