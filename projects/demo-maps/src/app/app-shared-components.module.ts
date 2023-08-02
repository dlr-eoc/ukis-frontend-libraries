import { NgModule } from "@angular/core";

import { BlinkerComponent } from './components/performance/blinker/blinker.component';
import { FpserComponent } from './components/performance/fpser/fpser.component';
import { PerformanceComponent } from './components/performance/performance.component';

import { ExampleLayerActionComponent } from './components/example-layer-action/example-layer-action.component';
import { SunlightComponent } from './components/sunlight/sunlight.component';
import { InterpolationSettingsComponent } from './components/interpolation-settings/interpolation-settings.component';
import { TablePopupComponent } from './components/table-popup/table-popup.component';
import { ExampleGroupActionComponent } from './components/example-group-action/example-group-action.component';
import { RasterFeatureInfoComponent } from './components/raster-feature-info/raster-feature-info.component';
import { Popup2Component } from './components/popup2/popup2.component';
import { ExampleLayerDescriptionComponent } from './components/example-layer-description/example-layer-description.component';
import { ExampleGroupLegendComponent } from './components/example-group-legend/example-group-legend.component';
import { VtileLayerActionComponent } from './components/vtile-layer-action/vtile-layer-action.component';
import { ClarityModule } from "@clr/angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [
        PerformanceComponent,
        BlinkerComponent,
        FpserComponent,
        ExampleLayerActionComponent,
        SunlightComponent,
        InterpolationSettingsComponent,
        TablePopupComponent,
        ExampleGroupActionComponent,
        RasterFeatureInfoComponent,
        Popup2Component,
        ExampleLayerDescriptionComponent,
        ExampleGroupLegendComponent,
        VtileLayerActionComponent
    ],
    imports: [
        ClarityModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    exports: [
        PerformanceComponent,
        BlinkerComponent,
        FpserComponent,
        ExampleLayerActionComponent,
        SunlightComponent,
        InterpolationSettingsComponent,
        TablePopupComponent,
        ExampleGroupActionComponent,
        RasterFeatureInfoComponent,
        Popup2Component,
        ExampleLayerDescriptionComponent,
        ExampleGroupLegendComponent,
        VtileLayerActionComponent
    ]
})
export class SharedComponentsModule { }
