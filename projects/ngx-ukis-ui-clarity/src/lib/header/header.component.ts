import { Component, Input } from '@angular/core';

import { ClarityIcons, timesIcon } from '@cds/core/icon';
import { ukisIcon, dlrIcon } from '../icons/ukis';
import { ClrNavigationModule, ClrIconModule, ClrStandaloneCdkTrapFocus } from '@clr/angular';
import { NgClass } from '@angular/common';
ClarityIcons.addIcons(ukisIcon, dlrIcon, timesIcon);

@Component({
  selector: 'ngx-ukis-header',
  imports: [ClrNavigationModule, NgClass, ClrIconModule, ClrStandaloneCdkTrapFocus],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input('ukis-title') title: string = '';
  @Input('ukis-short-title') shortTitle: string = '';
  @Input('ukis-version') version: string = '';
}