define(['./defaultValue-fe22d8c0', './FrustumGeometry-4a7589ed', './Transforms-b527bb09', './Matrix3-41c58dde', './Check-6ede7e26', './Math-0a2ac845', './Matrix2-e1298525', './RuntimeError-ef395448', './combine-d9581036', './ComponentDatatype-cf1fa08e', './WebGLConstants-0b1ce7ba', './GeometryAttribute-a5b6275b', './GeometryAttributes-ad136444', './Plane-4c3d403b', './VertexFormat-030f11ff'], (function (defaultValue, FrustumGeometry, Transforms, Matrix3, Check, Math, Matrix2, RuntimeError, combine, ComponentDatatype, WebGLConstants, GeometryAttribute, GeometryAttributes, Plane, VertexFormat) { 'use strict';

  function createFrustumGeometry(frustumGeometry, offset) {
    if (defaultValue.defined(offset)) {
      frustumGeometry = FrustumGeometry.FrustumGeometry.unpack(frustumGeometry, offset);
    }
    return FrustumGeometry.FrustumGeometry.createGeometry(frustumGeometry);
  }

  return createFrustumGeometry;

}));
