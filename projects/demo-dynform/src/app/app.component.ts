import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Parameter, StringParameter, SelectParameter, BboxParameter } from '@ukis/dynforms';
import { LayersService } from '@ukis/services-layers';
import { MapStateService } from '@ukis/services-map-state';
import { osm } from '@ukis/base-layers-raster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  controls =  {};
  formgroup: FormGroup;
  parameters: Parameter[];

  constructor(
    public layersService: LayersService, 
    public mapStateService: MapStateService
  ) {
    
    let para1: StringParameter = {
      id: "para1", 
      name: "para1", 
      parametertype: "string", 
      datatype: "string", 
      defaultValue: "default value", 
      description: "string parameter description", 
      value: null
    }

    let para2: SelectParameter = {
      id: "para2", 
      name: "para2", 
      parametertype: "select", 
      defaultValue: "a", 
      description: "select parameter description", 
      options: ["a", "b", "c"],
      value: null
    }

    let para3: BboxParameter = {
      id: "para3", 
      name: "para3", 
      parametertype: "bbox", 
      defaultValue: [0,0,0,0], 
      description: "bbox parameter description", 
      value: null
    }

    this.parameters = [para1, para2, para3];

    this.formgroup = new FormGroup({});

    this.parameters.forEach(para => {
      this.formgroup.addControl(para.id, new FormControl(para.defaultValue, [Validators.required]))
    })


    let o = new osm();
    o.visible = true;
    this.layersService.addLayer(o, "Overlays");

  }

  onFormSubmitted(evt) {
    console.log("onFormSubmitted", evt);
  }
}
