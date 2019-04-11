var cxml = require("cxml");
var Primitive = require('../../xml-primitives');
var gco = require('./gco');
var gml = require('../../www.opengis.net/gml/3.2');
var xlink = require('../../www.w3.org/1999/xlink');

cxml.register('http://www.isotc211.org/2005/gss', exports, [
	[Primitive, ['string'], []],
	[gml, ['AbstractGeometryType', 'NilReasonType', 'PointType'], ['AbstractGML', 'AbstractGeometricPrimitive', 'AbstractGeometry', 'Point']],
	[xlink, ['actuateType', 'arcroleType', 'hrefType', 'roleType', 'showType', 'titleAttrType', 'typeType'], ['actuate', 'arcrole', 'href', 'role', 'show', 'title', 'type']],
	[gco, [], ['nilReason', 'uuidref']]
], [
	'GM_Object_PropertyType',
	'GM_Point_PropertyType'
], [
	[0, 0, [], []],
	[0, 0, [[3, 1]], [[13, 0], [12, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0]]],
	[0, 0, [[4, 1]], [[13, 0], [12, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0]]]
], [
]);