import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MapOlService } from '@dlr-eoc/map-ol';
import { MapThreeService } from './map-three.service';
import { Mesh, BufferGeometry } from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { HostListener } from '@angular/core';



/**
 * This component expects there to be a working ol-map (with EPSG:4326 projection) somewhere.
 * That map is required, because this map forms the texture of the displayed model.
 * If you only want to show the threejs-map, create the ol-map anyway and set its visibility to `hidden`.
 */

@Component({
  selector: 'ukis-map-three',
  templateUrl: './map-three.component.html',
  styleUrls: ['./map-three.component.scss']
})
export class MapThreeComponent implements OnInit, AfterViewInit {

  @Input('mapOlSvc') mapOlSvc: MapOlService;
  @Input('modelFilePath') modelFilePath = 'https://solarsystem.nasa.gov/system/resources/gltf_files/2358_Phobos_1_1000.glb'; // '@dlr-eoc/shared-assets/image/Phobos_1_1000.glb';
  @Input('modelName') modelName = 'phobos';
  @ViewChild('threeCanvas') private threeCanvas: ElementRef;

  constructor(
    private mapThreeSvc: MapThreeService
  ) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {

    const objectGltfPromise = new Promise<Mesh>((resolve) => {
      const gltfLoader = new GLTFLoader();
      gltfLoader.load(this.modelFilePath, (gltf: GLTF) => {
        const mesh = gltf.scene.getObjectByName(this.modelName) as Mesh;
        if (!mesh) {
          throw new Error(`No object named ${this.modelName} in glb!`);
        }
        resolve(mesh);
      });
    });

    objectGltfPromise.then((mesh: Mesh) => {
      this.mapThreeSvc.initScene(this.threeCanvas.nativeElement, mesh, this.mapOlSvc.map);
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.mapThreeSvc.onResize(event);
  }
}
