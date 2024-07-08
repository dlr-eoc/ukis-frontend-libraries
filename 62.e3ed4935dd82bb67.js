"use strict";(self.webpackChunkdemo_maps=self.webpackChunkdemo_maps||[]).push([[62],{9766:(V,x,o)=>{o.d(x,{um:()=>O,RP:()=>R,HF:()=>A,Kl:()=>h,aZ:()=>E,fc:()=>v,HX:()=>e,zc:()=>P,gY:()=>w,Bz:()=>C});var u=o(2474);class w extends u.YY{constructor(i){const l={name:"OpenStreetMap",displayName:"OpenStreetMap",id:"osm",visible:!1,type:"xyz",url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",subdomains:["a","b","c"],attribution:'&copy, <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors',continuousWorld:!1,legendImg:"https://a.tile.openstreetmap.org/3/4/3.png",description:"OpenStreetMap z-x-y Tiles",opacity:1};i&&Object.assign(l,i),super(l)}}class P extends u.YY{constructor(i){const l={name:"OpenSeaMap",displayName:"OpenSeaMap",id:"OpenSeaMap",visible:!1,type:"xyz",removable:!1,url:"https://{s}.openseamap.org/seamark/{z}/{x}/{y}.png",subdomains:["t1"],attribution:'&copy, <a href="https://map.openseamap.org/legend.php?lang=de&page=license">OpenSeaMap</a>',continuousWorld:!1,legendImg:"https://t1.openseamap.org/seamark/10/554/321.png",description:"http://map.openseamap.org/",opacity:1};i&&Object.assign(l,i),super(l)}}class h extends u.TI{constructor(i){const l={name:"EOC Litemap",displayName:"EOC Litemap",id:"eoc_litemap",visible:!1,type:"wms",removable:!1,params:{LAYERS:"litemap",FORMAT:"image/png",TRANSPARENT:!0},url:"https://geoservice.dlr.de/eoc/basemap/wms",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://geoservice.dlr.de/eoc/basemap/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=litemap&ATTRIBUTION=&WIDTH=256&HEIGHT=256&CRS=EPSG%3A3857&STYLES=&BBOX=0%2C0%2C10018754.171394622%2C10018754.171394622",description:"http://www.naturalearthdata.com/about/",opacity:1};i&&Object.assign(l,i),super(l)}}class E extends u.RC{constructor(i){const l={name:"EOC Litemap Tile",displayName:"EOC Litemap Tile",id:"eoc_litemap_tile",visible:!1,type:"wmts",removable:!1,params:{layer:"eoc:litemap",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Alitemap&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"EOC Litemap as web map tile service",opacity:1};i&&Object.assign(l,i),super(l)}}class v extends u.RC{constructor(i){const l={name:"EOC Liteoverlay Tile",displayName:"EOC LiteoverlayTile",id:"eoc_Liteoverlay_tile",visible:!1,type:"wmts",removable:!1,params:{layer:"eoc:liteoverlay",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Aliteoverlay&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"This is the liteoverlay provided for EOC Service Portals",opacity:1};i&&Object.assign(l,i),super(l)}}class R extends u.RC{constructor(i){const l={name:"EOC Basemap Tile",displayName:"EOC Basemap Tile",id:"eoc_basemap_tile",visible:!1,type:"wmts",removable:!1,params:{layer:"eoc:basemap",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Abasemap&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"This is the basemap for DLR Service Portals",opacity:1};i&&Object.assign(l,i),super(l)}}class A extends u.RC{constructor(i){const l={name:"EOC Baseoverlay Tile",displayName:"EOC Baseoverlay Tile",id:"eoc_Baseoverlay_tile",visible:!1,type:"wmts",removable:!1,params:{layer:"eoc:baseoverlay",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Abaseoverlay&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"This is the basemap for DLR Service Portals",opacity:1};i&&Object.assign(l,i),super(l)}}class O extends u.RC{constructor(i){const l={name:"BlueMarble Tile",displayName:"BlueMarble Tile",id:"blueMarble_tile",visible:!1,type:"wmts",removable:!1,params:{layer:"bmng_topo_bathy",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=bmng_topo_bathy&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"Blue Marble NG dataset with topography and bathymetry",opacity:1};i&&Object.assign(l,i),super(l)}}class C extends u.RC{constructor(i){const l={name:"World Relief B/W Tile",displayName:"World Relief B/W Tile",id:"eoc:world_relief_bw",visible:!1,type:"wmts",removable:!1,params:{layer:"eoc:world_relief_bw",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Aworld_relief_bw&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"World Relief Black / White",opacity:1};i&&Object.assign(l,i),super(l)}}class e extends u.RC{constructor(i){const l={name:"Hillshade Tile",displayName:"Hillshade Tile",id:"eoc_hillshade",visible:!1,type:"wmts",removable:!1,params:{layer:"hillshade",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=hillshade&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"Global Hillshade based on GMTED2010",opacity:1};i&&Object.assign(l,i),super(l)}}},4062:(V,x,o)=>{o.r(x),o.d(x,{RouteMap7Module:()=>le,RouteMap7RoutingModule:()=>I});var u=o(3223),w=o(9498),P=o(1794),h=o(2474),E=o(285),v=o(9631),R=o(9766),A=o(9032),O=o(5784),C=o(2334),e=o(3714),c=o(1308),i=o(5616),l=o(7670),j=o(7178),Y=o(5645),S=o(6256),W=o(7704),z=o(1958),U=o(6706),Z=o(133),D=o(3250);let H=(()=>{class t{constructor(a,s){this.http=a,this.olSvc=s,U.Z.defs("EPSG:2966","+proj=tmerc +lat_0=37.5 +lon_0=-87.08333333333333 +k=0.999966667 +x_0=900000 +y_0=249999.9998983998 +datum=NAD83 +units=us-ft +no_defs"),(0,z.z2)(U.Z);const r=(0,W.U2)("EPSG:2966");(0,W.Ck)(r,"EPSG:4326"),this.geojson2966To4326=new S.Z({dataProjection:"EPSG:2966",featureProjection:"EPSG:4326"}),this.geojson4326=new S.Z({featureProjection:"EPSG:4326"})}getWfsSource(a){switch(a){case"all":return new c.Z({format:new S.Z,url:this.getRequestUrl(this.olSvc.EPSG),strategy:Z.$6});case"bbox":return new c.Z({format:new S.Z,url:(n,g,d)=>{const f=d.getCode();return this.getRequestUrl(f,n)},strategy:Z.VW});case"simplifyGeometry":const s=new c.Z({loader:(n,g,d)=>{const f=d.getCode();this.http.get(this.getRequestUrl(f,n)).subscribe(y=>{const T=(new S.Z).readFeatures(y);for(const b of T)b.geometry=b.getGeometry().simplify(1e3);s.addFeatures(T)})},strategy:Z.VW});return s;case"noProps":const r=new c.Z({loader:(n,g,d)=>{const f=d.getCode();this.http.get(this.getRequestUrl(f,n)).subscribe(y=>{const T=(new S.Z).readFeatures(y);for(const b of T)b.setProperties({});r.addFeatures(T)})},strategy:Z.VW});return r;case"tile":throw new Error("Tile-Strategy source not yet implemented.")}}getRequestUrl(a,s){a||(a="EPSG:4326");let r="https://ahocevar.com/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature";return r+=`&outputFormat=application/json&srsname=${a}`,r+="&typename=osm:water_areas",s&&(r+=`&bbox=${s.join(",")},${a}`),r}createWfsLayer(a,s,r,n){const g=this.getWfsSource(r),d=new i.Z({source:g,style:n});return new h.AO({id:a,name:s,custom_layer:d,popup:!0,visible:!1})}createVectorTileLayer(a,s){const r=new Y.Z({format:new l.Z,url:"https://ahocevar.com/geoserver/gwc/service/tms/1.0.0/ne:ne_10m_admin_0_countries@EPSG:4326@pbf/{z}/{x}/{-y}.pbf"}),n=new j.Z({source:r});return new h.AO({id:a,name:s,custom_layer:n,popup:!0,visible:!1})}static#e=this.\u0275fac=function(s){return new(s||t)(e.LFG(D.eN),e.LFG(v.BR))};static#t=this.\u0275prov=e.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var m=o(7243);function J(t,p){1&t&&(e.TgZ(0,"clr-signpost-content",4)(1,"h3"),e._uU(2,"Change detection"),e.qZA(),e.TgZ(3,"p"),e._uU(4,"This badge changes its color any time angular's change-detection was executed."),e.qZA()()),2&t&&e.Q6J("clrPosition","left-middle")}let Q=(()=>{class t{constructor(){this.color="white"}ngAfterContentChecked(){this.color=this.getRandomColor()}getRandomColor(){let s="#";for(let r=0;r<6;r++)s+="0123456789ABCDEF"[Math.floor(16*Math.random())];return s}static#e=this.\u0275fac=function(s){return new(s||t)};static#t=this.\u0275cmp=e.Xpm({type:t,selectors:[["ukis-blinker"]],decls:6,vars:2,consts:[[2,"margin","0px"],[3,"clrPosition",4,"clrIfOpen"],[1,"label"],[1,"badge"],[3,"clrPosition"]],template:function(s,r){1&s&&(e.TgZ(0,"p",0)(1,"clr-signpost"),e.YNc(2,J,5,1,"clr-signpost-content",1),e.qZA(),e.TgZ(3,"span",2),e._uU(4," Change detected "),e._UZ(5,"span",3),e.qZA()()),2&s&&(e.xp6(5),e.Udp("background-color",r.color))},dependencies:[m.nqY,m.EuU,m.hQ],styles:[".blinker[_ngcontent-%COMP%]{width:10px;height:10px}"]})}return t})();var G=o(1921);function M(){return M=(0,G.Z)(function*(t){return N(function $(){return L.apply(this,arguments)}(),t,[]).then(p=>function K(t){return function k(t){let p=0;for(const a of t)p+=a;return p}(t)/t.length}(p))}),M.apply(this,arguments)}function N(t,p,a){return F.apply(this,arguments)}function F(){return(F=(0,G.Z)(function*(t,p,a){return t.then(s=>(a.push(s),p>1?N(t,p-1,a):a))})).apply(this,arguments)}function L(){return(L=(0,G.Z)(function*(){return new Promise((p,a)=>{const s=window.performance.now();setTimeout(()=>{const g=1e3/(window.performance.now()-s);p(g)},0)})})).apply(this,arguments)}function _(t,p){1&t&&(e.TgZ(0,"clr-signpost-content",4)(1,"h3"),e._uU(2,"Frames per second"),e.qZA(),e.TgZ(3,"p"),e._uU(4,"Estimates the number of frames that are rendered per second."),e.qZA(),e.TgZ(5,"p"),e._uU(6,"This is done by periodically measuring the time a call to "),e.TgZ(7,"code"),e._uU(8,"setTimeout(() => ..., 0)"),e.qZA(),e._uU(9," takes."),e.qZA(),e.TgZ(10,"p"),e._uU(11,"That call is made outside the angular-zone, so as not to trigger change-detection."),e.qZA(),e.TgZ(12,"p"),e._uU(13,"Please not that in Chrome you can also monitor FPS from the developer-tools: Hit "),e.TgZ(14,"code"),e._uU(15,"ctrl-shift-p"),e.qZA(),e._uU(16," and enter "),e.TgZ(17,"code"),e._uU(18,"fps"),e.qZA(),e._uU(19," to find the FPS-meter."),e.qZA()()),2&t&&e.Q6J("clrPosition","left-middle")}let ee=(()=>{class t{constructor(a,s){this.ngZone=a,this.cdRef=s,this.pollingRate=1e3,this.precission=2,this.nrSamples=10,s.detach(),this.ngZone.runOutsideAngular(()=>{this.updateFps(this.pollingRate)})}updateFps(a){setTimeout(()=>{(function q(t){return M.apply(this,arguments)})(this.nrSamples).then(s=>{this.fps=function X(t,p){const a=Math.pow(10,p);return Math.floor(t*a)/a}(s,this.precission),this.cdRef.detectChanges(),this.updateFps(a)})},a)}static#e=this.\u0275fac=function(s){return new(s||t)(e.Y36(e.R0b),e.Y36(e.sBO))};static#t=this.\u0275cmp=e.Xpm({type:t,selectors:[["ukis-fpser"]],decls:7,vars:1,consts:[[2,"margin","0px"],[3,"clrPosition",4,"clrIfOpen"],[1,"label"],[1,"badge"],[3,"clrPosition"]],template:function(s,r){1&s&&(e.TgZ(0,"p",0)(1,"clr-signpost"),e.YNc(2,_,20,1,"clr-signpost-content",1),e.qZA(),e.TgZ(3,"span",2),e._uU(4," FPS: "),e.TgZ(5,"span",3),e._uU(6),e.qZA()()()),2&s&&(e.xp6(6),e.Oqu(r.fps))},dependencies:[m.nqY,m.EuU,m.hQ]})}return t})(),te=(()=>{class t{constructor(){}static#e=this.\u0275fac=function(s){return new(s||t)};static#t=this.\u0275cmp=e.Xpm({type:t,selectors:[["ukis-performance"]],decls:8,vars:0,consts:[[1,"clr-row"],[1,"clr-col-12"]],template:function(s,r){1&s&&(e.TgZ(0,"p"),e._uU(1,"Load data and pan the map for a while to see a drop in performance."),e.qZA(),e.TgZ(2,"div",0)(3,"div",1),e._UZ(4,"ukis-blinker"),e.qZA()(),e.TgZ(5,"div",0)(6,"div",1),e._UZ(7,"ukis-fpser"),e.qZA()())},dependencies:[Q,ee]})}return t})();var se=o(3254),ae=o(2227);let re=(()=>{class t{constructor(a,s,r,n){this.layersSvc=a,this.dataSvc=s,this.mapStateSvc=r,this.mapSvc=n,this.class="content-container",this.controls={attribution:!0,scaleLine:!0}}ngOnInit(){this.mapSvc.setProjection("EPSG:4326");const a=(y,T)=>{const ne=y.getId().toString().match(/(\d+)/)[0],B=parseFloat(ne),ce=B%255,pe=(B+20)%255,me=(B+40)%255;return new A.ZP({stroke:new O.Z({color:"gray",width:1}),fill:new C.Z({color:`rgba(${ce}, ${pe}, ${me},0.7)`})})},s=new R.gY({visible:!0}),r=this.dataSvc.createWfsLayer("full","Fully loaded","all",a);r.description="Full dataset loaded at once.";const n=this.dataSvc.createWfsLayer("bbx","Current extent only","bbox",a);n.description="Bbox strategy: Only current bbox loaded at a time.";const g=this.dataSvc.createWfsLayer("simple","Simplified geometry","simplifyGeometry",a);g.description="Bbox strategy. Also: geometry simplified.";const d=this.dataSvc.createWfsLayer("noProps","No properties","noProps",a);d.description="Bbox strategy. Also: features have no properties.";const f=this.dataSvc.createWfsLayer("noStyle","No Styling","bbox");f.description="Bbox strategy. Also: no styling applied to features.",[s,r,n,g,d,f].map(y=>this.layersSvc.addLayer(y,"Layers"))}ngAfterViewInit(){this.mapSvc.map.getView().fit([-107.14,51.85,-106.14,52.33],{size:this.mapSvc.map.getSize()})}static#e=this.\u0275fac=function(s){return new(s||t)(e.Y36(h.KD),e.Y36(H),e.Y36(E.I3),e.Y36(v.BR))};static#t=this.\u0275cmp=e.Xpm({type:t,selectors:[["app-route-map7"]],hostVars:2,hostBindings:function(s,r){2&s&&e.Tol(r.class)},features:[e._Bn([h.KD,E.I3,v.BR])],decls:13,vars:9,consts:[[1,"content-area","map-view"],["id","olMap",3,"layersSvc","mapState","controls"],[1,"right",3,"clrVerticalNavCollapsible","clr-nav-level"],[1,"layers",3,"clrVerticalNavGroupExpanded"],["shape","clock","title","Performance","clrVerticalNavIcon",""],[1,"padding","title-ellipsis"],["shape","layers","clrVerticalNavIcon","","title","layers"],[3,"layersSvc","mapStateSvc"]],template:function(s,r){1&s&&(e.TgZ(0,"main",0),e._UZ(1,"ukis-map-ol",1),e.qZA(),e.TgZ(2,"clr-vertical-nav",2)(3,"clr-vertical-nav-group",3),e._UZ(4,"clr-icon",4),e._uU(5," Performance "),e.TgZ(6,"clr-vertical-nav-group-children",5),e._UZ(7,"ukis-performance"),e.qZA()(),e.TgZ(8,"clr-vertical-nav-group",3),e._UZ(9,"clr-icon",6),e._uU(10," Layers "),e.TgZ(11,"clr-vertical-nav-group-children",5),e._UZ(12,"ukis-layer-control",7),e.qZA()()()),2&s&&(e.xp6(1),e.Q6J("layersSvc",r.layersSvc)("mapState",r.mapStateSvc)("controls",r.controls),e.xp6(1),e.Q6J("clrVerticalNavCollapsible",!0)("clr-nav-level",2),e.xp6(1),e.Q6J("clrVerticalNavGroupExpanded",!0),e.xp6(5),e.Q6J("clrVerticalNavGroupExpanded",!0),e.xp6(4),e.Q6J("layersSvc",r.layersSvc)("mapStateSvc",r.mapStateSvc))},dependencies:[te,m.qvL,m.saT,m.fzC,m.A0B,m.d6G,m.ogR,se.E,ae.j]})}return t})();var oe=o(2233);const ie=[{path:"",component:re}];let I=(()=>{class t{static#e=this.\u0275fac=function(s){return new(s||t)};static#t=this.\u0275mod=e.oAB({type:t});static#s=this.\u0275inj=e.cJS({imports:[P.Bz.forChild(ie),P.Bz]})}return t})(),le=(()=>{class t{static#e=this.\u0275fac=function(s){return new(s||t)};static#t=this.\u0275mod=e.oAB({type:t});static#s=this.\u0275inj=e.cJS({imports:[u.ez,w.q,I,m.K6A,oe.cE,v.oC]})}return t})()}}]);