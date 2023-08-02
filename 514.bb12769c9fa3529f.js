"use strict";(self.webpackChunkdemo_maps=self.webpackChunkdemo_maps||[]).push([[514],{4074:(M,u,i)=>{i.d(u,{um:()=>e,RP:()=>v,HF:()=>R,Kl:()=>m,aZ:()=>y,fc:()=>h,HX:()=>c,zc:()=>g,gY:()=>S,Bz:()=>b});var l=i(5548);class S extends l.YY{constructor(s){const r={name:"OpenStreetMap",displayName:"OpenStreetMap",id:"osm",visible:!1,type:"xyz",url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",subdomains:["a","b","c"],attribution:'&copy, <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors',continuousWorld:!1,legendImg:"https://a.tile.openstreetmap.org/3/4/3.png",description:"OpenStreetMap z-x-y Tiles",opacity:1};s&&Object.assign(r,s),super(r)}}class g extends l.YY{constructor(s){const r={name:"OpenSeaMap",displayName:"OpenSeaMap",id:"OpenSeaMap",visible:!1,type:"xyz",removable:!1,url:"https://{s}.openseamap.org/seamark/{z}/{x}/{y}.png",subdomains:["t1"],attribution:'&copy, <a href="https://map.openseamap.org/legend.php?lang=de&page=license">OpenSeaMap</a>',continuousWorld:!1,legendImg:"https://t1.openseamap.org/seamark/10/554/321.png",description:"http://map.openseamap.org/",opacity:1};s&&Object.assign(r,s),super(r)}}class m extends l.TI{constructor(s){const r={name:"EOC Litemap",displayName:"EOC Litemap",id:"eoc_litemap",visible:!1,type:"wms",removable:!1,params:{LAYERS:"litemap",FORMAT:"image/png",TRANSPARENT:!0},url:"https://geoservice.dlr.de/eoc/basemap/wms",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://geoservice.dlr.de/eoc/basemap/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=litemap&ATTRIBUTION=&WIDTH=256&HEIGHT=256&CRS=EPSG%3A3857&STYLES=&BBOX=0%2C0%2C10018754.171394622%2C10018754.171394622",description:"http://www.naturalearthdata.com/about/",opacity:1};s&&Object.assign(r,s),super(r)}}class y extends l.RC{constructor(s){const r={name:"EOC Litemap Tile",displayName:"EOC Litemap Tile",id:"eoc_litemap_tile",visible:!1,type:"wmts",removable:!1,params:{layer:"eoc:litemap",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Alitemap&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"EOC Litemap as web map tile service",opacity:1};s&&Object.assign(r,s),super(r)}}class h extends l.RC{constructor(s){const r={name:"EOC Liteoverlay Tile",displayName:"EOC LiteoverlayTile",id:"eoc_Liteoverlay_tile",visible:!1,type:"wmts",removable:!1,params:{layer:"eoc:liteoverlay",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Aliteoverlay&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"This is the liteoverlay provided for EOC Service Portals",opacity:1};s&&Object.assign(r,s),super(r)}}class v extends l.RC{constructor(s){const r={name:"EOC Basemap Tile",displayName:"EOC Basemap Tile",id:"eoc_basemap_tile",visible:!1,type:"wmts",removable:!1,params:{layer:"eoc:basemap",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Abasemap&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"This is the basemap for DLR Service Portals",opacity:1};s&&Object.assign(r,s),super(r)}}class R extends l.RC{constructor(s){const r={name:"EOC Baseoverlay Tile",displayName:"EOC Baseoverlay Tile",id:"eoc_Baseoverlay_tile",visible:!1,type:"wmts",removable:!1,params:{layer:"eoc:baseoverlay",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Abaseoverlay&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"This is the basemap for DLR Service Portals",opacity:1};s&&Object.assign(r,s),super(r)}}class e extends l.RC{constructor(s){const r={name:"BlueMarble Tile",displayName:"BlueMarble Tile",id:"blueMarble_tile",visible:!1,type:"wmts",removable:!1,params:{layer:"bmng_topo_bathy",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=bmng_topo_bathy&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"Blue Marble NG dataset with topography and bathymetry",opacity:1};s&&Object.assign(r,s),super(r)}}class b extends l.RC{constructor(s){const r={name:"World Relief B/W Tile",displayName:"World Relief B/W Tile",id:"eoc:world_relief_bw",visible:!1,type:"wmts",removable:!1,params:{layer:"eoc:world_relief_bw",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Aworld_relief_bw&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"World Relief Black / White",opacity:1};s&&Object.assign(r,s),super(r)}}class c extends l.RC{constructor(s){const r={name:"Hillshade Tile",displayName:"Hillshade Tile",id:"eoc_hillshade",visible:!1,type:"wmts",removable:!1,params:{layer:"hillshade",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=hillshade&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"Global Hillshade based on GMTED2010",opacity:1};s&&Object.assign(r,s),super(r)}}},8514:(M,u,i)=>{i.r(u),i.d(u,{RouteMap6Module:()=>C,RouteMap6RoutingModule:()=>T});var l=i(8692),S=i(8808),g=i(7223),m=i(5548),y=i(790),h=i(4074),v=i(1899),R=i(8002),e=i(4537),b=i(5732),c=i(6799);function p(a,n){if(1&a&&(e.TgZ(0,"tr")(1,"th"),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA()()),2&a){const t=n.$implicit;e.xp6(2),e.Oqu(t.key),e.xp6(2),e.Oqu(t.value)}}function s(a,n){if(1&a&&(e.TgZ(0,"tbody"),e.YNc(1,p,5,2,"tr",3),e.ALo(2,"keyvalue"),e.qZA()),2&a){const t=n.ngIf;e.xp6(1),e.Q6J("ngForOf",e.lcZ(2,1,t))}}function r(a,n){1&a&&(e.TgZ(0,"clr-spinner",4),e._uU(1,"Loading ..."),e.qZA()),2&a&&e.Q6J("clrInline",!0)}let A=(()=>{class a{constructor(t){this.http=t}ngOnInit(){this.data$=this.getFeatureInfo().pipe((0,R.U)(t=>t.features[0].properties))}getFeatureInfo(){const t=this.layer.getSource().getFeatureInfoUrl(this.event.coordinate,this.event.frameState.viewState.resolution,this.event.frameState.viewState.projection.getCode(),{INFO_FORMAT:"application/json"});return console.log("getting",t),this.http.get(t)}}return a.\u0275fac=function(t){return new(t||a)(e.Y36(b.eN))},a.\u0275cmp=e.Xpm({type:a,selectors:[["app-raster-feature-info"]],inputs:{layer:"layer",event:"event"},decls:7,vars:4,consts:[[1,"table","table-vertical"],[4,"ngIf","ngIfElse"],["loading",""],[4,"ngFor","ngForOf"],[3,"clrInline"]],template:function(t,o){if(1&t&&(e.TgZ(0,"table",0)(1,"caption"),e._uU(2," Feature properties "),e.qZA(),e.YNc(3,s,3,3,"tbody",1),e.ALo(4,"async"),e.qZA(),e.YNc(5,r,2,1,"ng-template",null,2,e.W1O)),2&t){const f=e.MAs(6);e.xp6(3),e.Q6J("ngIf",e.lcZ(4,2,o.data$))("ngIfElse",f)}},dependencies:[c.vNO,l.sg,l.O5,l.Ov,l.Nd]}),a})();var E=i(408),L=i(580),w=i(3307);let x=(()=>{class a{constructor(t,o){this.layersSvc=t,this.mapStateSvc=o,this.class="content-container",this.subs=[],this.controls={attribution:!0,scaleLine:!0}}ngOnInit(){this.addBaseLayers(),this.addLayers(),this.mapStateSvc.setExtent([9.681317514755053,47.425291526740125,12.765729135848805,49.213103602937025]),this.layersSvc.getLayers().subscribe(t=>console.log("layers are now ",t))}addBaseLayers(){const t=new h.Kl({visible:!0,tileSize:512});this.layersSvc.addLayer(t,"Baselayers")}addLayers(){const t=new m.RC({type:"wmts",id:"TDM90_AMP",visible:!1,url:"https://tiles.geoservice.dlr.de/service/wmts?",name:"TDM90_AMP",filtertype:"Layers",attribution:'| TDM90 Data &copy; <a href="http://www.dlr.de" target="_blank">DLR</a> licensed for <a rel="license" target="_blank" href="https://geoservice.dlr.de/resources/licenses/tdm90/License_for_the_Utilization_of_90m_DEM_for_Scientific_Use.pdf">scientific use</a>',params:{layer:"TDM90_AMP",version:"1.1.0",format:"image/png",style:"default",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},styles:[{default:!0,name:"default",title:"default"},{default:!1,name:"none",title:"none"}]});this.layersSvc.addLayer(t,t.filtertype);const o=new m.TI({type:"wms",id:"S2_L3A_WASP_FRC_P1M",url:"https://{s}.geoservice.dlr.de/eoc/imagery/wms?",name:"Sentinel-2 L3A FRC (WASP)",subdomains:["a","b","c","d"],filtertype:"Layers",attribution:'| &copy; <a href="http://www.dlr.de" target="_blank">DLR</a> Contains modified Copernicus Sentinel Data [2020]',params:{LAYERS:"S2_L3A_WASP_FRC_P1M",VERSION:"1.1.0",FORMAT:"image/png"},expanded:!0,bbox:[2.183,47.076,8.206,49.287],styles:[{default:!0,legendURL:"https://geoservice.dlr.de/eoc/imagery/wms?service=WMS&request=GetLegendGraphic&format=image/png&width=20&height=20&layer=land:S2_L3A_WASP_FRC_P1M",name:"s2-ndvi",title:"NDVI"},{default:!1,legendURL:"https://geoservice.dlr.de/eoc/imagery/wms?service=WMS&request=GetLegendGraphic&format=image/png&width=20&height=20&layer=land:S2_L3A_WASP_FRC_P1M",name:"s2-infrared",title:"Infrared (8,4,3)"},{default:!1,legendURL:"https://geoservice.dlr.de/eoc/imagery/wms?service=WMS&request=GetLegendGraphic&format=image/png&width=20&height=20&layer=land:S2_L3A_WASP_FRC_P1M",name:"s2-l3a-wasp-frc",title:"Style for L3A MAJA/WASP Ground Reflectances"}],popup:{dynamicPopup:{component:A,getAttributes:d=>({layer:d.layer,event:d.mapEvent})}}});this.layersSvc.addLayer(o,o.filtertype);const f=new m.TI({type:"wms",id:"S2_L2A_MAJA_FRE",url:"https://{s}.geoservice.dlr.de/eoc/imagery/wms?",name:"Sentinel-2 L2A FRE (MAJA)",subdomains:["a","b","c","d"],filtertype:"Layers",attribution:'| &copy; <a href="http://www.dlr.de" target="_blank">DLR</a> Sentinel-2 L2A MAJA (MACCS-ATCOR Joint Algorithm) ground reflectance with the correction of slope effects (FRE) in 10m resolution based on the MAJA processor (https://doi.org/10.5281/zenodo.1209633)',bbox:[5.763545147601,46.793670688196,15.152753273727,55.945635321533],params:{LAYERS:"S2_L2A_MAJA_FRE",VERSION:"1.1.0",FORMAT:"image/png"},expanded:!0,styles:[{default:!0,legendURL:"https://geoservice.dlr.de/eoc/imagery/wms?service=WMS&version=1.3.0&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=S2_L2A_MAJA_FRE",name:"s2-l2a-maja-fre",title:"True Color Image (FRE)"},{default:!1,legendURL:"https://geoservice.dlr.de/eoc/imagery/wms?service=WMS&version=1.3.0&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=S2_L2A_MAJA_FRE&style=s2-swir",name:"s2-swir",title:"S2 Short-Wave Infrared"},{default:!1,legendURL:"https://geoservice.dlr.de/eoc/imagery/wms?service=WMS&version=1.3.0&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=S2_L2A_MAJA_FRE&style=s2-land-water",name:"s2-land-water",title:"S2 Land/Water"},{default:!1,legendURL:"https://geoservice.dlr.de/eoc/imagery/wms?service=WMS&version=1.3.0&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=S2_L2A_MAJA_FRE&style=s2-vegetation-analysis",name:"s2-vegetation-analysis",title:"S2 vegetation analysis"}],popup:{dynamicPopup:{component:A,getAttributes:d=>({layer:d.layer,event:d.mapEvent})}}});this.layersSvc.addLayer(f,f.filtertype)}ngOnDestroy(){this.subs.forEach(t=>t.unsubscribe())}}return a.\u0275fac=function(t){return new(t||a)(e.Y36(m.KD),e.Y36(y.I3))},a.\u0275cmp=e.Xpm({type:a,selectors:[["app-route-map6"]],hostVars:2,hostBindings:function(t,o){2&t&&e.Tol(o.class)},features:[e._Bn([m.KD,y.I3,v.BR])],decls:13,vars:11,consts:[[1,"content-area"],["id","olMap",3,"layersSvc","mapState","controls"],[1,"right",3,"clrVerticalNavCollapsible","clr-nav-level"],[1,"layers",3,"clrVerticalNavGroupExpanded"],["shape","layers","clrVerticalNavIcon","","title","layers"],[1,"padding","title-ellipsis"],[3,"layersSvc","mapStateSvc"],["shape","world","title","Baselayers","clrVerticalNavIcon",""]],template:function(t,o){1&t&&(e.TgZ(0,"main",0),e._UZ(1,"ukis-map-ol",1),e.qZA(),e.TgZ(2,"clr-vertical-nav",2)(3,"clr-vertical-nav-group",3),e._UZ(4,"clr-icon",4),e._uU(5," Layers "),e.TgZ(6,"clr-vertical-nav-group-children",5),e._UZ(7,"ukis-layer-control",6),e.qZA()(),e.TgZ(8,"clr-vertical-nav-group",3),e._UZ(9,"clr-icon",7),e._uU(10," Baselayers "),e.TgZ(11,"clr-vertical-nav-group-children",5),e._UZ(12,"ukis-base-layer-control",6),e.qZA()()()),2&t&&(e.xp6(1),e.Q6J("layersSvc",o.layersSvc)("mapState",o.mapStateSvc)("controls",o.controls),e.xp6(1),e.Q6J("clrVerticalNavCollapsible",!0)("clr-nav-level",2),e.xp6(1),e.Q6J("clrVerticalNavGroupExpanded",!0),e.xp6(4),e.Q6J("layersSvc",o.layersSvc)("mapStateSvc",o.mapStateSvc),e.xp6(1),e.Q6J("clrVerticalNavGroupExpanded",!0),e.xp6(4),e.Q6J("layersSvc",o.layersSvc)("mapStateSvc",o.mapStateSvc))},dependencies:[c.qvL,c.saT,c.fzC,c.A0B,c.d6G,c.ogR,E.E,L.l,w.j]}),a})();var O=i(5508);const _=[{path:"",component:x}];let T=(()=>{class a{}return a.\u0275fac=function(t){return new(t||a)},a.\u0275mod=e.oAB({type:a}),a.\u0275inj=e.cJS({imports:[g.Bz.forChild(_),g.Bz]}),a})(),C=(()=>{class a{}return a.\u0275fac=function(t){return new(t||a)},a.\u0275mod=e.oAB({type:a}),a.\u0275inj=e.cJS({imports:[l.ez,S.q,T,c.K6A,O.cE,v.oC]}),a})()}}]);