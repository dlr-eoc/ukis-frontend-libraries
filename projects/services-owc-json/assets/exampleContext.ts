import { IOwsContext } from "@ukis/datatypes-owc-json/src/public_api";


export const barebonesContext: IOwsContext = {
    id: 'test context',
    type: 'FeatureCollection',
    properties: {
      links: {
        profiles: ['http://www.opengis.net/spec/owc-geojson/1.0/req/core'],
      },
      lang: 'de',
      title: 'test context',
      updated: '2018-11-28T00:00:00'
    },
    features: []
  };


export const basicContext: IOwsContext = {
    "features": [
           {
               "type": "Feature",
               "id": "https://geoservice.code-de.org/Sentinel1/wms/S1_SAR_L1_GRD",
               "geometry": null,
               "properties": {
                   "title": "Sentinel-1 SAR - Level 1 (Ground Range Detected)",
                   "active": false,
                   "offerings": [
                       {
                           "code": "http://www.opengis.net/spec/owc-geojson/1.0/req/wms",
                           "operations": [
                               {
                                   "code": "GetMap",
                                   "method": "GET",
                                   "type": "image/vnd.jpeg-png",
                                   "href": "https://geoservice.code-de.org/Sentinel1/wms?service=WMS&version=1.1.0&request=GetMap&TRANSPARENT=TRUE&LAYERS=S1_SAR_L1_GRD&FORMAT=image/vnd.jpeg-png&TILEF=true"
                               },
                               {
                                   "code": "GetCapabilities",
                                   "method": "GET",
                                   "type": "application/xml",
                                   "href": "https://geoservice.code-de.org/Sentinel1/wms?service=WMS&version=1.1.0&request=GetCapabilities"
                               },
                               {
                                   "code": "GetFeatureInfo",
                                   "method": "GET",
                                   "type": "text/html",
                                   "href": "https://geoservice.code-de.org/Sentinel1/wms?service=WMS&version=1.1.0&request=GetFeatureInfo&TRANSPARENT=TRUE&LAYERS=S1_SAR_L1_GRD&FORMAT=image/vnd.jpeg-png"
                               }
                           ]
                       }
                      
                   ],
                   "date": "2017-01-01/2017-01-01/P1D",              
                   "updated": "",                
                   "links": []                
               }
           },   
           {
               "type": "Feature",
               "geometry": null,
               "id": "S2_MSI_L1C",
               "properties": {
                   "title": "Sentinel-2 MSI - Level 1C (Top-of-Atmosphere Reflectance)",
                   "updated": "", 
                   "active": true,
                   "offerings": [
                       {
                           "code": "http://www.opengis.net/spec/owc-geojson/1.0/req/wms",
                           "operations": [
                               {
                                   "code": "GetMap",
                                   "method": "GET",
                                   "type": "image/vnd.jpeg-png",								
                                   "href": "https://geoservice.code-de.org/Sentinel2/wms?service=WMS&version=1.1.0&request=GetMap&TRANSPARENT=TRUE&LAYERS=S2_MSI_L1C&FORMAT=image/vnd.jpeg-png&TILED=true"
                               },
                               {
                                   "code": "GetFeatureInfo",
                                   "method": "GET",
                                   "type": "text/html",
                                   "href": "https://geoservice.code-de.org/Sentinel2/wms?service=WMS&version=1.1.0&request=GetFeatureInfo&TRANSPARENT=TRUE&LAYERS=S2_MSI_L1C&FORMAT=image/vnd.jpeg-png"
                               }
                           ],
                           "styles": [
                               {
                                    "name": "raster",
                                    "title": "Raster",
                                    "legendURL": "",
                                    "default": "true"
                                    
                               }
                           ]
                       }
                      
                   ],                            
                   "customAttributes": {
                       
                       "name": "",
                       
                       "dimension": [{
                           "name": "time",
                           "units": "ISO8601", 
                           "value": "2017-01-01/2017-01-01/P1D",
                           "display": "P1D"
                       }, 
                       {
                           "name": "elevation",
                           "units": "hPa", 
                           "value": "",
                           "display": "" 
                       }
                       ]
                   }                
               }
           }
           
       ],
    "properties": {
        "links": null,
        "lang": "en",
        "title": "CODE-DE Sentinel 1 and 2",
        "abstract": "<strong>CODE-DE</strong> Sentinel1 and 2",
        "updated": "2016-09-30T16:18:30Z", 
        "authors": [{
            "name": "Geoservice Manager",		
            "email": "geoservice@dlr.de",
            "role": "PoC" 
        }],
        "publisher": "German Aerospace Center (DLR)",
        "categories": [
                    {
                        "term": "WMS"
                    },
                    {
                        "term": "DLR"
                    }
                ]
    },
    "type": "FeatureCollection",
    "bbox": [0, 0, 10, 10],
    "projections": [{
        "code": "EPSG:3035",
        "extent": [],
        "unit": "m"
    }],
    "legendURL": "https://geoservice.dlr.de/static/logos/dlr.gif",
    "descriptionURL": "https://code-de.org",
    "id": "codede:sentinel:3035"
   };

