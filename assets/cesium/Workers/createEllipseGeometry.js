/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.119
 *
 * Copyright 2011-2022 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */

import {
  EllipseGeometry_default
} from "./chunk-VO3ACQB2.js";
import "./chunk-NTXTUNEF.js";
import "./chunk-GRAT5GE7.js";
import "./chunk-JYAHOGGL.js";
import "./chunk-OORVMGDU.js";
import "./chunk-I2RC4XVN.js";
import "./chunk-Q55ECN3Y.js";
import "./chunk-KUN2ZA5X.js";
import "./chunk-XD445VDH.js";
import "./chunk-4BAE4PWO.js";
import "./chunk-QD4KM3GO.js";
import "./chunk-R6B7UCQB.js";
import "./chunk-GR3CDLCP.js";
import "./chunk-DOXCPOG4.js";
import "./chunk-O3JCMSS3.js";
import "./chunk-2J3JKXCP.js";
import {
  Cartesian3_default,
  Ellipsoid_default
} from "./chunk-PYHLO636.js";
import "./chunk-MSKXMXJI.js";
import "./chunk-OOK53QUQ.js";
import "./chunk-T77JILCU.js";
import "./chunk-VE7BFUIX.js";
import "./chunk-S3PI2KFM.js";
import {
  defined_default
} from "./chunk-AA4GZKOT.js";

// packages/engine/Source/Workers/createEllipseGeometry.js
function createEllipseGeometry(ellipseGeometry, offset) {
  if (defined_default(offset)) {
    ellipseGeometry = EllipseGeometry_default.unpack(ellipseGeometry, offset);
  }
  ellipseGeometry._center = Cartesian3_default.clone(ellipseGeometry._center);
  ellipseGeometry._ellipsoid = Ellipsoid_default.clone(ellipseGeometry._ellipsoid);
  return EllipseGeometry_default.createGeometry(ellipseGeometry);
}
var createEllipseGeometry_default = createEllipseGeometry;
export {
  createEllipseGeometry_default as default
};
