import { Component, OnInit, Input } from '@angular/core';

import { ClarityIcons, timesIcon } from '@cds/core/icon';
import { ukisIcon, dlrIcon } from '../icons/ukis';
import { ClrNavigationModule, ClrIconModule, ClrStandaloneCdkTrapFocus } from '@clr/angular';
import { NgClass } from '@angular/common';
ClarityIcons.addIcons(ukisIcon, dlrIcon, timesIcon);

@Component({
    selector: 'ukis-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [ClrNavigationModule, NgClass, ClrIconModule, ClrStandaloneCdkTrapFocus]
})
export class HeaderComponent implements OnInit {
  @Input('ukis-title') title: string = '';
  @Input('ukis-short-title') shortTitle: string = '';
  @Input('ukis-version') version: string = '';
  constructor() { }

  ngOnInit() {
  }

}
