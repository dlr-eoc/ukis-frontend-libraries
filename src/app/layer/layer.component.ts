import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ukis-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.scss']
})
export class LayerComponent implements OnInit {

  constructor() { }

  @Input() layers: any;

  ngOnInit() {
  }

}
