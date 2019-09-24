import { IEocOwsContext } from "../src/lib/owc/types/eoc-owc-json";

export const coastalXTestContext: IEocOwsContext = {

    
        "type": "FeatureCollection",
        "bbox": null,
        "id": "001",
        "features": [
            {
                "geometry": null,
                "id": "eab9de6e-9bbc-4616-9928-c38ea2454727",
                "type": "Feature",
                "bbox": [
                    104.614,
                    8.2957,
                    105.816,
                    9.7828
                ],
                "properties": {
                    "title": "Watermask from Terra SAR-X SC 2010-11-04T22:51:33.376000Z",
                    "updated": null,
                    "links": null,
                    "offerings": [
                        {
                            "code": "http://schemas.opengis.net/wms/1.1.1",
                            "operations": [
                                {
                                    "code": "GetMap",
                                    "method": "GET",
                                    "type": "image/png",
                                    "href": "http://129.247.184.155/rest/wms?service=WMS&version=1.1.1&request=GetMap&TRANSPARENT=TRUE&LAYERS=eab9de6e-9bbc-4616-9928-c38ea2454727&STYLES=default&LAYER=eab9de6e-9bbc-4616-9928-c38ea2454727&FORMAT=image%2Fpng"
                                }
                            ],
                            "customAttributes": {
                               
                                "legendUrl": "http://129.247.184.155/rest/wms?REQUEST=GetLegendGraphic&SERVICE=WMS&VERSION=1.1.1&STYLES=default&FORMAT=image/png&BGCOLOR=0xFFFFFF&TRANSPARENT=TRUE&LAYER=eab9de6e-9bbc-4616-9928-c38ea2454727"
                            }
                        }
                    ],
                    "categories": [],
                    "download": {
                        "href": "http://129.247.184.155/rest/datasets/eab9de6e-9bbc-4616-9928-c38ea2454727/export.zip"
                    },
                    "customAttributes": {
                        "categoryIds": [
                            "100",
                            "111",
                            "120",
                            "121",
                            "raster",
                            "remotesensingproduct",
                            "TerraSAR-X"
                        ],
                        "previewUrl": "http://129.247.184.155/rest/datasets/eab9de6e-9bbc-4616-9928-c38ea2454727/quicklook.png",
                        "endDate": "2010-11-04 00:00:00",
                        "description": "<div> <img src='http://129.247.184.155/rest/datasets/eab9de6e-9bbc-4616-9928-c38ea2454727/quicklook.png' alt='Preview Image'> Watermask generation with a histogram based approach was calculated with an implementation of FLOODMASK software (DLR, 2002). \nThe method is based on the assumption that water surfaces are forward scattering the radar signal resulting in low backscatter signals \nto the sensor. It uses multiple grey level thresholds and image morphological operations.</div>",
                        "type": "raster",
                        "startDate": "2010-11-04 00:00:00"
                    }
                }
            },
            {
                "geometry": null,
                "id": "751f7ff1-d405-49f5-b73b-9b203500b036",
                "type": "Feature",
                "properties": {
                    "title": "University of Can Tho, Can Tho province (2007)",
                    "updated": null,
                    "links": null,
                    "offerings": [
                        {
                            "code": "http://schemas.opengis.net/wms/1.1.1",
                            "operations": [
                                {
                                    "code": "GetMap",
                                    "method": "GET",
                                    "type": "image/png",
                                    "href": "http://129.247.184.155/rest/wms?service=WMS&version=1.1.1&request=GetMap&TRANSPARENT=TRUE&LAYERS=751f7ff1-d405-49f5-b73b-9b203500b036&STYLES=default&LAYER=751f7ff1-d405-49f5-b73b-9b203500b036&FORMAT=image%2Fpng"
                                }
                            ],
                            "customAttributes": {
                                "bbox": [
                                    105.747,
                                    9.9939,
                                    105.8043,
                                    10.0396
                                ],
                                "legendUrl": "http://129.247.184.155/rest/wms?REQUEST=GetLegendGraphic&SERVICE=WMS&VERSION=1.1.1&STYLES=default&FORMAT=image/png&BGCOLOR=0xFFFFFF&TRANSPARENT=TRUE&LAYER=751f7ff1-d405-49f5-b73b-9b203500b036"
                            }
                        }
                    ],
                    "categories": [],
                    "download": {
                        "href": "http://129.247.184.155/rest/datasets/751f7ff1-d405-49f5-b73b-9b203500b036/export.zip"
                    },
                    "customAttributes": {
                        "categoryIds": [
                            "400",
                            "polygon",
                            "vector"
                        ],
                        "previewUrl": "http://129.247.184.155/rest/datasets/751f7ff1-d405-49f5-b73b-9b203500b036/quicklook.png",
                        "endDate": "2009-10-31 00:00:00",
                        "description": "<div> <img src='http://129.247.184.155/rest/datasets/751f7ff1-d405-49f5-b73b-9b203500b036/quicklook.png' alt='Preview Image'> This dataset is originally part of a transportation network planning document (CAD drawing) for the Can Tho province and shows the location of the university campus of Can Tho University (as of 2007).</div>",
                        "type": "polygon",
                        "startDate": "2009-09-01 00:00:00"
                    }
                },
                "bbox": [
                    105.747,
                    9.9939,
                    105.8043,
                    10.0396
                ]
            },
            {
                "geometry": null,
                "id": "be55668b-5f71-4b96-9efa-5dd4b6573853",
                "type": "Feature",
                "properties": {
                    "title": "Monthly mean of the Basin Water Index (BWI) for the Mekong River catchments, 2000-07-01 - 2000-07-31, (Scatterometers onboard ERS-1&2 and Metop)",
                    "updated": null,
                    "links": null,
                    "offerings": [
                        {
                            "code": "http://schemas.opengis.net/wms/1.1.1",
                            "operations": [
                                {
                                    "code": "GetMap",
                                    "method": "GET",
                                    "type": "image/png",
                                    "href": "http://129.247.184.155/rest/wms?service=WMS&version=1.1.1&request=GetMap&TRANSPARENT=TRUE&LAYERS=be55668b-5f71-4b96-9efa-5dd4b6573853&STYLES=default&LAYER=be55668b-5f71-4b96-9efa-5dd4b6573853&FORMAT=image%2Fpng"
                                }
                            ],
                            "customAttributes": {
                                "bbox": [
                                    93.2,
                                    8.05,
                                    109.4,
                                    34.4
                                ],
                                "legendUrl": "http://129.247.184.155/rest/wms?REQUEST=GetLegendGraphic&SERVICE=WMS&VERSION=1.1.1&STYLES=default&FORMAT=image/png&BGCOLOR=0xFFFFFF&TRANSPARENT=TRUE&LAYER=be55668b-5f71-4b96-9efa-5dd4b6573853"
                            }
                        }
                    ],
                    "categories": [],
                    "download": {
                        "href": "http://129.247.184.155/rest/datasets/be55668b-5f71-4b96-9efa-5dd4b6573853/export.zip"
                    },
                    "customAttributes": {
                        "categoryIds": [
                            "100",
                            "170",
                            "172",
                            "ASCAT",
                            "raster",
                            "remotesensingproduct"
                        ],
                        "previewUrl": "http://129.247.184.155/rest/datasets/be55668b-5f71-4b96-9efa-5dd4b6573853/quicklook.png",
                        "endDate": "2000-07-31 00:00:00",
                        "description": "<div> <img src='http://129.247.184.155/rest/datasets/be55668b-5f71-4b96-9efa-5dd4b6573853/quicklook.png' alt='Preview Image'> Monthly means of Basin Water index (BWI) for the Mekong River catchments dreived from the ERS and Metop Scatteromters data.</div>",
                        "type": "raster",
                        "startDate": "2000-07-01 00:00:00"
                    }
                },
                "bbox": [
                    93.2,
                    8.05,
                    109.4,
                    34.4
                ]
            },
            {
                "geometry": null,
                "id": "beb14402-9a04-45e3-a5b5-0a5476dc9cb4",
                "type": "Feature",
                "properties": {
                    "title": "Prison Vinh Thanh, Can Tho province (2007)",
                    "updated": null,
                    "links": null,
                    "offerings": [
                        {
                            "code": "http://schemas.opengis.net/wms/1.1.1",
                            "operations": [
                                {
                                    "code": "GetMap",
                                    "method": "GET",
                                    "type": "image/png",
                                    "href": "http://129.247.184.155/rest/wms?service=WMS&version=1.1.1&request=GetMap&TRANSPARENT=TRUE&LAYERS=beb14402-9a04-45e3-a5b5-0a5476dc9cb4&STYLES=default&LAYER=beb14402-9a04-45e3-a5b5-0a5476dc9cb4&FORMAT=image%2Fpng"
                                }
                            ],
                            "customAttributes": {
                                "bbox": [
                                    105.3984,
                                    10.2159,
                                    105.4041,
                                    10.2285
                                ],
                                "legendUrl": "http://129.247.184.155/rest/wms?REQUEST=GetLegendGraphic&SERVICE=WMS&VERSION=1.1.1&STYLES=default&FORMAT=image/png&BGCOLOR=0xFFFFFF&TRANSPARENT=TRUE&LAYER=beb14402-9a04-45e3-a5b5-0a5476dc9cb4"
                            }
                        }
                    ],
                    "categories": [],
                    "download": {
                        "href": "http://129.247.184.155/rest/datasets/beb14402-9a04-45e3-a5b5-0a5476dc9cb4/export.zip"
                    },
                    "customAttributes": {
                        "categoryIds": [
                            "400",
                            "polygon",
                            "vector"
                        ],
                        "previewUrl": "http://129.247.184.155/rest/datasets/beb14402-9a04-45e3-a5b5-0a5476dc9cb4/quicklook.png",
                        "endDate": "2009-10-31 00:00:00",
                        "description": "<div> <img src='http://129.247.184.155/rest/datasets/beb14402-9a04-45e3-a5b5-0a5476dc9cb4/quicklook.png' alt='Preview Image'> This dataset is originally part of a transportation network planning document (CAD drawing) for the Can Tho province and shows the location of the prison in Vinh Thanh town, Can Tho province (as of 2007).</div>",
                        "type": "polygon",
                        "startDate": "2009-09-01 00:00:00"
                    }
                },
                "bbox": [
                    105.3984,
                    10.2159,
                    105.4041,
                    10.2285
                ]
            },
            {
                "geometry": null,
                "id": "d4622fe8-875c-4923-86aa-2e9ac670d951",
                "type": "Feature",
                "properties": {
                    "title": "CanTho Secondary School by districts (Classes)",
                    "updated": null,
                    "links": null,
                    "offerings": [],
                    "categories": [],
                    "download": {
                        "status": "501"
                    },
                    "customAttributes": {
                        "categoryIds": [
                            "500",
                            "530",
                            "statistics"
                        ],
                        "endDate": "2005-12-31 00:00:00",
                        "description": "<div>Statistical data of Secondary Schools by districts (in school year 2004-2005), Classes</div>",
                        "type": "statistics",
                        "startDate": "2004-01-01 00:00:00"
                    }
                },
                "bbox": [
                    105.227,
                    9.5821,
                    105.8984,
                    10.3256
                ]
            },
            {
                "geometry": null,
                "id": "ce86d82d-3644-5341-81fd-aec897597e0b",
                "type": "Feature",
                "properties": {
                    "title": "Watermask from Terra SAR-X SM 2012-07-23",
                    "updated": null,
                    "links": null,
                    "offerings": [
                        {
                            "code": "http://schemas.opengis.net/wms/1.1.1",
                            "operations": [
                                {
                                    "code": "GetMap",
                                    "method": "GET",
                                    "type": "image/png",
                                    "href": "http://129.247.184.155/rest/wms?service=WMS&version=1.1.1&request=GetMap&TRANSPARENT=TRUE&LAYERS=ce86d82d-3644-5341-81fd-aec897597e0b&STYLES=default&LAYER=ce86d82d-3644-5341-81fd-aec897597e0b&FORMAT=image%2Fpng"
                                }
                            ],
                            "customAttributes": {
                                "bbox": [
                                    105.5241,
                                    9.6793,
                                    105.9223,
                                    10.2708
                                ],
                                "legendUrl": "http://129.247.184.155/rest/wms?REQUEST=GetLegendGraphic&SERVICE=WMS&VERSION=1.1.1&STYLES=default&FORMAT=image/png&BGCOLOR=0xFFFFFF&TRANSPARENT=TRUE&LAYER=ce86d82d-3644-5341-81fd-aec897597e0b"
                            }
                        }
                    ],
                    "categories": [],
                    "download": {
                        "href": "http://129.247.184.155/rest/datasets/ce86d82d-3644-5341-81fd-aec897597e0b/export.zip"
                    },
                    "customAttributes": {
                        "categoryIds": [
                            "100",
                            "111",
                            "120",
                            "121",
                            "raster",
                            "remotesensingproduct",
                            "TerraSAR-X"
                        ],
                        "previewUrl": "http://129.247.184.155/rest/datasets/ce86d82d-3644-5341-81fd-aec897597e0b/quicklook.png",
                        "endDate": "2012-07-23 00:00:00",
                        "description": "<div> <img src='http://129.247.184.155/rest/datasets/ce86d82d-3644-5341-81fd-aec897597e0b/quicklook.png' alt='Preview Image'> Watermask generation with a histogram based approach was calculated with an implementation of FLOODMASK software (DLR, 2002). \nThe method is based on the assumption that water surfaces are forward scattering the radar signal resulting in low backscatter signals \nto the sensor. It uses multiple grey level thresholds and image morphological operations.</div>",
                        "type": "raster",
                        "startDate": "2012-07-23 00:00:00"
                    }
                },
                "bbox": [
                    105.5241,
                    9.6793,
                    105.9223,
                    10.2708
                ]
            },
            {
                "geometry": null,
                "id": "a7c9ac62-0a8a-4335-95e3-26f61bd8ac35",
                "type": "Feature",
                "properties": {
                    "title": "Quickbird satellite image for Tam Nong (east), 2007-01-09",
                    "updated": null,
                    "links": null,
                    "offerings": [
                        {
                            "code": "http://schemas.opengis.net/wms/1.1.1",
                            "operations": [
                                {
                                    "code": "GetMap",
                                    "method": "GET",
                                    "type": "image/png",
                                    "href": "http://129.247.184.155/rest/wms?service=WMS&version=1.1.1&request=GetMap&TRANSPARENT=TRUE&LAYERS=a7c9ac62-0a8a-4335-95e3-26f61bd8ac35&STYLES=default&LAYER=a7c9ac62-0a8a-4335-95e3-26f61bd8ac35&FORMAT=image%2Fpng"
                                }
                            ],
                            "customAttributes": {
                                "bbox": [
                                    105.5243,
                                    10.5811,
                                    105.6795,
                                    10.824
                                ],
                                "legendUrl": "http://129.247.184.155/rest/wms?REQUEST=GetLegendGraphic&SERVICE=WMS&VERSION=1.1.1&STYLES=default&FORMAT=image/png&BGCOLOR=0xFFFFFF&TRANSPARENT=TRUE&LAYER=a7c9ac62-0a8a-4335-95e3-26f61bd8ac35"
                            }
                        }
                    ],
                    "categories": [],
                    "download": {
                        "status": "403"
                    },
                    "customAttributes": {
                        "categoryIds": [
                            "700",
                            "710",
                            "711",
                            "Quickbird",
                            "raster",
                            "remotesensingproduct"
                        ],
                        "previewUrl": "http://129.247.184.155/rest/datasets/a7c9ac62-0a8a-4335-95e3-26f61bd8ac35/quicklook.png",
                        "endDate": "2007-01-09 00:00:00",
                        "description": "<div> <img src='http://129.247.184.155/rest/datasets/a7c9ac62-0a8a-4335-95e3-26f61bd8ac35/quicklook.png' alt='Preview Image'> As a product of histogram enhancement - which was performed manually (with ENVI software)- the data set includes the three Quickbird bands 3, 2 and 1 for displaying a true color image.</div>",
                        "type": "raster",
                        "startDate": "2007-01-09 00:00:00"
                    }
                },
                "bbox": [
                    105.5243,
                    10.5811,
                    105.6795,
                    10.824
                ]
            },
            {
                "geometry": null,
                "id": "4b23ef43-7529-41bd-8995-89e7c22798b5",
                "type": "Feature",
                "properties": {
                    "title": "Total population in Mekong Delta Provinces, (Vietnam)",
                    "updated": null,
                    "links": null,
                    "offerings": [],
                    "categories": [],
                    "download": {
                        "status": "501"
                    },
                    "customAttributes": {
                        "categoryIds": [
                            "500",
                            "510",
                            "512",
                            "520",
                            "statistics"
                        ],
                        "endDate": "2007-12-31 00:00:00",
                        "description": "<div>Total population in 2004,2006 and 2007.</div>",
                        "type": "statistics",
                        "startDate": "2004-01-01 00:00:00"
                    }
                },
                "bbox": [
                    0.0,
                    0.0,
                    0.0,
                    0.0
                ]
            },
            {
                "geometry": null,
                "id": "1620acfd-a715-4019-8c1f-60bd588205d3",
                "type": "Feature",
                "properties": {
                    "title": "Monthly mean of the Basin Water Index (BWI) for the Mekong River catchments, 1998-02-01 - 1998-02-28, (Scatterometers onboard ERS-1&2 and Metop)",
                    "updated": null,
                    "links": null,
                    "offerings": [
                        {
                            "code": "http://schemas.opengis.net/wms/1.1.1",
                            "operations": [
                                {
                                    "code": "GetMap",
                                    "method": "GET",
                                    "type": "image/png",
                                    "href": "http://129.247.184.155/rest/wms?service=WMS&version=1.1.1&request=GetMap&TRANSPARENT=TRUE&LAYERS=1620acfd-a715-4019-8c1f-60bd588205d3&STYLES=default&LAYER=1620acfd-a715-4019-8c1f-60bd588205d3&FORMAT=image%2Fpng"
                                }
                            ],                            
                            "styles": [
                                {
                                    "default": true,
                                    "legendURL":"http://129.247.184.155/rest/wms?REQUEST=GetLegendGraphic&SERVICE=WMS&VERSION=1.1.1&STYLES=default&FORMAT=image/png&BGCOLOR=0xFFFFFF&TRANSPARENT=TRUE&LAYER=1620acfd-a715-4019-8c1f-60bd588205d3",
                                    "name": "raster",
                                    "title": "raster"
                                }
                            ]
                        }
                    ],
                    "categories": [],
                    "download": {
                        "href": "http://129.247.184.155/rest/datasets/1620acfd-a715-4019-8c1f-60bd588205d3/export.zip"
                    },
                    "customAttributes": {
                        "categoryIds": [
                            "100",
                            "170",
                            "172",
                            "ASCAT",
                            "raster",
                            "remotesensingproduct"
                        ],
                        "previewUrl": "http://129.247.184.155/rest/datasets/1620acfd-a715-4019-8c1f-60bd588205d3/quicklook.png",
                        "endDate": "1998-02-28 00:00:00",
                        "description": "<div> <img src='http://129.247.184.155/rest/datasets/1620acfd-a715-4019-8c1f-60bd588205d3/quicklook.png' alt='Preview Image'> Monthly means of Basin Water index (BWI) for the Mekong River catchments dreived from the ERS and Metop Scatteromters data.</div>",
                        "type": "raster",
                        "startDate": "1998-02-01 00:00:00"
                    }
                },
                "bbox": [
                    93.2,
                    8.05,
                    109.4,
                    34.4
                ]
            },
            {
                "geometry": null,
                "id": "d5d7e060-0bba-44f2-a355-fff3693fc706",
                "type": "Feature",
                "properties": {
                    "title": "Global Inland Water Areas, 1:1,000,000",
                    "updated": null,
                    "links": null,
                    "offerings": [
                        {
                            "code": "http://schemas.opengis.net/wms/1.1.1",
                            "operations": [
                                {
                                    "code": "GetMap",
                                    "method": "GET",
                                    "type": "image/png",
                                    "href": "http://129.247.184.155/rest/wms?service=WMS&version=1.1.1&request=GetMap&TRANSPARENT=TRUE&LAYERS=d5d7e060-0bba-44f2-a355-fff3693fc706&STYLES=default&LAYER=d5d7e060-0bba-44f2-a355-fff3693fc706&FORMAT=image%2Fpng"
                                }
                            ]
                            
                            ,
                             "styles": [
                                {
                                    "default": true,
                                    "legendURL": "http://my/dummy/legendUrl",
                                    "name": "raster",
                                    "title": "raster"
                                }
                            ]
                        }
                    ],
                    "categories": [],
                    "download": {
                        "status": "501"
                    },
                    "customAttributes": {
                        "categoryIds": [
                            "100",
                            "140",
                            "polygon",
                            "vector"
                        ],
                        "previewUrl": "http://129.247.184.155/rest/datasets/d5d7e060-0bba-44f2-a355-fff3693fc706/quicklook.png",
                        "endDate": "2000-01-01 00:00:00",
                        "description": "<div> <img src='http://129.247.184.155/rest/datasets/d5d7e060-0bba-44f2-a355-fff3693fc706/quicklook.png' alt='Preview Image'> Polygon Feature: Inland Water Areas (hydro inwatera).Fifth edition of the Digital Chart of the World. The third/fourth edition was published in 1997-01. The product is dual named to show its lineage to the original DCW, published in 1992, while positioning the revised product within a broader family of VMap products. VMap Level 0 (VMap0) is a comprehensive 1:1,000,000 scale vector basemap of the world. It consists of cartographic, attribute, and textual data stored on compact disc read only memory (CDROM).</div>",
                        "type": "polygon",
                        "startDate": "2000-01-01 00:00:00"
                    }
                },
                "bbox": [
                    -179.99942,
                    -70.91725,
                    180.0,
                    83.57595
                ]
            }
        ],
        "properties": {
            "title": "OWS Context for Coastal Explorer DEMO",
            "lang": "en",
            "abstr": null,
            "updated": null,
            "links": null,
            "themes": [
                {
                    "criterionType": "Topic",
                    "siblings": [],
                    "leaf": false,
                    "children": [
                        {
                            "criterionType": "Topic",
                            "siblings": [],
                            "leaf": false,
                            "children": [
                                {
                                    "criterionType": "Topic",
                                    "siblings": [],
                                    "leaf": true,
                                    "children": [],
                                    "parent": null,
                                    "name": "Digital Elevation Model",
                                    "id": "721"
                                },
                                {
                                    "criterionType": "Topic",
                                    "siblings": [],
                                    "leaf": true,
                                    "children": [],
                                    "parent": null,
                                    "name": "Elevation Contours",
                                    "id": "722"
                                },
                                {
                                    "criterionType": "Topic",
                                    "siblings": [],
                                    "leaf": true,
                                    "children": [],
                                    "parent": null,
                                    "name": "Elevation Points",
                                    "id": "723"
                                }
                            ],
                            "parent": null,
                            "name": "Elevation",
                            "id": "720"
                        },
                        {
                            "criterionType": "Topic",
                            "siblings": [],
                            "leaf": false,
                            "children": [
                                {
                                    "criterionType": "Topic",
                                    "siblings": [],
                                    "leaf": true,
                                    "children": [],
                                    "parent": null,
                                    "name": "Soil Maps",
                                    "id": "732"
                                },
                                {
                                    "criterionType": "Topic",
                                    "siblings": [],
                                    "leaf": true,
                                    "children": [],
                                    "parent": null,
                                    "name": "Topographic Maps",
                                    "id": "731"
                                }
                            ],
                            "parent": null,
                            "name": "Maps",
                            "id": "730"
                        },
                        {
                            "criterionType": "Topic",
                            "siblings": [],
                            "leaf": false,
                            "children": [
                                {
                                    "criterionType": "Topic",
                                    "siblings": [],
                                    "leaf": true,
                                    "children": [],
                                    "parent": null,
                                    "name": "Optical Sensor Images",
                                    "id": "711"
                                },
                                {
                                    "criterionType": "Topic",
                                    "siblings": [],
                                    "leaf": true,
                                    "children": [],
                                    "parent": null,
                                    "name": "Radar Sensor Images",
                                    "id": "712"
                                }
                            ],
                            "parent": null,
                            "name": "Satellite Images",
                            "id": "710"
                        }
                    ],
                    "parent": null,
                    "name": "Base data",
                    "id": "700"
                },
                {
                    "criterionType": "Topic",
                    "siblings": [],
                    "leaf": true,
                    "children": [],
                    "parent": null,
                    "name": "Geomorphology",
                    "id": "800"
                },
                {
                    "criterionType": "Topic",
                    "siblings": [],
                    "leaf": false,
                    "children": [
                        {
                            "criterionType": "Topic",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "Actors",
                            "id": "620"
                        },
                        {
                            "criterionType": "Topic",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "Financing",
                            "id": "650"
                        },
                        {
                            "criterionType": "Topic",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "Legal Framework",
                            "id": "640"
                        },
                        {
                            "criterionType": "Topic",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "Policy and Planning",
                            "id": "630"
                        },
                        {
                            "criterionType": "Topic",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "Political Boundaries",
                            "id": "610"
                        }
                    ],
                    "parent": null,
                    "name": "Governance and Administration",
                    "id": "600"
                },
                {
                    "criterionType": "Topic",
                    "siblings": [],
                    "leaf": false,
                    "children": [
                        {
                            "criterionType": "Topic",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "Constructions",
                            "id": "150"
                        },
                        {
                            "criterionType": "Topic",
                            "siblings": [],
                            "leaf": false,
                            "children": [
                                {
                                    "criterionType": "Topic",
                                    "siblings": [],
                                    "leaf": true,
                                    "children": [],
                                    "parent": null,
                                    "name": "Water Depth",
                                    "id": "112"
                                },
                                {
                                    "criterionType": "Topic",
                                    "siblings": [],
                                    "leaf": true,
                                    "children": [],
                                    "parent": null,
                                    "name": "Water Distribution",
                                    "id": "111"
                                }
                            ],
                            "parent": null,
                            "name": "Flood Scenarios",
                            "id": "110"
                        },
                        {
                            "criterionType": "Topic",
                            "siblings": [],
                            "leaf": false,
                            "children": [
                                {
                                    "criterionType": "Topic",
                                    "siblings": [],
                                    "leaf": true,
                                    "children": [],
                                    "parent": null,
                                    "name": "Water Depth",
                                    "id": "122"
                                },
                                {
                                    "criterionType": "Topic",
                                    "siblings": [],
                                    "leaf": true,
                                    "children": [],
                                    "parent": null,
                                    "name": "Water Distribution",
                                    "id": "121"
                                }
                            ],
                            "parent": null,
                            "name": "Inundation Monitoring",
                            "id": "120"
                        },
                        {
                            "criterionType": "Topic",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "Rivers Canals and Lakes",
                            "id": "140"
                        },
                        {
                            "criterionType": "Topic",
                            "siblings": [],
                            "leaf": false,
                            "children": [
                                {
                                    "criterionType": "Topic",
                                    "siblings": [],
                                    "leaf": true,
                                    "children": [],
                                    "parent": null,
                                    "name": "Basin Water Index",
                                    "id": "172"
                                },
                                {
                                    "criterionType": "Topic",
                                    "siblings": [],
                                    "leaf": true,
                                    "children": [],
                                    "parent": null,
                                    "name": "Soil Water Index",
                                    "id": "173"
                                },
                                {
                                    "criterionType": "Topic",
                                    "siblings": [],
                                    "leaf": true,
                                    "children": [],
                                    "parent": null,
                                    "name": "Surface Soil Moisture",
                                    "id": "171"
                                }
                            ],
                            "parent": null,
                            "name": "Soil Moisture",
                            "id": "170"
                        },
                        {
                            "criterionType": "Topic",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "Station Network",
                            "id": "160"
                        },
                        {
                            "criterionType": "Topic",
                            "siblings": [],
                            "leaf": false,
                            "children": [
                                {
                                    "criterionType": "Topic",
                                    "siblings": [],
                                    "leaf": true,
                                    "children": [],
                                    "parent": null,
                                    "name": "Chemical",
                                    "id": "132"
                                },
                                {
                                    "criterionType": "Topic",
                                    "siblings": [],
                                    "leaf": true,
                                    "children": [],
                                    "parent": null,
                                    "name": "Organic",
                                    "id": "133"
                                },
                                {
                                    "criterionType": "Topic",
                                    "siblings": [],
                                    "leaf": true,
                                    "children": [],
                                    "parent": null,
                                    "name": "Physical",
                                    "id": "131"
                                }
                            ],
                            "parent": null,
                            "name": "Water Quality Monitoring",
                            "id": "130"
                        }
                    ],
                    "parent": null,
                    "name": "Hydrology",
                    "id": "100"
                },
                {
                    "criterionType": "Topic",
                    "siblings": [],
                    "leaf": false,
                    "children": [
                        {
                            "criterionType": "Topic",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "Commercial areas",
                            "id": "460"
                        },
                        {
                            "criterionType": "Topic",
                            "siblings": [],
                            "leaf": false,
                            "children": [
                                {
                                    "criterionType": "Topic",
                                    "siblings": [],
                                    "leaf": true,
                                    "children": [],
                                    "parent": null,
                                    "name": "Extraction",
                                    "id": "411"
                                },
                                {
                                    "criterionType": "Topic",
                                    "siblings": [],
                                    "leaf": true,
                                    "children": [],
                                    "parent": null,
                                    "name": "Hydropower",
                                    "id": "412"
                                },
                                {
                                    "criterionType": "Topic",
                                    "siblings": [],
                                    "leaf": true,
                                    "children": [],
                                    "parent": null,
                                    "name": "Power transmission",
                                    "id": "413"
                                },
                                {
                                    "criterionType": "Topic",
                                    "siblings": [],
                                    "leaf": true,
                                    "children": [],
                                    "parent": null,
                                    "name": "Utilities",
                                    "id": "414"
                                }
                            ],
                            "parent": null,
                            "name": "Industry",
                            "id": "410"
                        },
                        {
                            "criterionType": "Topic",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "Public places",
                            "id": "440"
                        },
                        {
                            "criterionType": "Topic",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "Settlements",
                            "id": "430"
                        },
                        {
                            "criterionType": "Topic",
                            "siblings": [],
                            "leaf": false,
                            "children": [
                                {
                                    "criterionType": "Topic",
                                    "siblings": [],
                                    "leaf": true,
                                    "children": [],
                                    "parent": null,
                                    "name": "Airports",
                                    "id": "421"
                                },
                                {
                                    "criterionType": "Topic",
                                    "siblings": [],
                                    "leaf": true,
                                    "children": [],
                                    "parent": null,
                                    "name": "Bridges",
                                    "id": "422"
                                },
                                {
                                    "criterionType": "Topic",
                                    "siblings": [],
                                    "leaf": true,
                                    "children": [],
                                    "parent": null,
                                    "name": "Navigation",
                                    "id": "423"
                                },
                                {
                                    "criterionType": "Topic",
                                    "siblings": [],
                                    "leaf": true,
                                    "children": [],
                                    "parent": null,
                                    "name": "Ports",
                                    "id": "424"
                                },
                                {
                                    "criterionType": "Topic",
                                    "siblings": [],
                                    "leaf": true,
                                    "children": [],
                                    "parent": null,
                                    "name": "Railway",
                                    "id": "425"
                                },
                                {
                                    "criterionType": "Topic",
                                    "siblings": [],
                                    "leaf": true,
                                    "children": [],
                                    "parent": null,
                                    "name": "Roads",
                                    "id": "426"
                                }
                            ],
                            "parent": null,
                            "name": "Transportation",
                            "id": "420"
                        }
                    ],
                    "parent": null,
                    "name": "Infrastructure",
                    "id": "400"
                },
                {
                    "criterionType": "Topic",
                    "siblings": [],
                    "leaf": false,
                    "children": [
                        {
                            "criterionType": "Topic",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "Agriculture",
                            "id": "230"
                        },
                        {
                            "criterionType": "Topic",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "Animal production",
                            "id": "260"
                        },
                        {
                            "criterionType": "Topic",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "Aquaculture",
                            "id": "240"
                        },
                        {
                            "criterionType": "Topic",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "Ecology",
                            "id": "270"
                        },
                        {
                            "criterionType": "Topic",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "Forestry",
                            "id": "250"
                        },
                        {
                            "criterionType": "Topic",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "Landcover",
                            "id": "210"
                        },
                        {
                            "criterionType": "Topic",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "Landuse",
                            "id": "220"
                        }
                    ],
                    "parent": null,
                    "name": "Landcover and Landuse",
                    "id": "200"
                },
                {
                    "criterionType": "Topic",
                    "siblings": [],
                    "leaf": false,
                    "children": [
                        {
                            "criterionType": "Topic",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "Earthquakes",
                            "id": "910"
                        },
                        {
                            "criterionType": "Topic",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "Floods",
                            "id": "940"
                        },
                        {
                            "criterionType": "Topic",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "Forest fires",
                            "id": "920"
                        },
                        {
                            "criterionType": "Topic",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "General",
                            "id": "950"
                        }
                    ],
                    "parent": null,
                    "name": "Natural Disasters",
                    "id": "900"
                },
                {
                    "criterionType": "Topic",
                    "siblings": [],
                    "leaf": false,
                    "children": [
                        {
                            "criterionType": "Topic",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "Economy",
                            "id": "520"
                        },
                        {
                            "criterionType": "Topic",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "Education",
                            "id": "530"
                        },
                        {
                            "criterionType": "Topic",
                            "siblings": [],
                            "leaf": false,
                            "children": [
                                {
                                    "criterionType": "Topic",
                                    "siblings": [],
                                    "leaf": true,
                                    "children": [],
                                    "parent": null,
                                    "name": "Health",
                                    "id": "511"
                                },
                                {
                                    "criterionType": "Topic",
                                    "siblings": [],
                                    "leaf": true,
                                    "children": [],
                                    "parent": null,
                                    "name": "Population",
                                    "id": "512"
                                }
                            ],
                            "parent": null,
                            "name": "Livelihoods",
                            "id": "510"
                        }
                    ],
                    "parent": null,
                    "name": "Population and Economy",
                    "id": "500"
                }
            ],
            "dataTypes": [
                {
                    "criterionType": "Datatype",
                    "siblings": [],
                    "leaf": true,
                    "children": [],
                    "parent": null,
                    "name": "Literature",
                    "id": "literature"
                },
                {
                    "criterionType": "Datatype",
                    "siblings": [],
                    "leaf": true,
                    "children": [],
                    "parent": null,
                    "name": "Raster Dataset",
                    "id": "raster"
                },
                {
                    "criterionType": "Datatype",
                    "siblings": [],
                    "leaf": false,
                    "children": [
                        {
                            "criterionType": "Datatype",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "ASAR",
                            "id": "ASAR"
                        },
                        {
                            "criterionType": "Datatype",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "ASCAT",
                            "id": "ASCAT"
                        },
                        {
                            "criterionType": "Datatype",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "ASTER",
                            "id": "ASTER"
                        },
                        {
                            "criterionType": "Datatype",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "ERS-Scatterometer",
                            "id": "ERS-Scatterometer"
                        },
                        {
                            "criterionType": "Datatype",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "Landsat1",
                            "id": "Landsat1"
                        },
                        {
                            "criterionType": "Datatype",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "Landsat3",
                            "id": "Landsat3"
                        },
                        {
                            "criterionType": "Datatype",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "Landsat4",
                            "id": "Landsat4"
                        },
                        {
                            "criterionType": "Datatype",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "Landsat5",
                            "id": "Landsat5"
                        },
                        {
                            "criterionType": "Datatype",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "Landsat7",
                            "id": "Landsat7"
                        },
                        {
                            "criterionType": "Datatype",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "Landsat8",
                            "id": "Landsat8"
                        },
                        {
                            "criterionType": "Datatype",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "MERIS",
                            "id": "MERIS"
                        },
                        {
                            "criterionType": "Datatype",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "MODIS",
                            "id": "MODIS"
                        },
                        {
                            "criterionType": "Datatype",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "Quickbird",
                            "id": "Quickbird"
                        },
                        {
                            "criterionType": "Datatype",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "RapidEye",
                            "id": "RapidEye"
                        },
                        {
                            "criterionType": "Datatype",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "Sentinel-1",
                            "id": "Sentinel-1"
                        },
                        {
                            "criterionType": "Datatype",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "Sentinel-2",
                            "id": "Sentinel-2"
                        },
                        {
                            "criterionType": "Datatype",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "SPOT4",
                            "id": "SPOT4"
                        },
                        {
                            "criterionType": "Datatype",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "SPOT5",
                            "id": "SPOT5"
                        },
                        {
                            "criterionType": "Datatype",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "SRTM",
                            "id": "SRTM"
                        },
                        {
                            "criterionType": "Datatype",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "TanDEM-X",
                            "id": "TanDEM-X"
                        },
                        {
                            "criterionType": "Datatype",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "TerraSAR-X",
                            "id": "TerraSAR-X"
                        },
                        {
                            "criterionType": "Datatype",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "THEOS",
                            "id": "THEOS"
                        },
                        {
                            "criterionType": "Datatype",
                            "siblings": [],
                            "leaf": true,
                            "children": [],
                            "parent": null,
                            "name": "Worldview2",
                            "id": "Worldview2"
                        }
                    ],
                    "parent": null,
                    "name": "Remote Sensing Product",
                    "id": "remotesensingproduct"
                },
                {
                    "criterionType": "Datatype",
                    "siblings": [],
                    "leaf": true,
                    "children": [],
                    "parent": null,
                    "name": "Statistics",
                    "id": "statistics"
                },
                {
                    "criterionType": "Datatype",
                    "siblings": [],
                    "leaf": true,
                    "children": [],
                    "parent": null,
                    "name": "Vector Dataset",
                    "id": "vector"
                }
            ]
        }
    
}