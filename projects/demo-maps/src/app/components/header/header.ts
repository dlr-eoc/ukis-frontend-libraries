import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { ClarityIcons, timesIcon } from '@clr/angular/icon';
import { ukisIcon, dlrIcon } from '../icons/ukis';
import { ClrNavigationModule, ClrIcon, ClrStandaloneCdkTrapFocus } from '@clr/angular';
import { NgClass } from '@angular/common';
ClarityIcons.addIcons(ukisIcon, dlrIcon, timesIcon);

@Component({
  imports: [ClrNavigationModule, NgClass, ClrIcon, ClrStandaloneCdkTrapFocus],
  selector: 'ngx-ukis-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class HeaderComponent {
  @Input('ukis-title') title: string = '';
  @Input('ukis-short-title') shortTitle: string = '';
  @Input('ukis-version') version: string = '';
}
