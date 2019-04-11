var cxml = require("cxml");
var Primitive = require('../../xml-primitives');
var gco = require('./gco');
var gml = require('../../www.opengis.net/gml/3.2');
var xlink = require('../../www.w3.org/1999/xlink');

cxml.register('http://www.isotc211.org/2005/gsr', exports, [
	[Primitive, ['string'], []],
	[gml, ['AbstractCRSType', 'NilReasonType'], ['AbstractCRS', 'Definition']],
	[xlink, ['actuateType', 'arcroleType', 'hrefType', 'roleType', 'showType', 'titleAttrType', 'typeType'], ['actuate', 'arcrole', 'href', 'role', 'show', 'title', 'type']],
	[gco, [], ['nilReason', 'uuidref']]
], [
	'SC_CRS_PropertyType'
], [
	[0, 0, [], []],
	[0, 0, [[1, 1]], [[11, 0], [10, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0]]]
], [
]);