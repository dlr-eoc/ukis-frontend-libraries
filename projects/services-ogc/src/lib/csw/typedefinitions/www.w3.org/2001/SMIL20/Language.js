var cxml = require("cxml");
var Primitive = require('../../../xml-primitives');
var smil20 = require('../SMIL20');
var xml = require('../../XML/1998/namespace');

cxml.register('http://www.w3.org/2001/SMIL20/Language', exports, [
	[Primitive, ['any', 'boolean', 'number', 'string'], []],
	[xml, ['LangType'], ['lang']],
	[smil20, ['Type', 'animateColorPrototype', 'animateMotionPrototype', 'animatePrototype', 'fillDefaultType', 'fillTimingAttrsType', 'nonNegativeDecimalType', 'restartDefaultType', 'restartTimingType', 'setPrototype', 'syncBehaviorDefaultType', 'syncBehaviorType'], ['alt', 'begin', 'calcMode', 'class', 'dur', 'end', 'fill', 'fillDefault', 'id', 'longdesc', 'max', 'min', 'repeat', 'repeatCount', 'repeatDur', 'restart', 'restartDefault', 'skip-content', 'syncBehavior', 'syncBehaviorDefault', 'syncTolerance', 'syncToleranceDefault', 'targetElement']]
], [
	'animateColorType',
	'animateMotionType',
	'animateType',
	'setType'
], [
	[0, 0, [[33, 0], [34, 0], [35, 0], [36, 0]], []],
	[0, 7, [[30, 3]], [[2, 1], [3, 0], [4, 1], [5, 1], [6, 0], [7, 0], [8, 0], [9, 0], [10, 1], [1, 1], [11, 1], [12, 0], [13, 0], [14, 0], [15, 0], [16, 0], [17, 0], [18, 0], [19, 1], [20, 0], [21, 0], [22, 1], [23, 0], [24, 1], [29, 0]]],
	[0, 8, [[28, 3]], [[2, 1], [3, 0], [4, 1], [5, 1], [6, 0], [7, 0], [8, 0], [9, 0], [10, 1], [1, 1], [11, 1], [12, 0], [13, 0], [14, 0], [15, 0], [16, 0], [17, 0], [18, 0], [19, 1], [20, 0], [21, 0], [22, 1], [23, 0], [24, 1], [27, 0]]],
	[0, 9, [[26, 3]], [[2, 1], [3, 0], [4, 1], [5, 1], [6, 0], [7, 0], [8, 0], [9, 0], [10, 1], [1, 1], [11, 1], [12, 0], [13, 0], [14, 0], [15, 0], [16, 0], [17, 0], [18, 0], [19, 1], [20, 0], [21, 0], [22, 1], [23, 0], [24, 1], [25, 0]]],
	[0, 15, [[32, 3]], [[2, 1], [3, 0], [5, 1], [6, 0], [7, 0], [8, 0], [9, 0], [10, 1], [1, 1], [11, 1], [12, 0], [13, 0], [14, 0], [15, 0], [16, 0], [17, 0], [18, 0], [19, 1], [20, 0], [21, 0], [22, 1], [23, 0], [24, 1], [31, 0]]],
	[0, 0, [[34, 1]], []],
	[0, 0, [[35, 1]], []],
	[0, 0, [[33, 1]], []],
	[0, 0, [[36, 1]], []]
], [
	['*', [1], 4],
	['*', [1], 4],
	['*', [1], 4],
	['*', [1], 4],
	['*', [1], 4],
	['*', [1], 4],
	['*', [1], 4],
	['*', [1], 4],
	['animate', [20], 2],
	['animateColor', [18], 2],
	['animateMotion', [19], 2],
	['set', [21], 2]
]);