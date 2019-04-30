import { Component } from '@angular/core';
import { DemoProcessService } from './services/process/demo-process.service';
import { LayersService } from '@ukis/services-layers/src/public_api';
import { MapStateService } from '@ukis/services-map-state/src/public_api';
import { DemoProcess } from './services/process/demo-process';
import { StringParameter, Parameter } from '@ukis/dynforms/src/public_api';
import { FormGroup, Form, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public controls = {};
  public demoProcessService: DemoProcessService;

  constructor(
    public layersService: LayersService,
    public mapStateService: MapStateService
    ) {
      this.demoProcessService = new DemoProcessService([
        new DemoProcess("proc1", "Process 1", "descr", "available"),
        new DemoProcess("proc2", "Process 2", "descr", "unavailable"),
      ]);
    }
}
