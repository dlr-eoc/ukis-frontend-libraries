import { TestBed, async } from '@angular/core/testing';
import { RasterLayer, Layer, VectorLayer, CustomLayer, TGeoExtent } from './Layers';
import { LayerGroup } from './LayerGroup';


let layer: Layer, rasterlayer: RasterLayer, vectorlayer: VectorLayer, customlayer: CustomLayer, layergroup: LayerGroup;


describe('LayersService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({});

        rasterlayer = new RasterLayer({
            id: 'ID-raster',
            name: 'raster',
            type: 'wms',
            url: '//geoservice.dlr.de/eoc/basemap/wms',
            removable: true,
            visible: true,
            params: {
                layers: 'litemap'
            }
        });

        vectorlayer = new VectorLayer({
            id: 'ID-vector',
            name: 'vector',
            type: 'geojson',
            data: {},
            visible: false
        });

        customlayer = new CustomLayer({
            id: 'ID-custom',
            type: 'custom',
            name: 'custom',
            custom_layer: {}
        });
    });

    it('should created a default Layer with options merged', () => {
        const id = 'ID-layer',
            type = 'xyz',
            name = 'layer',
            opacity = 0.5,
            bbox: TGeoExtent = [-180, -90, 180, 90];

        const _layer = new Layer({
            id: id,
            type: type,
            name: name,
            opacity: opacity,
            bbox: bbox
        });

        /** mandatory */
        expect(_layer.id).toBe(id);
        expect(_layer.name).toBe(name);
        expect(_layer.type).toBe(type);

        /** optional or defaults */
        expect(_layer.opacity).toBe(opacity);
        expect(_layer.visible).toBe(true);
        expect(_layer.removable).toBe(false);
        expect(_layer.filtertype).toBe('Layers');
        expect(_layer.continuousWorld).toBe(false);

        expect(_layer.attribution).toBe(undefined);
        expect(_layer.displayName).toBe(undefined);
        expect(_layer.description).toBe(undefined);
        expect(_layer.time).toBe(undefined);
        expect(_layer.minResolution).toBe(undefined);
        expect(_layer.maxResolution).toBe(undefined);
        expect(_layer.legendImg).toBe(undefined);
        expect(_layer.bbox).toBe(bbox);
        expect(_layer.dimensions).toBe(undefined);
        expect(_layer.popup).toBe(undefined);
        expect(_layer.actions).toBe(undefined);
        expect(_layer.styles).toBe(undefined);
        expect(_layer.crossOrigin).toBe(undefined);
    });


    it('should created a RasterLayer with options merged', () => {
        const id = 'ID-raster', name = 'raster',
            type = 'wms',
            url = '//geoservice.dlr.de/eoc/basemap/wms',
            removable = true,
            visible = true,
            params = {
                layers: 'litemap'
            };

        const _rasterlayer = new RasterLayer({
            id: id,
            name: name,
            type: type,
            url: url,
            removable: removable,
            visible: visible,
            params: params
        });

        /** mandatory */
        expect(_rasterlayer.id).toBe(id);
        expect(_rasterlayer.name).toBe(name);
        expect(_rasterlayer.type).toBe(type);

        /** optional or defaults */
        expect(_rasterlayer.opacity).toBe(1);
        expect(_rasterlayer.visible).toBe(visible);
        expect(_rasterlayer.removable).toBe(removable);
        expect(_rasterlayer.filtertype).toBe('Layers');
        expect(_rasterlayer.continuousWorld).toBe(false);

        expect(_rasterlayer.attribution).toBe(undefined);
        expect(_rasterlayer.displayName).toBe(undefined);
        expect(_rasterlayer.description).toBe(undefined);
        expect(_rasterlayer.time).toBe(undefined);
        expect(_rasterlayer.minResolution).toBe(undefined);
        expect(_rasterlayer.maxResolution).toBe(undefined);
        expect(_rasterlayer.legendImg).toBe(undefined);
        expect(_rasterlayer.bbox).toBe(undefined);
        expect(_rasterlayer.dimensions).toBe(undefined);
        expect(_rasterlayer.popup).toBe(undefined);
        expect(_rasterlayer.actions).toBe(undefined);
        expect(_rasterlayer.styles).toBe(undefined);
        expect(_rasterlayer.crossOrigin).toBe(undefined);

        /** raster specific */
        expect(_rasterlayer.url).toBe(url);
        expect(_rasterlayer.subdomains).toBe(undefined);
        expect(_rasterlayer.params).toBe(params);
        expect(_rasterlayer.tileSize).toBe(undefined);
    });


    it('should created a VectorLayer with options merged', () => {
        const id = 'ID-vector', name = 'vector',
            type = 'geojson',
            visible = true,
            data = { 'Feature': {} },
            cluster = true,
            options = { style: () => { } };



        const _rasterlayer = new VectorLayer({
            id: id,
            name: name,
            type: type,
            data: data,
            cluster: cluster,
            options: options
        });

        /** mandatory */
        expect(_rasterlayer.id).toBe(id);
        expect(_rasterlayer.name).toBe(name);
        expect(_rasterlayer.type).toBe(type);

        /** optional or defaults */
        expect(_rasterlayer.opacity).toBe(1);
        expect(_rasterlayer.visible).toBe(visible);
        expect(_rasterlayer.removable).toBe(false);
        expect(_rasterlayer.filtertype).toBe('Layers');
        expect(_rasterlayer.continuousWorld).toBe(false);

        expect(_rasterlayer.attribution).toBe(undefined);
        expect(_rasterlayer.displayName).toBe(undefined);
        expect(_rasterlayer.description).toBe(undefined);
        expect(_rasterlayer.time).toBe(undefined);
        expect(_rasterlayer.minResolution).toBe(undefined);
        expect(_rasterlayer.maxResolution).toBe(undefined);
        expect(_rasterlayer.legendImg).toBe(undefined);
        expect(_rasterlayer.bbox).toBe(undefined);
        expect(_rasterlayer.dimensions).toBe(undefined);
        expect(_rasterlayer.popup).toBe(undefined);
        expect(_rasterlayer.actions).toBe(undefined);
        expect(_rasterlayer.styles).toBe(undefined);
        expect(_rasterlayer.crossOrigin).toBe(undefined);

        /** vector specific */
        expect(_rasterlayer.data).toBe(data);
        expect(_rasterlayer.url).toBe(undefined);
        expect(_rasterlayer.subdomains).toBe(undefined);
        expect(_rasterlayer.options).toBe(options);
        expect(_rasterlayer.cluster).toBe(cluster);
    });


    it('should created a LayerGroup with options merged', () => {
        const id = 'ID-group', name = 'group',
            visible = true,
            filtertype = 'Overlays',
            layers = [rasterlayer, vectorlayer, customlayer];



        const _rasterlayer = new LayerGroup({
            id: id,
            visible: visible, // set visible on each layer
            name: name,
            filtertype: filtertype,
            layers: layers
        });

        /** mandatory */
        expect(_rasterlayer.id).toBe(id);
        expect(_rasterlayer.name).toBe(name);
        expect(_rasterlayer.layers.length).toBe(layers.length);
        // is set by visible in options ---
        _rasterlayer.layers.forEach(l => {
            expect(l.visible).toBe(visible);
        });
        // also on object reference
        layers.forEach(l => {
            expect(l.visible).toBe(visible);
        });
        // ---------------------------------

        /** optional or defaults */
        expect(_rasterlayer.visible).toBe(visible);
        expect(_rasterlayer.removable).toBe(true);
        expect(_rasterlayer.layerRemovable).toBe(true);
        expect(_rasterlayer.filtertype).toBe(filtertype);

        expect(_rasterlayer.displayName).toBe(undefined);
        expect(_rasterlayer.description).toBe(undefined);
        expect(_rasterlayer.bbox).toBe(undefined);
        expect(_rasterlayer.actions).toBe(undefined);
    });
});