"use strict";(self.webpackChunkdemo_maps=self.webpackChunkdemo_maps||[]).push([[861],{4861:(ut,X,L)=>{L.r(X),L.d(X,{RouteExampleThreejsModule:()=>Lt,RouteExampleThreejsRoutingModule:()=>O});var U=L(8692),V=L(8808),B=L(7223),C=L(5548),R=L(1899),D=L(9573),J=L(8779),K=L(3413),A=L(694),W=L(23),Y=L(7026),w=L(5253),I=L(1786),G=L(8185),Q=L(7356),H=L(3149),b=L(9543),v=L(4331),N=L(5415),E=L(9015),$=L(3056);function F(f,t,e){const n=[];let i=f(0),s=f(1),a=t(i),o=t(s);const u=[s,i],_=[o,a],d=[1,0],r={};let S,h,m,p,c,y,g=1e5;for(;--g>0&&d.length>0;)m=d.pop(),i=u.pop(),a=_.pop(),y=m.toString(),y in r||(n.push(a[0],a[1]),r[y]=!0),p=d.pop(),s=u.pop(),o=_.pop(),c=(m+p)/2,S=f(c),h=t(S),(0,v.rU)(h[0],h[1],a[0],a[1],o[0],o[1])<e?(n.push(o[0],o[1]),y=p.toString(),r[y]=!0):(d.push(p,c,c,m),_.push(o,h,h,a),u.push(s,S,S,i));return n}const tt=new w.Z({color:"rgba(0,0,0,0.2)"}),et=[90,45,30,20,10,5,2,1,.5,20/60,10/60,5/60,2/60,1/60,30/3600,20/3600,10/3600,5/3600,2/3600,1/3600],it=class at extends Q.Z{constructor(t){t=t||{};const e=Object.assign({updateWhileAnimating:!0,updateWhileInteracting:!0,renderBuffer:0},t);delete e.maxLines,delete e.strokeStyle,delete e.targetSize,delete e.showLabels,delete e.lonLabelFormatter,delete e.latLabelFormatter,delete e.lonLabelPosition,delete e.latLabelPosition,delete e.lonLabelStyle,delete e.latLabelStyle,delete e.intervals,super(e),this.projection_=null,this.maxLat_=1/0,this.maxLon_=1/0,this.minLat_=-1/0,this.minLon_=-1/0,this.maxX_=1/0,this.maxY_=1/0,this.minX_=-1/0,this.minY_=-1/0,this.targetSize_=void 0!==t.targetSize?t.targetSize:100,this.maxLines_=void 0!==t.maxLines?t.maxLines:100,this.meridians_=[],this.parallels_=[],this.strokeStyle_=void 0!==t.strokeStyle?t.strokeStyle:tt,this.fromLonLatTransform_=void 0,this.toLonLatTransform_=void 0,this.projectionCenterLonLat_=null,this.bottomLeft_=null,this.bottomRight_=null,this.topLeft_=null,this.topRight_=null,this.meridiansLabels_=null,this.parallelsLabels_=null,t.showLabels&&(this.lonLabelFormatter_=t.lonLabelFormatter??N.I8.bind(this,"EW"),this.latLabelFormatter_=t.latLabelFormatter??N.I8.bind(this,"NS"),this.lonLabelPosition_=t.lonLabelPosition??0,this.latLabelPosition_=t.latLabelPosition??1,this.lonLabelStyleBase_=new I.ZP({text:void 0!==t.lonLabelStyle?t.lonLabelStyle.clone():new G.Z({font:"12px Calibri,sans-serif",textBaseline:"bottom",fill:new A.Z({color:"rgba(0,0,0,1)"}),stroke:new w.Z({color:"rgba(255,255,255,1)",width:3})})}),this.lonLabelStyle_=n=>{const i=n.get("graticule_label");return this.lonLabelStyleBase_.getText().setText(i),this.lonLabelStyleBase_},this.latLabelStyleBase_=new I.ZP({text:void 0!==t.latLabelStyle?t.latLabelStyle.clone():new G.Z({font:"12px Calibri,sans-serif",textAlign:"right",fill:new A.Z({color:"rgba(0,0,0,1)"}),stroke:new w.Z({color:"rgba(255,255,255,1)",width:3})})}),this.latLabelStyle_=n=>{const i=n.get("graticule_label");return this.latLabelStyleBase_.getText().setText(i),this.latLabelStyleBase_},this.meridiansLabels_=[],this.parallelsLabels_=[],this.addEventListener(J.Z.POSTRENDER,this.drawLabels_.bind(this))),this.intervals_=void 0!==t.intervals?t.intervals:et,this.setSource(new H.Z({loader:this.loaderFunction.bind(this),strategy:this.strategyFunction.bind(this),features:new D.Z,overlaps:!1,useSpatialIndex:!1,wrapX:t.wrapX})),this.featurePool_=[],this.lineStyle_=new I.ZP({stroke:this.strokeStyle_}),this.loadedExtent_=null,this.renderedExtent_=null,this.renderedResolution_=null,this.setRenderOrder(null)}strategyFunction(t,e){let n=t.slice();return this.projection_&&this.getSource().getWrapX()&&(0,b.Cf)(n,this.projection_),this.loadedExtent_&&((0,b.iW)(this.loadedExtent_,n,e)?n=this.loadedExtent_.slice():this.getSource().removeLoadedExtent(this.loadedExtent_)),[n]}loaderFunction(t,e,n){this.loadedExtent_=t;const i=this.getSource(),s=this.getExtent()||[-1/0,-1/0,1/0,1/0],a=(0,b.Ed)(s,t);if(this.renderedExtent_&&(0,b.fS)(this.renderedExtent_,a)&&this.renderedResolution_===e||(this.renderedExtent_=a,this.renderedResolution_=e,(0,b.xb)(a)))return;const o=(0,b.qg)(a),u=e*e/4;(!this.projection_||!(0,E.OP)(this.projection_,n))&&this.updateProjectionInfo_(n),this.createGraticule_(a,o,e,u);let r,d=this.meridians_.length+this.parallels_.length;for(this.meridiansLabels_&&(d+=this.meridians_.length),this.parallelsLabels_&&(d+=this.parallels_.length);d>this.featurePool_.length;)r=new K.Z,this.featurePool_.push(r);const g=i.getFeaturesCollection();g.clear();let h,m,S=0;for(h=0,m=this.meridians_.length;h<m;++h)r=this.featurePool_[S++],r.setGeometry(this.meridians_[h]),r.setStyle(this.lineStyle_),g.push(r);for(h=0,m=this.parallels_.length;h<m;++h)r=this.featurePool_[S++],r.setGeometry(this.parallels_[h]),r.setStyle(this.lineStyle_),g.push(r)}addMeridian_(t,e,n,i,s,a){const o=this.getMeridian_(t,e,n,i,a);if((0,b.kK)(o.getExtent(),s)){if(this.meridiansLabels_){const u=this.lonLabelFormatter_(t);a in this.meridiansLabels_?this.meridiansLabels_[a].text=u:this.meridiansLabels_[a]={geom:new Y.Z([]),text:u}}this.meridians_[a++]=o}return a}addParallel_(t,e,n,i,s,a){const o=this.getParallel_(t,e,n,i,a);if((0,b.kK)(o.getExtent(),s)){if(this.parallelsLabels_){const u=this.latLabelFormatter_(t);a in this.parallelsLabels_?this.parallelsLabels_[a].text=u:this.parallelsLabels_[a]={geom:new Y.Z([]),text:u}}this.parallels_[a++]=o}return a}drawLabels_(t){const e=t.frameState.viewState.rotation,n=t.frameState.viewState.resolution,i=t.frameState.size,s=t.frameState.extent,a=(0,b.qg)(s);let o=s;if(e){const h=i[0]*n,m=i[1]*n;o=[a[0]-h/2,a[1]-m/2,a[0]+h/2,a[1]+m/2]}let u=0,_=0,d=this.latLabelPosition_<.5;const r=this.projection_.getExtent(),g=(0,b.dz)(r);this.getSource().getWrapX()&&this.projection_.canWrapX()&&!(0,b.r4)(r,s)&&(u=Math.floor((s[0]-r[0])/g),_=Math.ceil((s[2]-r[2])/g),d=d!==Math.abs(e)>Math.PI/2);const S=(0,$.u3)(t);for(let h=u;h<=_;++h){let p,c,y,P,m=this.meridians_.length+this.parallels_.length;if(this.meridiansLabels_)for(c=0,y=this.meridiansLabels_.length;c<y;++c){const M=this.meridians_[c];if(e||0!==h){const x=M.clone();x.translate(h*g,0),x.rotate(-e,a),P=this.getMeridianPoint_(x,o,c),P.rotate(e,a)}else P=this.getMeridianPoint_(M,s,c);p=this.featurePool_[m++],p.setGeometry(P),p.set("graticule_label",this.meridiansLabels_[c].text),S.drawFeature(p,this.lonLabelStyle_(p))}if(this.parallelsLabels_&&(h===u&&d||h===_&&!d))for(c=0,y=this.parallels_.length;c<y;++c){const M=this.parallels_[c];if(e||0!==h){const x=M.clone();x.translate(h*g,0),x.rotate(-e,a),P=this.getParallelPoint_(x,o,c),P.rotate(e,a)}else P=this.getParallelPoint_(M,s,c);p=this.featurePool_[m++],p.setGeometry(P),p.set("graticule_label",this.parallelsLabels_[c].text),S.drawFeature(p,this.latLabelStyle_(p))}}}createGraticule_(t,e,n,i){const s=this.getInterval_(n);if(-1==s)return this.meridians_.length=0,this.parallels_.length=0,this.meridiansLabels_&&(this.meridiansLabels_.length=0),void(this.parallelsLabels_&&(this.parallelsLabels_.length=0));let a=!1;const o=this.projection_.getExtent(),u=(0,b.dz)(o);this.getSource().getWrapX()&&this.projection_.canWrapX()&&!(0,b.r4)(o,t)&&((0,b.dz)(t)>=u?(t[0]=o[0],t[2]=o[2]):a=!0);const _=[(0,v.uZ)(e[0],this.minX_,this.maxX_),(0,v.uZ)(e[1],this.minY_,this.maxY_)],d=this.toLonLatTransform_(_);isNaN(d[1])&&(d[1]=Math.abs(this.maxLat_)>=Math.abs(this.minLat_)?this.maxLat_:this.minLat_);let r=(0,v.uZ)(d[0],this.minLon_,this.maxLon_),g=(0,v.uZ)(d[1],this.minLat_,this.maxLat_);const S=this.maxLines_;let h,m,p,c,y=t;a||(y=[(0,v.uZ)(t[0],this.minX_,this.maxX_),(0,v.uZ)(t[1],this.minY_,this.maxY_),(0,v.uZ)(t[2],this.minX_,this.maxX_),(0,v.uZ)(t[3],this.minY_,this.maxY_)]);const P=(0,b.Ne)(y,this.toLonLatTransform_,void 0,8);let M=P[3],x=P[2],Z=P[1],j=P[0];if(a||((0,b.b8)(y,this.bottomLeft_)&&(j=this.minLon_,Z=this.minLat_),(0,b.b8)(y,this.bottomRight_)&&(x=this.maxLon_,Z=this.minLat_),(0,b.b8)(y,this.topLeft_)&&(j=this.minLon_,M=this.maxLat_),(0,b.b8)(y,this.topRight_)&&(x=this.maxLon_,M=this.maxLat_),M=(0,v.uZ)(M,g,this.maxLat_),x=(0,v.uZ)(x,r,this.maxLon_),Z=(0,v.uZ)(Z,this.minLat_,g),j=(0,v.uZ)(j,this.minLon_,r)),r=Math.floor(r/s)*s,c=(0,v.uZ)(r,this.minLon_,this.maxLon_),m=this.addMeridian_(c,Z,M,i,t,0),h=0,a)for(;(c-=s)>=j&&h++<S;)m=this.addMeridian_(c,Z,M,i,t,m);else for(;c!=this.minLon_&&h++<S;)c=Math.max(c-s,this.minLon_),m=this.addMeridian_(c,Z,M,i,t,m);if(c=(0,v.uZ)(r,this.minLon_,this.maxLon_),h=0,a)for(;(c+=s)<=x&&h++<S;)m=this.addMeridian_(c,Z,M,i,t,m);else for(;c!=this.maxLon_&&h++<S;)c=Math.min(c+s,this.maxLon_),m=this.addMeridian_(c,Z,M,i,t,m);for(this.meridians_.length=m,this.meridiansLabels_&&(this.meridiansLabels_.length=m),g=Math.floor(g/s)*s,p=(0,v.uZ)(g,this.minLat_,this.maxLat_),m=this.addParallel_(p,j,x,i,t,0),h=0;p!=this.minLat_&&h++<S;)p=Math.max(p-s,this.minLat_),m=this.addParallel_(p,j,x,i,t,m);for(p=(0,v.uZ)(g,this.minLat_,this.maxLat_),h=0;p!=this.maxLat_&&h++<S;)p=Math.min(p+s,this.maxLat_),m=this.addParallel_(p,j,x,i,t,m);this.parallels_.length=m,this.parallelsLabels_&&(this.parallelsLabels_.length=m)}getInterval_(t){const e=this.projectionCenterLonLat_[0],n=this.projectionCenterLonLat_[1];let i=-1;const s=Math.pow(this.targetSize_*t,2),a=[],o=[];for(let u=0,_=this.intervals_.length;u<_;++u){const d=(0,v.uZ)(this.intervals_[u]/2,0,90),r=(0,v.uZ)(n,-90+d,90-d);if(a[0]=e-d,a[1]=r-d,o[0]=e+d,o[1]=r+d,this.fromLonLatTransform_(a,a),this.fromLonLatTransform_(o,o),Math.pow(o[0]-a[0],2)+Math.pow(o[1]-a[1],2)<=s)break;i=this.intervals_[u]}return i}getMeridian_(t,e,n,i,s){const a=function k(f,t,e,n,i){const s=(0,E.U2)("EPSG:4326");return F(function(a){return[f,t+(e-t)*a]},(0,E.Ck)(s,n),i)}(t,e,n,this.projection_,i);let o=this.meridians_[s];return o?(o.setFlatCoordinates("XY",a),o.changed()):(o=new W.Z(a,"XY"),this.meridians_[s]=o),o}getMeridianPoint_(t,e,n){const i=t.getFlatCoordinates();let s=1,a=i.length-1;i[s]>i[a]&&(s=a,a=1);const o=Math.max(e[1],i[s]),u=Math.min(e[3],i[a]),_=(0,v.uZ)(e[1]+Math.abs(e[1]-e[3])*this.lonLabelPosition_,o,u),g=this.meridiansLabels_[n].geom;return g.setCoordinates([i[s-1]+(i[a-1]-i[s-1])*(_-i[s])/(i[a]-i[s]),_]),g}getMeridians(){return this.meridians_}getParallel_(t,e,n,i,s){const a=function q(f,t,e,n,i){const s=(0,E.U2)("EPSG:4326");return F(function(a){return[t+(e-t)*a,f]},(0,E.Ck)(s,n),i)}(t,e,n,this.projection_,i);let o=this.parallels_[s];return o?(o.setFlatCoordinates("XY",a),o.changed()):o=new W.Z(a,"XY"),o}getParallelPoint_(t,e,n){const i=t.getFlatCoordinates();let s=0,a=i.length-2;i[s]>i[a]&&(s=a,a=0);const o=Math.max(e[0],i[s]),u=Math.min(e[2],i[a]),_=(0,v.uZ)(e[0]+Math.abs(e[0]-e[2])*this.latLabelPosition_,o,u),g=this.parallelsLabels_[n].geom;return g.setCoordinates([_,i[s+1]+(i[a+1]-i[s+1])*(_-i[s])/(i[a]-i[s])]),g}getParallels(){return this.parallels_}updateProjectionInfo_(t){const e=(0,E.U2)("EPSG:4326"),n=t.getWorldExtent();this.maxLat_=n[3],this.maxLon_=n[2],this.minLat_=n[1],this.minLon_=n[0];const i=(0,E.Ck)(t,e);if(this.minLon_<this.maxLon_)this.toLonLatTransform_=i;else{const a=this.minLon_+this.maxLon_/2;this.maxLon_+=360,this.toLonLatTransform_=function(o,u,_){const d=i(o,u,_=_||2);for(let r=0,g=d.length;r<g;r+=_)d[r]<a&&(d[r]+=360);return d}}this.fromLonLatTransform_=(0,E.Ck)(e,t);const s=(0,b.Ne)([this.minLon_,this.minLat_,this.maxLon_,this.maxLat_],this.fromLonLatTransform_,void 0,8);this.minX_=s[0],this.maxX_=s[2],this.minY_=s[1],this.maxY_=s[3],this.bottomLeft_=this.fromLonLatTransform_([this.minLon_,this.minLat_]),this.bottomRight_=this.fromLonLatTransform_([this.maxLon_,this.minLat_]),this.topLeft_=this.fromLonLatTransform_([this.minLon_,this.maxLat_]),this.topRight_=this.fromLonLatTransform_([this.maxLon_,this.maxLat_]),this.projectionCenterLonLat_=this.toLonLatTransform_((0,b.qg)(t.getExtent())),isNaN(this.projectionCenterLonLat_[1])&&(this.projectionCenterLonLat_[1]=Math.abs(this.maxLat_)>=Math.abs(this.minLat_)?this.maxLat_:this.minLat_),this.projection_=t}};var st=L(3298),nt=L(993),l=L(4537),ot=L(790),z=L(4230),T=L(6799),lt=L(408),rt=L(3307),ht=L(6506);let ct=(()=>{class f{constructor(e,n,i,s){this.layersSvc=e,this.mapStateSvc=n,this.mapOlSvc=i,this.mapThreeSvc=s,this.class="content-container",this.controls={attribution:!0,mousePosition:!0,scaleLine:!0,zoom:!0}}ngOnInit(){const e=new nt.Z({source:new st.Z({url:"https://planetarymaps.usgs.gov/cgi-bin/mapserv?map=/maps/mars/phobos_simp_cyl.map",params:{LAYERS:"VIKING"},crossOrigin:"anonymous"})}),n=new it({showLabels:!0,wrapX:!0,latLabelPosition:.5}),i=new C.AO({id:"phobos",name:"Phobos",custom_layer:e,description:"There are a few objects that are very big, but still irregularly shaped.\n      Because they are big, it makes sense to serve their image-material per WMTS instead of a single, humongous file.\n      Because they are irregularly shaped, it makes sense to display them in 3d.\n\n      This demo shows how we can project openlayers-layers onto a three-js mesh to reap the benefits of both libraries."}),s=new C.AO({id:"graticule",name:"Graticule",custom_layer:n,description:"Note how adding and removing this layer is reflected in both the map and the 3d-object."});this.layersSvc.addLayer(i),this.layersSvc.addLayer(s)}ngAfterViewInit(){const e=(0,E.U2)("EPSG:4326");this.mapOlSvc.setProjection(e),this.mapOlSvc.map.getView().setMaxZoom(4)}}return f.\u0275fac=function(e){return new(e||f)(l.Y36(C.KD),l.Y36(ot.I3),l.Y36(R.BR),l.Y36(z.qO))},f.\u0275cmp=l.Xpm({type:f,selectors:[["app-route-example-threejs"]],hostVars:2,hostBindings:function(e,n){2&e&&l.Tol(n.class)},features:[l._Bn([C.KD,R.BR])],decls:25,vars:10,consts:[[1,"content-area"],[2,"height","49.5%","width","100%"],["id","olMap",3,"layersSvc","mapState","controls"],[2,"height","50%","width","100%"],["id","threeMap",3,"mapOlSvc"],[1,"right",3,"clrVerticalNavCollapsible","clr-nav-level"],[1,"layers",3,"clrVerticalNavGroupExpanded"],["shape","info","clrVerticalNavIcon","","title","layers"],[1,"padding","title-ellipsis"],[1,"card",2,"margin","0px","margin-bottom","10px"],[1,"card-block"],[1,"card-text"],["shape","layers","clrVerticalNavIcon","","title","layers"],[1,"alert-item","static"],[1,"alert-text"],[3,"layersSvc","mapStateSvc"]],template:function(e,n){1&e&&(l.TgZ(0,"main",0)(1,"div",1),l._UZ(2,"ukis-map-ol",2),l.qZA(),l.TgZ(3,"div",3),l._UZ(4,"ukis-map-three",4),l.qZA()(),l.TgZ(5,"clr-vertical-nav",5)(6,"clr-vertical-nav-group",6),l._UZ(7,"clr-icon",7),l._uU(8," Phobos "),l.TgZ(9,"clr-vertical-nav-group-children",8)(10,"div",9)(11,"div",10)(12,"div",11)(13,"p"),l._uU(14," This is a threejs/openlayers demo application. Here, we project an openlayers map as a canvas-texture onto a glTF model of the Mars-moon Phobos. "),l.qZA(),l.TgZ(15,"p"),l._uU(16," There are some objects that are so irregular that they are better displayed with a three dimensional model, yet so large that their imagedata is best served per WMTS. Phobos is a good example of such an object. Note how the texture gets sharper when you zoom in: this is a new WMTS tile being loaded, projected and displayed on the fly. "),l.qZA()()()()()(),l.TgZ(17,"clr-vertical-nav-group",6),l._UZ(18,"clr-icon",12),l._uU(19," Layers "),l.TgZ(20,"clr-vertical-nav-group-children",8)(21,"div",13)(22,"span",14),l._uU(23," The controls of map and 3d-object are synced. Use the mouse to pan around in either and watch both displays change. "),l.qZA()(),l._UZ(24,"ukis-layer-control",15),l.qZA()()()),2&e&&(l.xp6(2),l.Q6J("layersSvc",n.layersSvc)("mapState",n.mapStateSvc)("controls",n.controls),l.xp6(2),l.Q6J("mapOlSvc",n.mapOlSvc),l.xp6(1),l.Q6J("clrVerticalNavCollapsible",!0)("clr-nav-level",2),l.xp6(1),l.Q6J("clrVerticalNavGroupExpanded",!0),l.xp6(11),l.Q6J("clrVerticalNavGroupExpanded",!0),l.xp6(7),l.Q6J("layersSvc",n.layersSvc)("mapStateSvc",n.mapStateSvc))},dependencies:[T.I9z,T.qvL,T.saT,T.fzC,T.A0B,T.d6G,T.ogR,lt.E,rt.j,ht.X]}),f})();var mt=L(5508);const dt=[{path:"",component:ct}];let O=(()=>{class f{}return f.\u0275fac=function(e){return new(e||f)},f.\u0275mod=l.oAB({type:f}),f.\u0275inj=l.cJS({imports:[B.Bz.forChild(dt),B.Bz]}),f})(),Lt=(()=>{class f{}return f.\u0275fac=function(e){return new(e||f)},f.\u0275mod=l.oAB({type:f}),f.\u0275inj=l.cJS({imports:[U.ez,V.q,O,T.K6A,mt.cE,R.oC,z.fB]}),f})()}}]);