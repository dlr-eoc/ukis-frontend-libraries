import { Mesh, Geometry, BufferGeometry, CanvasTexture, ShaderMaterial } from 'three';



export function vectorLength(arr: number[]): number {
  const squares = arr.map(el => el ** 2);
  const squareSum = squares.reduce((prev, current) => prev + current, 0);
  return Math.sqrt(squareSum);
}

export function deg2Rad(deg: number): number {
  return (deg % 360) * (2 * Math.PI) / 360;
}

export function rad2Deg(rad: number): number {
  return (rad % (2 * Math.PI)) * 360 / (2 * Math.PI);
}

/**
 * Given your height and fov-angle,
 * returns the width of the part of the plane you can see.
 */
export function widthFromHeight(height: number, fovDeg: number): number {
  return 2 * height * Math.tan(deg2Rad(fovDeg / 2));
}

/**
 * given the maximum width you can see inside of your fov
 * and the angle of your fov,
 * returns your height above the plane.
 */
export function heightAboveWidth(width: number, fovDeg: number): number {
  return (width / 2) / Math.tan(deg2Rad(fovDeg / 2));
}

export function zoom2width(zoom: number, fullMapWidth: number): number {
  return fullMapWidth * Math.pow(0.5, zoom);
}

export function width2zoom(width: number, fullMapWidth: number): number {
  return Math.log2(fullMapWidth / width);
}


/**
 * Converts lon/lat/zoom of a map to x/y/z of a threejs-clipping-space and back.
 * Currently only works for maps in EPSG:4326-projection.
 */
export class Map2SphereConverter {

  /**
   * MU: map-units (usually EPSG:4326 -> degrees)
   * SU: sphere-units
   */
  readonly mapRadiusMU: number;
  readonly mapWidthMU: number;
  readonly mapUnitsPerSphereUnits: number;
  readonly sphereRadiusSU: number;
  readonly sphereCircumferenceSU: number;
  readonly sphereUnitsPerMapUnits: number;
  readonly fovDeg: number;

  constructor(mapRadius = 360 / (2 * Math.PI), sphereRadius = 10, fovDeg: number) {
    this.mapRadiusMU = mapRadius;
    this.mapWidthMU = 2 * Math.PI * mapRadius;
    this.mapUnitsPerSphereUnits = mapRadius / sphereRadius;
    this.sphereRadiusSU = sphereRadius;
    this.sphereCircumferenceSU = 2 * Math.PI * sphereRadius;
    this.sphereUnitsPerMapUnits = sphereRadius / mapRadius;
    this.fovDeg = fovDeg;
  }

  /**
   * Given the longest width on a plane you can see
   * (usually that would be the horizontal, since our eyes have a smaller fov in the vertical)
   * this gives the height above the plane.
   */
  public mapWidth2SphereHeight(visibleMapWidthMU: number): number {
    const heightAboveSurfaceMU = heightAboveWidth(visibleMapWidthMU, this.fovDeg);
    const heightAboveSurfaceSU = heightAboveSurfaceMU * this.sphereUnitsPerMapUnits;
    return this.sphereRadiusSU + heightAboveSurfaceSU;
  }

  /**
   * Given your height above the sphere,
   * this gives the with of your fov.
   */
  public sphereHeight2mapWidth(heightSU: number): number {
    const heightAboveSurfaceSU = heightSU - this.sphereRadiusSU;
    const heightAboveSurfaceMU = heightAboveSurfaceSU * this.mapUnitsPerSphereUnits;
    const mapWidthMU = widthFromHeight(heightAboveSurfaceMU, this.fovDeg);
    return mapWidthMU;
  }

  public sphereHeight2zoom(heightSU: number): number {
    const mapWidthMU = this.sphereHeight2mapWidth(heightSU);
    const zoom = this.widthMU2Zoom(mapWidthMU);
    return zoom;
  }

  public zoom2sphereHeight(zoom: number): number {
    const widthMU = this.zoom2WidthMU(zoom);
    const heightSU = this.mapWidth2SphereHeight(widthMU);
    return heightSU;
  }

  public spherePos2zoom(x: number, y: number, z: number): number {
    const heightSU = vectorLength([x, y, z]);
    return this.sphereHeight2zoom(heightSU);
  }

  public zoom2WidthMU(zoom: number): number {
    return zoom2width(zoom, this.mapWidthMU);
  }

  public widthMU2Zoom(widthMU: number) {
    return width2zoom(widthMU, this.mapWidthMU);
  }

  public lonLatZoom2XYZ(lonMU: number, latMU: number, zoom: number): [number, number, number] {
    const lonRad = this.mu2rad(lonMU);
    const latRad = this.mu2rad(latMU);

    const widthMU = this.zoom2WidthMU(zoom);
    const height = this.mapWidth2SphereHeight(widthMU);

    const x = height * Math.cos(latRad) * Math.sin(lonRad);
    const y = height * Math.sin(latRad);
    const z = height * Math.cos(latRad) * Math.cos(lonRad);

    return [x, y, z];
  }

  /**
   * 3d-Vector to lon/lat/zoom in WGS84.
   * Assumes that ...
   *  - z points outside the image, x to the right and y up,
   *  - the point 0/0 is on the z-axis,
   *  - longitude goes counterclockwise from the z-axis.
   */
  public xyz2LonLatZoom(x: number, y: number, z: number): [number, number, number] {
    const latRad = Math.asin(y / vectorLength([x, y, z]));
    const lonRad = Math.asin(x / vectorLength([x, z]));

    const latDeg = 180.0 * latRad / Math.PI;
    let lonDeg = 180.0 * lonRad / Math.PI;
    if (z <= 0.0) {
        lonDeg = 180.0 - lonDeg;
    }

    const zoom = this.spherePos2zoom(x, y, z);

    return [lonDeg, latDeg, zoom];
  }

  private mu2rad(valInMU: number): number {
    // @TODO: this only works for EPSG:4326. Find a more general method.
    return deg2Rad(valInMU);
  }

  private rad2mu(valInRad: number): number {
    // @TODO: this only works for EPSG:4326. Find a more general method.
    return rad2Deg(valInRad);
  }
}




export class WGS84TextureMesh extends Mesh {
    constructor(canvas: HTMLCanvasElement, geometry: Geometry | BufferGeometry) {
        const texture = new CanvasTexture(canvas);
        const textureMaterial = new ShaderMaterial({
            vertexShader: /* glsl */`
        varying vec2 vUv;
        uniform vec4 bbox;
        uniform vec2 textureSize;

        vec2 positionToLonLat(vec3 position) {
          float pi = 3.141592653589793;

          float latRad = asin(position.y / length(position));
          float latDeg = 180.0 * latRad / pi;

          float lonRad = asin(position.x / length(position.xz));
          float lonDeg = 180.0 * lonRad / pi;
          if (position.z <= 0.0) {
            lonDeg = 180.0 - lonDeg;
          }
          return vec2(lonDeg, latDeg);
        }

        void main() {
          vec2 lonLat = positionToLonLat(position);
          float u = (lonLat.x - bbox.x) / (bbox.z - bbox.x);
          float v = (lonLat.y - bbox.y) / (bbox.w - bbox.y);
          if  (u < 0.0) {
            u = ((360.0 + lonLat.x) - bbox.x) / (bbox.z - bbox.x);
          }
          if (u > 1.0) {
            u = ((lonLat.x - 360.0) - bbox.x) / (bbox.z - bbox.x);
          }
          vUv = vec2(u, v);
          gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
        }
        `,
            fragmentShader: /* glsl */`
        uniform sampler2D texture1;
        varying vec2 vUv;

        void main() {
          gl_FragColor = texture2D(texture1, vUv);
          if (vUv.x > 1.0 || vUv.x < 0.0 || vUv.y > 1.0 || vUv.y < 0.0) {
            gl_FragColor = vec4(0.3, 0.3, 0.3, 1.0); // <-- better: retrieve texture2D from *previous* texture.
          }
        }
        `,
            uniforms: {
                texture1: { value: texture },
                bbox: { value: [-180, -90, 180, 90] }
            }
        });
        super(geometry, textureMaterial);
    }

    perspectiveChanged(bbox: [number, number, number, number]) {
        // @ts-ignore
        (this.material as ShaderMaterial).uniforms.bbox.value = bbox;
        // @ts-ignore
        (this.material as ShaderMaterial).uniforms.texture1.value.needsUpdate = true;
    }
}


