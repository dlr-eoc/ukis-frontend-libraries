import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MapOlService } from '@dlr-eoc/map-ol';
import { transform as olTransform, get as olGetProjection, Projection as olProjection } from 'ol/proj';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { ClrSelectModule, ClrCommonFormsModule, ClrNumberInputModule } from '@clr/angular';

import { FormsModule } from '@angular/forms';
import { MapStateService } from '@dlr-eoc/services-map-state';

interface ISelectProjection {
  title: string;
  value: string;
}

@Component({
  selector: 'ukis-mouse-position',
  templateUrl: './mouse-position.component.html',
  styleUrls: ['./mouse-position.component.scss'],
  imports: [ClrSelectModule, ClrCommonFormsModule, FormsModule, ClrNumberInputModule]
})
export class MousePositionComponent implements OnInit, OnDestroy {
  @Input('mapSvc') mapSvc: MapOlService;
  @Input('mapState') mapState: MapStateService;
  public mapCoordinates: [number, number] | number[] = [0, 0];
  public zoom = 0;
  public projections: ISelectProjection[];
  mapProjection: olProjection;
  public selectedProjection: string;
  public precision = 2;
  x = 'Lon';
  y = 'Lat';
  mapSub: Subscription;
  constructor() {
  }

  ngOnInit() {
    this.mapSub = this.mapState.getProjection().pipe(distinctUntilChanged()).subscribe(item => {
      if (item.epsg) {
        this.mapProjection = olGetProjection(item.epsg);
        this.setProjection(item.epsg);
      }
    });

    this.mapProjection = this.mapSvc.getProjection();
    this.setProjection(this.mapProjection.getCode());

    // TODO: remove listeneres on destry
    const onMove = this.mapSvc.map.on('pointermove', this.mapMoveSubscription);
    const onMoveEnd = this.mapSvc.map.on('moveend', this.mapOnMoveend);
  }

  /**
   * projLike: 'olProjection'
   */
  setProjection(epsg: string) {
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
