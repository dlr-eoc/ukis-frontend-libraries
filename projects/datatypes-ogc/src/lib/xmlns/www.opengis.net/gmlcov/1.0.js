var cxml = require("cxml");
var Primitive = require('../../xml-primitives');
var gml = require('../gml/3.2');
var swe = require('../swe/2.0');
var xlink = require('../../www.w3.org/1999/xlink');

cxml.register('http://www.opengis.net/gmlcov/1.0', exports, [
	[Primitive, ['any', 'boolean', 'number', 'string'], []],
	[gml, ['AbstractCoverageType', 'AbstractGeneralParameterValueType', 'AbstractGeometricAggregateType', 'AbstractMetadataPropertyType', 'CoverageFunctionType', 'DMSAngleType', 'DirectPositionListType', 'GeometryPropertyType', 'GridType', 'MeasureListType', 'MeasureType', 'NilReasonType', 'OperationParameterType', 'VectorType', 'integerList'], ['AbstractCoverage', 'AbstractFeature', 'AbstractGeneralOperationParameter', 'AbstractGeneralParameterValue', 'AbstractGeometricAggregate', 'AbstractObject', 'Grid', 'OperationParameter', 'booleanValue', 'coverageFunction', 'dmsAngleValue', 'integerValue', 'integerValueList', 'nilReason', 'owns', 'remoteSchema', 'stringValue', 'value', 'valueFile', 'valueList']],
	[xlink, ['actuateType', 'arcroleType', 'hrefType', 'roleType', 'showType', 'titleAttrType', 'typeType'], ['actuate', 'arcrole', 'href', 'role', 'show', 'title', 'type']],
	[swe, ['DataRecordPropertyType'], []]
], [
	'AbstractContinuousCoverageType',
	'AbstractCoverageType',
	'AbstractDiscreteCoverageType',
	'AbstractReferenceableGridType',
	'ExtensionType',
	'MetadataType',
	'ParameterValueType',
	'ReferenceableGridPropertyType',
	'SimpleMultiPointType'
], [
	[0, 0, [[29, 0], [30, 0], [31, 0], [32, 0], [33, 0], [34, 0], [35, 0], [36, 0], [37, 0], [38, 0], [39, 0], [40, 0], [41, 0], [43, 0], [44, 0], [45, 0], [46, 0], [47, 0], [48, 0]], []],
	[0, 29, [], []],
	[0, 5, [[10, 1], [36, 3], [43, 0]], []],
	[0, 29, [], []],
	[0, 13, [], []],
	[0, 0, [[28, 3]], []],
	[0, 8, [[33, 1]], [[14, 0], [16, 0], [21, 0], [22, 0], [23, 0], [24, 0], [25, 0], [26, 0], [27, 0]]],
	[0, 6, [[9, 0], [11, 0], [34, 0], [12, 0], [13, 0], [8, 0], [17, 0], [18, 0], [19, 0], [20, 0], [48, 0]], []],
	[0, 0, [[32, 0]], [[14, 0], [15, 0], [16, 0], [21, 0], [22, 0], [23, 0], [24, 0], [25, 0], [26, 0], [27, 0]]],
	[0, 7, [[42, 0]], []],
	[0, 0, [], []],
	[0, 0, [[35, 1], [44, 1], [45, 1]], []],
	[0, 0, [[37, 1], [38, 1], [39, 1], [40, 1]], []],
	[0, 0, [], []]
], [
	['*', [1], 4],
	['AbstractContinuousCoverage', [28], 1, 1],
	['AbstractCoverage', [29], 3, 2],
	['AbstractDiscreteCoverage', [30], 3, 30],
	['AbstractReferenceableGrid', [31], 1, 7],
	['Extension', [32], 0],
	['geometryValue', [12], 0],
	['GridCoverage', [30], 0, 30],
	['metadata', [33], 0],
	['MultiCurveCoverage', [30], 0, 31],
	['MultiPointCoverage', [30], 0, 31],
	['MultiSolidCoverage', [30], 0, 31],
	['MultiSurfaceCoverage', [30], 0, 31],
	['ParameterValue', [34], 0, 4],
	['positions', [11], 0],
	['rangeType', [27], 0],
	['RectifiedGridCoverage', [30], 0, 30],
	['ReferenceableGridCoverage', [30], 0, 30],
	['referenceableGridProperty', [35], 0],
	['SimpleMultiPoint', [36], 0, 5],
	['vectorValue', [18], 0]
]);