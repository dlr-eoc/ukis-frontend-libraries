"use strict";(self.webpackChunkdemo_maps=self.webpackChunkdemo_maps||[]).push([[166],{2134:(A,O,a)=>{a.d(O,{um:()=>I,RP:()=>G,HF:()=>B,Kl:()=>h,aZ:()=>M,fc:()=>E,HX:()=>N,zc:()=>L,gY:()=>F,Bz:()=>Z});var u=a(9265);class F extends u.YY{constructor(l){const i={name:"OpenStreetMap",displayName:"OpenStreetMap",id:"osm",visible:!1,type:"xyz",url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",subdomains:["a","b","c"],attribution:'&copy, <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors',continuousWorld:!1,legendImg:"https://a.tile.openstreetmap.org/3/4/3.png",description:"OpenStreetMap z-x-y Tiles",opacity:1};l&&Object.assign(i,l),super(i)}}class L extends u.YY{constructor(l){const i={name:"OpenSeaMap",displayName:"OpenSeaMap",id:"OpenSeaMap",visible:!1,type:"xyz",removable:!1,url:"https://{s}.openseamap.org/seamark/{z}/{x}/{y}.png",subdomains:["t1"],attribution:'&copy, <a href="https://map.openseamap.org/legend.php?lang=de&page=license">OpenSeaMap</a>',continuousWorld:!1,legendImg:"https://t1.openseamap.org/seamark/10/554/321.png",description:"http://map.openseamap.org/",opacity:1};l&&Object.assign(i,l),super(i)}}class h extends u.TI{constructor(l){const i={name:"EOC Litemap",displayName:"EOC Litemap",id:"eoc_litemap",visible:!1,type:"wms",removable:!1,params:{LAYERS:"litemap",FORMAT:"image/png",TRANSPARENT:!0},url:"https://geoservice.dlr.de/eoc/basemap/wms",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://geoservice.dlr.de/eoc/basemap/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=litemap&ATTRIBUTION=&WIDTH=256&HEIGHT=256&CRS=EPSG%3A3857&STYLES=&BBOX=0%2C0%2C10018754.171394622%2C10018754.171394622",description:"http://www.naturalearthdata.com/about/",opacity:1};l&&Object.assign(i,l),super(i)}}class M extends u.RC{constructor(l){const i={name:"EOC Litemap Tile",displayName:"EOC Litemap Tile",id:"eoc_litemap_tile",visible:!1,type:"wmts",removable:!1,params:{layer:"eoc:litemap",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Alitemap&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"EOC Litemap as web map tile service",opacity:1};l&&Object.assign(i,l),super(i)}}class E extends u.RC{constructor(l){const i={name:"EOC Liteoverlay Tile",displayName:"EOC LiteoverlayTile",id:"eoc_Liteoverlay_tile",visible:!1,type:"wmts",removable:!1,params:{layer:"eoc:liteoverlay",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Aliteoverlay&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"This is the liteoverlay provided for EOC Service Portals",opacity:1};l&&Object.assign(i,l),super(i)}}class G extends u.RC{constructor(l){const i={name:"EOC Basemap Tile",displayName:"EOC Basemap Tile",id:"eoc_basemap_tile",visible:!1,type:"wmts",removable:!1,params:{layer:"eoc:basemap",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Abasemap&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"This is the basemap for DLR Service Portals",opacity:1};l&&Object.assign(i,l),super(i)}}class B extends u.RC{constructor(l){const i={name:"EOC Baseoverlay Tile",displayName:"EOC Baseoverlay Tile",id:"eoc_Baseoverlay_tile",visible:!1,type:"wmts",removable:!1,params:{layer:"eoc:baseoverlay",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Abaseoverlay&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"This is the basemap for DLR Service Portals",opacity:1};l&&Object.assign(i,l),super(i)}}class I extends u.RC{constructor(l){const i={name:"BlueMarble Tile",displayName:"BlueMarble Tile",id:"blueMarble_tile",visible:!1,type:"wmts",removable:!1,params:{layer:"bmng_topo_bathy",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=bmng_topo_bathy&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"Blue Marble NG dataset with topography and bathymetry",opacity:1};l&&Object.assign(i,l),super(i)}}class Z extends u.RC{constructor(l){const i={name:"World Relief B/W Tile",displayName:"World Relief B/W Tile",id:"eoc:world_relief_bw",visible:!1,type:"wmts",removable:!1,params:{layer:"eoc:world_relief_bw",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Aworld_relief_bw&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"World Relief Black / White",opacity:1};l&&Object.assign(i,l),super(i)}}class N extends u.RC{constructor(l){const i={name:"Hillshade Tile",displayName:"Hillshade Tile",id:"eoc_hillshade",visible:!1,type:"wmts",removable:!1,params:{layer:"hillshade",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=hillshade&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"Global Hillshade based on GMTED2010",opacity:1};l&&Object.assign(i,l),super(i)}}},9166:(A,O,a)=>{a.r(O),a.d(O,{RouteMap3Module:()=>le,RouteMap3RoutingModule:()=>D});var u=a(6733),F=a(6785),L=a(6764),h=a(9265),M=a(5118),E=a(5829),G=a(2134),B=a(450),I=a(3298),Z=a(2228),N=a(5105),y=a(6626),l=a(3435),i=a(1316),J=a(155),X=a(6121),U=a(8748),Q=a(400),$=a(7729),K=a(8311),C=a(1818),q=a(1590),e=a(755),k=a(7702),_=a(8112),b=a(6465),ee=a(4961),te=a(8558),ae=a(912);let se=(()=>{class p{constructor(s,o,t,n,c,d){this.layersSvc=s,this.mapStateSvc=o,this.mapSvc=t,this.alertSvc=n,this.progressService=c,this.route=d,this.class="content-container floating",this.subs=[],this.startBbox=null,this.updateLayerOnZoom=r=>{const m=this.mapStateSvc.getMapState().getValue(),S="gridLayer",R=((p,ne,s,o,t)=>{const n=[];let c=80;s>1&&(c=40),s>2&&(c=20),s>3&&(c=10),s>4&&(c=6),s>5&&(c=4),s>6&&(c=3),s>7&&(c=2),s>8&&(c=1);const d=.5*c;let r=10;r>10&&(r=10),t=(0,i.f3)(t,d);const m=p[0]+r,v=p[1]+r,w=p[3]-r-v,R=Math.floor((p[2]-r-m)/d),W=Math.floor(w/d);let g=m;for(let f=R;f>0;f--){let T=v;for(let V=W;V>0;V--){const Y=g+d,j=T+d,H=[g,T],ce=[[H,[g,j],[Y,j],[Y,T],H]];if(console.log(),(0,i.jE)(t,g,T)&&(0,i.jE)(t,Y,j)){const pe=new l.ZP(ce).transform("EPSG:4326",o),me=new y.Z({geometry:pe,column:f,row:V,id:n.length+1});n.push(me)}T+=d}g+=d}return n})([-180,-90,180,90],0,m.zoom,this.mapSvc.EPSG,m.extent),W=new N.Z({features:R,wrapX:!1}),g=new Z.Z({source:W});g.set("id",S);const f=this.layersSvc.getLayerById(S);if(f)f.custom_layer=g,this.layersSvc.updateLayer(f,f.filtertype);else{const T=new h.AO({id:S,name:"gridLayer",type:"custom",opacity:.3,custom_layer:g});this.layersSvc.addLayer(T,"Layers")}},this.controls={attribution:!0,scaleLine:!0}}ngOnInit(){this.addLayers(),this.subscribeToLayers(),this.subscribeToMapState(),this.subscribeToRoute(),this.startBbox&&this.mapStateSvc.setExtent(this.startBbox)}ngAfterViewInit(){this.mapSvc.map.on("moveend",this.updateLayerOnZoom)}ngOnDestroy(){this.subs.map(s=>s.unsubscribe()),this.mapSvc.map.un("moveend",this.updateLayerOnZoom)}addLayers(){const s=new G.gY({visible:!1}),o=new G.Kl({visible:!0,tileSize:512}),t=new I.Z({url:"https://ahocevar.com/geoserver/wms",params:{LAYERS:"topp:states"},serverType:"geoserver"});t.on("imageloadstart",()=>{this.progressService.progress({indeterminate:!0})}),t.on("imageloadend",()=>{this.progressService.progress(null)}),t.on("imageloaderror",()=>{this.progressService.progress(null)});const n=new h.AO({id:"event_layer",name:"Image load Layer",type:"custom",custom_layer:new B.Z({source:t}),visible:!1,bbox:[-133.9453125,18.979025953255267,-60.46875,52.908902047770255]}),c=new h.DJ({id:"updatable_feature_layer",name:"Updatable feature layer",type:"geojson",visible:!1,data:{type:"FeatureCollection",features:[{type:"Feature",properties:{},geometry:{type:"Polygon",coordinates:[[[-192.48046875,-24.686952411999144],[-88.06640625,-24.686952411999144],[-88.06640625,50.28933925329178],[-192.48046875,50.28933925329178],[-192.48046875,-24.686952411999144]]]}}]},actions:[{action:r=>{c.data=Q,this.layersSvc.updateLayer(c)},icon:"download",title:"Load data"}]});[o,s,n,c].forEach(r=>this.layersSvc.addLayer(r,"Layers"))}removeLayer(){this.layersSvc.removeLayerOrGroupById("event_layer2")}addLayer(){const s=new U.x,o=new U.x,t=new $.Z({source:new K.Z({url:"https://geoservice.dlr.de/eoc/land/wms",params:{LAYERS:"GUF28_DLR_v1_Mosaic"}})}),n=r=>{var m=r.context,v=this.mapSvc.map.getSize(),x=.5*v[0],S=(0,C.CR)(r,[x,0]),P=(0,C.CR)(r,[v[0],0]),w=(0,C.CR)(r,[x,v[1]]),R=(0,C.CR)(r,v);m.save(),m.beginPath(),m.moveTo(S[0],S[1]),m.lineTo(w[0],w[1]),m.lineTo(R[0],R[1]),m.lineTo(P[0],P[1]),m.closePath(),m.clip()};t.on("prerender",r=>{n(r)}),t.on("postrender",r=>{(r=>{r.context.restore()})(r)});const d=new h.AO({id:"event_layer2",name:"Image load Layer 2",type:"custom",custom_layer:new q.Z({layers:[t]}),visible:!0,removable:!0,events:{source:[{event:"tileloadstart",listener:r=>{s.next(r)}},{event:"tileloadend",listener:r=>{o.next(r)}}],layer:[{event:"prerender",listener:r=>{n(r)}},{event:"postrender",listener:r=>{n(r)}}]}});s.subscribe(r=>this.progressService.progress({indeterminate:!0})),o.pipe((0,J.b)(200)).subscribe(r=>this.progressService.progress(null)),this.layersSvc.addLayer(d,"Layers")}getSearchParamsHashRouting(s=window.location.href){-1===s.indexOf("http")&&(s=new URL(s,`${window.location.origin}${window.location.pathname}`).toString());const o=new URL(window.location.href,window.location.origin),[t,n]=o.hash.split("?");let c=new URLSearchParams;return n&&(c=new URLSearchParams(n)),{query:c,urlHashRouting:o,hash:t}}updateSearchParamsHashRouting(s){const{query:o,urlHashRouting:t,hash:n}=this.getSearchParamsHashRouting();Object.keys(s).map(r=>{o.set(r,s[r])});const c=decodeURIComponent(`${o}`);return`${t.protocol}//${t.host}${t.pathname||"/"}${n||"#/"}?${c}`}subscribeToMapState(){const s=this.mapStateSvc.getMapState().subscribe(o=>{if(history.pushState){const t=o.extent.map(c=>c.toFixed(3)),n=this.updateSearchParamsHashRouting({bbox:t.join(","),zoom:o.zoom.toString()});window.history.pushState({path:n},"",n)}});this.subs.push(s)}subscribeToRoute(){const s=this.route.queryParams.pipe((0,X.P)()).subscribe(o=>{if(Object.keys(o).length>0&&o.bbox){const t=o.bbox.split(",").map(n=>parseFloat(n));4===t.length&&(this.startBbox=t)}});this.subs.push(s)}subscribeToLayers(){if(this.layersSvc){const s=this.layersSvc.getLayers().subscribe(o=>{o.filter(n=>!0===n.visible).forEach(n=>{"updatable_feature_layer"===n.id&&n.data.features.length<=1&&this.alertSvc.alert({type:"info",text:"Click the layer setting down arrow icon to load new features.",closeable:!0})})});this.subs.push(s)}}static#e=this.\u0275fac=function(o){return new(o||p)(e.Y36(h.KD),e.Y36(M.I3),e.Y36(E.BR),e.Y36(k.c),e.Y36(_.N),e.Y36(L.gz))};static#t=this.\u0275cmp=e.Xpm({type:p,selectors:[["app-route-map3"]],hostVars:2,hostBindings:function(o,t){2&o&&e.Tol(t.class)},features:[e._Bn([h.KD,M.I3,E.BR])],decls:21,vars:10,consts:[[1,"content-area","map-view"],["id","olMap",3,"layersSvc","mapState","controls"],[1,"right",3,"clrVerticalNavCollapsible","clr-nav-level"],[1,"layers",3,"clrVerticalNavGroupExpanded"],["shape","layers","clrVerticalNavIcon","","title","layers"],[1,"padding","title-ellipsis"],[3,"layersSvc","mapStateSvc"],["title","Coordinates",1,"layers",3,"clrVerticalNavGroupExpanded"],["shape","compass","clrVerticalNavIcon",""],["title","Test",1,"layers",3,"clrVerticalNavGroupExpanded"],["shape","cog","clrVerticalNavIcon",""],[1,"btn","btn-primary",3,"click"]],template:function(o,t){1&o&&(e.TgZ(0,"main",0),e._UZ(1,"ukis-map-ol",1),e.qZA(),e.TgZ(2,"clr-vertical-nav",2)(3,"clr-vertical-nav-group",3),e._UZ(4,"clr-icon",4),e._uU(5," Layers "),e.TgZ(6,"clr-vertical-nav-group-children",5),e._UZ(7,"ukis-layer-control",6),e.qZA()(),e.TgZ(8,"clr-vertical-nav-group",7),e._UZ(9,"clr-icon",8),e._uU(10," Coordinates "),e.TgZ(11,"clr-vertical-nav-group-children",5),e._UZ(12,"ukis-mouse-position"),e.qZA()(),e.TgZ(13,"clr-vertical-nav-group",9),e._UZ(14,"clr-icon",10),e._uU(15," Test "),e.TgZ(16,"clr-vertical-nav-group-children",5)(17,"button",11),e.NdJ("click",function(){return t.removeLayer()}),e._uU(18,"remove Layer"),e.qZA(),e.TgZ(19,"button",11),e.NdJ("click",function(){return t.addLayer()}),e._uU(20,"add Layer"),e.qZA()()()()),2&o&&(e.xp6(1),e.Q6J("layersSvc",t.layersSvc)("mapState",t.mapStateSvc)("controls",t.controls),e.xp6(1),e.Q6J("clrVerticalNavCollapsible",!0)("clr-nav-level",2),e.xp6(1),e.Q6J("clrVerticalNavGroupExpanded",!0),e.xp6(4),e.Q6J("layersSvc",t.layersSvc)("mapStateSvc",t.mapStateSvc),e.xp6(1),e.Q6J("clrVerticalNavGroupExpanded",!1),e.xp6(5),e.Q6J("clrVerticalNavGroupExpanded",!0))},dependencies:[b.qvL,b.saT,b.fzC,b.A0B,b.d6G,b.ogR,ee.E,te.j,ae.C]})}return p})();var re=a(6750),oe=a(2759);const ie=[{path:"",component:se}];let D=(()=>{class p{static#e=this.\u0275fac=function(o){return new(o||p)};static#t=this.\u0275mod=e.oAB({type:p});static#a=this.\u0275inj=e.cJS({imports:[L.Bz.forChild(ie),L.Bz]})}return p})(),le=(()=>{class p{static#e=this.\u0275fac=function(o){return new(o||p)};static#t=this.\u0275mod=e.oAB({type:p});static#a=this.\u0275inj=e.cJS({imports:[u.ez,F.q,D,b.K6A,re.cE,E.oC,oe.X8]})}return p})()},400:A=>{A.exports=JSON.parse('{"type":"FeatureCollection","features":[{"type":"Feature","properties":{"title":"Polygon 1"},"geometry":{"type":"Polygon","coordinates":[[[-178.59375,15.961329081596647],[-166.640625,15.961329081596647],[-166.640625,27.994401411046148],[-178.59375,27.994401411046148],[-178.59375,15.961329081596647]]]}},{"type":"Feature","properties":{"title":"Polygon 2"},"geometry":{"type":"Polygon","coordinates":[[[-179.296875,-1.4061088354351594],[-168.75,-1.4061088354351594],[-168.75,10.487811882056695],[-179.296875,10.487811882056695],[-179.296875,-1.4061088354351594]]]}},{"type":"Feature","properties":{"title":"Polygon 3"},"geometry":{"type":"Polygon","coordinates":[[[-158.203125,5.61598581915534],[-146.25,5.61598581915534],[-146.25,22.59372606392931],[-158.203125,22.59372606392931],[-158.203125,5.61598581915534]]]}},{"type":"Feature","properties":{"title":"Polygon 4"},"geometry":{"type":"Polygon","coordinates":[[[-162.0703125,-13.2399454992863],[-150.82031249999997,-13.2399454992863],[-150.82031249999997,-1.0546279422758742],[-162.0703125,-1.0546279422758742],[-162.0703125,-13.2399454992863]]]}},{"type":"Feature","properties":{"title":"Polygon 5"},"geometry":{"type":"Polygon","coordinates":[[[-142.3828125,-20.632784250388013],[-131.1328125,-20.632784250388013],[-131.1328125,-2.108898659243126],[-142.3828125,-2.108898659243126],[-142.3828125,-20.632784250388013]]]}},{"type":"Feature","properties":{"title":"Polygon 6"},"geometry":{"type":"Polygon","coordinates":[[[-106.171875,44.08758502824516],[-100.8984375,39.90973623453719],[-95.625,42.8115217450979],[-101.25,46.800059446787316],[-106.171875,44.08758502824516]]]}}]}')}}]);