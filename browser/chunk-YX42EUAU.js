import{$ as A,A as ye,B as lt,C as ct,D as R,Da as yt,E as ht,F as ut,G as W,H as ft,Ha as X,I as te,J as V,K as Re,M as pt,O as dt,Q as Pe,S as L,U as B,V as gt,W as $,X as _,Y as N,Z as T,_ as P,aa as _t,b as qe,ba as mt,c as Je,ca as re,d as Qe,da as xt,e as j,ea as d,f as et,fa as ne,ga as Et,h as x,ha as Tt,i as tt,j as U,k as ve,l as rt,m as nt,o as it,oa as ie,p as ot,pa as oe,qa as vt,r as st,x as at}from"./chunk-A6CGQVP3.js";import{a as v,b as ee,h as Ke}from"./chunk-FJYW2LMB.js";function se(){return[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}function H(n,e){return n[0]=e[0],n[1]=e[1],n[4]=e[2],n[5]=e[3],n[12]=e[4],n[13]=e[5],n}var Z=34962,Y=34963,Pt=35040,St=35044,K=35048,Ct=5121,bt=5123,Ft=5125,Se=5126,Rt=["experimental-webgl","webgl","webkit-3d","moz-webgl"];function At(n,e){e=Object.assign({preserveDrawingBuffer:!0,antialias:!tt},e);let t=Rt.length;for(let r=0;r<t;++r)try{let o=n.getContext(Rt[r],e);if(o)return o}catch{}return null}var er={STATIC_DRAW:St,STREAM_DRAW:Pt,DYNAMIC_DRAW:K},Ce=class{constructor(e,t){this.array_=null,this.type_=e,U(e===Z||e===Y,"A `WebGLArrayBuffer` must either be of type `ELEMENT_ARRAY_BUFFER` or `ARRAY_BUFFER`"),this.usage_=t!==void 0?t:er.STATIC_DRAW}ofSize(e){return this.array_=new(ae(this.type_))(e),this}fromArray(e){return this.array_=ae(this.type_).from(e),this}fromArrayBuffer(e){return this.array_=new(ae(this.type_))(e),this}getType(){return this.type_}getArray(){return this.array_}setArray(e){let t=ae(this.type_);if(!(e instanceof t))throw new Error(`Expected ${t}`);this.array_=e}getUsage(){return this.usage_}getSize(){return this.array_?this.array_.length:0}};function ae(n){switch(n){case Z:return Float32Array;case Y:return Uint32Array;default:return Float32Array}}var be=Ce;var q={LOST:"webglcontextlost",RESTORED:"webglcontextrestored"};var tr=`
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
`,rr=`
  precision mediump float;

  uniform sampler2D u_image;
  uniform float u_opacity;

  varying vec2 v_texCoord;

  void main() {
    gl_FragColor = texture2D(u_image, v_texCoord) * u_opacity;
  }
`,Fe=class{constructor(e){this.gl_=e.webGlContext;let t=this.gl_;this.scaleRatio_=e.scaleRatio||1,this.renderTargetTexture_=t.createTexture(),this.renderTargetTextureSize_=null,this.frameBuffer_=t.createFramebuffer(),this.depthBuffer_=t.createRenderbuffer();let r=t.createShader(t.VERTEX_SHADER);t.shaderSource(r,e.vertexShader||tr),t.compileShader(r);let o=t.createShader(t.FRAGMENT_SHADER);t.shaderSource(o,e.fragmentShader||rr),t.compileShader(o),this.renderTargetProgram_=t.createProgram(),t.attachShader(this.renderTargetProgram_,r),t.attachShader(this.renderTargetProgram_,o),t.linkProgram(this.renderTargetProgram_),this.renderTargetVerticesBuffer_=t.createBuffer();let i=[-1,-1,1,-1,-1,1,1,-1,1,1,-1,1];t.bindBuffer(t.ARRAY_BUFFER,this.renderTargetVerticesBuffer_),t.bufferData(t.ARRAY_BUFFER,new Float32Array(i),t.STATIC_DRAW),this.renderTargetAttribLocation_=t.getAttribLocation(this.renderTargetProgram_,"a_position"),this.renderTargetUniformLocation_=t.getUniformLocation(this.renderTargetProgram_,"u_screenSize"),this.renderTargetOpacityLocation_=t.getUniformLocation(this.renderTargetProgram_,"u_opacity"),this.renderTargetTextureLocation_=t.getUniformLocation(this.renderTargetProgram_,"u_image"),this.uniforms_=[],e.uniforms&&Object.keys(e.uniforms).forEach(s=>{this.uniforms_.push({value:e.uniforms[s],location:t.getUniformLocation(this.renderTargetProgram_,s)})})}getRenderTargetTexture(){return this.renderTargetTexture_}getGL(){return this.gl_}init(e){let t=this.getGL(),r=[t.drawingBufferWidth*this.scaleRatio_,t.drawingBufferHeight*this.scaleRatio_];if(t.bindFramebuffer(t.FRAMEBUFFER,this.getFrameBuffer()),t.bindRenderbuffer(t.RENDERBUFFER,this.getDepthBuffer()),t.viewport(0,0,r[0],r[1]),!this.renderTargetTextureSize_||this.renderTargetTextureSize_[0]!==r[0]||this.renderTargetTextureSize_[1]!==r[1]){this.renderTargetTextureSize_=r;let o=0,i=t.RGBA,s=0,a=t.RGBA,l=t.UNSIGNED_BYTE,c=null;t.bindTexture(t.TEXTURE_2D,this.renderTargetTexture_),t.texImage2D(t.TEXTURE_2D,o,i,r[0],r[1],s,a,l,c),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,this.renderTargetTexture_,0),t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_COMPONENT16,r[0],r[1]),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,this.depthBuffer_)}}apply(e,t,r,o){let i=this.getGL(),s=e.size;if(i.bindFramebuffer(i.FRAMEBUFFER,t?t.getFrameBuffer():null),i.activeTexture(i.TEXTURE0),i.bindTexture(i.TEXTURE_2D,this.renderTargetTexture_),!t){let l=x(i.canvas);if(!e.renderTargets[l]){let c=i.getContextAttributes();c&&c.preserveDrawingBuffer&&(i.clearColor(0,0,0,0),i.clearDepth(1),i.clear(i.COLOR_BUFFER_BIT|i.DEPTH_BUFFER_BIT)),e.renderTargets[l]=!0}}i.disable(i.DEPTH_TEST),i.enable(i.BLEND),i.blendFunc(i.ONE,i.ONE_MINUS_SRC_ALPHA),i.viewport(0,0,i.drawingBufferWidth,i.drawingBufferHeight),i.bindBuffer(i.ARRAY_BUFFER,this.renderTargetVerticesBuffer_),i.useProgram(this.renderTargetProgram_),i.enableVertexAttribArray(this.renderTargetAttribLocation_),i.vertexAttribPointer(this.renderTargetAttribLocation_,2,i.FLOAT,!1,0,0),i.uniform2f(this.renderTargetUniformLocation_,s[0],s[1]),i.uniform1i(this.renderTargetTextureLocation_,0);let a=e.layerStatesArray[e.layerIndex].opacity;i.uniform1f(this.renderTargetOpacityLocation_,a),this.applyUniforms(e),r&&r(i,e),i.drawArrays(i.TRIANGLES,0,6),o&&o(i,e)}getFrameBuffer(){return this.frameBuffer_}getDepthBuffer(){return this.depthBuffer_}applyUniforms(e){let t=this.getGL(),r,o=1;this.uniforms_.forEach(function(i){if(r=typeof i.value=="function"?i.value(e):i.value,r instanceof HTMLCanvasElement||r instanceof ImageData)i.texture||(i.texture=t.createTexture()),t.activeTexture(t[`TEXTURE${o}`]),t.bindTexture(t.TEXTURE_2D,i.texture),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),r instanceof ImageData?t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,r.width,r.height,0,t.UNSIGNED_BYTE,new Uint8Array(r.data)):t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,r),t.uniform1i(i.location,o++);else if(Array.isArray(r))switch(r.length){case 2:t.uniform2f(i.location,r[0],r[1]);return;case 3:t.uniform3f(i.location,r[0],r[1],r[2]);return;case 4:t.uniform4f(i.location,r[0],r[1],r[2],r[3]);return;default:return}else typeof r=="number"&&t.uniform1f(i.location,r)})}},Ae=Fe;var C={PROJECTION_MATRIX:"u_projectionMatrix",SCREEN_TO_WORLD_MATRIX:"u_screenToWorldMatrix",TIME:"u_time",ZOOM:"u_zoom",RESOLUTION:"u_resolution",ROTATION:"u_rotation",VIEWPORT_SIZE_PX:"u_viewportSizePx",PIXEL_RATIO:"u_pixelRatio",HIT_DETECTION:"u_hitDetection"},E={UNSIGNED_BYTE:Ct,UNSIGNED_SHORT:bt,UNSIGNED_INT:Ft,FLOAT:Se},le={};function wt(n){return"shared/"+n}var Dt=0;function nr(){let n="unique/"+Dt;return Dt+=1,n}function ir(n){let e=le[n];if(!e){let t=document.createElement("canvas");t.width=1,t.height=1,t.style.position="absolute",t.style.left="0",e={users:0,context:At(t)},le[n]=e}return e.users+=1,e.context}function or(n){let e=le[n];if(!e||(e.users-=1,e.users>0))return;let t=e.context,r=t.getExtension("WEBGL_lose_context");r&&r.loseContext();let o=t.canvas;o.width=1,o.height=1,delete le[n]}var we=class extends qe{constructor(e){super(),e=e||{},this.boundHandleWebGLContextLost_=this.handleWebGLContextLost.bind(this),this.boundHandleWebGLContextRestored_=this.handleWebGLContextRestored.bind(this),this.canvasCacheKey_=e.canvasCacheKey?wt(e.canvasCacheKey):nr(),this.gl_=ir(this.canvasCacheKey_),this.bufferCache_={},this.extensionCache_={},this.currentProgram_=null,this.needsToBeRecreated_=!1;let t=this.gl_.canvas;t.addEventListener(q.LOST,this.boundHandleWebGLContextLost_),t.addEventListener(q.RESTORED,this.boundHandleWebGLContextRestored_),this.offsetRotateMatrix_=R(),this.offsetScaleMatrix_=R(),this.tmpMat4_=se(),this.uniformLocationsByProgram_={},this.attribLocationsByProgram_={},this.uniforms_=[],e.uniforms&&this.setUniforms(e.uniforms),this.postProcessPasses_=e.postProcesses?e.postProcesses.map(r=>new Ae({webGlContext:this.gl_,scaleRatio:r.scaleRatio,vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,uniforms:r.uniforms})):[new Ae({webGlContext:this.gl_})],this.shaderCompileErrors_=null,this.startTime_=Date.now()}setUniforms(e){this.uniforms_=[],this.addUniforms(e)}addUniforms(e){for(let t in e)this.uniforms_.push({name:t,value:e[t]})}canvasCacheKeyMatches(e){return this.canvasCacheKey_===wt(e)}getExtension(e){if(e in this.extensionCache_)return this.extensionCache_[e];let t=this.gl_.getExtension(e);return this.extensionCache_[e]=t,t}bindBuffer(e){let t=this.gl_,r=x(e),o=this.bufferCache_[r];if(!o){let i=t.createBuffer();o={buffer:e,webGlBuffer:i},this.bufferCache_[r]=o}t.bindBuffer(e.getType(),o.webGlBuffer)}flushBufferData(e){let t=this.gl_;this.bindBuffer(e),t.bufferData(e.getType(),e.getArray(),e.getUsage())}deleteBuffer(e){let t=x(e);delete this.bufferCache_[t]}disposeInternal(){let e=this.gl_.canvas;e.removeEventListener(q.LOST,this.boundHandleWebGLContextLost_),e.removeEventListener(q.RESTORED,this.boundHandleWebGLContextRestored_),or(this.canvasCacheKey_),delete this.gl_}prepareDraw(e,t,r){let o=this.gl_,i=this.getCanvas(),s=e.size,a=e.pixelRatio;(i.width!==s[0]*a||i.height!==s[1]*a)&&(i.width=s[0]*a,i.height=s[1]*a,i.style.width=s[0]+"px",i.style.height=s[1]+"px");for(let l=this.postProcessPasses_.length-1;l>=0;l--)this.postProcessPasses_[l].init(e);o.bindTexture(o.TEXTURE_2D,null),o.clearColor(0,0,0,0),o.depthRange(0,1),o.clearDepth(1),o.clear(o.COLOR_BUFFER_BIT|o.DEPTH_BUFFER_BIT),o.enable(o.BLEND),o.blendFunc(o.ONE,t?o.ZERO:o.ONE_MINUS_SRC_ALPHA),r?(o.enable(o.DEPTH_TEST),o.depthFunc(o.LEQUAL)):o.disable(o.DEPTH_TEST)}bindFrameBuffer(e,t){let r=this.getGL();r.bindFramebuffer(r.FRAMEBUFFER,e),t&&r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,t,0)}bindInitialFrameBuffer(){let e=this.getGL(),t=this.postProcessPasses_[0].getFrameBuffer();e.bindFramebuffer(e.FRAMEBUFFER,t);let r=this.postProcessPasses_[0].getRenderTargetTexture();e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0)}bindTexture(e,t,r){let o=this.gl_;o.activeTexture(o.TEXTURE0+t),o.bindTexture(o.TEXTURE_2D,e),o.uniform1i(this.getUniformLocation(r),t)}bindAttribute(e,t,r){let o=this.getGL();this.bindBuffer(e);let i=this.getAttributeLocation(t);o.enableVertexAttribArray(i),o.vertexAttribPointer(i,r,o.FLOAT,!1,0,0)}prepareDrawToRenderTarget(e,t,r,o){let i=this.gl_,s=t.getSize();i.bindFramebuffer(i.FRAMEBUFFER,t.getFramebuffer()),i.bindRenderbuffer(i.RENDERBUFFER,t.getDepthbuffer()),i.viewport(0,0,s[0],s[1]),i.bindTexture(i.TEXTURE_2D,t.getTexture()),i.clearColor(0,0,0,0),i.depthRange(0,1),i.clearDepth(1),i.clear(i.COLOR_BUFFER_BIT|i.DEPTH_BUFFER_BIT),i.enable(i.BLEND),i.blendFunc(i.ONE,r?i.ZERO:i.ONE_MINUS_SRC_ALPHA),o?(i.enable(i.DEPTH_TEST),i.depthFunc(i.LEQUAL)):i.disable(i.DEPTH_TEST)}drawElements(e,t){let r=this.gl_;this.getExtension("OES_element_index_uint");let o=r.UNSIGNED_INT,i=4,s=t-e,a=e*i;r.drawElements(r.TRIANGLES,s,o,a)}finalizeDraw(e,t,r){for(let o=0,i=this.postProcessPasses_.length;o<i;o++)o===i-1?this.postProcessPasses_[o].apply(e,null,t,r):this.postProcessPasses_[o].apply(e,this.postProcessPasses_[o+1])}getCanvas(){return this.gl_.canvas}getGL(){return this.gl_}applyFrameState(e){let t=e.size,r=e.viewState.rotation,o=e.pixelRatio;this.setUniformFloatValue(C.TIME,(Date.now()-this.startTime_)*.001),this.setUniformFloatValue(C.ZOOM,e.viewState.zoom),this.setUniformFloatValue(C.RESOLUTION,e.viewState.resolution),this.setUniformFloatValue(C.PIXEL_RATIO,o),this.setUniformFloatVec2(C.VIEWPORT_SIZE_PX,[t[0],t[1]]),this.setUniformFloatValue(C.ROTATION,r)}applyHitDetectionUniform(e){let t=this.getUniformLocation(C.HIT_DETECTION);this.getGL().uniform1i(t,e?1:0),e&&this.setUniformFloatValue(C.PIXEL_RATIO,.5)}applyUniforms(e){let t=this.gl_,r,o=0;this.uniforms_.forEach(i=>{if(r=typeof i.value=="function"?i.value(e):i.value,r instanceof HTMLCanvasElement||r instanceof HTMLImageElement||r instanceof ImageData||r instanceof WebGLTexture){r instanceof WebGLTexture&&!i.texture?(i.prevValue=void 0,i.texture=r):i.texture||(i.prevValue=void 0,i.texture=t.createTexture()),this.bindTexture(i.texture,o,i.name),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);let s=!(r instanceof HTMLImageElement)||r.complete;!(r instanceof WebGLTexture)&&s&&i.prevValue!==r&&(i.prevValue=r,t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,r)),o++}else if(Array.isArray(r)&&r.length===6)this.setUniformMatrixValue(i.name,H(this.tmpMat4_,r));else if(Array.isArray(r)&&r.length<=4)switch(r.length){case 2:t.uniform2f(this.getUniformLocation(i.name),r[0],r[1]);return;case 3:t.uniform3f(this.getUniformLocation(i.name),r[0],r[1],r[2]);return;case 4:t.uniform4f(this.getUniformLocation(i.name),r[0],r[1],r[2],r[3]);return;default:return}else typeof r=="number"&&t.uniform1f(this.getUniformLocation(i.name),r)})}useProgram(e,t){this.gl_.useProgram(e),this.currentProgram_=e,t&&(this.applyFrameState(t),this.applyUniforms(t))}compileShader(e,t){let r=this.gl_,o=r.createShader(t);return r.shaderSource(o,e),r.compileShader(o),o}getProgram(e,t){let r=this.gl_,o=this.compileShader(e,r.FRAGMENT_SHADER),i=this.compileShader(t,r.VERTEX_SHADER),s=r.createProgram();if(r.attachShader(s,o),r.attachShader(s,i),r.linkProgram(s),!r.getShaderParameter(o,r.COMPILE_STATUS)){let a=`Fragment shader compilation failed: ${r.getShaderInfoLog(o)}`;throw new Error(a)}if(r.deleteShader(o),!r.getShaderParameter(i,r.COMPILE_STATUS)){let a=`Vertex shader compilation failed: ${r.getShaderInfoLog(i)}`;throw new Error(a)}if(r.deleteShader(i),!r.getProgramParameter(s,r.LINK_STATUS)){let a=`GL program linking failed: ${r.getProgramInfoLog(s)}`;throw new Error(a)}return s}getUniformLocation(e){let t=x(this.currentProgram_);return this.uniformLocationsByProgram_[t]===void 0&&(this.uniformLocationsByProgram_[t]={}),this.uniformLocationsByProgram_[t][e]===void 0&&(this.uniformLocationsByProgram_[t][e]=this.gl_.getUniformLocation(this.currentProgram_,e)),this.uniformLocationsByProgram_[t][e]}getAttributeLocation(e){let t=x(this.currentProgram_);return this.attribLocationsByProgram_[t]===void 0&&(this.attribLocationsByProgram_[t]={}),this.attribLocationsByProgram_[t][e]===void 0&&(this.attribLocationsByProgram_[t][e]=this.gl_.getAttribLocation(this.currentProgram_,e)),this.attribLocationsByProgram_[t][e]}makeProjectionTransform(e,t){let r=e.size,o=e.viewState.rotation,i=e.viewState.resolution,s=e.viewState.center;return te(t,0,0,2/(i*r[0]),2/(i*r[1]),-o,-s[0],-s[1]),t}setUniformFloatValue(e,t){this.gl_.uniform1f(this.getUniformLocation(e),t)}setUniformFloatVec2(e,t){this.gl_.uniform2fv(this.getUniformLocation(e),t)}setUniformFloatVec4(e,t){this.gl_.uniform4fv(this.getUniformLocation(e),t)}setUniformMatrixValue(e,t){this.gl_.uniformMatrix4fv(this.getUniformLocation(e),!1,t)}enableAttributeArray_(e,t,r,o,i){let s=this.getAttributeLocation(e);s<0||(this.gl_.enableVertexAttribArray(s),this.gl_.vertexAttribPointer(s,t,r,!1,o,i))}enableAttributes(e){let t=sr(e),r=0;for(let o=0;o<e.length;o++){let i=e[o];this.enableAttributeArray_(i.name,i.size,i.type||Se,t,r),r+=i.size*$t(i.type)}}handleWebGLContextLost(e){Qe(this.bufferCache_),this.currentProgram_=null,e.preventDefault()}handleWebGLContextRestored(){this.needsToBeRecreated_=!0}needsToBeRecreated(){return this.needsToBeRecreated_}createTexture(e,t,r,o){let i=this.gl_;r=r||i.createTexture();let s=o?i.NEAREST:i.LINEAR;i.bindTexture(i.TEXTURE_2D,r),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,s),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,s),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE);let a=0,l=i.RGBA,c=0,h=i.RGBA,f=i.UNSIGNED_BYTE;return t instanceof Uint8Array?i.texImage2D(i.TEXTURE_2D,a,l,e[0],e[1],c,h,f,t):t?i.texImage2D(i.TEXTURE_2D,a,l,h,f,t):i.texImage2D(i.TEXTURE_2D,a,l,e[0],e[1],c,h,f,null),r}};function sr(n){let e=0;for(let t=0;t<n.length;t++){let r=n[t];e+=r.size*$t(r.type)}return e}function $t(n){switch(n){case E.UNSIGNED_BYTE:return Uint8Array.BYTES_PER_ELEMENT;case E.UNSIGNED_SHORT:return Uint16Array.BYTES_PER_ELEMENT;case E.UNSIGNED_INT:return Uint32Array.BYTES_PER_ELEMENT;case E.FLOAT:default:return Float32Array.BYTES_PER_ELEMENT}}var Lt=we;var De=class n extends vt{constructor(e,t){super(e),t=t||{},this.inversePixelTransform_=R(),this.postProcesses_=t.postProcesses,this.uniforms_=t.uniforms,this.helper,this.onMapChanged_=()=>{this.clearCache(),this.removeHelper()},e.addChangeListener(Pe.MAP,this.onMapChanged_),this.dispatchPreComposeEvent=this.dispatchPreComposeEvent.bind(this),this.dispatchPostComposeEvent=this.dispatchPostComposeEvent.bind(this)}dispatchPreComposeEvent(e,t){let r=this.getLayer();if(r.hasListener(L.PRECOMPOSE)){let o=new oe(L.PRECOMPOSE,void 0,t,e);r.dispatchEvent(o)}}dispatchPostComposeEvent(e,t){let r=this.getLayer();if(r.hasListener(L.POSTCOMPOSE)){let o=new oe(L.POSTCOMPOSE,void 0,t,e);r.dispatchEvent(o)}}reset(e){this.uniforms_=e.uniforms,this.helper&&this.helper.setUniforms(this.uniforms_)}removeHelper(){this.helper&&(this.helper.dispose(),delete this.helper)}prepareFrame(e){if(this.getLayer().getRenderSource()){let t=!0,r=-1,o;for(let s=0,a=e.layerStatesArray.length;s<a;s++){let l=e.layerStatesArray[s].layer,c=l.getRenderer();if(!(c instanceof n)){t=!0;continue}let h=l.getClassName();if((t||h!==o)&&(r+=1,t=!1),o=h,c===this)break}let i="map/"+e.mapId+"/group/"+r;(!this.helper||!this.helper.canvasCacheKeyMatches(i)||this.helper.needsToBeRecreated())&&(this.removeHelper(),this.helper=new Lt({postProcesses:this.postProcesses_,uniforms:this.uniforms_,canvasCacheKey:i}),o&&(this.helper.getCanvas().className=o),this.afterHelperCreated())}return this.prepareFrameInternal(e)}afterHelperCreated(){}prepareFrameInternal(e){return!0}clearCache(){}disposeInternal(){this.clearCache(),this.removeHelper(),this.getLayer()?.removeChangeListener(Pe.MAP,this.onMapChanged_),super.disposeInternal()}dispatchRenderEvent_(e,t,r){let o=this.getLayer();if(o.hasListener(e)){te(this.inversePixelTransform_,0,0,r.pixelRatio,-r.pixelRatio,0,0,-r.size[1]);let i=new oe(e,this.inversePixelTransform_,r,t);o.dispatchEvent(i)}}preRender(e,t){this.dispatchRenderEvent_(L.PRERENDER,e,t)}postRender(e,t){this.dispatchRenderEvent_(L.POSTRENDER,e,t)}},Bt=De;var Nt={TILE_TRANSFORM:"u_tileTransform",TRANSITION_ALPHA:"u_transitionAlpha",DEPTH:"u_depth",RENDER_EXTENT:"u_renderExtent",PATTERN_ORIGIN:"u_patternOrigin",RESOLUTION:"u_resolution",ZOOM:"u_zoom",GLOBAL_ALPHA:"u_globalAlpha",PROJECTION_MATRIX:"u_projectionMatrix",SCREEN_TO_WORLD_MATRIX:"u_screenToWorldMatrix"};var ce=ee(v({},Nt),{TILE_TEXTURE_ARRAY:"u_tileTextures",TEXTURE_PIXEL_WIDTH:"u_texturePixelWidth",TEXTURE_PIXEL_HEIGHT:"u_texturePixelHeight",TEXTURE_RESOLUTION:"u_textureResolution",TEXTURE_ORIGIN_X:"u_textureOriginX",TEXTURE_ORIGIN_Y:"u_textureOriginY"}),lr={TEXTURE_COORD:"a_textureCoord"},ln=[{name:lr.TEXTURE_COORD,size:2,type:E.FLOAT}];var $e=class{constructor(e,t){this.name=e,this.data=t,this.texture_=null}getTexture(e){if(!this.texture_){let t=e.createTexture();e.bindTexture(e.TEXTURE_2D,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,this.data.length/4,1,0,e.RGBA,e.UNSIGNED_BYTE,this.data),this.texture_=t}return this.texture_}delete(e){this.texture_&&e.deleteTexture(this.texture_),this.texture_=null}},It=$e;function cr(n,e){return`operator_${n}_${Object.keys(e.functions).length}`}function w(n){let e=n.toString();return e.includes(".")?e:e+".0"}function Ne(n){if(n.length<2||n.length>4)throw new Error("`formatArray` can only output `vec2`, `vec3` or `vec4` arrays.");return`vec${n.length}(${n.map(w).join(", ")})`}function J(n){let e=B(n),t=e.length>3?e[3]:1;return Ne([e[0]/255,e[1]/255,e[2]/255,t])}function hr(n){let e=gt(n);return Ne(e)}var Le={},ur=0;function I(n){return n in Le||(Le[n]=ur++),Le[n]}function S(n){return w(I(n))}function he(n){return"u_var_"+n}function ue(){return{variables:{},properties:{},functions:{},bandCount:0,featureId:!1,geometryType:!1}}var Be="getBandValue",fr="u_paletteTextures",Ie="featureId",Ue="geometryType",fe=-9999999;function Ut(n,e,t,r){let o=xt(n,e,t);return Oe(o,e,r)}function g(n){return(e,t,r)=>{let o=t.args.length,i=new Array(o);for(let s=0;s<o;++s)i[s]=Oe(t.args[s],r,e);return n(i,e)}}var pr={[d.Get]:(n,e)=>{let r=e.args[0].value;return r in n.properties||(n.properties[r]={name:r,type:e.type}),"a_prop_"+r},[d.Id]:n=>(n.featureId=!0,"a_"+Ie),[d.GeometryType]:n=>(n.geometryType=!0,"a_"+Ue),[d.LineMetric]:()=>"currentLineMetric",[d.Var]:(n,e)=>{let r=e.args[0].value;return r in n.variables||(n.variables[r]={name:r,type:e.type}),he(r)},[d.Has]:(n,e)=>{let r=e.args[0].value;return r in n.properties||(n.properties[r]={name:r,type:e.type}),`(a_prop_${r} != ${w(fe)})`},[d.Resolution]:()=>"u_resolution",[d.Zoom]:()=>"u_zoom",[d.Time]:()=>"u_time",[d.Any]:g(n=>`(${n.join(" || ")})`),[d.All]:g(n=>`(${n.join(" && ")})`),[d.Not]:g(([n])=>`(!${n})`),[d.Equal]:g(([n,e])=>`(${n} == ${e})`),[d.NotEqual]:g(([n,e])=>`(${n} != ${e})`),[d.GreaterThan]:g(([n,e])=>`(${n} > ${e})`),[d.GreaterThanOrEqualTo]:g(([n,e])=>`(${n} >= ${e})`),[d.LessThan]:g(([n,e])=>`(${n} < ${e})`),[d.LessThanOrEqualTo]:g(([n,e])=>`(${n} <= ${e})`),[d.Multiply]:g(n=>`(${n.join(" * ")})`),[d.Divide]:g(([n,e])=>`(${n} / ${e})`),[d.Add]:g(n=>`(${n.join(" + ")})`),[d.Subtract]:g(([n,e])=>`(${n} - ${e})`),[d.Clamp]:g(([n,e,t])=>`clamp(${n}, ${e}, ${t})`),[d.Mod]:g(([n,e])=>`mod(${n}, ${e})`),[d.Pow]:g(([n,e])=>`pow(${n}, ${e})`),[d.Abs]:g(([n])=>`abs(${n})`),[d.Floor]:g(([n])=>`floor(${n})`),[d.Ceil]:g(([n])=>`ceil(${n})`),[d.Round]:g(([n])=>`floor(${n} + 0.5)`),[d.Sin]:g(([n])=>`sin(${n})`),[d.Cos]:g(([n])=>`cos(${n})`),[d.Atan]:g(([n,e])=>e!==void 0?`atan(${n}, ${e})`:`atan(${n})`),[d.Sqrt]:g(([n])=>`sqrt(${n})`),[d.Match]:g(n=>{let e=n[0],t=n[n.length-1],r=null;for(let o=n.length-3;o>=1;o-=2){let i=n[o],s=n[o+1];r=`(${e} == ${i} ? ${s} : ${r||t})`}return r}),[d.Between]:g(([n,e,t])=>`(${n} >= ${e} && ${n} <= ${t})`),[d.Interpolate]:g(([n,e,...t])=>{let r="";for(let o=0;o<t.length-2;o+=2){let i=t[o],s=r||t[o+1],a=t[o+2],l=t[o+3],c;n===w(1)?c=`(${e} - ${i}) / (${a} - ${i})`:c=`(pow(${n}, (${e} - ${i})) - 1.0) / (pow(${n}, (${a} - ${i})) - 1.0)`,r=`mix(${s}, ${l}, clamp(${c}, 0.0, 1.0))`}return r}),[d.Case]:g(n=>{let e=n[n.length-1],t=null;for(let r=n.length-3;r>=0;r-=2){let o=n[r],i=n[r+1];t=`(${o} ? ${i} : ${t||e})`}return t}),[d.In]:g(([n,...e],t)=>{let r=cr("in",t),o=[];for(let i=0;i<e.length;i+=1)o.push(`  if (inputValue == ${e[i]}) { return true; }`);return t.functions[r]=`bool ${r}(float inputValue) {
${o.join(`
`)}
  return false;
}`,`${r}(${n})`}),[d.Array]:g(n=>`vec${n.length}(${n.join(", ")})`),[d.Color]:g(n=>{if(n.length===1)return`vec4(vec3(${n[0]} / 255.0), 1.0)`;if(n.length===2)return`vec4(vec3(${n[0]} / 255.0), ${n[1]})`;let e=n.slice(0,3).map(r=>`${r} / 255.0`);if(n.length===3)return`vec4(${e.join(", ")}, 1.0)`;let t=n[3];return`vec4(${e.join(", ")}, ${t})`}),[d.Band]:g(([n,e,t],r)=>{if(!(Be in r.functions)){let o="",i=r.bandCount||1;for(let s=0;s<i;s++){let a=Math.floor(s/4),l=s%4;s===i-1&&l===1&&(l=3);let c=`${ce.TILE_TEXTURE_ARRAY}[${a}]`;o+=`  if (band == ${s+1}.0) {
    return texture2D(${c}, v_textureCoord + vec2(dx, dy))[${l}];
  }
`}r.functions[Be]=`float getBandValue(float band, float xOffset, float yOffset) {
  float dx = xOffset / ${ce.TEXTURE_PIXEL_WIDTH};
  float dy = yOffset / ${ce.TEXTURE_PIXEL_HEIGHT};
${o}
}`}return`${Be}(${n}, ${e??"0.0"}, ${t??"0.0"})`}),[d.Palette]:(n,e)=>{let[t,...r]=e.args,o=r.length,i=new Uint8Array(o*4);for(let c=0;c<r.length;c++){let h=r[c].value,f=B(h),u=c*4;i[u]=f[0],i[u+1]=f[1],i[u+2]=f[2],i[u+3]=f[3]*255}n.paletteTextures||(n.paletteTextures=[]);let s=`${fr}[${n.paletteTextures.length}]`,a=new It(s,i);n.paletteTextures.push(a);let l=Oe(t,_,n);return`texture2D(${s}, vec2((${l} + 0.5) / ${o}.0, 0.5))`}};function Oe(n,e,t){if(n instanceof mt){let r=pr[n.operator];if(r===void 0)throw new Error(`No compiler defined for this operator: ${JSON.stringify(n.operator)}`);return r(t,n,e)}if((n.type&_)>0)return w(n.value);if((n.type&$)>0)return n.value.toString();if((n.type&N)>0)return S(n.value.toString());if((n.type&T)>0)return J(n.value);if((n.type&P)>0)return Ne(n.value);if((n.type&A)>0)return hr(n.value);throw new Error(`Unexpected expression ${n.value} (expected type ${_t(e)})`)}function Ot(){return{"fill-color":"rgba(255,255,255,0.4)","stroke-color":"#3399CC","stroke-width":1.25,"circle-radius":5,"circle-fill-color":"rgba(255,255,255,0.4)","circle-stroke-width":1.25,"circle-stroke-color":"#3399CC"}}var Me=.985;var O=`#ifdef GL_FRAGMENT_PRECISION_HIGH
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
float currentLineMetric = 0.; // an actual value will be used in the stroke shaders
`,M=Ot(),G=class{constructor(){this.uniforms_=[],this.attributes_=[],this.hasSymbol_=!1,this.symbolSizeExpression_=`vec2(${w(M["circle-radius"])} + ${w(M["circle-stroke-width"]*.5)})`,this.symbolRotationExpression_="0.0",this.symbolOffsetExpression_="vec2(0.0)",this.symbolColorExpression_=J(M["circle-fill-color"]),this.texCoordExpression_="vec4(0.0, 0.0, 1.0, 1.0)",this.discardExpression_="false",this.symbolRotateWithView_=!1,this.hasStroke_=!1,this.strokeWidthExpression_=w(M["stroke-width"]),this.strokeColorExpression_=J(M["stroke-color"]),this.strokeOffsetExpression_="0.",this.strokeCapExpression_=S("round"),this.strokeJoinExpression_=S("round"),this.strokeMiterLimitExpression_="10.",this.strokeDistanceFieldExpression_="-1000.",this.hasFill_=!1,this.fillColorExpression_=J(M["fill-color"]),this.vertexShaderFunctions_=[],this.fragmentShaderFunctions_=[]}addUniform(e){return this.uniforms_.push(e),this}addAttribute(e,t,r,o){return this.attributes_.push({name:e,type:t,varyingName:e.replace(/^a_/,"v_"),varyingType:o??t,varyingExpression:r??e}),this}setSymbolSizeExpression(e){return this.hasSymbol_=!0,this.symbolSizeExpression_=e,this}getSymbolSizeExpression(){return this.symbolSizeExpression_}setSymbolRotationExpression(e){return this.symbolRotationExpression_=e,this}setSymbolOffsetExpression(e){return this.symbolOffsetExpression_=e,this}getSymbolOffsetExpression(){return this.symbolOffsetExpression_}setSymbolColorExpression(e){return this.hasSymbol_=!0,this.symbolColorExpression_=e,this}getSymbolColorExpression(){return this.symbolColorExpression_}setTextureCoordinateExpression(e){return this.texCoordExpression_=e,this}setFragmentDiscardExpression(e){return this.discardExpression_=e,this}getFragmentDiscardExpression(){return this.discardExpression_}setSymbolRotateWithView(e){return this.symbolRotateWithView_=e,this}setStrokeWidthExpression(e){return this.hasStroke_=!0,this.strokeWidthExpression_=e,this}setStrokeColorExpression(e){return this.hasStroke_=!0,this.strokeColorExpression_=e,this}getStrokeColorExpression(){return this.strokeColorExpression_}setStrokeOffsetExpression(e){return this.strokeOffsetExpression_=e,this}setStrokeCapExpression(e){return this.strokeCapExpression_=e,this}setStrokeJoinExpression(e){return this.strokeJoinExpression_=e,this}setStrokeMiterLimitExpression(e){return this.strokeMiterLimitExpression_=e,this}setStrokeDistanceFieldExpression(e){return this.strokeDistanceFieldExpression_=e,this}setFillColorExpression(e){return this.hasFill_=!0,this.fillColorExpression_=e,this}getFillColorExpression(){return this.fillColorExpression_}addVertexShaderFunction(e){return this.vertexShaderFunctions_.includes(e)?this:(this.vertexShaderFunctions_.push(e),this)}addFragmentShaderFunction(e){return this.fragmentShaderFunctions_.includes(e)?this:(this.fragmentShaderFunctions_.push(e),this)}getSymbolVertexShader(){return this.hasSymbol_?`${O}
${this.uniforms_.map(e=>`uniform ${e};`).join(`
`)}
attribute vec2 a_position;
attribute float a_index;
attribute vec4 a_hitColor;

varying vec2 v_texCoord;
varying vec2 v_quadCoord;
varying vec4 v_hitColor;
varying vec2 v_centerPx;
varying float v_angle;
varying vec2 v_quadSizePx;

${this.attributes_.map(e=>`attribute ${e.type} ${e.name};
varying ${e.varyingType} ${e.varyingName};`).join(`
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
  v_hitColor = a_hitColor;
  v_angle = angle;
  c = cos(-v_angle);
  s = sin(-v_angle);
  centerOffsetPx = vec2(c * centerOffsetPx.x - s * centerOffsetPx.y, s * centerOffsetPx.x + c * centerOffsetPx.y); 
  v_centerPx = screenToPx(center.xy) + centerOffsetPx;
${this.attributes_.map(e=>`  ${e.varyingName} = ${e.varyingExpression};`).join(`
`)}
}`:null}getSymbolFragmentShader(){return this.hasSymbol_?`${O}
${this.uniforms_.map(e=>`uniform ${e};`).join(`
`)}
varying vec2 v_texCoord;
varying vec4 v_hitColor;
varying vec2 v_centerPx;
varying float v_angle;
varying vec2 v_quadSizePx;
${this.attributes_.map(e=>`varying ${e.varyingType} ${e.varyingName};`).join(`
`)}
${this.fragmentShaderFunctions_.join(`
`)}

void main(void) {
${this.attributes_.map(e=>`  ${e.varyingType} ${e.name} = ${e.varyingName}; // assign to original attribute name`).join(`
`)}
  if (${this.discardExpression_}) { discard; }
  vec2 coordsPx = gl_FragCoord.xy / u_pixelRatio - v_centerPx; // relative to center
  float c = cos(v_angle);
  float s = sin(v_angle);
  coordsPx = vec2(c * coordsPx.x - s * coordsPx.y, s * coordsPx.x + c * coordsPx.y);
  gl_FragColor = ${this.symbolColorExpression_};
  gl_FragColor.rgb *= gl_FragColor.a;
  if (u_hitDetection > 0) {
    if (gl_FragColor.a < 0.05) { discard; };
    gl_FragColor = v_hitColor;
  }
}`:null}getStrokeVertexShader(){return this.hasStroke_?`${O}
${this.uniforms_.map(e=>`uniform ${e};`).join(`
`)}
attribute vec2 a_segmentStart;
attribute vec2 a_segmentEnd;
attribute float a_measureStart;
attribute float a_measureEnd;
attribute float a_parameters;
attribute float a_distance;
attribute vec2 a_joinAngles;
attribute vec4 a_hitColor;

varying vec2 v_segmentStart;
varying vec2 v_segmentEnd;
varying float v_angleStart;
varying float v_angleEnd;
varying float v_width;
varying vec4 v_hitColor;
varying float v_distanceOffsetPx;
varying float v_measureStart;
varying float v_measureEnd;

${this.attributes_.map(e=>`attribute ${e.type} ${e.name};
varying ${e.varyingType} ${e.varyingName};`).join(`
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
  currentLineMetric = vertexNumber < 1.5 ? a_measureStart : a_measureEnd;
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
  if (cos(angle) > ${Me} || isCap(angle)) {
    joinDirection = normalPx * normalDir - tangentPx * tangentDir;
  } else {
    joinDirection = getJoinOffsetDirection(normalPx * normalDir, angle);
  }
  positionPx = positionPx + joinDirection * (lineWidth * 0.5 + 1.); // adding 1 pixel for antialiasing
  gl_Position = pxToScreen(positionPx);

  v_segmentStart = segmentStartPx;
  v_segmentEnd = segmentEndPx;
  v_width = lineWidth;
  v_hitColor = a_hitColor;
  v_distanceOffsetPx = a_distance / u_resolution - (lineOffsetPx * angleTangentSum);
  v_measureStart = a_measureStart;
  v_measureEnd = a_measureEnd;
${this.attributes_.map(e=>`  ${e.varyingName} = ${e.varyingExpression};`).join(`
`)}
}`:null}getStrokeFragmentShader(){return this.hasStroke_?`${O}
${this.uniforms_.map(e=>`uniform ${e};`).join(`
`)}
varying vec2 v_segmentStart;
varying vec2 v_segmentEnd;
varying float v_angleStart;
varying float v_angleEnd;
varying float v_width;
varying vec4 v_hitColor;
varying float v_distanceOffsetPx;
varying float v_measureStart;
varying float v_measureEnd;
${this.attributes_.map(e=>`varying ${e.varyingType} ${e.varyingName};`).join(`
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
  if (cos(joinAngle) > ${Me}) { // avoid risking a division by zero
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

float distanceFromSegment(vec2 point, vec2 start, vec2 end) {
  vec2 tangent = end - start;
  vec2 startToPoint = point - start;
  // inspire by capsule fn in https://iquilezles.org/articles/distfunctions/
  float h = clamp(dot(startToPoint, tangent) / dot(tangent, tangent), 0.0, 1.0);
  return length(startToPoint - tangent * h);
}

void main(void) {
${this.attributes_.map(e=>`  ${e.varyingType} ${e.name} = ${e.varyingName}; // assign to original attribute name`).join(`
`)}
      
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

  float segmentLength = length(v_segmentEnd - v_segmentStart);
  vec2 segmentTangent = (v_segmentEnd - v_segmentStart) / segmentLength;
  vec2 segmentNormal = vec2(-segmentTangent.y, segmentTangent.x);
  vec2 startToPoint = currentPoint - v_segmentStart;
  float lengthToPoint = max(0., min(dot(segmentTangent, startToPoint), segmentLength));
  float currentLengthPx = lengthToPoint + v_distanceOffsetPx;
  float currentRadiusPx = distanceFromSegment(currentPoint, v_segmentStart, v_segmentEnd);
  float currentRadiusRatio = dot(segmentNormal, startToPoint) * 2. / v_width;
  currentLineMetric = mix(v_measureStart, v_measureEnd, lengthToPoint / segmentLength);

  if (${this.discardExpression_}) { discard; }

  float capType = ${this.strokeCapExpression_};
  float joinType = ${this.strokeJoinExpression_};
  float segmentStartDistance = computeSegmentPointDistance(currentPoint, v_segmentStart, v_segmentEnd, v_width, v_angleStart, capType, joinType);
  float segmentEndDistance = computeSegmentPointDistance(currentPoint, v_segmentEnd, v_segmentStart, v_width, v_angleEnd, capType, joinType);
  float distanceField = max(
    segmentDistanceField(currentPoint, v_segmentStart, v_segmentEnd, v_width),
    max(segmentStartDistance, segmentEndDistance)
  );
  distanceField = max(distanceField, ${this.strokeDistanceFieldExpression_});

  vec4 color = ${this.strokeColorExpression_};
  color.a *= smoothstep(0.5, -0.5, distanceField);
  gl_FragColor = color;
  gl_FragColor.a *= u_globalAlpha;
  gl_FragColor.rgb *= gl_FragColor.a;
  if (u_hitDetection > 0) {
    if (gl_FragColor.a < 0.1) { discard; };
    gl_FragColor = v_hitColor;
  }
}`:null}getFillVertexShader(){return this.hasFill_?`${O}
${this.uniforms_.map(e=>`uniform ${e};`).join(`
`)}
attribute vec2 a_position;
attribute vec4 a_hitColor;

varying vec4 v_hitColor;

${this.attributes_.map(e=>`attribute ${e.type} ${e.name};
varying ${e.varyingType} ${e.varyingName};`).join(`
`)}
${this.vertexShaderFunctions_.join(`
`)}
void main(void) {
  gl_Position = u_projectionMatrix * vec4(a_position, u_depth, 1.0);
  v_hitColor = a_hitColor;
${this.attributes_.map(e=>`  ${e.varyingName} = ${e.varyingExpression};`).join(`
`)}
}`:null}getFillFragmentShader(){return this.hasFill_?`${O}
${this.uniforms_.map(e=>`uniform ${e};`).join(`
`)}
varying vec4 v_hitColor;
${this.attributes_.map(e=>`varying ${e.varyingType} ${e.varyingName};`).join(`
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
${this.attributes_.map(e=>`  ${e.varyingType} ${e.name} = ${e.varyingName}; // assign to original attribute name`).join(`
`)}
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
  gl_FragColor = ${this.fillColorExpression_};
  gl_FragColor.a *= u_globalAlpha;
  gl_FragColor.rgb *= gl_FragColor.a;
  if (u_hitDetection > 0) {
    if (gl_FragColor.a < 0.1) { discard; };
    gl_FragColor = v_hitColor;
  }
}`:null}};function p(n,e,t){let r=re();return Ut(e,t,r,n)}function dr(n){let e=B(n),t=e[0]*256,r=e[1],o=e[2]*256,i=Math.round(e[3]*255);return[t+r,o+i]}var gr=`vec4 unpackColor(vec2 packedColor) {
  return vec4(
    fract(floor(packedColor[0] / 256.0) / 256.0),
    fract(packedColor[0] / 256.0),
    fract(floor(packedColor[1] / 256.0) / 256.0),
    fract(packedColor[1] / 256.0)
  );
}`;function de(n){return n===T||n===A?2:n===P?4:1}function pe(n){let e=de(n);return e>1?`vec${e}`:"float"}function ge(n,e){for(let t in e.variables){let r=e.variables[t],o=he(r.name),i=pe(r.type);r.type===T&&(i="vec4"),n.addUniform(`${i} ${o}`)}for(let t in e.properties){let r=e.properties[t],o=pe(r.type),i=`a_prop_${r.name}`;r.type===T?(n.addAttribute(i,o,`unpackColor(${i})`,"vec4"),n.addVertexShaderFunction(gr)):n.addAttribute(i,o)}for(let t in e.functions)n.addVertexShaderFunction(e.functions[t]),n.addFragmentShaderFunction(e.functions[t])}function _e(n,e){let t={};for(let r in n.variables){let o=n.variables[r],i=he(o.name);t[i]=()=>{let s=e[o.name];return typeof s=="number"?s:typeof s=="boolean"?s?1:0:o.type===T?B(s||"#eee"):typeof s=="string"?I(s):s}}return t}function me(n){let e={};for(let t in n.properties){let r=n.properties[t],o=i=>{let s=i.get(r.name);return r.type===T?dr([...B(s||"#eee")]):typeof s=="string"?I(s):typeof s=="boolean"?s?1:0:s};e[`prop_${r.name}`]={size:de(r.type),callback:o}}return e}var Ge=class n{constructor(){this.globalCounter_=0,this.refToFeature_=new Map,this.uidToRef_=new Map,this.freeGlobalRef_=[],this.polygonBatch={entries:{},geometriesCount:0,verticesCount:0,ringsCount:0},this.pointBatch={entries:{},geometriesCount:0},this.lineStringBatch={entries:{},geometriesCount:0,verticesCount:0}}addFeatures(e,t){for(let r=0;r<e.length;r++)this.addFeature(e[r],t)}addFeature(e,t){let r=e.getGeometry();r&&(t&&(r=r.clone(),r.applyTransform(t)),this.addGeometry_(r,e))}clearFeatureEntryInPointBatch_(e){let t=x(e),r=this.pointBatch.entries[t];if(r)return this.pointBatch.geometriesCount-=r.flatCoordss.length,delete this.pointBatch.entries[t],r}clearFeatureEntryInLineStringBatch_(e){let t=x(e),r=this.lineStringBatch.entries[t];if(r)return this.lineStringBatch.verticesCount-=r.verticesCount,this.lineStringBatch.geometriesCount-=r.flatCoordss.length,delete this.lineStringBatch.entries[t],r}clearFeatureEntryInPolygonBatch_(e){let t=x(e),r=this.polygonBatch.entries[t];if(r)return this.polygonBatch.verticesCount-=r.verticesCount,this.polygonBatch.ringsCount-=r.ringsCount,this.polygonBatch.geometriesCount-=r.flatCoordss.length,delete this.polygonBatch.entries[t],r}addGeometry_(e,t){let r=e.getType();switch(r){case"GeometryCollection":{let o=e.getGeometriesArray();for(let i of o)this.addGeometry_(i,t);break}case"MultiPolygon":{let o=e;this.addCoordinates_(r,o.getFlatCoordinates(),o.getEndss(),t,x(t),o.getStride());break}case"MultiLineString":{let o=e;this.addCoordinates_(r,o.getFlatCoordinates(),o.getEnds(),t,x(t),o.getStride());break}case"MultiPoint":{let o=e;this.addCoordinates_(r,o.getFlatCoordinates(),null,t,x(t),o.getStride());break}case"Polygon":{let o=e;this.addCoordinates_(r,o.getFlatCoordinates(),o.getEnds(),t,x(t),o.getStride());break}case"Point":{let o=e;this.addCoordinates_(r,o.getFlatCoordinates(),null,t,x(t),o.getStride());break}case"LineString":case"LinearRing":{let o=e,i=o.getStride();this.addCoordinates_(r,o.getFlatCoordinates(),null,t,x(t),i,o.getLayout?.());break}default:}}addCoordinates_(e,t,r,o,i,s,a){let l;switch(e){case"MultiPolygon":{let c=r;for(let h=0,f=c.length;h<f;h++){let u=c[h],m=h>0?c[h-1]:null,y=m?m[m.length-1]:0,Te=u[u.length-1];u=y>0?u.map(z=>z-y):u,this.addCoordinates_("Polygon",t.slice(y,Te),u,o,i,s,a)}break}case"MultiLineString":{let c=r;for(let h=0,f=c.length;h<f;h++){let u=h>0?c[h-1]:0;this.addCoordinates_("LineString",t.slice(u,c[h]),null,o,i,s,a)}break}case"MultiPoint":for(let c=0,h=t.length;c<h;c+=s)this.addCoordinates_("Point",t.slice(c,c+2),null,o,i,null,null);break;case"Polygon":{let c=r;if(o instanceof yt){let u=pt(t,c);if(u.length>1){this.addCoordinates_("MultiPolygon",t,u,o,i,s,a);return}}this.polygonBatch.entries[i]||(this.polygonBatch.entries[i]=this.addRefToEntry_(i,{feature:o,flatCoordss:[],verticesCount:0,ringsCount:0,ringsVerticesCounts:[]})),l=t.length/s;let h=r.length,f=r.map((u,m,y)=>m>0?(u-y[m-1])/s:u/s);this.polygonBatch.verticesCount+=l,this.polygonBatch.ringsCount+=h,this.polygonBatch.geometriesCount++,this.polygonBatch.entries[i].flatCoordss.push(_r(t,s)),this.polygonBatch.entries[i].ringsVerticesCounts.push(f),this.polygonBatch.entries[i].verticesCount+=l,this.polygonBatch.entries[i].ringsCount+=h;for(let u=0,m=c.length;u<m;u++){let y=u>0?c[u-1]:0;this.addCoordinates_("LinearRing",t.slice(y,c[u]),null,o,i,s,a)}break}case"Point":this.pointBatch.entries[i]||(this.pointBatch.entries[i]=this.addRefToEntry_(i,{feature:o,flatCoordss:[]})),this.pointBatch.geometriesCount++,this.pointBatch.entries[i].flatCoordss.push(t);break;case"LineString":case"LinearRing":this.lineStringBatch.entries[i]||(this.lineStringBatch.entries[i]=this.addRefToEntry_(i,{feature:o,flatCoordss:[],verticesCount:0})),l=t.length/s,this.lineStringBatch.verticesCount+=l,this.lineStringBatch.geometriesCount++,this.lineStringBatch.entries[i].flatCoordss.push(mr(t,s,a)),this.lineStringBatch.entries[i].verticesCount+=l;break;default:}}addRefToEntry_(e,t){let r=this.uidToRef_.get(e),o=r||this.freeGlobalRef_.pop()||++this.globalCounter_;return t.ref=o,r||(this.refToFeature_.set(o,t.feature),this.uidToRef_.set(e,o)),t}removeRef_(e,t){if(!e)throw new Error("This feature has no ref: "+t);this.refToFeature_.delete(e),this.uidToRef_.delete(t),this.freeGlobalRef_.push(e)}changeFeature(e){if(!this.uidToRef_.get(x(e)))return;this.removeFeature(e);let t=e.getGeometry();t&&this.addGeometry_(t,e)}removeFeature(e){let t=this.clearFeatureEntryInPointBatch_(e);t=this.clearFeatureEntryInPolygonBatch_(e)||t,t=this.clearFeatureEntryInLineStringBatch_(e)||t,t&&this.removeRef_(t.ref,x(t.feature))}clear(){this.polygonBatch.entries={},this.polygonBatch.geometriesCount=0,this.polygonBatch.verticesCount=0,this.polygonBatch.ringsCount=0,this.lineStringBatch.entries={},this.lineStringBatch.geometriesCount=0,this.lineStringBatch.verticesCount=0,this.pointBatch.entries={},this.pointBatch.geometriesCount=0,this.globalCounter_=0,this.freeGlobalRef_=[],this.refToFeature_.clear(),this.uidToRef_.clear()}getFeatureFromRef(e){return this.refToFeature_.get(e)}isEmpty(){return this.globalCounter_===0}filter(e){let t=new n;t.globalCounter_=this.globalCounter_,t.uidToRef_=this.uidToRef_,t.refToFeature_=this.refToFeature_;let r=!0;for(let o of this.refToFeature_.values())e(o)&&(t.addFeature(o),r=!1);return r?new n:t}};function _r(n,e){return e===2?n:n.filter((t,r)=>r%e<2)}function mr(n,e,t){return e===3&&t==="XYM"?n:e===4?n.filter((r,o)=>o%e!==2):e===3?n.map((r,o)=>o%e!==2?r:0):new Array(n.length*1.5).fill(0).map((r,o)=>o%3===2?0:n[Math.round(o/1.5)])}var Mt=Ge;function Gt(){let n='function t(t,n,x=2){const o=n&&n.length,i=o?n[0]*x:t.length;let u=e(t,0,i,x,!0);const l=[];if(!u||u.next===u.prev)return l;let c,h,y;if(o&&(u=function(t,n,r,x){const o=[];for(let r=0,i=n.length;r<i;r++){const u=e(t,n[r]*x,r<i-1?n[r+1]*x:t.length,x,!1);u===u.next&&(u.steiner=!0),o.push(a(u))}o.sort(f);for(let t=0;t<o.length;t++)r=s(o[t],r);return r}(t,n,u,x)),t.length>80*x){c=1/0,h=1/0;let e=-1/0,n=-1/0;for(let r=x;r<i;r+=x){const x=t[r],o=t[r+1];x<c&&(c=x),o<h&&(h=o),x>e&&(e=x),o>n&&(n=o)}y=Math.max(e-c,n-h),y=0!==y?32767/y:0}return r(u,l,x,c,h,y,0),l}function e(t,e,n,r,x){let o;if(x===function(t,e,n,r){let x=0;for(let o=e,i=n-r;o<n;o+=r)x+=(t[i]-t[o])*(t[o+1]+t[i+1]),i=o;return x}(t,e,n,r)>0)for(let x=e;x<n;x+=r)o=w(x/r|0,t[x],t[x+1],o);else for(let x=n-r;x>=e;x-=r)o=w(x/r|0,t[x],t[x+1],o);return o&&g(o,o.next)&&(A(o),o=o.next),o}function n(t,e){if(!t)return t;e||(e=t);let n,r=t;do{if(n=!1,r.steiner||!g(r,r.next)&&0!==v(r.prev,r,r.next))r=r.next;else{if(A(r),r=e=r.prev,r===r.next)break;n=!0}}while(n||r!==e);return e}function r(t,e,f,s,l,a,h){if(!t)return;!h&&a&&function(t,e,n,r){let x=t;do{0===x.z&&(x.z=c(x.x,x.y,e,n,r)),x.prevZ=x.prev,x.nextZ=x.next,x=x.next}while(x!==t);x.prevZ.nextZ=null,x.prevZ=null,function(t){let e,n=1;do{let r,x=t;t=null;let o=null;for(e=0;x;){e++;let i=x,u=0;for(let t=0;t<n&&(u++,i=i.nextZ,i);t++);let f=n;for(;u>0||f>0&&i;)0!==u&&(0===f||!i||x.z<=i.z)?(r=x,x=x.nextZ,u--):(r=i,i=i.nextZ,f--),o?o.nextZ=r:t=r,r.prevZ=o,o=r;x=i}o.nextZ=null,n*=2}while(e>1)}(x)}(t,s,l,a);let y=t;for(;t.prev!==t.next;){const c=t.prev,p=t.next;if(a?o(t,s,l,a):x(t))e.push(c.i,t.i,p.i),A(t),t=p.next,y=p.next;else if((t=p)===y){h?1===h?r(t=i(n(t),e),e,f,s,l,a,2):2===h&&u(t,e,f,s,l,a):r(n(t),e,f,s,l,a,1);break}}}function x(t){const e=t.prev,n=t,r=t.next;if(v(e,n,r)>=0)return!1;const x=e.x,o=n.x,i=r.x,u=e.y,f=n.y,s=r.y,l=Math.min(x,o,i),c=Math.min(u,f,s),a=Math.max(x,o,i),h=Math.max(u,f,s);let p=r.next;for(;p!==e;){if(p.x>=l&&p.x<=a&&p.y>=c&&p.y<=h&&y(x,u,o,f,i,s,p.x,p.y)&&v(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function o(t,e,n,r){const x=t.prev,o=t,i=t.next;if(v(x,o,i)>=0)return!1;const u=x.x,f=o.x,s=i.x,l=x.y,a=o.y,h=i.y,p=Math.min(u,f,s),g=Math.min(l,a,h),b=Math.max(u,f,s),M=Math.max(l,a,h),m=c(p,g,e,n,r),Z=c(b,M,e,n,r);let d=t.prevZ,w=t.nextZ;for(;d&&d.z>=m&&w&&w.z<=Z;){if(d.x>=p&&d.x<=b&&d.y>=g&&d.y<=M&&d!==x&&d!==i&&y(u,l,f,a,s,h,d.x,d.y)&&v(d.prev,d,d.next)>=0)return!1;if(d=d.prevZ,w.x>=p&&w.x<=b&&w.y>=g&&w.y<=M&&w!==x&&w!==i&&y(u,l,f,a,s,h,w.x,w.y)&&v(w.prev,w,w.next)>=0)return!1;w=w.nextZ}for(;d&&d.z>=m;){if(d.x>=p&&d.x<=b&&d.y>=g&&d.y<=M&&d!==x&&d!==i&&y(u,l,f,a,s,h,d.x,d.y)&&v(d.prev,d,d.next)>=0)return!1;d=d.prevZ}for(;w&&w.z<=Z;){if(w.x>=p&&w.x<=b&&w.y>=g&&w.y<=M&&w!==x&&w!==i&&y(u,l,f,a,s,h,w.x,w.y)&&v(w.prev,w,w.next)>=0)return!1;w=w.nextZ}return!0}function i(t,e){let r=t;do{const n=r.prev,x=r.next.next;!g(n,x)&&b(n,r,r.next,x)&&Z(n,x)&&Z(x,n)&&(e.push(n.i,r.i,x.i),A(r),A(r.next),r=t=x),r=r.next}while(r!==t);return n(r)}function u(t,e,x,o,i,u){let f=t;do{let t=f.next.next;for(;t!==f.prev;){if(f.i!==t.i&&p(f,t)){let s=d(f,t);return f=n(f,f.next),s=n(s,s.next),r(f,e,x,o,i,u,0),void r(s,e,x,o,i,u,0)}t=t.next}f=f.next}while(f!==t)}function f(t,e){let n=t.x-e.x;if(0===n&&(n=t.y-e.y,0===n)){n=(t.next.y-t.y)/(t.next.x-t.x)-(e.next.y-e.y)/(e.next.x-e.x)}return n}function s(t,e){const r=function(t,e){let n=e;const r=t.x,x=t.y;let o,i=-1/0;if(g(t,n))return n;do{if(g(t,n.next))return n.next;if(x<=n.y&&x>=n.next.y&&n.next.y!==n.y){const t=n.x+(x-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(t<=r&&t>i&&(i=t,o=n.x<n.next.x?n:n.next,t===r))return o}n=n.next}while(n!==e);if(!o)return null;const u=o,f=o.x,s=o.y;let c=1/0;n=o;do{if(r>=n.x&&n.x>=f&&r!==n.x&&h(x<s?r:i,x,f,s,x<s?i:r,x,n.x,n.y)){const e=Math.abs(x-n.y)/(r-n.x);Z(n,t)&&(e<c||e===c&&(n.x>o.x||n.x===o.x&&l(o,n)))&&(o=n,c=e)}n=n.next}while(n!==u);return o}(t,e);if(!r)return e;const x=d(r,t);return n(x,x.next),n(r,r.next)}function l(t,e){return v(t.prev,t,e.prev)<0&&v(e.next,t,t.next)<0}function c(t,e,n,r,x){return(t=1431655765&((t=858993459&((t=252645135&((t=16711935&((t=(t-n)*x|0)|t<<8))|t<<4))|t<<2))|t<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-r)*x|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function a(t){let e=t,n=t;do{(e.x<n.x||e.x===n.x&&e.y<n.y)&&(n=e),e=e.next}while(e!==t);return n}function h(t,e,n,r,x,o,i,u){return(x-i)*(e-u)>=(t-i)*(o-u)&&(t-i)*(r-u)>=(n-i)*(e-u)&&(n-i)*(o-u)>=(x-i)*(r-u)}function y(t,e,n,r,x,o,i,u){return!(t===i&&e===u)&&h(t,e,n,r,x,o,i,u)}function p(t,e){return t.next.i!==e.i&&t.prev.i!==e.i&&!function(t,e){let n=t;do{if(n.i!==t.i&&n.next.i!==t.i&&n.i!==e.i&&n.next.i!==e.i&&b(n,n.next,t,e))return!0;n=n.next}while(n!==t);return!1}(t,e)&&(Z(t,e)&&Z(e,t)&&function(t,e){let n=t,r=!1;const x=(t.x+e.x)/2,o=(t.y+e.y)/2;do{n.y>o!=n.next.y>o&&n.next.y!==n.y&&x<(n.next.x-n.x)*(o-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next}while(n!==t);return r}(t,e)&&(v(t.prev,t,e.prev)||v(t,e.prev,e))||g(t,e)&&v(t.prev,t,t.next)>0&&v(e.prev,e,e.next)>0)}function v(t,e,n){return(e.y-t.y)*(n.x-e.x)-(e.x-t.x)*(n.y-e.y)}function g(t,e){return t.x===e.x&&t.y===e.y}function b(t,e,n,r){const x=m(v(t,e,n)),o=m(v(t,e,r)),i=m(v(n,r,t)),u=m(v(n,r,e));return x!==o&&i!==u||(!(0!==x||!M(t,n,e))||(!(0!==o||!M(t,r,e))||(!(0!==i||!M(n,t,r))||!(0!==u||!M(n,e,r)))))}function M(t,e,n){return e.x<=Math.max(t.x,n.x)&&e.x>=Math.min(t.x,n.x)&&e.y<=Math.max(t.y,n.y)&&e.y>=Math.min(t.y,n.y)}function m(t){return t>0?1:t<0?-1:0}function Z(t,e){return v(t.prev,t,t.next)<0?v(t,e,t.next)>=0&&v(t,t.prev,e)>=0:v(t,e,t.prev)<0||v(t,t.next,e)<0}function d(t,e){const n=E(t.i,t.x,t.y),r=E(e.i,e.x,e.y),x=t.next,o=e.prev;return t.next=e,e.prev=t,n.next=x,x.prev=n,r.next=n,n.prev=r,o.next=r,r.prev=o,r}function w(t,e,n,r){const x=E(t,e,n);return r?(x.next=r.next,x.prev=r,r.next.prev=x,r.next=x):(x.prev=x,x.next=x),x}function A(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ)}function E(t,e,n){return{i:t,x:e,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function I(t,e){const n=e[0],r=e[1];return e[0]=t[0]*n+t[2]*r+t[4],e[1]=t[1]*n+t[3]*r+t[5],e}function z(t,e){const n=(r=e)[0]*r[3]-r[1]*r[2];var r;!function(t,e){if(!t)throw new Error(e)}(0!==n,"Transformation matrix cannot be inverted");const x=e[0],o=e[1],i=e[2],u=e[3],f=e[4],s=e[5];return t[0]=u/n,t[1]=-o/n,t[2]=-i/n,t[3]=x/n,t[4]=(i*s-u*f)/n,t[5]=-(x*s-o*f)/n,t}new Array(6);const F=[],P={vertexPosition:0,indexPosition:0};function B(t,e,n,r,x){t[e+0]=n,t[e+1]=r,t[e+2]=x}function N(t,e,n,r,x,o){const i=3+x,u=t[e+0],f=t[e+1],s=F;s.length=x;for(let n=0;n<s.length;n++)s[n]=t[e+2+n];let l=o?o.vertexPosition:0,c=o?o.indexPosition:0;const a=l/i;return B(n,l,u,f,0),s.length&&n.set(s,l+3),l+=i,B(n,l,u,f,1),s.length&&n.set(s,l+3),l+=i,B(n,l,u,f,2),s.length&&n.set(s,l+3),l+=i,B(n,l,u,f,3),s.length&&n.set(s,l+3),l+=i,r[c++]=a,r[c++]=a+1,r[c++]=a+3,r[c++]=a+1,r[c++]=a+2,r[c++]=a+3,P.vertexPosition=l,P.indexPosition=c,P}function R(t,e,n,r,x,o,i,u,f,s,l){const c=10+u.length,a=o.length/c,h=[t[e+0],t[e+1]],y=[t[n],t[n+1]],p=t[e+2],v=t[n+2],g=I(f,[...h]),b=I(f,[...y]);function M(t,e,n){const r=Math.sqrt((e[0]-t[0])*(e[0]-t[0])+(e[1]-t[1])*(e[1]-t[1])),x=[(e[0]-t[0])/r,(e[1]-t[1])/r],o=[-x[1],x[0]],i=Math.sqrt((n[0]-t[0])*(n[0]-t[0])+(n[1]-t[1])*(n[1]-t[1])),u=[(n[0]-t[0])/i,(n[1]-t[1])/i],f=0===r||0===i?0:Math.acos((s=u[0]*x[0]+u[1]*x[1],l=-1,c=1,Math.min(Math.max(s,l),c)));var s,l,c;return u[0]*o[0]+u[1]*o[1]>0?f:2*Math.PI-f}let m=-1,Z=-1,d=l;const w=null!==x;if(null!==r){m=M(g,b,I(f,[...[t[r],t[r+1]]])),Math.cos(m)<=.985&&(d+=Math.tan((m-Math.PI)/2))}if(w){Z=M(b,g,I(f,[...[t[x],t[x+1]]])),Math.cos(Z)<=.985&&(d+=Math.tan((Math.PI-Z)/2))}function A(t,e){return 0===e?1e4*t:Math.sign(e)*(1e4*t+Math.abs(e))}return o.push(h[0],h[1],p,y[0],y[1],v,m,Z,s,A(0,l)),o.push(...u),o.push(h[0],h[1],p,y[0],y[1],v,m,Z,s,A(1,l)),o.push(...u),o.push(h[0],h[1],p,y[0],y[1],v,m,Z,s,A(2,l)),o.push(...u),o.push(h[0],h[1],p,y[0],y[1],v,m,Z,s,A(3,l)),o.push(...u),i.push(a,a+1,a+2,a+1,a+3,a+2),{length:s+Math.sqrt((b[0]-g[0])*(b[0]-g[0])+(b[1]-g[1])*(b[1]-g[1])),angle:d}}function S(e,n,r,x,o){const i=2+o;let u=n;const f=e.slice(u,u+o);u+=o;const s=e[u++];let l=0;const c=new Array(s-1);for(let t=0;t<s;t++)l+=e[u++],t<s-1&&(c[t]=l);const a=e.slice(u,u+2*l),h=t(a,c,2);for(let t=0;t<h.length;t++)x.push(h[t]+r.length/i);for(let t=0;t<a.length;t+=2)r.push(a[t],a[t+1],...f);return u+2*l}const T="GENERATE_POLYGON_BUFFERS",_="GENERATE_POINT_BUFFERS",O="GENERATE_LINE_STRING_BUFFERS",U=self;U.onmessage=t=>{const e=t.data;switch(e.type){case _:{const t=3,n=2,r=e.customAttributesSize,x=n+r,o=new Float32Array(e.renderInstructions),i=o.length/x,u=4*i*(r+t),f=new Uint32Array(6*i),s=new Float32Array(u);let l;for(let t=0;t<o.length;t+=x)l=N(o,t,s,f,r,l);const c=Object.assign({vertexBuffer:s.buffer,indexBuffer:f.buffer,renderInstructions:o.buffer},e);U.postMessage(c,[s.buffer,f.buffer,o.buffer]);break}case O:{const t=[],n=[],r=e.customAttributesSize,x=3,o=new Float32Array(e.renderInstructions);let i=0;const u=[1,0,0,1,0,0];let f,s;for(z(u,e.renderInstructionsTransform);i<o.length;){s=Array.from(o.slice(i,i+r)),i+=r,f=o[i++];const e=i,l=i+(f-1)*x,c=o[e]===o[l]&&o[e+1]===o[l+1];let a=0,h=0;for(let r=0;r<f-1;r++){let y=null;r>0?y=i+(r-1)*x:c&&(y=l-x);let p=null;r<f-2?p=i+(r+2)*x:c&&(p=e+x);const v=R(o,i+r*x,i+(r+1)*x,y,p,t,n,s,u,a,h);a=v.length,h=v.angle}i+=f*x}const l=Uint32Array.from(n),c=Float32Array.from(t),a=Object.assign({vertexBuffer:c.buffer,indexBuffer:l.buffer,renderInstructions:o.buffer},e);U.postMessage(a,[c.buffer,l.buffer,o.buffer]);break}case T:{const t=[],n=[],r=e.customAttributesSize,x=new Float32Array(e.renderInstructions);let o=0;for(;o<x.length;)o=S(x,o,t,n,r);const i=Uint32Array.from(n),u=Float32Array.from(t),f=Object.assign({vertexBuffer:u.buffer,indexBuffer:i.buffer,renderInstructions:x.buffer},e);U.postMessage(f,[u.buffer,i.buffer,x.buffer]);break}}};';return new Worker(typeof Blob>"u"?"data:application/javascript;base64,"+Buffer.from(n,"binary").toString("base64"):URL.createObjectURL(new Blob([n],{type:"application/javascript"})))}var xe={GENERATE_POLYGON_BUFFERS:"GENERATE_POLYGON_BUFFERS",GENERATE_POINT_BUFFERS:"GENERATE_POINT_BUFFERS",GENERATE_LINE_STRING_BUFFERS:"GENERATE_LINE_STRING_BUFFERS"};function kt(n,e){e=e||[];let t=256,r=t-1;return e[0]=Math.floor(n/t/t/t)/r,e[1]=Math.floor(n/t/t)%t/r,e[2]=Math.floor(n/t)%t/r,e[3]=n%t/r,e}function zt(n){let e=0,t=256,r=t-1;return e+=Math.round(n[0]*t*t*t*r),e+=Math.round(n[1]*t*t*r),e+=Math.round(n[2]*t*r),e+=Math.round(n[3]*r),e}function ke(n,e,t,r){let o=0;for(let i in e){let s=e[i],a=s.callback.call(t,t.feature),l=a?.[0]??a;l===fe&&console.warn('The "has" operator might return false positives.'),l===void 0?l=fe:l===null&&(l=0),n[r+o++]=l,!(!s.size||s.size===1)&&(n[r+o++]=a[1],!(s.size<3)&&(n[r+o++]=a[2],!(s.size<4)&&(n[r+o++]=a[3])))}return o}function Q(n){return Object.keys(n).reduce((e,t)=>e+(n[t].size||1),0)}function jt(n,e,t,r){let o=(2+Q(t))*n.geometriesCount;(!e||e.length!==o)&&(e=new Float32Array(o));let i=[],s=0;for(let a in n.entries){let l=n.entries[a];for(let c=0,h=l.flatCoordss.length;c<h;c++)i[0]=l.flatCoordss[c][0],i[1]=l.flatCoordss[c][1],W(r,i),e[s++]=i[0],e[s++]=i[1],s+=ke(e,t,l,s)}return e}function Wt(n,e,t,r){let o=3*n.verticesCount+(1+Q(t))*n.geometriesCount;(!e||e.length!==o)&&(e=new Float32Array(o));let i=[],s=0;for(let a in n.entries){let l=n.entries[a];for(let c=0,h=l.flatCoordss.length;c<h;c++){i.length=l.flatCoordss[c].length,Re(l.flatCoordss[c],0,i.length,3,r,i,3),s+=ke(e,t,l,s),e[s++]=i.length/3;for(let f=0,u=i.length;f<u;f+=3)e[s++]=i[f],e[s++]=i[f+1],e[s++]=i[f+2]}}return e}function Vt(n,e,t,r){let o=2*n.verticesCount+(1+Q(t))*n.geometriesCount+n.ringsCount;(!e||e.length!==o)&&(e=new Float32Array(o));let i=[],s=0;for(let a in n.entries){let l=n.entries[a];for(let c=0,h=l.flatCoordss.length;c<h;c++){i.length=l.flatCoordss[c].length,Re(l.flatCoordss[c],0,i.length,2,r,i),s+=ke(e,t,l,s),e[s++]=l.ringsVerticesCounts[c].length;for(let f=0,u=l.ringsVerticesCounts[c].length;f<u;f++)e[s++]=l.ringsVerticesCounts[c][f];for(let f=0,u=i.length;f<u;f+=2)e[s++]=i[f],e[s++]=i[f+1]}}return e}function Ee(n){return(JSON.stringify(n).split("").reduce((t,r)=>(t<<5)-t+r.charCodeAt(0),0)>>>0).toString()}function ze(n,e,t,r){if(`${r}radius`in n&&r!=="icon-"){let o=p(t,n[`${r}radius`],_);if(`${r}radius2`in n){let i=p(t,n[`${r}radius2`],_);o=`max(${o}, ${i})`}`${r}stroke-width`in n&&(o=`(${o} + ${p(t,n[`${r}stroke-width`],_)} * 0.5)`),e.setSymbolSizeExpression(`vec2(${o} * 2. + 0.5)`)}if(`${r}scale`in n){let o=p(t,n[`${r}scale`],A);e.setSymbolSizeExpression(`${e.getSymbolSizeExpression()} * ${o}`)}`${r}displacement`in n&&e.setSymbolOffsetExpression(p(t,n[`${r}displacement`],P)),`${r}rotation`in n&&e.setSymbolRotationExpression(p(t,n[`${r}rotation`],_)),`${r}rotate-with-view`in n&&e.setSymbolRotateWithView(!!n[`${r}rotate-with-view`])}function Xt(n,e,t,r,o){let i="vec4(0.)";if(e!==null&&(i=e),t!==null&&r!==null){let l=`smoothstep(-${r} + 0.63, -${r} - 0.58, ${n})`;i=`mix(${t}, ${i}, ${l})`}let s=`(1.0 - smoothstep(-0.63, 0.58, ${n}))`,a=`${i} * vec4(1.0, 1.0, 1.0, ${s})`;return o!==null&&(a=`${a} * vec4(1.0, 1.0, 1.0, ${o})`),a}function je(n,e,t,r,o){let i=new Image;i.crossOrigin=n[`${r}cross-origin`]===void 0?"anonymous":n[`${r}cross-origin`],U(typeof n[`${r}src`]=="string",`WebGL layers do not support expressions for the ${r}src style property`),i.src=n[`${r}src`],t[`u_texture${o}_size`]=()=>i.complete?[i.width,i.height]:[0,0],e.addUniform(`vec2 u_texture${o}_size`);let s=`u_texture${o}_size`;return t[`u_texture${o}`]=i,e.addUniform(`sampler2D u_texture${o}`),s}function We(n,e,t,r,o){let i=p(t,n[`${e}offset`],P);if(`${e}offset-origin`in n)switch(n[`${e}offset-origin`]){case"top-right":i=`vec2(${r}.x, 0.) + ${o} * vec2(-1., 0.) + ${i} * vec2(-1., 1.)`;break;case"bottom-left":i=`vec2(0., ${r}.y) + ${o} * vec2(0., -1.) + ${i} * vec2(1., -1.)`;break;case"bottom-right":i=`${r} - ${o} - ${i}`;break;default:}return i}function xr(n,e,t,r){r.functions.circleDistanceField=`float circleDistanceField(vec2 point, float radius) {
  return length(point) - radius;
}`,ze(n,e,r,"circle-");let o=null;"circle-opacity"in n&&(o=p(r,n["circle-opacity"],_));let i="coordsPx";"circle-scale"in n&&(i=`coordsPx / ${p(r,n["circle-scale"],A)}`);let s=null;"circle-fill-color"in n&&(s=p(r,n["circle-fill-color"],T));let a=null;"circle-stroke-color"in n&&(a=p(r,n["circle-stroke-color"],T));let l=p(r,n["circle-radius"],_),c=null;"circle-stroke-width"in n&&(c=p(r,n["circle-stroke-width"],_),l=`(${l} + ${c} * 0.5)`);let h=`circleDistanceField(${i}, ${l})`,f=Xt(h,s,a,c,o);e.setSymbolColorExpression(f)}function Er(n,e,t,r){r.functions.round=`float round(float v) {
  return sign(v) * floor(abs(v) + 0.5);
}`,r.functions.starDistanceField=`float starDistanceField(vec2 point, float numPoints, float radius, float radius2, float angle) {
  float startAngle = -PI * 0.5 + angle; // tip starts upwards and rotates clockwise with angle
  float c = cos(startAngle);
  float s = sin(startAngle);
  vec2 pointRotated = vec2(c * point.x - s * point.y, s * point.x + c * point.y);
  float alpha = TWO_PI / numPoints; // the angle of one sector
  float beta = atan(pointRotated.y, pointRotated.x);
  float gamma = round(beta / alpha) * alpha; // angle in sector
  c = cos(-gamma);
  s = sin(-gamma);
  vec2 inSector = vec2(c * pointRotated.x - s * pointRotated.y, abs(s * pointRotated.x + c * pointRotated.y));
  vec2 tipToPoint = inSector + vec2(-radius, 0.);
  vec2 edgeNormal = vec2(radius2 * sin(alpha * 0.5), -radius2 * cos(alpha * 0.5) + radius);
  return dot(normalize(edgeNormal), tipToPoint);
}`,r.functions.regularDistanceField=`float regularDistanceField(vec2 point, float numPoints, float radius, float angle) {
  float startAngle = -PI * 0.5 + angle; // tip starts upwards and rotates clockwise with angle
  float c = cos(startAngle);
  float s = sin(startAngle);
  vec2 pointRotated = vec2(c * point.x - s * point.y, s * point.x + c * point.y);
  float alpha = TWO_PI / numPoints; // the angle of one sector
  float radiusIn = radius * cos(PI / numPoints);
  float beta = atan(pointRotated.y, pointRotated.x);
  float gamma = round((beta - alpha * 0.5) / alpha) * alpha + alpha * 0.5; // angle in sector from mid
  c = cos(-gamma);
  s = sin(-gamma);
  vec2 inSector = vec2(c * pointRotated.x - s * pointRotated.y, abs(s * pointRotated.x + c * pointRotated.y));
  return inSector.x - radiusIn;
}`,ze(n,e,r,"shape-");let o=null;"shape-opacity"in n&&(o=p(r,n["shape-opacity"],_));let i="coordsPx";"shape-scale"in n&&(i=`coordsPx / ${p(r,n["shape-scale"],A)}`);let s=null;"shape-fill-color"in n&&(s=p(r,n["shape-fill-color"],T));let a=null;"shape-stroke-color"in n&&(a=p(r,n["shape-stroke-color"],T));let l=null;"shape-stroke-width"in n&&(l=p(r,n["shape-stroke-width"],_));let c=p(r,n["shape-points"],_),h="0.";"shape-angle"in n&&(h=p(r,n["shape-angle"],_));let f,u=p(r,n["shape-radius"],_);if(l!==null&&(u=`${u} + ${l} * 0.5`),"shape-radius2"in n){let y=p(r,n["shape-radius2"],_);l!==null&&(y=`${y} + ${l} * 0.5`),f=`starDistanceField(${i}, ${c}, ${u}, ${y}, ${h})`}else f=`regularDistanceField(${i}, ${c}, ${u}, ${h})`;let m=Xt(f,s,a,l,o);e.setSymbolColorExpression(m)}function Tr(n,e,t,r){let o="vec4(1.0)";"icon-color"in n&&(o=p(r,n["icon-color"],T)),"icon-opacity"in n&&(o=`${o} * vec4(1.0, 1.0, 1.0, ${p(r,n["icon-opacity"],_)})`);let i=Ee(n["icon-src"]),s=je(n,e,t,"icon-",i);if(e.setSymbolColorExpression(`${o} * texture2D(u_texture${i}, v_texCoord)`).setSymbolSizeExpression(s),"icon-width"in n&&"icon-height"in n&&e.setSymbolSizeExpression(`vec2(${p(r,n["icon-width"],_)}, ${p(r,n["icon-height"],_)})`),"icon-offset"in n&&"icon-size"in n){let a=p(r,n["icon-size"],P),l=e.getSymbolSizeExpression();e.setSymbolSizeExpression(a);let c=We(n,"icon-",r,"v_quadSizePx",a);e.setTextureCoordinateExpression(`(vec4((${c}).xyxy) + vec4(0., 0., ${a})) / (${l}).xyxy`)}if(ze(n,e,r,"icon-"),"icon-anchor"in n){let a=p(r,n["icon-anchor"],P),l="1.0";"icon-scale"in n&&(l=p(r,n["icon-scale"],A));let c;n["icon-anchor-x-units"]==="pixels"&&n["icon-anchor-y-units"]==="pixels"?c=`${a} * ${l}`:n["icon-anchor-x-units"]==="pixels"?c=`${a} * vec2(vec2(${l}).x, v_quadSizePx.y)`:n["icon-anchor-y-units"]==="pixels"?c=`${a} * vec2(v_quadSizePx.x, vec2(${l}).x)`:c=`${a} * v_quadSizePx`;let h=`v_quadSizePx * vec2(0.5, -0.5) + ${c} * vec2(-1., 1.)`;if("icon-anchor-origin"in n)switch(n["icon-anchor-origin"]){case"top-right":h=`v_quadSizePx * -0.5 + ${c}`;break;case"bottom-left":h=`v_quadSizePx * 0.5 - ${c}`;break;case"bottom-right":h=`v_quadSizePx * vec2(-0.5, 0.5) + ${c} * vec2(1., -1.)`;break;default:}e.setSymbolOffsetExpression(`${e.getSymbolOffsetExpression()} + ${h}`)}}function vr(n,e,t,r){if("stroke-color"in n&&e.setStrokeColorExpression(p(r,n["stroke-color"],T)),"stroke-pattern-src"in n){let o=Ee(n["stroke-pattern-src"]),i=je(n,e,t,"stroke-pattern-",o),s=i,a="vec2(0.)";"stroke-pattern-offset"in n&&"stroke-pattern-size"in n&&(s=p(r,n["stroke-pattern-size"],P),a=We(n,"stroke-pattern-",r,i,s));let l="0.";"stroke-pattern-spacing"in n&&(l=p(r,n["stroke-pattern-spacing"],_)),r.functions.sampleStrokePattern=`vec4 sampleStrokePattern(sampler2D texture, vec2 textureSize, vec2 textureOffset, vec2 sampleSize, float spacingPx, float currentLengthPx, float currentRadiusRatio, float lineWidth) {
  float currentLengthScaled = currentLengthPx * sampleSize.y / lineWidth;
  float spacingScaled = spacingPx * sampleSize.y / lineWidth;
  float uCoordPx = mod(currentLengthScaled, (sampleSize.x + spacingScaled));
  // make sure that we're not sampling too close to the borders to avoid interpolation with outside pixels
  uCoordPx = clamp(uCoordPx, 0.5, sampleSize.x - 0.5);
  float vCoordPx = (-currentRadiusRatio * 0.5 + 0.5) * sampleSize.y;
  vec2 texCoord = (vec2(uCoordPx, vCoordPx) + textureOffset) / textureSize;
  return texture2D(texture, texCoord);
}`;let c=`u_texture${o}`,h="1.";"stroke-color"in n&&(h=e.getStrokeColorExpression()),e.setStrokeColorExpression(`${h} * sampleStrokePattern(${c}, ${i}, ${a}, ${s}, ${l}, currentLengthPx, currentRadiusRatio, v_width)`)}if("stroke-width"in n&&e.setStrokeWidthExpression(p(r,n["stroke-width"],_)),"stroke-offset"in n&&e.setStrokeOffsetExpression(p(r,n["stroke-offset"],_)),"stroke-line-cap"in n&&e.setStrokeCapExpression(p(r,n["stroke-line-cap"],N)),"stroke-line-join"in n&&e.setStrokeJoinExpression(p(r,n["stroke-line-join"],N)),"stroke-miter-limit"in n&&e.setStrokeMiterLimitExpression(p(r,n["stroke-miter-limit"],_)),"stroke-line-dash"in n){r.functions.getSingleDashDistance=`float getSingleDashDistance(float distance, float radius, float dashOffset, float dashLength, float dashLengthTotal, float capType, float lineWidth) {
  float localDistance = mod(distance, dashLengthTotal);
  float distanceSegment = abs(localDistance - dashOffset - dashLength * 0.5) - dashLength * 0.5;
  distanceSegment = min(distanceSegment, dashLengthTotal - localDistance);
  if (capType == ${S("square")}) {
    distanceSegment -= lineWidth * 0.5;
  } else if (capType == ${S("round")}) {
    distanceSegment = min(distanceSegment, sqrt(distanceSegment * distanceSegment + radius * radius) - lineWidth * 0.5);
  }
  return distanceSegment;
}`;let o=n["stroke-line-dash"].map(u=>p(r,u,_));o.length%2===1&&(o=[...o,...o]);let i="0.";"stroke-line-dash-offset"in n&&(i=p(r,n["stroke-line-dash-offset"],_));let a=`dashDistanceField_${Ee(n["stroke-line-dash"])}`,l=o.map((u,m)=>`float dashLength${m} = ${u};`),c=o.map((u,m)=>`dashLength${m}`).join(" + "),h="0.",f=`getSingleDashDistance(distance, radius, ${h}, dashLength0, totalDashLength, capType, lineWidth)`;for(let u=2;u<o.length;u+=2)h=`${h} + dashLength${u-2} + dashLength${u-1}`,f=`min(${f}, getSingleDashDistance(distance, radius, ${h}, dashLength${u}, totalDashLength, capType, lineWidth))`;r.functions[a]=`float ${a}(float distance, float radius, float capType, float lineWidth) {
  ${l.join(`
  `)}
  float totalDashLength = ${c};
  return ${f};
}`,e.setStrokeDistanceFieldExpression(`${a}(currentLengthPx + ${i}, currentRadiusPx, capType, v_width)`)}}function yr(n,e,t,r){if("fill-color"in n&&e.setFillColorExpression(p(r,n["fill-color"],T)),"fill-pattern-src"in n){let o=Ee(n["fill-pattern-src"]),i=je(n,e,t,"fill-pattern-",o),s=i,a="vec2(0.)";"fill-pattern-offset"in n&&"fill-pattern-size"in n&&(s=p(r,n["fill-pattern-size"],P),a=We(n,"fill-pattern-",r,i,s)),r.functions.sampleFillPattern=`vec4 sampleFillPattern(sampler2D texture, vec2 textureSize, vec2 textureOffset, vec2 sampleSize, vec2 pxOrigin, vec2 pxPosition) {
  float scaleRatio = pow(2., mod(u_zoom + 0.5, 1.) - 0.5);
  vec2 pxRelativePos = pxPosition - pxOrigin;
  // rotate the relative position from origin by the current view rotation
  pxRelativePos = vec2(pxRelativePos.x * cos(u_rotation) - pxRelativePos.y * sin(u_rotation), pxRelativePos.x * sin(u_rotation) + pxRelativePos.y * cos(u_rotation));
  // sample position is computed according to the sample offset & size
  vec2 samplePos = mod(pxRelativePos / scaleRatio, sampleSize);
  // also make sure that we're not sampling too close to the borders to avoid interpolation with outside pixels
  samplePos = clamp(samplePos, vec2(0.5), sampleSize - vec2(0.5));
  samplePos.y = sampleSize.y - samplePos.y; // invert y axis so that images appear upright
  return texture2D(texture, (samplePos + textureOffset) / textureSize);
}`;let l=`u_texture${o}`,c="1.";"fill-color"in n&&(c=e.getFillColorExpression()),e.setFillColorExpression(`${c} * sampleFillPattern(${l}, ${i}, ${a}, ${s}, pxOrigin, pxPos)`)}}function Ht(n,e,t){let r=ue(),o=new G,i={};if("icon-src"in n?Tr(n,o,i,r):"shape-points"in n?Er(n,o,i,r):"circle-radius"in n&&xr(n,o,i,r),vr(n,o,i,r),yr(n,o,i,r),t){let l=p(r,t,$);o.setFragmentDiscardExpression(`!${l}`)}let s={};function a(l,c,h,f){if(!r[l])return;let u=pe(h),m=de(h);o.addAttribute(`a_${c}`,u),s[c]={size:m,callback:f}}return a("geometryType",Ue,N,l=>I(ne(l.getGeometry()))),a("featureId",Ie,N|_,l=>{let c=l.getId()??null;return typeof c=="string"?I(c):c}),ge(o,r),{builder:o,attributes:v(v({},s),me(r)),uniforms:v(v({},i),_e(r,e))}}function Zt(n){let e=Array.isArray(n)?n:[n];if("style"in e[0]){let t=[],r=e,o=[];for(let i of r){let s=Array.isArray(i.style)?i.style:[i.style],a=i.filter;i.else&&o.length&&(a=["all",...o.map(c=>["!",c])],i.filter&&a.push(i.filter),a.length<3&&(a=a[1])),i.filter&&o.push(i.filter);let l=s.map(c=>v({style:c},a&&{filter:a}));t.push(...l)}return t}return"builder"in e[0]?e:e.map(t=>({style:t}))}var Rr=[],Ve;function Pr(){return Ve||(Ve=Gt()),Ve}var Sr=0,b={POSITION:"a_position",INDEX:"a_index",SEGMENT_START:"a_segmentStart",SEGMENT_END:"a_segmentEnd",MEASURE_START:"a_measureStart",MEASURE_END:"a_measureEnd",PARAMETERS:"a_parameters",JOIN_ANGLES:"a_joinAngles",DISTANCE:"a_distance"},Xe=class{constructor(e,t,r,o,i){this.helper_,this.hitDetectionEnabled_=!!o;let s=e;if(!("builder"in e)){let h=e,f=Ht(h.style,t,h.filter);s={builder:f.builder,attributes:f.attributes,uniforms:f.uniforms}}this.fillProgram_,this.strokeProgram_,this.symbolProgram_,this.hasFill_=!!s.builder.getFillVertexShader(),this.hasFill_&&(this.fillVertexShader_=s.builder.getFillVertexShader(),this.fillFragmentShader_=s.builder.getFillFragmentShader()),this.hasStroke_=!!s.builder.getStrokeVertexShader(),this.hasStroke_&&(this.strokeVertexShader_=s.builder.getStrokeVertexShader(),this.strokeFragmentShader_=s.builder.getStrokeFragmentShader()),this.hasSymbol_=!!s.builder.getSymbolVertexShader(),this.hasSymbol_&&(this.symbolVertexShader_=s.builder.getSymbolVertexShader(),this.symbolFragmentShader_=s.builder.getSymbolFragmentShader()),this.featureFilter_=null,i&&(this.featureFilter_=this.computeFeatureFilter(i));let l=this.hitDetectionEnabled_?{hitColor:{callback(){return kt(this.ref,Rr)},size:4}}:{};this.customAttributes_=Object.assign({},l,s.attributes),this.uniforms_=s.uniforms;let c=Object.entries(this.customAttributes_).map(([h,f])=>({name:`a_${h}`,size:f.size||1,type:E.FLOAT}));this.polygonAttributesDesc_=[{name:b.POSITION,size:2,type:E.FLOAT},...c],this.lineStringAttributesDesc_=[{name:b.SEGMENT_START,size:2,type:E.FLOAT},{name:b.MEASURE_START,size:1,type:E.FLOAT},{name:b.SEGMENT_END,size:2,type:E.FLOAT},{name:b.MEASURE_END,size:1,type:E.FLOAT},{name:b.JOIN_ANGLES,size:2,type:E.FLOAT},{name:b.DISTANCE,size:1,type:E.FLOAT},{name:b.PARAMETERS,size:1,type:E.FLOAT},...c],this.pointAttributesDesc_=[{name:b.POSITION,size:2,type:E.FLOAT},{name:b.INDEX,size:1,type:E.FLOAT},...c],this.setHelper(r)}computeFeatureFilter(e){let t=re(),r;try{r=Tt(e,$,t)}catch{return null}if(t.mapState||t.variables.size>0)return null;let o=Et();return i=>{if(o.properties=i.getPropertiesInternal(),t.featureId){let s=i.getId();s!==void 0?o.featureId=s:o.featureId=null}return o.geometryType=ne(i.getGeometry()),r(o)}}generateBuffers(e,t){return Ke(this,null,function*(){let r=e;if(this.featureFilter_&&(r=r.filter(this.featureFilter_),r.isEmpty()))return null;let o=this.generateRenderInstructions_(r,t),[i,s,a]=yield Promise.all([this.generateBuffersForType_(o.polygonInstructions,"Polygon",t),this.generateBuffersForType_(o.lineStringInstructions,"LineString",t),this.generateBuffersForType_(o.pointInstructions,"Point",t)]),l=V(R(),t);return{polygonBuffers:i,lineStringBuffers:s,pointBuffers:a,invertVerticesTransform:l}})}generateRenderInstructions_(e,t){let r=this.hasFill_?Vt(e.polygonBatch,new Float32Array(0),this.customAttributes_,t):null,o=this.hasStroke_?Wt(e.lineStringBatch,new Float32Array(0),this.customAttributes_,t):null,i=this.hasSymbol_?jt(e.pointBatch,new Float32Array(0),this.customAttributes_,t):null;return{polygonInstructions:r,lineStringInstructions:o,pointInstructions:i}}generateBuffersForType_(e,t,r){if(e===null)return null;let o=Sr++,i;switch(t){case"Polygon":i=xe.GENERATE_POLYGON_BUFFERS;break;case"LineString":i=xe.GENERATE_LINE_STRING_BUFFERS;break;case"Point":i=xe.GENERATE_POINT_BUFFERS;break;default:}let s={id:o,type:i,renderInstructions:e.buffer,renderInstructionsTransform:r,customAttributesSize:Q(this.customAttributes_)},a=Pr();return a.postMessage(s,[e.buffer]),e=null,new Promise(l=>{let c=h=>{let f=h.data;if(f.id!==o||(a.removeEventListener("message",c),!this.helper_.getGL()))return;let u=new be(Z,K).fromArrayBuffer(f.vertexBuffer),m=new be(Y,K).fromArrayBuffer(f.indexBuffer);this.helper_.flushBufferData(u),this.helper_.flushBufferData(m),l([m,u])};a.addEventListener("message",c)})}render(e,t,r){this.hasFill_&&this.renderInternal_(e.polygonBuffers[0],e.polygonBuffers[1],this.fillProgram_,this.polygonAttributesDesc_,t,r),this.hasStroke_&&this.renderInternal_(e.lineStringBuffers[0],e.lineStringBuffers[1],this.strokeProgram_,this.lineStringAttributesDesc_,t,r),this.hasSymbol_&&this.renderInternal_(e.pointBuffers[0],e.pointBuffers[1],this.symbolProgram_,this.pointAttributesDesc_,t,r)}renderInternal_(e,t,r,o,i,s){let a=e.getSize();a!==0&&(this.helper_.useProgram(r,i),this.helper_.bindBuffer(t),this.helper_.bindBuffer(e),this.helper_.enableAttributes(o),s(),this.helper_.drawElements(0,a))}setHelper(e,t=null){this.helper_=e,this.hasFill_&&(this.fillProgram_=this.helper_.getProgram(this.fillFragmentShader_,this.fillVertexShader_)),this.hasStroke_&&(this.strokeProgram_=this.helper_.getProgram(this.strokeFragmentShader_,this.strokeVertexShader_)),this.hasSymbol_&&(this.symbolProgram_=this.helper_.getProgram(this.symbolFragmentShader_,this.symbolVertexShader_)),this.helper_.addUniforms(this.uniforms_),t&&(t.polygonBuffers&&(this.helper_.flushBufferData(t.polygonBuffers[0]),this.helper_.flushBufferData(t.polygonBuffers[1])),t.lineStringBuffers&&(this.helper_.flushBufferData(t.lineStringBuffers[0]),this.helper_.flushBufferData(t.lineStringBuffers[1])),t.pointBuffers&&(this.helper_.flushBufferData(t.pointBuffers[0]),this.helper_.flushBufferData(t.pointBuffers[1])))}},Yt=Xe;var F=new Uint8Array(4),He=class{constructor(e,t){this.helper_=e;let r=e.getGL();this.texture_=r.createTexture(),this.framebuffer_=r.createFramebuffer(),this.depthbuffer_=r.createRenderbuffer(),this.size_=t||[1,1],this.data_=new Uint8Array(0),this.dataCacheDirty_=!0,this.updateSize_()}setSize(e){Je(e,this.size_)||(this.size_[0]=e[0],this.size_[1]=e[1],this.updateSize_())}getSize(){return this.size_}clearCachedData(){this.dataCacheDirty_=!0}readAll(){if(this.dataCacheDirty_){let e=this.size_,t=this.helper_.getGL();t.bindFramebuffer(t.FRAMEBUFFER,this.framebuffer_),t.readPixels(0,0,e[0],e[1],t.RGBA,t.UNSIGNED_BYTE,this.data_),this.dataCacheDirty_=!1}return this.data_}readPixel(e,t){if(e<0||t<0||e>this.size_[0]||t>=this.size_[1])return F[0]=0,F[1]=0,F[2]=0,F[3]=0,F;this.readAll();let r=Math.floor(e)+(this.size_[1]-Math.floor(t)-1)*this.size_[0];return F[0]=this.data_[r*4],F[1]=this.data_[r*4+1],F[2]=this.data_[r*4+2],F[3]=this.data_[r*4+3],F}getTexture(){return this.texture_}getFramebuffer(){return this.framebuffer_}getDepthbuffer(){return this.depthbuffer_}updateSize_(){let e=this.size_,t=this.helper_.getGL();this.texture_=this.helper_.createTexture(e,null,this.texture_),t.bindFramebuffer(t.FRAMEBUFFER,this.framebuffer_),t.viewport(0,0,e[0],e[1]),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,this.texture_,0),t.bindRenderbuffer(t.RENDERBUFFER,this.depthbuffer_),t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_COMPONENT16,e[0],e[1]),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,this.depthbuffer_),this.data_=new Uint8Array(e[0]*e[1]*4)}},Kt=He;function qt(n,e){let t=n.viewState.projection,o=e.getSource().getWrapX()&&t.canWrapX(),i=t.getExtent(),s=n.extent,a=o?st(i):null,l=o?Math.ceil((s[2]-i[2])/a)+1:1;return[o?Math.floor((s[0]-i[0])/a):0,l,a]}var k=ee(v({},C),{RENDER_EXTENT:"u_renderExtent",PATTERN_ORIGIN:"u_patternOrigin",GLOBAL_ALPHA:"u_globalAlpha"}),Ze=class extends Bt{constructor(e,t){let r={[k.RENDER_EXTENT]:[0,0,0,0],[k.PATTERN_ORIGIN]:[0,0],[k.GLOBAL_ALPHA]:1};super(e,{uniforms:r,postProcesses:t.postProcesses}),this.hitDetectionEnabled_=!t.disableHitDetection,this.hitRenderTarget_,this.sourceRevision_=-1,this.previousExtent_=it(),this.currentTransform_=R(),this.tmpCoords_=[0,0],this.tmpTransform_=R(),this.tmpMat4_=se(),this.currentFrameStateTransform_=R(),this.styleVariables_={},this.styles_=[],this.styleRenderers_=[],this.buffers_=[],this.applyOptions_(t),this.batch_=new Mt,this.initialFeaturesAdded_=!1,this.sourceListenKeys_=null}addInitialFeatures_(e){let t=this.getLayer().getSource(),r=ye(),o;r&&(o=at(r,e.viewState.projection)),this.batch_.addFeatures(t.getFeatures(),o),this.sourceListenKeys_=[j(t,X.ADDFEATURE,this.handleSourceFeatureAdded_.bind(this,o)),j(t,X.CHANGEFEATURE,this.handleSourceFeatureChanged_,this),j(t,X.REMOVEFEATURE,this.handleSourceFeatureDelete_,this),j(t,X.CLEAR,this.handleSourceFeatureClear_,this)]}applyOptions_(e){this.styleVariables_=e.variables,this.styles_=Zt(e.style)}createRenderers_(){this.buffers_=[],this.styleRenderers_=this.styles_.map(e=>new Yt(e,this.styleVariables_,this.helper,this.hitDetectionEnabled_,"filter"in e?e.filter:null))}reset(e){this.applyOptions_(e),this.helper&&this.createRenderers_(),super.reset(e)}afterHelperCreated(){this.styleRenderers_.length?this.styleRenderers_.forEach((e,t)=>e.setHelper(this.helper,this.buffers_[t])):this.createRenderers_(),this.hitDetectionEnabled_&&(this.hitRenderTarget_=new Kt(this.helper))}handleSourceFeatureAdded_(e,t){let r=t.feature;this.batch_.addFeature(r,e)}handleSourceFeatureChanged_(e){let t=e.feature;this.batch_.changeFeature(t)}handleSourceFeatureDelete_(e){let t=e.feature;this.batch_.removeFeature(t)}handleSourceFeatureClear_(){this.batch_.clear()}applyUniforms_(e){ut(this.tmpTransform_,this.currentFrameStateTransform_),ht(this.tmpTransform_,e),this.helper.setUniformMatrixValue(k.PROJECTION_MATRIX,H(this.tmpMat4_,this.tmpTransform_)),V(this.tmpTransform_,this.tmpTransform_),this.helper.setUniformMatrixValue(k.SCREEN_TO_WORLD_MATRIX,H(this.tmpMat4_,this.tmpTransform_)),this.tmpCoords_[0]=0,this.tmpCoords_[1]=0,V(this.tmpTransform_,e),W(this.tmpTransform_,this.tmpCoords_),this.helper.setUniformFloatVec2(k.PATTERN_ORIGIN,this.tmpCoords_)}renderFrame(e){let t=this.helper.getGL();this.preRender(t,e);let[r,o,i]=qt(e,this.getLayer());this.helper.prepareDraw(e),this.renderWorlds(e,!1,r,o,i),this.helper.finalizeDraw(e,this.dispatchPreComposeEvent,this.dispatchPostComposeEvent);let s=this.helper.getCanvas();return this.hitDetectionEnabled_&&(this.renderWorlds(e,!0,r,o,i),this.hitRenderTarget_.clearCachedData()),this.postRender(t,e),s}prepareFrameInternal(e){this.initialFeaturesAdded_||(this.addInitialFeatures_(e),this.initialFeaturesAdded_=!0);let t=this.getLayer(),r=t.getSource(),o=e.viewState,i=!e.viewHints[ve.ANIMATING]&&!e.viewHints[ve.INTERACTING],s=!ot(this.previousExtent_,e.extent),a=this.sourceRevision_<r.getRevision();if(a&&(this.sourceRevision_=r.getRevision()),i&&(s||a)){let l=o.projection,c=o.resolution,h=t instanceof ie?t.getRenderBuffer():0,f=nt(e.extent,h*c),u=ye();u?r.loadFeatures(lt(f,u),ct(c,l),u):r.loadFeatures(f,c,l),this.ready=!1;let m=this.helper.makeProjectionTransform(e,R()),y=this.styleRenderers_.map((Te,z)=>Te.generateBuffers(this.batch_,m).then(Qt=>{this.buffers_[z]&&this.disposeBuffers(this.buffers_[z]),this.buffers_[z]=Qt}));Promise.all(y).then(()=>{this.ready=!0,this.getLayer().changed()}),this.previousExtent_=e.extent.slice()}return!0}renderWorlds(e,t,r,o,i){let s=r;t&&(this.hitRenderTarget_.setSize([Math.floor(e.size[0]/2),Math.floor(e.size[1]/2)]),this.helper.prepareDrawToRenderTarget(e,this.hitRenderTarget_,!0));do{this.helper.makeProjectionTransform(e,this.currentFrameStateTransform_),ft(this.currentFrameStateTransform_,s*i,0);for(let a=0,l=this.styleRenderers_.length;a<l;a++){let c=this.styleRenderers_[a],h=this.buffers_[a];h&&c.render(h,e,()=>{this.applyUniforms_(h.invertVerticesTransform),this.helper.applyHitDetectionUniform(t)})}}while(++s<o)}forEachFeatureAtCoordinate(e,t,r,o,i){if(U(this.hitDetectionEnabled_,"`forEachFeatureAtCoordinate` cannot be used on a WebGL layer if the hit detection logic has been disabled using the `disableHitDetection: true` option."),!this.styleRenderers_.length||!this.hitDetectionEnabled_)return;let s=W(t.coordinateToPixelTransform,e.slice()),a=this.hitRenderTarget_.readPixel(s[0]/2,s[1]/2),l=[a[0]/255,a[1]/255,a[2]/255,a[3]/255],c=zt(l),h=this.batch_.getFeatureFromRef(c);if(h)return o(h,this.getLayer(),null)}disposeBuffers(e){let t=r=>{for(let o of r)o&&this.helper.deleteBuffer(o)};e.pointBuffers&&t(e.pointBuffers),e.lineStringBuffers&&t(e.lineStringBuffers),e.polygonBuffers&&t(e.polygonBuffers)}disposeInternal(){this.buffers_.forEach(e=>{e&&this.disposeBuffers(e)}),this.sourceListenKeys_&&(this.sourceListenKeys_.forEach(function(e){et(e)}),this.sourceListenKeys_=null),super.disposeInternal()}renderDeclutter(){}},Jt=Ze;var D={BLUR:"blur",GRADIENT:"gradient",RADIUS:"radius"},Cr=["#00f","#0ff","#0f0","#ff0","#f00"],Ye=class extends ie{constructor(e){e=e||{};let t=Object.assign({},e);delete t.gradient,delete t.radius,delete t.blur,delete t.weight,super(t),this.filter_=e.filter??!0,this.styleVariables_=e.variables||{},this.gradient_=null,this.addChangeListener(D.GRADIENT,this.handleGradientChanged_),this.setGradient(e.gradient?e.gradient:Cr),this.setBlur(e.blur!==void 0?e.blur:15),this.setRadius(e.radius!==void 0?e.radius:8);let r=e.weight?e.weight:"weight";this.weight_=r,this.setRenderOrder(null)}getBlur(){return this.get(D.BLUR)}getGradient(){return this.get(D.GRADIENT)}getRadius(){return this.get(D.RADIUS)}handleGradientChanged_(){this.gradient_=br(this.getGradient())}setBlur(e){let t=this.get(D.BLUR);if(this.set(D.BLUR,e),typeof e=="number"&&typeof t=="number"){this.changed();return}this.clearRenderer()}setGradient(e){this.set(D.GRADIENT,e)}setRadius(e){let t=this.get(D.RADIUS);if(this.set(D.RADIUS,e),typeof e=="number"&&typeof t=="number"){this.changed();return}this.clearRenderer()}setFilter(e){this.filter_=e,this.changed(),this.clearRenderer()}setWeight(e){this.weight_=e,this.changed(),this.clearRenderer()}createRenderer(){let e=new G,t=ue(),r=p(t,this.filter_,$),o=p(t,this.getRadius(),_),i=p(t,this.getBlur(),_),s={};typeof this.getBlur()=="number"&&(i="a_blur",s.a_blur=()=>this.getBlur(),e.addUniform("float a_blur")),typeof this.getRadius()=="number"&&(o="a_radius",s.a_radius=()=>this.getRadius(),e.addUniform("float a_radius"));let a={},l=null;if(typeof this.weight_=="string"||typeof this.weight_=="function"){let f=typeof this.weight_=="string"?u=>u.get(this.weight_):this.weight_;a.prop_weight={size:1,callback:u=>{let m=f(u);return m!==void 0?rt(m,0,1):1}},l="a_prop_weight",e.addAttribute("a_prop_weight","float")}else{let f=["clamp",this.weight_,0,1];l=p(t,f,_)}e.addFragmentShaderFunction(`float getBlurSlope() {
  float blur = max(1., ${i});
  float radius = ${o};
  return radius / blur;
}`).setSymbolSizeExpression(`vec2(${o} + ${i}) * 2.`).setSymbolColorExpression(`vec4(smoothstep(0., 1., (1. - length(coordsPx * 2. / v_quadSizePx)) * getBlurSlope()) * ${l})`).setStrokeColorExpression(`vec4(smoothstep(0., 1., (1. - length(currentRadiusPx * 2. / v_width)) * getBlurSlope()) * ${l})`).setStrokeWidthExpression(`(${o} + ${i}) * 2.`).setFillColorExpression(`vec4(${l})`).setFragmentDiscardExpression(`!${r}`),ge(e,t);let c=me(t),h=_e(t,this.styleVariables_);return new Jt(this,{className:this.getClassName(),variables:this.styleVariables_,style:{builder:e,attributes:v(v({},c),a),uniforms:v(v({},h),s)},disableHitDetection:!1,postProcesses:[{fragmentShader:`
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
            }`,uniforms:{u_gradientTexture:()=>this.gradient_,u_opacity:()=>this.getOpacity()}}]})}updateStyleVariables(e){Object.assign(this.styleVariables_,e),this.changed()}renderDeclutter(){}};function br(n){let r=dt(1,256),o=r.createLinearGradient(0,0,1,256),i=1/(n.length-1);for(let s=0,a=n.length;s<a;++s)o.addColorStop(s*i,n[s]);return r.fillStyle=o,r.fillRect(0,0,1,256),r.canvas}var Fr=Ye;export{Fr as a};
