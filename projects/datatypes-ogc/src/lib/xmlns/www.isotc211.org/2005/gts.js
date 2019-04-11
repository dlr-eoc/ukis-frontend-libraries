var cxml = require("cxml");
var Primitive = require('../../xml-primitives');
var gco = require('./gco');
var gml = require('../../www.opengis.net/gml/3.2');
var xlink = require('../../www.w3.org/1999/xlink');

cxml.register('http://www.isotc211.org/2005/gts', exports, [
	[Primitive, ['string'], []],
	[gml, ['AbstractTimePrimitiveType', 'NilReasonType'], ['AbstractTimeObject', 'AbstractTimePrimitive']],
	[xlink, ['actuateType', 'arcroleType', 'hrefType', 'roleType', 'showType', 'titleAttrType', 'typeType'], ['actuate', 'arcrole', 'href', 'role', 'show', 'title', 'type']],
	[gco, [], ['nilReason', 'uuidref']]
], [
	'TM_PeriodDuration_PropertyType',
	'TM_Primitive_PropertyType'
], [
	[0, 0, [[12, 0]], []],
	[0, 0, [[12, 1]], [[10, 0]]],
	[0, 0, [[2, 1]], [[11, 0], [10, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0]]]
], [
	['TM_PeriodDuration', [1], 0]
]);