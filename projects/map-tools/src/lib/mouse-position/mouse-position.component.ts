import { Component, OnInit, OnDestroy } from '@angular/core';
import { MapOlService } from '@dlr-eoc/map-ol';
import { transform as olTransform, get as olGetProjection, Projection as olProjection } from 'ol/proj';
import { Subscription } from 'rxjs';
import { ClrSelectModule, ClrCommonFormsModule, ClrInputModule } from '@clr/angular';

import { FormsModule } from '@angular/forms';

interface ISelectProjection {
  title: string;
  value: string;
}

@Component({
    selector: 'ukis-mouse-position',
    templateUrl: './mouse-position.component.html',
    styleUrls: ['./mouse-position.component.scss'],
    standalone: true,
    imports: [ClrSelectModule, ClrCommonFormsModule, FormsModule, ClrInputModule]
})
export class MousePositionComponent implements OnInit, OnDestroy {

  public mapCoordinates: [number, number] | number[] = [0, 0];
  public zoom = 0;
  public projections: ISelectProjection[];
  mapProjection: olProjection;
  public selectedProjection: string;
  public precision = 2;
  x = 'Lon';
  y = 'Lat';
  mapSub: Subscription;
  constructor(public mapSvc: MapOlService) {
    this.mapSub = this.mapSvc.projectionChange.subscribe(projLike => {
      this.mapProjection = projLike;
      this.setProjection(projLike);
    });
  }

  ngOnInit() {
    this.mapSvc.map.on('pointermove', this.mapMoveSubscription);
    this.mapSvc.map.on('moveend', this.mapOnMoveend);
  }

  /**
   * projLike: 'olProjection'
   */
  setProjection(projLike: any) {
    const epsg = projLike.getCode();
    if (epsg === 'EPSG:4326') {
      this.projections = [
        { title: epsg, value: epsg }
      ];
    } else {
      this.projections = [
        { title: 'EPSG:4326', value: 'EPSG:4326' },
        { title: epsg, value: epsg }
      ];
    }
    this.selectedProjection = this.projections[0].value;
  }

  ngOnDestroy() {
    this.mapSvc.map.un('pointermove', this.mapMoveSubscription);
    this.mapSvc.map.un('moveend', this.mapOnMoveend);
    this.mapSub.unsubscribe();
  }

  mapMoveSubscription = (evt) => {
    if (evt.coordinate) {
      this.mapCoordinates = olTransform(evt.coordinate, this.mapProjection, olGetProjection(this.selectedProjection));
    }
  }

  mapOnMoveend = (evt) => {
    const newZoom = evt.map.getView().getZoom();
    if (this.zoom !== newZoom) {
      // console.log('zoom end, new zoom: ' + newZoom);
      this.zoom = newZoom;
    }
  }

  public onChangeProj(evt: Event) {
    const epsgcode = (evt.target as HTMLInputElement).value;
    if (epsgcode === 'EPSG:4326') {
      this.x = 'Lon';
      this.y = 'Lat';
    } else {
      this.x = 'X';
      this.y = 'Y';
    }
    const oldSelection = this.selectedProjection;
    this.selectedProjection = epsgcode;
    this.mapCoordinates = olTransform(this.mapCoordinates, olGetProjection(oldSelection), olGetProjection(this.selectedProjection));
  }

  public toPrecision(input: number, value: number) {
    return input.toFixed(value);
  }
}
