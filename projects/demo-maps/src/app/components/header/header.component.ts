import { Component, OnInit, Input } from '@angular/core';

import { ClarityIcons} from '@cds/core/icon';
import { ukisIcon, dlrIcon } from '../icons/ukis';
import { ClrNavigationModule, ClrIconModule, ClrStandaloneCdkTrapFocus } from '@clr/angular';
import { NgClass, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
ClarityIcons.addIcons(ukisIcon, dlrIcon);

@Component({
    selector: 'ukis-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [ClrNavigationModule, NgClass, ClrIconModule, RouterLink, RouterLinkActive, NgIf, ClrStandaloneCdkTrapFocus]
})
export class HeaderComponent implements OnInit {
  @Input('ukis-title') title: string = '';
  @Input('ukis-short-title') shortTitle: string = '';
  @Input('ukis-version') version: string = '';
  constructor() { }

  ngOnInit() {
  }

}
