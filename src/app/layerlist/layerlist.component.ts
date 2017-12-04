import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ukis-layerlist',
  templateUrl: './layerlist.component.html',
  styleUrls: ['./layerlist.component.scss']
})
export class LayerlistComponent implements OnInit {

  constructor() { }

  @Input() layers: any;

  ngOnInit() {
  }

}
