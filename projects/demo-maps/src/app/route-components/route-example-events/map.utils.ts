import { TGeoExtent } from '@ukis/map-ol';
import olFeature from 'ol/Feature';
import olPolygon from 'ol/geom/Polygon';
import { containsCoordinate } from 'ol/extent';
import { containsXY } from 'ol/extent';

import { buffer } from 'ol/extent';

/**
   * Inspired by @turf/rectangle-grid
   * https://github.com/Turfjs/turf/blob/master/packages/turf-rectangle-grid/index.ts
   * returns  olFeature<any>[]
   */
export const regularGrid = (bbox: TGeoExtent, cellSizeDeg: number, zoom: number, mapEPSG: string, mapExtent: TGeoExtent) => {
    /** olFeature */
    const features = [];

    let multiplyFactor = 80;
    if (zoom > 1) {
        multiplyFactor = 40;
    }
    if (zoom > 2) {
        multiplyFactor = 20;
    }
    if (zoom > 3) {
        multiplyFactor = 10;
    }
    if (zoom > 4) {
        multiplyFactor = 6;
    }
    if (zoom > 5) {
        multiplyFactor = 4;
    }
    if (zoom > 6) {
        multiplyFactor = 3;
    }
    if (zoom > 7) {
        multiplyFactor = 2;
    }
    if (zoom > 8) {
        multiplyFactor = 1;
    }

    const cellSizeZoom = cellSizeDeg * multiplyFactor;
    let border = 10;//cellSize * maxMultiplyFactor;
    if (border > 10) {
        border = 10;
    }

    /** buffer the extent with one cellSizeDeg */
    mapExtent = buffer(mapExtent, cellSizeZoom);

    // cut border from grid
    const minX = bbox[0] + border; //bbox[0];
    const minY = bbox[1] + border; //bbox[1];
    const maxX = bbox[2] - border; //bbox[2];
    const maxY = bbox[3] - border; //bbox[3];

    // console.log('zoom', zoom);
    // console.log('cellSizeDeg', cellSizeDeg)
    // console.log(minX, minY, maxX, maxY);

    // rows & columns
    const bboxWidth = (maxX - minX);
    const bboxHeight = (maxY - minY);
    const columns = Math.floor(bboxWidth / cellSizeZoom);
    const rows = Math.floor(bboxHeight / cellSizeZoom);

    // if the grid does not fill the bbox perfectly, center it.
    /* const deltaX = (bboxWidth - columns * cellSizeDeg) / 2;
    const deltaY = (bboxHeight - rows * cellSizeDeg) / 2; */
    /* const deltaX = cellSizeDeg / 2;
    const deltaY = cellSizeDeg / 2; */

    // iterate over columns & rows
    let currentX = minX; // + deltaX;
    for (let column = columns; column > 0; column--) {
        let currentY = minY; // + deltaY;
        for (let row = rows; row > 0; row--) {
            const nextX = currentX + cellSizeZoom;
            const nextY = currentY + cellSizeZoom;

            const cords1_5 = [currentX, currentY];
            const cords2 = [currentX, nextY];
            const cords3 = [nextX, nextY];
            const cords4 = [nextX, currentY]

            const coordinates = [[
                cords1_5,
                cords2,
                cords3,
                cords4,
                cords1_5,
            ]];
            console.log()
            //const inExtent = containsCoordinate(mapExtent, cords2) && containsCoordinate(mapExtent, cords4);
            const inExtent = containsXY(mapExtent, currentX, currentY) && containsXY(mapExtent, nextX, nextY);
            if (inExtent) {

                const cellPoly = new olPolygon(coordinates).transform('EPSG:4326', mapEPSG);
                const feature = new olFeature({
                    geometry: cellPoly,
                    column: column,
                    row: row,
                    id: features.length + 1
                });

                features.push(feature);
            }
            // ---
            currentY += cellSizeZoom;
        }
        currentX += cellSizeZoom;
    }
    return features;
}