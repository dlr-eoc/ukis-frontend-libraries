"use strict";(self.webpackChunkdemo_maps=self.webpackChunkdemo_maps||[]).push([[264],{4264:(ae,S,n)=>{n.r(S),n.d(S,{RouteMapModule:()=>K,RouteMapRoutingModule:()=>E});var I=n(6610),w=n(7925),l=n(1686),b=n(6478),p=n(6924),g=n(5857),P=n(4105),M=n(1584);const _=JSON.parse('{"type":"FeatureCollection","poperties":{"description":"This are a few test cities and locations collected with geojson.io"},"features":[{"type":"Feature","properties":{"name":"Munich"},"geometry":{"type":"Point","coordinates":[11.575899124145508,48.137740422322295]}},{"type":"Feature","properties":{"name":"Landshut"},"geometry":{"type":"Point","coordinates":[12.152938842773436,48.5370678355958]}},{"type":"Feature","properties":{"name":"Ulm"},"geometry":{"type":"Point","coordinates":[9.986572265624998,48.40003249610685]}},{"type":"Feature","properties":{"name":"Ingolstadt"},"geometry":{"type":"Point","coordinates":[11.42578125,48.75618876280552]}},{"type":"Feature","properties":{"name":"Paris"},"geometry":{"type":"Point","coordinates":[2.3291015625,48.83579746243093]}},{"type":"Feature","properties":{"name":"Dreux"},"geometry":{"type":"Point","coordinates":[1.3677978515625,48.73445537176822]}},{"type":"Feature","properties":{"name":"Meaux"},"geometry":{"type":"Point","coordinates":[2.8729248046875,48.95497369808868]}},{"type":"Feature","properties":{"name":"Rome"},"geometry":{"type":"Point","coordinates":[12.480468749999998,41.86956082699455]}},{"type":"Feature","properties":{"name":"Anzio"},"geometry":{"type":"Point","coordinates":[12.6287841796875,41.4509614012039]}},{"type":"Feature","properties":{"name":"Berlin"},"geometry":{"type":"Point","coordinates":[13.403320312499998,52.50953477032727]}},{"type":"Feature","properties":{"name":"Potsdam"},"geometry":{"type":"Point","coordinates":[13.058624267578125,52.40074312027673]}}]}');var j=n(9380),x=n(1540),V=n(221),B=n(5409),L=n(6567),e=n(3279);let F=(()=>{class r{constructor(){}ngOnInit(){}static{this.\u0275fac=function(t){return new(t||r)}}static{this.\u0275cmp=e.VBU({type:r,selectors:[["app-example-layer-description"]],inputs:{layer:"layer",description:"description"},standalone:!0,features:[e.aNF],decls:9,vars:1,consts:[[1,"custom-description"]],template:function(t,a){1&t&&(e.j41(0,"div",0),e.EFF(1),e.j41(2,"p"),e.EFF(3," This description was styled with a dynamic component as the layer.description. "),e.k0s(),e.j41(4,"p"),e.EFF(5," Keep in mind that this breaks @dlr-eoc/services-ogc generateResourceFromLayer() for this layer when exporting a "),e.j41(6,"b"),e.EFF(7,"IOwsContext"),e.k0s(),e.EFF(8,". "),e.k0s()()),2&t&&(e.R7$(),e.SpI(" ",a.description,". "))},styles:[".custom-description[_ngcontent-%COMP%]{word-break:normal;color:#0072a3}.custom-description[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{word-break:normal;color:#ffa52e}"]})}}return r})(),D=(()=>{class r{constructor(){this.legendImages=[]}ngOnInit(){this.legendImages=this.group.layers.filter(o=>o.legendImg&&"string"==typeof o.legendImg).map(o=>({url:o.legendImg})).reverse()}static{this.\u0275fac=function(t){return new(t||r)}}static{this.\u0275cmp=e.VBU({type:r,selectors:[["app-example-group-legend"]],inputs:{group:"group"},standalone:!0,features:[e.aNF],decls:6,vars:4,consts:[[1,"wrapper"],["width","256","height","256",1,"stacked",3,"src"],["usemap","#legendmap",3,"src"],["name","legendmap"],["shape","rect","coords","0,0,256,128","alt","top","title","Show full Image overlay","target","_blank",3,"href"],["shape","rect","coords","0,128,256,256","alt","below","title","Show full Image base","target","_blank",3,"href"]],template:function(t,a){1&t&&(e.j41(0,"div",0),e.nrm(1,"img",1)(2,"img",2),e.j41(3,"map",3),e.nrm(4,"area",4)(5,"area",5),e.k0s()()),2&t&&(e.R7$(),e.Y8G("src",a.legendImages[0].url,e.B4B),e.R7$(),e.Y8G("src",a.legendImages[1].url,e.B4B),e.R7$(2),e.Y8G("href",a.legendImages[0].url,e.B4B),e.R7$(),e.Y8G("href",a.legendImages[1].url,e.B4B))},styles:[".wrapper[_ngcontent-%COMP%]{position:relative}.wrapper[_ngcontent-%COMP%]   .stacked[_ngcontent-%COMP%]{position:absolute;pointer-events:none}"]})}}return r})();var N=n(3621),c=n(213);let $=(()=>{class r{constructor(){this.fillColor="rgba(196, 203, 205, 1)",this.fillChanged=!1}ngOnInit(){const o=this.layer;if(o){const t=o.options.style;let a=t.layers.findIndex(i=>"water"===i.id);this.fillChanged=t.layers[a].paint["fill-color"]!==this.fillColor}}switchWater(o){const t=this.layer,a=t.options.style;let i=a.layers.findIndex(d=>"water"===d.id);this.fillChanged?(a.layers[i].paint["fill-color"]=this.fillColor,this.fillChanged=!1):(a.layers[i].paint["fill-color"]="rgba(0, 0, 0, 1)",this.fillChanged=!0),this.layersSvc.updateLayer(t)}static{this.\u0275fac=function(t){return new(t||r)}}static{this.\u0275cmp=e.VBU({type:r,selectors:[["app-vtile-layer-action"]],inputs:{layer:"layer",layersSvc:"layersSvc"},standalone:!0,features:[e.aNF],decls:4,vars:2,consts:[["type","checkbox","name","switch_water","clrCheckbox","",3,"change","value","checked"]],template:function(t,a){1&t&&(e.j41(0,"clr-checkbox-wrapper")(1,"label"),e.EFF(2," Change Water color "),e.k0s(),e.j41(3,"input",0),e.bIt("change",function(d){return a.switchWater(d)}),e.k0s()()),2&t&&(e.R7$(3),e.Y8G("value",a.fillChanged)("checked",a.fillChanged))},dependencies:[c.Nsh,c.aZZ,c.Jej,c.eAx,c.uQ$]})}}return r})();var U=n(3982),Y=n(479),W=n(7421),H=n(7846),C=n(6256);const Z=["download-cloud",(0,C.s)({outline:'<path d="M30.31,13c0-.1,0-.21,0-.32a10.26,10.26,0,0,0-10.45-10,10.47,10.47,0,0,0-9.6,6.1A9.65,9.65,0,0,0,10.89,28a3,3,0,0,1,0-2A7.65,7.65,0,0,1,11,10.74l.67,0,.23-.63a8.43,8.43,0,0,1,8-5.4,8.26,8.26,0,0,1,8.45,8,7.75,7.75,0,0,1,0,.8l-.08.72.65.3A6,6,0,0,1,26.38,26H25.09a3,3,0,0,1,0,2h1.28a8,8,0,0,0,3.93-15Z"/><path d="M22.28,26.07a1,1,0,0,0-.71.29L19,28.94V16.68a1,1,0,1,0-2,0V28.94l-2.57-2.57A1,1,0,0,0,13,27.78l5,5,5-5a1,1,0,0,0-.71-1.71Z"/>',outlineAlerted:'<path d="M22.28,26.07a1,1,0,0,0-.71.29L19,28.94V16.68a1,1,0,1,0-2,0V28.94l-2.57-2.57A1,1,0,0,0,13,27.78l5,5,5-5a1,1,0,0,0-.71-1.71Z"/><path d="M19.87,4.69a8.81,8.81,0,0,1,2,.25l1-1.8a10.8,10.8,0,0,0-3.07-.45,10.47,10.47,0,0,0-9.6,6.1A9.65,9.65,0,0,0,10.89,28a3,3,0,0,1,0-2A7.65,7.65,0,0,1,11,10.74l.67,0,.23-.63A8.43,8.43,0,0,1,19.87,4.69Z"/><path d="M32.9,15.4H30.21A6,6,0,0,1,26.38,26H25.09a3,3,0,0,1,0,2h1.28A8,8,0,0,0,32.9,15.4Z"/>',outlineBadged:'<path d="M22.28,26.07a1,1,0,0,0-.71.29L19,28.94V16.68a1,1,0,1,0-2,0V28.94l-2.57-2.57A1,1,0,0,0,13,27.78l5,5,5-5a1,1,0,0,0-.71-1.71Z"/><path d="M19.87,4.69a8.79,8.79,0,0,1,2.68.42,7.45,7.45,0,0,1,.5-1.94,10.79,10.79,0,0,0-3.18-.48,10.47,10.47,0,0,0-9.6,6.1A9.65,9.65,0,0,0,10.89,28a3,3,0,0,1,0-2A7.65,7.65,0,0,1,11,10.74l.67,0,.23-.63A8.43,8.43,0,0,1,19.87,4.69Z"/><path d="M30.92,13.44a7.13,7.13,0,0,1-2.63-.14c0,.08,0,.15,0,.23l-.08.72.65.3A6,6,0,0,1,26.38,26H25.09a3,3,0,0,1,0,2h1.28a8,8,0,0,0,4.54-14.61Z"/>'})],X=["sync",(0,C.s)({outline:'<path d="M32.84,15.72a1,1,0,1,0-2,.29A13.15,13.15,0,0,1,31,17.94,13,13,0,0,1,8.7,27h5.36a1,1,0,0,0,0-2h-9v9a1,1,0,1,0,2,0V28.2A15,15,0,0,0,32.84,15.72Z"/><path d="M30.06,1A1.05,1.05,0,0,0,29,2V7.83A14.94,14.94,0,0,0,3,17.94a15.16,15.16,0,0,0,.2,2.48,1,1,0,0,0,1,.84h.16a1,1,0,0,0,.82-1.15A13.23,13.23,0,0,1,5,17.94a13,13,0,0,1,13-13A12.87,12.87,0,0,1,27.44,9H22.06a1,1,0,0,0,0,2H31V2A1,1,0,0,0,30.06,1Z"/>'})];var G=n(3522);function z(r,m){if(1&r&&e.nrm(0,"ukis-map-ol",1),2&r){const o=e.XpG();e.Y8G("layersSvc",o.layersSvc)("mapState",o.mapStateSvc)("controls",o.controls)}}U.h.addIcons(Y.Q,W.A,H.F,Z,X);let R=(()=>{class r{constructor(o,t,a,i){this.layersSvc=o,this.mapStateSvc=t,this.mapSvc=a,this.wmsSvc=i,this.class="content-container",this.showMap=!0,this.controls={attribution:!0,scaleLine:!0}}ngOnInit(){this.mapSvc.map.addControl(new P.E),this.addBaseLayers(),this.addLayers(),this.addOverlays(),this.setExtent()}setExtent(){this.mapStateSvc.setExtent([-14,33,40,57])}setRotation(){this.mapStateSvc.setRotation(90)}resetRotation(){this.mapStateSvc.setRotation(0)}parseCapabilities(){this.wmsSvc.getCapabilities("https://geoservice.dlr.de/eoc/basemap/wms").subscribe(o=>{const t=this.wmsSvc.getLayerFromCapabilities("basemap",o);console.log(t)})}addBaseLayers(){const o=new l.vK({name:"Transparenter Hintergrund",id:"blank",type:"geojson"}),t=new p.me({tileSize:512}),a=new p.hQ,i=new l.FN({id:"eocLiteAndOverlay",name:"EOC Lite with Overlay",description:"merged/stacked Layers EOC Lite with Overlay",legendImg:t.legendImg,layers:[t,a],visible:!0}),d=new l.fn({type:"wmts",url:"https://tiles.geoservice.dlr.de/service/wmts",name:"Relief",id:"world_relief_bw",params:{layer:"eoc:world_relief_bw",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},visible:!1,description:{component:F,inputs:{description:"eoc:world_relief_bw as web map tile service"}},attribution:'Relief: <a src="https://www.dlr.de/eoc">DLR/EOC</>',legendImg:""});[i,new p.dl({id:"OSM_Base"}),o,d,new l.vK({name:"Open Map Styles",id:"planet_eoc_vector_tiles",attribution:'\xa9 <a href="http://openmaptiles.org/" target="_blank">OpenMapTiles</a> \xa9 <a href="https://www.openstreetmap.org/copyright" target="_blank"> OpenStreetMap contributors</a>',description:'EOC-Geoservice TMS-Service, Vector Tiles with OpenMapTiles and customised <a href="https://openmaptiles.org/styles/#positron">positron</a> Style.',type:"tms",url:"https://{s}.tiles.geoservice.dlr.de/service/tms/1.0.0/planet_eoc@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf?flipy=true",subdomains:["a","b","c","d"],options:{style:N,styleSource:"planet_eoc"},visible:!1,action:{component:$,inputs:{layersSvc:this.layersSvc}}})].map(h=>this.layersSvc.addLayer(h,"Baselayers"))}addLayers(){const o=new l.Bk({type:"wms",url:"https://geoservice.dlr.de/eoc/land/wms",name:"GUF Mosaic",id:"GUF28_DLR_v1_Mosaic",params:{LAYERS:"GUF28_DLR_v1_Mosaic",STYLES:"guf_8bit"},tileSize:512,visible:!1,description:"GUF28_DLR_v1_Mosaic",attribution:' | GUF\xae: <a href="https://www.dlr.de/eoc/en/desktopdefault.aspx/tabid-9628/16557_read-40454/">DLR License</a>',legendImg:"",popup:{asyncPopup:(s,f)=>{!function k(r,m,o){const t=r.layer.getSource(),a=r.mapEvent,i=m.map.getView().getResolution(),d=t.getFeatureInfoUrl(a.coordinate,i,m.EPSG,{INFO_FORMAT:"application/json"});fetch(d).then(u=>u.json()).catch(u=>{console.log(u)}).then(u=>{if(u.features.length){const y=m.createPopupHtml(u.features[0].properties);o(y)}else o("<p>No Data!</p>")})}(s,this.mapSvc,f)}}}),t=new l.fn({type:"wmts",url:"https://tiles.geoservice.dlr.de/service/wmts",name:"TDM90 DEM",id:"TDM90_DEM",params:{layer:"TDM90_DEM",style:"default",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"},format:"image/png"},visible:!1,description:"TDM90_DEM maxZoom: 8",attribution:' | TDM90 Data \xa9: <a href="http://www.dlr.de" target="_blank">DLR</a>  licensed for <a rel="license" target="_blank" href="https://geoservice.dlr.de/resources/licenses/tdm90/License_for_the_Utilization_of_90m_DEM_for_Scientific_Use.pdf">scientific use</a>',legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=TDM90_DEM&style=default&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A4&TileCol=8&TileRow=5",cssClass:"custom-layer"}),a=new l.vK({id:"geojson_test",name:"GeoJSON Vector Layer",attribution:"\xa9 DLR GeoJSON",type:"geojson",data:{type:"FeatureCollection",features:[{type:"Feature",properties:{title:"Polygon"},geometry:{type:"Polygon",coordinates:[[[11.53564453125,48.80686346108517],[11.42578125,48.61838518688487],[11.97509765625,48.516604348867475],[12.2607421875,48.69096039092549],[12.0849609375,48.99463598353405],[11.53564453125,48.80686346108517]]]}},{type:"Feature",properties:{title:"Rectangle"},geometry:{type:"Polygon",coordinates:[[[10.986328125,43.89789239125797],[11.755371093749998,43.89789239125797],[11.755371093749998,44.41808794374846],[10.986328125,44.41808794374846],[10.986328125,43.89789239125797]]]}},{type:"Feature",properties:{title:"Line"},geometry:{type:"LineString",coordinates:[[13.29345703125,48.268569112964336],[15.073242187499998,47.56170075451973],[14.1064453125,46.40756396630067],[15.886230468750002,44.94924926661153]]}},{type:"Feature",properties:{title:"Point"},geometry:{type:"Point",coordinates:[11.513671874999998,46.42271253466717]}}]},visible:!1,popup:{event:"move",dynamicPopup:{component:M.o,getAttributes:s=>({data:s.properties})}}}),i=new l.vK({id:"geojson_test_3",name:"GeoJSON Point Layer",type:"geojson",data:{type:"FeatureCollection",features:[{type:"Feature",properties:{title:"Munich",type:"City",image:"https://en.wikipedia.org/wiki/Munich#/media/File:Stadtbild_M%C3%BCnchen.jpg",wiki:"https://en.wikipedia.org/wiki/Munich"},geometry:{type:"Point",coordinates:[11.557617187499998,48.151428143221224]}}]},visible:!1,popup:{properties:{title:"Title",type:"Type"}}}),d=new l.vK({id:"geojson_test_2",name:"Vector Layer in Group",type:"geojson",data:{type:"FeatureCollection",features:[{type:"Feature",properties:{type:"Polygon",name:"Vector Layer in Group",data:"geojson"},geometry:{type:"Polygon",coordinates:[[[-4.9658203125,41.09591205639546],[-6.459960937499999,39.52099229357195],[-5.009765625,38.42777351132902],[-1.8896484375,38.77121637244273],[-.68115234375,40.84706035607122],[-2.900390625,41.65649719441145],[-4.9658203125,41.09591205639546]]]}}]},visible:!1,popup:["type","name"],actions:[{title:"download",icon:"download-cloud",action:s=>{console.log(s)}}]}),u=new l.vK({id:"geojson_test_cluster",name:"Cluster - GeoJSON Vector Layer",type:"geojson",cluster:{distance:20},data:_,visible:!0,actions:[{title:"update Layer",icon:"sync",action:s=>{s.cluster.distance=25,s.options||(s.options={}),s.options.style=f=>{const O=f.get("features").length;return new j.Ay({image:new V.A({radius:O<=1?6:10,stroke:new B.A({color:"#fff"}),fill:new x.A({color:O<=1?"green":"red"})})})},this.layersSvc.updateLayer(s)}}],popup:{popupFunction:s=>`<div>${JSON.stringify(s.properties)} </div>`},expanded:{tab:"settings",expanded:!1}}),y=new l.vK({id:"WfsLayer",name:"WFS Pennsylvania",type:"wfs",visible:!1,url:"https://ahocevar.com/geoserver/wfs?service=WFS&request=GetFeature&outputFormat=application/json&version=1.1.0&srsname=EPSG:3857&typenames=usa:states&cql_filter=STATE_NAME='Pennsylvania'",bbox:[-83.1005859375,38.37611542403604,-72.50976562499999,43.03677585761058],popup:{dynamicPopup:{component:M.o,getAttributes:s=>({data:s})}}}),v=new p.tH;v.cssClass="hide";const h=new p.hQ,A=new p.WX;A.legendImg="https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Aliteoverlay&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A4&TileCol=8&TileRow=5";const Q=new l.x2({id:"group_1",name:"Test Group",layers:[v,h,A],description:"This is a group with a hidden eocBasemap (layer.cssClass = hide), eocBaseoverlay and a eocLiteoverlay",expanded:{tab:"description"},actions:[{title:"download",icon:"download-cloud",action:s=>{console.log(s)}}]}),T=new p.WX;T.id="eoc_Liteoverlay_2";const q=new l.x2({id:"group_2",name:"Test Group 2",description:{component:F,inputs:{description:"A LayerGroup with a hidden vectorLayer2."}},legendImg:{component:D},cssClass:"custom-layer-group",layers:[t,d,T]}),ee=new l.x2({id:"group_3",name:"Test Group Vector-Data",expanded:!1,layers:[a,i,y]});[o,new p.nu({popup:{popupFunction:s=>`\n            <table>\n              <tbody>\n                <tr>\n                  <td style="vertical-align: top; padding-right: 7px;"><b>Name: ${s.properties.name}</b></td>\n                  <td></td>\n                </tr>\n                <tr>\n                  <td style="vertical-align: top; padding-right: 7px;"><b>type: ${s.properties.type}</b></td>\n                  <td></td>\n                </tr>\n              </tbody>\n            </table>\n            <img src="${s.properties.legendImg}">\n            `}}),ee,q,Q,u].map(s=>{s instanceof l.Wd?this.layersSvc.addLayer(s,"Layers"):s instanceof l.x2&&this.layersSvc.addLayerGroup(s)})}addOverlays(){const o=new p.gD({crossOrigin:"anonymous"}),t=new p.si({crossOrigin:"anonymous"});this.layersSvc.addLayer(o,"Overlays"),this.layersSvc.addLayer(t,"Overlays");const a=new p.gD({id:"merge_BlueMarble"}),i=new p.WX({id:"merge_Liteoverlay"}),d=new l.FN({id:"BlueMarbleTile_Overlay",name:"BlueMarble with Overlay",visible:!1,legendImg:a.legendImg,description:"merged/stacked Layers BlueMarble with Overlay",layers:[a,i]});this.layersSvc.addLayer(d,"Overlays")}updateLayerGroup(){const o=this.layersSvc.getLayerOrGroupById("group_1");o.expanded=!0,o.layers[1].cssClass=null,this.layersSvc.updateLayerGroup(o);const t=this.layersSvc.getLayerOrGroupById("group_2");t.layers[1].visible=!0,this.layersSvc.updateLayerGroup(t)}addLayerToGroup(){const o=this.layersSvc.getLayerOrGroupById("group_2"),t=new p.zT;this.layersSvc.addLayerToGroup(t,o)}removeAllLayers(){this.layersSvc.removeLayers()}toggleMap(){this.showMap=!this.showMap}static{this.\u0275fac=function(t){return new(t||r)(e.rXU(l._t),e.rXU(b.d),e.rXU(g.t),e.rXU(L.rX))}}static{this.\u0275cmp=e.VBU({type:r,selectors:[["app-route-map"]],hostVars:2,hostBindings:function(t,a){2&t&&e.HbH(a.class)},standalone:!0,features:[e.Jv_([l._t,b.d,g.t,L.rX]),e.aNF],decls:38,vars:14,consts:[[1,"content-area","map-view"],["id","olMap",3,"layersSvc","mapState","controls"],[1,"right",3,"clrVerticalNavCollapsible","clr-nav-level"],[1,"layers",3,"clrVerticalNavGroupExpanded"],["shape","world","title","Overlays","clrVerticalNavIcon",""],[1,"padding","title-ellipsis"],[3,"layersSvc","mapStateSvc","layerfilter"],["shape","layers","clrVerticalNavIcon","","title","layers"],[3,"layersSvc","mapStateSvc"],["shape","world","title","Baselayers","clrVerticalNavIcon",""],["shape","cog","title","Actions","clrVerticalNavIcon",""],[1,"btn","btn-primary",3,"click"]],template:function(t,a){1&t&&(e.j41(0,"main",0),e.DNE(1,z,1,3,"ukis-map-ol",1),e.k0s(),e.j41(2,"clr-vertical-nav",2)(3,"clr-vertical-nav-group",3),e.nrm(4,"cds-icon",4),e.EFF(5," Overlays "),e.j41(6,"clr-vertical-nav-group-children",5),e.nrm(7,"ukis-layer-control",6),e.k0s()(),e.j41(8,"clr-vertical-nav-group",3),e.nrm(9,"cds-icon",7),e.EFF(10," Layers "),e.j41(11,"clr-vertical-nav-group-children",5),e.nrm(12,"ukis-layer-control",8),e.k0s()(),e.j41(13,"clr-vertical-nav-group",3),e.nrm(14,"cds-icon",9),e.EFF(15," Baselayers "),e.j41(16,"clr-vertical-nav-group-children",5),e.nrm(17,"ukis-base-layer-control",8),e.k0s()(),e.j41(18,"clr-vertical-nav-group",3),e.nrm(19,"cds-icon",10),e.EFF(20," Actions "),e.j41(21,"clr-vertical-nav-group-children",5)(22,"button",11),e.bIt("click",function(){return a.updateLayerGroup()}),e.EFF(23,"update LayerGroup"),e.k0s(),e.j41(24,"button",11),e.bIt("click",function(){return a.addLayerToGroup()}),e.EFF(25,"add Layer to LayerGroup"),e.k0s(),e.j41(26,"button",11),e.bIt("click",function(){return a.removeAllLayers()}),e.EFF(27,"remove All Layers"),e.k0s(),e.j41(28,"button",11),e.bIt("click",function(){return a.setExtent()}),e.EFF(29,"set Extent"),e.k0s(),e.j41(30,"button",11),e.bIt("click",function(){return a.setRotation()}),e.EFF(31,"set Rotation"),e.k0s(),e.j41(32,"button",11),e.bIt("click",function(){return a.resetRotation()}),e.EFF(33,"reset Rotation"),e.k0s(),e.j41(34,"button",11),e.bIt("click",function(){return a.parseCapabilities()}),e.EFF(35,"Parse WMS capabilities"),e.k0s(),e.j41(36,"button",11),e.bIt("click",function(){return a.toggleMap()}),e.EFF(37,"toggle Map"),e.k0s()()()()),2&t&&(e.R7$(),e.vxM(a.showMap?1:-1),e.R7$(),e.Y8G("clrVerticalNavCollapsible",!0)("clr-nav-level",2),e.R7$(),e.Y8G("clrVerticalNavGroupExpanded",!0),e.R7$(4),e.Y8G("layersSvc",a.layersSvc)("mapStateSvc",a.mapStateSvc)("layerfilter","Overlays"),e.R7$(),e.Y8G("clrVerticalNavGroupExpanded",!0),e.R7$(4),e.Y8G("layersSvc",a.layersSvc)("mapStateSvc",a.mapStateSvc),e.R7$(),e.Y8G("clrVerticalNavGroupExpanded",!0),e.R7$(4),e.Y8G("layersSvc",a.layersSvc)("mapStateSvc",a.mapStateSvc),e.R7$(),e.Y8G("clrVerticalNavGroupExpanded",!0))},dependencies:[g.L,c.HEs,c.D2I,c.wqM,c.zLy,c.Wfw,c.BlU,c.Qmr,c.ndX,c.Lfk,G.Sj,G.N8],styles:["[_nghost-%COMP%]     .custom-layer-group .head>.title{color:#660f00}[_nghost-%COMP%]     .custom-layer .head>.title{color:#b87d00}[_nghost-%COMP%]     .zoom-number{bottom:2.5em;left:8px}"]})}}return r})();const J=[{path:"",component:R}];let E=(()=>{class r{static{this.\u0275fac=function(t){return new(t||r)}}static{this.\u0275mod=e.$C({type:r})}static{this.\u0275inj=e.G2t({imports:[w.iI.forChild(J),w.iI]})}}return r})(),K=(()=>{class r{static{this.\u0275fac=function(t){return new(t||r)}}static{this.\u0275mod=e.$C({type:r})}static{this.\u0275inj=e.G2t({imports:[I.MD,E,c.PuD,R]})}}return r})()}}]);