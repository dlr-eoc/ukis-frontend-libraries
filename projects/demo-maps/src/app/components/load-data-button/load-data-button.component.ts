import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-load-data-button',
  templateUrl: './load-data-button.component.html',
  styleUrls: ['./load-data-button.component.scss']
})
export class LoadDataButtonComponent implements OnInit {

  @Input() buttonText: string;
  @Input() onClickCallback: CallableFunction;

  constructor() { }

  ngOnInit(): void {
  }

}
