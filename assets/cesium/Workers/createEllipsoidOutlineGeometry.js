/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.129
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
  EllipsoidOutlineGeometry_default
} from "./chunk-CBFJVM6I.js";
import "./chunk-4TIR5UPL.js";
import "./chunk-77MDEA47.js";
import "./chunk-236N6BJN.js";
import "./chunk-CQMXZF4A.js";
import "./chunk-QJTIOB2Z.js";
import "./chunk-5RPUEFSA.js";
import "./chunk-IKDQX7DY.js";
import "./chunk-2BJXFXD7.js";
import "./chunk-QUFN3GEO.js";
import "./chunk-XYGBWBD5.js";
import "./chunk-IFIS4CVK.js";
import "./chunk-NZSBSY5K.js";
import {
  defined_default
} from "./chunk-HBNWBMAM.js";

// packages/engine/Source/Workers/createEllipsoidOutlineGeometry.js
function createEllipsoidOutlineGeometry(ellipsoidGeometry, offset) {
  if (defined_default(ellipsoidGeometry.buffer, offset)) {
    ellipsoidGeometry = EllipsoidOutlineGeometry_default.unpack(
      ellipsoidGeometry,
      offset
    );
  }
  return EllipsoidOutlineGeometry_default.createGeometry(ellipsoidGeometry);
}
var createEllipsoidOutlineGeometry_default = createEllipsoidOutlineGeometry;
export {
  createEllipsoidOutlineGeometry_default as default
};
