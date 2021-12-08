import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { Scene, PerspectiveCamera, WebGLRenderer, Mesh, CubeTextureLoader, BufferGeometry } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { mapToSingleCanvas, renderLoop } from '@dlr-eoc/utils-maps';
import { WGS84TextureMesh, Map2SphereConverter } from './utils/utils-three';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { Subscription } from 'rxjs';
import { Map } from 'ol';
import RenderEvent from 'ol/render/Event';

@Injectable({
  providedIn: 'root'
})
export class MapThreeService implements OnDestroy {

  private subs: Subscription[] = [];
  private needsResize = false;
  /** This default only works if your Folder Structure contains the following path */
  public skyTexturePath = 'assets/image/zpos.png';

  constructor(
    private mapStateSvc: MapStateService,
    private zone: NgZone
  ) { }

  public initScene(
    threeCanvas: HTMLCanvasElement,
    mesh: Mesh,
    map: Map
  ): void {


    /***********************************************************************************
     *       Step 1: setting up threejs-scene                                          *
     **********************************************************************************/
    const renderer = new WebGLRenderer({ alpha: true, antialias: true, canvas: threeCanvas });
    renderer.setSize(threeCanvas.clientWidth, threeCanvas.clientHeight, false);  // important to have this `false` argument: keeps threejs from overwriting css.
    const scene = new Scene();
    const fov = 50;
    const camera = new PerspectiveCamera(fov, threeCanvas.clientWidth / threeCanvas.clientHeight, 0.01, 100000);
    camera.lookAt(0, 0, 0);
    camera.position.set(-40, 40, 40);
    const controls = new OrbitControls(camera, renderer.domElement);
    const textureLoader = new CubeTextureLoader();
    const skyTexture = textureLoader.load(new Array(6).fill(this.skyTexturePath));
    scene.background = skyTexture;


    /***********************************************************************************
     *       Step 2: projecting the ol-map onto the threejs-object                     *
     **********************************************************************************/

    const mapOlCanvas = document.createElement('canvas');
    mapToSingleCanvas(map, mapOlCanvas, () => { }, true);
    const model: WGS84TextureMesh = new WGS84TextureMesh(mapOlCanvas, mesh.geometry);
    scene.add(model);

    /***********************************************************************************
     *       Step 3: sync object with mapStateSvc                                      *
     **********************************************************************************/
    const converter = new Map2SphereConverter(360 / (2 * Math.PI), 15, fov);

    // 1: stateSvc --> scene
    // const s1 = this.mapStateSvc.getMapState().subscribe((mapState: MapState) => {
    //   const extent = mapState.extent;
    //   const lon = mapState.center.lon;
    //   const lat = mapState.center.lat;
    //   const zoom = mapState.zoom;

    //   model.perspectiveChanged(extent as [number, number, number, number]);

    //   const [x, y, z] = converter.lonLatZoom2XYZ(lon, lat, zoom);
    //   camera.position.set(x, y, z);
    //   camera.lookAt(0, 0, 0);
    // });
    // this.subs.push(s1);
    /**
     * A little hack: while the above subscription to the map-state seems most consistent,
     * with it we only get an update when a map-pan has completely finished animating.
     * To be able to sync while the pan-animation is still ongoing, we instead subscribe directly
     * to the map's postrender events.
     */
    map.on('postrender', (evt: RenderEvent) => {
      const extent = map.getView().calculateExtent(map.getSize());
      const [lon, lat] = map.getView().getCenter();
      const zoom = map.getView().getZoom();

      model.perspectiveChanged(extent as [number, number, number, number]);

      const [x, y, z] = converter.lonLatZoom2XYZ(lon, lat, zoom);
      camera.position.set(x, y, z);
      camera.lookAt(0, 0, 0);
    });



    // 2: scene --> stateSvc
    controls.addEventListener('change', (event) => {
      const camPos = camera.position;
      const [lon, lat, zoom] = converter.xyz2LonLatZoom(camPos.x, camPos.y, camPos.z);
      this.mapStateSvc.setMapState({
        center: { lon, lat },
        zoom: zoom
      });
    });


    /***********************************************************************************
     *       Step 4: rendering                                                         *
     **********************************************************************************/

    this.zone.runOutsideAngular(() => {
      renderLoop(30, (deltaT: number) => {

        if (this.needsResize) {
          if (threeCanvas.clientHeight !== threeCanvas.height || threeCanvas.clientWidth !== threeCanvas.width) {
            renderer.setSize(threeCanvas.clientWidth, threeCanvas.clientHeight, false);  // important to have this `false` argument: keeps threejs from overwriting css.
            camera.aspect = threeCanvas.clientWidth / threeCanvas.clientHeight;
            camera.updateProjectionMatrix();
          }
          this.needsResize = false;
        }

        renderer.render(scene, camera);
      });
    });
  }

  onResize(event: any) {
    this.needsResize = true;
  }

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }
}
