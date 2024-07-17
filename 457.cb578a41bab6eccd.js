"use strict";(self.webpackChunkdemo_maps=self.webpackChunkdemo_maps||[]).push([[457],{457:(b,d,e)=>{e.r(d),e.d(d,{RouteExampleOwcLayersModule:()=>w,RouteExampleOwcLayersRoutingModule:()=>u});var S=e(6610),L=e(745),m=e(7925),H=e(3308),n=e(2218),i=e(8356),h=e(6138),p=e(6715),f=e(4105),V=e(3982),g=e(479),C=e(7421);const E=["export",(0,e(6256).s)({outline:'<path d="M6,13.61h7.61V6H24v8.38h2V6a2,2,0,0,0-2-2H10.87L4,10.87V30a2,2,0,0,0,2,2H24a2,2,0,0,0,2-2H6Zm0-1.92L11.69,6H12v6H6Z"/><path d="M28.32,16.35a1,1,0,0,0-1.41,1.41L30.16,21H18a1,1,0,0,0,0,2H30.19l-3.28,3.28a1,1,0,1,0,1.41,1.41L34,22Z"/>',outlineAlerted:'<path d="M28.32,16.35a1,1,0,0,0-1.41,1.41L30.16,21H18a1,1,0,0,0,0,2H30.19l-3.28,3.28a1,1,0,1,0,1.41,1.41L34,22Z"/><path d="M6,13.61h7.61V6h7.68l1.15-2H10.87L4,10.87V30a2,2,0,0,0,2,2H24a2,2,0,0,0,2-2H6Zm0-1.92L11.69,6H12v6H6Z"/>',outlineBadged:'<path d="M28.32,16.35a1,1,0,0,0-1.41,1.41L30.16,21H18a1,1,0,0,0,0,2H30.19l-3.28,3.28a1,1,0,1,0,1.41,1.41L34,22Z"/><path d="M26,12.34a7.53,7.53,0,0,1-2-1.85v3.89h2Z"/><path d="M6,13.61h7.61V6H22.5a7.49,7.49,0,0,1,.28-2H10.87L4,10.87V30a2,2,0,0,0,2,2H24a2,2,0,0,0,2-2H6Zm0-1.92L11.69,6H12v6H6Z"/>',solid:'<path d="M17,22a1,1,0,0,1,1-1h8V6a2,2,0,0,0-2-2H10.87L4,10.86V30a2,2,0,0,0,2,2H24a2,2,0,0,0,2-2V23H18A1,1,0,0,1,17,22ZM12,12H6v-.32L11.69,6H12Z"/><path d="M29.32,16.35a1,1,0,0,0-1.41,1.41L31.16,21H26v2h5.19l-3.28,3.28a1,1,0,1,0,1.41,1.41L35,22Z"/>',solidAlerted:'<path d="M29.32,16.35a1,1,0,0,0-1.41,1.41L31.16,21H26v2h5.19l-3.28,3.28a1,1,0,1,0,1.41,1.41L35,22Z"/><path d="M17,22a1,1,0,0,1,1-1h8V15.4H22.23A3.68,3.68,0,0,1,19,9.89L22.45,4H10.87L4,10.86V30a2,2,0,0,0,2,2H24a2,2,0,0,0,2-2V23H18A1,1,0,0,1,17,22ZM12,12H6v-.32L11.69,6H12Z"/>',solidBadged:'<path d="M29.32,16.35a1,1,0,0,0-1.41,1.41L31.16,21H26v2h5.19l-3.28,3.28a1,1,0,1,0,1.41,1.41L35,22Z"/><path d="M17,22a1,1,0,0,1,1-1h8V12.34A7.46,7.46,0,0,1,22.78,4H10.87L4,10.86V30a2,2,0,0,0,2,2H24a2,2,0,0,0,2-2V23H18A1,1,0,0,1,17,22ZM12,12H6v-.32L11.69,6H12Z"/>'})];var t=e(3279),y=e(4087),O=e(6409),l=e(5944),G=e(6647),R=e(9139),Z=e(733);V.h.addIcons(g.Q,C.A,E);let x=(()=>{class s{constructor(o,r,a,c,v){this.layersSvc=o,this.mapStateSvc=r,this.mapSvc=a,this.owcSvc=c,this.http=v,this.class="content-container",this.controls={attribution:!0,scaleLine:!0}}ngOnInit(){this.mapSvc.map.addControl(new f.E),this.getOwcContext("assets/owc/ows-json-context.json")}getOwcContext(o){return this.http.get(o).subscribe(r=>{this.addLayersFromContext(r)})}addLayersFromContext(o){this.owcSvc.getLayers(o,this.mapSvc.EPSG).pipe((0,p.$)()).subscribe(r=>{for(const a of r)a instanceof i.x2?("VectorLayers_baseWFSLayer_eocGeojsonLayer_baseKMLLayer"===a.id&&a.layers.forEach(c=>c.popup=!0),this.layersSvc.addLayerGroup(a,a.filtertype)):this.layersSvc.addLayer(a,a.filtertype)}),o.bbox&&this.mapStateSvc.setExtent(o.bbox)}downloadOwc(){var o=this;return(0,H.A)(function*(){const r=yield o.layersSvc.getLayerGroups().pipe((0,p.$)()).toPromise(),a=yield o.mapStateSvc.getExtent().pipe((0,p.$)()).toPromise(),c=o.owcSvc.generateOwsContextFrom("Test_OWC",r,a),v=new Blob([JSON.stringify(c)],{type:"application/json"}),$=URL.createObjectURL(v);window.open($)})()}static#t=this.\u0275fac=function(r){return new(r||s)(t.rXU(i._t),t.rXU(h.du),t.rXU(n.tC),t.rXU(y.DP),t.rXU(O.Qq))};static#a=this.\u0275cmp=t.VBU({type:s,selectors:[["app-route-example-owc-layers"]],hostVars:2,hostBindings:function(r,a){2&r&&t.HbH(a.class)},features:[t.Jv_([i._t,h.du,n.tC])],decls:24,vars:15,consts:[[1,"content-area","map-view"],["id","olMap",3,"layersSvc","mapState","controls"],[1,"right",3,"clrVerticalNavCollapsible","clr-nav-level"],[1,"layers",3,"clrVerticalNavGroupExpanded"],["shape","world","title","Overlays","clrVerticalNavIcon",""],[1,"padding","title-ellipsis"],[3,"layersSvc","mapStateSvc","layerfilter"],["shape","layers","clrVerticalNavIcon","","title","layers"],[3,"layersSvc","mapStateSvc"],["shape","world","title","Baselayers","clrVerticalNavIcon",""],["shape","export","title","Export","clrVerticalNavIcon",""],[1,"btn","btn-primary",3,"click"]],template:function(r,a){1&r&&(t.j41(0,"main",0),t.nrm(1,"ukis-map-ol",1),t.k0s(),t.j41(2,"clr-vertical-nav",2)(3,"clr-vertical-nav-group",3),t.nrm(4,"cds-icon",4),t.EFF(5," Overlays "),t.j41(6,"clr-vertical-nav-group-children",5),t.nrm(7,"ukis-layer-control",6),t.k0s()(),t.j41(8,"clr-vertical-nav-group",3),t.nrm(9,"cds-icon",7),t.EFF(10," Layers "),t.j41(11,"clr-vertical-nav-group-children",5),t.nrm(12,"ukis-layer-control",8),t.k0s()(),t.j41(13,"clr-vertical-nav-group",3),t.nrm(14,"cds-icon",9),t.EFF(15," Baselayers "),t.j41(16,"clr-vertical-nav-group-children",5),t.nrm(17,"ukis-base-layer-control",8),t.k0s()(),t.j41(18,"clr-vertical-nav-group"),t.nrm(19,"cds-icon",10),t.EFF(20," OWC Control "),t.j41(21,"clr-vertical-nav-group-children",5)(22,"button",11),t.bIt("click",function(){return a.downloadOwc()}),t.EFF(23,"Download OWC"),t.k0s()()()()),2&r&&(t.R7$(),t.Y8G("layersSvc",a.layersSvc)("mapState",a.mapStateSvc)("controls",a.controls),t.R7$(),t.Y8G("clrVerticalNavCollapsible",!0)("clr-nav-level",2),t.R7$(),t.Y8G("clrVerticalNavGroupExpanded",!0),t.R7$(4),t.Y8G("layersSvc",a.layersSvc)("mapStateSvc",a.mapStateSvc)("layerfilter","Overlays"),t.R7$(),t.Y8G("clrVerticalNavGroupExpanded",!0),t.R7$(4),t.Y8G("layersSvc",a.layersSvc)("mapStateSvc",a.mapStateSvc),t.R7$(),t.Y8G("clrVerticalNavGroupExpanded",!0),t.R7$(4),t.Y8G("layersSvc",a.layersSvc)("mapStateSvc",a.mapStateSvc))},dependencies:[l.BlU,l.ndX,l.D2I,l.wqM,l.zLy,l.Wfw,G.S,R.N,Z.L],styles:["[_nghost-%COMP%]     .zoom-number{bottom:2.5em;left:8px}"]})}return s})();var F=e(6174);const j=[{path:"",component:x}];let u=(()=>{class s{static#t=this.\u0275fac=function(r){return new(r||s)};static#a=this.\u0275mod=t.$C({type:s});static#e=this.\u0275inj=t.G2t({imports:[m.iI.forChild(j),m.iI]})}return s})(),w=(()=>{class s{static#t=this.\u0275fac=function(r){return new(r||s)};static#a=this.\u0275mod=t.$C({type:s});static#e=this.\u0275inj=t.G2t({imports:[S.MD,L.u,u,l.PuD,F.$y,n.Cf,y.iu]})}return s})()}}]);