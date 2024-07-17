"use strict";(self.webpackChunkdemo_maps=self.webpackChunkdemo_maps||[]).push([[119],{6924:(_,u,a)=>{a.d(u,{gD:()=>m,tH:()=>h,hQ:()=>d,wl:()=>s,me:()=>l,WX:()=>p,nu:()=>r,si:()=>v,dl:()=>t,zT:()=>c});var n=a(8356);class t extends n.Bk{constructor(e){const o={name:"OpenStreetMap",displayName:"OpenStreetMap",id:"osm",visible:!1,type:"xyz",url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",subdomains:["a","b","c"],attribution:'&copy, <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors',continuousWorld:!1,legendImg:"https://a.tile.openstreetmap.org/3/4/3.png",description:"OpenStreetMap z-x-y Tiles",opacity:1};e&&Object.assign(o,e),super(o)}}class v extends n.Bk{constructor(e){const o={name:"OpenSeaMap",displayName:"OpenSeaMap",id:"OpenSeaMap",visible:!1,type:"xyz",removable:!1,url:"https://{s}.openseamap.org/seamark/{z}/{x}/{y}.png",subdomains:["t1"],attribution:'&copy, <a href="https://map.openseamap.org/legend.php?lang=de&page=license">OpenSeaMap</a>',continuousWorld:!1,legendImg:"https://t1.openseamap.org/seamark/10/554/321.png",description:"http://map.openseamap.org/",opacity:1};e&&Object.assign(o,e),super(o)}}class s extends n.nw{constructor(e){const o={name:"EOC Litemap",displayName:"EOC Litemap",id:"eoc_litemap",visible:!1,type:"wms",removable:!1,params:{LAYERS:"litemap",FORMAT:"image/png",TRANSPARENT:!0},url:"https://geoservice.dlr.de/eoc/basemap/wms",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://geoservice.dlr.de/eoc/basemap/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=litemap&ATTRIBUTION=&WIDTH=256&HEIGHT=256&CRS=EPSG%3A3857&STYLES=&BBOX=0%2C0%2C10018754.171394622%2C10018754.171394622",description:"http://www.naturalearthdata.com/about/",opacity:1};e&&Object.assign(o,e),super(o)}}class l extends n.fn{constructor(e){const o={name:"EOC Litemap Tile",displayName:"EOC Litemap Tile",id:"eoc_litemap_tile",visible:!1,type:"wmts",removable:!1,params:{layer:"eoc:litemap",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Alitemap&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"EOC Litemap as web map tile service",opacity:1};e&&Object.assign(o,e),super(o)}}class p extends n.fn{constructor(e){const o={name:"EOC Liteoverlay Tile",displayName:"EOC LiteoverlayTile",id:"eoc_Liteoverlay_tile",visible:!1,type:"wmts",removable:!1,params:{layer:"eoc:liteoverlay",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Aliteoverlay&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"This is the liteoverlay provided for EOC Service Portals",opacity:1};e&&Object.assign(o,e),super(o)}}class h extends n.fn{constructor(e){const o={name:"EOC Basemap Tile",displayName:"EOC Basemap Tile",id:"eoc_basemap_tile",visible:!1,type:"wmts",removable:!1,params:{layer:"eoc:basemap",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Abasemap&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"This is the basemap for DLR Service Portals",opacity:1};e&&Object.assign(o,e),super(o)}}class d extends n.fn{constructor(e){const o={name:"EOC Baseoverlay Tile",displayName:"EOC Baseoverlay Tile",id:"eoc_Baseoverlay_tile",visible:!1,type:"wmts",removable:!1,params:{layer:"eoc:baseoverlay",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Abaseoverlay&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"This is the basemap for DLR Service Portals",opacity:1};e&&Object.assign(o,e),super(o)}}class m extends n.fn{constructor(e){const o={name:"BlueMarble Tile",displayName:"BlueMarble Tile",id:"blueMarble_tile",visible:!1,type:"wmts",removable:!1,params:{layer:"bmng_topo_bathy",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=bmng_topo_bathy&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"Blue Marble NG dataset with topography and bathymetry",opacity:1};e&&Object.assign(o,e),super(o)}}class c extends n.fn{constructor(e){const o={name:"World Relief B/W Tile",displayName:"World Relief B/W Tile",id:"eoc:world_relief_bw",visible:!1,type:"wmts",removable:!1,params:{layer:"eoc:world_relief_bw",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=eoc%3Aworld_relief_bw&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"World Relief Black / White",opacity:1};e&&Object.assign(o,e),super(o)}}class r extends n.fn{constructor(e){const o={name:"Hillshade Tile",displayName:"Hillshade Tile",id:"eoc_hillshade",visible:!1,type:"wmts",removable:!1,params:{layer:"hillshade",format:"image/png",style:"_empty",matrixSetOptions:{matrixSet:"EPSG:3857",tileMatrixPrefix:"EPSG:3857"}},url:"https://tiles.geoservice.dlr.de/service/wmts",attribution:'&copy, <a href="//geoservice.dlr.de/eoc/basemap/">DLR</a>',continuousWorld:!1,legendImg:"https://tiles.geoservice.dlr.de/service/wmts?layer=hillshade&style=_empty&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A3857%3A5&TileCol=18&TileRow=11",description:"Global Hillshade based on GMTED2010",opacity:1};e&&Object.assign(o,e),super(o)}}},3926:(_,u,a)=>{a.d(u,{c:()=>d});var n=a(9325),t=a(3279),v=a(2218),s=a(6610),l=a(7222),p=a(5944);function h(m,c){if(1&m&&(t.j41(0,"option",9),t.EFF(1),t.k0s()),2&m){const r=c.$implicit;t.Y8G("value",r.value),t.R7$(),t.JRh(r.title)}}let d=(()=>{class m{constructor(r){this.mapSvc=r,this.mapCoordinates=[0,0],this.zoom=0,this.precision=2,this.x="Lon",this.y="Lat",this.mapMoveSubscription=i=>{i.coordinate&&(this.mapCoordinates=(0,n.pd)(i.coordinate,this.mapProjection,(0,n.Jt)(this.selectedProjection)))},this.mapOnMoveend=i=>{const e=i.map.getView().getZoom();this.zoom!==e&&(this.zoom=e)},this.mapSub=this.mapSvc.projectionChange.subscribe(i=>{this.mapProjection=i,this.setProjection(i)})}ngOnInit(){this.mapSvc.map.on("pointermove",this.mapMoveSubscription),this.mapSvc.map.on("moveend",this.mapOnMoveend)}setProjection(r){const i=r.getCode();this.projections="EPSG:4326"===i?[{title:i,value:i}]:[{title:"EPSG:4326",value:"EPSG:4326"},{title:i,value:i}],this.selectedProjection=this.projections[0].value}ngOnDestroy(){this.mapSvc.map.un("pointermove",this.mapMoveSubscription),this.mapSvc.map.un("moveend",this.mapOnMoveend),this.mapSub.unsubscribe()}onChangeProj(r){const i=r.target.value;"EPSG:4326"===i?(this.x="Lon",this.y="Lat"):(this.x="X",this.y="Y");const e=this.selectedProjection;this.selectedProjection=i,this.mapCoordinates=(0,n.pd)(this.mapCoordinates,(0,n.Jt)(e),(0,n.Jt)(this.selectedProjection))}toPrecision(r,i){return r.toFixed(i)}static#e=this.\u0275fac=function(i){return new(i||m)(t.rXU(v.tC))};static#t=this.\u0275cmp=t.VBU({type:m,selectors:[["ukis-mouse-position"]],decls:27,vars:7,consts:[[1,"mouse-position-control"],[1,"clr-row"],[1,"clr-col-7"],[1,"output-container"],[1,"clr-col-5"],[1,"input-container"],["clrSelect","",3,"change"],[3,"value",4,"ngFor","ngForOf"],["type","number","min","0","max","12","name","precision","clrInput","",3,"ngModelChange","ngModel"],[3,"value"]],template:function(i,e){1&i&&(t.j41(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div")(5,"b"),t.EFF(6),t.k0s(),t.EFF(7),t.k0s(),t.j41(8,"div")(9,"b"),t.EFF(10),t.k0s(),t.EFF(11),t.k0s(),t.j41(12,"div")(13,"b"),t.EFF(14,"Zoom"),t.k0s(),t.EFF(15),t.k0s()()(),t.j41(16,"div",4)(17,"div",5)(18,"clr-select-container")(19,"label"),t.EFF(20,"Projection "),t.k0s(),t.j41(21,"select",6),t.bIt("change",function(g){return e.onChangeProj(g)}),t.DNE(22,h,2,2,"option",7),t.k0s()(),t.j41(23,"clr-input-container")(24,"label"),t.EFF(25,"Precision "),t.k0s(),t.j41(26,"input",8),t.mxI("ngModelChange",function(g){return t.DH7(e.precision,g)||(e.precision=g),g}),t.k0s()()()()()()),2&i&&(t.R7$(6),t.JRh(e.x),t.R7$(),t.SpI(" ",e.toPrecision(e.mapCoordinates[0],e.precision),""),t.R7$(3),t.JRh(e.y),t.R7$(),t.SpI(" ",e.toPrecision(e.mapCoordinates[1],e.precision),""),t.R7$(4),t.SpI(" ",e.toPrecision(e.zoom,e.precision),""),t.R7$(7),t.Y8G("ngForOf",e.projections),t.R7$(4),t.R50("ngModel",e.precision))},dependencies:[s.Sq,l.xH,l.y7,l.me,l.Q0,l.BC,l.VZ,l.zX,l.vS,p.aZZ,p.icl,p.Xu5,p.Yf6,p.hTQ],styles:[".mouse-position-control[_ngcontent-%COMP%]{margin-left:.2rem;padding-bottom:.4rem}.mouse-position-control[_ngcontent-%COMP%]   .output-container[_ngcontent-%COMP%]{line-height:1.6rem}.mouse-position-control[_ngcontent-%COMP%]   .input-container[_ngcontent-%COMP%]   .clr-form-control[_ngcontent-%COMP%]:first-child{margin-top:0rem}"]})}return m})()},9018:(_,u,a)=>{a.d(u,{P:()=>m});var n=a(3982),t=a(8604),v=a(7937),s=a(3279),l=a(6610),p=a(5944);function h(c,r){if(1&c){const i=s.RV6();s.j41(0,"div",2),s.bIt("click",function(){const o=s.eBV(i).$implicit,g=s.XpG(2);return s.Njj(g.setNewProjection(o))}),s.j41(1,"div",3)(2,"div",4)(3,"span",5),s.bIt("click",function(){const o=s.eBV(i).$implicit,g=s.XpG(2);return s.Njj(g.setNewProjection(o))}),s.EFF(4),s.k0s(),s.nrm(5,"cds-icon",6),s.k0s()()()}if(2&c){const i=r.$implicit,e=s.XpG(2);s.R7$(3),s.Y8G("title",i.title),s.R7$(),s.SpI(" ",i.title||i.code," "),s.R7$(),s.FS9("title",i.code),s.BMQ("solid",i===e.selectedProj)("shape",i===e.selectedProj?"eye":"eye-hide")}}function d(c,r){if(1&c&&(s.j41(0,"div"),s.DNE(1,h,6,5,"div",1),s.k0s()),2&c){const i=s.XpG();s.R7$(),s.Y8G("ngForOf",i.projList)}}n.h.addIcons(t.h,v.T);let m=(()=>{class c{constructor(){this.fitViewToNewExtent=!1}ngOnInit(){this.projList[0]&&this.setNewProjection(this.projList[0])}setNewProjection(i){this.mapSvc.registerProjection(i);const e=this.mapSvc.getOlProjection(i);this.mapSvc.setProjection(e),this.fitViewToNewExtent&&this.mapStateSvc.setExtent(i.worldExtent),this.selectedProj=i}static#e=this.\u0275fac=function(e){return new(e||c)};static#t=this.\u0275cmp=s.VBU({type:c,selectors:[["ukis-projection-switch"]],inputs:{mapSvc:"mapSvc",mapStateSvc:"mapStateSvc",projList:[s.Mj6.None,"projectionList","projList"],fitViewToNewExtent:"fitViewToNewExtent"},decls:1,vars:1,consts:[[4,"ngIf"],[3,"click",4,"ngFor","ngForOf"],[3,"click"],[1,"layergroup"],[1,"head"],[1,"title",3,"click","title"],[1,"iconButton",3,"title"]],template:function(e,o){1&e&&s.DNE(0,d,2,1,"div",0),2&e&&s.Y8G("ngIf",o.projList)},dependencies:[l.Sq,l.bT,p.BlU],encapsulation:2})}return c})()},6658:(_,u,a)=>{a.d(u,{Yb:()=>h}),a(3926),a(9018);var v=a(6610),s=a(7222),l=a(5944),p=a(3279);let h=(()=>{class d{static#e=this.\u0275fac=function(r){return new(r||d)};static#t=this.\u0275mod=p.$C({type:d});static#i=this.\u0275inj=p.G2t({imports:[v.MD,s.YN,l.PuD]})}return d})()},509:(_,u,a)=>{a.d(u,{G:()=>v});const v=["compass",(0,a(6256).s)({outline:'<path d="M20.82,15.31h0L10.46,9c-.46-.26-1.11.37-.86.84l6.15,10.56,10.56,6.15a.66.66,0,0,0,.84-.86Zm-4,4,3-3,4.55,7.44Z"/><path d="M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2Zm1,29.95V29.53H17v2.42A14,14,0,0,1,4.05,19H6.47V17H4.05A14,14,0,0,1,17,4.05V6.47h2V4.05A14,14,0,0,1,31.95,17H29.53v2h2.42A14,14,0,0,1,19,31.95Z"/>',solid:'<path d="M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2ZM6.47,19H4.05c0-.33-.05-.66-.05-1s0-.67.05-1H6.47ZM17,4.05c.33,0,.66-.05,1-.05s.67,0,1,.05V6.47H17Zm2,27.9c-.33,0-.66.05-1,.05s-.67,0-1-.05V29.53h2Zm8-5.58a.59.59,0,0,1-.69.16L15.75,20.38,9.6,9.82c-.25-.47.39-1.1.86-.84l10.37,6.33h0l6.33,10.37A.59.59,0,0,1,27,26.37ZM29.53,19V17h2.42c0,.33.05.66.05,1s0,.67-.05,1Z"/><polygon points="16.77 19.35 24.35 23.77 19.8 16.33 16.77 19.35"/>'})]}}]);