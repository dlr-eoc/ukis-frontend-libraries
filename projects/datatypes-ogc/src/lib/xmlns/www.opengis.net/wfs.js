var cxml = require("cxml");
var Primitive = require('../xml-primitives');
var gml = require('./gml');
var ogc = require('./ogc');

cxml.register('http://www.opengis.net/wfs', exports, [
	[Primitive, ['boolean', 'number', 'string'], []],
	[gml, ['AbstractFeatureCollectionType', 'AbstractFeatureType'], ['_Feature', '_FeatureCollection']],
	[ogc, ['FeatureIdType', 'FilterType', 'PropertyNameType'], ['FeatureId', 'Filter', 'PropertyName', 'expression']]
], [
	'AllSomeType',
	'DeleteElementType',
	'DescribeFeatureTypeType',
	'EmptyType',
	'FeatureCollectionType',
	'FeaturesLockedType',
	'FeaturesNotLockedType',
	'GetCapabilitiesType',
	'GetFeatureType',
	'GetFeatureWithLockType',
	'InsertElementType',
	'InsertResultType',
	'LockFeatureType',
	'LockType',
	'NativeType',
	'PropertyType',
	'QueryType',
	'StatusType',
	'TransactionResultType',
	'TransactionType',
	'UpdateElementType',
	'WFS_LockFeatureResponseType',
	'WFS_TransactionResponseType'
], [
	[0, 0, [[7, 0], [8, 0], [11, 0], [12, 0], [14, 0], [15, 0], [16, 0], [27, 0], [29, 0], [31, 0], [36, 0], [40, 0], [41, 0], [42, 0], [50, 0], [51, 0], [57, 0], [66, 0], [67, 0]], []],
	[3, 3, [], []],
	[0, 0, [[4, 0]], [[20, 1], [52, 0]]],
	[0, 0, [[56, 3]], [[38, 1], [49, 0], [64, 0]]],
	[0, 0, [], []],
	[0, 4, [], [[30, 1]]],
	[0, 0, [[3, 2]], []],
	[0, 0, [[3, 2]], []],
	[0, 0, [], [[45, 0], [65, 1]]],
	[0, 0, [[42, 2]], [[18, 1], [32, 1], [39, 1], [46, 0], [62, 0]]],
	[0, 0, [[42, 2]], [[10, 1], [21, 1], [33, 1], [37, 1], [44, 0], [60, 0]]],
	[0, 0, [[1, 2]], [[22, 1]]],
	[0, 0, [[3, 2]], [[23, 1]]],
	[0, 0, [[71, 2]], [[9, 1], [72, 1], [48, 0], [63, 0]]],
	[0, 0, [[4, 1]], [[17, 1], [54, 0]]],
	[0, 0, [], [[43, 0], [58, 0]]],
	[0, 0, [[35, 0], [76, 1]], []],
	[0, 0, [[4, 1], [5, 3]], [[13, 1], [25, 1], [55, 0]]],
	[0, 0, [[11, 0], [40, 0], [50, 0]], []],
	[0, 0, [[28, 1], [34, 1], [74, 0]], [[24, 1]]],
	[0, 0, [[7, 3], [27, 3], [31, 1], [36, 3], [57, 3]], [[26, 1], [73, 1], [47, 0], [61, 0]]],
	[0, 0, [[4, 1], [41, 2]], [[19, 1], [53, 0]]],
	[0, 0, [[68, 1], [69, 1], [31, 0]], []],
	[0, 0, [[70, 3], [75, 0]], [[59, 0]]]
], [
	['Delete', [10], 0],
	['DescribeFeatureType', [11], 0],
	['expiry', [2], 0],
	['expiry', [2], 0],
	['FAILED', [12], 0],
	['FeatureCollection', [13], 0, 2],
	['featureVersion', [3], 0],
	['GetCapabilities', [16], 0],
	['GetFeature', [17], 0],
	['GetFeatureWithLock', [18], 0],
	['handle', [3], 0],
	['handle', [3], 0],
	['handle', [3], 0],
	['handle', [3], 0],
	['handle', [3], 0],
	['handle', [3], 0],
	['handle', [3], 0],
	['handle', [3], 0],
	['handle', [3], 0],
	['handle', [3], 0],
	['Insert', [19], 0],
	['Locator', [3], 0],
	['LockFeature', [21], 0],
	['lockId', [3], 0],
	['LockId', [3], 0],
	['maxFeatures', [2], 0],
	['maxFeatures', [2], 0],
	['Message', [3], 0],
	['Name', [3], 0],
	['Native', [23], 0],
	['outputFormat', [3], 0],
	['outputFormat', [3], 0],
	['outputFormat', [3], 0],
	['PARTIAL', [12], 0],
	['Property', [24], 0],
	['Query', [25], 0],
	['safeToIgnore', [1], 0],
	['service', [3], 0],
	['service', [3], 0],
	['service', [3], 0],
	['service', [3], 0],
	['service', [3], 0],
	['service', [3], 0],
	['SUCCESS', [12], 0],
	['Transaction', [28], 0],
	['typeName', [3], 0],
	['typeName', [3], 0],
	['typeName', [3], 0],
	['typeName', [3], 0],
	['TypeName', [3], 0],
	['Update', [29], 0],
	['vendorId', [3], 0],
	['version', [3], 0],
	['version', [3], 0],
	['version', [3], 0],
	['version', [3], 0],
	['version', [3], 0],
	['version', [3], 0],
	['version', [3], 0],
	['WFS_LockFeatureResponse', [30], 0],
	['WFS_TransactionResponse', [31], 0],
	['FeaturesLocked', [14], 0],
	['FeaturesNotLocked', [15], 0],
	['InsertResult', [20], 0],
	['Lock', [22], 0],
	['lockAction', [9], 0],
	['releaseAction', [9], 0],
	['Status', [26], 0],
	['TransactionResult', [27], 0],
	['Value', [], 0]
]);