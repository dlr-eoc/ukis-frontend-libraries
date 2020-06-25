var cxml = require("cxml");
var dc = require('./elements/1.1');

cxml.register('http://purl.org/dc/terms', exports, [
	[dc, ['SimpleLiteral'], ['DC-element', 'coverage', 'date', 'description', 'format', 'identifier', 'relation', 'rights', 'title']]
], [
], [
	[0, 0, [[10, 0], [11, 0], [12, 0], [13, 0], [14, 0], [15, 0], [16, 0], [17, 0], [18, 0], [19, 0], [20, 0], [21, 0], [22, 0], [23, 0], [24, 0], [25, 0], [26, 0], [27, 0], [28, 0], [29, 0], [30, 0], [31, 0], [32, 0], [33, 0], [34, 0], [35, 0], [36, 0], [37, 0], [38, 0], [39, 0], [40, 0], [41, 0], [42, 0], [43, 0], [44, 0], [45, 0]], []],
	[0, 0, [[13, 1], [21, 1], [34, 1]], []]
], [
	['abstract', [1], 0, 4],
	['accessRights', [1], 0, 8],
	['alternative', [1], 0, 9],
	['audience', [1], 2, 1],
	['available', [1], 0, 3],
	['bibliographicCitation', [1], 0, 6],
	['conformsTo', [1], 0, 7],
	['created', [1], 0, 3],
	['dateAccepted', [1], 0, 3],
	['dateCopyrighted', [1], 0, 3],
	['dateSubmitted', [1], 0, 3],
	['educationLevel', [1], 0, 13],
	['extent', [1], 0, 5],
	['hasFormat', [1], 0, 7],
	['hasPart', [1], 0, 7],
	['hasVersion', [1], 0, 7],
	['isFormatOf', [1], 0, 7],
	['isPartOf', [1], 0, 7],
	['isReferencedBy', [1], 0, 7],
	['isReplacedBy', [1], 0, 7],
	['isRequiredBy', [1], 0, 7],
	['issued', [1], 0, 3],
	['isVersionOf', [1], 0, 7],
	['license', [1], 0, 8],
	['mediator', [1], 0, 13],
	['medium', [1], 0, 5],
	['modified', [1], 0, 3],
	['provenance', [1], 0, 1],
	['references', [1], 0, 7],
	['replaces', [1], 0, 7],
	['requires', [1], 0, 7],
	['rightsHolder', [1], 0, 1],
	['spatial', [1], 0, 2],
	['tableOfContents', [1], 0, 4],
	['temporal', [1], 0, 2],
	['valid', [1], 0, 3]
]);