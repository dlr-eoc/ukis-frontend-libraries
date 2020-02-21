import { Component, OnInit, OnDestroy } from '@angular/core';
import { MapOlService } from '@dlr-eoc/map-ol';
import { transform as olTransform, get as olGetProjection, projection as olProjection } from 'ol/proj';

interface ISelectProjection {
  title: string;
  value: string;
}

@Component({
  selector: 'ukis-mouse-position',
  templateUrl: './mouse-position.component.html',
  styleUrls: ['./mouse-position.component.scss']
})
export class MousePositionComponent implements OnInit, OnDestroy {

  public mapCoordinates: [number, number] = [0, 0];
  public zoom = 0;
  public projections: ISelectProjection[];
  mapProjection: olProjection;
  public selectedProjection: string;
  public precision = 2;
  x = 'lon';
  y = 'lat';
  constructor(public mapSvc: MapOlService) { }

  ngOnInit() {
    this.mapProjection = this.mapSvc.getProjection();
    const mapEPSG = this.mapProjection.getCode();

    if (mapEPSG === 'EPSG:4326') {
      this.projections = [
        { title: this.mapProjection.getCode(), value: this.mapProjection.getCode() }
      ];
    } else {
      this.projections = [
        { title: 'EPSG:4326', value: 'EPSG:4326' },
        { title: this.mapProjection.getCode(), value: this.mapProjection.getCode() }
      ];
    }

    this.selectedProjection = this.projections[0].value;
    this.mapSvc.map.on('pointermove', this.mapMoveSubscription);
    this.mapSvc.map.on('moveend', this.mapOnMoveend);
  }

  ngOnDestroy() {
    this.mapSvc.map.un('pointermove', this.mapMoveSubscription);
    this.mapSvc.map.un('moveend', this.mapOnMoveend);
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

  public onChangeProj(epsgcode) {
    if (epsgcode === 'EPSG:4326') {
      this.x = 'lon';
      this.y = 'lat';
    } else {
      this.x = 'x';
      this.y = 'y';
    }
    const oldSelection = this.selectedProjection;
    this.selectedProjection = epsgcode;
    this.mapCoordinates = olTransform(this.mapCoordinates, olGetProjection(oldSelection), olGetProjection(this.selectedProjection));
  }

  public toPrecision(input: number, value: number) {
    return input.toFixed(value);
  }
}
