import { TestBed, getTestBed } from '@angular/core/testing/';
import { WmtsClientService } from './wmtsclient.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';



describe('WmtsClientService: reading data from server', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
  });

  afterEach(() => {
  });

  it('#WmtsClientService: GetCapabilities should work', (done) => {
    const http: HttpTestingController = TestBed.get(HttpTestingController);
    const service: WmtsClientService = TestBed.get(WmtsClientService);
    const url = 'https://theserver.com';

    service.getCapabilities(url).subscribe((capabilities: object) => {
        console.log(capabilities);
        expect(capabilities).toBeTruthy();
        done();
    });

    const request = http.expectOne('https://theserver.com?SERVICE=WMTS&REQUEST=GetCapabilities&VERSION=1.1.0');
    request.flush(`
    <Capabilities xmlns="http://www.opengis.net/wmts/1.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:gml="http://www.opengis.net/gml" xsi:schemaLocation="http://www.opengis.net/wmts/1.0 http://schemas.opengis.net/wmts/1.0/wmtsGetCapabilities_response.xsd" version="1.0.0">
      <ows:ServiceIdentification>
        <ows:Title>Web Map Tile Service - GeoWebCache</ows:Title>
        <ows:ServiceType>OGC WMTS</ows:ServiceType>
        <ows:ServiceTypeVersion>1.0.0</ows:ServiceTypeVersion>
      </ows:ServiceIdentification>
      <ows:ServiceProvider>
        <ows:ProviderName>https://tiles.geoservice.dlr.de/service/wmts</ows:ProviderName>
        <ows:ProviderSite xlink:href="https://tiles.geoservice.dlr.de/service/wmts"/>
        <ows:ServiceContact>
          <ows:IndividualName>GeoWebCache User</ows:IndividualName>
        </ows:ServiceContact>
      </ows:ServiceProvider>
      <ows:OperationsMetadata>
        <ows:Operation name="GetCapabilities">
          <ows:DCP>
            <ows:HTTP>
              <ows:Get xlink:href="https://tiles.geoservice.dlr.de/service/wmts?">
                <ows:Constraint name="GetEncoding">
                  <ows:AllowedValues>
                    <ows:Value>KVP</ows:Value>
                  </ows:AllowedValues>
                </ows:Constraint>
              </ows:Get>
            </ows:HTTP>
          </ows:DCP>
        </ows:Operation>
        <ows:Operation name="GetTile">
          <ows:DCP>
            <ows:HTTP>
              <ows:Get xlink:href="https://tiles.geoservice.dlr.de/service/wmts?">
                <ows:Constraint name="GetEncoding">
                  <ows:AllowedValues>
                    <ows:Value>KVP</ows:Value>
                  </ows:AllowedValues>
                </ows:Constraint>
              </ows:Get>
            </ows:HTTP>
          </ows:DCP>
        </ows:Operation>
        <ows:Operation name="GetFeatureInfo">
          <ows:DCP>
            <ows:HTTP>
              <ows:Get xlink:href="https://tiles.geoservice.dlr.de/service/wmts?">
                <ows:Constraint name="GetEncoding">
                  <ows:AllowedValues>
                    <ows:Value>KVP</ows:Value>
                  </ows:AllowedValues>
                </ows:Constraint>
              </ows:Get>
            </ows:HTTP>
          </ows:DCP>
        </ows:Operation>
      </ows:OperationsMetadata>
      <Contents>
        <Layer>
          <ows:Title>EOC Basemap</ows:Title>
          <ows:Abstract>This is the basemap for DLR Service Portals</ows:Abstract>
          <ows:WGS84BoundingBox>
            <ows:LowerCorner>-180.0 -90.0</ows:LowerCorner>
            <ows:UpperCorner>180.0 90.0</ows:UpperCorner>
          </ows:WGS84BoundingBox>
          <ows:Identifier>eoc:basemap</ows:Identifier>
          <Style isDefault="true">
            <ows:Identifier>_empty</ows:Identifier>
          </Style>
          <Format>image/png</Format>
          <Format>application/vnd.google-earth.kml+xml</Format>
          <Format>application/vnd.mapbox-vector-tile</Format>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:3031</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:3857</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EU_EXT:3035:512</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:4326</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:3035:512</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EU:3035:512</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EU:3035</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:3995</TileMatrixSet>
          </TileMatrixSetLink>
          <ResourceURL format="image/png" resourceType="tile" template="https://tiles.geoservice.dlr.de/rest/wmts/eoc:basemap/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}?format=image/png"/>
          <ResourceURL format="application/vnd.google-earth.kml+xml" resourceType="tile" template="https://tiles.geoservice.dlr.de/rest/wmts/eoc:basemap/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}?format=application/vnd.google-earth.kml+xml"/>
          <ResourceURL format="application/vnd.mapbox-vector-tile" resourceType="tile" template="https://tiles.geoservice.dlr.de/rest/wmts/eoc:basemap/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}?format=application/vnd.mapbox-vector-tile"/>
          <ResourceURL format="text/plain" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/eoc:basemap/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/plain"/>
          <ResourceURL format="text/html" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/eoc:basemap/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/html"/>
          <ResourceURL format="application/vnd.ogc.gml" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/eoc:basemap/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=application/vnd.ogc.gml"/>
        </Layer>
        <Layer>
          <ows:Title>EOC Baseoverlay</ows:Title>
          <ows:Abstract>This is the baseoverlay for DLR Service Portals</ows:Abstract>
          <ows:WGS84BoundingBox>
            <ows:LowerCorner>-180.0 -90.0</ows:LowerCorner>
            <ows:UpperCorner>180.0 90.0</ows:UpperCorner>
          </ows:WGS84BoundingBox>
          <ows:Identifier>eoc:baseoverlay</ows:Identifier>
          <Style isDefault="true">
            <ows:Identifier>_empty</ows:Identifier>
          </Style>
          <Format>image/png</Format>
          <Format>application/vnd.google-earth.kml+xml</Format>
          <Format>application/vnd.mapbox-vector-tile</Format>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:3031</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:3857</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:4326</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EU:3035:512</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EU:3035</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:3995</TileMatrixSet>
          </TileMatrixSetLink>
          <ResourceURL format="image/png" resourceType="tile" template="https://tiles.geoservice.dlr.de/rest/wmts/eoc:baseoverlay/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}?format=image/png"/>
          <ResourceURL format="application/vnd.google-earth.kml+xml" resourceType="tile" template="https://tiles.geoservice.dlr.de/rest/wmts/eoc:baseoverlay/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}?format=application/vnd.google-earth.kml+xml"/>
          <ResourceURL format="application/vnd.mapbox-vector-tile" resourceType="tile" template="https://tiles.geoservice.dlr.de/rest/wmts/eoc:baseoverlay/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}?format=application/vnd.mapbox-vector-tile"/>
          <ResourceURL format="text/plain" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/eoc:baseoverlay/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/plain"/>
          <ResourceURL format="text/html" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/eoc:baseoverlay/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/html"/>
          <ResourceURL format="application/vnd.ogc.gml" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/eoc:baseoverlay/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=application/vnd.ogc.gml"/>
        </Layer>
        <Layer>
          <ows:Title>EOC Litemap</ows:Title>
          <ows:Abstract>This is the litemap provided for EOC Service Portals</ows:Abstract>
          <ows:WGS84BoundingBox>
            <ows:LowerCorner>-180.0 -90.0</ows:LowerCorner>
            <ows:UpperCorner>180.0 90.0</ows:UpperCorner>
          </ows:WGS84BoundingBox>
          <ows:Identifier>eoc:litemap</ows:Identifier>
          <Style isDefault="true">
            <ows:Identifier>_empty</ows:Identifier>
          </Style>
          <Format>image/png</Format>
          <Format>application/vnd.mapbox-vector-tile</Format>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:3031</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:3857</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:4326</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EU:3035:512</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EU:3035</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:3995</TileMatrixSet>
          </TileMatrixSetLink>
          <ResourceURL format="image/png" resourceType="tile" template="https://tiles.geoservice.dlr.de/rest/wmts/eoc:litemap/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}?format=image/png"/>
          <ResourceURL format="application/vnd.mapbox-vector-tile" resourceType="tile" template="https://tiles.geoservice.dlr.de/rest/wmts/eoc:litemap/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}?format=application/vnd.mapbox-vector-tile"/>
          <ResourceURL format="text/plain" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/eoc:litemap/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/plain"/>
          <ResourceURL format="text/html" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/eoc:litemap/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/html"/>
          <ResourceURL format="application/vnd.ogc.gml" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/eoc:litemap/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=application/vnd.ogc.gml"/>
        </Layer>
        <Layer>
          <ows:Title>EOC Litemap</ows:Title>
          <ows:Abstract>This is the liteoverlay provided for EOC Service Portals</ows:Abstract>
          <ows:WGS84BoundingBox>
            <ows:LowerCorner>-180.0 -90.0</ows:LowerCorner>
            <ows:UpperCorner>180.0 90.0</ows:UpperCorner>
          </ows:WGS84BoundingBox>
          <ows:Identifier>eoc:liteoverlay</ows:Identifier>
          <Style isDefault="true">
            <ows:Identifier>_empty</ows:Identifier>
          </Style>
          <Format>image/png</Format>
          <Format>application/vnd.mapbox-vector-tile</Format>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:3031</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:3857</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:4326</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EU:3035:512</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EU:3035</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:3995</TileMatrixSet>
          </TileMatrixSetLink>
          <ResourceURL format="image/png" resourceType="tile" template="https://tiles.geoservice.dlr.de/rest/wmts/eoc:liteoverlay/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}?format=image/png"/>
          <ResourceURL format="application/vnd.mapbox-vector-tile" resourceType="tile" template="https://tiles.geoservice.dlr.de/rest/wmts/eoc:liteoverlay/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}?format=application/vnd.mapbox-vector-tile"/>
          <ResourceURL format="text/plain" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/eoc:liteoverlay/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/plain"/>
          <ResourceURL format="text/html" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/eoc:liteoverlay/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/html"/>
          <ResourceURL format="application/vnd.ogc.gml" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/eoc:liteoverlay/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=application/vnd.ogc.gml"/>
        </Layer>
        <Layer>
          <ows:Title>Blue Marble NG with topo/bathy</ows:Title>
          <ows:Abstract>Blue Marble NG dataset with topography and bathymetry</ows:Abstract>
          <ows:WGS84BoundingBox>
            <ows:LowerCorner>-180.0 -90.0</ows:LowerCorner>
            <ows:UpperCorner>180.0 90.0</ows:UpperCorner>
          </ows:WGS84BoundingBox>
          <ows:Identifier>bmng_topo_bathy</ows:Identifier>
          <Style isDefault="true">
            <ows:Identifier>_empty</ows:Identifier>
          </Style>
          <Format>image/jpeg</Format>
          <Format>image/png</Format>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:3031</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:3857</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EU_EXT:3035:512</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:4326</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EU:3035:512</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EU:3035</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:3995</TileMatrixSet>
          </TileMatrixSetLink>
          <ResourceURL format="image/jpeg" resourceType="tile" template="https://tiles.geoservice.dlr.de/rest/wmts/bmng_topo_bathy/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}?format=image/jpeg"/>
          <ResourceURL format="image/png" resourceType="tile" template="https://tiles.geoservice.dlr.de/rest/wmts/bmng_topo_bathy/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}?format=image/png"/>
          <ResourceURL format="text/plain" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/bmng_topo_bathy/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/plain"/>
          <ResourceURL format="text/html" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/bmng_topo_bathy/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/html"/>
          <ResourceURL format="application/vnd.ogc.gml" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/bmng_topo_bathy/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=application/vnd.ogc.gml"/>
        </Layer>
        <Layer>
          <ows:Title>World Relief B/W</ows:Title>
          <ows:Abstract>World Relief Black / White</ows:Abstract>
          <ows:WGS84BoundingBox>
            <ows:LowerCorner>-180.0 -90.0</ows:LowerCorner>
            <ows:UpperCorner>180.0 90.0</ows:UpperCorner>
          </ows:WGS84BoundingBox>
          <ows:Identifier>eoc:world_relief_bw</ows:Identifier>
          <Style isDefault="true">
            <ows:Identifier>_empty</ows:Identifier>
          </Style>
          <Format>image/jpeg</Format>
          <Format>image/png</Format>
          <Format>image/png8</Format>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:3031</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:3857</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EU_EXT:3035:512</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:4326</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EU:3035:512</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EU:3035</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:3995</TileMatrixSet>
          </TileMatrixSetLink>
          <ResourceURL format="image/jpeg" resourceType="tile" template="https://tiles.geoservice.dlr.de/rest/wmts/eoc:world_relief_bw/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}?format=image/jpeg"/>
          <ResourceURL format="image/png" resourceType="tile" template="https://tiles.geoservice.dlr.de/rest/wmts/eoc:world_relief_bw/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}?format=image/png"/>
          <ResourceURL format="image/png8" resourceType="tile" template="https://tiles.geoservice.dlr.de/rest/wmts/eoc:world_relief_bw/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}?format=image/png8"/>
          <ResourceURL format="text/plain" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/eoc:world_relief_bw/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/plain"/>
          <ResourceURL format="text/html" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/eoc:world_relief_bw/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/html"/>
          <ResourceURL format="application/vnd.ogc.gml" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/eoc:world_relief_bw/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=application/vnd.ogc.gml"/>
        </Layer>
        <Layer>
          <ows:Title>MODIS EU DAILY</ows:Title>
          <ows:Abstract>MODIS EU DAILY</ows:Abstract>
          <ows:WGS84BoundingBox>
            <ows:LowerCorner>-180.0 -90.0</ows:LowerCorner>
            <ows:UpperCorner>180.0 90.0</ows:UpperCorner>
          </ows:WGS84BoundingBox>
          <ows:Identifier>MODIS_EU_DAILY</ows:Identifier>
          <Style isDefault="true">
            <ows:Identifier/>
          </Style>
          <Format>image/jpeg</Format>
          <Format>image/png</Format>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:4326</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EU:3035:512</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EU:3035</TileMatrixSet>
          </TileMatrixSetLink>
          <ResourceURL format="image/jpeg" resourceType="tile" template="https://tiles.geoservice.dlr.de/rest/wmts/MODIS_EU_DAILY/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}?format=image/jpeg"/>
          <ResourceURL format="image/png" resourceType="tile" template="https://tiles.geoservice.dlr.de/rest/wmts/MODIS_EU_DAILY/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}?format=image/png"/>
          <ResourceURL format="text/plain" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/MODIS_EU_DAILY/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/plain"/>
          <ResourceURL format="text/html" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/MODIS_EU_DAILY/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/html"/>
          <ResourceURL format="application/vnd.ogc.gml" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/MODIS_EU_DAILY/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=application/vnd.ogc.gml"/>
        </Layer>
        <Layer>
          <ows:Title>Hillshade</ows:Title>
          <ows:Abstract>Global Hillshade based on GMTED2010</ows:Abstract>
          <ows:WGS84BoundingBox>
            <ows:LowerCorner>-180.0 -90.0</ows:LowerCorner>
            <ows:UpperCorner>180.0 90.0</ows:UpperCorner>
          </ows:WGS84BoundingBox>
          <ows:Identifier>hillshade</ows:Identifier>
          <Style isDefault="true">
            <ows:Identifier>_empty</ows:Identifier>
          </Style>
          <Format>image/png</Format>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:3857</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:4326</TileMatrixSet>
          </TileMatrixSetLink>
          <ResourceURL format="image/png" resourceType="tile" template="https://tiles.geoservice.dlr.de/rest/wmts/hillshade/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}?format=image/png"/>
          <ResourceURL format="text/plain" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/hillshade/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/plain"/>
          <ResourceURL format="text/html" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/hillshade/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/html"/>
          <ResourceURL format="application/vnd.ogc.gml" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/hillshade/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=application/vnd.ogc.gml"/>
        </Layer>
        <Layer>
          <ows:Title>GUF04_DLR_v1_Mosaic (scientific use only)</ows:Title>
          <ows:Abstract>GUF04_DLR_v1_Mosaic (scientific use only)</ows:Abstract>
          <ows:WGS84BoundingBox>
            <ows:LowerCorner>-180.0 -90.0</ows:LowerCorner>
            <ows:UpperCorner>180.0 90.0</ows:UpperCorner>
          </ows:WGS84BoundingBox>
          <ows:Identifier>GUF04_DLR_v1_Mosaic</ows:Identifier>
          <Style isDefault="true">
            <ows:Identifier>guf_8bit</ows:Identifier>
          </Style>
          <Format>image/png</Format>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:3857</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:4326</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EU:3035</TileMatrixSet>
          </TileMatrixSetLink>
          <ResourceURL format="image/png" resourceType="tile" template="https://tiles.geoservice.dlr.de/rest/wmts/GUF04_DLR_v1_Mosaic/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}?format=image/png"/>
          <ResourceURL format="text/plain" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/GUF04_DLR_v1_Mosaic/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/plain"/>
          <ResourceURL format="text/html" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/GUF04_DLR_v1_Mosaic/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/html"/>
          <ResourceURL format="application/vnd.ogc.gml" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/GUF04_DLR_v1_Mosaic/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=application/vnd.ogc.gml"/>
        </Layer>
        <Layer>
          <ows:Title>TDM90 Elevation (DEM)</ows:Title>
          <ows:Abstract>TDM90 Elevation (DEM)</ows:Abstract>
          <ows:WGS84BoundingBox>
            <ows:LowerCorner>-180.0 -90.0</ows:LowerCorner>
            <ows:UpperCorner>180.0 90.0</ows:UpperCorner>
          </ows:WGS84BoundingBox>
          <ows:Identifier>TDM90_DEM</ows:Identifier>
          <Style isDefault="true">
            <ows:Identifier/>
          </Style>
          <Format>image/png</Format>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:3857</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:4326</TileMatrixSet>
          </TileMatrixSetLink>
          <ResourceURL format="image/png" resourceType="tile" template="https://tiles.geoservice.dlr.de/rest/wmts/TDM90_DEM/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}?format=image/png"/>
          <ResourceURL format="text/plain" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/TDM90_DEM/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/plain"/>
          <ResourceURL format="text/html" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/TDM90_DEM/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/html"/>
          <ResourceURL format="application/vnd.ogc.gml" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/TDM90_DEM/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=application/vnd.ogc.gml"/>
        </Layer>
        <Layer>
          <ows:Title>TDM90 Height Error Map (HEM)</ows:Title>
          <ows:Abstract>TDM90 Height Error Map (HEM)</ows:Abstract>
          <ows:WGS84BoundingBox>
            <ows:LowerCorner>-180.0 -90.0</ows:LowerCorner>
            <ows:UpperCorner>180.0 90.0</ows:UpperCorner>
          </ows:WGS84BoundingBox>
          <ows:Identifier>TDM90_HEM</ows:Identifier>
          <Style isDefault="true">
            <ows:Identifier/>
          </Style>
          <Format>image/png</Format>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:3857</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:4326</TileMatrixSet>
          </TileMatrixSetLink>
          <ResourceURL format="image/png" resourceType="tile" template="https://tiles.geoservice.dlr.de/rest/wmts/TDM90_HEM/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}?format=image/png"/>
          <ResourceURL format="text/plain" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/TDM90_HEM/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/plain"/>
          <ResourceURL format="text/html" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/TDM90_HEM/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/html"/>
          <ResourceURL format="application/vnd.ogc.gml" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/TDM90_HEM/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=application/vnd.ogc.gml"/>
        </Layer>
        <Layer>
          <ows:Title>TDM90 Amplitude Min (AM2)</ows:Title>
          <ows:Abstract>TDM90 Amplitude Min (AM2)</ows:Abstract>
          <ows:WGS84BoundingBox>
            <ows:LowerCorner>-180.0 -90.0</ows:LowerCorner>
            <ows:UpperCorner>180.0 90.0</ows:UpperCorner>
          </ows:WGS84BoundingBox>
          <ows:Identifier>TDM90_AM2</ows:Identifier>
          <Style isDefault="true">
            <ows:Identifier/>
          </Style>
          <Format>image/png</Format>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:3857</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:4326</TileMatrixSet>
          </TileMatrixSetLink>
          <ResourceURL format="image/png" resourceType="tile" template="https://tiles.geoservice.dlr.de/rest/wmts/TDM90_AM2/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}?format=image/png"/>
          <ResourceURL format="text/plain" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/TDM90_AM2/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/plain"/>
          <ResourceURL format="text/html" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/TDM90_AM2/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/html"/>
          <ResourceURL format="application/vnd.ogc.gml" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/TDM90_AM2/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=application/vnd.ogc.gml"/>
        </Layer>
        <Layer>
          <ows:Title>TDM90 Amplitude Min (AMP)</ows:Title>
          <ows:Abstract>TDM90 Amplitude Min (AMP)</ows:Abstract>
          <ows:WGS84BoundingBox>
            <ows:LowerCorner>-180.0 -90.0</ows:LowerCorner>
            <ows:UpperCorner>180.0 90.0</ows:UpperCorner>
          </ows:WGS84BoundingBox>
          <ows:Identifier>TDM90_AMP</ows:Identifier>
          <Style isDefault="true">
            <ows:Identifier/>
          </Style>
          <Format>image/png</Format>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:3857</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:4326</TileMatrixSet>
          </TileMatrixSetLink>
          <ResourceURL format="image/png" resourceType="tile" template="https://tiles.geoservice.dlr.de/rest/wmts/TDM90_AMP/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}?format=image/png"/>
          <ResourceURL format="text/plain" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/TDM90_AMP/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/plain"/>
          <ResourceURL format="text/html" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/TDM90_AMP/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/html"/>
          <ResourceURL format="application/vnd.ogc.gml" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/TDM90_AMP/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=application/vnd.ogc.gml"/>
        </Layer>
        <Layer>
          <ows:Title>TDM90 Consistency Map (COM)</ows:Title>
          <ows:Abstract>TDM90 Consistency Map (COM)</ows:Abstract>
          <ows:WGS84BoundingBox>
            <ows:LowerCorner>-180.0 -90.0</ows:LowerCorner>
            <ows:UpperCorner>180.0 90.0</ows:UpperCorner>
          </ows:WGS84BoundingBox>
          <ows:Identifier>TDM90_COM</ows:Identifier>
          <Style isDefault="true">
            <ows:Identifier/>
          </Style>
          <Format>image/png</Format>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:3857</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:4326</TileMatrixSet>
          </TileMatrixSetLink>
          <ResourceURL format="image/png" resourceType="tile" template="https://tiles.geoservice.dlr.de/rest/wmts/TDM90_COM/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}?format=image/png"/>
          <ResourceURL format="text/plain" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/TDM90_COM/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/plain"/>
          <ResourceURL format="text/html" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/TDM90_COM/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/html"/>
          <ResourceURL format="application/vnd.ogc.gml" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/TDM90_COM/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=application/vnd.ogc.gml"/>
        </Layer>
        <Layer>
          <ows:Title>TDM90 Coverage Map (COV)</ows:Title>
          <ows:Abstract>TDM90 Coverage Map (COV)</ows:Abstract>
          <ows:WGS84BoundingBox>
            <ows:LowerCorner>-180.0 -90.0</ows:LowerCorner>
            <ows:UpperCorner>180.0 90.0</ows:UpperCorner>
          </ows:WGS84BoundingBox>
          <ows:Identifier>TDM90_COV</ows:Identifier>
          <Style isDefault="true">
            <ows:Identifier/>
          </Style>
          <Format>image/png</Format>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:3857</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:4326</TileMatrixSet>
          </TileMatrixSetLink>
          <ResourceURL format="image/png" resourceType="tile" template="https://tiles.geoservice.dlr.de/rest/wmts/TDM90_COV/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}?format=image/png"/>
          <ResourceURL format="text/plain" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/TDM90_COV/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/plain"/>
          <ResourceURL format="text/html" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/TDM90_COV/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/html"/>
          <ResourceURL format="application/vnd.ogc.gml" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/TDM90_COV/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=application/vnd.ogc.gml"/>
        </Layer>
        <Layer>
          <ows:Title>TDM90 Layover &amp; Shadow Mask Mosaic (LSM)</ows:Title>
          <ows:Abstract>TDM90 Layover &amp; Shadow Mask Mosaic (LSM)</ows:Abstract>
          <ows:WGS84BoundingBox>
            <ows:LowerCorner>-180.0 -90.0</ows:LowerCorner>
            <ows:UpperCorner>180.0 90.0</ows:UpperCorner>
          </ows:WGS84BoundingBox>
          <ows:Identifier>TDM90_LSM</ows:Identifier>
          <Style isDefault="true">
            <ows:Identifier/>
          </Style>
          <Format>image/png</Format>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:3857</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:4326</TileMatrixSet>
          </TileMatrixSetLink>
          <ResourceURL format="image/png" resourceType="tile" template="https://tiles.geoservice.dlr.de/rest/wmts/TDM90_LSM/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}?format=image/png"/>
          <ResourceURL format="text/plain" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/TDM90_LSM/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/plain"/>
          <ResourceURL format="text/html" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/TDM90_LSM/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/html"/>
          <ResourceURL format="application/vnd.ogc.gml" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/TDM90_LSM/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=application/vnd.ogc.gml"/>
        </Layer>
        <Layer>
          <ows:Title>TDM90 Water Indication Mask (WAM)</ows:Title>
          <ows:Abstract>TDM90 Water Indication Mask (WAM)</ows:Abstract>
          <ows:WGS84BoundingBox>
            <ows:LowerCorner>-180.0 -90.0</ows:LowerCorner>
            <ows:UpperCorner>180.0 90.0</ows:UpperCorner>
          </ows:WGS84BoundingBox>
          <ows:Identifier>TDM90_WAM</ows:Identifier>
          <Style isDefault="true">
            <ows:Identifier/>
          </Style>
          <Format>image/png</Format>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:3857</TileMatrixSet>
          </TileMatrixSetLink>
          <TileMatrixSetLink>
            <TileMatrixSet>EPSG:4326</TileMatrixSet>
          </TileMatrixSetLink>
          <ResourceURL format="image/png" resourceType="tile" template="https://tiles.geoservice.dlr.de/rest/wmts/TDM90_WAM/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}?format=image/png"/>
          <ResourceURL format="text/plain" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/TDM90_WAM/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/plain"/>
          <ResourceURL format="text/html" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/TDM90_WAM/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=text/html"/>
          <ResourceURL format="application/vnd.ogc.gml" resourceType="FeatureInfo" template="https://tiles.geoservice.dlr.de/rest/wmts/TDM90_WAM/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}/{J}/{I}?format=application/vnd.ogc.gml"/>
        </Layer>
        <TileMatrixSet>
          <ows:Identifier>EPSG:3031</ows:Identifier>
          <ows:SupportedCRS>urn:ogc:def:crs:EPSG::3031</ows:SupportedCRS>
          <TileMatrix>
            <ows:Identifier>EPSG:3031:0</ows:Identifier>
            <ScaleDenominator>9.300039139593408E7</ScaleDenominator>
            <TopLeftCorner>-3333134.027630277 3333134.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>1</MatrixWidth>
            <MatrixHeight>1</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3031:1</ows:Identifier>
            <ScaleDenominator>4.650019569796704E7</ScaleDenominator>
            <TopLeftCorner>-3333134.027630277 3333134.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>2</MatrixWidth>
            <MatrixHeight>2</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3031:2</ows:Identifier>
            <ScaleDenominator>2.325009784898352E7</ScaleDenominator>
            <TopLeftCorner>-3333134.027630277 3333134.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>4</MatrixWidth>
            <MatrixHeight>4</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3031:3</ows:Identifier>
            <ScaleDenominator>1.162504892449176E7</ScaleDenominator>
            <TopLeftCorner>-3333134.027630277 3333134.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>8</MatrixWidth>
            <MatrixHeight>8</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3031:4</ows:Identifier>
            <ScaleDenominator>5812524.46224588</ScaleDenominator>
            <TopLeftCorner>-3333134.027630277 3333134.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>16</MatrixWidth>
            <MatrixHeight>16</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3031:5</ows:Identifier>
            <ScaleDenominator>2906262.23112294</ScaleDenominator>
            <TopLeftCorner>-3333134.027630277 3333134.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>32</MatrixWidth>
            <MatrixHeight>32</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3031:6</ows:Identifier>
            <ScaleDenominator>1453131.11556147</ScaleDenominator>
            <TopLeftCorner>-3333134.027630277 3333134.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>64</MatrixWidth>
            <MatrixHeight>64</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3031:7</ows:Identifier>
            <ScaleDenominator>726565.557780735</ScaleDenominator>
            <TopLeftCorner>-3333134.027630277 3333134.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>128</MatrixWidth>
            <MatrixHeight>128</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3031:8</ows:Identifier>
            <ScaleDenominator>363282.7788903675</ScaleDenominator>
            <TopLeftCorner>-3333134.027630277 3333134.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>256</MatrixWidth>
            <MatrixHeight>256</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3031:9</ows:Identifier>
            <ScaleDenominator>181641.38944518374</ScaleDenominator>
            <TopLeftCorner>-3333134.027630277 3333134.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>512</MatrixWidth>
            <MatrixHeight>512</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3031:10</ows:Identifier>
            <ScaleDenominator>90820.69472259187</ScaleDenominator>
            <TopLeftCorner>-3333134.027630277 3333134.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>1024</MatrixWidth>
            <MatrixHeight>1024</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3031:11</ows:Identifier>
            <ScaleDenominator>45410.347361295935</ScaleDenominator>
            <TopLeftCorner>-3333134.027630277 3333134.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>2048</MatrixWidth>
            <MatrixHeight>2048</MatrixHeight>
          </TileMatrix>
        </TileMatrixSet>
        <TileMatrixSet>
          <ows:Identifier>GlobalCRS84Pixel</ows:Identifier>
          <ows:SupportedCRS>urn:ogc:def:crs:EPSG::4326</ows:SupportedCRS>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Pixel:0</ows:Identifier>
            <ScaleDenominator>7.951392199519542E8</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>1</MatrixWidth>
            <MatrixHeight>1</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Pixel:1</ows:Identifier>
            <ScaleDenominator>3.975696099759771E8</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>2</MatrixWidth>
            <MatrixHeight>1</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Pixel:2</ows:Identifier>
            <ScaleDenominator>1.9878480498798856E8</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>3</MatrixWidth>
            <MatrixHeight>2</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Pixel:3</ows:Identifier>
            <ScaleDenominator>1.325232033253257E8</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>5</MatrixWidth>
            <MatrixHeight>3</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Pixel:4</ows:Identifier>
            <ScaleDenominator>6.626160166266285E7</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>9</MatrixWidth>
            <MatrixHeight>5</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Pixel:5</ows:Identifier>
            <ScaleDenominator>3.3130800831331424E7</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>17</MatrixWidth>
            <MatrixHeight>9</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Pixel:6</ows:Identifier>
            <ScaleDenominator>1.325232033253257E7</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>43</MatrixWidth>
            <MatrixHeight>22</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Pixel:7</ows:Identifier>
            <ScaleDenominator>6626160.166266285</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>85</MatrixWidth>
            <MatrixHeight>43</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Pixel:8</ows:Identifier>
            <ScaleDenominator>3313080.0831331424</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>169</MatrixWidth>
            <MatrixHeight>85</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Pixel:9</ows:Identifier>
            <ScaleDenominator>1656540.0415665712</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>338</MatrixWidth>
            <MatrixHeight>169</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Pixel:10</ows:Identifier>
            <ScaleDenominator>552180.0138555238</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>1013</MatrixWidth>
            <MatrixHeight>507</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Pixel:11</ows:Identifier>
            <ScaleDenominator>331308.00831331423</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>1688</MatrixWidth>
            <MatrixHeight>844</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Pixel:12</ows:Identifier>
            <ScaleDenominator>110436.00277110476</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>5063</MatrixWidth>
            <MatrixHeight>2532</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Pixel:13</ows:Identifier>
            <ScaleDenominator>55218.00138555238</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>10125</MatrixWidth>
            <MatrixHeight>5063</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Pixel:14</ows:Identifier>
            <ScaleDenominator>33130.80083133143</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>16875</MatrixWidth>
            <MatrixHeight>8438</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Pixel:15</ows:Identifier>
            <ScaleDenominator>11043.600277110474</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>50625</MatrixWidth>
            <MatrixHeight>25313</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Pixel:16</ows:Identifier>
            <ScaleDenominator>3313.080083133142</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>168750</MatrixWidth>
            <MatrixHeight>84375</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Pixel:17</ows:Identifier>
            <ScaleDenominator>1104.3600277110472</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>506250</MatrixWidth>
            <MatrixHeight>253125</MatrixHeight>
          </TileMatrix>
        </TileMatrixSet>
        <TileMatrixSet>
          <ows:Identifier>EPSG:3857</ows:Identifier>
          <ows:SupportedCRS>urn:ogc:def:crs:EPSG::3857</ows:SupportedCRS>
          <TileMatrix>
            <ows:Identifier>EPSG:3857:0</ows:Identifier>
            <ScaleDenominator>5.590822639508929E8</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>1</MatrixWidth>
            <MatrixHeight>1</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3857:1</ows:Identifier>
            <ScaleDenominator>2.7954113197544646E8</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>2</MatrixWidth>
            <MatrixHeight>2</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3857:2</ows:Identifier>
            <ScaleDenominator>1.3977056598772323E8</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>4</MatrixWidth>
            <MatrixHeight>4</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3857:3</ows:Identifier>
            <ScaleDenominator>6.988528299386162E7</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>8</MatrixWidth>
            <MatrixHeight>8</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3857:4</ows:Identifier>
            <ScaleDenominator>3.494264149693081E7</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>16</MatrixWidth>
            <MatrixHeight>16</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3857:5</ows:Identifier>
            <ScaleDenominator>1.7471320748465404E7</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>32</MatrixWidth>
            <MatrixHeight>32</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3857:6</ows:Identifier>
            <ScaleDenominator>8735660.374232702</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>64</MatrixWidth>
            <MatrixHeight>64</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3857:7</ows:Identifier>
            <ScaleDenominator>4367830.187116351</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>128</MatrixWidth>
            <MatrixHeight>128</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3857:8</ows:Identifier>
            <ScaleDenominator>2183915.0935581755</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>256</MatrixWidth>
            <MatrixHeight>256</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3857:9</ows:Identifier>
            <ScaleDenominator>1091957.5467790877</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>512</MatrixWidth>
            <MatrixHeight>512</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3857:10</ows:Identifier>
            <ScaleDenominator>545978.7733895439</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>1024</MatrixWidth>
            <MatrixHeight>1024</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3857:11</ows:Identifier>
            <ScaleDenominator>272989.38669477194</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>2048</MatrixWidth>
            <MatrixHeight>2048</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3857:12</ows:Identifier>
            <ScaleDenominator>136494.69334738597</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>4096</MatrixWidth>
            <MatrixHeight>4096</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3857:13</ows:Identifier>
            <ScaleDenominator>68247.34667369298</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>8192</MatrixWidth>
            <MatrixHeight>8192</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3857:14</ows:Identifier>
            <ScaleDenominator>34123.67333684649</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>16384</MatrixWidth>
            <MatrixHeight>16384</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3857:15</ows:Identifier>
            <ScaleDenominator>17061.836668423246</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>32768</MatrixWidth>
            <MatrixHeight>32768</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3857:16</ows:Identifier>
            <ScaleDenominator>8530.918334211623</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>65536</MatrixWidth>
            <MatrixHeight>65536</MatrixHeight>
          </TileMatrix>
        </TileMatrixSet>
        <TileMatrixSet>
          <ows:Identifier>EU_EXT:3035:512</ows:Identifier>
          <ows:SupportedCRS>urn:ogc:def:crs:EPSG::3035</ows:SupportedCRS>
          <TileMatrix>
            <ows:Identifier>EU_EXT:3035:512:0</ows:Identifier>
            <ScaleDenominator>9.068080357142858E7</ScaleDenominator>
            <TopLeftCorner>-2000000.0 1.2E7</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>1</MatrixWidth>
            <MatrixHeight>1</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU_EXT:3035:512:1</ows:Identifier>
            <ScaleDenominator>4.534040178571429E7</ScaleDenominator>
            <TopLeftCorner>-2000000.0 1.2E7</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>2</MatrixWidth>
            <MatrixHeight>2</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU_EXT:3035:512:2</ows:Identifier>
            <ScaleDenominator>2.2670200892857146E7</ScaleDenominator>
            <TopLeftCorner>-2000000.0 8750000.0</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>4</MatrixWidth>
            <MatrixHeight>3</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU_EXT:3035:512:3</ows:Identifier>
            <ScaleDenominator>1.1335100446428573E7</ScaleDenominator>
            <TopLeftCorner>-2000000.0 8750000.0</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>8</MatrixWidth>
            <MatrixHeight>6</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU_EXT:3035:512:4</ows:Identifier>
            <ScaleDenominator>5667550.223214286</ScaleDenominator>
            <TopLeftCorner>-2000000.0 8750000.0</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>16</MatrixWidth>
            <MatrixHeight>12</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU_EXT:3035:512:5</ows:Identifier>
            <ScaleDenominator>2833775.111607143</ScaleDenominator>
            <TopLeftCorner>-2000000.0 8343750.0</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>32</MatrixWidth>
            <MatrixHeight>23</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU_EXT:3035:512:6</ows:Identifier>
            <ScaleDenominator>1416887.5558035716</ScaleDenominator>
            <TopLeftCorner>-2000000.0 8140625.0</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>64</MatrixWidth>
            <MatrixHeight>45</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU_EXT:3035:512:7</ows:Identifier>
            <ScaleDenominator>708443.7779017858</ScaleDenominator>
            <TopLeftCorner>-2000000.0 8039063.0</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>128</MatrixWidth>
            <MatrixHeight>89</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU_EXT:3035:512:8</ows:Identifier>
            <ScaleDenominator>354221.8889508929</ScaleDenominator>
            <TopLeftCorner>-2000000.0 8039063.0</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>256</MatrixWidth>
            <MatrixHeight>178</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU_EXT:3035:512:9</ows:Identifier>
            <ScaleDenominator>177110.94447544645</ScaleDenominator>
            <TopLeftCorner>-2000000.0 8013672.0</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>512</MatrixWidth>
            <MatrixHeight>355</MatrixHeight>
          </TileMatrix>
        </TileMatrixSet>
        <TileMatrixSet>
          <ows:Identifier>EPSG:4326</ows:Identifier>
          <ows:SupportedCRS>urn:ogc:def:crs:EPSG::4326</ows:SupportedCRS>
          <TileMatrix>
            <ows:Identifier>EPSG:4326:0</ows:Identifier>
            <ScaleDenominator>2.795411320143589E8</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>2</MatrixWidth>
            <MatrixHeight>1</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:4326:1</ows:Identifier>
            <ScaleDenominator>1.3977056600717944E8</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>4</MatrixWidth>
            <MatrixHeight>2</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:4326:2</ows:Identifier>
            <ScaleDenominator>6.988528300358972E7</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>8</MatrixWidth>
            <MatrixHeight>4</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:4326:3</ows:Identifier>
            <ScaleDenominator>3.494264150179486E7</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>16</MatrixWidth>
            <MatrixHeight>8</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:4326:4</ows:Identifier>
            <ScaleDenominator>1.747132075089743E7</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>32</MatrixWidth>
            <MatrixHeight>16</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:4326:5</ows:Identifier>
            <ScaleDenominator>8735660.375448715</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>64</MatrixWidth>
            <MatrixHeight>32</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:4326:6</ows:Identifier>
            <ScaleDenominator>4367830.1877243575</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>128</MatrixWidth>
            <MatrixHeight>64</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:4326:7</ows:Identifier>
            <ScaleDenominator>2183915.0938621787</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>256</MatrixWidth>
            <MatrixHeight>128</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:4326:8</ows:Identifier>
            <ScaleDenominator>1091957.5469310894</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>512</MatrixWidth>
            <MatrixHeight>256</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:4326:9</ows:Identifier>
            <ScaleDenominator>545978.7734655447</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>1024</MatrixWidth>
            <MatrixHeight>512</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:4326:10</ows:Identifier>
            <ScaleDenominator>272989.38673277234</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>2048</MatrixWidth>
            <MatrixHeight>1024</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:4326:11</ows:Identifier>
            <ScaleDenominator>136494.69336638617</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>4096</MatrixWidth>
            <MatrixHeight>2048</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:4326:12</ows:Identifier>
            <ScaleDenominator>68247.34668319309</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>8192</MatrixWidth>
            <MatrixHeight>4096</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:4326:13</ows:Identifier>
            <ScaleDenominator>34123.67334159654</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>16384</MatrixWidth>
            <MatrixHeight>8192</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:4326:14</ows:Identifier>
            <ScaleDenominator>17061.83667079827</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>32768</MatrixWidth>
            <MatrixHeight>16384</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:4326:15</ows:Identifier>
            <ScaleDenominator>8530.918335399136</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>65536</MatrixWidth>
            <MatrixHeight>32768</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:4326:16</ows:Identifier>
            <ScaleDenominator>4265.459167699568</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>131072</MatrixWidth>
            <MatrixHeight>65536</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:4326:17</ows:Identifier>
            <ScaleDenominator>2132.729583849784</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>262144</MatrixWidth>
            <MatrixHeight>131072</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:4326:18</ows:Identifier>
            <ScaleDenominator>1066.364791924892</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>524288</MatrixWidth>
            <MatrixHeight>262144</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:4326:19</ows:Identifier>
            <ScaleDenominator>533.182395962446</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>1048576</MatrixWidth>
            <MatrixHeight>524288</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:4326:20</ows:Identifier>
            <ScaleDenominator>266.591197981223</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>2097152</MatrixWidth>
            <MatrixHeight>1048576</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:4326:21</ows:Identifier>
            <ScaleDenominator>133.2955989906115</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>4194304</MatrixWidth>
            <MatrixHeight>2097152</MatrixHeight>
          </TileMatrix>
        </TileMatrixSet>
        <TileMatrixSet>
          <ows:Identifier>EPSG:3035:512</ows:Identifier>
          <ows:SupportedCRS>urn:ogc:def:crs:EPSG::3035</ows:SupportedCRS>
          <TileMatrix>
            <ows:Identifier>EPSG:3035:512:0</ows:Identifier>
            <ScaleDenominator>3.996703021308536E7</ScaleDenominator>
            <TopLeftCorner>6827128.0 1896628.6179337814</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>1</MatrixWidth>
            <MatrixHeight>1</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3035:512:1</ows:Identifier>
            <ScaleDenominator>1.998351510654268E7</ScaleDenominator>
            <TopLeftCorner>6827128.0 1896628.6179337814</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>2</MatrixWidth>
            <MatrixHeight>2</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3035:512:2</ows:Identifier>
            <ScaleDenominator>9991757.55327134</ScaleDenominator>
            <TopLeftCorner>6827128.0 1896628.6179337814</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>4</MatrixWidth>
            <MatrixHeight>4</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3035:512:3</ows:Identifier>
            <ScaleDenominator>4995878.77663567</ScaleDenominator>
            <TopLeftCorner>6827128.0 1896628.6179337814</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>8</MatrixWidth>
            <MatrixHeight>8</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3035:512:4</ows:Identifier>
            <ScaleDenominator>2497939.388317835</ScaleDenominator>
            <TopLeftCorner>6827128.0 1896628.6179337814</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>15</MatrixWidth>
            <MatrixHeight>16</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3035:512:5</ows:Identifier>
            <ScaleDenominator>1248969.6941589175</ScaleDenominator>
            <TopLeftCorner>6827128.0 1896628.6179337814</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>29</MatrixWidth>
            <MatrixHeight>32</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3035:512:6</ows:Identifier>
            <ScaleDenominator>624484.8470794588</ScaleDenominator>
            <TopLeftCorner>6827128.0 1896628.6179337814</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>58</MatrixWidth>
            <MatrixHeight>64</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3035:512:7</ows:Identifier>
            <ScaleDenominator>312242.4235397294</ScaleDenominator>
            <TopLeftCorner>6827128.0 1896628.6179337814</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>116</MatrixWidth>
            <MatrixHeight>128</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3035:512:8</ows:Identifier>
            <ScaleDenominator>156121.2117698647</ScaleDenominator>
            <TopLeftCorner>6827128.0 1896628.6179337814</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>231</MatrixWidth>
            <MatrixHeight>256</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3035:512:9</ows:Identifier>
            <ScaleDenominator>78060.60588493235</ScaleDenominator>
            <TopLeftCorner>6827128.0 1896628.6179337814</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>462</MatrixWidth>
            <MatrixHeight>512</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3035:512:10</ows:Identifier>
            <ScaleDenominator>39030.30294246617</ScaleDenominator>
            <TopLeftCorner>6827128.0 1896628.6179337814</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>923</MatrixWidth>
            <MatrixHeight>1024</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3035:512:11</ows:Identifier>
            <ScaleDenominator>19515.151471233086</ScaleDenominator>
            <TopLeftCorner>6827128.0 1896628.6179337814</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>1845</MatrixWidth>
            <MatrixHeight>2048</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3035:512:12</ows:Identifier>
            <ScaleDenominator>9757.575735616543</ScaleDenominator>
            <TopLeftCorner>6827128.0 1896628.6179337814</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>3690</MatrixWidth>
            <MatrixHeight>4096</MatrixHeight>
          </TileMatrix>
        </TileMatrixSet>
        <TileMatrixSet>
          <ows:Identifier>EU:3035:512</ows:Identifier>
          <ows:SupportedCRS>urn:ogc:def:crs:EPSG::3035</ows:SupportedCRS>
          <TileMatrix>
            <ows:Identifier>EU:3035:512:0</ows:Identifier>
            <ScaleDenominator>3.1389508928571433E7</ScaleDenominator>
            <TopLeftCorner>2000000.0 5500000.0</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>1</MatrixWidth>
            <MatrixHeight>1</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU:3035:512:1</ows:Identifier>
            <ScaleDenominator>1.5694754464285716E7</ScaleDenominator>
            <TopLeftCorner>2000000.0 5500000.0</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>2</MatrixWidth>
            <MatrixHeight>2</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU:3035:512:2</ows:Identifier>
            <ScaleDenominator>7847377.232142858</ScaleDenominator>
            <TopLeftCorner>2000000.0 5500000.0</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>4</MatrixWidth>
            <MatrixHeight>4</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU:3035:512:3</ows:Identifier>
            <ScaleDenominator>3923688.616071429</ScaleDenominator>
            <TopLeftCorner>2000000.0 5500000.0</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>8</MatrixWidth>
            <MatrixHeight>8</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU:3035:512:4</ows:Identifier>
            <ScaleDenominator>1961844.3080357146</ScaleDenominator>
            <TopLeftCorner>2000000.0 5500000.0</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>16</MatrixWidth>
            <MatrixHeight>16</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU:3035:512:5</ows:Identifier>
            <ScaleDenominator>980922.1540178573</ScaleDenominator>
            <TopLeftCorner>2000000.0 5500000.0</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>32</MatrixWidth>
            <MatrixHeight>32</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU:3035:512:6</ows:Identifier>
            <ScaleDenominator>490461.07700892864</ScaleDenominator>
            <TopLeftCorner>2000000.0 5500000.0</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>64</MatrixWidth>
            <MatrixHeight>64</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU:3035:512:7</ows:Identifier>
            <ScaleDenominator>245230.53850446432</ScaleDenominator>
            <TopLeftCorner>2000000.0 5500000.0</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>128</MatrixWidth>
            <MatrixHeight>128</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU:3035:512:8</ows:Identifier>
            <ScaleDenominator>122615.26925223216</ScaleDenominator>
            <TopLeftCorner>2000000.0 5500000.0</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>256</MatrixWidth>
            <MatrixHeight>256</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU:3035:512:9</ows:Identifier>
            <ScaleDenominator>61307.63462611608</ScaleDenominator>
            <TopLeftCorner>2000000.0 5500000.0</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>512</MatrixWidth>
            <MatrixHeight>512</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU:3035:512:10</ows:Identifier>
            <ScaleDenominator>30653.81731305804</ScaleDenominator>
            <TopLeftCorner>2000000.0 5500000.0</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>1024</MatrixWidth>
            <MatrixHeight>1024</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU:3035:512:11</ows:Identifier>
            <ScaleDenominator>15326.90865652902</ScaleDenominator>
            <TopLeftCorner>2000000.0 5500000.0</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>2048</MatrixWidth>
            <MatrixHeight>2048</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU:3035:512:12</ows:Identifier>
            <ScaleDenominator>7663.45432826451</ScaleDenominator>
            <TopLeftCorner>2000000.0 5500000.0</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>4096</MatrixWidth>
            <MatrixHeight>4096</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU:3035:512:13</ows:Identifier>
            <ScaleDenominator>3831.727164132255</ScaleDenominator>
            <TopLeftCorner>2000000.0 5500000.0</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>8192</MatrixWidth>
            <MatrixHeight>8192</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU:3035:512:14</ows:Identifier>
            <ScaleDenominator>1915.8635820661275</ScaleDenominator>
            <TopLeftCorner>2000000.0 5500000.0</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>16384</MatrixWidth>
            <MatrixHeight>16384</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU:3035:512:15</ows:Identifier>
            <ScaleDenominator>957.9317910330637</ScaleDenominator>
            <TopLeftCorner>2000000.0 5500000.0</TopLeftCorner>
            <TileWidth>512</TileWidth>
            <TileHeight>512</TileHeight>
            <MatrixWidth>32768</MatrixWidth>
            <MatrixHeight>32768</MatrixHeight>
          </TileMatrix>
        </TileMatrixSet>
        <TileMatrixSet>
          <ows:Identifier>GoogleCRS84Quad</ows:Identifier>
          <ows:SupportedCRS>urn:ogc:def:crs:EPSG::4326</ows:SupportedCRS>
          <TileMatrix>
            <ows:Identifier>GoogleCRS84Quad:0</ows:Identifier>
            <ScaleDenominator>5.590822640287178E8</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>1</MatrixWidth>
            <MatrixHeight>1</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GoogleCRS84Quad:1</ows:Identifier>
            <ScaleDenominator>2.795411320143589E8</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>2</MatrixWidth>
            <MatrixHeight>1</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GoogleCRS84Quad:2</ows:Identifier>
            <ScaleDenominator>1.397705660071794E8</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>4</MatrixWidth>
            <MatrixHeight>2</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GoogleCRS84Quad:3</ows:Identifier>
            <ScaleDenominator>6.988528300358972E7</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>8</MatrixWidth>
            <MatrixHeight>4</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GoogleCRS84Quad:4</ows:Identifier>
            <ScaleDenominator>3.494264150179486E7</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>16</MatrixWidth>
            <MatrixHeight>8</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GoogleCRS84Quad:5</ows:Identifier>
            <ScaleDenominator>1.747132075089743E7</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>32</MatrixWidth>
            <MatrixHeight>16</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GoogleCRS84Quad:6</ows:Identifier>
            <ScaleDenominator>8735660.375448715</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>64</MatrixWidth>
            <MatrixHeight>32</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GoogleCRS84Quad:7</ows:Identifier>
            <ScaleDenominator>4367830.187724357</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>128</MatrixWidth>
            <MatrixHeight>64</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GoogleCRS84Quad:8</ows:Identifier>
            <ScaleDenominator>2183915.093862179</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>256</MatrixWidth>
            <MatrixHeight>128</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GoogleCRS84Quad:9</ows:Identifier>
            <ScaleDenominator>1091957.546931089</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>512</MatrixWidth>
            <MatrixHeight>256</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GoogleCRS84Quad:10</ows:Identifier>
            <ScaleDenominator>545978.7734655447</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>1024</MatrixWidth>
            <MatrixHeight>512</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GoogleCRS84Quad:11</ows:Identifier>
            <ScaleDenominator>272989.3867327723</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>2048</MatrixWidth>
            <MatrixHeight>1024</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GoogleCRS84Quad:12</ows:Identifier>
            <ScaleDenominator>136494.6933663862</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>4096</MatrixWidth>
            <MatrixHeight>2048</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GoogleCRS84Quad:13</ows:Identifier>
            <ScaleDenominator>68247.34668319309</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>8192</MatrixWidth>
            <MatrixHeight>4096</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GoogleCRS84Quad:14</ows:Identifier>
            <ScaleDenominator>34123.67334159654</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>16384</MatrixWidth>
            <MatrixHeight>8192</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GoogleCRS84Quad:15</ows:Identifier>
            <ScaleDenominator>17061.83667079827</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>32768</MatrixWidth>
            <MatrixHeight>16384</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GoogleCRS84Quad:16</ows:Identifier>
            <ScaleDenominator>8530.918335399136</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>65536</MatrixWidth>
            <MatrixHeight>32768</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GoogleCRS84Quad:17</ows:Identifier>
            <ScaleDenominator>4265.459167699568</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>131072</MatrixWidth>
            <MatrixHeight>65536</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GoogleCRS84Quad:18</ows:Identifier>
            <ScaleDenominator>2132.729583849784</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>262144</MatrixWidth>
            <MatrixHeight>131072</MatrixHeight>
          </TileMatrix>
        </TileMatrixSet>
        <TileMatrixSet>
          <ows:Identifier>EU:3035</ows:Identifier>
          <ows:SupportedCRS>urn:ogc:def:crs:EPSG::3035</ows:SupportedCRS>
          <TileMatrix>
            <ows:Identifier>EU:3035:0</ows:Identifier>
            <ScaleDenominator>6.2779017857142866E7</ScaleDenominator>
            <TopLeftCorner>2000000.0 5500000.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>1</MatrixWidth>
            <MatrixHeight>1</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU:3035:1</ows:Identifier>
            <ScaleDenominator>3.1389508928571433E7</ScaleDenominator>
            <TopLeftCorner>2000000.0 5500000.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>2</MatrixWidth>
            <MatrixHeight>2</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU:3035:2</ows:Identifier>
            <ScaleDenominator>1.5694754464285716E7</ScaleDenominator>
            <TopLeftCorner>2000000.0 5500000.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>4</MatrixWidth>
            <MatrixHeight>4</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU:3035:3</ows:Identifier>
            <ScaleDenominator>7847377.232142858</ScaleDenominator>
            <TopLeftCorner>2000000.0 5500000.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>8</MatrixWidth>
            <MatrixHeight>8</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU:3035:4</ows:Identifier>
            <ScaleDenominator>3923688.616071429</ScaleDenominator>
            <TopLeftCorner>2000000.0 5500000.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>16</MatrixWidth>
            <MatrixHeight>16</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU:3035:5</ows:Identifier>
            <ScaleDenominator>1961844.3080357146</ScaleDenominator>
            <TopLeftCorner>2000000.0 5500000.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>32</MatrixWidth>
            <MatrixHeight>32</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU:3035:6</ows:Identifier>
            <ScaleDenominator>980922.1540178573</ScaleDenominator>
            <TopLeftCorner>2000000.0 5500000.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>64</MatrixWidth>
            <MatrixHeight>64</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU:3035:7</ows:Identifier>
            <ScaleDenominator>490461.07700892864</ScaleDenominator>
            <TopLeftCorner>2000000.0 5500000.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>128</MatrixWidth>
            <MatrixHeight>128</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU:3035:8</ows:Identifier>
            <ScaleDenominator>245230.53850446432</ScaleDenominator>
            <TopLeftCorner>2000000.0 5500000.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>256</MatrixWidth>
            <MatrixHeight>256</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU:3035:9</ows:Identifier>
            <ScaleDenominator>122615.26925223216</ScaleDenominator>
            <TopLeftCorner>2000000.0 5500000.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>512</MatrixWidth>
            <MatrixHeight>512</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU:3035:10</ows:Identifier>
            <ScaleDenominator>61307.63462611608</ScaleDenominator>
            <TopLeftCorner>2000000.0 5500000.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>1024</MatrixWidth>
            <MatrixHeight>1024</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU:3035:11</ows:Identifier>
            <ScaleDenominator>30653.81731305804</ScaleDenominator>
            <TopLeftCorner>2000000.0 5500000.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>2048</MatrixWidth>
            <MatrixHeight>2048</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU:3035:12</ows:Identifier>
            <ScaleDenominator>15326.90865652902</ScaleDenominator>
            <TopLeftCorner>2000000.0 5500000.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>4096</MatrixWidth>
            <MatrixHeight>4096</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU:3035:13</ows:Identifier>
            <ScaleDenominator>7663.45432826451</ScaleDenominator>
            <TopLeftCorner>2000000.0 5500000.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>8192</MatrixWidth>
            <MatrixHeight>8192</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU:3035:14</ows:Identifier>
            <ScaleDenominator>3831.727164132255</ScaleDenominator>
            <TopLeftCorner>2000000.0 5500000.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>16384</MatrixWidth>
            <MatrixHeight>16384</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EU:3035:15</ows:Identifier>
            <ScaleDenominator>1915.8635820661275</ScaleDenominator>
            <TopLeftCorner>2000000.0 5500000.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>32768</MatrixWidth>
            <MatrixHeight>32768</MatrixHeight>
          </TileMatrix>
        </TileMatrixSet>
        <TileMatrixSet>
          <ows:Identifier>EPSG:4258</ows:Identifier>
          <ows:SupportedCRS>urn:ogc:def:crs:EPSG::4258</ows:SupportedCRS>
          <TileMatrix>
            <ows:Identifier>EPSG:4258:0</ows:Identifier>
            <ScaleDenominator>7.765031444843303E7</ScaleDenominator>
            <TopLeftCorner>-35.0 75.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>2</MatrixWidth>
            <MatrixHeight>1</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:4258:1</ows:Identifier>
            <ScaleDenominator>3.882515722421651E7</ScaleDenominator>
            <TopLeftCorner>-35.0 75.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>4</MatrixWidth>
            <MatrixHeight>2</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:4258:2</ows:Identifier>
            <ScaleDenominator>1.9412578612108257E7</ScaleDenominator>
            <TopLeftCorner>-35.0 75.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>7</MatrixWidth>
            <MatrixHeight>4</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:4258:3</ows:Identifier>
            <ScaleDenominator>9706289.306054128</ScaleDenominator>
            <TopLeftCorner>-35.0 75.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>13</MatrixWidth>
            <MatrixHeight>8</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:4258:4</ows:Identifier>
            <ScaleDenominator>4853144.653027064</ScaleDenominator>
            <TopLeftCorner>-35.0 75.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>26</MatrixWidth>
            <MatrixHeight>16</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:4258:5</ows:Identifier>
            <ScaleDenominator>2426572.326513532</ScaleDenominator>
            <TopLeftCorner>-35.0 75.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>52</MatrixWidth>
            <MatrixHeight>32</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:4258:6</ows:Identifier>
            <ScaleDenominator>1213286.163256766</ScaleDenominator>
            <TopLeftCorner>-35.0 75.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>103</MatrixWidth>
            <MatrixHeight>64</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:4258:7</ows:Identifier>
            <ScaleDenominator>606643.081628383</ScaleDenominator>
            <TopLeftCorner>-35.0 75.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>205</MatrixWidth>
            <MatrixHeight>128</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:4258:8</ows:Identifier>
            <ScaleDenominator>303321.5408141915</ScaleDenominator>
            <TopLeftCorner>-35.0 75.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>410</MatrixWidth>
            <MatrixHeight>256</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:4258:9</ows:Identifier>
            <ScaleDenominator>151660.77040709576</ScaleDenominator>
            <TopLeftCorner>-35.0 75.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>820</MatrixWidth>
            <MatrixHeight>512</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:4258:10</ows:Identifier>
            <ScaleDenominator>75830.385203528</ScaleDenominator>
            <TopLeftCorner>-35.0 75.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>1639</MatrixWidth>
            <MatrixHeight>1024</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:4258:11</ows:Identifier>
            <ScaleDenominator>37915.192601764</ScaleDenominator>
            <TopLeftCorner>-35.0 75.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>3277</MatrixWidth>
            <MatrixHeight>2048</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:4258:12</ows:Identifier>
            <ScaleDenominator>18957.596300882</ScaleDenominator>
            <TopLeftCorner>-35.0 75.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>6554</MatrixWidth>
            <MatrixHeight>4096</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:4258:13</ows:Identifier>
            <ScaleDenominator>9478.79815046088</ScaleDenominator>
            <TopLeftCorner>-35.0 75.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>13108</MatrixWidth>
            <MatrixHeight>8192</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:4258:14</ows:Identifier>
            <ScaleDenominator>4739.39907523044</ScaleDenominator>
            <TopLeftCorner>-35.0 75.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>26215</MatrixWidth>
            <MatrixHeight>16384</MatrixHeight>
          </TileMatrix>
        </TileMatrixSet>
        <TileMatrixSet>
          <ows:Identifier>EPSG:3995</ows:Identifier>
          <ows:SupportedCRS>urn:ogc:def:crs:EPSG::3995</ows:SupportedCRS>
          <TileMatrix>
            <ows:Identifier>EPSG:3995:0</ows:Identifier>
            <ScaleDenominator>9.300039139593408E7</ScaleDenominator>
            <TopLeftCorner>-3333134.027630277 3333134.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>1</MatrixWidth>
            <MatrixHeight>1</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3995:1</ows:Identifier>
            <ScaleDenominator>4.650019569796704E7</ScaleDenominator>
            <TopLeftCorner>-3333134.027630277 3333134.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>2</MatrixWidth>
            <MatrixHeight>2</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3995:2</ows:Identifier>
            <ScaleDenominator>2.325009784898352E7</ScaleDenominator>
            <TopLeftCorner>-3333134.027630277 3333134.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>4</MatrixWidth>
            <MatrixHeight>4</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3995:3</ows:Identifier>
            <ScaleDenominator>1.162504892449176E7</ScaleDenominator>
            <TopLeftCorner>-3333134.027630277 3333134.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>8</MatrixWidth>
            <MatrixHeight>8</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3995:4</ows:Identifier>
            <ScaleDenominator>5812524.46224588</ScaleDenominator>
            <TopLeftCorner>-3333134.027630277 3333134.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>16</MatrixWidth>
            <MatrixHeight>16</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3995:5</ows:Identifier>
            <ScaleDenominator>2906262.23112294</ScaleDenominator>
            <TopLeftCorner>-3333134.027630277 3333134.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>32</MatrixWidth>
            <MatrixHeight>32</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3995:6</ows:Identifier>
            <ScaleDenominator>1453131.11556147</ScaleDenominator>
            <TopLeftCorner>-3333134.027630277 3333134.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>64</MatrixWidth>
            <MatrixHeight>64</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3995:7</ows:Identifier>
            <ScaleDenominator>726565.557780735</ScaleDenominator>
            <TopLeftCorner>-3333134.027630277 3333134.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>128</MatrixWidth>
            <MatrixHeight>128</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3995:8</ows:Identifier>
            <ScaleDenominator>363282.7788903675</ScaleDenominator>
            <TopLeftCorner>-3333134.027630277 3333134.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>256</MatrixWidth>
            <MatrixHeight>256</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3995:9</ows:Identifier>
            <ScaleDenominator>181641.38944518374</ScaleDenominator>
            <TopLeftCorner>-3333134.027630277 3333134.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>512</MatrixWidth>
            <MatrixHeight>512</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3995:10</ows:Identifier>
            <ScaleDenominator>90820.69472259187</ScaleDenominator>
            <TopLeftCorner>-3333134.027630277 3333134.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>1024</MatrixWidth>
            <MatrixHeight>1024</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:3995:11</ows:Identifier>
            <ScaleDenominator>45410.347361295935</ScaleDenominator>
            <TopLeftCorner>-3333134.027630277 3333134.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>2048</MatrixWidth>
            <MatrixHeight>2048</MatrixHeight>
          </TileMatrix>
        </TileMatrixSet>
        <TileMatrixSet>
          <ows:Identifier>EPSG:900913</ows:Identifier>
          <ows:SupportedCRS>urn:ogc:def:crs:EPSG::900913</ows:SupportedCRS>
          <TileMatrix>
            <ows:Identifier>EPSG:900913:0</ows:Identifier>
            <ScaleDenominator>5.590822639508929E8</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>1</MatrixWidth>
            <MatrixHeight>1</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:900913:1</ows:Identifier>
            <ScaleDenominator>2.7954113197544646E8</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>2</MatrixWidth>
            <MatrixHeight>2</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:900913:2</ows:Identifier>
            <ScaleDenominator>1.3977056598772323E8</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>4</MatrixWidth>
            <MatrixHeight>4</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:900913:3</ows:Identifier>
            <ScaleDenominator>6.988528299386162E7</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>8</MatrixWidth>
            <MatrixHeight>8</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:900913:4</ows:Identifier>
            <ScaleDenominator>3.494264149693081E7</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>16</MatrixWidth>
            <MatrixHeight>16</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:900913:5</ows:Identifier>
            <ScaleDenominator>1.7471320748465404E7</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>32</MatrixWidth>
            <MatrixHeight>32</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:900913:6</ows:Identifier>
            <ScaleDenominator>8735660.374232702</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>64</MatrixWidth>
            <MatrixHeight>64</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:900913:7</ows:Identifier>
            <ScaleDenominator>4367830.187116351</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>128</MatrixWidth>
            <MatrixHeight>128</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:900913:8</ows:Identifier>
            <ScaleDenominator>2183915.0935581755</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>256</MatrixWidth>
            <MatrixHeight>256</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:900913:9</ows:Identifier>
            <ScaleDenominator>1091957.5467790877</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>512</MatrixWidth>
            <MatrixHeight>512</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:900913:10</ows:Identifier>
            <ScaleDenominator>545978.7733895439</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>1024</MatrixWidth>
            <MatrixHeight>1024</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:900913:11</ows:Identifier>
            <ScaleDenominator>272989.38669477194</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>2048</MatrixWidth>
            <MatrixHeight>2048</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:900913:12</ows:Identifier>
            <ScaleDenominator>136494.69334738597</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>4096</MatrixWidth>
            <MatrixHeight>4096</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:900913:13</ows:Identifier>
            <ScaleDenominator>68247.34667369298</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>8192</MatrixWidth>
            <MatrixHeight>8192</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:900913:14</ows:Identifier>
            <ScaleDenominator>34123.67333684649</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>16384</MatrixWidth>
            <MatrixHeight>16384</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:900913:15</ows:Identifier>
            <ScaleDenominator>17061.836668423246</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>32768</MatrixWidth>
            <MatrixHeight>32768</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:900913:16</ows:Identifier>
            <ScaleDenominator>8530.918334211623</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>65536</MatrixWidth>
            <MatrixHeight>65536</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:900913:17</ows:Identifier>
            <ScaleDenominator>4265.4591671058115</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>131072</MatrixWidth>
            <MatrixHeight>131072</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:900913:18</ows:Identifier>
            <ScaleDenominator>2132.7295835529058</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>262144</MatrixWidth>
            <MatrixHeight>262144</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:900913:19</ows:Identifier>
            <ScaleDenominator>1066.3647917764529</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>524288</MatrixWidth>
            <MatrixHeight>524288</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:900913:20</ows:Identifier>
            <ScaleDenominator>533.1823958882264</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>1048576</MatrixWidth>
            <MatrixHeight>1048576</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:900913:21</ows:Identifier>
            <ScaleDenominator>266.5911979441132</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>2097152</MatrixWidth>
            <MatrixHeight>2097152</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:900913:22</ows:Identifier>
            <ScaleDenominator>133.2955989720566</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>4194304</MatrixWidth>
            <MatrixHeight>4194304</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:900913:23</ows:Identifier>
            <ScaleDenominator>66.6477994860283</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>8388608</MatrixWidth>
            <MatrixHeight>8388608</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:900913:24</ows:Identifier>
            <ScaleDenominator>33.32389974301415</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>16777216</MatrixWidth>
            <MatrixHeight>16777216</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:900913:25</ows:Identifier>
            <ScaleDenominator>16.661949871507076</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>33554432</MatrixWidth>
            <MatrixHeight>33554432</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:900913:26</ows:Identifier>
            <ScaleDenominator>8.330974935753538</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>67108864</MatrixWidth>
            <MatrixHeight>67108864</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:900913:27</ows:Identifier>
            <ScaleDenominator>4.165487467876769</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>134217728</MatrixWidth>
            <MatrixHeight>134217728</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:900913:28</ows:Identifier>
            <ScaleDenominator>2.0827437339383845</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>268435456</MatrixWidth>
            <MatrixHeight>268435456</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:900913:29</ows:Identifier>
            <ScaleDenominator>1.0413718669691923</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>536870912</MatrixWidth>
            <MatrixHeight>536870912</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>EPSG:900913:30</ows:Identifier>
            <ScaleDenominator>0.5206859334845961</ScaleDenominator>
            <TopLeftCorner>-2.003750834E7 2.0037508E7</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>1073741824</MatrixWidth>
            <MatrixHeight>1073741824</MatrixHeight>
          </TileMatrix>
        </TileMatrixSet>
        <TileMatrixSet>
          <ows:Identifier>GlobalCRS84Scale</ows:Identifier>
          <ows:SupportedCRS>urn:ogc:def:crs:EPSG::4326</ows:SupportedCRS>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Scale:0</ows:Identifier>
            <ScaleDenominator>5.0E8</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>2</MatrixWidth>
            <MatrixHeight>1</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Scale:1</ows:Identifier>
            <ScaleDenominator>2.5E8</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>3</MatrixWidth>
            <MatrixHeight>2</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Scale:2</ows:Identifier>
            <ScaleDenominator>1.0E8</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>6</MatrixWidth>
            <MatrixHeight>3</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Scale:3</ows:Identifier>
            <ScaleDenominator>5.0E7</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>12</MatrixWidth>
            <MatrixHeight>6</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Scale:4</ows:Identifier>
            <ScaleDenominator>2.5E7</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>23</MatrixWidth>
            <MatrixHeight>12</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Scale:5</ows:Identifier>
            <ScaleDenominator>1.0E7</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>56</MatrixWidth>
            <MatrixHeight>28</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Scale:6</ows:Identifier>
            <ScaleDenominator>5000000.0</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>112</MatrixWidth>
            <MatrixHeight>56</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Scale:7</ows:Identifier>
            <ScaleDenominator>2500000.0</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>224</MatrixWidth>
            <MatrixHeight>112</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Scale:8</ows:Identifier>
            <ScaleDenominator>1000000.0</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>560</MatrixWidth>
            <MatrixHeight>280</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Scale:9</ows:Identifier>
            <ScaleDenominator>500000.0</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>1119</MatrixWidth>
            <MatrixHeight>560</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Scale:10</ows:Identifier>
            <ScaleDenominator>250000.0</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>2237</MatrixWidth>
            <MatrixHeight>1119</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Scale:11</ows:Identifier>
            <ScaleDenominator>100000.0</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>5591</MatrixWidth>
            <MatrixHeight>2796</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Scale:12</ows:Identifier>
            <ScaleDenominator>50000.0</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>11182</MatrixWidth>
            <MatrixHeight>5591</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Scale:13</ows:Identifier>
            <ScaleDenominator>25000.0</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>22364</MatrixWidth>
            <MatrixHeight>11182</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Scale:14</ows:Identifier>
            <ScaleDenominator>10000.0</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>55909</MatrixWidth>
            <MatrixHeight>27955</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Scale:15</ows:Identifier>
            <ScaleDenominator>5000.0</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>111817</MatrixWidth>
            <MatrixHeight>55909</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Scale:16</ows:Identifier>
            <ScaleDenominator>2500.0</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>223633</MatrixWidth>
            <MatrixHeight>111817</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Scale:17</ows:Identifier>
            <ScaleDenominator>1000.0</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>559083</MatrixWidth>
            <MatrixHeight>279542</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Scale:18</ows:Identifier>
            <ScaleDenominator>500.0</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>1118165</MatrixWidth>
            <MatrixHeight>559083</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Scale:19</ows:Identifier>
            <ScaleDenominator>250.0</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>2236330</MatrixWidth>
            <MatrixHeight>1118165</MatrixHeight>
          </TileMatrix>
          <TileMatrix>
            <ows:Identifier>GlobalCRS84Scale:20</ows:Identifier>
            <ScaleDenominator>100.0</ScaleDenominator>
            <TopLeftCorner>90.0 -180.0</TopLeftCorner>
            <TileWidth>256</TileWidth>
            <TileHeight>256</TileHeight>
            <MatrixWidth>5590823</MatrixWidth>
            <MatrixHeight>2795412</MatrixHeight>
          </TileMatrix>
        </TileMatrixSet>
      </Contents>
      <ServiceMetadataURL xlink:href="https://tiles.geoservice.dlr.de/service/wmts?SERVICE=wmts&amp;REQUEST=getcapabilities&amp;VERSION=1.0.0"/>
      <ServiceMetadataURL xlink:href="https://tiles.geoservice.dlr.de/rest/wmts/WMTSCapabilities.xml"/>
    </Capabilities>
    `);

  }, 3000);


});
