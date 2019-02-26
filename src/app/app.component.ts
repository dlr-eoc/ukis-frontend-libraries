import { Component } from '@angular/core';


import '@webcomponents/custom-elements';
import '@clr/icons/shapes/all-shapes';
import '@clr/icons/shapes/commerce-shapes';
import '@clr/icons/shapes/core-shapes';
import '@clr/icons/shapes/essential-shapes';
import '@clr/icons/shapes/media-shapes';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/technology-shapes';
import '@clr/icons/shapes/travel-shapes';
import './components/icons/ukis';

import { AlertService, IAlert } from './components/global-alert/alert.service';
import { FooterService } from './components/global-footer/footer.service';
import { ProgressService, IProgress } from './components/global-progress/progress.service';
import { ServicesWpsService } from 'services-wps/src/lib/services-wps.service';
import { IWpsCapabilities, IWpsProcessBrief, IWpsProcessDescriptions, IWpsProcessDescription, IWpsDataInputs, IWpsOutputDefinition, IWpsOutputDescription, IWpsResponseForm, IWpsInput, IWpsCode, IWpsResponseFormDoc } from 'datatypes-wps/src/lib/datatypes-wps';

@Component({
  selector: 'ukis-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class UkisComponent {
  title = 'Master';

  ui = {
    floating: true,
    flipped: false,
    footer: false,
    alert: null,
    progress: null
  };

  constructor(
    private footerService: FooterService,
    private alertService: AlertService,
    private progressService: ProgressService,
    private wpsService: ServicesWpsService
  ) {
    this.getHtmlMeta(['title', 'version', 'description']);

    if (this['TITLE']) {
      this.title = this['TITLE'];
    }

    this.alertService.alert$.subscribe((ev) => {
      this.setAlert(ev)
    });

    this.footerService.footer$.subscribe((ev) => {
      this.showFooter(ev)
    });

    this.progressService.progress$.subscribe((ev) => {
      this.showProgress(ev)
    })

  }

  showProgress = (progress: IProgress) => {
    this.ui.progress = progress;
  }

  showFooter = (show: boolean) => {
    this.ui.footer = show;
  }

  setAlert = (alert: IAlert) => {
    this.ui.alert = alert;
  }

  getHtmlMeta(names: string[]) {
    var _ref = document.getElementsByTagName('meta');
    for (let _i = 0, _len = _ref.length; _i < _len; _i++) {
      let meta = _ref[_i];
      let name = meta.getAttribute('name');
      if (names.includes(name)) {
        this[name.toUpperCase()] = meta.getAttribute('content') || eval(meta.getAttribute('value'));
      }
    }
  }

  ngOnInit() {
    let wpsUrl = "http://geoprocessing.demo.52north.org:8080/wps/WebProcessingService";

    this.wpsService.getCapabilities(wpsUrl).subscribe((data: IWpsCapabilities) => {

      let processes: IWpsProcessBrief[] = data.value.processOfferings.process;
      for(let process of processes) {
        let id = process.title[0].value;
        if(id == "org.n52.wps.server.algorithm.JTSConvexHullAlgorithm") {

          this.wpsService.describeProcess(wpsUrl, process).subscribe((data: IWpsProcessDescriptions) => {
            
            let description: IWpsProcessDescription = data.value.processDescription[0];

            // TODO: based on description, let the user define inputs and responseForm.

            let inputIdentifier: IWpsCode = {
              TYPE_NAME: "wps.CodeType",
              value: description.dataInputs.input[0].title[0].value
            };

            let inputs: IWpsDataInputs = {
              TYPE_NAME: "wps.DataInputsType",
              input: [{
                TYPE_NAME: "wps.InputType",
                data: {
                  TYPE_NAME: "wps.DataType",
                  complexData: {
                    TYPE_NAME: "wps.ComplexDataType",
                    content: ['{"type":"Polygon","coordinates":[[[-5.8008,25.7999],[-5.8008,44.3396],[14.2383,44.3396],[14.2383,25.7999],[-5.8008,25.7999]]]}'],
                    mimeType: "application/vnd.geo+json",
                    otherAttributes: null
                  }
                },
                identifier: inputIdentifier
              }]
            };

            let outputIdentifier: IWpsCode = {
              TYPE_NAME: "wps.CodeType",
              value: description.processOutputs.output[0].title[0].value
            };

            // let responseForm: IWpsResponseForm = {
            //   TYPE_NAME: "wps.ResponseFormType",
            //   rawDataOutput: {
            //     TYPE_NAME: "wps.OutputDefinitionType",
            //     identifier: outputIdentifier,
            //     mimeType: description.processOutputs.output[0].complexOutput.supported.format[0].mimeType
            //   }
            // }

            let responseForm: IWpsResponseFormDoc = {
              TYPE_NAME: "wps.ResponseFormType",
              responseDocument: {
                TYPE_NAME: "wps.ResponseDocumentType",
                lineage: false,
                status: false,
                storeExecuteResponse: false,
                output: [{
                  TYPE_NAME: "wps.DocumentOutputDefinitionType",
                  asReference: false,
                  identifier: outputIdentifier,
                  mimeType: description.processOutputs.output[0].complexOutput.supported.format[0].mimeType
                }]
              }
            }

            this.wpsService.executeProcess(wpsUrl, process, description, inputs, responseForm).subscribe((data) => {
              console.log("executeResponse", data);
            });
          });

        }
      }

    });
  }
}
