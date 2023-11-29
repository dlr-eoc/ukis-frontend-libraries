"use strict";(self.webpackChunkdemo_maps=self.webpackChunkdemo_maps||[]).push([[151],{5151:(q,S,n)=>{n.r(S),n.d(S,{RouteMapModule:()=>H,RouteMapRoutingModule:()=>T});var w=n(8692),F=n(8808),L=n(7223),l=n(5548),M=n(790),c=n(4074),g=n(1899),G=n(3590),_=n(6852);const R=JSON.parse('{"type":"FeatureCollection","poperties":{"description":"This are a few test cities and locations collected with geojson.io"},"features":[{"type":"Feature","properties":{"name":"Munich"},"geometry":{"type":"Point","coordinates":[11.575899124145508,48.137740422322295]}},{"type":"Feature","properties":{"name":"Landshut"},"geometry":{"type":"Point","coordinates":[12.152938842773436,48.5370678355958]}},{"type":"Feature","properties":{"name":"Ulm"},"geometry":{"type":"Point","coordinates":[9.986572265624998,48.40003249610685]}},{"type":"Feature","properties":{"name":"Ingolstadt"},"geometry":{"type":"Point","coordinates":[11.42578125,48.75618876280552]}},{"type":"Feature","properties":{"name":"Paris"},"geometry":{"type":"Point","coordinates":[2.3291015625,48.83579746243093]}},{"type":"Feature","properties":{"name":"Dreux"},"geometry":{"type":"Point","coordinates":[1.3677978515625,48.73445537176822]}},{"type":"Feature","properties":{"name":"Meaux"},"geometry":{"type":"Point","coordinates":[2.8729248046875,48.95497369808868]}},{"type":"Feature","properties":{"name":"Rome"},"geometry":{"type":"Point","coordinates":[12.480468749999998,41.86956082699455]}},{"type":"Feature","properties":{"name":"Anzio"},"geometry":{"type":"Point","coordinates":[12.6287841796875,41.4509614012039]}},{"type":"Feature","properties":{"name":"Berlin"},"geometry":{"type":"Point","coordinates":[13.403320312499998,52.50953477032727]}},{"type":"Feature","properties":{"name":"Potsdam"},"geometry":{"type":"Point","coordinates":[13.058624267578125,52.40074312027673]}}]}');var E=n(1786),A=n(694),I=n(795),D=n(5253),e=n(4537);let b=(()=>{class a{constructor(){}ngOnInit(){}}return a.\u0275fac=function(t){return new(t||a)},a.\u0275cmp=e.Xpm({type:a,selectors:[["app-example-layer-description"]],inputs:{layer:"layer",description:"description"},decls:9,vars:1,consts:[[1,"custom-description"]],template:function(t,o){1&t&&(e.TgZ(0,"div",0),e._uU(1),e.TgZ(2,"p"),e._uU(3," This description was styled with a dynamic component as the layer.description. "),e.qZA(),e.TgZ(4,"p"),e._uU(5," Keep in mind that this breaks @dlr-eoc/services-ogc generateResourceFromLayer() for this layer when exporting a "),e.TgZ(6,"b"),e._uU(7,"IOwsContext"),e.qZA(),e._uU(8,". "),e.qZA()()),2&t&&(e.xp6(1),e.hij(" ",o.description,". "))},styles:[".custom-description[_ngcontent-%COMP%]{word-break:normal;color:#0072a3}.custom-description[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{word-break:normal;color:#ffa52e}"]}),a})(),J=(()=>{class a{constructor(){this.legendImages=[]}ngOnInit(){this.legendImages=this.group.layers.filter(t=>t.legendImg&&"string"==typeof t.legendImg).map(t=>({url:t.legendImg})).reverse()}}return a.\u0275fac=function(t){return new(t||a)},a.\u0275cmp=e.Xpm({type:a,selectors:[["app-example-group-legend"]],inputs:{group:"group"},decls:6,vars:4,consts:[[1,"wrapper"],["width","256","height","256",1,"stacked",3,"src"],["usemap","#legendmap",3,"src"],["name","legendmap"],["shape","rect","coords","0,0,256,128","alt","top","title","Show full Image overlay","target","_blank",3,"href"],["shape","rect","coords","0,128,256,256","alt","below","title","Show full Image base","target","_blank",3,"href"]],template:function(t,o){1&t&&(e.TgZ(0,"div",0),e._UZ(1,"img",1)(2,"img",2),e.TgZ(3,"map",3),e._UZ(4,"area",4)(5,"area",5),e.qZA()()),2&t&&(e.xp6(1),e.Q6J("src",o.legendImages[0].url,e.LSH),e.xp6(1),e.Q6J("src",o.legendImages[1].url,e.LSH),e.xp6(2),e.Q6J("href",o.legendImages[0].url,e.LSH),e.xp6(1),e.Q6J("href",o.legendImages[1].url,e.LSH))},styles:[".wrapper[_ngcontent-%COMP%]{position:relative}.wrapper[_ngcontent-%COMP%]   .stacked[_ngcontent-%COMP%]{position:absolute;pointer-events:none}"]}),a})();var U=n(4969),d=n(6799);let B=(()=>{class a{constructor(){this.fillColor="rgba(196, 203, 205, 1)",this.fillChanged=!1}ngOnInit(){const t=this.layer;if(t){const o=t.options.style;let s=o.layers.findIndex(p=>"water"===p.id);this.fillChanged=o.layers[s].paint["fill-color"]!==this.fillColor}}switchWater(t){const o=this.layer,s=o.options.style;let p=s.layers.findIndex(y=>"water"===y.id);this.fillChanged?(s.layers[p].paint["fill-color"]=this.fillColor,this.fillChanged=!1):(s.layers[p].paint["fill-color"]="rgba(0, 0, 0, 1)",this.fillChanged=!0),this.layersSvc.updateLayer(o)}}return a.\u0275fac=function(t){return new(t||a)},a.\u0275cmp=e.Xpm({type:a,selectors:[["app-vtile-layer-action"]],inputs:{layer:"layer",layersSvc:"layersSvc"},decls:4,vars:2,consts:[["type","checkbox","name","switch_water","clrCheckbox","",3,"value","checked","change"]],template:function(t,o){1&t&&(e.TgZ(0,"clr-checkbox-wrapper")(1,"label"),e._uU(2," Change Water color "),e.qZA(),e.TgZ(3,"input",0),e.NdJ("change",function(p){return o.switchWater(p)}),e.qZA()()),2&t&&(e.xp6(3),e.Q6J("value",o.fillChanged)("checked",o.fillChanged))},dependencies:[d.MgK,d.KKC,d.PEh]}),a})();var C=n(3534),k=n(408),N=n(580),V=n(3307);function j(a,i){if(1&a&&e._UZ(0,"ukis-map-ol",12),2&a){const t=e.oxw();e.Q6J("layersSvc",t.layersSvc)("mapState",t.mapStateSvc)("controls",t.controls)}}let Q=(()=>{class a{constructor(t,o,s,p){this.layersSvc=t,this.mapStateSvc=o,this.mapSvc=s,this.wmsSvc=p,this.class="content-container",this.showMap=!0,this.controls={attribution:!0,scaleLine:!0}}ngOnInit(){this.mapSvc.map.addControl(new G.S),this.addBaseLayers(),this.addLayers(),this.addOverlays(),this.setExtent()}setExtent(){this.mapStateSvc.setExtent([-14,33,40,57])}parseCapabilities(){this.wmsSvc.getCapabilities("https://geoservice.dlr.de/eoc/land/wms").subscribe(t=>{const o=this.wmsSvc.getLayerFromCapabilities("AGRODE_S2_EVI_P1M",t);console.log(o)})}addBaseLayers(){const t=new l.DJ({name:"Transparenter Hintergrund",id:"blank",type:"geojson"}),o=new c.aZ({tileSize:512}),s=new c.HF,p=new l.WQ({id:"eocLiteAndOverlay",name:"EOC Lite with Overlay",description:"merged/stacked Layers EOC Lite with Overlay",legendImg:o.legendImg,layers:[o,s],visible:!0}),y=new l.RC({type:"wmts",url:"https://tiles.geoservice.dlr.de/service/wmts",name:"Relief",id:"world_relief_bw",params:{layer:"eoc:world_relief_bw",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},visible:!1,description:{component:b,inputs:{description:"eoc:world_relief_bw as web map tile service"}},attribution:'Relief: <a src="https://www.dlr.de/eoc">DLR/EOC</>',legendImg:""});[p,new c.gY({id:"OSM_Base"}),t,y,new l.DJ({name:"Open Map Styles",id:"planet_eoc_vector_tiles",attribution:'\xa9 <a href="http://openmaptiles.org/" target="_blank">OpenMapTiles</a> \xa9 <a href="https://www.openstreetmap.org/copyright" target="_blank"> OpenStreetMap contributors</a>',description:'EOC-Geoservice TMS-Service, Vector Tiles with OpenMapTiles and customised <a href="https://openmaptiles.org/styles/#positron">positron</a> Style.',type:"tms",url:"https://{s}.tiles.geoservice.dlr.de/service/tms/1.0.0/planet_eoc@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf?flipy=true",subdomains:["a","b","c","d"],options:{style:U,styleSource:"planet_eoc"},visible:!1,action:{component:B,inputs:{layersSvc:this.layersSvc}}})].map(h=>this.layersSvc.addLayer(h,"Baselayers"))}addLayers(){const t=new l.YY({type:"wms",url:"https://geoservice.dlr.de/eoc/land/wms",name:"GUF Mosaic",id:"GUF28_DLR_v1_Mosaic",params:{LAYERS:"GUF28_DLR_v1_Mosaic",STYLES:"guf_8bit"},tileSize:512,visible:!1,description:"GUF28_DLR_v1_Mosaic",attribution:' | GUF\xae: <a href="https://www.dlr.de/eoc/en/desktopdefault.aspx/tabid-9628/16557_read-40454/">DLR License</a>',legendImg:"",popup:{asyncPopup:(r,f)=>{!function Z(a,i,t){const o=a.layer.getSource(),s=a.mapEvent,p=i.map.getView().getResolution(),y=o.getFeatureInfoUrl(s.coordinate,p,i.EPSG,{INFO_FORMAT:"application/json"});fetch(y).then(u=>u.json()).catch(u=>{console.log(u)}).then(u=>{if(u.features.length){const m=i.createPopupHtml(u.features[0].properties);t(m)}else t("<p>No Data!</p>")})}(r,this.mapSvc,f)}}}),o=new l.RC({type:"wmts",url:"https://tiles.geoservice.dlr.de/service/wmts",name:"TDM90 DEM",id:"TDM90_DEM",params:{layer:"TDM90_DEM",style:"default",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"},format:"image/png"},visible:!1,description:"TDM90_DEM maxZoom: 8",attribution:' | TDM90 Data \xa9: <a href="http://www.dlr.de" target="_blank">DLR</a>  licensed for <a rel="license" target="_blank" href="https://geoservice.dlr.de/resources/licenses/tdm90/License_for_the_Utilization_of_90m_DEM_for_Scientific_Use.pdf">scientific use</a>',legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=TDM90_DEM&style=default&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A4&TileCol=8&TileRow=5",cssClass:"custom-layer"}),s=new l.DJ({id:"geojson_test",name:"GeoJSON Vector Layer",attribution:"\xa9 DLR GeoJSON",type:"geojson",data:{type:"FeatureCollection",features:[{type:"Feature",properties:{title:"Polygon"},geometry:{type:"Polygon",coordinates:[[[11.53564453125,48.80686346108517],[11.42578125,48.61838518688487],[11.97509765625,48.516604348867475],[12.2607421875,48.69096039092549],[12.0849609375,48.99463598353405],[11.53564453125,48.80686346108517]]]}},{type:"Feature",properties:{title:"Rectangle"},geometry:{type:"Polygon",coordinates:[[[10.986328125,43.89789239125797],[11.755371093749998,43.89789239125797],[11.755371093749998,44.41808794374846],[10.986328125,44.41808794374846],[10.986328125,43.89789239125797]]]}},{type:"Feature",properties:{title:"Line"},geometry:{type:"LineString",coordinates:[[13.29345703125,48.268569112964336],[15.073242187499998,47.56170075451973],[14.1064453125,46.40756396630067],[15.886230468750002,44.94924926661153]]}},{type:"Feature",properties:{title:"Point"},geometry:{type:"Point",coordinates:[11.513671874999998,46.42271253466717]}}]},visible:!1,popup:{event:"move",dynamicPopup:{component:_.F,getAttributes:r=>({data:r.properties})}}}),p=new l.DJ({id:"geojson_test_3",name:"GeoJSON Point Layer",type:"geojson",data:{type:"FeatureCollection",features:[{type:"Feature",properties:{title:"Munich",type:"City",image:"https://en.wikipedia.org/wiki/Munich#/media/File:Stadtbild_M%C3%BCnchen.jpg",wiki:"https://en.wikipedia.org/wiki/Munich"},geometry:{type:"Point",coordinates:[11.557617187499998,48.151428143221224]}}]},visible:!1,popup:{properties:{title:"Title",type:"Type"}}}),y=new l.DJ({id:"geojson_test_2",name:"Vector Layer in Group",type:"geojson",data:{type:"FeatureCollection",features:[{type:"Feature",properties:{type:"Polygon",name:"Vector Layer in Group",data:"geojson"},geometry:{type:"Polygon",coordinates:[[[-4.9658203125,41.09591205639546],[-6.459960937499999,39.52099229357195],[-5.009765625,38.42777351132902],[-1.8896484375,38.77121637244273],[-.68115234375,40.84706035607122],[-2.900390625,41.65649719441145],[-4.9658203125,41.09591205639546]]]}}]},visible:!1,popup:["type","name"],actions:[{title:"download",icon:"download-cloud",action:r=>{console.log(r)}}]}),u=new l.DJ({id:"geojson_test_cluster",name:"Cluster - GeoJSON Vector Layer",type:"geojson",cluster:{distance:20},data:R,visible:!0,actions:[{title:"update Layer",icon:"sync",action:r=>{r.cluster.distance=25,r.options||(r.options={}),r.options.style=f=>{const P=f.get("features").length;return new E.ZP({image:new I.Z({radius:P<=1?6:10,stroke:new D.Z({color:"#fff"}),fill:new A.Z({color:P<=1?"green":"red"})})})},this.layersSvc.updateLayer(r)}}],popup:{popupFunction:r=>`<div>${JSON.stringify(r.properties)} </div>`},expanded:{tab:"settings",expanded:!1}}),m=new l.DJ({id:"WfsLayer",name:"WFS Pennsylvania",type:"wfs",visible:!1,url:"https://ahocevar.com/geoserver/wfs?service=WFS&request=GetFeature&outputFormat=application/json&version=1.1.0&srsname=EPSG:3857&typenames=usa:states&cql_filter=STATE_NAME='Pennsylvania'",bbox:[-83.1005859375,38.37611542403604,-72.50976562499999,43.03677585761058],popup:{dynamicPopup:{component:_.F,getAttributes:r=>({data:r})}}}),v=new c.RP;v.cssClass="hide";const h=new c.HF,x=new c.fc;x.legendImg="https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Aliteoverlay&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A4&TileCol=8&TileRow=5";const Y=new l.ex({id:"group_1",name:"Test Group",layers:[v,h,x],description:"This is a group with a hidden eocBasemap (layer.cssClass = hide), eocBaseoverlay and a eocLiteoverlay",expanded:{tab:"description"},actions:[{title:"download",icon:"download-cloud",action:r=>{console.log(r)}}]}),O=new c.fc;O.id="eoc_Liteoverlay_2";const K=new l.ex({id:"group_2",name:"Test Group 2",description:{component:b,inputs:{description:"A LayerGroup with a hidden vectorLayer2."}},legendImg:{component:J},cssClass:"custom-layer-group",layers:[o,y,O]}),X=new l.ex({id:"group_3",name:"Test Group Vector-Data",expanded:!1,layers:[s,p,m]});[t,new c.HX({popup:{popupFunction:r=>`\n            <table>\n              <tbody>\n                <tr>\n                  <td style="vertical-align: top; padding-right: 7px;"><b>Name: ${r.properties.name}</b></td>\n                  <td></td>\n                </tr>\n                <tr>\n                  <td style="vertical-align: top; padding-right: 7px;"><b>type: ${r.properties.type}</b></td>\n                  <td></td>\n                </tr>\n              </tbody>\n            </table>\n            <img src="${r.properties.legendImg}">\n            `}}),X,K,Y,u].map(r=>{r instanceof l.mh?this.layersSvc.addLayer(r,"Layers"):r instanceof l.ex&&this.layersSvc.addLayerGroup(r)})}addOverlays(){const t=new c.um({crossOrigin:"anonymous"}),o=new c.zc({crossOrigin:"anonymous"});this.layersSvc.addLayer(t,"Overlays"),this.layersSvc.addLayer(o,"Overlays");const s=new c.um({id:"merge_BlueMarble"}),p=new c.fc({id:"merge_Liteoverlay"}),y=new l.WQ({id:"BlueMarbleTile_Overlay",name:"BlueMarble with Overlay",visible:!1,legendImg:s.legendImg,description:"merged/stacked Layers BlueMarble with Overlay",layers:[s,p]});this.layersSvc.addLayer(y,"Overlays")}updateLayerGroup(){const t=this.layersSvc.getLayerOrGroupById("group_1");t.expanded=!0,t.layers[1].cssClass=null,this.layersSvc.updateLayerGroup(t);const o=this.layersSvc.getLayerOrGroupById("group_2");o.layers[1].visible=!0,this.layersSvc.updateLayerGroup(o)}addLayerToGroup(){const t=this.layersSvc.getLayerOrGroupById("group_2"),o=new c.Bz;this.layersSvc.addLayerToGroup(o,t)}removeAllLayers(){this.layersSvc.removeLayers()}toggleMap(){this.showMap=!this.showMap}}return a.\u0275fac=function(t){return new(t||a)(e.Y36(l.KD),e.Y36(M.I3),e.Y36(g.BR),e.Y36(C.zU))},a.\u0275cmp=e.Xpm({type:a,selectors:[["app-route-map"]],hostVars:2,hostBindings:function(t,o){2&t&&e.Tol(o.class)},features:[e._Bn([l.KD,M.I3,g.BR])],decls:34,vars:14,consts:[[1,"content-area"],["id","olMap",3,"layersSvc","mapState","controls",4,"ngIf"],[1,"right",3,"clrVerticalNavCollapsible","clr-nav-level"],[1,"layers",3,"clrVerticalNavGroupExpanded"],["shape","world","title","Overlays","clrVerticalNavIcon",""],[1,"padding","title-ellipsis"],[3,"layersSvc","mapStateSvc","layerfilter"],["shape","layers","clrVerticalNavIcon","","title","layers"],[3,"layersSvc","mapStateSvc"],["shape","world","title","Baselayers","clrVerticalNavIcon",""],["shape","cog","title","Actions","clrVerticalNavIcon",""],[1,"btn","btn-primary",3,"click"],["id","olMap",3,"layersSvc","mapState","controls"]],template:function(t,o){1&t&&(e.TgZ(0,"main",0),e.YNc(1,j,1,3,"ukis-map-ol",1),e.qZA(),e.TgZ(2,"clr-vertical-nav",2)(3,"clr-vertical-nav-group",3),e._UZ(4,"clr-icon",4),e._uU(5," Overlays "),e.TgZ(6,"clr-vertical-nav-group-children",5),e._UZ(7,"ukis-layer-control",6),e.qZA()(),e.TgZ(8,"clr-vertical-nav-group",3),e._UZ(9,"clr-icon",7),e._uU(10," Layers "),e.TgZ(11,"clr-vertical-nav-group-children",5),e._UZ(12,"ukis-layer-control",8),e.qZA()(),e.TgZ(13,"clr-vertical-nav-group",3),e._UZ(14,"clr-icon",9),e._uU(15," Baselayers "),e.TgZ(16,"clr-vertical-nav-group-children",5),e._UZ(17,"ukis-base-layer-control",8),e.qZA()(),e.TgZ(18,"clr-vertical-nav-group",3),e._UZ(19,"clr-icon",10),e._uU(20," Actions "),e.TgZ(21,"clr-vertical-nav-group-children",5)(22,"button",11),e.NdJ("click",function(){return o.updateLayerGroup()}),e._uU(23,"update LayerGroup"),e.qZA(),e.TgZ(24,"button",11),e.NdJ("click",function(){return o.addLayerToGroup()}),e._uU(25,"add Layer to LayerGroup"),e.qZA(),e.TgZ(26,"button",11),e.NdJ("click",function(){return o.removeAllLayers()}),e._uU(27,"remove All Layers"),e.qZA(),e.TgZ(28,"button",11),e.NdJ("click",function(){return o.setExtent()}),e._uU(29,"set Extent"),e.qZA(),e.TgZ(30,"button",11),e.NdJ("click",function(){return o.parseCapabilities()}),e._uU(31,"Parse WMS capabilities"),e.qZA(),e.TgZ(32,"button",11),e.NdJ("click",function(){return o.toggleMap()}),e._uU(33,"toggle Map"),e.qZA()()()()),2&t&&(e.xp6(1),e.Q6J("ngIf",o.showMap),e.xp6(1),e.Q6J("clrVerticalNavCollapsible",!0)("clr-nav-level",2),e.xp6(1),e.Q6J("clrVerticalNavGroupExpanded",!0),e.xp6(4),e.Q6J("layersSvc",o.layersSvc)("mapStateSvc",o.mapStateSvc)("layerfilter","Overlays"),e.xp6(1),e.Q6J("clrVerticalNavGroupExpanded",!0),e.xp6(4),e.Q6J("layersSvc",o.layersSvc)("mapStateSvc",o.mapStateSvc),e.xp6(1),e.Q6J("clrVerticalNavGroupExpanded",!0),e.xp6(4),e.Q6J("layersSvc",o.layersSvc)("mapStateSvc",o.mapStateSvc),e.xp6(1),e.Q6J("clrVerticalNavGroupExpanded",!0))},dependencies:[w.O5,d.qvL,d.saT,d.fzC,d.A0B,d.d6G,d.ogR,k.E,N.l,V.j],styles:["[_nghost-%COMP%]     .custom-layer-group .head>.title{color:#660f00}[_nghost-%COMP%]     .custom-layer .head>.title{color:#b87d00}[_nghost-%COMP%]     .zoom-number{bottom:2.5em;left:8px}"]}),a})();var z=n(5508);const W=[{path:"",component:Q}];let T=(()=>{class a{}return a.\u0275fac=function(t){return new(t||a)},a.\u0275mod=e.oAB({type:a}),a.\u0275inj=e.cJS({imports:[L.Bz.forChild(W),L.Bz]}),a})(),H=(()=>{class a{}return a.\u0275fac=function(t){return new(t||a)},a.\u0275mod=e.oAB({type:a}),a.\u0275inj=e.cJS({imports:[w.ez,F.q,T,d.K6A,z.cE,g.oC,C.yU]}),a})()}}]);