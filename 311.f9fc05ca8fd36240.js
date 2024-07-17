"use strict";(self.webpackChunkdemo_maps=self.webpackChunkdemo_maps||[]).push([[311],{6924:(E,y,r)=>{r.d(y,{gD:()=>e,tH:()=>f,hQ:()=>b,wl:()=>m,me:()=>g,WX:()=>S,nu:()=>p,si:()=>u,dl:()=>h,zT:()=>R});var o=r(8356);class h extends o.Bk{constructor(t){const a={name:"OpenStreetMap",displayName:"OpenStreetMap",id:"osm",visible:!1,type:"xyz",url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",subdomains:["a","b","c"],attribution:'&copy, <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors',continuousWorld:!1,legendImg:"https://a.tile.openstreetmap.org/3/4/3.png",description:"OpenStreetMap z-x-y Tiles",opacity:1};t&&Object.assign(a,t),super(a)}}class u extends o.Bk{constructor(t){const a={name:"OpenSeaMap",displayName:"OpenSeaMap",id:"OpenSeaMap",visible:!1,type:"xyz",removable:!1,url:"https://{s}.openseamap.org/seamark/{z}/{x}/{y}.png",subdomains:["t1"],attribution:'&copy, <a href="https://map.openseamap.org/legend.php?lang=de&page=license">OpenSeaMap</a>',continuousWorld:!1,legendImg:"https://t1.openseamap.org/seamark/10/554/321.png",description:"http://map.openseamap.org/",opacity:1};t&&Object.assign(a,t),super(a)}}class m extends o.nw{constructor(t){const a={name:"EOC Litemap",displayName:"EOC Litemap",id:"eoc_litemap",visible:!1,type:"wms",removable:!1,params:{LAYERS:"litemap",FORMAT:"image/png",TRANSPARENT:!0},url:"https://geoservice.dlr.de/eoc/basemap/wms",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://geoservice.dlr.de/eoc/basemap/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=litemap&ATTRIBUTION=&WIDTH=256&HEIGHT=256&CRS=EPSG%3A3857&STYLES=&BBOX=0%2C0%2C10018754.171394622%2C10018754.171394622",description:"http://www.naturalearthdata.com/about/",opacity:1};t&&Object.assign(a,t),super(a)}}class g extends o.fn{constructor(t){const a={name:"EOC Litemap Tile",displayName:"EOC Litemap Tile",id:"eoc_litemap_tile",visible:!1,type:"wmts",removable:!1,params:{layer:"eoc:litemap",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Alitemap&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"EOC Litemap as web map tile service",opacity:1};t&&Object.assign(a,t),super(a)}}class S extends o.fn{constructor(t){const a={name:"EOC Liteoverlay Tile",displayName:"EOC LiteoverlayTile",id:"eoc_Liteoverlay_tile",visible:!1,type:"wmts",removable:!1,params:{layer:"eoc:liteoverlay",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Aliteoverlay&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"This is the liteoverlay provided for EOC Service Portals",opacity:1};t&&Object.assign(a,t),super(a)}}class f extends o.fn{constructor(t){const a={name:"EOC Basemap Tile",displayName:"EOC Basemap Tile",id:"eoc_basemap_tile",visible:!1,type:"wmts",removable:!1,params:{layer:"eoc:basemap",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Abasemap&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"This is the basemap for DLR Service Portals",opacity:1};t&&Object.assign(a,t),super(a)}}class b extends o.fn{constructor(t){const a={name:"EOC Baseoverlay Tile",displayName:"EOC Baseoverlay Tile",id:"eoc_Baseoverlay_tile",visible:!1,type:"wmts",removable:!1,params:{layer:"eoc:baseoverlay",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Abaseoverlay&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"This is the basemap for DLR Service Portals",opacity:1};t&&Object.assign(a,t),super(a)}}class e extends o.fn{constructor(t){const a={name:"BlueMarble Tile",displayName:"BlueMarble Tile",id:"blueMarble_tile",visible:!1,type:"wmts",removable:!1,params:{layer:"bmng_topo_bathy",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=bmng_topo_bathy&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"Blue Marble NG dataset with topography and bathymetry",opacity:1};t&&Object.assign(a,t),super(a)}}class R extends o.fn{constructor(t){const a={name:"World Relief B/W Tile",displayName:"World Relief B/W Tile",id:"eoc:world_relief_bw",visible:!1,type:"wmts",removable:!1,params:{layer:"eoc:world_relief_bw",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Aworld_relief_bw&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"World Relief Black / White",opacity:1};t&&Object.assign(a,t),super(a)}}class p extends o.fn{constructor(t){const a={name:"Hillshade Tile",displayName:"Hillshade Tile",id:"eoc_hillshade",visible:!1,type:"wmts",removable:!1,params:{layer:"hillshade",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=hillshade&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"Global Hillshade based on GMTED2010",opacity:1};t&&Object.assign(a,t),super(a)}}},311:(E,y,r)=>{r.r(y),r.d(y,{RouteMap6Module:()=>_,RouteMap6RoutingModule:()=>A});var o=r(6610),h=r(745),u=r(7925),m=r(8356),g=r(6138),S=r(6924),f=r(2218),b=r(3527),e=r(3279),R=r(6409),p=r(5944);function c(i,v){if(1&i&&(e.j41(0,"tr")(1,"th"),e.EFF(2),e.k0s(),e.j41(3,"td"),e.EFF(4),e.k0s()()),2&i){const s=v.$implicit;e.R7$(2),e.JRh(s.key),e.R7$(2),e.JRh(s.value)}}function t(i,v){if(1&i&&(e.j41(0,"tbody"),e.DNE(1,c,5,2,"tr",3),e.nI1(2,"keyvalue"),e.k0s()),2&i){const s=v.ngIf;e.R7$(),e.Y8G("ngForOf",e.bMT(2,1,s))}}function a(i,v){1&i&&(e.j41(0,"clr-spinner",4),e.EFF(1,"Loading ..."),e.k0s()),2&i&&e.Y8G("clrInline",!0)}let T=(()=>{class i{constructor(s){this.http=s}ngOnInit(){this.data$=this.getFeatureInfo().pipe((0,b.T)(s=>s.features[0].properties))}getFeatureInfo(){const s=this.layer.getSource().getFeatureInfoUrl(this.event.coordinate,this.event.frameState.viewState.resolution,this.event.frameState.viewState.projection.getCode(),{INFO_FORMAT:"application/json"});return console.log("getting",s),this.http.get(s)}static#e=this.\u0275fac=function(l){return new(l||i)(e.rXU(R.Qq))};static#t=this.\u0275cmp=e.VBU({type:i,selectors:[["app-raster-feature-info"]],inputs:{layer:"layer",event:"event"},decls:7,vars:4,consts:[["loading",""],[1,"table","table-vertical"],[4,"ngIf","ngIfElse"],[4,"ngFor","ngForOf"],[3,"clrInline"]],template:function(l,n){if(1&l&&(e.j41(0,"table",1)(1,"caption"),e.EFF(2," Feature properties "),e.k0s(),e.DNE(3,t,3,3,"tbody",2),e.nI1(4,"async"),e.k0s(),e.DNE(5,a,2,1,"ng-template",null,0,e.C5r)),2&l){const d=e.sdS(6);e.R7$(3),e.Y8G("ngIf",e.bMT(4,2,n.data$))("ngIfElse",d)}},dependencies:[p.BkK,o.Sq,o.bT,o.Jj,o.lG]})}return i})();var M=r(3982),w=r(479),L=r(7421),G=r(6647),F=r(9139),O=r(733);M.h.addIcons(w.Q,L.A);let x=(()=>{class i{constructor(s,l){this.layersSvc=s,this.mapStateSvc=l,this.class="content-container",this.subs=[],this.controls={attribution:!0,scaleLine:!0}}ngOnInit(){this.addBaseLayers(),this.addLayers(),this.mapStateSvc.setExtent([9.681317514755053,47.425291526740125,12.765729135848805,49.213103602937025]),this.layersSvc.getLayers().subscribe(s=>console.log("layers are now ",s))}addBaseLayers(){const s=new S.wl({visible:!0,tileSize:512});this.layersSvc.addLayer(s,"Baselayers")}addLayers(){const s=new m.fn({type:"wmts",id:"TDM90_AMP",visible:!1,url:"https://tiles.geoservice.dlr.de/service/wmts?",name:"TDM90_AMP",filtertype:"Layers",attribution:'| TDM90 Data &copy; <a href="http://www.dlr.de" target="_blank">DLR</a> licensed for <a rel="license" target="_blank" href="https://geoservice.dlr.de/resources/licenses/tdm90/License_for_the_Utilization_of_90m_DEM_for_Scientific_Use.pdf">scientific use</a>',params:{layer:"TDM90_AMP",version:"1.1.0",format:"image/png",style:"default",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},styles:[{default:!0,name:"default",title:"default"},{default:!1,name:"none",title:"none"}]});this.layersSvc.addLayer(s,s.filtertype);const l=new m.nw({type:"wms",id:"S2_L3A_WASP_FRC_P1M",url:"https://{s}.geoservice.dlr.de/eoc/imagery/wms?",name:"Sentinel-2 L3A FRC (WASP)",subdomains:["a","b","c","d"],filtertype:"Layers",attribution:'| &copy; <a href="http://www.dlr.de" target="_blank">DLR</a> Contains modified Copernicus Sentinel Data [2020]',params:{LAYERS:"S2_L3A_WASP_FRC_P1M",VERSION:"1.1.0",FORMAT:"image/png"},expanded:!0,bbox:[2.183,47.076,8.206,49.287],styles:[{default:!0,legendURL:"https://geoservice.dlr.de/eoc/imagery/wms?service=WMS&request=GetLegendGraphic&format=image/png&width=20&height=20&layer=land:S2_L3A_WASP_FRC_P1M",name:"s2-ndvi",title:"NDVI"},{default:!1,legendURL:"https://geoservice.dlr.de/eoc/imagery/wms?service=WMS&request=GetLegendGraphic&format=image/png&width=20&height=20&layer=land:S2_L3A_WASP_FRC_P1M",name:"s2-infrared",title:"Infrared (8,4,3)"},{default:!1,legendURL:"https://geoservice.dlr.de/eoc/imagery/wms?service=WMS&request=GetLegendGraphic&format=image/png&width=20&height=20&layer=land:S2_L3A_WASP_FRC_P1M",name:"s2-l3a-wasp-frc",title:"Style for L3A MAJA/WASP Ground Reflectances"}],popup:{dynamicPopup:{component:T,getAttributes:d=>({layer:d.layer,event:d.mapEvent})}}});this.layersSvc.addLayer(l,l.filtertype);const n=new m.nw({type:"wms",id:"S2_L2A_MAJA_FRE",url:"https://{s}.geoservice.dlr.de/eoc/imagery/wms?",name:"Sentinel-2 L2A FRE (MAJA)",subdomains:["a","b","c","d"],filtertype:"Layers",attribution:'| &copy; <a href="http://www.dlr.de" target="_blank">DLR</a> Sentinel-2 L2A MAJA (MACCS-ATCOR Joint Algorithm) ground reflectance with the correction of slope effects (FRE) in 10m resolution based on the MAJA processor (https://doi.org/10.5281/zenodo.1209633)',bbox:[5.763545147601,46.793670688196,15.152753273727,55.945635321533],params:{LAYERS:"S2_L2A_MAJA_FRE",VERSION:"1.1.0",FORMAT:"image/png"},expanded:!0,styles:[{default:!0,legendURL:"https://geoservice.dlr.de/eoc/imagery/wms?service=WMS&version=1.3.0&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=S2_L2A_MAJA_FRE",name:"s2-l2a-maja-fre",title:"True Color Image (FRE)"},{default:!1,legendURL:"https://geoservice.dlr.de/eoc/imagery/wms?service=WMS&version=1.3.0&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=S2_L2A_MAJA_FRE&style=s2-swir",name:"s2-swir",title:"S2 Short-Wave Infrared"},{default:!1,legendURL:"https://geoservice.dlr.de/eoc/imagery/wms?service=WMS&version=1.3.0&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=S2_L2A_MAJA_FRE&style=s2-land-water",name:"s2-land-water",title:"S2 Land/Water"},{default:!1,legendURL:"https://geoservice.dlr.de/eoc/imagery/wms?service=WMS&version=1.3.0&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=S2_L2A_MAJA_FRE&style=s2-vegetation-analysis",name:"s2-vegetation-analysis",title:"S2 vegetation analysis"}],popup:{dynamicPopup:{component:T,getAttributes:d=>({layer:d.layer,event:d.mapEvent})}}});this.layersSvc.addLayer(n,n.filtertype)}ngOnDestroy(){this.subs.forEach(s=>s.unsubscribe())}static#e=this.\u0275fac=function(l){return new(l||i)(e.rXU(m._t),e.rXU(g.du))};static#t=this.\u0275cmp=e.VBU({type:i,selectors:[["app-route-map6"]],hostVars:2,hostBindings:function(l,n){2&l&&e.HbH(n.class)},features:[e.Jv_([m._t,g.du,f.tC])],decls:13,vars:11,consts:[[1,"content-area","map-view"],["id","olMap",3,"layersSvc","mapState","controls"],[1,"right",3,"clrVerticalNavCollapsible","clr-nav-level"],[1,"layers",3,"clrVerticalNavGroupExpanded"],["shape","layers","clrVerticalNavIcon","","title","layers"],[1,"padding","title-ellipsis"],[3,"layersSvc","mapStateSvc"],["shape","world","title","Baselayers","clrVerticalNavIcon",""]],template:function(l,n){1&l&&(e.j41(0,"main",0),e.nrm(1,"ukis-map-ol",1),e.k0s(),e.j41(2,"clr-vertical-nav",2)(3,"clr-vertical-nav-group",3),e.nrm(4,"cds-icon",4),e.EFF(5," Layers "),e.j41(6,"clr-vertical-nav-group-children",5),e.nrm(7,"ukis-layer-control",6),e.k0s()(),e.j41(8,"clr-vertical-nav-group",3),e.nrm(9,"cds-icon",7),e.EFF(10," Baselayers "),e.j41(11,"clr-vertical-nav-group-children",5),e.nrm(12,"ukis-base-layer-control",6),e.k0s()()()),2&l&&(e.R7$(),e.Y8G("layersSvc",n.layersSvc)("mapState",n.mapStateSvc)("controls",n.controls),e.R7$(),e.Y8G("clrVerticalNavCollapsible",!0)("clr-nav-level",2),e.R7$(),e.Y8G("clrVerticalNavGroupExpanded",!0),e.R7$(4),e.Y8G("layersSvc",n.layersSvc)("mapStateSvc",n.mapStateSvc),e.R7$(),e.Y8G("clrVerticalNavGroupExpanded",!0),e.R7$(4),e.Y8G("layersSvc",n.layersSvc)("mapStateSvc",n.mapStateSvc))},dependencies:[p.BlU,p.ndX,p.D2I,p.wqM,p.zLy,p.Wfw,G.S,F.N,O.L]})}return i})();var P=r(6174);const C=[{path:"",component:x}];let A=(()=>{class i{static#e=this.\u0275fac=function(l){return new(l||i)};static#t=this.\u0275mod=e.$C({type:i});static#a=this.\u0275inj=e.G2t({imports:[u.iI.forChild(C),u.iI]})}return i})(),_=(()=>{class i{static#e=this.\u0275fac=function(l){return new(l||i)};static#t=this.\u0275mod=e.$C({type:i});static#a=this.\u0275inj=e.G2t({imports:[o.MD,h.u,A,p.PuD,P.$y,f.Cf]})}return i})()}}]);