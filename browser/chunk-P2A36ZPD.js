import{$ as tt,A as Ze,B as R,C as Xe,D as ne,E as We,F as k,G as ke,L as He,M as ie,N as Ve,O as Ye,U as Ke,V as oe,W as se,X as qe,Y as Je,Z as Qe,_ as et,a as Ie,aa as h,b as Le,ba as rt,c as Ue,ca as H,da as V,e as N,f as Ne,ga as nt,h as E,i as Me,j as W,k as Oe,l as F,m as re,o as Be,q as Ge,r as $e,t as je,ta as M,z as ze}from"./chunk-OTRZYAA2.js";import{a as we,b as De,e as Lt,f as Ut}from"./chunk-FJYW2LMB.js";var Rt=Lt((Xr,Ee)=>{"use strict";Ee.exports=J;Ee.exports.default=J;function J(r,e,t){t=t||2;var n=e&&e.length,i=n?e[0]*t:r.length,o=Et(r,0,i,t,!0),s=[];if(!o||o.next===o.prev)return s;var a,l,u,x,c,f,v;if(n&&(o=kt(r,e,o,t)),r.length>80*t){a=u=r[0],l=x=r[1];for(var p=t;p<i;p+=t)c=r[p],f=r[p+1],c<a&&(a=c),f<l&&(l=f),c>u&&(u=c),f>x&&(x=f);v=Math.max(u-a,x-l),v=v!==0?32767/v:0}return j(o,s,t,a,l,v,0),s}function Et(r,e,t,n,i){var o,s;if(i===ve(r,e,t,n)>0)for(o=e;o<t;o+=n)s=vt(o,r[o],r[o+1],s);else for(o=t-n;o>=e;o-=n)s=vt(o,r[o],r[o+1],s);return s&&Q(s,s.next)&&(Z(s),s=s.next),s}function w(r,e){if(!r)return r;e||(e=r);var t=r,n;do if(n=!1,!t.steiner&&(Q(t,t.next)||m(t.prev,t,t.next)===0)){if(Z(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function j(r,e,t,n,i,o,s){if(r){!s&&o&&qt(r,n,i,o);for(var a=r,l,u;r.prev!==r.next;){if(l=r.prev,u=r.next,o?Zt(r,n,i,o):zt(r)){e.push(l.i/t|0),e.push(r.i/t|0),e.push(u.i/t|0),Z(r),r=u.next,a=u.next;continue}if(r=u,r===a){s?s===1?(r=Xt(w(r),e,t),j(r,e,t,n,i,o,2)):s===2&&Wt(r,e,t,n,i,o):j(w(r),e,t,n,i,o,1);break}}}}function zt(r){var e=r.prev,t=r,n=r.next;if(m(e,t,n)>=0)return!1;for(var i=e.x,o=t.x,s=n.x,a=e.y,l=t.y,u=n.y,x=i<o?i<s?i:s:o<s?o:s,c=a<l?a<u?a:u:l<u?l:u,f=i>o?i>s?i:s:o>s?o:s,v=a>l?a>u?a:u:l>u?l:u,p=n.next;p!==e;){if(p.x>=x&&p.x<=f&&p.y>=c&&p.y<=v&&D(i,a,o,l,s,u,p.x,p.y)&&m(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Zt(r,e,t,n){var i=r.prev,o=r,s=r.next;if(m(i,o,s)>=0)return!1;for(var a=i.x,l=o.x,u=s.x,x=i.y,c=o.y,f=s.y,v=a<l?a<u?a:u:l<u?l:u,p=x<c?x<f?x:f:c<f?c:f,A=a>l?a>u?a:u:l>u?l:u,U=x>c?x>f?x:f:c>f?c:f,Ae=ge(v,p,e,t,n),Fe=ge(A,U,e,t,n),_=r.prevZ,g=r.nextZ;_&&_.z>=Ae&&g&&g.z<=Fe;){if(_.x>=v&&_.x<=A&&_.y>=p&&_.y<=U&&_!==i&&_!==s&&D(a,x,l,c,u,f,_.x,_.y)&&m(_.prev,_,_.next)>=0||(_=_.prevZ,g.x>=v&&g.x<=A&&g.y>=p&&g.y<=U&&g!==i&&g!==s&&D(a,x,l,c,u,f,g.x,g.y)&&m(g.prev,g,g.next)>=0))return!1;g=g.nextZ}for(;_&&_.z>=Ae;){if(_.x>=v&&_.x<=A&&_.y>=p&&_.y<=U&&_!==i&&_!==s&&D(a,x,l,c,u,f,_.x,_.y)&&m(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;g&&g.z<=Fe;){if(g.x>=v&&g.x<=A&&g.y>=p&&g.y<=U&&g!==i&&g!==s&&D(a,x,l,c,u,f,g.x,g.y)&&m(g.prev,g,g.next)>=0)return!1;g=g.nextZ}return!0}function Xt(r,e,t){var n=r;do{var i=n.prev,o=n.next.next;!Q(i,o)&&Tt(i,n,n.next,o)&&z(i,o)&&z(o,i)&&(e.push(i.i/t|0),e.push(n.i/t|0),e.push(o.i/t|0),Z(n),Z(n.next),n=r=o),n=n.next}while(n!==r);return w(n)}function Wt(r,e,t,n,i,o){var s=r;do{for(var a=s.next.next;a!==s.prev;){if(s.i!==a.i&&er(s,a)){var l=yt(s,a);s=w(s,s.next),l=w(l,l.next),j(s,e,t,n,i,o,0),j(l,e,t,n,i,o,0);return}a=a.next}s=s.next}while(s!==r)}function kt(r,e,t,n){var i=[],o,s,a,l,u;for(o=0,s=e.length;o<s;o++)a=e[o]*n,l=o<s-1?e[o+1]*n:r.length,u=Et(r,a,l,n,!1),u===u.next&&(u.steiner=!0),i.push(Qt(u));for(i.sort(Ht),o=0;o<i.length;o++)t=Vt(i[o],t);return t}function Ht(r,e){return r.x-e.x}function Vt(r,e){var t=Yt(r,e);if(!t)return e;var n=yt(t,r);return w(n,n.next),w(t,t.next)}function Yt(r,e){var t=e,n=r.x,i=r.y,o=-1/0,s;do{if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){var a=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(a<=n&&a>o&&(o=a,s=t.x<t.next.x?t:t.next,a===n))return s}t=t.next}while(t!==e);if(!s)return null;var l=s,u=s.x,x=s.y,c=1/0,f;t=s;do n>=t.x&&t.x>=u&&n!==t.x&&D(i<x?n:o,i,u,x,i<x?o:n,i,t.x,t.y)&&(f=Math.abs(i-t.y)/(n-t.x),z(t,r)&&(f<c||f===c&&(t.x>s.x||t.x===s.x&&Kt(s,t)))&&(s=t,c=f)),t=t.next;while(t!==l);return s}function Kt(r,e){return m(r.prev,r,e.prev)<0&&m(e.next,r,r.next)<0}function qt(r,e,t,n){var i=r;do i.z===0&&(i.z=ge(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,Jt(i)}function Jt(r){var e,t,n,i,o,s,a,l,u=1;do{for(t=r,r=null,o=null,s=0;t;){for(s++,n=t,a=0,e=0;e<u&&(a++,n=n.nextZ,!!n);e++);for(l=u;a>0||l>0&&n;)a!==0&&(l===0||!n||t.z<=n.z)?(i=t,t=t.nextZ,a--):(i=n,n=n.nextZ,l--),o?o.nextZ=i:r=i,i.prevZ=o,o=i;t=n}o.nextZ=null,u*=2}while(s>1);return r}function ge(r,e,t,n,i){return r=(r-t)*i|0,e=(e-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function Qt(r){var e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function D(r,e,t,n,i,o,s,a){return(i-s)*(e-a)>=(r-s)*(o-a)&&(r-s)*(n-a)>=(t-s)*(e-a)&&(t-s)*(o-a)>=(i-s)*(n-a)}function er(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!tr(r,e)&&(z(r,e)&&z(e,r)&&rr(r,e)&&(m(r.prev,r,e.prev)||m(r,e.prev,e))||Q(r,e)&&m(r.prev,r,r.next)>0&&m(e.prev,e,e.next)>0)}function m(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function Q(r,e){return r.x===e.x&&r.y===e.y}function Tt(r,e,t,n){var i=q(m(r,e,t)),o=q(m(r,e,n)),s=q(m(t,n,r)),a=q(m(t,n,e));return!!(i!==o&&s!==a||i===0&&K(r,t,e)||o===0&&K(r,n,e)||s===0&&K(t,r,n)||a===0&&K(t,e,n))}function K(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function q(r){return r>0?1:r<0?-1:0}function tr(r,e){var t=r;do{if(t.i!==r.i&&t.next.i!==r.i&&t.i!==e.i&&t.next.i!==e.i&&Tt(t,t.next,r,e))return!0;t=t.next}while(t!==r);return!1}function z(r,e){return m(r.prev,r,r.next)<0?m(r,e,r.next)>=0&&m(r,r.prev,e)>=0:m(r,e,r.prev)<0||m(r,r.next,e)<0}function rr(r,e){var t=r,n=!1,i=(r.x+e.x)/2,o=(r.y+e.y)/2;do t.y>o!=t.next.y>o&&t.next.y!==t.y&&i<(t.next.x-t.x)*(o-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==r);return n}function yt(r,e){var t=new me(r.i,r.x,r.y),n=new me(e.i,e.x,e.y),i=r.next,o=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,o.next=n,n.prev=o,n}function vt(r,e,t,n){var i=new me(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Z(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function me(r,e,t){this.i=r,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}J.deviation=function(r,e,t,n){var i=e&&e.length,o=i?e[0]*t:r.length,s=Math.abs(ve(r,0,o,t));if(i)for(var a=0,l=e.length;a<l;a++){var u=e[a]*t,x=a<l-1?e[a+1]*t:r.length;s-=Math.abs(ve(r,u,x,t))}var c=0;for(a=0;a<n.length;a+=3){var f=n[a]*t,v=n[a+1]*t,p=n[a+2]*t;c+=Math.abs((r[f]-r[p])*(r[v+1]-r[f+1])-(r[f]-r[v])*(r[p+1]-r[f+1]))}return s===0&&c===0?0:Math.abs((c-s)/s)};function ve(r,e,t,n){for(var i=0,o=e,s=t-n;o<t;o+=n)i+=(r[s]-r[o])*(r[o+1]+r[s+1]),s=o;return i}J.flatten=function(r){for(var e=r[0][0].length,t={vertices:[],holes:[],dimensions:e},n=0,i=0;i<r.length;i++){for(var o=0;o<r[i].length;o++)for(var s=0;s<e;s++)t.vertices.push(r[i][o][s]);i>0&&(n+=r[i-1].length,t.holes.push(n))}return t}});var O=34962,B=34963,ot=35040,st=35044,G=35048,at=5121,lt=5123,ut=5125,ae=5126,it=["experimental-webgl","webgl","webkit-3d","moz-webgl"];function ct(r,e){e=Object.assign({preserveDrawingBuffer:!0,antialias:!Ve},e);let t=it.length;for(let n=0;n<t;++n)try{let i=r.getContext(it[n],e);if(i)return i}catch{}return null}var Nt={STATIC_DRAW:st,STREAM_DRAW:ot,DYNAMIC_DRAW:G},ue=class{constructor(e,t){this.array_=null,this.type_=e,W(e===O||e===B,"A `WebGLArrayBuffer` must either be of type `ELEMENT_ARRAY_BUFFER` or `ARRAY_BUFFER`"),this.usage_=t!==void 0?t:Nt.STATIC_DRAW}ofSize(e){return this.array_=new(le(this.type_))(e),this}fromArray(e){return this.array_=le(this.type_).from(e),this}fromArrayBuffer(e){return this.array_=new(le(this.type_))(e),this}getType(){return this.type_}getArray(){return this.array_}getUsage(){return this.usage_}getSize(){return this.array_?this.array_.length:0}};function le(r){switch(r){case O:return Float32Array;case B:return Uint32Array;default:return Float32Array}}var ce=ue;var $={LOST:"webglcontextlost",RESTORED:"webglcontextrestored"};var Mt=`
  precision mediump float;
  
  attribute vec2 a_position;
  varying vec2 v_texCoord;
  varying vec2 v_screenCoord;
  
  uniform vec2 u_screenSize;
   
  void main() {
    v_texCoord = a_position * 0.5 + 0.5;
    v_screenCoord = v_texCoord * u_screenSize;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`,Ot=`
  precision mediump float;
   
  uniform sampler2D u_image;
  uniform float u_opacity;
   
  varying vec2 v_texCoord;
   
  void main() {
    gl_FragColor = texture2D(u_image, v_texCoord) * u_opacity;
  }
`,he=class{constructor(e){this.gl_=e.webGlContext;let t=this.gl_;this.scaleRatio_=e.scaleRatio||1,this.renderTargetTexture_=t.createTexture(),this.renderTargetTextureSize_=null,this.frameBuffer_=t.createFramebuffer(),this.depthBuffer_=t.createRenderbuffer();let n=t.createShader(t.VERTEX_SHADER);t.shaderSource(n,e.vertexShader||Mt),t.compileShader(n);let i=t.createShader(t.FRAGMENT_SHADER);t.shaderSource(i,e.fragmentShader||Ot),t.compileShader(i),this.renderTargetProgram_=t.createProgram(),t.attachShader(this.renderTargetProgram_,n),t.attachShader(this.renderTargetProgram_,i),t.linkProgram(this.renderTargetProgram_),this.renderTargetVerticesBuffer_=t.createBuffer();let o=[-1,-1,1,-1,-1,1,1,-1,1,1,-1,1];t.bindBuffer(t.ARRAY_BUFFER,this.renderTargetVerticesBuffer_),t.bufferData(t.ARRAY_BUFFER,new Float32Array(o),t.STATIC_DRAW),this.renderTargetAttribLocation_=t.getAttribLocation(this.renderTargetProgram_,"a_position"),this.renderTargetUniformLocation_=t.getUniformLocation(this.renderTargetProgram_,"u_screenSize"),this.renderTargetOpacityLocation_=t.getUniformLocation(this.renderTargetProgram_,"u_opacity"),this.renderTargetTextureLocation_=t.getUniformLocation(this.renderTargetProgram_,"u_image"),this.uniforms_=[],e.uniforms&&Object.keys(e.uniforms).forEach(s=>{this.uniforms_.push({value:e.uniforms[s],location:t.getUniformLocation(this.renderTargetProgram_,s)})})}getGL(){return this.gl_}init(e){let t=this.getGL(),n=[t.drawingBufferWidth*this.scaleRatio_,t.drawingBufferHeight*this.scaleRatio_];if(t.bindFramebuffer(t.FRAMEBUFFER,this.getFrameBuffer()),t.bindRenderbuffer(t.RENDERBUFFER,this.getDepthBuffer()),t.viewport(0,0,n[0],n[1]),!this.renderTargetTextureSize_||this.renderTargetTextureSize_[0]!==n[0]||this.renderTargetTextureSize_[1]!==n[1]){this.renderTargetTextureSize_=n;let i=0,o=t.RGBA,s=0,a=t.RGBA,l=t.UNSIGNED_BYTE,u=null;t.bindTexture(t.TEXTURE_2D,this.renderTargetTexture_),t.texImage2D(t.TEXTURE_2D,i,o,n[0],n[1],s,a,l,u),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,this.renderTargetTexture_,0),t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_COMPONENT16,n[0],n[1]),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,this.depthBuffer_)}}apply(e,t,n,i){let o=this.getGL(),s=e.size;if(o.bindFramebuffer(o.FRAMEBUFFER,t?t.getFrameBuffer():null),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,this.renderTargetTexture_),!t){let l=E(o.canvas);if(!e.renderTargets[l]){let u=o.getContextAttributes();u&&u.preserveDrawingBuffer&&(o.clearColor(0,0,0,0),o.clearDepth(1),o.clear(o.COLOR_BUFFER_BIT|o.DEPTH_BUFFER_BIT)),e.renderTargets[l]=!0}}o.disable(o.DEPTH_TEST),o.enable(o.BLEND),o.blendFunc(o.ONE,o.ONE_MINUS_SRC_ALPHA),o.viewport(0,0,o.drawingBufferWidth,o.drawingBufferHeight),o.bindBuffer(o.ARRAY_BUFFER,this.renderTargetVerticesBuffer_),o.useProgram(this.renderTargetProgram_),o.enableVertexAttribArray(this.renderTargetAttribLocation_),o.vertexAttribPointer(this.renderTargetAttribLocation_,2,o.FLOAT,!1,0,0),o.uniform2f(this.renderTargetUniformLocation_,s[0],s[1]),o.uniform1i(this.renderTargetTextureLocation_,0);let a=e.layerStatesArray[e.layerIndex].opacity;o.uniform1f(this.renderTargetOpacityLocation_,a),this.applyUniforms(e),n&&n(o,e),o.drawArrays(o.TRIANGLES,0,6),i&&i(o,e)}getFrameBuffer(){return this.frameBuffer_}getDepthBuffer(){return this.depthBuffer_}applyUniforms(e){let t=this.getGL(),n,i=1;this.uniforms_.forEach(function(o){if(n=typeof o.value=="function"?o.value(e):o.value,n instanceof HTMLCanvasElement||n instanceof ImageData)o.texture||(o.texture=t.createTexture()),t.activeTexture(t[`TEXTURE${i}`]),t.bindTexture(t.TEXTURE_2D,o.texture),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),n instanceof ImageData?t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,n.width,n.height,0,t.UNSIGNED_BYTE,new Uint8Array(n.data)):t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,n),t.uniform1i(o.location,i++);else if(Array.isArray(n))switch(n.length){case 2:t.uniform2f(o.location,n[0],n[1]);return;case 3:t.uniform3f(o.location,n[0],n[1],n[2]);return;case 4:t.uniform4f(o.location,n[0],n[1],n[2],n[3]);return;default:return}else typeof n=="number"&&t.uniform1f(o.location,n)})}},fe=he;function ht(){return[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}function ft(r,e){return r[0]=e[0],r[1]=e[1],r[4]=e[2],r[5]=e[3],r[12]=e[4],r[13]=e[5],r}var P={PROJECTION_MATRIX:"u_projectionMatrix",SCREEN_TO_WORLD_MATRIX:"u_screenToWorldMatrix",TIME:"u_time",ZOOM:"u_zoom",RESOLUTION:"u_resolution",ROTATION:"u_rotation",VIEWPORT_SIZE_PX:"u_viewportSizePx",PIXEL_RATIO:"u_pixelRatio",HIT_DETECTION:"u_hitDetection"},T={UNSIGNED_BYTE:at,UNSIGNED_SHORT:lt,UNSIGNED_INT:ut,FLOAT:ae},Y={};function pt(r){return"shared/"+r}var xt=0;function Bt(){let r="unique/"+xt;return xt+=1,r}function Gt(r){let e=Y[r];if(!e){let t=document.createElement("canvas");t.width=1,t.height=1,t.style.position="absolute",t.style.left="0",e={users:0,context:ct(t)},Y[r]=e}return e.users+=1,e.context}function $t(r){let e=Y[r];if(!e||(e.users-=1,e.users>0))return;let t=e.context,n=t.getExtension("WEBGL_lose_context");n&&n.loseContext();let i=t.canvas;i.width=1,i.height=1,delete Y[r]}var pe=class extends Ie{constructor(e){super(),e=e||{},this.boundHandleWebGLContextLost_=this.handleWebGLContextLost.bind(this),this.boundHandleWebGLContextRestored_=this.handleWebGLContextRestored.bind(this),this.canvasCacheKey_=e.canvasCacheKey?pt(e.canvasCacheKey):Bt(),this.gl_=Gt(this.canvasCacheKey_),this.bufferCache_={},this.extensionCache_={},this.currentProgram_=null,this.needsToBeRecreated_=!1;let t=this.gl_.canvas;t.addEventListener($.LOST,this.boundHandleWebGLContextLost_),t.addEventListener($.RESTORED,this.boundHandleWebGLContextRestored_),this.offsetRotateMatrix_=R(),this.offsetScaleMatrix_=R(),this.tmpMat4_=ht(),this.uniformLocationsByProgram_={},this.attribLocationsByProgram_={},this.uniforms_=[],e.uniforms&&this.setUniforms(e.uniforms),this.postProcessPasses_=e.postProcesses?e.postProcesses.map(n=>new fe({webGlContext:this.gl_,scaleRatio:n.scaleRatio,vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,uniforms:n.uniforms})):[new fe({webGlContext:this.gl_})],this.shaderCompileErrors_=null,this.startTime_=Date.now()}setUniforms(e){this.uniforms_=[],this.addUniforms(e)}addUniforms(e){for(let t in e)this.uniforms_.push({name:t,value:e[t]})}canvasCacheKeyMatches(e){return this.canvasCacheKey_===pt(e)}getExtension(e){if(e in this.extensionCache_)return this.extensionCache_[e];let t=this.gl_.getExtension(e);return this.extensionCache_[e]=t,t}bindBuffer(e){let t=this.gl_,n=E(e),i=this.bufferCache_[n];if(!i){let o=t.createBuffer();i={buffer:e,webGlBuffer:o},this.bufferCache_[n]=i}t.bindBuffer(e.getType(),i.webGlBuffer)}flushBufferData(e){let t=this.gl_;this.bindBuffer(e),t.bufferData(e.getType(),e.getArray(),e.getUsage())}deleteBuffer(e){let t=this.gl_,n=E(e),i=this.bufferCache_[n];i&&!t.isContextLost()&&t.deleteBuffer(i.webGlBuffer),delete this.bufferCache_[n]}disposeInternal(){let e=this.gl_.canvas;e.removeEventListener($.LOST,this.boundHandleWebGLContextLost_),e.removeEventListener($.RESTORED,this.boundHandleWebGLContextRestored_),$t(this.canvasCacheKey_),delete this.gl_}prepareDraw(e,t,n){let i=this.gl_,o=this.getCanvas(),s=e.size,a=e.pixelRatio;(o.width!==s[0]*a||o.height!==s[1]*a)&&(o.width=s[0]*a,o.height=s[1]*a,o.style.width=s[0]+"px",o.style.height=s[1]+"px");for(let l=this.postProcessPasses_.length-1;l>=0;l--)this.postProcessPasses_[l].init(e);i.bindTexture(i.TEXTURE_2D,null),i.clearColor(0,0,0,0),i.depthRange(0,1),i.clearDepth(1),i.clear(i.COLOR_BUFFER_BIT|i.DEPTH_BUFFER_BIT),i.enable(i.BLEND),i.blendFunc(i.ONE,t?i.ZERO:i.ONE_MINUS_SRC_ALPHA),n?(i.enable(i.DEPTH_TEST),i.depthFunc(i.LEQUAL)):i.disable(i.DEPTH_TEST)}bindTexture(e,t,n){let i=this.gl_;i.activeTexture(i.TEXTURE0+t),i.bindTexture(i.TEXTURE_2D,e),i.uniform1i(this.getUniformLocation(n),t)}prepareDrawToRenderTarget(e,t,n,i){let o=this.gl_,s=t.getSize();o.bindFramebuffer(o.FRAMEBUFFER,t.getFramebuffer()),o.bindRenderbuffer(o.RENDERBUFFER,t.getDepthbuffer()),o.viewport(0,0,s[0],s[1]),o.bindTexture(o.TEXTURE_2D,t.getTexture()),o.clearColor(0,0,0,0),o.depthRange(0,1),o.clearDepth(1),o.clear(o.COLOR_BUFFER_BIT|o.DEPTH_BUFFER_BIT),o.enable(o.BLEND),o.blendFunc(o.ONE,n?o.ZERO:o.ONE_MINUS_SRC_ALPHA),i?(o.enable(o.DEPTH_TEST),o.depthFunc(o.LEQUAL)):o.disable(o.DEPTH_TEST)}drawElements(e,t){let n=this.gl_;this.getExtension("OES_element_index_uint");let i=n.UNSIGNED_INT,o=4,s=t-e,a=e*o;n.drawElements(n.TRIANGLES,s,i,a)}finalizeDraw(e,t,n){for(let i=0,o=this.postProcessPasses_.length;i<o;i++)i===o-1?this.postProcessPasses_[i].apply(e,null,t,n):this.postProcessPasses_[i].apply(e,this.postProcessPasses_[i+1])}getCanvas(){return this.gl_.canvas}getGL(){return this.gl_}applyFrameState(e){let t=e.size,n=e.viewState.rotation,i=e.pixelRatio;this.setUniformFloatValue(P.TIME,(Date.now()-this.startTime_)*.001),this.setUniformFloatValue(P.ZOOM,e.viewState.zoom),this.setUniformFloatValue(P.RESOLUTION,e.viewState.resolution),this.setUniformFloatValue(P.PIXEL_RATIO,i),this.setUniformFloatVec2(P.VIEWPORT_SIZE_PX,[t[0],t[1]]),this.setUniformFloatValue(P.ROTATION,n)}applyHitDetectionUniform(e){let t=this.getUniformLocation(P.HIT_DETECTION);this.getGL().uniform1i(t,e?1:0),e&&this.setUniformFloatValue(P.PIXEL_RATIO,.5)}applyUniforms(e){let t=this.gl_,n,i=0;this.uniforms_.forEach(o=>{if(n=typeof o.value=="function"?o.value(e):o.value,n instanceof HTMLCanvasElement||n instanceof HTMLImageElement||n instanceof ImageData||n instanceof WebGLTexture){n instanceof WebGLTexture&&!o.texture?(o.prevValue=void 0,o.texture=n):o.texture||(o.prevValue=void 0,o.texture=t.createTexture()),this.bindTexture(o.texture,i,o.name),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);let s=!(n instanceof HTMLImageElement)||n.complete;!(n instanceof WebGLTexture)&&s&&o.prevValue!==n&&(o.prevValue=n,t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,n)),i++}else if(Array.isArray(n)&&n.length===6)this.setUniformMatrixValue(o.name,ft(this.tmpMat4_,n));else if(Array.isArray(n)&&n.length<=4)switch(n.length){case 2:t.uniform2f(this.getUniformLocation(o.name),n[0],n[1]);return;case 3:t.uniform3f(this.getUniformLocation(o.name),n[0],n[1],n[2]);return;case 4:t.uniform4f(this.getUniformLocation(o.name),n[0],n[1],n[2],n[3]);return;default:return}else typeof n=="number"&&t.uniform1f(this.getUniformLocation(o.name),n)})}useProgram(e,t){this.gl_.useProgram(e),this.currentProgram_=e,this.applyFrameState(t),this.applyUniforms(t)}compileShader(e,t){let n=this.gl_,i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}getProgram(e,t){let n=this.gl_,i=this.compileShader(e,n.FRAGMENT_SHADER),o=this.compileShader(t,n.VERTEX_SHADER),s=n.createProgram();if(n.attachShader(s,i),n.attachShader(s,o),n.linkProgram(s),!n.getShaderParameter(i,n.COMPILE_STATUS)){let a=`Fragment shader compilation failed: ${n.getShaderInfoLog(i)}`;throw new Error(a)}if(n.deleteShader(i),!n.getShaderParameter(o,n.COMPILE_STATUS)){let a=`Vertex shader compilation failed: ${n.getShaderInfoLog(o)}`;throw new Error(a)}if(n.deleteShader(o),!n.getProgramParameter(s,n.LINK_STATUS)){let a=`GL program linking failed: ${n.getProgramInfoLog(s)}`;throw new Error(a)}return s}getUniformLocation(e){let t=E(this.currentProgram_);return this.uniformLocationsByProgram_[t]===void 0&&(this.uniformLocationsByProgram_[t]={}),this.uniformLocationsByProgram_[t][e]===void 0&&(this.uniformLocationsByProgram_[t][e]=this.gl_.getUniformLocation(this.currentProgram_,e)),this.uniformLocationsByProgram_[t][e]}getAttributeLocation(e){let t=E(this.currentProgram_);return this.attribLocationsByProgram_[t]===void 0&&(this.attribLocationsByProgram_[t]={}),this.attribLocationsByProgram_[t][e]===void 0&&(this.attribLocationsByProgram_[t][e]=this.gl_.getAttribLocation(this.currentProgram_,e)),this.attribLocationsByProgram_[t][e]}makeProjectionTransform(e,t){let n=e.size,i=e.viewState.rotation,o=e.viewState.resolution,s=e.viewState.center;return k(t,0,0,2/(o*n[0]),2/(o*n[1]),-i,-s[0],-s[1]),t}setUniformFloatValue(e,t){this.gl_.uniform1f(this.getUniformLocation(e),t)}setUniformFloatVec2(e,t){this.gl_.uniform2fv(this.getUniformLocation(e),t)}setUniformFloatVec4(e,t){this.gl_.uniform4fv(this.getUniformLocation(e),t)}setUniformMatrixValue(e,t){this.gl_.uniformMatrix4fv(this.getUniformLocation(e),!1,t)}enableAttributeArray_(e,t,n,i,o){let s=this.getAttributeLocation(e);s<0||(this.gl_.enableVertexAttribArray(s),this.gl_.vertexAttribPointer(s,t,n,!1,i,o))}enableAttributes(e){let t=jt(e),n=0;for(let i=0;i<e.length;i++){let o=e[i];this.enableAttributeArray_(o.name,o.size,o.type||ae,t,n),n+=o.size*dt(o.type)}}handleWebGLContextLost(e){Ue(this.bufferCache_),this.currentProgram_=null,e.preventDefault()}handleWebGLContextRestored(){this.needsToBeRecreated_=!0}needsToBeRecreated(){return this.needsToBeRecreated_}createTexture(e,t,n){let i=this.gl_;n=n||i.createTexture();let o=0,s=i.RGBA,a=0,l=i.RGBA,u=i.UNSIGNED_BYTE;return i.bindTexture(i.TEXTURE_2D,n),t?i.texImage2D(i.TEXTURE_2D,o,s,l,u,t):i.texImage2D(i.TEXTURE_2D,o,s,e[0],e[1],a,l,u,null),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),n}};function jt(r){let e=0;for(let t=0;t<r.length;t++){let n=r[t];e+=n.size*dt(n.type)}return e}function dt(r){switch(r){case T.UNSIGNED_BYTE:return Uint8Array.BYTES_PER_ELEMENT;case T.UNSIGNED_SHORT:return Uint16Array.BYTES_PER_ELEMENT;case T.UNSIGNED_INT:return Uint32Array.BYTES_PER_ELEMENT;case T.FLOAT:default:return Float32Array.BYTES_PER_ELEMENT}}var _t=pe;var xe=class r extends nt{constructor(e,t){super(e),t=t||{},this.inversePixelTransform_=R(),this.pixelContext_=null,this.postProcesses_=t.postProcesses,this.uniforms_=t.uniforms,this.helper,e.addChangeListener(Me.MAP,this.removeHelper.bind(this)),this.dispatchPreComposeEvent=this.dispatchPreComposeEvent.bind(this),this.dispatchPostComposeEvent=this.dispatchPostComposeEvent.bind(this)}dispatchPreComposeEvent(e,t){let n=this.getLayer();if(n.hasListener(F.PRECOMPOSE)){let i=new V(F.PRECOMPOSE,void 0,t,e);n.dispatchEvent(i)}}dispatchPostComposeEvent(e,t){let n=this.getLayer();if(n.hasListener(F.POSTCOMPOSE)){let i=new V(F.POSTCOMPOSE,void 0,t,e);n.dispatchEvent(i)}}reset(e){this.uniforms_=e.uniforms,this.helper&&this.helper.setUniforms(this.uniforms_)}removeHelper(){this.helper&&(this.helper.dispose(),delete this.helper)}prepareFrame(e){if(this.getLayer().getRenderSource()){let t=!0,n=-1,i;for(let s=0,a=e.layerStatesArray.length;s<a;s++){let l=e.layerStatesArray[s].layer,u=l.getRenderer();if(!(u instanceof r)){t=!0;continue}let x=l.getClassName();if((t||x!==i)&&(n+=1,t=!1),i=x,u===this)break}let o="map/"+e.mapId+"/group/"+n;(!this.helper||!this.helper.canvasCacheKeyMatches(o)||this.helper.needsToBeRecreated())&&(this.removeHelper(),this.helper=new _t({postProcesses:this.postProcesses_,uniforms:this.uniforms_,canvasCacheKey:o}),i&&(this.helper.getCanvas().className=i),this.afterHelperCreated())}return this.prepareFrameInternal(e)}afterHelperCreated(){}prepareFrameInternal(e){return!0}disposeInternal(){this.removeHelper(),super.disposeInternal()}dispatchRenderEvent_(e,t,n){let i=this.getLayer();if(i.hasListener(e)){k(this.inversePixelTransform_,0,0,n.pixelRatio,-n.pixelRatio,0,0,-n.size[1]);let o=new V(e,this.inversePixelTransform_,n,t);i.dispatchEvent(o)}}preRender(e,t){this.dispatchRenderEvent_(F.PRERENDER,e,t)}postRender(e,t){this.dispatchRenderEvent_(F.POSTRENDER,e,t)}},gt=xe;var b=new Uint8Array(4),de=class{constructor(e,t){this.helper_=e;let n=e.getGL();this.texture_=n.createTexture(),this.framebuffer_=n.createFramebuffer(),this.depthbuffer_=n.createRenderbuffer(),this.size_=t||[1,1],this.data_=new Uint8Array(0),this.dataCacheDirty_=!0,this.updateSize_()}setSize(e){Le(e,this.size_)||(this.size_[0]=e[0],this.size_[1]=e[1],this.updateSize_())}getSize(){return this.size_}clearCachedData(){this.dataCacheDirty_=!0}readAll(){if(this.dataCacheDirty_){let e=this.size_,t=this.helper_.getGL();t.bindFramebuffer(t.FRAMEBUFFER,this.framebuffer_),t.readPixels(0,0,e[0],e[1],t.RGBA,t.UNSIGNED_BYTE,this.data_),this.dataCacheDirty_=!1}return this.data_}readPixel(e,t){if(e<0||t<0||e>this.size_[0]||t>=this.size_[1])return b[0]=0,b[1]=0,b[2]=0,b[3]=0,b;this.readAll();let n=Math.floor(e)+(this.size_[1]-Math.floor(t)-1)*this.size_[0];return b[0]=this.data_[n*4],b[1]=this.data_[n*4+1],b[2]=this.data_[n*4+2],b[3]=this.data_[n*4+3],b}getTexture(){return this.texture_}getFramebuffer(){return this.framebuffer_}getDepthbuffer(){return this.depthbuffer_}updateSize_(){let e=this.size_,t=this.helper_.getGL();this.texture_=this.helper_.createTexture(e,null,this.texture_),t.bindFramebuffer(t.FRAMEBUFFER,this.framebuffer_),t.viewport(0,0,e[0],e[1]),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,this.texture_,0),t.bindRenderbuffer(t.RENDERBUFFER,this.depthbuffer_),t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_COMPONENT16,e[0],e[1]),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,this.depthbuffer_),this.data_=new Uint8Array(e[0]*e[1]*4)}},mt=de;var _e={GENERATE_POLYGON_BUFFERS:"GENERATE_POLYGON_BUFFERS",GENERATE_POINT_BUFFERS:"GENERATE_POINT_BUFFERS",GENERATE_LINE_STRING_BUFFERS:"GENERATE_LINE_STRING_BUFFERS"};var nr=Ut(Rt(),1);var Te=.985;function Pt(r,e){e=e||[];let t=256,n=t-1;return e[0]=Math.floor(r/t/t/t)/n,e[1]=Math.floor(r/t/t)%t/n,e[2]=Math.floor(r/t)%t/n,e[3]=r%t/n,e}function bt(r){let e=0,t=256,n=t-1;return e+=Math.round(r[0]*t*t*t*n),e+=Math.round(r[1]*t*t*n),e+=Math.round(r[2]*t*n),e+=Math.round(r[3]*n),e}function Ct(){let r='const e="GENERATE_POLYGON_BUFFERS",t="GENERATE_POINT_BUFFERS",n="GENERATE_LINE_STRING_BUFFERS";function r(e,t){const n=t[0],r=t[1];return t[0]=e[0]*n+e[2]*r+e[4],t[1]=e[1]*n+e[3]*r+e[5],t}function x(e,t){const n=(r=t)[0]*r[3]-r[1]*r[2];var r;!function(e,t){if(!e)throw new Error(t)}(0!==n,"Transformation matrix cannot be inverted");const x=t[0],i=t[1],u=t[2],o=t[3],f=t[4],s=t[5];return e[0]=o/n,e[1]=-i/n,e[2]=-u/n,e[3]=x/n,e[4]=(u*s-o*f)/n,e[5]=-(x*s-i*f)/n,e}function i(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}new Array(6);var u={exports:{}};function o(e,t,n){n=n||2;var r,x,i,u,o,s,l,v=t&&t.length,h=v?t[0]*n:e.length,c=f(e,0,h,n,!0),g=[];if(!c||c.next===c.prev)return g;if(v&&(c=function(e,t,n,r){var x,i,u,o=[];for(x=0,i=t.length;x<i;x++)(u=f(e,t[x]*r,x<i-1?t[x+1]*r:e.length,r,!1))===u.next&&(u.steiner=!0),o.push(d(u));for(o.sort(p),x=0;x<o.length;x++)n=y(o[x],n);return n}(e,t,c,n)),e.length>80*n){r=i=e[0],x=u=e[1];for(var b=n;b<h;b+=n)(o=e[b])<r&&(r=o),(s=e[b+1])<x&&(x=s),o>i&&(i=o),s>u&&(u=s);l=0!==(l=Math.max(i-r,u-x))?32767/l:0}return a(c,g,n,r,x,l,0),g}function f(e,t,n,r,x){var i,u;if(x===O(e,t,n,r)>0)for(i=t;i<n;i+=r)u=P(i,e[i],e[i+1],u);else for(i=n-r;i>=t;i-=r)u=P(i,e[i],e[i+1],u);return u&&m(u,u.next)&&(B(u),u=u.next),u}function s(e,t){if(!e)return e;t||(t=e);var n,r=e;do{if(n=!1,r.steiner||!m(r,r.next)&&0!==w(r.prev,r,r.next))r=r.next;else{if(B(r),(r=t=r.prev)===r.next)break;n=!0}}while(n||r!==t);return t}function a(e,t,n,r,x,i,u){if(e){!u&&i&&function(e,t,n,r){var x=e;do{0===x.z&&(x.z=b(x.x,x.y,t,n,r)),x.prevZ=x.prev,x.nextZ=x.next,x=x.next}while(x!==e);x.prevZ.nextZ=null,x.prevZ=null,function(e){var t,n,r,x,i,u,o,f,s=1;do{for(n=e,e=null,i=null,u=0;n;){for(u++,r=n,o=0,t=0;t<s&&(o++,r=r.nextZ);t++);for(f=s;o>0||f>0&&r;)0!==o&&(0===f||!r||n.z<=r.z)?(x=n,n=n.nextZ,o--):(x=r,r=r.nextZ,f--),i?i.nextZ=x:e=x,x.prevZ=i,i=x;n=r}i.nextZ=null,s*=2}while(u>1)}(x)}(e,r,x,i);for(var o,f,p=e;e.prev!==e.next;)if(o=e.prev,f=e.next,i?v(e,r,x,i):l(e))t.push(o.i/n|0),t.push(e.i/n|0),t.push(f.i/n|0),B(e),e=f.next,p=f.next;else if((e=f)===p){u?1===u?a(e=h(s(e),t,n),t,n,r,x,i,2):2===u&&c(e,t,n,r,x,i):a(s(e),t,n,r,x,i,1);break}}}function l(e){var t=e.prev,n=e,r=e.next;if(w(t,n,r)>=0)return!1;for(var x=t.x,i=n.x,u=r.x,o=t.y,f=n.y,s=r.y,a=x<i?x<u?x:u:i<u?i:u,l=o<f?o<s?o:s:f<s?f:s,v=x>i?x>u?x:u:i>u?i:u,h=o>f?o>s?o:s:f>s?f:s,c=r.next;c!==t;){if(c.x>=a&&c.x<=v&&c.y>=l&&c.y<=h&&M(x,o,i,f,u,s,c.x,c.y)&&w(c.prev,c,c.next)>=0)return!1;c=c.next}return!0}function v(e,t,n,r){var x=e.prev,i=e,u=e.next;if(w(x,i,u)>=0)return!1;for(var o=x.x,f=i.x,s=u.x,a=x.y,l=i.y,v=u.y,h=o<f?o<s?o:s:f<s?f:s,c=a<l?a<v?a:v:l<v?l:v,p=o>f?o>s?o:s:f>s?f:s,y=a>l?a>v?a:v:l>v?l:v,g=b(h,c,t,n,r),d=b(p,y,t,n,r),Z=e.prevZ,m=e.nextZ;Z&&Z.z>=g&&m&&m.z<=d;){if(Z.x>=h&&Z.x<=p&&Z.y>=c&&Z.y<=y&&Z!==x&&Z!==u&&M(o,a,f,l,s,v,Z.x,Z.y)&&w(Z.prev,Z,Z.next)>=0)return!1;if(Z=Z.prevZ,m.x>=h&&m.x<=p&&m.y>=c&&m.y<=y&&m!==x&&m!==u&&M(o,a,f,l,s,v,m.x,m.y)&&w(m.prev,m,m.next)>=0)return!1;m=m.nextZ}for(;Z&&Z.z>=g;){if(Z.x>=h&&Z.x<=p&&Z.y>=c&&Z.y<=y&&Z!==x&&Z!==u&&M(o,a,f,l,s,v,Z.x,Z.y)&&w(Z.prev,Z,Z.next)>=0)return!1;Z=Z.prevZ}for(;m&&m.z<=d;){if(m.x>=h&&m.x<=p&&m.y>=c&&m.y<=y&&m!==x&&m!==u&&M(o,a,f,l,s,v,m.x,m.y)&&w(m.prev,m,m.next)>=0)return!1;m=m.nextZ}return!0}function h(e,t,n){var r=e;do{var x=r.prev,i=r.next.next;!m(x,i)&&A(x,r,r.next,i)&&z(x,i)&&z(i,x)&&(t.push(x.i/n|0),t.push(r.i/n|0),t.push(i.i/n|0),B(r),B(r.next),r=e=i),r=r.next}while(r!==e);return s(r)}function c(e,t,n,r,x,i){var u=e;do{for(var o=u.next.next;o!==u.prev;){if(u.i!==o.i&&Z(u,o)){var f=F(u,o);return u=s(u,u.next),f=s(f,f.next),a(u,t,n,r,x,i,0),void a(f,t,n,r,x,i,0)}o=o.next}u=u.next}while(u!==e)}function p(e,t){return e.x-t.x}function y(e,t){var n=function(e,t){var n,r=t,x=e.x,i=e.y,u=-1/0;do{if(i<=r.y&&i>=r.next.y&&r.next.y!==r.y){var o=r.x+(i-r.y)*(r.next.x-r.x)/(r.next.y-r.y);if(o<=x&&o>u&&(u=o,n=r.x<r.next.x?r:r.next,o===x))return n}r=r.next}while(r!==t);if(!n)return null;var f,s=n,a=n.x,l=n.y,v=1/0;r=n;do{x>=r.x&&r.x>=a&&x!==r.x&&M(i<l?x:u,i,a,l,i<l?u:x,i,r.x,r.y)&&(f=Math.abs(i-r.y)/(x-r.x),z(r,e)&&(f<v||f===v&&(r.x>n.x||r.x===n.x&&g(n,r)))&&(n=r,v=f)),r=r.next}while(r!==s);return n}(e,t);if(!n)return t;var r=F(n,e);return s(r,r.next),s(n,n.next)}function g(e,t){return w(e.prev,e,t.prev)<0&&w(t.next,e,e.next)<0}function b(e,t,n,r,x){return(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-n)*x|0)|e<<8))|e<<4))|e<<2))|e<<1))|(t=1431655765&((t=858993459&((t=252645135&((t=16711935&((t=(t-r)*x|0)|t<<8))|t<<4))|t<<2))|t<<1))<<1}function d(e){var t=e,n=e;do{(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next}while(t!==e);return n}function M(e,t,n,r,x,i,u,o){return(x-u)*(t-o)>=(e-u)*(i-o)&&(e-u)*(r-o)>=(n-u)*(t-o)&&(n-u)*(i-o)>=(x-u)*(r-o)}function Z(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!function(e,t){var n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&A(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}(e,t)&&(z(e,t)&&z(t,e)&&function(e,t){var n=e,r=!1,x=(e.x+t.x)/2,i=(e.y+t.y)/2;do{n.y>i!=n.next.y>i&&n.next.y!==n.y&&x<(n.next.x-n.x)*(i-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next}while(n!==e);return r}(e,t)&&(w(e.prev,e,t.prev)||w(e,t.prev,t))||m(e,t)&&w(e.prev,e,e.next)>0&&w(t.prev,t,t.next)>0)}function w(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function m(e,t){return e.x===t.x&&e.y===t.y}function A(e,t,n,r){var x=I(w(e,t,n)),i=I(w(e,t,r)),u=I(w(n,r,e)),o=I(w(n,r,t));return x!==i&&u!==o||(!(0!==x||!E(e,n,t))||(!(0!==i||!E(e,r,t))||(!(0!==u||!E(n,e,r))||!(0!==o||!E(n,t,r)))))}function E(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function I(e){return e>0?1:e<0?-1:0}function z(e,t){return w(e.prev,e,e.next)<0?w(e,t,e.next)>=0&&w(e,e.prev,t)>=0:w(e,t,e.prev)<0||w(e,e.next,t)<0}function F(e,t){var n=new _(e.i,e.x,e.y),r=new _(t.i,t.x,t.y),x=e.next,i=t.prev;return e.next=t,t.prev=e,n.next=x,x.prev=n,r.next=n,n.prev=r,i.next=r,r.prev=i,r}function P(e,t,n,r){var x=new _(e,t,n);return r?(x.next=r.next,x.prev=r,r.next.prev=x,r.next=x):(x.prev=x,x.next=x),x}function B(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function _(e,t,n){this.i=e,this.x=t,this.y=n,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function O(e,t,n,r){for(var x=0,i=t,u=n-r;i<n;i+=r)x+=(e[u]-e[i])*(e[i+1]+e[u+1]),u=i;return x}u.exports=o,u.exports.default=o,o.deviation=function(e,t,n,r){var x=t&&t.length,i=x?t[0]*n:e.length,u=Math.abs(O(e,0,i,n));if(x)for(var o=0,f=t.length;o<f;o++){var s=t[o]*n,a=o<f-1?t[o+1]*n:e.length;u-=Math.abs(O(e,s,a,n))}var l=0;for(o=0;o<r.length;o+=3){var v=r[o]*n,h=r[o+1]*n,c=r[o+2]*n;l+=Math.abs((e[v]-e[c])*(e[h+1]-e[v+1])-(e[v]-e[h])*(e[c+1]-e[v+1]))}return 0===u&&0===l?0:Math.abs((l-u)/u)},o.flatten=function(e){for(var t=e[0][0].length,n={vertices:[],holes:[],dimensions:t},r=0,x=0;x<e.length;x++){for(var i=0;i<e[x].length;i++)for(var u=0;u<t;u++)n.vertices.push(e[x][i][u]);x>0&&(r+=e[x-1].length,n.holes.push(r))}return n};var N=i(u.exports);const R=[],S={vertexPosition:0,indexPosition:0};function T(e,t,n,r,x){e[t+0]=n,e[t+1]=r,e[t+2]=x}function U(e,t,n,r,x,i){const u=3+x,o=e[t+0],f=e[t+1],s=R;s.length=x;for(let n=0;n<s.length;n++)s[n]=e[t+2+n];let a=i?i.vertexPosition:0,l=i?i.indexPosition:0;const v=a/u;return T(n,a,o,f,0),s.length&&n.set(s,a+3),a+=u,T(n,a,o,f,1),s.length&&n.set(s,a+3),a+=u,T(n,a,o,f,2),s.length&&n.set(s,a+3),a+=u,T(n,a,o,f,3),s.length&&n.set(s,a+3),a+=u,r[l++]=v,r[l++]=v+1,r[l++]=v+3,r[l++]=v+1,r[l++]=v+2,r[l++]=v+3,S.vertexPosition=a,S.indexPosition=l,S}function k(e,t,n,x,i,u,o,f,s,a,l){const v=8+f.length,h=u.length/v,c=[e[t+0],e[t+1]],p=[e[n],e[n+1]],y=r(s,[...c]),g=r(s,[...p]);function b(e,t,n){const r=Math.sqrt((t[0]-e[0])*(t[0]-e[0])+(t[1]-e[1])*(t[1]-e[1])),x=[(t[0]-e[0])/r,(t[1]-e[1])/r],i=[-x[1],x[0]],u=Math.sqrt((n[0]-e[0])*(n[0]-e[0])+(n[1]-e[1])*(n[1]-e[1])),o=[(n[0]-e[0])/u,(n[1]-e[1])/u],f=0===r||0===u?0:Math.acos((s=o[0]*x[0]+o[1]*x[1],a=-1,l=1,Math.min(Math.max(s,a),l)));var s,a,l;return o[0]*i[0]+o[1]*i[1]>0?f:2*Math.PI-f}let d=-1,M=-1,Z=l;const w=null!==i;if(null!==x){d=b(y,g,r(s,[...[e[x],e[x+1]]])),Math.cos(d)<=.985&&(Z+=Math.tan((d-Math.PI)/2))}if(w){M=b(g,y,r(s,[...[e[i],e[i+1]]])),Math.cos(M)<=.985&&(Z+=Math.tan((Math.PI-M)/2))}function m(e,t){return 0===t?1e4*e:Math.sign(t)*(1e4*e+Math.abs(t))}return u.push(c[0],c[1],p[0],p[1],d,M,a,m(0,l)),u.push(...f),u.push(c[0],c[1],p[0],p[1],d,M,a,m(1,l)),u.push(...f),u.push(c[0],c[1],p[0],p[1],d,M,a,m(2,l)),u.push(...f),u.push(c[0],c[1],p[0],p[1],d,M,a,m(3,l)),u.push(...f),o.push(h,h+1,h+2,h+1,h+3,h+2),{length:a+Math.sqrt((g[0]-y[0])*(g[0]-y[0])+(g[1]-y[1])*(g[1]-y[1])),angle:Z}}function G(e,t,n,r,x){const i=2+x;let u=t;const o=e.slice(u,u+x);u+=x;const f=e[u++];let s=0;const a=new Array(f-1);for(let t=0;t<f;t++)s+=e[u++],t<f-1&&(a[t]=s);const l=e.slice(u,u+2*s),v=N(l,a,2);for(let e=0;e<v.length;e++)r.push(v[e]+n.length/i);for(let e=0;e<l.length;e+=2)n.push(l[e],l[e+1],...o);return u+2*s}const j=self;j.onmessage=r=>{const i=r.data;switch(i.type){case t:{const e=3,t=2,n=i.customAttributesSize,r=t+n,x=new Float32Array(i.renderInstructions),u=x.length/r,o=4*u*(n+e),f=new Uint32Array(6*u),s=new Float32Array(o);let a;for(let e=0;e<x.length;e+=r)a=U(x,e,s,f,n,a);const l=Object.assign({vertexBuffer:s.buffer,indexBuffer:f.buffer,renderInstructions:x.buffer},i);j.postMessage(l,[s.buffer,f.buffer,x.buffer]);break}case n:{const e=[],t=[],n=i.customAttributesSize,r=2,u=new Float32Array(i.renderInstructions);let o=0;const f=[1,0,0,1,0,0];let s,a;for(x(f,i.renderInstructionsTransform);o<u.length;){a=Array.from(u.slice(o,o+n)),o+=n,s=u[o++];const x=o,i=o+(s-1)*r,l=u[x]===u[i]&&u[x+1]===u[i+1];let v=0,h=0;for(let n=0;n<s-1;n++){let c=null;n>0?c=o+(n-1)*r:l&&(c=i-r);let p=null;n<s-2?p=o+(n+2)*r:l&&(p=x+r);const y=k(u,o+n*r,o+(n+1)*r,c,p,e,t,a,f,v,h);v=y.length,h=y.angle}o+=s*r}const l=Uint32Array.from(t),v=Float32Array.from(e),h=Object.assign({vertexBuffer:v.buffer,indexBuffer:l.buffer,renderInstructions:u.buffer},i);j.postMessage(h,[v.buffer,l.buffer,u.buffer]);break}case e:{const e=[],t=[],n=i.customAttributesSize,r=new Float32Array(i.renderInstructions);let x=0;for(;x<r.length;)x=G(r,x,e,t,n);const u=Uint32Array.from(t),o=Float32Array.from(e),f=Object.assign({vertexBuffer:o.buffer,indexBuffer:u.buffer,renderInstructions:r.buffer},i);j.postMessage(f,[o.buffer,u.buffer,r.buffer]);break}}};';return new Worker(typeof Blob>"u"?"data:application/javascript;base64,"+Buffer.from(r,"binary").toString("base64"):URL.createObjectURL(new Blob([r],{type:"application/javascript"})))}function St(r,e){let t=r.viewState.projection,i=e.getSource().getWrapX()&&t.canWrapX(),o=t.getExtent(),s=r.extent,a=i?je(o):null,l=i?Math.ceil((s[2]-o[2])/a)+1:1;return[i?Math.floor((s[0]-o[0])/a):0,l,a]}var ye=class extends gt{constructor(e,t){let n=t.uniforms||{},i=R();n[P.PROJECTION_MATRIX]=i,super(e,{uniforms:n,postProcesses:t.postProcesses}),this.sourceRevision_=-1,this.verticesBuffer_=new ce(O,G),this.indicesBuffer_=new ce(B,G),this.vertexShader_=t.vertexShader,this.fragmentShader_=t.fragmentShader,this.program_,this.hitDetectionEnabled_=t.hitDetectionEnabled??!0;let o=t.attributes?t.attributes.map(function(a){return{name:"a_prop_"+a.name,size:1,type:T.FLOAT}}):[];this.attributes=[{name:"a_position",size:2,type:T.FLOAT},{name:"a_index",size:1,type:T.FLOAT}],this.hitDetectionEnabled_&&(this.attributes.push({name:"a_prop_hitColor",size:4,type:T.FLOAT}),this.attributes.push({name:"a_featureUid",size:1,type:T.FLOAT})),this.attributes.push(...o),this.customAttributes=t.attributes?t.attributes:[],this.previousExtent_=Ge(),this.currentTransform_=i,this.renderTransform_=R(),this.invertRenderTransform_=R(),this.renderInstructions_=new Float32Array(0),this.hitRenderTarget_,this.lastSentId=0,this.worker_=Ct(),this.worker_.addEventListener("message",a=>{let l=a.data;if(l.type===_e.GENERATE_POINT_BUFFERS){let u=l.projectionTransform;this.verticesBuffer_.fromArrayBuffer(l.vertexBuffer),this.helper.flushBufferData(this.verticesBuffer_),this.indicesBuffer_.fromArrayBuffer(l.indexBuffer),this.helper.flushBufferData(this.indicesBuffer_),this.renderTransform_=u,ke(this.invertRenderTransform_,this.renderTransform_),this.renderInstructions_=new Float32Array(a.data.renderInstructions),l.id===this.lastSentId&&(this.ready=!0),this.getLayer().changed()}}),this.featureCache_={},this.featureCount_=0;let s=this.getLayer().getSource();this.sourceListenKeys_=[N(s,M.ADDFEATURE,this.handleSourceFeatureAdded_,this),N(s,M.CHANGEFEATURE,this.handleSourceFeatureChanged_,this),N(s,M.REMOVEFEATURE,this.handleSourceFeatureDelete_,this),N(s,M.CLEAR,this.handleSourceFeatureClear_,this)],s.forEachFeature(a=>{this.featureCache_[E(a)]={feature:a,properties:a.getProperties(),geometry:a.getGeometry()},this.featureCount_++})}afterHelperCreated(){this.program_=this.helper.getProgram(this.fragmentShader_,this.vertexShader_),this.hitDetectionEnabled_&&(this.hitRenderTarget_=new mt(this.helper))}handleSourceFeatureAdded_(e){let t=e.feature;this.featureCache_[E(t)]={feature:t,properties:t.getProperties(),geometry:t.getGeometry()},this.featureCount_++}handleSourceFeatureChanged_(e){let t=e.feature;this.featureCache_[E(t)]={feature:t,properties:t.getProperties(),geometry:t.getGeometry()}}handleSourceFeatureDelete_(e){let t=e.feature;delete this.featureCache_[E(t)],this.featureCount_--}handleSourceFeatureClear_(){this.featureCache_={},this.featureCount_=0}renderFrame(e){let t=this.helper.getGL();this.preRender(t,e);let[n,i,o]=St(e,this.getLayer());return this.renderWorlds(e,!1,n,i,o),this.helper.finalizeDraw(e,this.dispatchPreComposeEvent,this.dispatchPostComposeEvent),this.hitDetectionEnabled_&&(this.renderWorlds(e,!0,n,i,o),this.hitRenderTarget_.clearCachedData()),this.postRender(t,e),this.helper.getCanvas()}prepareFrameInternal(e){let t=this.getLayer(),n=t.getSource(),i=e.viewState,o=!e.viewHints[re.ANIMATING]&&!e.viewHints[re.INTERACTING],s=!$e(this.previousExtent_,e.extent),a=this.sourceRevision_<n.getRevision();if(a&&(this.sourceRevision_=n.getRevision()),o&&(s||a)){let l=i.projection,u=i.resolution,x=t instanceof H?t.getRenderBuffer():0,c=Be(e.extent,x*u);n.loadFeatures(c,u,l),this.rebuildBuffers_(e),this.previousExtent_=e.extent.slice()}return this.helper.useProgram(this.program_,e),this.helper.prepareDraw(e),this.helper.bindBuffer(this.verticesBuffer_),this.helper.bindBuffer(this.indicesBuffer_),this.helper.enableAttributes(this.attributes),!0}rebuildBuffers_(e){let t=R();this.helper.makeProjectionTransform(e,t);let n=ze(),o=(this.hitDetectionEnabled_?7:2)+this.customAttributes.length,s=o*this.featureCount_;(!this.renderInstructions_||this.renderInstructions_.length!==s)&&(this.renderInstructions_=new Float32Array(s));let a,l,u=[],x=[],c=-1;for(let v in this.featureCache_)if(a=this.featureCache_[v],l=a.geometry,!(!l||l.getType()!=="Point")){if(n){let p=Ze(l.getFlatCoordinates(),e.viewState.projection);u[0]=p[0],u[1]=p[1]}else u[0]=l.getFlatCoordinates()[0],u[1]=l.getFlatCoordinates()[1];if(ne(t,u),this.renderInstructions_[++c]=u[0],this.renderInstructions_[++c]=u[1],this.hitDetectionEnabled_){let p=Pt(c+5,x);this.renderInstructions_[++c]=p[0],this.renderInstructions_[++c]=p[1],this.renderInstructions_[++c]=p[2],this.renderInstructions_[++c]=p[3],this.renderInstructions_[++c]=Number(v)}for(let p=0;p<this.customAttributes.length;p++){let A=this.customAttributes[p].callback(a.feature,a.properties);this.renderInstructions_[++c]=A}}let f={id:++this.lastSentId,type:_e.GENERATE_POINT_BUFFERS,renderInstructions:this.renderInstructions_.buffer,customAttributesSize:o-2};f.projectionTransform=t,this.ready=!1,this.worker_.postMessage(f,[this.renderInstructions_.buffer]),this.renderInstructions_=null}forEachFeatureAtCoordinate(e,t,n,i,o){if(W(this.hitDetectionEnabled_,"`forEachFeatureAtCoordinate` cannot be used on a WebGL layer if the hit detection logic has been disabled using the `disableHitDetection: true` option."),!this.renderInstructions_||!this.hitDetectionEnabled_)return;let s=ne(t.coordinateToPixelTransform,e.slice()),a=this.hitRenderTarget_.readPixel(s[0]/2,s[1]/2),l=[a[0]/255,a[1]/255,a[2]/255,a[3]/255],u=bt(l),x=this.renderInstructions_[u],c=Math.floor(x).toString(),v=this.getLayer().getSource().getFeatureByUid(c);if(v)return i(v,this.getLayer(),null)}renderWorlds(e,t,n,i,o){let s=n;this.helper.useProgram(this.program_,e),t&&(this.hitRenderTarget_.setSize([Math.floor(e.size[0]/2),Math.floor(e.size[1]/2)]),this.helper.prepareDrawToRenderTarget(e,this.hitRenderTarget_,!0)),this.helper.bindBuffer(this.verticesBuffer_),this.helper.bindBuffer(this.indicesBuffer_),this.helper.enableAttributes(this.attributes);do{this.helper.makeProjectionTransform(e,this.currentTransform_),We(this.currentTransform_,s*o,0),Xe(this.currentTransform_,this.invertRenderTransform_),this.helper.applyUniforms(e),this.helper.applyHitDetectionUniform(t);let a=this.indicesBuffer_.getSize();this.helper.drawElements(0,a)}while(++s<i)}disposeInternal(){this.worker_.terminate(),this.layer_=null,this.sourceListenKeys_.forEach(function(e){Ne(e)}),this.sourceListenKeys_=null,super.disposeInternal()}renderDeclutter(){}},At=ye;var Re=class{constructor(e,t){this.name=e,this.data=t,this.texture_=null}getTexture(e){if(!this.texture_){let t=e.createTexture();e.bindTexture(e.TEXTURE_2D,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,this.data.length/4,1,0,e.RGBA,e.UNSIGNED_BYTE,this.data),this.texture_=t}return this.texture_}delete(e){this.texture_&&e.deleteTexture(this.texture_),this.texture_=null}},Ft=Re;var wt={TILE_TRANSFORM:"u_tileTransform",TRANSITION_ALPHA:"u_transitionAlpha",DEPTH:"u_depth",RENDER_EXTENT:"u_renderExtent",PATTERN_ORIGIN:"u_patternOrigin",RESOLUTION:"u_resolution",ZOOM:"u_zoom",GLOBAL_ALPHA:"u_globalAlpha",PROJECTION_MATRIX:"u_projectionMatrix",SCREEN_TO_WORLD_MATRIX:"u_screenToWorldMatrix"};var ee=De(we({},wt),{TILE_TEXTURE_ARRAY:"u_tileTextures",TEXTURE_PIXEL_WIDTH:"u_texturePixelWidth",TEXTURE_PIXEL_HEIGHT:"u_texturePixelHeight",TEXTURE_RESOLUTION:"u_textureResolution",TEXTURE_ORIGIN_X:"u_textureOriginX",TEXTURE_ORIGIN_Y:"u_textureOriginY"}),or={TEXTURE_COORD:"a_textureCoord"},Rn=[{name:or.TEXTURE_COORD,size:2,type:T.FLOAT}];function sr(r,e){return`operator_${r}_${Object.keys(e.functions).length}`}function C(r){let e=r.toString();return e.includes(".")?e:e+".0"}function Ce(r){if(r.length<2||r.length>4)throw new Error("`formatArray` can only output `vec2`, `vec3` or `vec4` arrays.");return`vec${r.length}(${r.map(C).join(", ")})`}function X(r){let e=ie(r),t=e.length>3?e[3]:1;return Ce([e[0]/255*t,e[1]/255*t,e[2]/255*t,t])}function ar(r){let e=He(r);return Ce(e)}var Pe={},lr=0;function ur(r){return r in Pe||(Pe[r]=lr++),Pe[r]}function S(r){return C(ur(r))}function cr(r){return"u_var_"+r}var be="getBandValue",hr="u_paletteTextures";function d(r){return(e,t,n)=>{let i=t.args.length,o=new Array(i);for(let s=0;s<i;++s)o[s]=Dt(t.args[s],n,e);return r(o,e)}}var fr={[h.Get]:(r,e)=>{let n=e.args[0].value;return n in r.properties||(r.properties[n]={name:n,type:e.type}),(r.inFragmentShader?"v_prop_":"a_prop_")+n},[h.GeometryType]:(r,e,t)=>{let n="geometryType";return n in r.properties||(r.properties[n]={name:n,type:se,evaluator:s=>rt(s.getGeometry())}),(r.inFragmentShader?"v_prop_":"a_prop_")+n},[h.Var]:(r,e)=>{let n=e.args[0].value;return n in r.variables||(r.variables[n]={name:n,type:e.type}),cr(n)},[h.Resolution]:()=>"u_resolution",[h.Zoom]:()=>"u_zoom",[h.Time]:()=>"u_time",[h.Any]:d(r=>`(${r.join(" || ")})`),[h.All]:d(r=>`(${r.join(" && ")})`),[h.Not]:d(([r])=>`(!${r})`),[h.Equal]:d(([r,e])=>`(${r} == ${e})`),[h.NotEqual]:d(([r,e])=>`(${r} != ${e})`),[h.GreaterThan]:d(([r,e])=>`(${r} > ${e})`),[h.GreaterThanOrEqualTo]:d(([r,e])=>`(${r} >= ${e})`),[h.LessThan]:d(([r,e])=>`(${r} < ${e})`),[h.LessThanOrEqualTo]:d(([r,e])=>`(${r} <= ${e})`),[h.Multiply]:d(r=>`(${r.join(" * ")})`),[h.Divide]:d(([r,e])=>`(${r} / ${e})`),[h.Add]:d(r=>`(${r.join(" + ")})`),[h.Subtract]:d(([r,e])=>`(${r} - ${e})`),[h.Clamp]:d(([r,e,t])=>`clamp(${r}, ${e}, ${t})`),[h.Mod]:d(([r,e])=>`mod(${r}, ${e})`),[h.Pow]:d(([r,e])=>`pow(${r}, ${e})`),[h.Abs]:d(([r])=>`abs(${r})`),[h.Floor]:d(([r])=>`floor(${r})`),[h.Ceil]:d(([r])=>`ceil(${r})`),[h.Round]:d(([r])=>`floor(${r} + 0.5)`),[h.Sin]:d(([r])=>`sin(${r})`),[h.Cos]:d(([r])=>`cos(${r})`),[h.Atan]:d(([r,e])=>e!==void 0?`atan(${r}, ${e})`:`atan(${r})`),[h.Sqrt]:d(([r])=>`sqrt(${r})`),[h.Match]:d(r=>{let e=r[0],t=r[r.length-1],n=null;for(let i=r.length-3;i>=1;i-=2){let o=r[i],s=r[i+1];n=`(${e} == ${o} ? ${s} : ${n||t})`}return n}),[h.Between]:d(([r,e,t])=>`(${r} >= ${e} && ${r} <= ${t})`),[h.Interpolate]:d(([r,e,...t])=>{let n="";for(let i=0;i<t.length-2;i+=2){let o=t[i],s=n||t[i+1],a=t[i+2],l=t[i+3],u;r===C(1)?u=`(${e} - ${o}) / (${a} - ${o})`:u=`(pow(${r}, (${e} - ${o})) - 1.0) / (pow(${r}, (${a} - ${o})) - 1.0)`,n=`mix(${s}, ${l}, clamp(${u}, 0.0, 1.0))`}return n}),[h.Case]:d(r=>{let e=r[r.length-1],t=null;for(let n=r.length-3;n>=0;n-=2){let i=r[n],o=r[n+1];t=`(${i} ? ${o} : ${t||e})`}return t}),[h.In]:d(([r,...e],t)=>{let n=sr("in",t),i=[];for(let o=0;o<e.length;o+=1)i.push(`  if (inputValue == ${e[o]}) { return true; }`);return t.functions[n]=`bool ${n}(float inputValue) {
${i.join(`
`)}
  return false;
}`,`${n}(${r})`}),[h.Array]:d(r=>`vec${r.length}(${r.join(", ")})`),[h.Color]:d(r=>{if(r.length===1)return`vec4(vec3(${r[0]} / 255.0), 1.0)`;if(r.length===2)return`(${r[1]} * vec4(vec3(${r[0]} / 255.0), 1.0))`;let e=r.slice(0,3).map(n=>`${n} / 255.0`);return r.length===3?`vec4(${e.join(", ")}, 1.0)`:`(${r[3]} * vec4(${e.join(", ")}, 1.0))`}),[h.Band]:d(([r,e,t],n)=>{if(!(be in n.functions)){let i="",o=n.bandCount||1;for(let s=0;s<o;s++){let a=Math.floor(s/4),l=s%4;s===o-1&&l===1&&(l=3);let u=`${ee.TILE_TEXTURE_ARRAY}[${a}]`;i+=`  if (band == ${s+1}.0) {
    return texture2D(${u}, v_textureCoord + vec2(dx, dy))[${l}];
  }
`}n.functions[be]=`float getBandValue(float band, float xOffset, float yOffset) {
  float dx = xOffset / ${ee.TEXTURE_PIXEL_WIDTH};
  float dy = yOffset / ${ee.TEXTURE_PIXEL_HEIGHT};
${i}
}`}return`${be}(${r}, ${e??"0.0"}, ${t??"0.0"})`}),[h.Palette]:(r,e)=>{let[t,...n]=e.args,i=n.length,o=new Uint8Array(i*4);for(let u=0;u<n.length;u++){let x=n[u].value,c=ie(x),f=u*4;o[f]=c[0],o[f+1]=c[1],o[f+2]=c[2],o[f+3]=c[3]*255}r.paletteTextures||(r.paletteTextures=[]);let s=`${hr}[${r.paletteTextures.length}]`,a=new Ft(s,o);r.paletteTextures.push(a);let l=Dt(t,oe,r);return`texture2D(${s}, vec2((${l} + 0.5) / ${i}.0, 0.5))`}};function Dt(r,e,t){if(r instanceof tt){let n=fr[r.operator];if(n===void 0)throw new Error(`No compiler defined for this operator: ${JSON.stringify(r.operator)}`);return n(t,r,e)}if((r.type&oe)>0)return C(r.value);if((r.type&Ke)>0)return r.value.toString();if((r.type&se)>0)return S(r.value.toString());if((r.type&qe)>0)return X(r.value);if((r.type&Je)>0)return Ce(r.value);if((r.type&Qe)>0)return ar(r.value);throw new Error(`Unexpected expression ${r.value} (expected type ${et(e)})`)}function It(){return{"fill-color":"rgba(255,255,255,0.4)","stroke-color":"#3399CC","stroke-width":1.25,"circle-radius":5,"circle-fill-color":"rgba(255,255,255,0.4)","circle-stroke-width":1.25,"circle-stroke-color":"#3399CC"}}var I=`#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform mat4 u_projectionMatrix;
uniform mat4 u_screenToWorldMatrix;
uniform vec2 u_viewportSizePx;
uniform float u_pixelRatio;
uniform float u_globalAlpha;
uniform float u_time;
uniform float u_zoom;
uniform float u_resolution;
uniform float u_rotation;
uniform vec4 u_renderExtent;
uniform vec2 u_patternOrigin;
uniform float u_depth;
uniform mediump int u_hitDetection;

const float PI = 3.141592653589793238;
const float TWO_PI = 2.0 * PI;

// this used to produce an alpha-premultiplied color from a texture
vec4 samplePremultiplied(sampler2D sampler, vec2 texCoord) {
  vec4 color = texture2D(sampler, texCoord);
  return vec4(color.rgb * color.a, color.a);
}
`,L=It(),te=class{constructor(){this.uniforms_=[],this.attributes_=[],this.varyings_=[],this.hasSymbol_=!1,this.symbolSizeExpression_=`vec2(${C(L["circle-radius"])} + ${C(L["circle-stroke-width"]*.5)})`,this.symbolRotationExpression_="0.0",this.symbolOffsetExpression_="vec2(0.0)",this.symbolColorExpression_=X(L["circle-fill-color"]),this.texCoordExpression_="vec4(0.0, 0.0, 1.0, 1.0)",this.discardExpression_="false",this.symbolRotateWithView_=!1,this.hasStroke_=!1,this.strokeWidthExpression_=C(L["stroke-width"]),this.strokeColorExpression_=X(L["stroke-color"]),this.strokeOffsetExpression_="0.",this.strokeCapExpression_=S("round"),this.strokeJoinExpression_=S("round"),this.strokeMiterLimitExpression_="10.",this.strokeDistanceFieldExpression_="-1000.",this.hasFill_=!1,this.fillColorExpression_=X(L["fill-color"]),this.vertexShaderFunctions_=[],this.fragmentShaderFunctions_=[]}addUniform(e){return this.uniforms_.push(e),this}addAttribute(e){return this.attributes_.push(e),this}addVarying(e,t,n){return this.varyings_.push({name:e,type:t,expression:n}),this}setSymbolSizeExpression(e){return this.hasSymbol_=!0,this.symbolSizeExpression_=e,this}getSymbolSizeExpression(){return this.symbolSizeExpression_}setSymbolRotationExpression(e){return this.symbolRotationExpression_=e,this}setSymbolOffsetExpression(e){return this.symbolOffsetExpression_=e,this}getSymbolOffsetExpression(){return this.symbolOffsetExpression_}setSymbolColorExpression(e){return this.hasSymbol_=!0,this.symbolColorExpression_=e,this}getSymbolColorExpression(){return this.symbolColorExpression_}setTextureCoordinateExpression(e){return this.texCoordExpression_=e,this}setFragmentDiscardExpression(e){return this.discardExpression_=e,this}getFragmentDiscardExpression(){return this.discardExpression_}setSymbolRotateWithView(e){return this.symbolRotateWithView_=e,this}setStrokeWidthExpression(e){return this.hasStroke_=!0,this.strokeWidthExpression_=e,this}setStrokeColorExpression(e){return this.hasStroke_=!0,this.strokeColorExpression_=e,this}getStrokeColorExpression(){return this.strokeColorExpression_}setStrokeOffsetExpression(e){return this.strokeOffsetExpression_=e,this}setStrokeCapExpression(e){return this.strokeCapExpression_=e,this}setStrokeJoinExpression(e){return this.strokeJoinExpression_=e,this}setStrokeMiterLimitExpression(e){return this.strokeMiterLimitExpression_=e,this}setStrokeDistanceFieldExpression(e){return this.strokeDistanceFieldExpression_=e,this}setFillColorExpression(e){return this.hasFill_=!0,this.fillColorExpression_=e,this}getFillColorExpression(){return this.fillColorExpression_}addVertexShaderFunction(e){this.vertexShaderFunctions_.includes(e)||this.vertexShaderFunctions_.push(e)}addFragmentShaderFunction(e){this.fragmentShaderFunctions_.includes(e)||this.fragmentShaderFunctions_.push(e)}getSymbolVertexShader(){return this.hasSymbol_?`${I}
${this.uniforms_.map(function(e){return"uniform "+e+";"}).join(`
`)}
attribute vec2 a_position;
attribute float a_index;
attribute vec4 a_prop_hitColor;
${this.attributes_.map(function(e){return"attribute "+e+";"}).join(`
`)}
varying vec2 v_texCoord;
varying vec2 v_quadCoord;
varying vec4 v_prop_hitColor;
varying vec2 v_centerPx;
varying float v_angle;
varying vec2 v_quadSizePx;
${this.varyings_.map(function(e){return"varying "+e.type+" "+e.name+";"}).join(`
`)}
${this.vertexShaderFunctions_.join(`
`)}
vec2 pxToScreen(vec2 coordPx) {
  vec2 scaled = coordPx / u_viewportSizePx / 0.5;
  return scaled;
}

vec2 screenToPx(vec2 coordScreen) {
  return (coordScreen * 0.5 + 0.5) * u_viewportSizePx;
}

void main(void) {
  v_quadSizePx = ${this.symbolSizeExpression_};
  vec2 halfSizePx = v_quadSizePx * 0.5;
  vec2 centerOffsetPx = ${this.symbolOffsetExpression_};
  vec2 offsetPx = centerOffsetPx;
  if (a_index == 0.0) {
    offsetPx -= halfSizePx;
  } else if (a_index == 1.0) {
    offsetPx += halfSizePx * vec2(1., -1.);
  } else if (a_index == 2.0) {
    offsetPx += halfSizePx;
  } else {
    offsetPx += halfSizePx * vec2(-1., 1.);
  }
  float angle = ${this.symbolRotationExpression_};
  ${this.symbolRotateWithView_?"angle += u_rotation;":""}
  float c = cos(-angle);
  float s = sin(-angle);
  offsetPx = vec2(c * offsetPx.x - s * offsetPx.y, s * offsetPx.x + c * offsetPx.y);
  vec4 center = u_projectionMatrix * vec4(a_position, 0.0, 1.0);
  gl_Position = center + vec4(pxToScreen(offsetPx), u_depth, 0.);
  vec4 texCoord = ${this.texCoordExpression_};
  float u = a_index == 0.0 || a_index == 3.0 ? texCoord.s : texCoord.p;
  float v = a_index == 2.0 || a_index == 3.0 ? texCoord.t : texCoord.q;
  v_texCoord = vec2(u, v);
  v_prop_hitColor = a_prop_hitColor;
  v_angle = angle;
  c = cos(-v_angle);
  s = sin(-v_angle);
  centerOffsetPx = vec2(c * centerOffsetPx.x - s * centerOffsetPx.y, s * centerOffsetPx.x + c * centerOffsetPx.y); 
  v_centerPx = screenToPx(center.xy) + centerOffsetPx;
${this.varyings_.map(function(e){return"  "+e.name+" = "+e.expression+";"}).join(`
`)}
}`:null}getSymbolFragmentShader(){return this.hasSymbol_?`${I}
${this.uniforms_.map(function(e){return"uniform "+e+";"}).join(`
`)}
varying vec2 v_texCoord;
varying vec4 v_prop_hitColor;
varying vec2 v_centerPx;
varying float v_angle;
varying vec2 v_quadSizePx;
${this.varyings_.map(function(e){return"varying "+e.type+" "+e.name+";"}).join(`
`)}
${this.fragmentShaderFunctions_.join(`
`)}

void main(void) {
  if (${this.discardExpression_}) { discard; }
  vec2 coordsPx = gl_FragCoord.xy / u_pixelRatio - v_centerPx; // relative to center
  float c = cos(v_angle);
  float s = sin(v_angle);
  coordsPx = vec2(c * coordsPx.x - s * coordsPx.y, s * coordsPx.x + c * coordsPx.y);
  gl_FragColor = ${this.symbolColorExpression_};
  if (u_hitDetection > 0) {
    if (gl_FragColor.a < 0.05) { discard; };
    gl_FragColor = v_prop_hitColor;
  }
}`:null}getStrokeVertexShader(){return this.hasStroke_?`${I}
${this.uniforms_.map(function(e){return"uniform "+e+";"}).join(`
`)}
attribute vec2 a_position;
attribute float a_index;
attribute vec2 a_segmentStart;
attribute vec2 a_segmentEnd;
attribute float a_parameters;
attribute float a_distance;
attribute vec2 a_joinAngles;
attribute vec4 a_prop_hitColor;
${this.attributes_.map(function(e){return"attribute "+e+";"}).join(`
`)}
varying vec2 v_segmentStart;
varying vec2 v_segmentEnd;
varying float v_angleStart;
varying float v_angleEnd;
varying float v_width;
varying vec4 v_prop_hitColor;
varying float v_distanceOffsetPx;
${this.varyings_.map(function(e){return"varying "+e.type+" "+e.name+";"}).join(`
`)}
${this.vertexShaderFunctions_.join(`
`)}
vec2 worldToPx(vec2 worldPos) {
  vec4 screenPos = u_projectionMatrix * vec4(worldPos, 0.0, 1.0);
  return (0.5 * screenPos.xy + 0.5) * u_viewportSizePx;
}

vec4 pxToScreen(vec2 pxPos) {
  vec2 screenPos = 2.0 * pxPos / u_viewportSizePx - 1.0;
  return vec4(screenPos, u_depth, 1.0);
}

bool isCap(float joinAngle) {
  return joinAngle < -0.1;
}

vec2 getJoinOffsetDirection(vec2 normalPx, float joinAngle) {
  float halfAngle = joinAngle / 2.0;
  float c = cos(halfAngle);
  float s = sin(halfAngle);
  vec2 angleBisectorNormal = vec2(s * normalPx.x + c * normalPx.y, -c * normalPx.x + s * normalPx.y);
  float length = 1.0 / s;
  return angleBisectorNormal * length;
}

vec2 getOffsetPoint(vec2 point, vec2 normal, float joinAngle, float offsetPx) {
  // if on a cap or the join angle is too high, offset the line along the segment normal
  if (cos(joinAngle) > 0.998 || isCap(joinAngle)) {
    return point - normal * offsetPx;
  }
  // offset is applied along the inverted normal (positive offset goes "right" relative to line direction)
  return point - getJoinOffsetDirection(normal, joinAngle) * offsetPx;
}

void main(void) {
  v_angleStart = a_joinAngles.x;
  v_angleEnd = a_joinAngles.y;
  float vertexNumber = floor(abs(a_parameters) / 10000. + 0.5);
  // we're reading the fractional part while keeping the sign (so -4.12 gives -0.12, 3.45 gives 0.45)
  float angleTangentSum = fract(abs(a_parameters) / 10000.) * 10000. * sign(a_parameters);

  float lineWidth = ${this.strokeWidthExpression_};
  float lineOffsetPx = ${this.strokeOffsetExpression_};

  // compute segment start/end in px with offset
  vec2 segmentStartPx = worldToPx(a_segmentStart);
  vec2 segmentEndPx = worldToPx(a_segmentEnd);
  vec2 tangentPx = normalize(segmentEndPx - segmentStartPx);
  vec2 normalPx = vec2(-tangentPx.y, tangentPx.x);
  segmentStartPx = getOffsetPoint(segmentStartPx, normalPx, v_angleStart, lineOffsetPx),
  segmentEndPx = getOffsetPoint(segmentEndPx, normalPx, v_angleEnd, lineOffsetPx);
  
  // compute current vertex position
  float normalDir = vertexNumber < 0.5 || (vertexNumber > 1.5 && vertexNumber < 2.5) ? 1.0 : -1.0;
  float tangentDir = vertexNumber < 1.5 ? 1.0 : -1.0;
  float angle = vertexNumber < 1.5 ? v_angleStart : v_angleEnd;
  vec2 joinDirection;
  vec2 positionPx = vertexNumber < 1.5 ? segmentStartPx : segmentEndPx;
  // if angle is too high, do not make a proper join
  if (cos(angle) > ${Te} || isCap(angle)) {
    joinDirection = normalPx * normalDir - tangentPx * tangentDir;
  } else {
    joinDirection = getJoinOffsetDirection(normalPx * normalDir, angle);
  }
  positionPx = positionPx + joinDirection * (lineWidth * 0.5 + 1.); // adding 1 pixel for antialiasing
  gl_Position = pxToScreen(positionPx);

  v_segmentStart = segmentStartPx;
  v_segmentEnd = segmentEndPx;
  v_width = lineWidth;
  v_prop_hitColor = a_prop_hitColor;
  v_distanceOffsetPx = a_distance / u_resolution - (lineOffsetPx * angleTangentSum);
${this.varyings_.map(function(e){return"  "+e.name+" = "+e.expression+";"}).join(`
`)}
}`:null}getStrokeFragmentShader(){return this.hasStroke_?`${I}
${this.uniforms_.map(function(e){return"uniform "+e+";"}).join(`
`)}
varying vec2 v_segmentStart;
varying vec2 v_segmentEnd;
varying float v_angleStart;
varying float v_angleEnd;
varying float v_width;
varying vec4 v_prop_hitColor;
varying float v_distanceOffsetPx;
${this.varyings_.map(function(e){return"varying "+e.type+" "+e.name+";"}).join(`
`)}
${this.fragmentShaderFunctions_.join(`
`)}

vec2 pxToWorld(vec2 pxPos) {
  vec2 screenPos = 2.0 * pxPos / u_viewportSizePx - 1.0;
  return (u_screenToWorldMatrix * vec4(screenPos, 0.0, 1.0)).xy;
}

bool isCap(float joinAngle) {
  return joinAngle < -0.1;
}

float segmentDistanceField(vec2 point, vec2 start, vec2 end, float width) {
  vec2 tangent = normalize(end - start);
  vec2 normal = vec2(-tangent.y, tangent.x);
  vec2 startToPoint = point - start;
  return abs(dot(startToPoint, normal)) - width * 0.5;
}

float buttCapDistanceField(vec2 point, vec2 start, vec2 end) {
  vec2 startToPoint = point - start;
  vec2 tangent = normalize(end - start);
  return dot(startToPoint, -tangent);
}

float squareCapDistanceField(vec2 point, vec2 start, vec2 end, float width) {
  return buttCapDistanceField(point, start, end) - width * 0.5;
}

float roundCapDistanceField(vec2 point, vec2 start, vec2 end, float width) {
  float onSegment = max(0., 1000. * dot(point - start, end - start)); // this is very high when inside the segment
  return length(point - start) - width * 0.5 - onSegment;
}

float roundJoinDistanceField(vec2 point, vec2 start, vec2 end, float width) {
  return roundCapDistanceField(point, start, end, width);
}

float bevelJoinField(vec2 point, vec2 start, vec2 end, float width, float joinAngle) {
  vec2 startToPoint = point - start;
  vec2 tangent = normalize(end - start);
  float c = cos(joinAngle * 0.5);
  float s = sin(joinAngle * 0.5);
  float direction = -sign(sin(joinAngle));
  vec2 bisector = vec2(c * tangent.x - s * tangent.y, s * tangent.x + c * tangent.y);
  float radius = width * 0.5 * s;
  return dot(startToPoint, bisector * direction) - radius;
}

float miterJoinDistanceField(vec2 point, vec2 start, vec2 end, float width, float joinAngle) {
  if (cos(joinAngle) > ${Te}) { // avoid risking a division by zero
    return bevelJoinField(point, start, end, width, joinAngle);
  }
  float miterLength = 1. / sin(joinAngle * 0.5);
  float miterLimit = ${this.strokeMiterLimitExpression_};
  if (miterLength > miterLimit) {
    return bevelJoinField(point, start, end, width, joinAngle);
  }
  return -1000.;
}

float capDistanceField(vec2 point, vec2 start, vec2 end, float width, float capType) {
   if (capType == ${S("butt")}) {
    return buttCapDistanceField(point, start, end);
  } else if (capType == ${S("square")}) {
    return squareCapDistanceField(point, start, end, width);
  }
  return roundCapDistanceField(point, start, end, width);
}

float joinDistanceField(vec2 point, vec2 start, vec2 end, float width, float joinAngle, float joinType) {
  if (joinType == ${S("bevel")}) {
    return bevelJoinField(point, start, end, width, joinAngle);
  } else if (joinType == ${S("miter")}) {
    return miterJoinDistanceField(point, start, end, width, joinAngle);
  }
  return roundJoinDistanceField(point, start, end, width);
}

float computeSegmentPointDistance(vec2 point, vec2 start, vec2 end, float width, float joinAngle, float capType, float joinType) {
  if (isCap(joinAngle)) {
    return capDistanceField(point, start, end, width, capType);
  }
  return joinDistanceField(point, start, end, width, joinAngle, joinType);
}

void main(void) {
  vec2 currentPoint = gl_FragCoord.xy / u_pixelRatio;
  #ifdef GL_FRAGMENT_PRECISION_HIGH
  vec2 worldPos = pxToWorld(currentPoint);
  if (
    abs(u_renderExtent[0] - u_renderExtent[2]) > 0.0 && (
      worldPos[0] < u_renderExtent[0] ||
      worldPos[1] < u_renderExtent[1] ||
      worldPos[0] > u_renderExtent[2] ||
      worldPos[1] > u_renderExtent[3]
    )
  ) {
    discard;
  }
  #endif
  if (${this.discardExpression_}) { discard; }

  float segmentLength = length(v_segmentEnd - v_segmentStart);
  vec2 segmentTangent = (v_segmentEnd - v_segmentStart) / segmentLength;
  vec2 segmentNormal = vec2(-segmentTangent.y, segmentTangent.x);
  vec2 startToPoint = currentPoint - v_segmentStart;
  float currentLengthPx = max(0., min(dot(segmentTangent, startToPoint), segmentLength)) + v_distanceOffsetPx; 
  float currentRadiusPx = abs(dot(segmentNormal, startToPoint));
  float currentRadiusRatio = dot(segmentNormal, startToPoint) * 2. / v_width;
  vec4 color = ${this.strokeColorExpression_} * u_globalAlpha;
  float capType = ${this.strokeCapExpression_};
  float joinType = ${this.strokeJoinExpression_};
  float segmentStartDistance = computeSegmentPointDistance(currentPoint, v_segmentStart, v_segmentEnd, v_width, v_angleStart, capType, joinType);
  float segmentEndDistance = computeSegmentPointDistance(currentPoint, v_segmentEnd, v_segmentStart, v_width, v_angleEnd, capType, joinType);
  float distance = max(
    segmentDistanceField(currentPoint, v_segmentStart, v_segmentEnd, v_width),
    max(segmentStartDistance, segmentEndDistance)
  );
  distance = max(distance, ${this.strokeDistanceFieldExpression_});
  gl_FragColor = color * smoothstep(0.5, -0.5, distance);
  if (u_hitDetection > 0) {
    if (gl_FragColor.a < 0.1) { discard; };
    gl_FragColor = v_prop_hitColor;
  }
}`:null}getFillVertexShader(){return this.hasFill_?`${I}
${this.uniforms_.map(function(e){return"uniform "+e+";"}).join(`
`)}
attribute vec2 a_position;
attribute vec4 a_prop_hitColor;
${this.attributes_.map(function(e){return"attribute "+e+";"}).join(`
`)}
varying vec4 v_prop_hitColor;
${this.varyings_.map(function(e){return"varying "+e.type+" "+e.name+";"}).join(`
`)}
${this.vertexShaderFunctions_.join(`
`)}
void main(void) {
  gl_Position = u_projectionMatrix * vec4(a_position, u_depth, 1.0);
  v_prop_hitColor = a_prop_hitColor;
${this.varyings_.map(function(e){return"  "+e.name+" = "+e.expression+";"}).join(`
`)}
}`:null}getFillFragmentShader(){return this.hasFill_?`${I}
${this.uniforms_.map(function(e){return"uniform "+e+";"}).join(`
`)}
varying vec4 v_prop_hitColor;
${this.varyings_.map(function(e){return"varying "+e.type+" "+e.name+";"}).join(`
`)}
${this.fragmentShaderFunctions_.join(`
`)}
vec2 pxToWorld(vec2 pxPos) {
  vec2 screenPos = 2.0 * pxPos / u_viewportSizePx - 1.0;
  return (u_screenToWorldMatrix * vec4(screenPos, 0.0, 1.0)).xy;
}

vec2 worldToPx(vec2 worldPos) {
  vec4 screenPos = u_projectionMatrix * vec4(worldPos, 0.0, 1.0);
  return (0.5 * screenPos.xy + 0.5) * u_viewportSizePx;
}

void main(void) {
  vec2 pxPos = gl_FragCoord.xy / u_pixelRatio;
  vec2 pxOrigin = worldToPx(u_patternOrigin);
  #ifdef GL_FRAGMENT_PRECISION_HIGH
  vec2 worldPos = pxToWorld(pxPos);
  if (
    abs(u_renderExtent[0] - u_renderExtent[2]) > 0.0 && (
      worldPos[0] < u_renderExtent[0] ||
      worldPos[1] < u_renderExtent[1] ||
      worldPos[0] > u_renderExtent[2] ||
      worldPos[1] > u_renderExtent[3]
    )
  ) {
    discard;
  }
  #endif
  if (${this.discardExpression_}) { discard; }
  gl_FragColor = ${this.fillColorExpression_} * u_globalAlpha;
  if (u_hitDetection > 0) {
    if (gl_FragColor.a < 0.1) { discard; };
    gl_FragColor = v_prop_hitColor;
  }
}`:null}};var y={BLUR:"blur",GRADIENT:"gradient",RADIUS:"radius"},pr=["#00f","#0ff","#0f0","#ff0","#f00"],Se=class extends H{constructor(e){e=e||{};let t=Object.assign({},e);delete t.gradient,delete t.radius,delete t.blur,delete t.weight,super(t),this.gradient_=null,this.addChangeListener(y.GRADIENT,this.handleGradientChanged_),this.setGradient(e.gradient?e.gradient:pr),this.setBlur(e.blur!==void 0?e.blur:15),this.setRadius(e.radius!==void 0?e.radius:8);let n=e.weight?e.weight:"weight";typeof n=="string"?this.weightFunction_=function(i){return i.get(n)}:this.weightFunction_=n,this.setRenderOrder(null)}getBlur(){return this.get(y.BLUR)}getGradient(){return this.get(y.GRADIENT)}getRadius(){return this.get(y.RADIUS)}handleGradientChanged_(){this.gradient_=xr(this.getGradient())}setBlur(e){this.set(y.BLUR,e)}setGradient(e){this.set(y.GRADIENT,e)}setRadius(e){this.set(y.RADIUS,e)}createRenderer(){let e=new te().addAttribute("float a_prop_weight").addVarying("v_prop_weight","float","a_prop_weight").addUniform("float u_size").addUniform("float u_blurSlope").setSymbolSizeExpression("vec2(u_size)").setSymbolColorExpression("vec4(smoothstep(0., 1., (1. - length(coordsPx * 2. / v_quadSizePx)) * u_blurSlope) * v_prop_weight)");return new At(this,{className:this.getClassName(),attributes:[{name:"weight",callback:t=>{let n=this.weightFunction_(t);return n!==void 0?Oe(n,0,1):1}}],uniforms:{u_size:()=>(this.get(y.RADIUS)+this.get(y.BLUR))*2,u_blurSlope:()=>this.get(y.RADIUS)/Math.max(1,this.get(y.BLUR))},hitDetectionEnabled:!0,vertexShader:e.getSymbolVertexShader(),fragmentShader:e.getSymbolFragmentShader(),postProcesses:[{fragmentShader:`
            precision mediump float;

            uniform sampler2D u_image;
            uniform sampler2D u_gradientTexture;
            uniform float u_opacity;

            varying vec2 v_texCoord;

            void main() {
              vec4 color = texture2D(u_image, v_texCoord);
              gl_FragColor.a = color.a * u_opacity;
              gl_FragColor.rgb = texture2D(u_gradientTexture, vec2(0.5, color.a)).rgb;
              gl_FragColor.rgb *= gl_FragColor.a;
            }`,uniforms:{u_gradientTexture:()=>this.gradient_,u_opacity:()=>this.getOpacity()}}]})}renderDeclutter(){}};function xr(r){let n=Ye(1,256),i=n.createLinearGradient(0,0,1,256),o=1/(r.length-1);for(let s=0,a=r.length;s<a;++s)i.addColorStop(s*o,r[s]);return n.fillStyle=i,n.fillRect(0,0,1,256),n.canvas}var dr=Se;export{dr as a};
