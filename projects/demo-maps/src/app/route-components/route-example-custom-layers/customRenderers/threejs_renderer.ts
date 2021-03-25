import { Feature } from 'ol';
import { FrameState } from 'ol/PluggableMap';
import LayerRenderer from 'ol/renderer/Layer';
import VectorLayer from 'ol/layer/Vector';
import { Polygon as  olPolygonGeometry } from 'ol/geom';
import { WebGLRenderer, PerspectiveCamera, Scene, Mesh, Renderer,
    DirectionalLight, MeshPhongMaterial, Vector3, Shape, ExtrudeGeometry, Color, BufferGeometry } from 'three';
import { heightAboveWidth, zoom2width } from '@dlr-eoc/map-three';


export class BarsLayer extends VectorLayer {
    constructor(options) {
        super(options);
    }

    createRenderer(): ThreeJsRenderer {
        return new ThreeJsRenderer(this);
    }
}

/**
 * Three.js is certainly one of the most popular 3d-libraries for javascript.
 * As such it is nice to have a simple means of integrating three.js with an openlayers-map.
 *
 * To do this, we treat the 2d-map as if it were a 2d-plane in 3d-space.
 * We can then simply place 3d-objects on the surface of that plane.
 *
 * Note that this approach differs from what we've been doing in our pure-WebGL renderers.
 * There we transformed geographic coordinates into pixels, and then pixels into WebGL-clipping-space.
 * Here instead all objects retain their geographic coordinates.
 */
export class ThreeJsRenderer extends LayerRenderer<VectorLayer> {

    readonly canvas: HTMLCanvasElement;
    readonly scene: Scene;
    readonly meshes: Mesh[];
    readonly renderer: Renderer;
    readonly camera: PerspectiveCamera;

    constructor(layer: VectorLayer) {
        super(layer);

        // setting up canvas
        const canvas = document.createElement('canvas');
        canvas.width = 800; // 1255;
        canvas.height = 600; // 736;
        canvas.style.position = 'absolute';

        // preparing data
        const source = layer.getSource();
        const features = source.getFeatures() as Feature<olPolygonGeometry>[];
        const meshes = this.featuresToMeshes(features);

        // setting up three js
        const renderer = new WebGLRenderer({canvas, alpha: true});
        const camera = new PerspectiveCamera(45, canvas.width / canvas.height, 0.01, 30000000);
        camera.position.set(0, 0, 10);
        camera.lookAt(new Vector3(0, 0, 0));
        const scene = new Scene();
        for (const mesh of meshes) {
            scene.add(mesh);
        }
        const light = new DirectionalLight(0xFFFFFF, 1);
        light.position.set(-1, 2, 4);
        scene.add(light);


        // keeping for later
        this.canvas = canvas;
        this.scene = scene;
        this.meshes = meshes;
        this.renderer = renderer;
        this.camera = camera;
    }

    prepareFrame(frameState: FrameState): boolean {

        const pixelRatio = frameState.pixelRatio;
        const size = frameState.size;
        const width = Math.round(size[0] * pixelRatio);
        const height = Math.round(size[1] * pixelRatio);

        const zoom = frameState.viewState.zoom;
        const center = frameState.viewState.center;
        const extent = frameState.extent;
        const fov = 45;
        const cameraHeight = this.extent2Height(extent, fov);

        this.camera.aspect = width / height;
        this.camera.fov = fov;
        this.camera.near = 0.01;
        this.camera.far = 300000000;
        this.camera.position.set(center[0], center[1], cameraHeight);
        this.camera.lookAt(new Vector3(center[0], center[1], 0));
        this.camera.updateProjectionMatrix();

        if (size[0] !== this.canvas.width || size[1] !== this.canvas.height) {
            this.canvas.width = size[0];
            this.canvas.height = size[1];
            this.renderer.setSize(this.canvas.width, this.canvas.height);
        }
        this.canvas.style.opacity = '' + frameState.layerStatesArray[frameState.layerIndex].opacity;

        return true;
    }

    renderFrame(frameState: FrameState, target: HTMLElement): HTMLElement {
        this.renderer.render(this.scene, this.camera);
        return this.canvas;
    }

    renderDeclutter(frameState: FrameState) {
    }

    private featuresToMeshes(features: Feature<olPolygonGeometry>[]): Mesh[] {
        const meshes: Mesh[] = [];
        for (const feature of features) {
            const fGeom = feature.getGeometry();
            const height = feature.get('height');
            const tGeom = this.fGeom2tGeom(fGeom, 0.1 * height);
            const color = new Color( 0xffffff );
            color.setHex( Math.random() * 0xffffff );
            const material = new MeshPhongMaterial({color});
            const mesh = new Mesh(tGeom, material);
            meshes.push(mesh);
        }
        return meshes;
    }

    private fGeom2tGeom(fGeom: olPolygonGeometry, height: number): BufferGeometry {
        const coords = fGeom.getCoordinates()[0];
        const shape = new Shape();
        shape.moveTo(coords[0][0], coords[0][1]);
        for (let i = 1; i < coords.length; i++) {
            const coord = coords[i];
            shape.lineTo(coord[0], coord[1]);
        }
        return new ExtrudeGeometry(shape, {
            depth: height,
            bevelEnabled: false
        });
    }

    private extent2Height(extent: number[], fov: number): number {
        //const w = extent[2] - extent[0];
        // const h = extent[3] - extent[1];
        // const width = Math.max(w, h);
        const width = extent[3] - extent[1];
        const height = heightAboveWidth(width, fov);
        return height;
    }

    // private zoom2Height(zoom: number, fov: number): number {
    //     const width = zoom2width(zoom - 1.9, 360);  // <-- 360 only holds if this map uses EPSG:4326
    //     const height = heightAboveWidth(width, fov);
    //     return height;
    // }
}
