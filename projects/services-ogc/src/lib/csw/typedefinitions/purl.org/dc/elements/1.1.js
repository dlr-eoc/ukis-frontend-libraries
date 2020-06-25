var cxml = require("cxml");
var Primitive = require('../../../xml-primitives');

cxml.register('http://purl.org/dc/elements/1.1', exports, [
	[Primitive, ['any', 'string'], []]
], [
	'elementContainer',
	'SimpleLiteral'
], [
	[0, 0, [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [14, 0], [15, 0], [16, 0], [17, 0]], []],
	[0, 0, [[5, 3]], []],
	[1, 1, [], [[13, 1]]],
	[0, 0, [[2, 1]], []],
	[0, 0, [[4, 1]], []],
	[0, 0, [[17, 1], [15, 1], [1, 1], [3, 1], [9, 1], [10, 1], [14, 1]], []],
	[0, 0, [[6, 1]], []],
	[0, 0, [[7, 1]], []],
	[0, 0, [[8, 1]], []],
	[0, 0, [[11, 1]], []],
	[0, 0, [[12, 1]], []],
	[0, 0, [[16, 1]], []]
], [
	['contributor', [4], 0, 5],
	['coverage', [4], 2, 5],
	['creator', [4], 0, 5],
	['date', [4], 2, 5],
	['DCElement:DC-element', [4], 3],
	['description', [4], 2, 5],
	['format', [4], 2, 5],
	['identifier', [4], 2, 5],
	['language', [4], 0, 5],
	['publisher', [4], 0, 5],
	['relation', [4], 2, 5],
	['rights', [4], 2, 5],
	['scheme', [2], 0],
	['source', [4], 0, 5],
	['subject', [4], 0, 5],
	['title', [4], 2, 5],
	['type', [4], 0, 5]
]);