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
  CylinderGeometry_default
} from "./chunk-L6RTJ3RE.js";
import "./chunk-TO2PVHKI.js";
import "./chunk-Q55ECN3Y.js";
import "./chunk-KUN2ZA5X.js";
import "./chunk-QD4KM3GO.js";
import "./chunk-R6B7UCQB.js";
import "./chunk-GR3CDLCP.js";
import "./chunk-DOXCPOG4.js";
import "./chunk-O3JCMSS3.js";
import "./chunk-2J3JKXCP.js";
import "./chunk-PYHLO636.js";
import "./chunk-MSKXMXJI.js";
import "./chunk-OOK53QUQ.js";
import "./chunk-T77JILCU.js";
import "./chunk-VE7BFUIX.js";
import "./chunk-S3PI2KFM.js";
import {
  defined_default
} from "./chunk-AA4GZKOT.js";

// packages/engine/Source/Workers/createCylinderGeometry.js
function createCylinderGeometry(cylinderGeometry, offset) {
  if (defined_default(offset)) {
    cylinderGeometry = CylinderGeometry_default.unpack(cylinderGeometry, offset);
  }
  return CylinderGeometry_default.createGeometry(cylinderGeometry);
}
var createCylinderGeometry_default = createCylinderGeometry;
export {
  createCylinderGeometry_default as default
};
