import { WmsVersion } from "../wms.service";



export class FakeWmsServer {
    public getCapabilities(version: WmsVersion) {
        switch (version) {
            case '1.1.0':
                return this.getCapabilities110();
            case '1.1.1':
                return this.getCapabilities111();
            case '1.3.0':
                return this.getCapabilities130();
            default:
                throw Error(`No such version ${version}`);
        }
    }

    private getCapabilities110() {
        return `
<WMT_MS_Capabilities version="1.1.0">

<Service>
  <Name>OGC:WMS</Name>
  <Title>IEM WMS Service</Title>
  <Abstract>IEM generated CONUS composite of NWS WSR-88D level III base reflectivity.</Abstract>
  <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/>
  <ContactInformation>
    <ContactPersonPrimary>
      <ContactPerson>Daryl Herzmann</ContactPerson>
      <ContactOrganization>Iowa State University</ContactOrganization>
    </ContactPersonPrimary>
  </ContactInformation>
  <AccessConstraints>None</AccessConstraints>
</Service>

<Capability>
  <Request>
    <GetCapabilities>
      <Format>application/vnd.ogc.wms_xml</Format>
      <DCPType>
        <HTTP>
          <Get><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Get>
          <Post><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Post>
        </HTTP>
      </DCPType>
    </GetCapabilities>
    <GetMap>
      <Format>image/png</Format>
      <Format>image/jpeg</Format>
      <Format>image/png; mode=8bit</Format>
      <Format>image/vnd.jpeg-png</Format>
      <Format>image/vnd.jpeg-png8</Format>
      <Format>application/x-pdf</Format>
      <Format>image/svg+xml</Format>
      <Format>image/tiff</Format>
      <Format>application/json</Format>
      <DCPType>
        <HTTP>
          <Get><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Get>
          <Post><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Post>
        </HTTP>
      </DCPType>
    </GetMap>
    <GetFeatureInfo>
      <Format>text/plain</Format>
      <Format>application/vnd.ogc.gml</Format>
      <DCPType>
        <HTTP>
          <Get><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Get>
          <Post><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Post>
        </HTTP>
      </DCPType>
    </GetFeatureInfo>
    <DescribeLayer>
      <Format>text/xml</Format>
      <DCPType>
        <HTTP>
          <Get><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Get>
          <Post><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Post>
        </HTTP>
      </DCPType>
    </DescribeLayer>
  </Request>
  <Exception>
    <Format>application/vnd.ogc.se_xml</Format>
    <Format>application/vnd.ogc.se_inimage</Format>
    <Format>application/vnd.ogc.se_blank</Format>
  </Exception>
  <VendorSpecificCapabilities />
  <UserDefinedSymbolization SupportSLD="1" UserLayer="0" UserStyle="1" RemoteWFS="0"/>
  <Layer>
    <Name>nexrad_base_reflect</Name>
    <Title>IEM WMS Service</Title>
    <Abstract>IEM generated CONUS composite of NWS WSR-88D level III base reflectivity.</Abstract>
    <SRS>EPSG:4326 EPSG:900913 EPSG:102100 EPSG:3857</SRS>
    <LatLonBoundingBox minx="-126" miny="24" maxx="-66" maxy="50" />
    <BoundingBox SRS="EPSG:4326"
                minx="-126" miny="24" maxx="-66" maxy="50" />
    <ScaleHint min="44.9012563586673" max="2319.89824519781" />
    <Layer queryable="0" opaque="0" cascaded="0">
        <Name>time_idx</Name>
        <Title>NEXRAD BASE REFLECT</Title>
        <SRS>EPSG:4326 EPSG:900913 EPSG:102100 EPSG:3857</SRS>
        <LatLonBoundingBox minx="-126" miny="24" maxx="-66" maxy="50" />
        <BoundingBox SRS="EPSG:4326"
                    minx="-126" miny="24" maxx="-66" maxy="50" />
        <Dimension name="time" units="ISO8601"/>
        <Extent name="time" default="2006-06-23T03:10:00Z" nearestValue="0">1995-01-01/2021-12-31/PT5M</Extent>
        <MetadataURL type="TC211">
          <Format>text/xml</Format>
          <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?request=GetMetadata&amp;layer=time_idx"/>
        </MetadataURL>
    </Layer>
    <Layer queryable="0" opaque="0" cascaded="0">
        <Name>nexrad-n0r-wmst</Name>
        <Title>NEXRAD BASE REFLECT</Title>
        <SRS>EPSG:4326 EPSG:900913 EPSG:102100 EPSG:3857</SRS>
        <LatLonBoundingBox minx="-126" miny="24" maxx="-66" maxy="50" />
        <BoundingBox SRS="EPSG:4326"
                    minx="-126" miny="24" maxx="-66" maxy="50" />
        <Dimension name="time" units="ISO8601"/>
        <Extent name="time" default="2006-06-23T03:10:00Z" nearestValue="0">1995-01-01/2021-12-31/PT5M</Extent>
        <MetadataURL type="TC211">
          <Format>text/xml</Format>
          <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?request=GetMetadata&amp;layer=nexrad-n0r-wmst"/>
        </MetadataURL>
    </Layer>
  </Layer>
</Capability>
</WMT_MS_Capabilities>
        `;
    }

    private getCapabilities111() {
        return `
<WMT_MS_Capabilities version="1.1.1">

<!-- MapServer version 7.6.2 OUTPUT=PNG OUTPUT=JPEG SUPPORTS=PROJ SUPPORTS=AGG SUPPORTS=FREETYPE SUPPORTS=CAIRO SUPPORTS=ICONV SUPPORTS=FRIBIDI SUPPORTS=WMS_SERVER SUPPORTS=WMS_CLIENT SUPPORTS=WFS_SERVER SUPPORTS=WFS_CLIENT SUPPORTS=WCS_SERVER SUPPORTS=FASTCGI SUPPORTS=GEOS SUPPORTS=POINT_Z_M INPUT=JPEG INPUT=POSTGIS INPUT=OGR INPUT=GDAL INPUT=SHAPEFILE -->

<Service>
  <Name>OGC:WMS</Name>
  <Title>IEM WMS Service</Title>
  <Abstract>IEM generated CONUS composite of NWS WSR-88D level III base reflectivity.</Abstract>
  <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/>
  <ContactInformation>
    <ContactPersonPrimary>
      <ContactPerson>Daryl Herzmann</ContactPerson>
      <ContactOrganization>Iowa State University</ContactOrganization>
    </ContactPersonPrimary>
  </ContactInformation>
  <AccessConstraints>None</AccessConstraints>
</Service>

<Capability>
  <Request>
    <GetCapabilities>
      <Format>application/vnd.ogc.wms_xml</Format>
      <DCPType>
        <HTTP>
          <Get><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Get>
          <Post><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Post>
        </HTTP>
      </DCPType>
    </GetCapabilities>
    <GetMap>
      <Format>image/png</Format>
      <Format>image/jpeg</Format>
      <Format>image/png; mode=8bit</Format>
      <Format>image/vnd.jpeg-png</Format>
      <Format>image/vnd.jpeg-png8</Format>
      <Format>application/x-pdf</Format>
      <Format>image/svg+xml</Format>
      <Format>image/tiff</Format>
      <Format>application/json</Format>
      <DCPType>
        <HTTP>
          <Get><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Get>
          <Post><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Post>
        </HTTP>
      </DCPType>
    </GetMap>
    <GetFeatureInfo>
      <Format>text/plain</Format>
      <Format>application/vnd.ogc.gml</Format>
      <DCPType>
        <HTTP>
          <Get><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Get>
          <Post><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Post>
        </HTTP>
      </DCPType>
    </GetFeatureInfo>
    <DescribeLayer>
      <Format>text/xml</Format>
      <DCPType>
        <HTTP>
          <Get><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Get>
          <Post><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Post>
        </HTTP>
      </DCPType>
    </DescribeLayer>
    <GetLegendGraphic>
      <Format>image/png</Format>
      <Format>image/jpeg</Format>
      <Format>image/png; mode=8bit</Format>
      <Format>image/vnd.jpeg-png</Format>
      <Format>image/vnd.jpeg-png8</Format>
      <DCPType>
        <HTTP>
          <Get><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Get>
          <Post><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Post>
        </HTTP>
      </DCPType>
    </GetLegendGraphic>
    <GetStyles>
      <Format>text/xml</Format>
      <DCPType>
        <HTTP>
          <Get><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Get>
          <Post><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Post>
        </HTTP>
      </DCPType>
    </GetStyles>
  </Request>
  <Exception>
    <Format>application/vnd.ogc.se_xml</Format>
    <Format>application/vnd.ogc.se_inimage</Format>
    <Format>application/vnd.ogc.se_blank</Format>
  </Exception>
  <VendorSpecificCapabilities />
  <UserDefinedSymbolization SupportSLD="1" UserLayer="0" UserStyle="1" RemoteWFS="0"/>
  <Layer>
    <Name>nexrad_base_reflect</Name>
    <Title>IEM WMS Service</Title>
    <Abstract>IEM generated CONUS composite of NWS WSR-88D level III base reflectivity.</Abstract>
    <SRS>EPSG:4326</SRS>
    <SRS>EPSG:900913</SRS>
    <SRS>EPSG:102100</SRS>
    <SRS>EPSG:3857</SRS>
    <LatLonBoundingBox minx="-126" miny="24" maxx="-66" maxy="50" />
    <BoundingBox SRS="EPSG:4326"
                minx="-126" miny="24" maxx="-66" maxy="50" />
    <ScaleHint min="44.9012563586673" max="2319.89824519781" />
    <Layer queryable="0" opaque="0" cascaded="0">
        <Name>time_idx</Name>
        <Title>NEXRAD BASE REFLECT</Title>
        <SRS>EPSG:4326</SRS>
        <SRS>EPSG:900913</SRS>
        <SRS>EPSG:102100</SRS>
        <SRS>EPSG:3857</SRS>
        <LatLonBoundingBox minx="-126" miny="24" maxx="-66" maxy="50" />
        <BoundingBox SRS="EPSG:4326"
                    minx="-126" miny="24" maxx="-66" maxy="50" />
        <Dimension name="time" units="ISO8601"/>
        <Extent name="time" default="2006-06-23T03:10:00Z" nearestValue="0">1995-01-01/2021-12-31/PT5M</Extent>
        <MetadataURL type="TC211">
          <Format>text/xml</Format>
          <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?request=GetMetadata&amp;layer=time_idx"/>
        </MetadataURL>
    </Layer>
    <Layer queryable="0" opaque="0" cascaded="0">
        <Name>nexrad-n0r-wmst</Name>
        <Title>NEXRAD BASE REFLECT</Title>
        <SRS>EPSG:4326</SRS>
        <SRS>EPSG:900913</SRS>
        <SRS>EPSG:102100</SRS>
        <SRS>EPSG:3857</SRS>
        <LatLonBoundingBox minx="-126" miny="24" maxx="-66" maxy="50" />
        <BoundingBox SRS="EPSG:4326"
                    minx="-126" miny="24" maxx="-66" maxy="50" />
        <Dimension name="time" units="ISO8601"/>
        <Extent name="time" default="2006-06-23T03:10:00Z" nearestValue="0">1995-01-01/2021-12-31/PT5M</Extent>
        <MetadataURL type="TC211">
          <Format>text/xml</Format>
          <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?request=GetMetadata&amp;layer=nexrad-n0r-wmst"/>
        </MetadataURL>
    </Layer>
  </Layer>
  </Capability>
</WMT_MS_Capabilities>
        `;
    }

    private getCapabilities130() {
        return `
        <WMS_Capabilities version="1.3.0"  xmlns="http://www.opengis.net/wms"   xmlns:sld="http://www.opengis.net/sld"   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"   xmlns:ms="http://mapserver.gis.umn.edu/mapserver"   xsi:schemaLocation="http://www.opengis.net/wms http://schemas.opengis.net/wms/1.3.0/capabilities_1_3_0.xsd  http://www.opengis.net/sld http://schemas.opengis.net/sld/1.1.0/sld_capabilities.xsd  http://mapserver.gis.umn.edu/mapserver https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?service=WMS&amp;version=1.3.0&amp;request=GetSchemaExtension">
        
        <!-- MapServer version 7.6.2 OUTPUT=PNG OUTPUT=JPEG SUPPORTS=PROJ SUPPORTS=AGG SUPPORTS=FREETYPE SUPPORTS=CAIRO SUPPORTS=ICONV SUPPORTS=FRIBIDI SUPPORTS=WMS_SERVER SUPPORTS=WMS_CLIENT SUPPORTS=WFS_SERVER SUPPORTS=WFS_CLIENT SUPPORTS=WCS_SERVER SUPPORTS=FASTCGI SUPPORTS=GEOS SUPPORTS=POINT_Z_M INPUT=JPEG INPUT=POSTGIS INPUT=OGR INPUT=GDAL INPUT=SHAPEFILE -->
        
        <Service>
          <Name>WMS</Name>
          <Title>IEM WMS Service</Title>
          <Abstract>IEM generated CONUS composite of NWS WSR-88D level III base reflectivity.</Abstract>
          <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/>
          <ContactInformation>
            <ContactPersonPrimary>
              <ContactPerson>Daryl Herzmann</ContactPerson>
              <ContactOrganization>Iowa State University</ContactOrganization>
            </ContactPersonPrimary>
          </ContactInformation>
          <AccessConstraints>None</AccessConstraints>
          <MaxWidth>4096</MaxWidth>
          <MaxHeight>4096</MaxHeight>
        </Service>
        
        <Capability>
          <Request>
            <GetCapabilities>
              <Format>text/xml</Format>
              <DCPType>
                <HTTP>
                  <Get><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Get>
                  <Post><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Post>
                </HTTP>
              </DCPType>
            </GetCapabilities>
            <GetMap>
              <Format>image/png</Format>
              <Format>image/jpeg</Format>
              <Format>image/png; mode=8bit</Format>
              <Format>image/vnd.jpeg-png</Format>
              <Format>image/vnd.jpeg-png8</Format>
              <Format>application/x-pdf</Format>
              <Format>image/svg+xml</Format>
              <Format>image/tiff</Format>
              <Format>application/json</Format>
              <DCPType>
                <HTTP>
                  <Get><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Get>
                  <Post><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Post>
                </HTTP>
              </DCPType>
            </GetMap>
            <GetFeatureInfo>
              <Format>text/plain</Format>
              <Format>application/vnd.ogc.gml</Format>
              <DCPType>
                <HTTP>
                  <Get><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Get>
                  <Post><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Post>
                </HTTP>
              </DCPType>
            </GetFeatureInfo>
            <sld:DescribeLayer>
              <Format>text/xml</Format>
              <DCPType>
                <HTTP>
                  <Get><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Get>
                  <Post><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Post>
                </HTTP>
              </DCPType>
            </sld:DescribeLayer>
            <sld:GetLegendGraphic>
              <Format>image/png</Format>
              <Format>image/jpeg</Format>
              <Format>image/png; mode=8bit</Format>
              <Format>image/vnd.jpeg-png</Format>
              <Format>image/vnd.jpeg-png8</Format>
              <DCPType>
                <HTTP>
                  <Get><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Get>
                  <Post><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Post>
                </HTTP>
              </DCPType>
            </sld:GetLegendGraphic>
            <ms:GetStyles>
              <Format>text/xml</Format>
              <DCPType>
                <HTTP>
                  <Get><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Get>
                  <Post><OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?"/></Post>
                </HTTP>
              </DCPType>
            </ms:GetStyles>
          </Request>
          <Exception>
            <Format>XML</Format>
            <Format>INIMAGE</Format>
            <Format>BLANK</Format>
          </Exception>
          <sld:UserDefinedSymbolization SupportSLD="1" UserLayer="0" UserStyle="1" RemoteWFS="0" InlineFeature="0" RemoteWCS="0"/>
          <Layer>
            <Name>nexrad_base_reflect</Name>
            <Title>IEM WMS Service</Title>
            <Abstract>IEM generated CONUS composite of NWS WSR-88D level III base reflectivity.</Abstract>
            <CRS>EPSG:4326</CRS>
            <CRS>EPSG:900913</CRS>
            <CRS>EPSG:102100</CRS>
            <CRS>EPSG:3857</CRS>
            <EX_GeographicBoundingBox>
                <westBoundLongitude>-126</westBoundLongitude>
                <eastBoundLongitude>-66</eastBoundLongitude>
                <southBoundLatitude>24</southBoundLatitude>
                <northBoundLatitude>50</northBoundLatitude>
            </EX_GeographicBoundingBox>
            <BoundingBox CRS="EPSG:4326"
                        minx="24" miny="-126" maxx="50" maxy="-66" />
            <MinScaleDenominator>90000</MinScaleDenominator>
            <MaxScaleDenominator>4.65e+06</MaxScaleDenominator>
            <Layer queryable="0" opaque="0" cascaded="0">
                <Name>time_idx</Name>
                <Title>NEXRAD BASE REFLECT</Title>
                <CRS>EPSG:4326</CRS>
                <CRS>EPSG:900913</CRS>
                <CRS>EPSG:102100</CRS>
                <CRS>EPSG:3857</CRS>
                <EX_GeographicBoundingBox>
                    <westBoundLongitude>-126</westBoundLongitude>
                    <eastBoundLongitude>-66</eastBoundLongitude>
                    <southBoundLatitude>24</southBoundLatitude>
                    <northBoundLatitude>50</northBoundLatitude>
                </EX_GeographicBoundingBox>
                <BoundingBox CRS="EPSG:4326"
                            minx="24" miny="-126" maxx="50" maxy="-66" />
                <Dimension name="time" units="ISO8601" default="2006-06-23T03:10:00Z" nearestValue="0">1995-01-01/2021-12-31/PT5M</Dimension>
                <MetadataURL type="TC211">
                  <Format>text/xml</Format>
                  <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?request=GetMetadata&amp;layer=time_idx"/>
                </MetadataURL>
            </Layer>
            <Layer queryable="0" opaque="0" cascaded="0">
                <Name>nexrad-n0r-wmst</Name>
                <Title>NEXRAD BASE REFLECT</Title>
                <CRS>EPSG:4326</CRS>
                <CRS>EPSG:900913</CRS>
                <CRS>EPSG:102100</CRS>
                <CRS>EPSG:3857</CRS>
                <EX_GeographicBoundingBox>
                    <westBoundLongitude>-126</westBoundLongitude>
                    <eastBoundLongitude>-66</eastBoundLongitude>
                    <southBoundLatitude>24</southBoundLatitude>
                    <northBoundLatitude>50</northBoundLatitude>
                </EX_GeographicBoundingBox>
                <BoundingBox CRS="EPSG:4326"
                            minx="24" miny="-126" maxx="50" maxy="-66" />
                <Dimension name="time" units="ISO8601" default="2006-06-23T03:10:00Z" nearestValue="0">1995-01-01/2021-12-31/PT5M</Dimension>
                <MetadataURL type="TC211">
                  <Format>text/xml</Format>
                  <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?request=GetMetadata&amp;layer=nexrad-n0r-wmst"/>
                </MetadataURL>
            </Layer>
          </Layer>
        </Capability>
        </WMS_Capabilities>        
        `;
    }
}