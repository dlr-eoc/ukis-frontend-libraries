import { Injectable } from '@angular/core';
import * as ol from 'openlayers'
import { osm } from '@ukis/baseLayers/rasterBaseLayers';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';

export interface GeoJSONFeature {
    type: string;
    geometry: { type: string, coordinates: Array<number> }
    properties: any
}

export interface GeoJSONFeatureCollection {
    type: "FeatureCollection"
    features: GeoJSONFeature[]
}

export interface MapCenter {
    lat: number;
    lon: number;
}

export interface IAppStoreService {
    zoom: BehaviorSubject<number>;
    center: BehaviorSubject<MapCenter>
    baselayers: Array<any> //BehaviorSubject<GeoJSONFeature[]>;
    EPSG: string;
}


@Injectable()
export class AppStoreService {
    zoom: BehaviorSubject<number>;
    center: BehaviorSubject<MapCenter>
    baselayers: Array<any> //BehaviorSubject<GeoJSONFeature[]>;
    overlays: Array<any> //BehaviorSubject<GeoJSONFeature[]>;
    EPSG: string;

    constructor() {
        this.zoom = new BehaviorSubject(5);
        this.center = new BehaviorSubject({
            lat: 11.277,
            lon: 48.085
        });
        this.EPSG = 'EPSG:3857'; //'EPSG:3857' 'EPSG:4326'
        this.baselayers = [
            new ol.layer.Tile(<any>{
                title: 'EOC Litemap',
                legendImg: 'styles/img/legend/esri_grey_canvas.png',
                visible: false,
                source: new ol.source.TileWMS(<any>{
                    url: '//geoservice.dlr.de/eoc/basemap/wms',
                    params: {
                        'LAYERS': 'litemap',
                        'TILED': true,
                        'SRS': this.EPSG
                    },
                    attributions: ['<br/>© DLR'],
                    serverType: 'geoserver',
                    wrapX: false
                })
            }),

            new ol.layer.Tile(<any>{
                title: 'OSM',
                name: 'osm',
                visible: true,
                legendImg: 'styles/img/legend/osm.png',
                source: new ol.source.OSM({ wrapX: false })
            }),

            new ol.layer.Tile(<any>{
                title: 'ESRI Imagery',
                legendImg: 'styles/img/legend/satellite_ovl.png',
                visible: false,
                source: new ol.source.XYZ({
                    attributions: ['<br/>© <a href="http://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer">ESRI</a>'],
                    url: '//server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png'
                })
            })
        ];

        this.overlays = [
            new ol.layer.Vector(<any>{
                source: new ol.source.Vector({
                    features: (new ol.format.GeoJSON({
                        defaultDataProjection: 'EPSG:4326',
                        featureProjection: this.EPSG
                      })).readFeatures(
                        {
                            "type": "FeatureCollection",
                            "features": [
                                {
                                    "type": "Feature",
                                    "geometry": {
                                        "type": "Point",
                                        "coordinates": [10.893, 48.329]
                                    },
                                    "properties": { "name": "Augsburg" }
                                },
                                {
                                    "type": "Feature",
                                    "geometry": {
                                        "type": "Point",
                                        "coordinates": [9.929, 51.527]
                                    },
                                    "properties": { "name": "Göttingen" }
                                },
                                {
                                    "type": "Feature",
                                    "geometry": {
                                        "type": "Point",
                                        "coordinates": [7.117, 50.855]
                                    },
                                    "properties": { "name": "Stade" }
                                }
                            ]
                        }
                    ),
                    format: new ol.format.GeoJSON(),
                    wrapX: false
                }),
                id: 'standorte',
                style: (feature) => {

                    return new ol.style.Style({
                        image: new ol.style.Circle({
                            radius: 3,
                            fill: new ol.style.Fill({
                                color: [255, 0, 0, 0.4]
                            }),
                            stroke: new ol.style.Stroke({ color: 'red', width: 1 })
                        }),
                        //http://openlayers.org/en/latest/apidoc/ol.style.Text.html
                        text: new ol.style.Text({
                            text: feature.get('name'),
                            textBaseline: 'top'
                        })
                    })
                }
            })
        ];

    }

}