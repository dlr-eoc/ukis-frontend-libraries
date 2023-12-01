"use strict";(self.webpackChunkdemo_maps=self.webpackChunkdemo_maps||[]).push([[405],{2134:(C,v,n)=>{n.d(v,{um:()=>d,RP:()=>f,HF:()=>e,Kl:()=>u,aZ:()=>h,fc:()=>g,HX:()=>T,zc:()=>y,gY:()=>S,Bz:()=>_});var c=n(9265);class S extends c.YY{constructor(o){const r={name:"OpenStreetMap",displayName:"OpenStreetMap",id:"osm",visible:!1,type:"xyz",url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",subdomains:["a","b","c"],attribution:'&copy, <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors',continuousWorld:!1,legendImg:"https://a.tile.openstreetmap.org/3/4/3.png",description:"OpenStreetMap z-x-y Tiles",opacity:1};o&&Object.assign(r,o),super(r)}}class y extends c.YY{constructor(o){const r={name:"OpenSeaMap",displayName:"OpenSeaMap",id:"OpenSeaMap",visible:!1,type:"xyz",removable:!1,url:"https://{s}.openseamap.org/seamark/{z}/{x}/{y}.png",subdomains:["t1"],attribution:'&copy, <a href="https://map.openseamap.org/legend.php?lang=de&page=license">OpenSeaMap</a>',continuousWorld:!1,legendImg:"https://t1.openseamap.org/seamark/10/554/321.png",description:"http://map.openseamap.org/",opacity:1};o&&Object.assign(r,o),super(r)}}class u extends c.TI{constructor(o){const r={name:"EOC Litemap",displayName:"EOC Litemap",id:"eoc_litemap",visible:!1,type:"wms",removable:!1,params:{LAYERS:"litemap",FORMAT:"image/png",TRANSPARENT:!0},url:"https://geoservice.dlr.de/eoc/basemap/wms",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://geoservice.dlr.de/eoc/basemap/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=litemap&ATTRIBUTION=&WIDTH=256&HEIGHT=256&CRS=EPSG%3A3857&STYLES=&BBOX=0%2C0%2C10018754.171394622%2C10018754.171394622",description:"http://www.naturalearthdata.com/about/",opacity:1};o&&Object.assign(r,o),super(r)}}class h extends c.RC{constructor(o){const r={name:"EOC Litemap Tile",displayName:"EOC Litemap Tile",id:"eoc_litemap_tile",visible:!1,type:"wmts",removable:!1,params:{layer:"eoc:litemap",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Alitemap&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"EOC Litemap as web map tile service",opacity:1};o&&Object.assign(r,o),super(r)}}class g extends c.RC{constructor(o){const r={name:"EOC Liteoverlay Tile",displayName:"EOC LiteoverlayTile",id:"eoc_Liteoverlay_tile",visible:!1,type:"wmts",removable:!1,params:{layer:"eoc:liteoverlay",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Aliteoverlay&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"This is the liteoverlay provided for EOC Service Portals",opacity:1};o&&Object.assign(r,o),super(r)}}class f extends c.RC{constructor(o){const r={name:"EOC Basemap Tile",displayName:"EOC Basemap Tile",id:"eoc_basemap_tile",visible:!1,type:"wmts",removable:!1,params:{layer:"eoc:basemap",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Abasemap&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"This is the basemap for DLR Service Portals",opacity:1};o&&Object.assign(r,o),super(r)}}class e extends c.RC{constructor(o){const r={name:"EOC Baseoverlay Tile",displayName:"EOC Baseoverlay Tile",id:"eoc_Baseoverlay_tile",visible:!1,type:"wmts",removable:!1,params:{layer:"eoc:baseoverlay",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Abaseoverlay&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"This is the basemap for DLR Service Portals",opacity:1};o&&Object.assign(r,o),super(r)}}class d extends c.RC{constructor(o){const r={name:"BlueMarble Tile",displayName:"BlueMarble Tile",id:"blueMarble_tile",visible:!1,type:"wmts",removable:!1,params:{layer:"bmng_topo_bathy",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=bmng_topo_bathy&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"Blue Marble NG dataset with topography and bathymetry",opacity:1};o&&Object.assign(r,o),super(r)}}class _ extends c.RC{constructor(o){const r={name:"World Relief B/W Tile",displayName:"World Relief B/W Tile",id:"eoc:world_relief_bw",visible:!1,type:"wmts",removable:!1,params:{layer:"eoc:world_relief_bw",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Aworld_relief_bw&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"World Relief Black / White",opacity:1};o&&Object.assign(r,o),super(r)}}class T extends c.RC{constructor(o){const r={name:"Hillshade Tile",displayName:"Hillshade Tile",id:"eoc_hillshade",visible:!1,type:"wmts",removable:!1,params:{layer:"hillshade",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=hillshade&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"Global Hillshade based on GMTED2010",opacity:1};o&&Object.assign(r,o),super(r)}}},3405:(C,v,n)=>{n.r(v),n.d(v,{RouteMap2Module:()=>A,RouteMap2RoutingModule:()=>M});var c=n(6733),S=n(6785),y=n(6764),u=n(9265),h=n(5118),g=n(5829),f=n(2134),e=n(755),d=n(6465),_=n(4961),T=n(8558),p=n(3226);let o=(()=>{class s{constructor(){this.inputStep=.01,this.precision=2}ngOnInit(){this.subscription=this.mapState.getMapState().subscribe(t=>{this.mapstate=t})}ngOnDestroy(){this.subscription.unsubscribe()}zoomIn(){this.mapstate.zoom++,this.setNewState(this.mapstate)}zoomOut(){this.mapstate.zoom--,this.setNewState(this.mapstate)}setNewState(t){t.options.notifier="user",this.mapState.setMapState(t)}stateChange(t){this.setNewState(this.mapstate)}setInputStep(t){const i=Array.from(Array(t),(a,m)=>"0").join("");this.inputStep=1/+`1${i}`}toPrecision(t,i){return t.toFixed(i)}static#e=this.\u0275fac=function(i){return new(i||s)};static#t=this.\u0275cmp=e.Xpm({type:s,selectors:[["ukis-map-navigator"]],inputs:{mapState:"mapState"},decls:22,vars:7,consts:[[1,"clr-row"],[1,"clr-col-9"],[1,"output-container"],["clrForm",""],["clrInput","","type","number","name","lon",3,"ngModel","step","ngModelChange"],["clrInput","","type","number","name","lat",3,"ngModel","step","ngModelChange"],["clrInput","","type","number","name","zoom",3,"ngModel","step","ngModelChange"],[1,"clr-col-3"],[1,"input-container"],["type","number","min","0","max","8","step","1","name","precision","clrInput","",3,"ngModel","ngModelChange"]],template:function(i,a){1&i&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"form",3)(4,"clr-input-container")(5,"label"),e._uU(6,"Lon"),e.qZA(),e.TgZ(7,"input",4),e.NdJ("ngModelChange",function(l){return a.mapstate.center.lon=l})("ngModelChange",function(l){return a.stateChange(l)}),e.qZA()(),e.TgZ(8,"clr-input-container")(9,"label"),e._uU(10,"Lat"),e.qZA(),e.TgZ(11,"input",5),e.NdJ("ngModelChange",function(l){return a.mapstate.center.lat=l})("ngModelChange",function(l){return a.stateChange(l)}),e.qZA()(),e.TgZ(12,"clr-input-container")(13,"label"),e._uU(14,"Zoom"),e.qZA(),e.TgZ(15,"input",6),e.NdJ("ngModelChange",function(l){return a.mapstate.zoom=l})("ngModelChange",function(l){return a.stateChange(l)}),e.qZA()()()()(),e.TgZ(16,"div",7)(17,"div",8)(18,"clr-input-container")(19,"label"),e._uU(20,"Precision "),e.qZA(),e.TgZ(21,"input",9),e.NdJ("ngModelChange",function(l){return a.precision=l})("ngModelChange",function(l){return a.setInputStep(l)}),e.qZA()()()()()),2&i&&(e.xp6(7),e.Q6J("ngModel",a.mapstate.center.lon)("step",a.inputStep),e.xp6(4),e.Q6J("ngModel",a.mapstate.center.lat)("step",a.inputStep),e.xp6(4),e.Q6J("ngModel",a.mapstate.zoom)("step",a.inputStep),e.xp6(6),e.Q6J("ngModel",a.precision))},dependencies:[p._Y,p.Fj,p.wV,p.JJ,p.JL,p.qQ,p.Fd,p.On,p.F,d.MgK,d.YAP,d.xRP,d.G55],styles:[".output-container[_ngcontent-%COMP%]   .clr-form-control[_ngcontent-%COMP%]:first-child{margin-top:0rem}.output-container[_ngcontent-%COMP%]   .clr-input[_ngcontent-%COMP%]{width:90%}"]})}return s})();var r=n(912);const x=function(s){return{"is-solid":s}};function w(s,b){if(1&s){const t=e.EpF();e.TgZ(0,"div",2),e.NdJ("click",function(){const m=e.CHM(t).$implicit,l=e.oxw(2);return e.KtG(l.setNewProjection(m))}),e.TgZ(1,"div",3)(2,"div",4)(3,"span",5),e.NdJ("click",function(){const m=e.CHM(t).$implicit,l=e.oxw(2);return e.KtG(l.setNewProjection(m))}),e._uU(4),e.qZA(),e._UZ(5,"clr-icon",6),e.qZA()()()}if(2&s){const t=b.$implicit,i=e.oxw(2);e.xp6(3),e.Q6J("title",t.title),e.xp6(1),e.hij(" ",t.title||t.code," "),e.xp6(1),e.s9C("title",t.code),e.Q6J("ngClass",e.VKq(5,x,t===i.selectedProj)),e.uIk("shape",t===i.selectedProj?"eye":"eye-hide")}}function E(s,b){if(1&s&&(e.TgZ(0,"div"),e.YNc(1,w,6,7,"div",1),e.qZA()),2&s){const t=e.oxw();e.xp6(1),e.Q6J("ngForOf",t.projList)}}let P=(()=>{class s{constructor(){this.fitViewToNewExtent=!1}ngOnInit(){this.projList[0]&&this.setNewProjection(this.projList[0])}setNewProjection(t){this.mapSvc.registerProjection(t);const i=this.mapSvc.getOlProjection(t);this.mapSvc.setProjection(i),this.fitViewToNewExtent&&this.mapStateSvc.setExtent(t.worldExtent),this.selectedProj=t}static#e=this.\u0275fac=function(i){return new(i||s)};static#t=this.\u0275cmp=e.Xpm({type:s,selectors:[["ukis-projection-switch"]],inputs:{mapSvc:"mapSvc",mapStateSvc:"mapStateSvc",projList:["projectionList","projList"],fitViewToNewExtent:"fitViewToNewExtent"},decls:1,vars:1,consts:[[4,"ngIf"],[3,"click",4,"ngFor","ngForOf"],[3,"click"],[1,"layergroup"],[1,"head"],[1,"title",3,"title","click"],[1,"iconButton",3,"ngClass","title"]],template:function(i,a){1&i&&e.YNc(0,E,2,1,"div",0),2&i&&e.Q6J("ngIf",a.projList)},dependencies:[c.mk,c.sg,c.O5,d.qvL],encapsulation:2})}return s})(),O=(()=>{class s{constructor(t,i,a){this.layersSvc=t,this.mapStateSvc=i,this.mapSvc=a,this.class="content-container",this.controls={attribution:!0,scaleLine:!0},this.projections=[{code:"EPSG:3857",proj4js:"+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs +type=crs",title:"Spherical Mercator",extent:[-20037508.34,-20048966.1,20037508.34,20048966.1],worldExtent:[-180,-85.06,180,85.06],global:!0,units:"m"},{code:"EPSG:3995",proj4js:"+proj=stere +lat_0=90 +lat_ts=71 +lon_0=0 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs +type=crs",title:"Arctic Polar Stereographic",extent:[-3299207.53,-3333134.03,3299207.53,3333134.03],worldExtent:[-180,60,180,90],global:!0,units:"m"},{code:"EPSG:3031",proj4js:"+proj=stere +lat_0=-90 +lat_ts=-71 +lon_0=0 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs +type=crs",title:"Antarctic Polar Stereographic",extent:[-3299207.53,-3333134.03,3299207.53,3333134.03],worldExtent:[-180,-90,180,-60],global:!0,units:"m"}],this.addOverlays(),this.mapStateSvc.setExtent([-14,33,40,57])}ngOnInit(){}addOverlays(){[new f.gY({removable:!0,legendImg:null,visible:!0,id:"osm"}),new u.YY({type:"wms",url:"https://geoservice.dlr.de/eoc/land/wms",name:"GUF Mosaic",id:"GUF28_DLR_v1_Mosaic",params:{layers:"GUF28_DLR_v1_Mosaic",styles:"guf_8bit"},visible:!1,description:"GUF28_DLR_v1_Mosaic",attribution:' | GUF\xae: <a href="https://www.dlr.de/eoc/en/desktopdefault.aspx/tabid-9628/16557_read-40454/">DLR License</a>',legendImg:""}),new u.DJ({id:"geojson_test",name:"GeoJSON Vector Layer",type:"geojson",data:{type:"FeatureCollection",features:[{type:"Feature",properties:{},geometry:{type:"Polygon",coordinates:[[[12.65625,49.61070993807422],[20.698242187499996,46.830133640447386],[22.5,49.781264058178344],[15.161132812500002,51.508742458803326],[12.65625,49.61070993807422]]]}}]},visible:!0})].map(l=>this.layersSvc.addLayer(l,"Layers"))}static#e=this.\u0275fac=function(i){return new(i||s)(e.Y36(u.KD),e.Y36(h.I3),e.Y36(g.BR))};static#t=this.\u0275cmp=e.Xpm({type:s,selectors:[["app-route-map2"]],hostVars:2,hostBindings:function(i,a){2&i&&e.Tol(a.class)},features:[e._Bn([u.KD,h.I3,g.BR])],decls:23,vars:16,consts:[[1,"content-area","map-view"],["id","olMap",3,"layersSvc","mapState","controls"],[1,"right",3,"clrVerticalNavCollapsible","clr-nav-level"],[1,"layers",3,"clrVerticalNavGroupExpanded"],["shape","layers","clrVerticalNavIcon","","title","layers"],[1,"padding","title-ellipsis"],[3,"layersSvc","mapStateSvc"],["title","Projection",1,"layers",3,"clrVerticalNavGroupExpanded"],["shape","map","clrVerticalNavIcon",""],[3,"mapSvc","projectionList","fitViewToNewExtent","mapStateSvc"],["title","Coordinates",1,"layers",3,"clrVerticalNavGroupExpanded"],["shape","compass","clrVerticalNavIcon",""],["title","Navigator",1,"layers",3,"clrVerticalNavGroupExpanded"],[3,"mapState"]],template:function(i,a){1&i&&(e.TgZ(0,"main",0),e._UZ(1,"ukis-map-ol",1),e.qZA(),e.TgZ(2,"clr-vertical-nav",2)(3,"clr-vertical-nav-group",3),e._UZ(4,"clr-icon",4),e._uU(5," Layers "),e.TgZ(6,"clr-vertical-nav-group-children",5),e._UZ(7,"ukis-layer-control",6),e.qZA()(),e.TgZ(8,"clr-vertical-nav-group",7),e._UZ(9,"clr-icon",8),e._uU(10," Projection "),e.TgZ(11,"clr-vertical-nav-group-children",5),e._UZ(12,"ukis-projection-switch",9),e.qZA()(),e.TgZ(13,"clr-vertical-nav-group",10),e._UZ(14,"clr-icon",11),e._uU(15," Coordinates "),e.TgZ(16,"clr-vertical-nav-group-children",5),e._UZ(17,"ukis-mouse-position"),e.qZA()(),e.TgZ(18,"clr-vertical-nav-group",12),e._UZ(19,"clr-icon",11),e._uU(20," Navigator "),e.TgZ(21,"clr-vertical-nav-group-children",5),e._UZ(22,"ukis-map-navigator",13),e.qZA()()()),2&i&&(e.xp6(1),e.Q6J("layersSvc",a.layersSvc)("mapState",a.mapStateSvc)("controls",a.controls),e.xp6(1),e.Q6J("clrVerticalNavCollapsible",!0)("clr-nav-level",2),e.xp6(1),e.Q6J("clrVerticalNavGroupExpanded",!0),e.xp6(4),e.Q6J("layersSvc",a.layersSvc)("mapStateSvc",a.mapStateSvc),e.xp6(1),e.Q6J("clrVerticalNavGroupExpanded",!0),e.xp6(4),e.Q6J("mapSvc",a.mapSvc)("projectionList",a.projections)("fitViewToNewExtent",!0)("mapStateSvc",a.mapStateSvc),e.xp6(1),e.Q6J("clrVerticalNavGroupExpanded",!0),e.xp6(5),e.Q6J("clrVerticalNavGroupExpanded",!0),e.xp6(4),e.Q6J("mapState",a.mapStateSvc))},dependencies:[d.qvL,d.saT,d.fzC,d.A0B,d.d6G,d.ogR,_.E,T.j,o,r.C,P]})}return s})();var N=n(6750),R=n(2759);const G=[{path:"",component:O}];let M=(()=>{class s{static#e=this.\u0275fac=function(i){return new(i||s)};static#t=this.\u0275mod=e.oAB({type:s});static#a=this.\u0275inj=e.cJS({imports:[y.Bz.forChild(G),y.Bz]})}return s})(),A=(()=>{class s{static#e=this.\u0275fac=function(i){return new(i||s)};static#t=this.\u0275mod=e.oAB({type:s});static#a=this.\u0275inj=e.cJS({imports:[c.ez,S.q,M,d.K6A,N.cE,g.oC,R.X8]})}return s})()}}]);