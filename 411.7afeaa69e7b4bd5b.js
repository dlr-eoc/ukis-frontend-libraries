"use strict";(self.webpackChunkdemo_maps=self.webpackChunkdemo_maps||[]).push([[411],{6924:(T,g,m)=>{m.d(g,{gD:()=>_,tH:()=>S,hQ:()=>y,wl:()=>e,me:()=>v,WX:()=>f,nu:()=>b,si:()=>r,dl:()=>p,zT:()=>M});var c=m(1686);class p extends c.Bk{constructor(s){const a={name:"OpenStreetMap",displayName:"OpenStreetMap",id:"osm",visible:!1,type:"xyz",url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",subdomains:["a","b","c"],attribution:'&copy, <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors',continuousWorld:!1,legendImg:"https://a.tile.openstreetmap.org/3/4/3.png",description:"OpenStreetMap z-x-y Tiles",opacity:1};s&&Object.assign(a,s),super(a)}}class r extends c.Bk{constructor(s){const a={name:"OpenSeaMap",displayName:"OpenSeaMap",id:"OpenSeaMap",visible:!1,type:"xyz",removable:!1,url:"https://{s}.openseamap.org/seamark/{z}/{x}/{y}.png",subdomains:["t1"],attribution:'&copy, <a href="https://map.openseamap.org/legend.php?lang=de&page=license">OpenSeaMap</a>',continuousWorld:!1,legendImg:"https://t1.openseamap.org/seamark/10/554/321.png",description:"http://map.openseamap.org/",opacity:1};s&&Object.assign(a,s),super(a)}}class e extends c.nw{constructor(s){const a={name:"EOC Litemap",displayName:"EOC Litemap",id:"eoc_litemap",visible:!1,type:"wms",removable:!1,params:{LAYERS:"litemap",FORMAT:"image/png",TRANSPARENT:!0},url:"https://geoservice.dlr.de/eoc/basemap/wms",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://geoservice.dlr.de/eoc/basemap/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=litemap&ATTRIBUTION=&WIDTH=256&HEIGHT=256&CRS=EPSG%3A3857&STYLES=&BBOX=0%2C0%2C10018754.171394622%2C10018754.171394622",description:"http://www.naturalearthdata.com/about/",opacity:1};s&&Object.assign(a,s),super(a)}}class v extends c.fn{constructor(s){const a={name:"EOC Litemap Tile",displayName:"EOC Litemap Tile",id:"eoc_litemap_tile",visible:!1,type:"wmts",removable:!1,params:{layer:"eoc:litemap",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Alitemap&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"EOC Litemap as web map tile service",opacity:1};s&&Object.assign(a,s),super(a)}}class f extends c.fn{constructor(s){const a={name:"EOC Liteoverlay Tile",displayName:"EOC LiteoverlayTile",id:"eoc_Liteoverlay_tile",visible:!1,type:"wmts",removable:!1,params:{layer:"eoc:liteoverlay",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Aliteoverlay&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"This is the liteoverlay provided for EOC Service Portals",opacity:1};s&&Object.assign(a,s),super(a)}}class S extends c.fn{constructor(s){const a={name:"EOC Basemap Tile",displayName:"EOC Basemap Tile",id:"eoc_basemap_tile",visible:!1,type:"wmts",removable:!1,params:{layer:"eoc:basemap",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Abasemap&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"This is the basemap for DLR Service Portals",opacity:1};s&&Object.assign(a,s),super(a)}}class y extends c.fn{constructor(s){const a={name:"EOC Baseoverlay Tile",displayName:"EOC Baseoverlay Tile",id:"eoc_Baseoverlay_tile",visible:!1,type:"wmts",removable:!1,params:{layer:"eoc:baseoverlay",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Abaseoverlay&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"This is the basemap for DLR Service Portals",opacity:1};s&&Object.assign(a,s),super(a)}}class _ extends c.fn{constructor(s){const a={name:"BlueMarble Tile",displayName:"BlueMarble Tile",id:"blueMarble_tile",visible:!1,type:"wmts",removable:!1,params:{layer:"bmng_topo_bathy",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=bmng_topo_bathy&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"Blue Marble NG dataset with topography and bathymetry",opacity:1};s&&Object.assign(a,s),super(a)}}class M extends c.fn{constructor(s){const a={name:"World Relief B/W Tile",displayName:"World Relief B/W Tile",id:"eoc:world_relief_bw",visible:!1,type:"wmts",removable:!1,params:{layer:"eoc:world_relief_bw",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Aworld_relief_bw&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"World Relief Black / White",opacity:1};s&&Object.assign(a,s),super(a)}}class b extends c.fn{constructor(s){const a={name:"Hillshade Tile",displayName:"Hillshade Tile",id:"eoc_hillshade",visible:!1,type:"wmts",removable:!1,params:{layer:"hillshade",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=hillshade&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"Global Hillshade based on GMTED2010",opacity:1};s&&Object.assign(a,s),super(a)}}},2459:(T,g,m)=>{m.d(g,{fX:()=>y,c2:()=>S,Pe:()=>a});var c=m(9325),p=m(213),r=m(7222),e=m(3279),v=m(5857);function f(l,h){if(1&l&&(e.j41(0,"option",7),e.EFF(1),e.k0s()),2&l){const o=h.$implicit;e.Y8G("value",o.value),e.R7$(),e.JRh(o.title)}}let S=(()=>{class l{constructor(o){this.mapSvc=o,this.mapCoordinates=[0,0],this.zoom=0,this.precision=2,this.x="Lon",this.y="Lat",this.mapMoveSubscription=i=>{i.coordinate&&(this.mapCoordinates=(0,c.pd)(i.coordinate,this.mapProjection,(0,c.Jt)(this.selectedProjection)))},this.mapOnMoveend=i=>{const t=i.map.getView().getZoom();this.zoom!==t&&(this.zoom=t)},this.mapSub=this.mapSvc.projectionChange.subscribe(i=>{this.mapProjection=i,this.setProjection(i)})}ngOnInit(){this.mapSvc.map.on("pointermove",this.mapMoveSubscription),this.mapSvc.map.on("moveend",this.mapOnMoveend)}setProjection(o){const i=o.getCode();this.projections="EPSG:4326"===i?[{title:i,value:i}]:[{title:"EPSG:4326",value:"EPSG:4326"},{title:i,value:i}],this.selectedProjection=this.projections[0].value}ngOnDestroy(){this.mapSvc.map.un("pointermove",this.mapMoveSubscription),this.mapSvc.map.un("moveend",this.mapOnMoveend),this.mapSub.unsubscribe()}onChangeProj(o){const i=o.target.value;"EPSG:4326"===i?(this.x="Lon",this.y="Lat"):(this.x="X",this.y="Y");const t=this.selectedProjection;this.selectedProjection=i,this.mapCoordinates=(0,c.pd)(this.mapCoordinates,(0,c.Jt)(t),(0,c.Jt)(this.selectedProjection))}toPrecision(o,i){return o.toFixed(i)}static{this.\u0275fac=function(i){return new(i||l)(e.rXU(v.t))}}static{this.\u0275cmp=e.VBU({type:l,selectors:[["ukis-mouse-position"]],standalone:!0,features:[e.aNF],decls:28,vars:6,consts:[[1,"mouse-position-control"],[1,"clr-row"],[1,"clr-col-7"],[1,"output-container"],[1,"clr-col-5"],[1,"input-container"],["clrSelect","",3,"change"],[3,"value"],["type","number","min","0","max","12","name","precision","clrInput","",3,"ngModelChange","ngModel"]],template:function(i,t){1&i&&(e.j41(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div")(5,"b"),e.EFF(6),e.k0s(),e.EFF(7),e.k0s(),e.j41(8,"div")(9,"b"),e.EFF(10),e.k0s(),e.EFF(11),e.k0s(),e.j41(12,"div")(13,"b"),e.EFF(14,"Zoom"),e.k0s(),e.EFF(15),e.k0s()()(),e.j41(16,"div",4)(17,"div",5)(18,"clr-select-container")(19,"label"),e.EFF(20,"Projection "),e.k0s(),e.j41(21,"select",6),e.bIt("change",function(n){return t.onChangeProj(n)}),e.Z7z(22,f,2,2,"option",7,e.fX1),e.k0s()(),e.j41(24,"clr-input-container")(25,"label"),e.EFF(26,"Precision "),e.k0s(),e.j41(27,"input",8),e.mxI("ngModelChange",function(n){return e.DH7(t.precision,n)||(t.precision=n),n}),e.k0s()()()()()()),2&i&&(e.R7$(6),e.JRh(t.x),e.R7$(),e.SpI(" ",t.toPrecision(t.mapCoordinates[0],t.precision),""),e.R7$(3),e.JRh(t.y),e.R7$(),e.SpI(" ",t.toPrecision(t.mapCoordinates[1],t.precision),""),e.R7$(4),e.SpI(" ",t.toPrecision(t.zoom,t.precision),""),e.R7$(7),e.Dyx(t.projections),e.R7$(5),e.R50("ngModel",t.precision))},dependencies:[p.UpA,p.aZZ,p.Yf6,p.hTQ,p.uQ$,r.YN,r.xH,r.y7,r.me,r.Q0,r.BC,r.VZ,r.zX,r.vS,p.AZk,p.icl,p.Xu5],styles:[".mouse-position-control[_ngcontent-%COMP%]{margin-left:.2rem;padding-bottom:.4rem}.mouse-position-control[_ngcontent-%COMP%]   .output-container[_ngcontent-%COMP%]{line-height:1.6rem}.mouse-position-control[_ngcontent-%COMP%]   .input-container[_ngcontent-%COMP%]   .clr-form-control[_ngcontent-%COMP%]:first-child{margin-top:0rem}"]})}}return l})(),y=(()=>{class l{constructor(){this.inputStep=.01,this.precision=2}ngOnInit(){this.subscription=this.mapState.getMapState().subscribe(o=>{this.mapstate=o})}ngOnDestroy(){this.subscription.unsubscribe()}zoomIn(){this.mapstate.zoom++,this.setNewState(this.mapstate)}zoomOut(){this.mapstate.zoom--,this.setNewState(this.mapstate)}setNewState(o){o.options.notifier="user",this.mapState.setMapState(o)}stateChange(o){this.setNewState(this.mapstate)}setInputStep(o){const i=Array.from(Array(o),(t,d)=>"0").join("");this.inputStep=1/+`1${i}`}toPrecision(o,i){return o.toFixed(i)}static{this.\u0275fac=function(i){return new(i||l)}}static{this.\u0275cmp=e.VBU({type:l,selectors:[["ukis-map-navigator"]],inputs:{mapState:"mapState"},standalone:!0,features:[e.aNF],decls:22,vars:7,consts:[[1,"clr-row"],[1,"clr-col-9"],[1,"output-container"],["clrForm",""],["clrInput","","type","number","name","lon",3,"ngModelChange","ngModel","step"],["clrInput","","type","number","name","lat",3,"ngModelChange","ngModel","step"],["clrInput","","type","number","name","zoom",3,"ngModelChange","ngModel","step"],[1,"clr-col-3"],[1,"input-container"],["type","number","min","0","max","8","step","1","name","precision","clrInput","",3,"ngModelChange","ngModel"]],template:function(i,t){1&i&&(e.j41(0,"div",0)(1,"div",1)(2,"div",2)(3,"form",3)(4,"clr-input-container")(5,"label"),e.EFF(6,"Lon"),e.k0s(),e.j41(7,"input",4),e.mxI("ngModelChange",function(n){return e.DH7(t.mapstate.center.lon,n)||(t.mapstate.center.lon=n),n}),e.bIt("ngModelChange",function(n){return t.stateChange(n)}),e.k0s()(),e.j41(8,"clr-input-container")(9,"label"),e.EFF(10,"Lat"),e.k0s(),e.j41(11,"input",5),e.mxI("ngModelChange",function(n){return e.DH7(t.mapstate.center.lat,n)||(t.mapstate.center.lat=n),n}),e.bIt("ngModelChange",function(n){return t.stateChange(n)}),e.k0s()(),e.j41(12,"clr-input-container")(13,"label"),e.EFF(14,"Zoom"),e.k0s(),e.j41(15,"input",6),e.mxI("ngModelChange",function(n){return e.DH7(t.mapstate.zoom,n)||(t.mapstate.zoom=n),n}),e.bIt("ngModelChange",function(n){return t.stateChange(n)}),e.k0s()()()()(),e.j41(16,"div",7)(17,"div",8)(18,"clr-input-container")(19,"label"),e.EFF(20,"Precision "),e.k0s(),e.j41(21,"input",9),e.mxI("ngModelChange",function(n){return e.DH7(t.precision,n)||(t.precision=n),n}),e.bIt("ngModelChange",function(n){return t.setInputStep(n)}),e.k0s()()()()()),2&i&&(e.R7$(7),e.R50("ngModel",t.mapstate.center.lon),e.Y8G("step",t.inputStep),e.R7$(4),e.R50("ngModel",t.mapstate.center.lat),e.Y8G("step",t.inputStep),e.R7$(4),e.R50("ngModel",t.mapstate.zoom),e.Y8G("step",t.inputStep),e.R7$(6),e.R50("ngModel",t.precision))},dependencies:[r.YN,r.qT,r.me,r.Q0,r.BC,r.cb,r.VZ,r.zX,r.vS,r.cV,p.uQ$,p.aZZ,p.mDd,p.AZk,p.icl,p.Xu5],styles:[".output-container[_ngcontent-%COMP%]   .clr-form-control[_ngcontent-%COMP%]:first-child{margin-top:0rem}.output-container[_ngcontent-%COMP%]   .clr-input[_ngcontent-%COMP%]{width:90%}"]})}}return l})();var _=m(3982),M=m(8604),b=m(7937);function u(l,h){if(1&l){const o=e.RV6();e.j41(0,"div",0),e.bIt("click",function(){const t=e.eBV(o).$implicit,d=e.XpG(2);return e.Njj(d.setNewProjection(t))}),e.j41(1,"div",1)(2,"div",2)(3,"span",3),e.bIt("click",function(){const t=e.eBV(o).$implicit,d=e.XpG(2);return e.Njj(d.setNewProjection(t))}),e.EFF(4),e.k0s(),e.nrm(5,"cds-icon",4),e.k0s()()()}if(2&l){const o=h.$implicit,i=e.XpG(2);e.R7$(3),e.Y8G("title",o.title),e.R7$(),e.SpI(" ",o.title||o.code," "),e.R7$(),e.FS9("title",o.code),e.BMQ("solid",o===i.selectedProj)("shape",o===i.selectedProj?"eye":"eye-hide")}}function s(l,h){if(1&l&&(e.j41(0,"div"),e.Z7z(1,u,6,5,"div",null,e.fX1),e.k0s()),2&l){const o=e.XpG();e.R7$(),e.Dyx(o.projList)}}_.h.addIcons(M.h,b.T);let a=(()=>{class l{constructor(){this.fitViewToNewExtent=!1}ngOnInit(){this.projList[0]&&this.setNewProjection(this.projList[0])}setNewProjection(o){this.mapSvc.registerProjection(o);const i=this.mapSvc.getOlProjection(o);this.mapSvc.setProjection(i),this.fitViewToNewExtent&&this.mapStateSvc.setExtent(o.worldExtent),this.selectedProj=o}static{this.\u0275fac=function(i){return new(i||l)}}static{this.\u0275cmp=e.VBU({type:l,selectors:[["ukis-projection-switch"]],inputs:{mapSvc:"mapSvc",mapStateSvc:"mapStateSvc",projList:[0,"projectionList","projList"],fitViewToNewExtent:"fitViewToNewExtent"},standalone:!0,features:[e.aNF],decls:1,vars:1,consts:[[3,"click"],[1,"layergroup"],[1,"head"],[1,"title",3,"click","title"],[1,"iconButton",3,"title"]],template:function(i,t){1&i&&e.DNE(0,s,3,0,"div"),2&i&&e.vxM(t.projList?0:-1)},dependencies:[p.Lfk,p.BlU],encapsulation:2})}}return l})()},509:(T,g,m)=>{m.d(g,{G:()=>r});const r=["compass",(0,m(6256).s)({outline:'<path d="M20.82,15.31h0L10.46,9c-.46-.26-1.11.37-.86.84l6.15,10.56,10.56,6.15a.66.66,0,0,0,.84-.86Zm-4,4,3-3,4.55,7.44Z"/><path d="M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2Zm1,29.95V29.53H17v2.42A14,14,0,0,1,4.05,19H6.47V17H4.05A14,14,0,0,1,17,4.05V6.47h2V4.05A14,14,0,0,1,31.95,17H29.53v2h2.42A14,14,0,0,1,19,31.95Z"/>',solid:'<path d="M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2ZM6.47,19H4.05c0-.33-.05-.66-.05-1s0-.67.05-1H6.47ZM17,4.05c.33,0,.66-.05,1-.05s.67,0,1,.05V6.47H17Zm2,27.9c-.33,0-.66.05-1,.05s-.67,0-1-.05V29.53h2Zm8-5.58a.59.59,0,0,1-.69.16L15.75,20.38,9.6,9.82c-.25-.47.39-1.1.86-.84l10.37,6.33h0l6.33,10.37A.59.59,0,0,1,27,26.37ZM29.53,19V17h2.42c0,.33.05.66.05,1s0,.67-.05,1Z"/><polygon points="16.77 19.35 24.35 23.77 19.8 16.33 16.77 19.35"/>'})]}}]);