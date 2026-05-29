import { Component, OnInit, Input } from '@angular/core';

import { ClarityIcons} from '@clr/angular/icon';
import { ukisIcon, dlrIcon } from '../icons/ukis';
import { ClrNavigationModule, ClrIcon, ClrStandaloneCdkTrapFocus } from '@clr/angular';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
ClarityIcons.addIcons(ukisIcon, dlrIcon);

@Component({
    selector: 'ukis-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [ClrNavigationModule, NgClass, ClrIcon, RouterLink, RouterLinkActive, ClrStandaloneCdkTrapFocus]
})
export class HeaderComponent implements OnInit {
  @Input('ukis-title') title: string = '';
  @Input('ukis-short-title') shortTitle: string = '';
  @Input('ukis-version') version: string = '';
  constructor() { }

  ngOnInit() {
  }

}
