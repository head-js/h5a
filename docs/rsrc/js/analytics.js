/* analytics.js-core 4.1.10 */
var analytics = (function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn) {
	  var module = { exports: {} };
		return fn(module, module.exports), module.exports;
	}

	function commonjsRequire (target) {
		throw new Error('Could not dynamically require "' + target + '". Please configure the dynamicRequireTargets option of @rollup/plugin-commonjs appropriately for this require call to behave properly.');
	}

	/**
	 * Gets the index at which the first occurrence of `NaN` is found in `array`.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
	 */
	function indexOfNaN(array, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 0 : -1);

	  while ((fromRight ? index-- : ++index < length)) {
	    var other = array[index];
	    if (other !== other) {
	      return index;
	    }
	  }
	  return -1;
	}

	var _indexOfNaN = indexOfNaN;

	/**
	 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOf(array, value, fromIndex) {
	  if (value !== value) {
	    return _indexOfNaN(array, fromIndex);
	  }
	  var index = fromIndex - 1,
	      length = array.length;

	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}

	var _baseIndexOf = baseIndexOf;

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	var _baseProperty = baseProperty;

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = _baseProperty('length');

	var _getLength = getLength;

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	var isObject_1 = isObject;

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array constructors, and
	  // PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject_1(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	var isFunction_1 = isFunction;

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	var isLength_1 = isLength;

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null &&
	    !(typeof value == 'function' && isFunction_1(value)) && isLength_1(_getLength(value));
	}

	var isArrayLike_1 = isArrayLike;

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @type {Function}
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	var isArray_1 = isArray;

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	var isObjectLike_1 = isObjectLike;

	/** `Object#toString` result references. */
	var stringTag = '[object String]';

	/** Used for built-in method references. */
	var objectProto$1 = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString$1 = objectProto$1.toString;

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray_1(value) && isObjectLike_1(value) && objectToString$1.call(value) == stringTag);
	}

	var isString_1 = isString;

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3);
	 * // => 3
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3');
	 * // => 3
	 */
	function toNumber(value) {
	  if (isObject_1(value)) {
	    var other = isFunction_1(value.valueOf) ? value.valueOf() : value;
	    value = isObject_1(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	var toNumber_1 = toNumber;

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308;

	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This function is loosely based on [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3');
	 * // => 3
	 */
	function toInteger(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber_1(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = (value < 0 ? -1 : 1);
	    return sign * MAX_INTEGER;
	  }
	  var remainder = value % 1;
	  return value === value ? (remainder ? value - remainder : value) : 0;
	}

	var toInteger_1 = toInteger;

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	var _arrayMap = arrayMap;

	/**
	 * The base implementation of `_.values` and `_.valuesIn` which creates an
	 * array of `object` property values corresponding to the property names
	 * of `props`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} props The property names to get values for.
	 * @returns {Object} Returns the array of property values.
	 */
	function baseValues(object, props) {
	  return _arrayMap(props, function(key) {
	    return object[key];
	  });
	}

	var _baseValues = baseValues;

	/** Used for built-in method references. */
	var objectProto$2 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto$2.hasOwnProperty;

	/** Built-in value references. */
	var getPrototypeOf = Object.getPrototypeOf;

	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
	  // that are composed entirely of index properties, return `false` for
	  // `hasOwnProperty` checks of them.
	  return hasOwnProperty.call(object, key) ||
	    (typeof object == 'object' && key in object && getPrototypeOf(object) === null);
	}

	var _baseHas = baseHas;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = Object.keys;

	/**
	 * The base implementation of `_.keys` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  return nativeKeys(Object(object));
	}

	var _baseKeys = baseKeys;

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	var _baseTimes = baseTimes;

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike_1(value) && isArrayLike_1(value);
	}

	var isArrayLikeObject_1 = isArrayLikeObject;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/** Used for built-in method references. */
	var objectProto$3 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$1 = objectProto$3.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString$2 = objectProto$3.toString;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto$3.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject_1(value) && hasOwnProperty$1.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString$2.call(value) == argsTag);
	}

	var isArguments_1 = isArguments;

	/**
	 * Creates an array of index keys for `object` values of arrays,
	 * `arguments` objects, and strings, otherwise `null` is returned.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array|null} Returns index keys, else `null`.
	 */
	function indexKeys(object) {
	  var length = object ? object.length : undefined;
	  if (isLength_1(length) &&
	      (isArray_1(object) || isString_1(object) || isArguments_1(object))) {
	    return _baseTimes(length, String);
	  }
	  return null;
	}

	var _indexKeys = indexKeys;

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER$1 = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER$1 : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	var _isIndex = isIndex;

	/** Used for built-in method references. */
	var objectProto$4 = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$4;

	  return value === proto;
	}

	var _isPrototype = isPrototype;

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  var isProto = _isPrototype(object);
	  if (!(isProto || isArrayLike_1(object))) {
	    return _baseKeys(object);
	  }
	  var indexes = _indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;

	  for (var key in object) {
	    if (_baseHas(object, key) &&
	        !(skipIndexes && (key == 'length' || _isIndex(key, length))) &&
	        !(isProto && key == 'constructor')) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	var keys_1 = keys;

	/**
	 * Creates an array of the own enumerable property values of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property values.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.values(new Foo);
	 * // => [1, 2] (iteration order is not guaranteed)
	 *
	 * _.values('hi');
	 * // => ['h', 'i']
	 */
	function values(object) {
	  return object ? _baseValues(object, keys_1(object)) : [];
	}

	var values_1 = values;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Checks if `value` is in `collection`. If `collection` is a string it's checked
	 * for a substring of `value`, otherwise [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * is used for equality comparisons. If `fromIndex` is negative, it's used as
	 * the offset from the end of `collection`.
	 *
	 * @static
	 * @memberOf _
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to search.
	 * @param {*} value The value to search for.
	 * @param {number} [fromIndex=0] The index to search from.
	 * @param- {Object} [guard] Enables use as an iteratee for functions like `_.reduce`.
	 * @returns {boolean} Returns `true` if `value` is found, else `false`.
	 * @example
	 *
	 * _.includes([1, 2, 3], 1);
	 * // => true
	 *
	 * _.includes([1, 2, 3], 1, 2);
	 * // => false
	 *
	 * _.includes({ 'user': 'fred', 'age': 40 }, 'fred');
	 * // => true
	 *
	 * _.includes('pebbles', 'eb');
	 * // => true
	 */
	function includes(collection, value, fromIndex, guard) {
	  collection = isArrayLike_1(collection) ? collection : values_1(collection);
	  fromIndex = (fromIndex && !guard) ? toInteger_1(fromIndex) : 0;

	  var length = collection.length;
	  if (fromIndex < 0) {
	    fromIndex = nativeMax(length + fromIndex, 0);
	  }
	  return isString_1(collection)
	    ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
	    : (!!length && _baseIndexOf(collection, value, fromIndex) > -1);
	}

	var includes_1 = includes;

	var componentUrl = createCommonjsModule(function (module, exports) {
	/**
	 * Parse the given `url`.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api public
	 */

	exports.parse = function(url){
	  var a = document.createElement('a');
	  a.href = url;
	  return {
	    href: a.href,
	    host: a.host || location.host,
	    port: ('0' === a.port || '' === a.port) ? port(a.protocol) : a.port,
	    hash: a.hash,
	    hostname: a.hostname || location.hostname,
	    pathname: a.pathname.charAt(0) != '/' ? '/' + a.pathname : a.pathname,
	    protocol: !a.protocol || ':' == a.protocol ? location.protocol : a.protocol,
	    search: a.search,
	    query: a.search.slice(1)
	  };
	};

	/**
	 * Check if `url` is absolute.
	 *
	 * @param {String} url
	 * @return {Boolean}
	 * @api public
	 */

	exports.isAbsolute = function(url){
	  return 0 == url.indexOf('//') || !!~url.indexOf('://');
	};

	/**
	 * Check if `url` is relative.
	 *
	 * @param {String} url
	 * @return {Boolean}
	 * @api public
	 */

	exports.isRelative = function(url){
	  return !exports.isAbsolute(url);
	};

	/**
	 * Check if `url` is cross domain.
	 *
	 * @param {String} url
	 * @return {Boolean}
	 * @api public
	 */

	exports.isCrossDomain = function(url){
	  url = exports.parse(url);
	  var location = exports.parse(window.location.href);
	  return url.hostname !== location.hostname
	    || url.port !== location.port
	    || url.protocol !== location.protocol;
	};

	/**
	 * Return default port for `protocol`.
	 *
	 * @param  {String} protocol
	 * @return {String}
	 * @api private
	 */
	function port (protocol){
	  switch (protocol) {
	    case 'http:':
	      return 80;
	    case 'https:':
	      return 443;
	    default:
	      return location.port;
	  }
	}
	});

	var pageDefaults_1 = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.pageDefaults = void 0;
	var includes_1$1 = __importDefault(includes_1);
	var component_url_1 = __importDefault(componentUrl);
	/**
	 * Return the canonical path for the page.
	 */
	var canonicalPath = function () {
	    var canon = document.querySelector("link[rel='canonical']");
	    if (!canon)
	        return window.location.pathname;
	    var href = canon.getAttribute("href");
	    var parsed = component_url_1.default.parse(href);
	    return parsed.pathname;
	};
	/**
	 * Return the canonical URL for the page concat the given `search`
	 * and strip the hash.
	 */
	var canonicalUrl = function (search) {
	    var canon = document.querySelector("link[rel='canonical']");
	    if (canon) {
	        var href = canon.getAttribute("href");
	        return includes_1$1.default(href, '?') ? href : href + search;
	    }
	    var url = window.location.href;
	    var i = url.indexOf('#');
	    return i === -1 ? url : url.slice(0, i);
	};
	/**
	 * Return a default `options.context.page` object.
	 *
	 * https://segment.com/docs/spec/page/#properties
	 */
	var pageDefaults = function () {
	    var path = canonicalPath();
	    var referrer = document.referrer, title = document.title;
	    var search = location.search;
	    var url = canonicalUrl(search);
	    return {
	        path: path,
	        referrer: referrer,
	        search: search,
	        title: title,
	        url: url
	    };
	};
	exports.pageDefaults = pageDefaults;
	});

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = { 'array': [], 'map': null };
	}

	var _stackClear = stackClear;

	/**
	 * Performs a [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var other = { 'user': 'fred' };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	var eq_1 = eq;

	/**
	 * Gets the index at which the first occurrence of `key` is found in `array`
	 * of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq_1(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	var _assocIndexOf = assocIndexOf;

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the associative array.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function assocDelete(array, key) {
	  var index = _assocIndexOf(array, key);
	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = array.length - 1;
	  if (index == lastIndex) {
	    array.pop();
	  } else {
	    splice.call(array, index, 1);
	  }
	  return true;
	}

	var _assocDelete = assocDelete;

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      array = data.array;

	  return array ? _assocDelete(array, key) : data.map['delete'](key);
	}

	var _stackDelete = stackDelete;

	/**
	 * Gets the associative array value for `key`.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function assocGet(array, key) {
	  var index = _assocIndexOf(array, key);
	  return index < 0 ? undefined : array[index][1];
	}

	var _assocGet = assocGet;

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  var data = this.__data__,
	      array = data.array;

	  return array ? _assocGet(array, key) : data.map.get(key);
	}

	var _stackGet = stackGet;

	/**
	 * Checks if an associative array value for `key` exists.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function assocHas(array, key) {
	  return _assocIndexOf(array, key) > -1;
	}

	var _assocHas = assocHas;

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  var data = this.__data__,
	      array = data.array;

	  return array ? _assocHas(array, key) : data.map.has(key);
	}

	var _stackHas = stackHas;

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	var _isHostObject = isHostObject;

	/** Used to match `RegExp` [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns). */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var objectProto$5 = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty$2 = objectProto$5.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty$2).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction_1(value)) {
	    return reIsNative.test(funcToString.call(value));
	  }
	  return isObjectLike_1(value) &&
	    (_isHostObject(value) ? reIsNative : reIsHostCtor).test(value);
	}

	var isNative_1 = isNative;

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative_1(value) ? value : undefined;
	}

	var _getNative = getNative;

	/* Built-in method references that are verified to be native. */
	var nativeCreate = _getNative(Object, 'create');

	var _nativeCreate = nativeCreate;

	/** Used for built-in method references. */
	var objectProto$6 = Object.prototype;

	/**
	 * Creates an hash object.
	 *
	 * @private
	 * @constructor
	 * @returns {Object} Returns the new hash object.
	 */
	function Hash() {}

	// Avoid inheriting from `Object.prototype` when possible.
	Hash.prototype = _nativeCreate ? _nativeCreate(null) : objectProto$6;

	var _Hash = Hash;

	/**
	 * Checks if `value` is a global object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
	 */
	function checkGlobal(value) {
	  return (value && value.Object === Object) ? value : null;
	}

	var _checkGlobal = checkGlobal;

	var _root = createCommonjsModule(function (module, exports) {
	/** Used to determine if values are of the language type `Object`. */
	var objectTypes = {
	  'function': true,
	  'object': true
	};

	/** Detect free variable `exports`. */
	var freeExports = (objectTypes['object'] && exports && !exports.nodeType)
	  ? exports
	  : undefined;

	/** Detect free variable `module`. */
	var freeModule = (objectTypes['object'] && module && !module.nodeType)
	  ? module
	  : undefined;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = _checkGlobal(freeExports && freeModule && typeof commonjsGlobal == 'object' && commonjsGlobal);

	/** Detect free variable `self`. */
	var freeSelf = _checkGlobal(objectTypes[typeof self] && self);

	/** Detect free variable `window`. */
	var freeWindow = _checkGlobal(objectTypes[typeof window] && window);

	/** Detect `this` as the global object. */
	var thisGlobal = _checkGlobal(objectTypes[typeof commonjsGlobal] && commonjsGlobal);

	/**
	 * Used as a reference to the global object.
	 *
	 * The `this` value is used if it's the global object to avoid Greasemonkey's
	 * restricted `window` object, otherwise the `window` object is used.
	 */
	var root = freeGlobal ||
	  ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) ||
	    freeSelf || thisGlobal || Function('return this')();

	module.exports = root;
	});

	/* Built-in method references that are verified to be native. */
	var Map = _getNative(_root, 'Map');

	var _Map = Map;

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapClear() {
	  this.__data__ = {
	    'hash': new _Hash,
	    'map': _Map ? new _Map : [],
	    'string': new _Hash
	  };
	}

	var _mapClear = mapClear;

	/** Used for built-in method references. */
	var objectProto$7 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$3 = objectProto$7.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @param {Object} hash The hash to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(hash, key) {
	  return _nativeCreate ? hash[key] !== undefined : hasOwnProperty$3.call(hash, key);
	}

	var _hashHas = hashHas;

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(hash, key) {
	  return _hashHas(hash, key) && delete hash[key];
	}

	var _hashDelete = hashDelete;

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return type == 'number' || type == 'boolean' ||
	    (type == 'string' && value != '__proto__') || value == null;
	}

	var _isKeyable = isKeyable;

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapDelete(key) {
	  var data = this.__data__;
	  if (_isKeyable(key)) {
	    return _hashDelete(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return _Map ? data.map['delete'](key) : _assocDelete(data.map, key);
	}

	var _mapDelete = mapDelete;

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto$8 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$4 = objectProto$8.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @param {Object} hash The hash to query.
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(hash, key) {
	  if (_nativeCreate) {
	    var result = hash[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty$4.call(hash, key) ? hash[key] : undefined;
	}

	var _hashGet = hashGet;

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapGet(key) {
	  var data = this.__data__;
	  if (_isKeyable(key)) {
	    return _hashGet(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return _Map ? data.map.get(key) : _assocGet(data.map, key);
	}

	var _mapGet = mapGet;

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapHas(key) {
	  var data = this.__data__;
	  if (_isKeyable(key)) {
	    return _hashHas(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return _Map ? data.map.has(key) : _assocHas(data.map, key);
	}

	var _mapHas = mapHas;

	/**
	 * Sets the associative array `key` to `value`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 */
	function assocSet(array, key, value) {
	  var index = _assocIndexOf(array, key);
	  if (index < 0) {
	    array.push([key, value]);
	  } else {
	    array[index][1] = value;
	  }
	}

	var _assocSet = assocSet;

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 */
	function hashSet(hash, key, value) {
	  hash[key] = (_nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
	}

	var _hashSet = hashSet;

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache object.
	 */
	function mapSet(key, value) {
	  var data = this.__data__;
	  if (_isKeyable(key)) {
	    _hashSet(typeof key == 'string' ? data.string : data.hash, key, value);
	  } else if (_Map) {
	    data.map.set(key, value);
	  } else {
	    _assocSet(data.map, key, value);
	  }
	  return this;
	}

	var _mapSet = mapSet;

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function MapCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = values[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add functions to the `MapCache`.
	MapCache.prototype.clear = _mapClear;
	MapCache.prototype['delete'] = _mapDelete;
	MapCache.prototype.get = _mapGet;
	MapCache.prototype.has = _mapHas;
	MapCache.prototype.set = _mapSet;

	var _MapCache = MapCache;

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache object.
	 */
	function stackSet(key, value) {
	  var data = this.__data__,
	      array = data.array;

	  if (array) {
	    if (array.length < (LARGE_ARRAY_SIZE - 1)) {
	      _assocSet(array, key, value);
	    } else {
	      data.array = null;
	      data.map = new _MapCache(array);
	    }
	  }
	  var map = data.map;
	  if (map) {
	    map.set(key, value);
	  }
	  return this;
	}

	var _stackSet = stackSet;

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function Stack(values) {
	  var index = -1,
	      length = values ? values.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = values[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add functions to the `Stack` cache.
	Stack.prototype.clear = _stackClear;
	Stack.prototype['delete'] = _stackDelete;
	Stack.prototype.get = _stackGet;
	Stack.prototype.has = _stackHas;
	Stack.prototype.set = _stackSet;

	var _Stack = Stack;

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	var _arrayEach = arrayEach;

	/** Used for built-in method references. */
	var objectProto$9 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$5 = objectProto$9.hasOwnProperty;

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if ((!eq_1(objValue, value) ||
	        (eq_1(objValue, objectProto$9[key]) && !hasOwnProperty$5.call(object, key))) ||
	      (value === undefined && !(key in object))) {
	    object[key] = value;
	  }
	}

	var _assignValue = assignValue;

	/**
	 * This function is like `copyObject` except that it accepts a function to
	 * customize copied values.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObjectWith(source, props, object, customizer) {
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];

	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : source[key];

	    _assignValue(object, key, newValue);
	  }
	  return object;
	}

	var _copyObjectWith = copyObjectWith;

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object) {
	  return _copyObjectWith(source, props, object);
	}

	var _copyObject = copyObject;

	/**
	 * The base implementation of `_.assign` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return object && _copyObject(source, keys_1(source), object);
	}

	var _baseAssign = baseAssign;

	/**
	 * Creates a base function for methods like `_.forIn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;

	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	var _createBaseFor = createBaseFor;

	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = _createBaseFor();

	var _baseFor = baseFor;

	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return object && _baseFor(object, iteratee, keys_1);
	}

	var _baseForOwn = baseForOwn;

	/**
	 * Creates a clone of  `buffer`.
	 *
	 * @private
	 * @param {Buffer} buffer The buffer to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Buffer} Returns the cloned buffer.
	 */
	function cloneBuffer(buffer, isDeep) {
	  if (isDeep) {
	    return buffer.slice();
	  }
	  var Ctor = buffer.constructor,
	      result = new Ctor(buffer.length);

	  buffer.copy(result);
	  return result;
	}

	var _cloneBuffer = cloneBuffer;

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	var _copyArray = copyArray;

	/** Built-in value references. */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own symbol properties of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = getOwnPropertySymbols || function() {
	  return [];
	};

	var _getSymbols = getSymbols;

	/**
	 * Copies own symbol properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbols(source, object) {
	  return _copyObject(source, _getSymbols(source), object);
	}

	var _copySymbols = copySymbols;

	/* Built-in method references that are verified to be native. */
	var Set = _getNative(_root, 'Set');

	var _Set = Set;

	/* Built-in method references that are verified to be native. */
	var WeakMap = _getNative(_root, 'WeakMap');

	var _WeakMap = WeakMap;

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';

	/** Used for built-in method references. */
	var objectProto$a = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString$1 = Function.prototype.toString;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString$3 = objectProto$a.toString;

	/** Used to detect maps, sets, and weakmaps. */
	var mapCtorString = _Map ? funcToString$1.call(_Map) : '',
	    setCtorString = _Set ? funcToString$1.call(_Set) : '',
	    weakMapCtorString = _WeakMap ? funcToString$1.call(_WeakMap) : '';

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function getTag(value) {
	  return objectToString$3.call(value);
	}

	// Fallback for IE 11 providing `toStringTag` values for maps, sets, and weakmaps.
	if ((_Map && getTag(new _Map) != mapTag) ||
	    (_Set && getTag(new _Set) != setTag) ||
	    (_WeakMap && getTag(new _WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = objectToString$3.call(value),
	        Ctor = result == objectTag ? value.constructor : null,
	        ctorString = typeof Ctor == 'function' ? funcToString$1.call(Ctor) : '';

	    if (ctorString) {
	      switch (ctorString) {
	        case mapCtorString: return mapTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}

	var _getTag = getTag;

	/** Used for built-in method references. */
	var objectProto$b = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$6 = objectProto$b.hasOwnProperty;

	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray(array) {
	  var length = array.length,
	      result = array.constructor(length);

	  // Add properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty$6.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}

	var _initCloneArray = initCloneArray;

	/** Built-in value references. */
	var Uint8Array$1 = _root.Uint8Array;

	var _Uint8Array = Uint8Array$1;

	/**
	 * Creates a clone of `arrayBuffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneArrayBuffer(arrayBuffer) {
	  var Ctor = arrayBuffer.constructor,
	      result = new Ctor(arrayBuffer.byteLength),
	      view = new _Uint8Array(result);

	  view.set(new _Uint8Array(arrayBuffer));
	  return result;
	}

	var _cloneArrayBuffer = cloneArrayBuffer;

	/**
	 * Adds the key-value `pair` to `map`.
	 *
	 * @private
	 * @param {Object} map The map to modify.
	 * @param {Array} pair The key-value pair to add.
	 * @returns {Object} Returns `map`.
	 */
	function addMapEntry(map, pair) {
	  map.set(pair[0], pair[1]);
	  return map;
	}

	var _addMapEntry = addMapEntry;

	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array.length;

	  if (initAccum && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}

	var _arrayReduce = arrayReduce;

	/**
	 * Converts `map` to an array.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);

	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}

	var _mapToArray = mapToArray;

	/**
	 * Creates a clone of `map`.
	 *
	 * @private
	 * @param {Object} map The map to clone.
	 * @returns {Object} Returns the cloned map.
	 */
	function cloneMap(map) {
	  var Ctor = map.constructor;
	  return _arrayReduce(_mapToArray(map), _addMapEntry, new Ctor);
	}

	var _cloneMap = cloneMap;

	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;

	/**
	 * Creates a clone of `regexp`.
	 *
	 * @private
	 * @param {Object} regexp The regexp to clone.
	 * @returns {Object} Returns the cloned regexp.
	 */
	function cloneRegExp(regexp) {
	  var Ctor = regexp.constructor,
	      result = new Ctor(regexp.source, reFlags.exec(regexp));

	  result.lastIndex = regexp.lastIndex;
	  return result;
	}

	var _cloneRegExp = cloneRegExp;

	/**
	 * Adds `value` to `set`.
	 *
	 * @private
	 * @param {Object} set The set to modify.
	 * @param {*} value The value to add.
	 * @returns {Object} Returns `set`.
	 */
	function addSetEntry(set, value) {
	  set.add(value);
	  return set;
	}

	var _addSetEntry = addSetEntry;

	/**
	 * Converts `set` to an array.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}

	var _setToArray = setToArray;

	/**
	 * Creates a clone of `set`.
	 *
	 * @private
	 * @param {Object} set The set to clone.
	 * @returns {Object} Returns the cloned set.
	 */
	function cloneSet(set) {
	  var Ctor = set.constructor;
	  return _arrayReduce(_setToArray(set), _addSetEntry, new Ctor);
	}

	var _cloneSet = cloneSet;

	/** Built-in value references. */
	var Symbol$1 = _root.Symbol;

	var _Symbol = Symbol$1;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = _Symbol ? _Symbol.prototype : undefined,
	    symbolValueOf = _Symbol ? symbolProto.valueOf : undefined;

	/**
	 * Creates a clone of the `symbol` object.
	 *
	 * @private
	 * @param {Object} symbol The symbol object to clone.
	 * @returns {Object} Returns the cloned symbol object.
	 */
	function cloneSymbol(symbol) {
	  return _Symbol ? Object(symbolValueOf.call(symbol)) : {};
	}

	var _cloneSymbol = cloneSymbol;

	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray(typedArray, isDeep) {
	  var arrayBuffer = typedArray.buffer,
	      buffer = isDeep ? _cloneArrayBuffer(arrayBuffer) : arrayBuffer,
	      Ctor = typedArray.constructor;

	  return new Ctor(buffer, typedArray.byteOffset, typedArray.length);
	}

	var _cloneTypedArray = cloneTypedArray;

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    mapTag$1 = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag$1 = '[object Set]',
	    stringTag$1 = '[object String]',
	    symbolTag = '[object Symbol]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag(object, tag, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag:
	      return _cloneArrayBuffer(object);

	    case boolTag:
	    case dateTag:
	      return new Ctor(+object);

	    case float32Tag: case float64Tag:
	    case int8Tag: case int16Tag: case int32Tag:
	    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
	      return _cloneTypedArray(object, isDeep);

	    case mapTag$1:
	      return _cloneMap(object);

	    case numberTag:
	    case stringTag$1:
	      return new Ctor(object);

	    case regexpTag:
	      return _cloneRegExp(object);

	    case setTag$1:
	      return _cloneSet(object);

	    case symbolTag:
	      return _cloneSymbol(object);
	  }
	}

	var _initCloneByTag = initCloneByTag;

	/** Built-in value references. */
	var objectCreate = Object.create;

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} prototype The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	function baseCreate(proto) {
	  return isObject_1(proto) ? objectCreate(proto) : {};
	}

	var _baseCreate = baseCreate;

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  if (_isPrototype(object)) {
	    return {};
	  }
	  var Ctor = object.constructor;
	  return _baseCreate(isFunction_1(Ctor) ? Ctor.prototype : undefined);
	}

	var _initCloneObject = initCloneObject;

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @category Util
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var getter = _.constant(object);
	 *
	 * getter() === object;
	 * // => true
	 */
	function constant(value) {
	  return function() {
	    return value;
	  };
	}

	var constant_1 = constant;

	var isBuffer_1 = createCommonjsModule(function (module, exports) {

	/** Detect free variable `exports`. */
	var freeExports = ( exports && !exports.nodeType)
	  ? exports
	  : undefined;

	/** Detect free variable `module`. */
	var freeModule = ( module && !module.nodeType)
	  ? module
	  : undefined;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = (freeModule && freeModule.exports === freeExports)
	  ? freeExports
	  : undefined;

	/** Built-in value references. */
	var Buffer = moduleExports ? _root.Buffer : undefined;

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = !Buffer ? constant_1(false) : function(value) {
	  return value instanceof Buffer;
	};

	module.exports = isBuffer;
	});

	/** `Object#toString` result references. */
	var argsTag$1 = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag$1 = '[object Boolean]',
	    dateTag$1 = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag$1 = '[object Function]',
	    genTag$1 = '[object GeneratorFunction]',
	    mapTag$2 = '[object Map]',
	    numberTag$1 = '[object Number]',
	    objectTag$1 = '[object Object]',
	    regexpTag$1 = '[object RegExp]',
	    setTag$2 = '[object Set]',
	    stringTag$2 = '[object String]',
	    symbolTag$1 = '[object Symbol]',
	    weakMapTag$1 = '[object WeakMap]';

	var arrayBufferTag$1 = '[object ArrayBuffer]',
	    float32Tag$1 = '[object Float32Array]',
	    float64Tag$1 = '[object Float64Array]',
	    int8Tag$1 = '[object Int8Array]',
	    int16Tag$1 = '[object Int16Array]',
	    int32Tag$1 = '[object Int32Array]',
	    uint8Tag$1 = '[object Uint8Array]',
	    uint8ClampedTag$1 = '[object Uint8ClampedArray]',
	    uint16Tag$1 = '[object Uint16Array]',
	    uint32Tag$1 = '[object Uint32Array]';

	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag$1] = cloneableTags[arrayTag] =
	cloneableTags[arrayBufferTag$1] = cloneableTags[boolTag$1] =
	cloneableTags[dateTag$1] = cloneableTags[float32Tag$1] =
	cloneableTags[float64Tag$1] = cloneableTags[int8Tag$1] =
	cloneableTags[int16Tag$1] = cloneableTags[int32Tag$1] =
	cloneableTags[mapTag$2] = cloneableTags[numberTag$1] =
	cloneableTags[objectTag$1] = cloneableTags[regexpTag$1] =
	cloneableTags[setTag$2] = cloneableTags[stringTag$2] =
	cloneableTags[symbolTag$1] = cloneableTags[uint8Tag$1] =
	cloneableTags[uint8ClampedTag$1] = cloneableTags[uint16Tag$1] =
	cloneableTags[uint32Tag$1] = true;
	cloneableTags[errorTag] = cloneableTags[funcTag$1] =
	cloneableTags[weakMapTag$1] = false;

	/**
	 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
	 * traversed objects.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @param {Function} [customizer] The function to customize cloning.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The parent object of `value`.
	 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, isDeep, customizer, key, object, stack) {
	  var result;
	  if (customizer) {
	    result = object ? customizer(value, key, object, stack) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!isObject_1(value)) {
	    return value;
	  }
	  var isArr = isArray_1(value);
	  if (isArr) {
	    result = _initCloneArray(value);
	    if (!isDeep) {
	      return _copyArray(value, result);
	    }
	  } else {
	    var tag = _getTag(value),
	        isFunc = tag == funcTag$1 || tag == genTag$1;

	    if (isBuffer_1(value)) {
	      return _cloneBuffer(value, isDeep);
	    }
	    if (tag == objectTag$1 || tag == argsTag$1 || (isFunc && !object)) {
	      if (_isHostObject(value)) {
	        return object ? value : {};
	      }
	      result = _initCloneObject(isFunc ? {} : value);
	      if (!isDeep) {
	        return _copySymbols(value, _baseAssign(result, value));
	      }
	    } else {
	      return cloneableTags[tag]
	        ? _initCloneByTag(value, tag, isDeep)
	        : (object ? value : {});
	    }
	  }
	  // Check for circular references and return its corresponding clone.
	  stack || (stack = new _Stack);
	  var stacked = stack.get(value);
	  if (stacked) {
	    return stacked;
	  }
	  stack.set(value, result);

	  // Recursively populate clone (susceptible to call stack limits).
	  (isArr ? _arrayEach : _baseForOwn)(value, function(subValue, key) {
	    _assignValue(result, key, baseClone(subValue, isDeep, customizer, key, value, stack));
	  });
	  return isArr ? result : _copySymbols(value, result);
	}

	var _baseClone = baseClone;

	/**
	 * This method is like `_.clone` except that it recursively clones `value`.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to recursively clone.
	 * @returns {*} Returns the deep cloned value.
	 * @example
	 *
	 * var objects = [{ 'a': 1 }, { 'b': 2 }];
	 *
	 * var deep = _.cloneDeep(objects);
	 * console.log(deep[0] === objects[0]);
	 * // => false
	 */
	function cloneDeep(value) {
	  return _baseClone(value, true);
	}

	var cloneDeep_1 = cloneDeep;

	var componentEmitter = createCommonjsModule(function (module) {
	/**
	 * Expose `Emitter`.
	 */

	{
	  module.exports = Emitter;
	}

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	}
	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};
	});

	var analytics_jsObjCase = createCommonjsModule(function (module) {


	/**
	 * Module exports, export
	 */

	module.exports = multiple(find);
	module.exports.find = module.exports;


	/**
	 * Export the replacement function, return the modified object
	 */

	module.exports.replace = function (obj, key, val, options) {
	  multiple(replace).call(this, obj, key, val, options);
	  return obj;
	};


	/**
	 * Export the delete function, return the modified object
	 */

	module.exports.del = function (obj, key, options) {
	  multiple(del).call(this, obj, key, null, options);
	  return obj;
	};


	/**
	 * Compose applying the function to a nested key
	 */

	function multiple (fn) {
	  return function (obj, path, val, options) {
	    var normalize = options && isFunction(options.normalizer) ? options.normalizer : defaultNormalize;
	    path = normalize(path);

	    var key;
	    var finished = false;

	    while (!finished) loop();

	    function loop() {
	      for (key in obj) {
	        var normalizedKey = normalize(key);
	        if (0 === path.indexOf(normalizedKey)) {
	          var temp = path.substr(normalizedKey.length);
	          if (temp.charAt(0) === '.' || temp.length === 0) {
	            path = temp.substr(1);
	            var child = obj[key];

	            // we're at the end and there is nothing.
	            if (null == child) {
	              finished = true;
	              return;
	            }

	            // we're at the end and there is something.
	            if (!path.length) {
	              finished = true;
	              return;
	            }

	            // step into child
	            obj = child;

	            // but we're done here
	            return;
	          }
	        }
	      }

	      key = undefined;
	      // if we found no matching properties
	      // on the current object, there's no match.
	      finished = true;
	    }

	    if (!key) return;
	    if (null == obj) return obj;

	    // the `obj` and `key` is one above the leaf object and key, so
	    // start object: { a: { 'b.c': 10 } }
	    // end object: { 'b.c': 10 }
	    // end key: 'b.c'
	    // this way, you can do `obj[key]` and get `10`.
	    return fn(obj, key, val);
	  };
	}


	/**
	 * Find an object by its key
	 *
	 * find({ first_name : 'Calvin' }, 'firstName')
	 */

	function find (obj, key) {
	  if (obj.hasOwnProperty(key)) return obj[key];
	}


	/**
	 * Delete a value for a given key
	 *
	 * del({ a : 'b', x : 'y' }, 'X' }) -> { a : 'b' }
	 */

	function del (obj, key) {
	  if (obj.hasOwnProperty(key)) delete obj[key];
	  return obj;
	}


	/**
	 * Replace an objects existing value with a new one
	 *
	 * replace({ a : 'b' }, 'a', 'c') -> { a : 'c' }
	 */

	function replace (obj, key, val) {
	  if (obj.hasOwnProperty(key)) obj[key] = val;
	  return obj;
	}

	/**
	 * Normalize a `dot.separated.path`.
	 *
	 * A.HELL(!*&#(!)O_WOR   LD.bar => ahelloworldbar
	 *
	 * @param {String} path
	 * @return {String}
	 */

	function defaultNormalize(path) {
	  return path.replace(/[^a-zA-Z0-9\.]+/g, '').toLowerCase();
	}

	/**
	 * Check if a value is a function.
	 *
	 * @param {*} val
	 * @return {boolean} Returns `true` if `val` is a function, otherwise `false`.
	 */

	function isFunction(val) {
	  return typeof val === 'function';
	}
	});

	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};

	var analytics_js_obj_case_1 = __importDefault(analytics_jsObjCase);
	function trait(a, b) {
	    return function () {
	        var traits = this.traits();
	        var props = this.properties ? this.properties() : {};
	        return (analytics_js_obj_case_1.default(traits, "address." + a) ||
	            analytics_js_obj_case_1.default(traits, a) ||
	            (b ? analytics_js_obj_case_1.default(traits, "address." + b) : null) ||
	            (b ? analytics_js_obj_case_1.default(traits, b) : null) ||
	            analytics_js_obj_case_1.default(props, "address." + a) ||
	            analytics_js_obj_case_1.default(props, a) ||
	            (b ? analytics_js_obj_case_1.default(props, "address." + b) : null) ||
	            (b ? analytics_js_obj_case_1.default(props, b) : null));
	    };
	}
	function default_1(proto) {
	    proto.zip = trait("postalCode", "zip");
	    proto.country = trait("country");
	    proto.street = trait("street");
	    proto.state = trait("state");
	    proto.city = trait("city");
	    proto.region = trait("region");
	}
	var _default = default_1;


	var address = /*#__PURE__*/Object.defineProperty({
		default: _default
	}, '__esModule', {value: true});

	/**
	 * toString ref.
	 */
	var toString = Object.prototype.toString;

	/**
	 * Return the type of `val`.
	 *
	 * @param {Mixed} val
	 * @return {String}
	 * @api public
	 */

	var componentType = function(val){
	  switch (toString.call(val)) {
	    case '[object Date]': return 'date';
	    case '[object RegExp]': return 'regexp';
	    case '[object Arguments]': return 'arguments';
	    case '[object Array]': return 'array';
	    case '[object Error]': return 'error';
	  }

	  if (val === null) return 'null';
	  if (val === undefined) return 'undefined';
	  if (val !== val) return 'nan';
	  if (val && val.nodeType === 1) return 'element';

	  if (isBuffer(val)) return 'buffer';

	  val = val.valueOf
	    ? val.valueOf()
	    : Object.prototype.valueOf.apply(val);

	  return typeof val;
	};

	// code borrowed from https://github.com/feross/is-buffer/blob/master/index.js
	function isBuffer(obj) {
	  return !!(obj != null &&
	    (obj._isBuffer || // For Safari 5-7 (missing Object.prototype.constructor)
	      (obj.constructor &&
	      typeof obj.constructor.isBuffer === 'function' &&
	      obj.constructor.isBuffer(obj))
	    ))
	}

	/*
	 * Module dependencies.
	 */



	/**
	 * Deeply clone an object.
	 *
	 * @param {*} obj Any object.
	 */

	var clone = function clone(obj) {
	  var t = componentType(obj);

	  if (t === 'object') {
	    var copy = {};
	    for (var key in obj) {
	      if (obj.hasOwnProperty(key)) {
	        copy[key] = clone(obj[key]);
	      }
	    }
	    return copy;
	  }

	  if (t === 'array') {
	    var copy = new Array(obj.length);
	    for (var i = 0, l = obj.length; i < l; i++) {
	      copy[i] = clone(obj[i]);
	    }
	    return copy;
	  }

	  if (t === 'regexp') {
	    // from millermedeiros/amd-utils - MIT
	    var flags = '';
	    flags += obj.multiline ? 'm' : '';
	    flags += obj.global ? 'g' : '';
	    flags += obj.ignoreCase ? 'i' : '';
	    return new RegExp(obj.source, flags);
	  }

	  if (t === 'date') {
	    return new Date(obj.getTime());
	  }

	  // string, number, boolean, etc.
	  return obj;
	};

	/*
	 * Exports.
	 */

	var clone_1 = clone;

	var disabled = {
	    Salesforce: true,
	};
	function default_1$1(integration) {
	    return !disabled[integration];
	}
	var _default$1 = default_1$1;


	var isEnabled = /*#__PURE__*/Object.defineProperty({
		default: _default$1
	}, '__esModule', {value: true});

	/**
	 * Matcher, slightly modified from:
	 *
	 * https://github.com/csnover/js-iso8601/blob/lax/iso8601.js
	 */

	var matcher = /^(\d{4})(?:-?(\d{2})(?:-?(\d{2}))?)?(?:([ T])(\d{2}):?(\d{2})(?::?(\d{2})(?:[,\.](\d{1,}))?)?(?:(Z)|([+\-])(\d{2})(?::?(\d{2}))?)?)?$/;

	/**
	 * Convert an ISO date string to a date. Fallback to native `Date.parse`.
	 *
	 * https://github.com/csnover/js-iso8601/blob/lax/iso8601.js
	 *
	 * @param {String} iso
	 * @return {Date}
	 */

	var parse = function(iso) {
	  var numericKeys = [1, 5, 6, 7, 11, 12];
	  var arr = matcher.exec(iso);
	  var offset = 0;

	  // fallback to native parsing
	  if (!arr) {
	    return new Date(iso);
	  }

	  /* eslint-disable no-cond-assign */
	  // remove undefined values
	  for (var i = 0, val; val = numericKeys[i]; i++) {
	    arr[val] = parseInt(arr[val], 10) || 0;
	  }
	  /* eslint-enable no-cond-assign */

	  // allow undefined days and months
	  arr[2] = parseInt(arr[2], 10) || 1;
	  arr[3] = parseInt(arr[3], 10) || 1;

	  // month is 0-11
	  arr[2]--;

	  // allow abitrary sub-second precision
	  arr[8] = arr[8] ? (arr[8] + '00').substring(0, 3) : 0;

	  // apply timezone if one exists
	  if (arr[4] === ' ') {
	    offset = new Date().getTimezoneOffset();
	  } else if (arr[9] !== 'Z' && arr[10]) {
	    offset = arr[11] * 60 + arr[12];
	    if (arr[10] === '+') {
	      offset = 0 - offset;
	    }
	  }

	  var millis = Date.UTC(arr[1], arr[2], arr[3], arr[5], arr[6] + offset, arr[7], arr[8]);
	  return new Date(millis);
	};


	/**
	 * Checks whether a `string` is an ISO date string. `strict` mode requires that
	 * the date string at least have a year, month and date.
	 *
	 * @param {String} string
	 * @param {Boolean} strict
	 * @return {Boolean}
	 */

	var is = function(string, strict) {
	  if (typeof string !== 'string') {
	    return false;
	  }
	  if (strict && (/^\d{4}-\d{2}-\d{2}/).test(string) === false) {
	    return false;
	  }
	  return matcher.test(string);
	};

	var lib = {
		parse: parse,
		is: is
	};

	/**
	 * Matcher.
	 */

	var matcher$1 = /\d{13}/;

	/**
	 * Check whether a string is a millisecond date string.
	 *
	 * @param {string} string
	 * @return {boolean}
	 */
	var is$1 = function (string) {
	  return matcher$1.test(string);
	};

	/**
	 * Convert a millisecond string to a date.
	 *
	 * @param {string} millis
	 * @return {Date}
	 */
	var parse$1 = function (millis) {
	  millis = parseInt(millis, 10);
	  return new Date(millis);
	};

	var milliseconds = {
		is: is$1,
		parse: parse$1
	};

	/**
	 * Matcher.
	 */

	var matcher$2 = /\d{10}/;

	/**
	 * Check whether a string is a second date string.
	 *
	 * @param {string} string
	 * @return {Boolean}
	 */
	var is$2 = function (string) {
	  return matcher$2.test(string);
	};

	/**
	 * Convert a second string to a date.
	 *
	 * @param {string} seconds
	 * @return {Date}
	 */
	var parse$2 = function (seconds) {
	  var millis = parseInt(seconds, 10) * 1000;
	  return new Date(millis);
	};

	var seconds = {
		is: is$2,
		parse: parse$2
	};

	var objProto = Object.prototype;
	var toStr = objProto.toString;

	function isDate(value) {
	  return toStr.call(value) === "[object Date]";
	}

	function isNumber(value) {
	  return toStr.call(value) === "[object Number]";
	}

	/**
	 * Returns a new Javascript Date object, allowing a variety of extra input types
	 * over the native Date constructor.
	 *
	 * @param {Date|string|number} val
	 */
	var lib$1 = function newDate(val) {
	  if (isDate(val)) return val;
	  if (isNumber(val)) return new Date(toMs(val));

	  // date strings
	  if (lib.is(val)) {
	    return lib.parse(val);
	  }
	  if (milliseconds.is(val)) {
	    return milliseconds.parse(val);
	  }
	  if (seconds.is(val)) {
	    return seconds.parse(val);
	  }

	  // fallback to Date.parse
	  return new Date(val);
	};

	/**
	 * If the number passed val is seconds from the epoch, turn it into milliseconds.
	 * Milliseconds would be greater than 31557600000 (December 31, 1970).
	 *
	 * @param {number} num
	 */
	function toMs(num) {
	  if (num < 31557600000) return num * 1000;
	  return num;
	}

	/**
	 * Expose `traverse`.
	 */
	var lib$2 = traverse;

	/**
	 * Recursively traverse an object or array, and convert
	 * all ISO date strings parse into Date objects.
	 *
	 * @param {Object} input - object, array, or string to convert
	 * @param {Boolean} strict - only convert strings with year, month, and date
	 * @return {Object}
	 */
	function traverse(input, strict) {
	  if (strict === undefined) strict = true;
	  if (componentType(input) === 'object') {
	    return traverseObject(input, strict);
	  } else if (componentType(input) === 'array') {
	    return traverseArray(input, strict);
	  } else if (lib.is(input, strict)) {
	    return lib.parse(input);
	  }
	  return input;
	}

	/**
	 * Object traverser helper function.
	 *
	 * @param {Object} obj - object to traverse
	 * @param {Boolean} strict - only convert strings with year, month, and date
	 * @return {Object}
	 */
	function traverseObject(obj, strict) {
	  Object.keys(obj).forEach(function(key) {
	    obj[key] = traverse(obj[key], strict);
	  });
	  return obj;
	}

	/**
	 * Array traverser helper function
	 *
	 * @param {Array} arr - array to traverse
	 * @param {Boolean} strict - only convert strings with year, month, and date
	 * @return {Array}
	 */
	function traverseArray(arr, strict) {
	  arr.forEach(function(value, index) {
	    arr[index] = traverse(value, strict);
	  });
	  return arr;
	}

	var facade = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Facade = void 0;
	var address_1 = __importDefault(address);
	var clone_1$1 = __importDefault(clone_1);
	var is_enabled_1 = __importDefault(isEnabled);
	var analytics_js_new_date_1 = __importDefault(lib$1);
	var analytics_js_obj_case_1 = __importDefault(analytics_jsObjCase);
	var analytics_js_isodate_traverse_1 = __importDefault(lib$2);
	function Facade(obj, opts) {
	    opts = opts || {};
	    if (!("clone" in opts))
	        opts.clone = true;
	    if (opts.clone)
	        obj = clone_1$1.default(obj);
	    if (!("traverse" in opts))
	        opts.traverse = true;
	    if (!("timestamp" in obj))
	        obj.timestamp = new Date();
	    else
	        obj.timestamp = analytics_js_new_date_1.default(obj.timestamp);
	    if (opts.traverse)
	        analytics_js_isodate_traverse_1.default(obj);
	    this.opts = opts;
	    this.obj = obj;
	}
	exports.Facade = Facade;
	var f = Facade.prototype;
	f.proxy = function (field) {
	    var fields = field.split(".");
	    field = fields.shift();
	    var obj = this[field] || this.field(field);
	    if (!obj)
	        return obj;
	    if (typeof obj === "function")
	        obj = obj.call(this) || {};
	    if (fields.length === 0)
	        return this.opts.clone ? transform(obj) : obj;
	    obj = analytics_js_obj_case_1.default(obj, fields.join("."));
	    return this.opts.clone ? transform(obj) : obj;
	};
	f.field = function (field) {
	    var obj = this.obj[field];
	    return this.opts.clone ? transform(obj) : obj;
	};
	Facade.proxy = function (field) {
	    return function () {
	        return this.proxy(field);
	    };
	};
	Facade.field = function (field) {
	    return function () {
	        return this.field(field);
	    };
	};
	Facade.multi = function (path) {
	    return function () {
	        var multi = this.proxy(path + "s");
	        if (Array.isArray(multi))
	            return multi;
	        var one = this.proxy(path);
	        if (one)
	            one = [this.opts.clone ? clone_1$1.default(one) : one];
	        return one || [];
	    };
	};
	Facade.one = function (path) {
	    return function () {
	        var one = this.proxy(path);
	        if (one)
	            return one;
	        var multi = this.proxy(path + "s");
	        if (Array.isArray(multi))
	            return multi[0];
	    };
	};
	f.json = function () {
	    var ret = this.opts.clone ? clone_1$1.default(this.obj) : this.obj;
	    if (this.type)
	        ret.type = this.type();
	    return ret;
	};
	f.options = function (integration) {
	    var obj = this.obj.options || this.obj.context || {};
	    var options = this.opts.clone ? clone_1$1.default(obj) : obj;
	    if (!integration)
	        return options;
	    if (!this.enabled(integration))
	        return;
	    var integrations = this.integrations();
	    var value = integrations[integration] || analytics_js_obj_case_1.default(integrations, integration);
	    if (typeof value !== "object")
	        value = analytics_js_obj_case_1.default(this.options(), integration);
	    return typeof value === "object" ? value : {};
	};
	f.context = f.options;
	f.enabled = function (integration) {
	    var allEnabled = this.proxy("options.providers.all");
	    if (typeof allEnabled !== "boolean")
	        allEnabled = this.proxy("options.all");
	    if (typeof allEnabled !== "boolean")
	        allEnabled = this.proxy("integrations.all");
	    if (typeof allEnabled !== "boolean")
	        allEnabled = true;
	    var enabled = allEnabled && is_enabled_1.default(integration);
	    var options = this.integrations();
	    if (options.providers && options.providers.hasOwnProperty(integration)) {
	        enabled = options.providers[integration];
	    }
	    if (options.hasOwnProperty(integration)) {
	        var settings = options[integration];
	        if (typeof settings === "boolean") {
	            enabled = settings;
	        }
	        else {
	            enabled = true;
	        }
	    }
	    return !!enabled;
	};
	f.integrations = function () {
	    return (this.obj.integrations || this.proxy("options.providers") || this.options());
	};
	f.active = function () {
	    var active = this.proxy("options.active");
	    if (active === null || active === undefined)
	        active = true;
	    return active;
	};
	f.anonymousId = function () {
	    return this.field("anonymousId") || this.field("sessionId");
	};
	f.sessionId = f.anonymousId;
	f.groupId = Facade.proxy("options.groupId");
	f.traits = function (aliases) {
	    var ret = this.proxy("options.traits") || {};
	    var id = this.userId();
	    aliases = aliases || {};
	    if (id)
	        ret.id = id;
	    for (var alias in aliases) {
	        var value = this[alias] == null
	            ? this.proxy("options.traits." + alias)
	            : this[alias]();
	        if (value == null)
	            continue;
	        ret[aliases[alias]] = value;
	        delete ret[alias];
	    }
	    return ret;
	};
	f.library = function () {
	    var library = this.proxy("options.library");
	    if (!library)
	        return { name: "unknown", version: null };
	    if (typeof library === "string")
	        return { name: library, version: null };
	    return library;
	};
	f.device = function () {
	    var device = this.proxy("context.device");
	    if (typeof device !== "object")
	        device = {};
	    var library = this.library().name;
	    if (device.type)
	        return device;
	    if (library.indexOf("ios") > -1)
	        device.type = "ios";
	    if (library.indexOf("android") > -1)
	        device.type = "android";
	    return device;
	};
	f.userAgent = Facade.proxy("context.userAgent");
	f.timezone = Facade.proxy("context.timezone");
	f.timestamp = Facade.field("timestamp");
	f.channel = Facade.field("channel");
	f.ip = Facade.proxy("context.ip");
	f.userId = Facade.field("userId");
	address_1.default(f);
	function transform(obj) {
	    return clone_1$1.default(obj);
	}

	});

	var inherits_browser = createCommonjsModule(function (module) {
	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    var TempCtor = function () {};
	    TempCtor.prototype = superCtor.prototype;
	    ctor.prototype = new TempCtor();
	    ctor.prototype.constructor = ctor;
	  };
	}
	});

	var alias = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Alias = void 0;
	var inherits_1 = __importDefault(inherits_browser);

	function Alias(dictionary, opts) {
	    facade.Facade.call(this, dictionary, opts);
	}
	exports.Alias = Alias;
	inherits_1.default(Alias, facade.Facade);
	Alias.prototype.action = function () {
	    return "alias";
	};
	Alias.prototype.type = Alias.prototype.action;
	Alias.prototype.previousId = function () {
	    return this.field("previousId") || this.field("from");
	};
	Alias.prototype.from = Alias.prototype.previousId;
	Alias.prototype.userId = function () {
	    return this.field("userId") || this.field("to");
	};
	Alias.prototype.to = Alias.prototype.userId;

	});

	var matcher$3 = /.+\@.+\..+/;
	function isEmail(string) {
	    return matcher$3.test(string);
	}
	var _default$2 = isEmail;


	var isEmail_1 = /*#__PURE__*/Object.defineProperty({
		default: _default$2
	}, '__esModule', {value: true});

	var group = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Group = void 0;
	var inherits_1 = __importDefault(inherits_browser);
	var is_email_1 = __importDefault(isEmail_1);
	var analytics_js_new_date_1 = __importDefault(lib$1);

	function Group(dictionary, opts) {
	    facade.Facade.call(this, dictionary, opts);
	}
	exports.Group = Group;
	inherits_1.default(Group, facade.Facade);
	var g = Group.prototype;
	g.action = function () {
	    return "group";
	};
	g.type = g.action;
	g.groupId = facade.Facade.field("groupId");
	g.created = function () {
	    var created = this.proxy("traits.createdAt") ||
	        this.proxy("traits.created") ||
	        this.proxy("properties.createdAt") ||
	        this.proxy("properties.created");
	    if (created)
	        return analytics_js_new_date_1.default(created);
	};
	g.email = function () {
	    var email = this.proxy("traits.email");
	    if (email)
	        return email;
	    var groupId = this.groupId();
	    if (is_email_1.default(groupId))
	        return groupId;
	};
	g.traits = function (aliases) {
	    var ret = this.properties();
	    var id = this.groupId();
	    aliases = aliases || {};
	    if (id)
	        ret.id = id;
	    for (var alias in aliases) {
	        var value = this[alias] == null ? this.proxy("traits." + alias) : this[alias]();
	        if (value == null)
	            continue;
	        ret[aliases[alias]] = value;
	        delete ret[alias];
	    }
	    return ret;
	};
	g.name = facade.Facade.proxy("traits.name");
	g.industry = facade.Facade.proxy("traits.industry");
	g.employees = facade.Facade.proxy("traits.employees");
	g.properties = function () {
	    return this.field("traits") || this.field("properties") || {};
	};

	});

	var identify = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Identify = void 0;

	var analytics_js_obj_case_1 = __importDefault(analytics_jsObjCase);
	var inherits_1 = __importDefault(inherits_browser);
	var is_email_1 = __importDefault(isEmail_1);
	var analytics_js_new_date_1 = __importDefault(lib$1);
	var trim = function (str) { return str.trim(); };
	function Identify(dictionary, opts) {
	    facade.Facade.call(this, dictionary, opts);
	}
	exports.Identify = Identify;
	inherits_1.default(Identify, facade.Facade);
	var i = Identify.prototype;
	i.action = function () {
	    return "identify";
	};
	i.type = i.action;
	i.traits = function (aliases) {
	    var ret = this.field("traits") || {};
	    var id = this.userId();
	    aliases = aliases || {};
	    if (id)
	        ret.id = id;
	    for (var alias in aliases) {
	        var value = this[alias] == null ? this.proxy("traits." + alias) : this[alias]();
	        if (value == null)
	            continue;
	        ret[aliases[alias]] = value;
	        if (alias !== aliases[alias])
	            delete ret[alias];
	    }
	    return ret;
	};
	i.email = function () {
	    var email = this.proxy("traits.email");
	    if (email)
	        return email;
	    var userId = this.userId();
	    if (is_email_1.default(userId))
	        return userId;
	};
	i.created = function () {
	    var created = this.proxy("traits.created") || this.proxy("traits.createdAt");
	    if (created)
	        return analytics_js_new_date_1.default(created);
	};
	i.companyCreated = function () {
	    var created = this.proxy("traits.company.created") ||
	        this.proxy("traits.company.createdAt");
	    if (created) {
	        return analytics_js_new_date_1.default(created);
	    }
	};
	i.companyName = function () {
	    return this.proxy("traits.company.name");
	};
	i.name = function () {
	    var name = this.proxy("traits.name");
	    if (typeof name === "string") {
	        return trim(name);
	    }
	    var firstName = this.firstName();
	    var lastName = this.lastName();
	    if (firstName && lastName) {
	        return trim(firstName + " " + lastName);
	    }
	};
	i.firstName = function () {
	    var firstName = this.proxy("traits.firstName");
	    if (typeof firstName === "string") {
	        return trim(firstName);
	    }
	    var name = this.proxy("traits.name");
	    if (typeof name === "string") {
	        return trim(name).split(" ")[0];
	    }
	};
	i.lastName = function () {
	    var lastName = this.proxy("traits.lastName");
	    if (typeof lastName === "string") {
	        return trim(lastName);
	    }
	    var name = this.proxy("traits.name");
	    if (typeof name !== "string") {
	        return;
	    }
	    var space = trim(name).indexOf(" ");
	    if (space === -1) {
	        return;
	    }
	    return trim(name.substr(space + 1));
	};
	i.uid = function () {
	    return this.userId() || this.username() || this.email();
	};
	i.description = function () {
	    return this.proxy("traits.description") || this.proxy("traits.background");
	};
	i.age = function () {
	    var date = this.birthday();
	    var age = analytics_js_obj_case_1.default(this.traits(), "age");
	    if (age != null)
	        return age;
	    if (!(date instanceof Date))
	        return;
	    var now = new Date();
	    return now.getFullYear() - date.getFullYear();
	};
	i.avatar = function () {
	    var traits = this.traits();
	    return (analytics_js_obj_case_1.default(traits, "avatar") || analytics_js_obj_case_1.default(traits, "photoUrl") || analytics_js_obj_case_1.default(traits, "avatarUrl"));
	};
	i.position = function () {
	    var traits = this.traits();
	    return analytics_js_obj_case_1.default(traits, "position") || analytics_js_obj_case_1.default(traits, "jobTitle");
	};
	i.username = facade.Facade.proxy("traits.username");
	i.website = facade.Facade.one("traits.website");
	i.websites = facade.Facade.multi("traits.website");
	i.phone = facade.Facade.one("traits.phone");
	i.phones = facade.Facade.multi("traits.phone");
	i.address = facade.Facade.proxy("traits.address");
	i.gender = facade.Facade.proxy("traits.gender");
	i.birthday = facade.Facade.proxy("traits.birthday");

	});

	var track = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Track = void 0;
	var inherits_1 = __importDefault(inherits_browser);


	var is_email_1 = __importDefault(isEmail_1);
	var analytics_js_obj_case_1 = __importDefault(analytics_jsObjCase);
	function Track(dictionary, opts) {
	    facade.Facade.call(this, dictionary, opts);
	}
	exports.Track = Track;
	inherits_1.default(Track, facade.Facade);
	var t = Track.prototype;
	t.action = function () {
	    return "track";
	};
	t.type = t.action;
	t.event = facade.Facade.field("event");
	t.value = facade.Facade.proxy("properties.value");
	t.category = facade.Facade.proxy("properties.category");
	t.id = facade.Facade.proxy("properties.id");
	t.productId = function () {
	    return (this.proxy("properties.product_id") || this.proxy("properties.productId"));
	};
	t.promotionId = function () {
	    return (this.proxy("properties.promotion_id") ||
	        this.proxy("properties.promotionId"));
	};
	t.cartId = function () {
	    return this.proxy("properties.cart_id") || this.proxy("properties.cartId");
	};
	t.checkoutId = function () {
	    return (this.proxy("properties.checkout_id") || this.proxy("properties.checkoutId"));
	};
	t.paymentId = function () {
	    return (this.proxy("properties.payment_id") || this.proxy("properties.paymentId"));
	};
	t.couponId = function () {
	    return (this.proxy("properties.coupon_id") || this.proxy("properties.couponId"));
	};
	t.wishlistId = function () {
	    return (this.proxy("properties.wishlist_id") || this.proxy("properties.wishlistId"));
	};
	t.reviewId = function () {
	    return (this.proxy("properties.review_id") || this.proxy("properties.reviewId"));
	};
	t.orderId = function () {
	    return (this.proxy("properties.id") ||
	        this.proxy("properties.order_id") ||
	        this.proxy("properties.orderId"));
	};
	t.sku = facade.Facade.proxy("properties.sku");
	t.tax = facade.Facade.proxy("properties.tax");
	t.name = facade.Facade.proxy("properties.name");
	t.price = facade.Facade.proxy("properties.price");
	t.total = facade.Facade.proxy("properties.total");
	t.repeat = facade.Facade.proxy("properties.repeat");
	t.coupon = facade.Facade.proxy("properties.coupon");
	t.shipping = facade.Facade.proxy("properties.shipping");
	t.discount = facade.Facade.proxy("properties.discount");
	t.shippingMethod = function () {
	    return (this.proxy("properties.shipping_method") ||
	        this.proxy("properties.shippingMethod"));
	};
	t.paymentMethod = function () {
	    return (this.proxy("properties.payment_method") ||
	        this.proxy("properties.paymentMethod"));
	};
	t.description = facade.Facade.proxy("properties.description");
	t.plan = facade.Facade.proxy("properties.plan");
	t.subtotal = function () {
	    var subtotal = analytics_js_obj_case_1.default(this.properties(), "subtotal");
	    var total = this.total() || this.revenue();
	    if (subtotal)
	        return subtotal;
	    if (!total)
	        return 0;
	    if (this.total()) {
	        var n = this.tax();
	        if (n)
	            total -= n;
	        n = this.shipping();
	        if (n)
	            total -= n;
	        n = this.discount();
	        if (n)
	            total += n;
	    }
	    return total;
	};
	t.products = function () {
	    var props = this.properties();
	    var products = analytics_js_obj_case_1.default(props, "products");
	    return Array.isArray(products) ? products : [];
	};
	t.quantity = function () {
	    var props = this.obj.properties || {};
	    return props.quantity || 1;
	};
	t.currency = function () {
	    var props = this.obj.properties || {};
	    return props.currency || "USD";
	};
	t.referrer = function () {
	    return (this.proxy("context.referrer.url") ||
	        this.proxy("context.page.referrer") ||
	        this.proxy("properties.referrer"));
	};
	t.query = facade.Facade.proxy("options.query");
	t.properties = function (aliases) {
	    var ret = this.field("properties") || {};
	    aliases = aliases || {};
	    for (var alias in aliases) {
	        var value = this[alias] == null ? this.proxy("properties." + alias) : this[alias]();
	        if (value == null)
	            continue;
	        ret[aliases[alias]] = value;
	        delete ret[alias];
	    }
	    return ret;
	};
	t.username = function () {
	    return (this.proxy("traits.username") ||
	        this.proxy("properties.username") ||
	        this.userId() ||
	        this.sessionId());
	};
	t.email = function () {
	    var email = this.proxy("traits.email") ||
	        this.proxy("properties.email") ||
	        this.proxy("options.traits.email");
	    if (email)
	        return email;
	    var userId = this.userId();
	    if (is_email_1.default(userId))
	        return userId;
	};
	t.revenue = function () {
	    var revenue = this.proxy("properties.revenue");
	    var event = this.event();
	    var orderCompletedRegExp = /^[ _]?completed[ _]?order[ _]?|^[ _]?order[ _]?completed[ _]?$/i;
	    if (!revenue && event && event.match(orderCompletedRegExp)) {
	        revenue = this.proxy("properties.total");
	    }
	    return currency(revenue);
	};
	t.cents = function () {
	    var revenue = this.revenue();
	    return typeof revenue !== "number" ? this.value() || 0 : revenue * 100;
	};
	t.identify = function () {
	    var json = this.json();
	    json.traits = this.traits();
	    return new identify.Identify(json, this.opts);
	};
	function currency(val) {
	    if (!val)
	        return;
	    if (typeof val === "number") {
	        return val;
	    }
	    if (typeof val !== "string") {
	        return;
	    }
	    val = val.replace(/\$/g, "");
	    val = parseFloat(val);
	    if (!isNaN(val)) {
	        return val;
	    }
	}

	});

	var page = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Page = void 0;
	var inherits_1 = __importDefault(inherits_browser);


	var is_email_1 = __importDefault(isEmail_1);
	function Page(dictionary, opts) {
	    facade.Facade.call(this, dictionary, opts);
	}
	exports.Page = Page;
	inherits_1.default(Page, facade.Facade);
	var p = Page.prototype;
	p.action = function () {
	    return "page";
	};
	p.type = p.action;
	p.category = facade.Facade.field("category");
	p.name = facade.Facade.field("name");
	p.title = facade.Facade.proxy("properties.title");
	p.path = facade.Facade.proxy("properties.path");
	p.url = facade.Facade.proxy("properties.url");
	p.referrer = function () {
	    return (this.proxy("context.referrer.url") ||
	        this.proxy("context.page.referrer") ||
	        this.proxy("properties.referrer"));
	};
	p.properties = function (aliases) {
	    var props = this.field("properties") || {};
	    var category = this.category();
	    var name = this.name();
	    aliases = aliases || {};
	    if (category)
	        props.category = category;
	    if (name)
	        props.name = name;
	    for (var alias in aliases) {
	        var value = this[alias] == null ? this.proxy("properties." + alias) : this[alias]();
	        if (value == null)
	            continue;
	        props[aliases[alias]] = value;
	        if (alias !== aliases[alias])
	            delete props[alias];
	    }
	    return props;
	};
	p.email = function () {
	    var email = this.proxy("context.traits.email") || this.proxy("properties.email");
	    if (email)
	        return email;
	    var userId = this.userId();
	    if (is_email_1.default(userId))
	        return userId;
	};
	p.fullName = function () {
	    var category = this.category();
	    var name = this.name();
	    return name && category ? category + " " + name : name;
	};
	p.event = function (name) {
	    return name ? "Viewed " + name + " Page" : "Loaded a Page";
	};
	p.track = function (name) {
	    var json = this.json();
	    json.event = this.event(name);
	    json.timestamp = this.timestamp();
	    json.properties = this.properties();
	    return new track.Track(json, this.opts);
	};

	});

	var screen = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Screen = void 0;
	var inherits_1 = __importDefault(inherits_browser);


	function Screen(dictionary, opts) {
	    page.Page.call(this, dictionary, opts);
	}
	exports.Screen = Screen;
	inherits_1.default(Screen, page.Page);
	Screen.prototype.action = function () {
	    return "screen";
	};
	Screen.prototype.type = Screen.prototype.action;
	Screen.prototype.event = function (name) {
	    return name ? "Viewed " + name + " Screen" : "Loaded a Screen";
	};
	Screen.prototype.track = function (name) {
	    var json = this.json();
	    json.event = this.event(name);
	    json.timestamp = this.timestamp();
	    json.properties = this.properties();
	    return new track.Track(json, this.opts);
	};

	});

	var _delete = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Delete = void 0;
	var inherits_1 = __importDefault(inherits_browser);

	function Delete(dictionary, opts) {
	    facade.Facade.call(this, dictionary, opts);
	}
	exports.Delete = Delete;
	inherits_1.default(Delete, facade.Facade);
	Delete.prototype.type = function () {
	    return "delete";
	};

	});

	var dist = createCommonjsModule(function (module, exports) {
	var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
	    __assign = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Delete = exports.Screen = exports.Page = exports.Track = exports.Identify = exports.Group = exports.Alias = exports.Facade = void 0;

	Object.defineProperty(exports, "Facade", { enumerable: true, get: function () { return facade.Facade; } });

	Object.defineProperty(exports, "Alias", { enumerable: true, get: function () { return alias.Alias; } });

	Object.defineProperty(exports, "Group", { enumerable: true, get: function () { return group.Group; } });

	Object.defineProperty(exports, "Identify", { enumerable: true, get: function () { return identify.Identify; } });

	Object.defineProperty(exports, "Track", { enumerable: true, get: function () { return track.Track; } });

	Object.defineProperty(exports, "Page", { enumerable: true, get: function () { return page.Page; } });

	Object.defineProperty(exports, "Screen", { enumerable: true, get: function () { return screen.Screen; } });

	Object.defineProperty(exports, "Delete", { enumerable: true, get: function () { return _delete.Delete; } });
	exports.default = __assign(__assign({}, facade.Facade), { Alias: alias.Alias,
	    Group: group.Group,
	    Identify: identify.Identify,
	    Track: track.Track,
	    Page: page.Page,
	    Screen: screen.Screen,
	    Delete: _delete.Delete });

	});

	var middleware = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.middlewareChain = exports.DestinationMiddlewareChain = exports.IntegrationMiddlewareChain = exports.SourceMiddlewareChain = void 0;
	var Facade = dist.Facade;
	var SourceMiddlewareChain = function SourceMiddlewareChain() {
	    var apply = exports.middlewareChain(this);
	    this.applyMiddlewares = function (facade, integrations, callback) {
	        return apply(function (mw, payload, next) {
	            mw({
	                integrations: integrations,
	                next: next,
	                payload: payload
	            });
	        }, facade, callback);
	    };
	};
	exports.SourceMiddlewareChain = SourceMiddlewareChain;
	var IntegrationMiddlewareChain = function IntegrationMiddlewareChain() {
	    var apply = exports.middlewareChain(this);
	    this.applyMiddlewares = function (facade, integration, callback) {
	        return apply(function (mw, payload, next) {
	            mw(payload, integration, next);
	        }, facade, callback);
	    };
	};
	exports.IntegrationMiddlewareChain = IntegrationMiddlewareChain;
	var DestinationMiddlewareChain = function DestinationMiddlewareChain() {
	    var apply = exports.middlewareChain(this);
	    this.applyMiddlewares = function (facade, integration, callback) {
	        return apply(function (mw, payload, next) {
	            mw({ payload: payload, integration: integration, next: next });
	        }, facade, callback);
	    };
	};
	exports.DestinationMiddlewareChain = DestinationMiddlewareChain;
	// Chain is essentially a linked list of middlewares to run in order.
	var middlewareChain = function middlewareChain(dest) {
	    var middlewares = [];
	    // Return a copy to prevent external mutations.
	    dest.getMiddlewares = function () {
	        return middlewares.slice();
	    };
	    dest.add = function (middleware) {
	        if (typeof middleware !== 'function')
	            throw new Error('attempted to add non-function middleware');
	        // Check for identical object references - bug check.
	        if (middlewares.indexOf(middleware) !== -1)
	            throw new Error('middleware is already registered');
	        middlewares.push(middleware);
	    };
	    // fn is the callback to be run once all middlewares have been applied.
	    return function applyMiddlewares(run, facade, callback) {
	        if (typeof facade !== 'object')
	            throw new Error('applyMiddlewares requires a payload object');
	        if (typeof callback !== 'function')
	            throw new Error('applyMiddlewares requires a function callback');
	        // Attach callback to the end of the chain.
	        var middlewaresToApply = middlewares.slice();
	        middlewaresToApply.push(callback);
	        executeChain(run, facade, middlewaresToApply, 0);
	    };
	};
	exports.middlewareChain = middlewareChain;
	// Go over all middlewares until all have been applied.
	function executeChain(run, payload, middlewares, index) {
	    // If the facade has been nullified, immediately skip to the final middleware.
	    if (payload === null) {
	        middlewares[middlewares.length - 1](null);
	        return;
	    }
	    // Check if the payload is still a Facade. If not, convert it to one.
	    if (!(payload instanceof Facade)) {
	        payload = new Facade(payload);
	    }
	    var mw = middlewares[index];
	    if (mw) {
	        // If there's another middleware, continue down the chain. Otherwise, call the final function.
	        if (middlewares[index + 1]) {
	            run(mw, payload, function (result) {
	                executeChain(run, result, middlewares, ++index);
	            });
	        }
	        else {
	            mw(payload);
	        }
	    }
	}
	});

	/**
	 * Slice reference.
	 */
	var slice = [].slice;

	/**
	 * Bind `obj` to `fn`.
	 *
	 * @param {Object} obj
	 * @param {Function|String} fn or string
	 * @return {Function}
	 * @api public
	 */

	var componentBind = function(obj, fn){
	  if ('string' == typeof fn) fn = obj[fn];
	  if ('function' != typeof fn) throw new Error('bind() requires a function');
	  var args = slice.call(arguments, 2);
	  return function(){
	    return fn.apply(obj, args.concat(slice.call(arguments)));
	  }
	};

	function bindAll(obj) {
	  // eslint-disable-next-line guard-for-in
	  for (var key in obj) {
	    var val = obj[key];
	    if (typeof val === 'function') {
	      obj[key] = componentBind(obj, obj[key]);
	    }
	  }
	  return obj;
	}

	var lib$3 = bindAll;

	var hasOwn = Object.prototype.hasOwnProperty;
	var toStr$1 = Object.prototype.toString;
	var defineProperty = Object.defineProperty;
	var gOPD = Object.getOwnPropertyDescriptor;

	var isArray$1 = function isArray(arr) {
		if (typeof Array.isArray === 'function') {
			return Array.isArray(arr);
		}

		return toStr$1.call(arr) === '[object Array]';
	};

	var isPlainObject = function isPlainObject(obj) {
		if (!obj || toStr$1.call(obj) !== '[object Object]') {
			return false;
		}

		var hasOwnConstructor = hasOwn.call(obj, 'constructor');
		var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
		// Not own constructor property must be Object
		if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		var key;
		for (key in obj) { /**/ }

		return typeof key === 'undefined' || hasOwn.call(obj, key);
	};

	// If name is '__proto__', and Object.defineProperty is available, define __proto__ as an own property on target
	var setProperty = function setProperty(target, options) {
		if (defineProperty && options.name === '__proto__') {
			defineProperty(target, options.name, {
				enumerable: true,
				configurable: true,
				value: options.newValue,
				writable: true
			});
		} else {
			target[options.name] = options.newValue;
		}
	};

	// Return undefined instead of __proto__ if '__proto__' is not an own property
	var getProperty = function getProperty(obj, name) {
		if (name === '__proto__') {
			if (!hasOwn.call(obj, name)) {
				return void 0;
			} else if (gOPD) {
				// In early versions of node, obj['__proto__'] is buggy when obj has
				// __proto__ as an own property. Object.getOwnPropertyDescriptor() works.
				return gOPD(obj, name).value;
			}
		}

		return obj[name];
	};

	var extend = function extend() {
		var options, name, src, copy, copyIsArray, clone;
		var target = arguments[0];
		var i = 1;
		var length = arguments.length;
		var deep = false;

		// Handle a deep copy situation
		if (typeof target === 'boolean') {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		}
		if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
			target = {};
		}

		for (; i < length; ++i) {
			options = arguments[i];
			// Only deal with non-null/undefined values
			if (options != null) {
				// Extend the base object
				for (name in options) {
					src = getProperty(target, name);
					copy = getProperty(options, name);

					// Prevent never-ending loop
					if (target !== copy) {
						// Recurse if we're merging plain objects or arrays
						if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray$1(copy)))) {
							if (copyIsArray) {
								copyIsArray = false;
								clone = src && isArray$1(src) ? src : [];
							} else {
								clone = src && isPlainObject(src) ? src : {};
							}

							// Never move original objects, clone them
							setProperty(target, { name: name, newValue: extend(deep, clone, copy) });

						// Don't bring in undefined values
						} else if (typeof copy !== 'undefined') {
							setProperty(target, { name: name, newValue: copy });
						}
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	/**
	 * Module dependencies.
	 */

	// var debug = require('debug')('cookie');

	/**
	 * Set or get cookie `name` with `value` and `options` object.
	 *
	 * @param {String} name
	 * @param {String} value
	 * @param {Object} options
	 * @return {Mixed}
	 * @api public
	 */

	var lib$4 = function(name, value, options) {
	  switch (arguments.length) {
	    case 3:
	    case 2:
	      return set(name, value, options);
	    case 1:
	      return get(name);
	    default:
	      return all();
	  }
	};

	/**
	 * Set cookie `name` to `value`.
	 *
	 * @param {String} name
	 * @param {String} value
	 * @param {Object} options
	 * @api private
	 */

	function set(name, value, options) {
	  options = options || {};
	  var str = encode(name) + '=' + encode(value);

	  if (value == null) options.maxage = -1;

	  if (options.maxage) {
	    options.expires = new Date(+new Date() + options.maxage);
	  }

	  if (options.path) str += '; path=' + options.path;
	  if (options.domain) str += '; domain=' + options.domain;
	  if (options.expires) str += '; expires=' + options.expires.toUTCString();
	  if (options.sameSite) str += '; SameSite=' + options.sameSite;
	  if (options.secure) str += '; secure';

	  document.cookie = str;
	}

	/**
	 * Return all cookies.
	 *
	 * @return {Object}
	 * @api private
	 */

	function all() {
	  var str;
	  try {
	    str = document.cookie;
	  } catch (err) {
	    if (typeof console !== 'undefined' && typeof console.error === 'function') {
	      console.error(err.stack || err);
	    }
	    return {};
	  }
	  return parse$3(str);
	}

	/**
	 * Get cookie `name`.
	 *
	 * @param {String} name
	 * @return {String}
	 * @api private
	 */

	function get(name) {
	  return all()[name];
	}

	/**
	 * Parse cookie `str`.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */

	function parse$3(str) {
	  var obj = {};
	  var pairs = str.split(/ *; */);
	  var pair;
	  if (pairs[0] == '') return obj; // eslint-disable-line eqeqeq
	  for (var i = 0; i < pairs.length; ++i) {
	    pair = pairs[i].split('=');
	    obj[decode(pair[0])] = decode(pair[1]);
	  }
	  return obj;
	}

	/**
	 * Encode.
	 */

	function encode(value) {
	  try {
	    return encodeURIComponent(value);
	  } catch (e) {
	    // debug('error `encode(%o)` - %o', value, e);
	  }
	}

	/**
	 * Decode.
	 */

	function decode(value) {
	  try {
	    return decodeURIComponent(value);
	  } catch (e) {
	    // debug('error `decode(%o)` - %o', value, e);
	  }
	}

	var lib$5 = createCommonjsModule(function (module, exports) {

	/**
	 * Module dependencies.
	 */

	var parse = componentUrl.parse;


	/**
	 * Get the top domain.
	 *
	 * The function constructs the levels of domain and attempts to set a global
	 * cookie on each one when it succeeds it returns the top level domain.
	 *
	 * The method returns an empty string when the hostname is an ip or `localhost`.
	 *
	 * Example levels:
	 *
	 *      domain.levels('http://www.google.co.uk');
	 *      // => ["co.uk", "google.co.uk", "www.google.co.uk"]
	 *
	 * Example:
	 *
	 *      domain('http://localhost:3000/baz');
	 *      // => ''
	 *      domain('http://dev:3000/baz');
	 *      // => ''
	 *      domain('http://127.0.0.1:3000/baz');
	 *      // => ''
	 *      domain('http://segment.io/baz');
	 *      // => 'segment.io'
	 *
	 * @param {string} url
	 * @return {string}
	 * @api public
	 */
	function domain(url) {
	  var cookie = exports.cookie;
	  var levels = exports.levels(url);

	  // Lookup the real top level one.
	  for (var i = 0; i < levels.length; ++i) {
	    var cname = '__tld__';
	    var domain = levels[i];
	    var opts = { domain: '.' + domain };

	    cookie(cname, 1, opts);
	    if (cookie(cname)) {
	      cookie(cname, null, opts);
	      return domain;
	    }
	  }

	  return '';
	}

	/**
	 * Levels returns all levels of the given url.
	 *
	 * @param {string} url
	 * @return {Array}
	 * @api public
	 */
	domain.levels = function(url) {
	  var host = parse(url).hostname;
	  var parts = host.split('.');
	  var last = parts[parts.length - 1];
	  var levels = [];

	  // Ip address.
	  if (parts.length === 4 && last === parseInt(last, 10)) {
	    return levels;
	  }

	  // Localhost.
	  if (parts.length <= 1) {
	    return levels;
	  }

	  // Create levels.
	  for (var i = parts.length - 2; i >= 0; --i) {
	    levels.push(parts.slice(i).join('.'));
	  }

	  return levels;
	};

	/**
	 * Expose cookie on domain.
	 */
	domain.cookie = lib$4;

	/*
	 * Exports.
	 */

	exports = module.exports = domain;
	});

	var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
	    __assign = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};
	var __importDefault$1 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};

	var clonedeep_1 = __importDefault$1(cloneDeep_1);
	/**
	 * Module dependencies.
	 */


	// var debug = require('debug')('analytics.js:cookie');

	var MAX_AGE_ONE_YEAR = 31536000000;
	/**
	 * Initialize a new `Cookie` with `options`.
	 *
	 * @param {Object} options
	 */
	function Cookie(options) {
	    this.options(options);
	}
	/**
	 * Get or set the cookie options.
	 */
	Cookie.prototype.options = function (options) {
	    if (arguments.length === 0)
	        return this._options;
	    options = options || {};
	    var domain = '.' + lib$5(window.location.href);
	    if (domain === '.')
	        domain = null;
	    var defaults = {
	        maxage: MAX_AGE_ONE_YEAR,
	        domain: domain,
	        path: '/',
	        sameSite: 'Lax'
	    };
	    this._options = __assign(__assign({}, defaults), options);
	    // http://curl.haxx.se/rfc/cookie_spec.html
	    // https://publicsuffix.org/list/effective_tld_names.dat
	    //
	    // try setting a dummy cookie with the options
	    // if the cookie isn't set, it probably means
	    // that the domain is on the public suffix list
	    // like myapp.herokuapp.com or localhost / ip.
	    this.set('ajs:test', true);
	    if (!this.get('ajs:test')) {
	        // debug('fallback to domain=null');
	        this._options.domain = null;
	    }
	    this.remove('ajs:test');
	};
	/**
	 * Set a `key` and `value` in our cookie.
	 */
	Cookie.prototype.set = function (key, value) {
	    try {
	        value = window.JSON.stringify(value);
	        lib$4(key, value === 'null' ? null : value, clonedeep_1.default(this._options));
	        return true;
	    }
	    catch (e) {
	        return false;
	    }
	};
	/**
	 * Get a value from our cookie by `key`.
	 */
	Cookie.prototype.get = function (key) {
	    try {
	        var value = lib$4(key);
	        value = value ? window.JSON.parse(value) : null;
	        return value;
	    }
	    catch (e) {
	        return null;
	    }
	};
	/**
	 * Remove a value from our cookie by `key`.
	 */
	Cookie.prototype.remove = function (key) {
	    try {
	        lib$4(key, null, clonedeep_1.default(this._options));
	        return true;
	    }
	    catch (e) {
	        return false;
	    }
	};
	/**
	 * Expose the cookie singleton.
	 */
	var cookie_1 = lib$3(new Cookie());
	/**
	 * Expose the `Cookie` constructor.
	 */
	var Cookie_1 = Cookie;
	cookie_1.Cookie = Cookie_1;

	/* globals window, HTMLElement */

	var is_1 = createCommonjsModule(function (module) {
	/**!
	 * is
	 * the definitive JavaScript type testing library
	 *
	 * @copyright 2013-2014 Enrico Marino / Jordan Harband
	 * @license MIT
	 */

	var objProto = Object.prototype;
	var owns = objProto.hasOwnProperty;
	var toStr = objProto.toString;
	var symbolValueOf;
	if (typeof Symbol === 'function') {
	  symbolValueOf = Symbol.prototype.valueOf;
	}
	var isActualNaN = function (value) {
	  return value !== value;
	};
	var NON_HOST_TYPES = {
	  'boolean': 1,
	  number: 1,
	  string: 1,
	  undefined: 1
	};

	var base64Regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
	var hexRegex = /^[A-Fa-f0-9]+$/;

	/**
	 * Expose `is`
	 */

	var is = module.exports = {};

	/**
	 * Test general.
	 */

	/**
	 * is.type
	 * Test if `value` is a type of `type`.
	 *
	 * @param {Mixed} value value to test
	 * @param {String} type type
	 * @return {Boolean} true if `value` is a type of `type`, false otherwise
	 * @api public
	 */

	is.a = is.type = function (value, type) {
	  return typeof value === type;
	};

	/**
	 * is.defined
	 * Test if `value` is defined.
	 *
	 * @param {Mixed} value value to test
	 * @return {Boolean} true if 'value' is defined, false otherwise
	 * @api public
	 */

	is.defined = function (value) {
	  return typeof value !== 'undefined';
	};

	/**
	 * is.empty
	 * Test if `value` is empty.
	 *
	 * @param {Mixed} value value to test
	 * @return {Boolean} true if `value` is empty, false otherwise
	 * @api public
	 */

	is.empty = function (value) {
	  var type = toStr.call(value);
	  var key;

	  if (type === '[object Array]' || type === '[object Arguments]' || type === '[object String]') {
	    return value.length === 0;
	  }

	  if (type === '[object Object]') {
	    for (key in value) {
	      if (owns.call(value, key)) { return false; }
	    }
	    return true;
	  }

	  return !value;
	};

	/**
	 * is.equal
	 * Test if `value` is equal to `other`.
	 *
	 * @param {Mixed} value value to test
	 * @param {Mixed} other value to compare with
	 * @return {Boolean} true if `value` is equal to `other`, false otherwise
	 */

	is.equal = function equal(value, other) {
	  if (value === other) {
	    return true;
	  }

	  var type = toStr.call(value);
	  var key;

	  if (type !== toStr.call(other)) {
	    return false;
	  }

	  if (type === '[object Object]') {
	    for (key in value) {
	      if (!is.equal(value[key], other[key]) || !(key in other)) {
	        return false;
	      }
	    }
	    for (key in other) {
	      if (!is.equal(value[key], other[key]) || !(key in value)) {
	        return false;
	      }
	    }
	    return true;
	  }

	  if (type === '[object Array]') {
	    key = value.length;
	    if (key !== other.length) {
	      return false;
	    }
	    while (--key) {
	      if (!is.equal(value[key], other[key])) {
	        return false;
	      }
	    }
	    return true;
	  }

	  if (type === '[object Function]') {
	    return value.prototype === other.prototype;
	  }

	  if (type === '[object Date]') {
	    return value.getTime() === other.getTime();
	  }

	  return false;
	};

	/**
	 * is.hosted
	 * Test if `value` is hosted by `host`.
	 *
	 * @param {Mixed} value to test
	 * @param {Mixed} host host to test with
	 * @return {Boolean} true if `value` is hosted by `host`, false otherwise
	 * @api public
	 */

	is.hosted = function (value, host) {
	  var type = typeof host[value];
	  return type === 'object' ? !!host[value] : !NON_HOST_TYPES[type];
	};

	/**
	 * is.instance
	 * Test if `value` is an instance of `constructor`.
	 *
	 * @param {Mixed} value value to test
	 * @return {Boolean} true if `value` is an instance of `constructor`
	 * @api public
	 */

	is.instance = is['instanceof'] = function (value, constructor) {
	  return value instanceof constructor;
	};

	/**
	 * is.nil / is.null
	 * Test if `value` is null.
	 *
	 * @param {Mixed} value value to test
	 * @return {Boolean} true if `value` is null, false otherwise
	 * @api public
	 */

	is.nil = is['null'] = function (value) {
	  return value === null;
	};

	/**
	 * is.undef / is.undefined
	 * Test if `value` is undefined.
	 *
	 * @param {Mixed} value value to test
	 * @return {Boolean} true if `value` is undefined, false otherwise
	 * @api public
	 */

	is.undef = is.undefined = function (value) {
	  return typeof value === 'undefined';
	};

	/**
	 * Test arguments.
	 */

	/**
	 * is.args
	 * Test if `value` is an arguments object.
	 *
	 * @param {Mixed} value value to test
	 * @return {Boolean} true if `value` is an arguments object, false otherwise
	 * @api public
	 */

	is.args = is.arguments = function (value) {
	  var isStandardArguments = toStr.call(value) === '[object Arguments]';
	  var isOldArguments = !is.array(value) && is.arraylike(value) && is.object(value) && is.fn(value.callee);
	  return isStandardArguments || isOldArguments;
	};

	/**
	 * Test array.
	 */

	/**
	 * is.array
	 * Test if 'value' is an array.
	 *
	 * @param {Mixed} value value to test
	 * @return {Boolean} true if `value` is an array, false otherwise
	 * @api public
	 */

	is.array = Array.isArray || function (value) {
	  return toStr.call(value) === '[object Array]';
	};

	/**
	 * is.arguments.empty
	 * Test if `value` is an empty arguments object.
	 *
	 * @param {Mixed} value value to test
	 * @return {Boolean} true if `value` is an empty arguments object, false otherwise
	 * @api public
	 */
	is.args.empty = function (value) {
	  return is.args(value) && value.length === 0;
	};

	/**
	 * is.array.empty
	 * Test if `value` is an empty array.
	 *
	 * @param {Mixed} value value to test
	 * @return {Boolean} true if `value` is an empty array, false otherwise
	 * @api public
	 */
	is.array.empty = function (value) {
	  return is.array(value) && value.length === 0;
	};

	/**
	 * is.arraylike
	 * Test if `value` is an arraylike object.
	 *
	 * @param {Mixed} value value to test
	 * @return {Boolean} true if `value` is an arguments object, false otherwise
	 * @api public
	 */

	is.arraylike = function (value) {
	  return !!value && !is.bool(value)
	    && owns.call(value, 'length')
	    && isFinite(value.length)
	    && is.number(value.length)
	    && value.length >= 0;
	};

	/**
	 * Test boolean.
	 */

	/**
	 * is.bool
	 * Test if `value` is a boolean.
	 *
	 * @param {Mixed} value value to test
	 * @return {Boolean} true if `value` is a boolean, false otherwise
	 * @api public
	 */

	is.bool = is['boolean'] = function (value) {
	  return toStr.call(value) === '[object Boolean]';
	};

	/**
	 * is.false
	 * Test if `value` is false.
	 *
	 * @param {Mixed} value value to test
	 * @return {Boolean} true if `value` is false, false otherwise
	 * @api public
	 */

	is['false'] = function (value) {
	  return is.bool(value) && Boolean(Number(value)) === false;
	};

	/**
	 * is.true
	 * Test if `value` is true.
	 *
	 * @param {Mixed} value value to test
	 * @return {Boolean} true if `value` is true, false otherwise
	 * @api public
	 */

	is['true'] = function (value) {
	  return is.bool(value) && Boolean(Number(value)) === true;
	};

	/**
	 * Test date.
	 */

	/**
	 * is.date
	 * Test if `value` is a date.
	 *
	 * @param {Mixed} value value to test
	 * @return {Boolean} true if `value` is a date, false otherwise
	 * @api public
	 */

	is.date = function (value) {
	  return toStr.call(value) === '[object Date]';
	};

	/**
	 * Test element.
	 */

	/**
	 * is.element
	 * Test if `value` is an html element.
	 *
	 * @param {Mixed} value value to test
	 * @return {Boolean} true if `value` is an HTML Element, false otherwise
	 * @api public
	 */

	is.element = function (value) {
	  return value !== undefined
	    && typeof HTMLElement !== 'undefined'
	    && value instanceof HTMLElement
	    && value.nodeType === 1;
	};

	/**
	 * Test error.
	 */

	/**
	 * is.error
	 * Test if `value` is an error object.
	 *
	 * @param {Mixed} value value to test
	 * @return {Boolean} true if `value` is an error object, false otherwise
	 * @api public
	 */

	is.error = function (value) {
	  return toStr.call(value) === '[object Error]';
	};

	/**
	 * Test function.
	 */

	/**
	 * is.fn / is.function (deprecated)
	 * Test if `value` is a function.
	 *
	 * @param {Mixed} value value to test
	 * @return {Boolean} true if `value` is a function, false otherwise
	 * @api public
	 */

	is.fn = is['function'] = function (value) {
	  var isAlert = typeof window !== 'undefined' && value === window.alert;
	  return isAlert || toStr.call(value) === '[object Function]';
	};

	/**
	 * Test number.
	 */

	/**
	 * is.number
	 * Test if `value` is a number.
	 *
	 * @param {Mixed} value value to test
	 * @return {Boolean} true if `value` is a number, false otherwise
	 * @api public
	 */

	is.number = function (value) {
	  return toStr.call(value) === '[object Number]';
	};

	/**
	 * is.infinite
	 * Test if `value` is positive or negative infinity.
	 *
	 * @param {Mixed} value value to test
	 * @return {Boolean} true if `value` is positive or negative Infinity, false otherwise
	 * @api public
	 */
	is.infinite = function (value) {
	  return value === Infinity || value === -Infinity;
	};

	/**
	 * is.decimal
	 * Test if `value` is a decimal number.
	 *
	 * @param {Mixed} value value to test
	 * @return {Boolean} true if `value` is a decimal number, false otherwise
	 * @api public
	 */

	is.decimal = function (value) {
	  return is.number(value) && !isActualNaN(value) && !is.infinite(value) && value % 1 !== 0;
	};

	/**
	 * is.divisibleBy
	 * Test if `value` is divisible by `n`.
	 *
	 * @param {Number} value value to test
	 * @param {Number} n dividend
	 * @return {Boolean} true if `value` is divisible by `n`, false otherwise
	 * @api public
	 */

	is.divisibleBy = function (value, n) {
	  var isDividendInfinite = is.infinite(value);
	  var isDivisorInfinite = is.infinite(n);
	  var isNonZeroNumber = is.number(value) && !isActualNaN(value) && is.number(n) && !isActualNaN(n) && n !== 0;
	  return isDividendInfinite || isDivisorInfinite || (isNonZeroNumber && value % n === 0);
	};

	/**
	 * is.integer
	 * Test if `value` is an integer.
	 *
	 * @param value to test
	 * @return {Boolean} true if `value` is an integer, false otherwise
	 * @api public
	 */

	is.integer = is['int'] = function (value) {
	  return is.number(value) && !isActualNaN(value) && value % 1 === 0;
	};

	/**
	 * is.maximum
	 * Test if `value` is greater than 'others' values.
	 *
	 * @param {Number} value value to test
	 * @param {Array} others values to compare with
	 * @return {Boolean} true if `value` is greater than `others` values
	 * @api public
	 */

	is.maximum = function (value, others) {
	  if (isActualNaN(value)) {
	    throw new TypeError('NaN is not a valid value');
	  } else if (!is.arraylike(others)) {
	    throw new TypeError('second argument must be array-like');
	  }
	  var len = others.length;

	  while (--len >= 0) {
	    if (value < others[len]) {
	      return false;
	    }
	  }

	  return true;
	};

	/**
	 * is.minimum
	 * Test if `value` is less than `others` values.
	 *
	 * @param {Number} value value to test
	 * @param {Array} others values to compare with
	 * @return {Boolean} true if `value` is less than `others` values
	 * @api public
	 */

	is.minimum = function (value, others) {
	  if (isActualNaN(value)) {
	    throw new TypeError('NaN is not a valid value');
	  } else if (!is.arraylike(others)) {
	    throw new TypeError('second argument must be array-like');
	  }
	  var len = others.length;

	  while (--len >= 0) {
	    if (value > others[len]) {
	      return false;
	    }
	  }

	  return true;
	};

	/**
	 * is.nan
	 * Test if `value` is not a number.
	 *
	 * @param {Mixed} value value to test
	 * @return {Boolean} true if `value` is not a number, false otherwise
	 * @api public
	 */

	is.nan = function (value) {
	  return !is.number(value) || value !== value;
	};

	/**
	 * is.even
	 * Test if `value` is an even number.
	 *
	 * @param {Number} value value to test
	 * @return {Boolean} true if `value` is an even number, false otherwise
	 * @api public
	 */

	is.even = function (value) {
	  return is.infinite(value) || (is.number(value) && value === value && value % 2 === 0);
	};

	/**
	 * is.odd
	 * Test if `value` is an odd number.
	 *
	 * @param {Number} value value to test
	 * @return {Boolean} true if `value` is an odd number, false otherwise
	 * @api public
	 */

	is.odd = function (value) {
	  return is.infinite(value) || (is.number(value) && value === value && value % 2 !== 0);
	};

	/**
	 * is.ge
	 * Test if `value` is greater than or equal to `other`.
	 *
	 * @param {Number} value value to test
	 * @param {Number} other value to compare with
	 * @return {Boolean}
	 * @api public
	 */

	is.ge = function (value, other) {
	  if (isActualNaN(value) || isActualNaN(other)) {
	    throw new TypeError('NaN is not a valid value');
	  }
	  return !is.infinite(value) && !is.infinite(other) && value >= other;
	};

	/**
	 * is.gt
	 * Test if `value` is greater than `other`.
	 *
	 * @param {Number} value value to test
	 * @param {Number} other value to compare with
	 * @return {Boolean}
	 * @api public
	 */

	is.gt = function (value, other) {
	  if (isActualNaN(value) || isActualNaN(other)) {
	    throw new TypeError('NaN is not a valid value');
	  }
	  return !is.infinite(value) && !is.infinite(other) && value > other;
	};

	/**
	 * is.le
	 * Test if `value` is less than or equal to `other`.
	 *
	 * @param {Number} value value to test
	 * @param {Number} other value to compare with
	 * @return {Boolean} if 'value' is less than or equal to 'other'
	 * @api public
	 */

	is.le = function (value, other) {
	  if (isActualNaN(value) || isActualNaN(other)) {
	    throw new TypeError('NaN is not a valid value');
	  }
	  return !is.infinite(value) && !is.infinite(other) && value <= other;
	};

	/**
	 * is.lt
	 * Test if `value` is less than `other`.
	 *
	 * @param {Number} value value to test
	 * @param {Number} other value to compare with
	 * @return {Boolean} if `value` is less than `other`
	 * @api public
	 */

	is.lt = function (value, other) {
	  if (isActualNaN(value) || isActualNaN(other)) {
	    throw new TypeError('NaN is not a valid value');
	  }
	  return !is.infinite(value) && !is.infinite(other) && value < other;
	};

	/**
	 * is.within
	 * Test if `value` is within `start` and `finish`.
	 *
	 * @param {Number} value value to test
	 * @param {Number} start lower bound
	 * @param {Number} finish upper bound
	 * @return {Boolean} true if 'value' is is within 'start' and 'finish'
	 * @api public
	 */
	is.within = function (value, start, finish) {
	  if (isActualNaN(value) || isActualNaN(start) || isActualNaN(finish)) {
	    throw new TypeError('NaN is not a valid value');
	  } else if (!is.number(value) || !is.number(start) || !is.number(finish)) {
	    throw new TypeError('all arguments must be numbers');
	  }
	  var isAnyInfinite = is.infinite(value) || is.infinite(start) || is.infinite(finish);
	  return isAnyInfinite || (value >= start && value <= finish);
	};

	/**
	 * Test object.
	 */

	/**
	 * is.object
	 * Test if `value` is an object.
	 *
	 * @param {Mixed} value value to test
	 * @return {Boolean} true if `value` is an object, false otherwise
	 * @api public
	 */

	is.object = function (value) {
	  return toStr.call(value) === '[object Object]';
	};

	/**
	 * is.hash
	 * Test if `value` is a hash - a plain object literal.
	 *
	 * @param {Mixed} value value to test
	 * @return {Boolean} true if `value` is a hash, false otherwise
	 * @api public
	 */

	is.hash = function (value) {
	  return is.object(value) && value.constructor === Object && !value.nodeType && !value.setInterval;
	};

	/**
	 * Test regexp.
	 */

	/**
	 * is.regexp
	 * Test if `value` is a regular expression.
	 *
	 * @param {Mixed} value value to test
	 * @return {Boolean} true if `value` is a regexp, false otherwise
	 * @api public
	 */

	is.regexp = function (value) {
	  return toStr.call(value) === '[object RegExp]';
	};

	/**
	 * Test string.
	 */

	/**
	 * is.string
	 * Test if `value` is a string.
	 *
	 * @param {Mixed} value value to test
	 * @return {Boolean} true if 'value' is a string, false otherwise
	 * @api public
	 */

	is.string = function (value) {
	  return toStr.call(value) === '[object String]';
	};

	/**
	 * Test base64 string.
	 */

	/**
	 * is.base64
	 * Test if `value` is a valid base64 encoded string.
	 *
	 * @param {Mixed} value value to test
	 * @return {Boolean} true if 'value' is a base64 encoded string, false otherwise
	 * @api public
	 */

	is.base64 = function (value) {
	  return is.string(value) && (!value.length || base64Regex.test(value));
	};

	/**
	 * Test base64 string.
	 */

	/**
	 * is.hex
	 * Test if `value` is a valid hex encoded string.
	 *
	 * @param {Mixed} value value to test
	 * @return {Boolean} true if 'value' is a hex encoded string, false otherwise
	 * @api public
	 */

	is.hex = function (value) {
	  return is.string(value) && (!value.length || hexRegex.test(value));
	};

	/**
	 * is.symbol
	 * Test if `value` is an ES6 Symbol
	 *
	 * @param {Mixed} value value to test
	 * @return {Boolean} true if `value` is a Symbol, false otherise
	 * @api public
	 */

	is.symbol = function (value) {
	  return typeof Symbol === 'function' && toStr.call(value) === '[object Symbol]' && typeof symbolValueOf.call(value) === 'symbol';
	};
	});

	var hop = Object.prototype.hasOwnProperty;
	var strCharAt = String.prototype.charAt;
	var toStr$2 = Object.prototype.toString;

	/**
	 * Returns the character at a given index.
	 *
	 * @param {string} str
	 * @param {number} index
	 * @return {string|undefined}
	 */
	// TODO: Move to a library
	var charAt = function(str, index) {
	  return strCharAt.call(str, index);
	};

	/**
	 * hasOwnProperty, wrapped as a function.
	 *
	 * @name has
	 * @api private
	 * @param {*} context
	 * @param {string|number} prop
	 * @return {boolean}
	 */

	// TODO: Move to a library
	var has = function has(context, prop) {
	  return hop.call(context, prop);
	};

	/**
	 * Returns true if a value is a string, otherwise false.
	 *
	 * @name isString
	 * @api private
	 * @param {*} val
	 * @return {boolean}
	 */

	// TODO: Move to a library
	var isString$1 = function isString(val) {
	  return toStr$2.call(val) === '[object String]';
	};

	/**
	 * Returns true if a value is array-like, otherwise false. Array-like means a
	 * value is not null, undefined, or a function, and has a numeric `length`
	 * property.
	 *
	 * @name isArrayLike
	 * @api private
	 * @param {*} val
	 * @return {boolean}
	 */
	// TODO: Move to a library
	var isArrayLike$1 = function isArrayLike(val) {
	  return val != null && (typeof val !== 'function' && typeof val.length === 'number');
	};


	/**
	 * indexKeys
	 *
	 * @name indexKeys
	 * @api private
	 * @param {} target
	 * @param {Function} pred
	 * @return {Array}
	 */
	var indexKeys$1 = function indexKeys(target, pred) {
	  pred = pred || has;

	  var results = [];

	  for (var i = 0, len = target.length; i < len; i += 1) {
	    if (pred(target, i)) {
	      results.push(String(i));
	    }
	  }

	  return results;
	};

	/**
	 * Returns an array of an object's owned keys.
	 *
	 * @name objectKeys
	 * @api private
	 * @param {*} target
	 * @param {Function} pred Predicate function used to include/exclude values from
	 * the resulting array.
	 * @return {Array}
	 */
	var objectKeys = function objectKeys(target, pred) {
	  pred = pred || has;

	  var results = [];

	  for (var key in target) {
	    if (pred(target, key)) {
	      results.push(String(key));
	    }
	  }

	  return results;
	};

	/**
	 * Creates an array composed of all keys on the input object. Ignores any non-enumerable properties.
	 * More permissive than the native `Object.keys` function (non-objects will not throw errors).
	 *
	 * @name keys
	 * @api public
	 * @category Object
	 * @param {Object} source The value to retrieve keys from.
	 * @return {Array} An array containing all the input `source`'s keys.
	 * @example
	 * keys({ likes: 'avocado', hates: 'pineapple' });
	 * //=> ['likes', 'pineapple'];
	 *
	 * // Ignores non-enumerable properties
	 * var hasHiddenKey = { name: 'Tim' };
	 * Object.defineProperty(hasHiddenKey, 'hidden', {
	 *   value: 'i am not enumerable!',
	 *   enumerable: false
	 * })
	 * keys(hasHiddenKey);
	 * //=> ['name'];
	 *
	 * // Works on arrays
	 * keys(['a', 'b', 'c']);
	 * //=> ['0', '1', '2']
	 *
	 * // Skips unpopulated indices in sparse arrays
	 * var arr = [1];
	 * arr[4] = 4;
	 * keys(arr);
	 * //=> ['0', '4']
	 */
	var keys$1 = function keys(source) {
	  if (source == null) {
	    return [];
	  }

	  // IE6-8 compatibility (string)
	  if (isString$1(source)) {
	    return indexKeys$1(source, charAt);
	  }

	  // IE6-8 compatibility (arguments)
	  if (isArrayLike$1(source)) {
	    return indexKeys$1(source, has);
	  }

	  return objectKeys(source);
	};

	/*
	 * Exports.
	 */

	var keys_1$1 = keys$1;

	var callable, byObserver;

	callable = function (fn) {
		if (typeof fn !== 'function') throw new TypeError(fn + " is not a function");
		return fn;
	};

	byObserver = function (Observer) {
		var node = document.createTextNode(''), queue, i = 0;
		new Observer(function () {
			var data;
			if (!queue) return;
			data = queue;
			queue = null;
			if (typeof data === 'function') {
				data();
				return;
			}
			data.forEach(function (fn) { fn(); });
		}).observe(node, { characterData: true });
		return function (fn) {
			callable(fn);
			if (queue) {
				if (typeof queue === 'function') queue = [queue, fn];
				else queue.push(fn);
				return;
			}
			queue = fn;
			node.data = (i = ++i % 2);
		};
	};

	var nextTick = (function () {
		// Node.js
		if ((typeof process !== 'undefined') && process &&
				(typeof process.nextTick === 'function')) {
			return process.nextTick;
		}

		// MutationObserver=
		if ((typeof document === 'object') && document) {
			if (typeof MutationObserver === 'function') {
				return byObserver(MutationObserver);
			}
			if (typeof WebKitMutationObserver === 'function') {
				return byObserver(WebKitMutationObserver);
			}
		}

		// W3C Draft
		// http://dvcs.w3.org/hg/webperf/raw-file/tip/specs/setImmediate/Overview.html
		if (typeof setImmediate === 'function') {
			return function (cb) { setImmediate(callable(cb)); };
		}

		// Wide available standard
		if (typeof setTimeout === 'function') {
			return function (cb) { setTimeout(callable(cb), 0); };
		}

		return null;
	}());

	var __assign$1 = (commonjsGlobal && commonjsGlobal.__assign) || function () {
	    __assign$1 = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign$1.apply(this, arguments);
	};
	var __importDefault$2 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};

	var includes_1$1 = __importDefault$2(includes_1);
	/**
	 * Module Dependencies.
	 */
	// var debug = require('debug')('analytics.js:normalize');

	// var uuid = require('uuid/v4');
	// var md5 = require('spark-md5').hash;
	/**
	 * HOP.
	 */
	var has$1 = Object.prototype.hasOwnProperty;
	/**
	 * Expose `normalize`
	 */
	var normalize_1 = normalize;
	/**
	 * Toplevel properties.
	 */
	var toplevel = ['integrations', 'anonymousId', 'timestamp', 'context'];
	function normalize(msg, list) {
	    var lower = list === null || list === void 0 ? void 0 : list.map(function (s) {
	        return s.toLowerCase();
	    });
	    var opts = msg.options || {};
	    var integrations = opts.integrations || {};
	    var providers = opts.providers || {};
	    var context = opts.context || {};
	    var ret = {};
	    // debug('<-', msg);
	    // integrations.
	    Object.keys(opts).forEach(function (key) {
	        if (!integration(key))
	            return;
	        if (!has$1.call(integrations, key))
	            integrations[key] = opts[key];
	        delete opts[key];
	    });
	    // providers.
	    delete opts.providers;
	    Object.keys(providers).forEach(function (key) {
	        if (!integration(key))
	            return;
	        if (componentType(integrations[key]) === 'object')
	            return;
	        if (has$1.call(integrations, key) && typeof providers[key] === 'boolean')
	            return;
	        integrations[key] = providers[key];
	    });
	    // move all toplevel options to msg
	    // and the rest to context.
	    Object.keys(opts).forEach(function (key) {
	        if (includes_1$1.default(toplevel, key)) {
	            ret[key] = opts[key];
	        }
	        else {
	            context[key] = opts[key];
	        }
	    }, opts);
	    // generate and attach a messageId to msg
	    // msg.messageId = 'ajs-' + md5(window.JSON.stringify(msg) + uuid());
	    // cleanup
	    delete msg.options;
	    ret.integrations = integrations;
	    ret.context = context;
	    ret = __assign$1(__assign$1({}, msg), ret);
	    // debug('->', ret);
	    return ret;
	    function integration(name) {
	        return !!(includes_1$1.default(list, name) ||
	            name.toLowerCase() === 'all' ||
	            includes_1$1.default(lower, name.toLowerCase()));
	    }
	}

	var store = (function() {
		// Store.js
		var store = {},
			win = (typeof window != 'undefined' ? window : commonjsGlobal),
			doc = win.document,
			localStorageName = 'localStorage',
			scriptTag = 'script',
			storage;

		store.disabled = false;
		store.version = '1.3.20';
		store.set = function(key, value) {};
		store.get = function(key, defaultVal) {};
		store.has = function(key) { return store.get(key) !== undefined };
		store.remove = function(key) {};
		store.clear = function() {};
		store.transact = function(key, defaultVal, transactionFn) {
			if (transactionFn == null) {
				transactionFn = defaultVal;
				defaultVal = null;
			}
			if (defaultVal == null) {
				defaultVal = {};
			}
			var val = store.get(key, defaultVal);
			var ret = transactionFn(val);
			store.set(key, ret === undefined ? val : ret);
		};
		store.getAll = function() {
			var ret = {};
			store.forEach(function(key, val) {
				ret[key] = val;
			});
			return ret
		};
		store.forEach = function() {};
		store.serialize = function(value) {
			return JSON.stringify(value)
		};
		store.deserialize = function(value) {
			if (typeof value != 'string') { return undefined }
			try { return JSON.parse(value) }
			catch(e) { return value || undefined }
		};

		// Functions to encapsulate questionable FireFox 3.6.13 behavior
		// when about.config::dom.storage.enabled === false
		// See https://github.com/marcuswestin/store.js/issues#issue/13
		function isLocalStorageNameSupported() {
			try { return (localStorageName in win && win[localStorageName]) }
			catch(err) { return false }
		}

		if (isLocalStorageNameSupported()) {
			storage = win[localStorageName];
			store.set = function(key, val) {
				if (val === undefined) { return store.remove(key) }
				storage.setItem(key, store.serialize(val));
				return val
			};
			store.get = function(key, defaultVal) {
				var val = store.deserialize(storage.getItem(key));
				return (val === undefined ? defaultVal : val)
			};
			store.remove = function(key) { storage.removeItem(key); };
			store.clear = function() { storage.clear(); };
			store.forEach = function(callback) {
				for (var i=0; i<storage.length; i++) {
					var key = storage.key(i);
					callback(key, store.get(key));
				}
			};
		} else if (doc && doc.documentElement.addBehavior) {
			var storageOwner,
				storageContainer;
			// Since #userData storage applies only to specific paths, we need to
			// somehow link our data to a specific path.  We choose /favicon.ico
			// as a pretty safe option, since all browsers already make a request to
			// this URL anyway and being a 404 will not hurt us here.  We wrap an
			// iframe pointing to the favicon in an ActiveXObject(htmlfile) object
			// (see: http://msdn.microsoft.com/en-us/library/aa752574(v=VS.85).aspx)
			// since the iframe access rules appear to allow direct access and
			// manipulation of the document element, even for a 404 page.  This
			// document can be used instead of the current document (which would
			// have been limited to the current path) to perform #userData storage.
			try {
				storageContainer = new ActiveXObject('htmlfile');
				storageContainer.open();
				storageContainer.write('<'+scriptTag+'>document.w=window</'+scriptTag+'><iframe src="/favicon.ico"></iframe>');
				storageContainer.close();
				storageOwner = storageContainer.w.frames[0].document;
				storage = storageOwner.createElement('div');
			} catch(e) {
				// somehow ActiveXObject instantiation failed (perhaps some special
				// security settings or otherwse), fall back to per-path storage
				storage = doc.createElement('div');
				storageOwner = doc.body;
			}
			var withIEStorage = function(storeFunction) {
				return function() {
					var args = Array.prototype.slice.call(arguments, 0);
					args.unshift(storage);
					// See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
					// and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
					storageOwner.appendChild(storage);
					storage.addBehavior('#default#userData');
					storage.load(localStorageName);
					var result = storeFunction.apply(store, args);
					storageOwner.removeChild(storage);
					return result
				}
			};

			// In IE7, keys cannot start with a digit or contain certain chars.
			// See https://github.com/marcuswestin/store.js/issues/40
			// See https://github.com/marcuswestin/store.js/issues/83
			var forbiddenCharsRegex = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");
			var ieKeyFix = function(key) {
				return key.replace(/^d/, '___$&').replace(forbiddenCharsRegex, '___')
			};
			store.set = withIEStorage(function(storage, key, val) {
				key = ieKeyFix(key);
				if (val === undefined) { return store.remove(key) }
				storage.setAttribute(key, store.serialize(val));
				storage.save(localStorageName);
				return val
			});
			store.get = withIEStorage(function(storage, key, defaultVal) {
				key = ieKeyFix(key);
				var val = store.deserialize(storage.getAttribute(key));
				return (val === undefined ? defaultVal : val)
			});
			store.remove = withIEStorage(function(storage, key) {
				key = ieKeyFix(key);
				storage.removeAttribute(key);
				storage.save(localStorageName);
			});
			store.clear = withIEStorage(function(storage) {
				var attributes = storage.XMLDocument.documentElement.attributes;
				storage.load(localStorageName);
				for (var i=attributes.length-1; i>=0; i--) {
					storage.removeAttribute(attributes[i].name);
				}
				storage.save(localStorageName);
			});
			store.forEach = withIEStorage(function(storage, callback) {
				var attributes = storage.XMLDocument.documentElement.attributes;
				for (var i=0, attr; attr=attributes[i]; ++i) {
					callback(attr.name, store.deserialize(storage.getAttribute(attr.name)));
				}
			});
		}

		try {
			var testKey = '__storejs__';
			store.set(testKey, testKey);
			if (store.get(testKey) != testKey) { store.disabled = true; }
			store.remove(testKey);
		} catch(e) {
			store.disabled = true;
		}
		store.enabled = !store.disabled;

		return store
	}());

	var __assign$2 = (commonjsGlobal && commonjsGlobal.__assign) || function () {
	    __assign$2 = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign$2.apply(this, arguments);
	};

	/*
	 * Module dependencies.
	 */


	/**
	 * Initialize a new `Store` with `options`.
	 *
	 * @param {Object} options
	 */
	function Store(options) {
	    this.options(options);
	}
	/**
	 * Set the `options` for the store.
	 */
	Store.prototype.options = function (options) {
	    if (arguments.length === 0)
	        return this._options;
	    options = options || {};
	    options = __assign$2({ enabled: true }, options);
	    this.enabled = options.enabled && store.enabled;
	    this._options = options;
	};
	/**
	 * Set a `key` and `value` in local storage.
	 */
	Store.prototype.set = function (key, value) {
	    if (!this.enabled)
	        return false;
	    return store.set(key, value);
	};
	/**
	 * Get a value from local storage by `key`.
	 */
	Store.prototype.get = function (key) {
	    if (!this.enabled)
	        return null;
	    return store.get(key);
	};
	/**
	 * Remove a value from local storage by `key`.
	 */
	Store.prototype.remove = function (key) {
	    if (!this.enabled)
	        return false;
	    return store.remove(key);
	};
	/**
	 * Expose the store singleton.
	 */
	var store_1 = lib$3(new Store());
	/**
	 * Expose the `Store` constructor.
	 */
	var Store_1 = Store;
	store_1.Store = Store_1;

	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject_1(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	      ? (isArrayLike_1(object) && _isIndex(index, object.length))
	      : (type == 'string' && index in object)) {
	    return eq_1(object[index], value);
	  }
	  return false;
	}

	var _isIterateeCall = isIterateeCall;

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {...*} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  var length = args.length;
	  switch (length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	var _apply = apply;

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax$1 = Math.max;

	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as an array.
	 *
	 * **Note:** This method is based on the [rest parameter](https://mdn.io/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.rest(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function rest(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax$1(start === undefined ? (func.length - 1) : toInteger_1(start), 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax$1(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    switch (start) {
	      case 0: return func.call(this, array);
	      case 1: return func.call(this, args[0], array);
	      case 2: return func.call(this, args[0], args[1], array);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = array;
	    return _apply(func, this, otherArgs);
	  };
	}

	var rest_1 = rest;

	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return rest_1(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;

	    customizer = typeof customizer == 'function'
	      ? (length--, customizer)
	      : undefined;

	    if (guard && _isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}

	var _createAssigner = createAssigner;

	/** Built-in value references. */
	var Reflect = _root.Reflect;

	var _Reflect = Reflect;

	/**
	 * Converts `iterator` to an array.
	 *
	 * @private
	 * @param {Object} iterator The iterator to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function iteratorToArray(iterator) {
	  var data,
	      result = [];

	  while (!(data = iterator.next()).done) {
	    result.push(data.value);
	  }
	  return result;
	}

	var _iteratorToArray = iteratorToArray;

	/** Used for built-in method references. */
	var objectProto$c = Object.prototype;

	/** Built-in value references. */
	var enumerate = _Reflect ? _Reflect.enumerate : undefined,
	    propertyIsEnumerable$1 = objectProto$c.propertyIsEnumerable;

	/**
	 * The base implementation of `_.keysIn` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  object = object == null ? object : Object(object);

	  var result = [];
	  for (var key in object) {
	    result.push(key);
	  }
	  return result;
	}

	// Fallback for IE < 9 with es6-shim.
	if (enumerate && !propertyIsEnumerable$1.call({ 'valueOf': 1 }, 'valueOf')) {
	  baseKeysIn = function(object) {
	    return _iteratorToArray(enumerate(object));
	  };
	}

	var _baseKeysIn = baseKeysIn;

	/** Used for built-in method references. */
	var objectProto$d = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$7 = objectProto$d.hasOwnProperty;

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  var index = -1,
	      isProto = _isPrototype(object),
	      props = _baseKeysIn(object),
	      propsLength = props.length,
	      indexes = _indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;

	  while (++index < propsLength) {
	    var key = props[index];
	    if (!(skipIndexes && (key == 'length' || _isIndex(key, length))) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty$7.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	var keysIn_1 = keysIn;

	/**
	 * This method is like `_.assign` except that it iterates over own and
	 * inherited source properties.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @alias extend
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * function Foo() {
	 *   this.b = 2;
	 * }
	 *
	 * function Bar() {
	 *   this.d = 4;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 * Bar.prototype.e = 5;
	 *
	 * _.assignIn({ 'a': 1 }, new Foo, new Bar);
	 * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5 }
	 */
	var assignIn = _createAssigner(function(object, source) {
	  _copyObject(source, keysIn_1(source), object);
	});

	var assignIn_1 = assignIn;

	var __importDefault$3 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};

	/*
	 * Module Dependencies.
	 */
	var clonedeep_1$1 = __importDefault$3(cloneDeep_1);

	/**
	 * HOP.
	 */
	var has$2 = Object.prototype.hasOwnProperty;
	/**
	 * Expose `Memory`
	 */
	var memory = lib$3(new Memory());
	/**
	 * Initialize `Memory` store
	 */
	function Memory() {
	    this.store = {};
	}
	/**
	 * Set a `key` and `value`.
	 */
	Memory.prototype.set = function (key, value) {
	    this.store[key] = clonedeep_1$1.default(value);
	    return true;
	};
	/**
	 * Get a `key`.
	 */
	Memory.prototype.get = function (key) {
	    if (!has$2.call(this.store, key))
	        return;
	    return clonedeep_1$1.default(this.store[key]);
	};
	/**
	 * Remove a `key`.
	 */
	Memory.prototype.remove = function (key) {
	    delete this.store[key];
	    return true;
	};

	var __assign$3 = (commonjsGlobal && commonjsGlobal.__assign) || function () {
	    __assign$3 = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign$3.apply(this, arguments);
	};
	var __importDefault$4 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};

	var clonedeep_1$2 = __importDefault$4(cloneDeep_1);
	var assignIn_1$1 = __importDefault$4(assignIn_1);
	/*
	 * Module dependencies.
	 */

	// var debug = require('debug')('analytics:entity');



	/**
	 * Expose `Entity`
	 */
	var entity = Entity;
	/**
	 * Initialize new `Entity` with `options`.
	 */
	function Entity(options) {
	    this.options(options);
	    this.initialize();
	}
	/**
	 * Initialize picks the storage.
	 *
	 * Checks to see if cookies can be set
	 * otherwise fallsback to localStorage.
	 */
	Entity.prototype.initialize = function () {
	    cookie_1.set('ajs:cookies', true);
	    // cookies are enabled.
	    if (cookie_1.get('ajs:cookies')) {
	        cookie_1.remove('ajs:cookies');
	        this._storage = cookie_1;
	        return;
	    }
	    // localStorage is enabled.
	    if (store_1.enabled) {
	        this._storage = store_1;
	        return;
	    }
	    // fallback to memory storage.
	    // debug(
	    //   'warning using memory store both cookies and localStorage are disabled'
	    // );
	    this._storage = memory;
	};
	/**
	 * Get the storage.
	 */
	Entity.prototype.storage = function () {
	    return this._storage;
	};
	/**
	 * Get or set storage `options`.
	 */
	Entity.prototype.options = function (options) {
	    if (arguments.length === 0)
	        return this._options;
	    this._options = __assign$3(__assign$3({}, this.defaults), options);
	};
	/**
	 * Get or set the entity's `id`.
	 */
	Entity.prototype.id = function (id) {
	    switch (arguments.length) {
	        case 0:
	            return this._getId();
	        case 1:
	            return this._setId(id);
	        // No default case
	    }
	};
	/**
	 * Get the entity's id.
	 */
	Entity.prototype._getId = function () {
	    if (!this._options.persist) {
	        return this._id === undefined ? null : this._id;
	    }
	    // Check cookies.
	    var cookieId = this._getIdFromCookie();
	    if (cookieId) {
	        return cookieId;
	    }
	    // Check localStorage.
	    var lsId = this._getIdFromLocalStorage();
	    if (lsId) {
	        // Copy the id to cookies so we can read it directly from cookies next time.
	        this._setIdInCookies(lsId);
	        return lsId;
	    }
	    return null;
	};
	/**
	 * Get the entity's id from cookies.
	 */
	// FIXME `options.cookie` is an optional field, so `this._options.cookie.key`
	// can thrown an exception.
	Entity.prototype._getIdFromCookie = function () {
	    return this.storage().get(this._options.cookie.key);
	};
	/**
	 * Get the entity's id from cookies.
	 */
	Entity.prototype._getIdFromLocalStorage = function () {
	    if (!this._options.localStorageFallbackDisabled) {
	        return store_1.get(this._options.cookie.key);
	    }
	    return null;
	};
	/**
	 * Set the entity's `id`.
	 */
	Entity.prototype._setId = function (id) {
	    if (this._options.persist) {
	        this._setIdInCookies(id);
	        this._setIdInLocalStorage(id);
	    }
	    else {
	        this._id = id;
	    }
	};
	/**
	 * Set the entity's `id` in cookies.
	 */
	Entity.prototype._setIdInCookies = function (id) {
	    this.storage().set(this._options.cookie.key, id);
	};
	/**
	 * Set the entity's `id` in local storage.
	 */
	Entity.prototype._setIdInLocalStorage = function (id) {
	    if (!this._options.localStorageFallbackDisabled) {
	        store_1.set(this._options.cookie.key, id);
	    }
	};
	/**
	 * Get or set the entity's `traits`.
	 *
	 * BACKWARDS COMPATIBILITY: aliased to `properties`
	 */
	Entity.prototype.properties = Entity.prototype.traits = function (traits) {
	    switch (arguments.length) {
	        case 0:
	            return this._getTraits();
	        case 1:
	            return this._setTraits(traits);
	        // No default case
	    }
	};
	/**
	 * Get the entity's traits. Always convert ISO date strings into real dates,
	 * since they aren't parsed back from local storage.
	 */
	Entity.prototype._getTraits = function () {
	    var ret = this._options.persist
	        ? store_1.get(this._options.localStorage.key)
	        : this._traits;
	    return ret ? lib$2(clonedeep_1$2.default(ret)) : {};
	};
	/**
	 * Set the entity's `traits`.
	 */
	Entity.prototype._setTraits = function (traits) {
	    traits = traits || {};
	    if (this._options.persist) {
	        store_1.set(this._options.localStorage.key, traits);
	    }
	    else {
	        this._traits = traits;
	    }
	};
	/**
	 * Identify the entity with an `id` and `traits`. If we it's the same entity,
	 * extend the existing `traits` instead of overwriting.
	 */
	Entity.prototype.identify = function (id, traits) {
	    traits = traits || {};
	    var current = this.id();
	    if (current === null || current === id) {
	        traits = assignIn_1$1.default(this.traits(), traits);
	    }
	    if (id) {
	        this.id(id);
	    }
	    // this.debug('identify %o, %o', id, traits);
	    this.traits(traits);
	    this.save();
	};
	/**
	 * Save the entity to local storage and the cookie.
	 */
	Entity.prototype.save = function () {
	    if (!this._options.persist)
	        return false;
	    this._setId(this.id());
	    this._setTraits(this.traits());
	    return true;
	};
	/**
	 * Log the entity out, reseting `id` and `traits` to defaults.
	 */
	Entity.prototype.logout = function () {
	    this.id(null);
	    this.traits({});
	    this.storage().remove(this._options.cookie.key);
	    store_1.remove(this._options.cookie.key);
	    store_1.remove(this._options.localStorage.key);
	};
	/**
	 * Reset all entity state, logging out and returning options to defaults.
	 */
	Entity.prototype.reset = function () {
	    this.logout();
	    this.options({});
	};
	/**
	 * Load saved entity `id` or `traits` from storage.
	 */
	Entity.prototype.load = function () {
	    this.id(this.id());
	    this.traits(this.traits());
	};

	var rngBrowser = createCommonjsModule(function (module) {
	// Unique ID creation requires a high quality random # generator.  In the
	// browser this is a little complicated due to unknown quality of Math.random()
	// and inconsistent support for the `crypto` API.  We do the best we can via
	// feature-detection

	// getRandomValues needs to be invoked in a context where "this" is a Crypto
	// implementation. Also, find the complete implementation of crypto on IE11.
	var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
	                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

	if (getRandomValues) {
	  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
	  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

	  module.exports = function whatwgRNG() {
	    getRandomValues(rnds8);
	    return rnds8;
	  };
	} else {
	  // Math.random()-based (RNG)
	  //
	  // If all else fails, use Math.random().  It's fast, but is of unspecified
	  // quality.
	  var rnds = new Array(16);

	  module.exports = function mathRNG() {
	    for (var i = 0, r; i < 16; i++) {
	      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
	      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
	    }

	    return rnds;
	  };
	}
	});

	/**
	 * Convert array of 16 byte values to UUID string format of the form:
	 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
	 */
	var byteToHex = [];
	for (var i = 0; i < 256; ++i) {
	  byteToHex[i] = (i + 0x100).toString(16).substr(1);
	}

	function bytesToUuid(buf, offset) {
	  var i = offset || 0;
	  var bth = byteToHex;
	  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
	  return ([
	    bth[buf[i++]], bth[buf[i++]],
	    bth[buf[i++]], bth[buf[i++]], '-',
	    bth[buf[i++]], bth[buf[i++]], '-',
	    bth[buf[i++]], bth[buf[i++]], '-',
	    bth[buf[i++]], bth[buf[i++]], '-',
	    bth[buf[i++]], bth[buf[i++]],
	    bth[buf[i++]], bth[buf[i++]],
	    bth[buf[i++]], bth[buf[i++]]
	  ]).join('');
	}

	var bytesToUuid_1 = bytesToUuid;

	function v4(options, buf, offset) {
	  var i = buf && offset || 0;

	  if (typeof(options) == 'string') {
	    buf = options === 'binary' ? new Array(16) : null;
	    options = null;
	  }
	  options = options || {};

	  var rnds = options.random || (options.rng || rngBrowser)();

	  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
	  rnds[6] = (rnds[6] & 0x0f) | 0x40;
	  rnds[8] = (rnds[8] & 0x3f) | 0x80;

	  // Copy bytes to buffer, if provided
	  if (buf) {
	    for (var ii = 0; ii < 16; ++ii) {
	      buf[i + ii] = rnds[ii];
	    }
	  }

	  return buf || bytesToUuid_1(rnds);
	}

	var v4_1 = v4;

	// var cookie = require('./cookie');
	// var debug = require('debug')('analytics:user');

	// var rawCookie = require('@head.js/analytics.js-cookie');


	User.defaults = {
	    persist: true,
	    cookie: {
	        key: 'ajs_user_id',
	    },
	    localStorage: {
	        key: 'ajs_user_traits'
	    }
	};
	/**
	 * Initialize a new `User` with `options`.
	 */
	function User(options) {
	    this.defaults = User.defaults;
	    // this.debug = debug;
	    entity.call(this, options);
	}
	/**
	 * Inherit `Entity`
	 */
	inherits_browser(User, entity);
	/**
	 * Set/get the user id.
	 *
	 * When the user id changes, the method will reset his anonymousId to a new one.
	 *
	 * @example
	 * // didn't change because the user didn't have previous id.
	 * anonymousId = user.anonymousId();
	 * user.id('foo');
	 * assert.equal(anonymousId, user.anonymousId());
	 *
	 * // didn't change because the user id changed to null.
	 * anonymousId = user.anonymousId();
	 * user.id('foo');
	 * user.id(null);
	 * assert.equal(anonymousId, user.anonymousId());
	 *
	 * // change because the user had previous id.
	 * anonymousId = user.anonymousId();
	 * user.id('foo');
	 * user.id('baz'); // triggers change
	 * user.id('baz'); // no change
	 * assert.notEqual(anonymousId, user.anonymousId());
	 */
	User.prototype.id = function (id) {
	    var prev = this._getId();
	    var ret = entity.prototype.id.apply(this, arguments);
	    if (prev == null)
	        return ret;
	    // FIXME: We're relying on coercion here (1 == "1"), but our API treats these
	    // two values differently. Figure out what will break if we remove this and
	    // change to strict equality
	    /* eslint-disable eqeqeq */
	    if (prev != id && id)
	        this.anonymousId(null);
	    /* eslint-enable eqeqeq */
	    return ret;
	};
	/**
	 * Set / get / remove anonymousId.
	 *
	 * @param {String} anonymousId
	 * @return {String|User}
	 */
	User.prototype.anonymousId = function (anonymousId) {
	    var store = this.storage();
	    // set / remove
	    if (arguments.length) {
	        store.set('ajs_anonymous_id', anonymousId);
	        this._setAnonymousIdInLocalStorage(anonymousId);
	        return this;
	    }
	    // new
	    anonymousId = store.get('ajs_anonymous_id');
	    if (anonymousId) {
	        // value exists in cookie, copy it to localStorage
	        this._setAnonymousIdInLocalStorage(anonymousId);
	        // refresh cookie to extend expiry
	        store.set('ajs_anonymous_id', anonymousId);
	        return anonymousId;
	    }
	    if (!this._options.localStorageFallbackDisabled) {
	        // if anonymousId doesn't exist in cookies, check localStorage
	        anonymousId = store_1.get('ajs_anonymous_id');
	        if (anonymousId) {
	            // Write to cookies if available in localStorage but not cookies
	            store.set('ajs_anonymous_id', anonymousId);
	            return anonymousId;
	        }
	    }
	    // // old - it is not stringified so we use the raw cookie.
	    // anonymousId = rawCookie('_sio');
	    // if (anonymousId) {
	    //   anonymousId = anonymousId.split('----')[0];
	    //   store.set('ajs_anonymous_id', anonymousId);
	    //   this._setAnonymousIdInLocalStorage(anonymousId);
	    //   store.remove('_sio');
	    //   return anonymousId;
	    // }
	    // empty
	    anonymousId = v4_1();
	    store.set('ajs_anonymous_id', anonymousId);
	    this._setAnonymousIdInLocalStorage(anonymousId);
	    return store.get('ajs_anonymous_id');
	};
	/**
	 * Set the user's `anonymousid` in local storage.
	 */
	User.prototype._setAnonymousIdInLocalStorage = function (id) {
	    if (!this._options.localStorageFallbackDisabled) {
	        store_1.set('ajs_anonymous_id', id);
	    }
	};
	/**
	 * Remove anonymous id on logout too.
	 */
	User.prototype.logout = function () {
	    entity.prototype.logout.call(this);
	    this.anonymousId(null);
	};
	/**
	 * Load saved user `id` or `traits` from storage.
	 */
	User.prototype.load = function () {
	    // if (this._loadOldCookie()) return;
	    entity.prototype.load.call(this);
	};
	/**
	 * BACKWARDS COMPATIBILITY: Load the old user from the cookie.
	 *
	 * @api private
	 */
	// User.prototype._loadOldCookie = function(): boolean {
	//   var user = cookie.get(this._options.cookie.oldKey);
	//   if (!user) return false;
	//   this.id(user.id);
	//   this.traits(user.traits);
	//   cookie.remove(this._options.cookie.oldKey);
	//   return true;
	// };
	/**
	 * Expose the user singleton.
	 */
	var user = lib$3(new User());
	/**
	 * Expose the `User` constructor.
	 */
	var User_1 = User;
	user.User = User_1;

	var __assign$4 = (commonjsGlobal && commonjsGlobal.__assign) || function () {
	    __assign$4 = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign$4.apply(this, arguments);
	};
	var __importDefault$5 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};


	var cloneDeep_1$1 = __importDefault$5(cloneDeep_1);
	// var _analytics = global.analytics;
	/*
	 * Module dependencies.
	 */
	// var Alias = require('@lattebank/analytics.js-facade').Alias;

	var Facade = dist.Facade;
	// var Group = require('@head.js/analytics.js-facade').Group;
	var Identify = dist.Identify;
	var SourceMiddlewareChain = middleware.SourceMiddlewareChain;
	var IntegrationMiddlewareChain = middleware
	    .IntegrationMiddlewareChain;
	var DestinationMiddlewareChain = middleware
	    .DestinationMiddlewareChain;
	var Page = dist.Page;
	var Track = dist.Track;



	// var metrics = require('./metrics');
	// var debug = require('debug');
	// var group = require('./group');

	// var isMeta = require('@segment/is-meta');

	// var memory = require('./memory');


	// var on = require('component-event').bind;
	// var prevent = require('@segment/prevent-default');
	// var url = require('component-url');



	/**
	 * Initialize a new `Analytics` instance.
	 */
	function Analytics() {
	    this._options({});
	    this.Integrations = {};
	    this._sourceMiddlewares = new SourceMiddlewareChain();
	    this._integrationMiddlewares = new IntegrationMiddlewareChain();
	    this._destinationMiddlewares = {};
	    this._integrations = {};
	    this._readied = false;
	    this._timeout = 300;
	    // // XXX: BACKWARDS COMPATIBILITY
	    // this._user = user;
	    // this.log = debug('analytics.js');
	    lib$3(this);
	    // const self = this;
	    // this.on('initialize', function(_, options) {
	    //   if (options.initialPageview) self.page();
	    //   self._parseQuery(window.location.search);
	    // });
	}
	/**
	 * Mix in event emitter.
	 */
	componentEmitter(Analytics.prototype);
	/**
	 * Use a `plugin`.
	 */
	Analytics.prototype.use = function (plugin) {
	    plugin(this);
	    return this;
	};
	/**
	 * Define a new `Integration`.
	 */
	Analytics.prototype.addIntegration = function (Integration) {
	    var name = Integration.prototype.name;
	    if (!name)
	        throw new TypeError('attempted to add an invalid integration');
	    this.Integrations[name] = Integration;
	    return this;
	};
	/**
	 * Define a new `SourceMiddleware`
	 */
	Analytics.prototype.addSourceMiddleware = function (middleware) {
	    this._sourceMiddlewares.add(middleware);
	    return this;
	};
	/**
	 * Define a new `IntegrationMiddleware`
	 * @deprecated
	 */
	Analytics.prototype.addIntegrationMiddleware = function (middleware) {
	    this._integrationMiddlewares.add(middleware);
	    return this;
	};
	/**
	 * Define a new `DestinationMiddleware`
	 * Destination Middleware is chained after integration middleware
	 */
	Analytics.prototype.addDestinationMiddleware = function (integrationName, middlewares) {
	    var self = this;
	    middlewares.forEach(function (middleware) {
	        if (!self._destinationMiddlewares[integrationName]) {
	            self._destinationMiddlewares[integrationName] = new DestinationMiddlewareChain();
	        }
	        self._destinationMiddlewares[integrationName].add(middleware);
	    });
	    return self;
	};
	/**
	 * Initialize with the given integration `settings` and `options`.
	 *
	 * Aliased to `init` for convenience.
	 */
	Analytics.prototype.init = Analytics.prototype.initialize = function (settings, options) {
	    settings = settings || {};
	    options = options || {};
	    this._options(options);
	    this._readied = false;
	    // clean unknown integrations from settings
	    var self = this;
	    Object.keys(settings).forEach(function (key) {
	        var Integration = self.Integrations[key];
	        if (!Integration)
	            delete settings[key];
	    });
	    // add integrations
	    Object.keys(settings).forEach(function (key) {
	        var opts = settings[key];
	        var name = key;
	        // Don't load disabled integrations
	        if (options.integrations) {
	            if (options.integrations[name] === false ||
	                (options.integrations.All === false && !options.integrations[name])) {
	                return;
	            }
	        }
	        var Integration = self.Integrations[name];
	        var clonedOpts = {};
	        extend(true, clonedOpts, opts); // deep clone opts
	        var integration = new Integration(clonedOpts);
	        // self.log('initialize %o - %o', name, opts);
	        self.add(integration);
	    });
	    var integrations = this._integrations;
	    // load user now that options are set
	    user.load();
	    // group.load();
	    // make ready callback
	    var readyCallCount = 0;
	    var integrationCount = Object.keys(integrations).length;
	    var ready = function () {
	        readyCallCount++;
	        if (readyCallCount >= integrationCount) {
	            self._readied = true;
	            self.emit('ready');
	        }
	    };
	    // init if no integrations
	    if (integrationCount <= 0) {
	        ready();
	    }
	    // initialize integrations, passing ready
	    // create a list of any integrations that did not initialize - this will be passed with all events for replay support:
	    this.failedInitializations = [];
	    var initialPageSkipped = false;
	    Object.keys(integrations).forEach(function (key) {
	        var integration = integrations[key];
	        if (options.initialPageview &&
	            integration.options.initialPageview === false) {
	            // We've assumed one initial pageview, so make sure we don't count the first page call.
	            var page_1 = integration.page;
	            integration.page = function () {
	                if (initialPageSkipped) {
	                    return page_1.apply(this, arguments);
	                }
	                initialPageSkipped = true;
	                return;
	            };
	        }
	        integration.analytics = self;
	        integration.once('ready', ready);
	        try {
	            // metrics.increment('analytics_js.integration.invoke', {
	            //   method: 'initialize',
	            //   integration_name: integration.name
	            // });
	            integration.initialize();
	        }
	        catch (e) {
	            var integrationName = integration.name;
	            // metrics.increment('analytics_js.integration.invoke.error', {
	            //   method: 'initialize',
	            //   integration_name: integration.name
	            // });
	            self.failedInitializations.push(integrationName);
	            // self.log('Error initializing %s integration: %o', integrationName, e);
	            // Mark integration as ready to prevent blocking of anyone listening to analytics.ready()
	            integration.ready();
	        }
	    });
	    // backwards compat with angular plugin and used for init logic checks
	    // this.initialized = true;
	    this.emit('initialize', settings, options);
	    return this;
	};
	/**
	 * Set the user's `id`.
	 */
	Analytics.prototype.setAnonymousId = function (id) {
	    this.user().anonymousId(id);
	    return this;
	};
	/**
	 * Add an integration.
	 */
	Analytics.prototype.add = function (integration) {
	    this._integrations[integration.name] = integration;
	    return this;
	};
	/**
	 * Identify a user by optional `id` and `traits`.
	 *
	 * @param {string} [id=user.id()] User ID.
	 * @param {Object} [traits=null] User traits.
	 * @param {Object} [options=null]
	 * @param {Function} [fn]
	 * @return {Analytics}
	 */
	Analytics.prototype.identify = function (id, traits, options, fn) {
	    // Argument reshuffling.
	    /* eslint-disable no-unused-expressions, no-sequences */
	    if (is_1.fn(options))
	        (fn = options), (options = null);
	    if (is_1.fn(traits))
	        (fn = traits), (options = null), (traits = null);
	    if (is_1.object(id))
	        (options = traits), (traits = id), (id = user.id());
	    /* eslint-enable no-unused-expressions, no-sequences */
	    // clone traits before we manipulate so we don't do anything uncouth, and take
	    // from `user` so that we carryover anonymous traits
	    user.identify(id, traits);
	    var msg = this.normalize({
	        options: options,
	        traits: user.traits(),
	        userId: user.id()
	    });
	    // Add the initialize integrations so the server-side ones can be disabled too
	    // NOTE: We need to merge integrations, not override them with assign
	    // since it is possible to change the initialized integrations at runtime.
	    if (this.options.integrations) {
	        msg.integrations = __assign$4(__assign$4({}, this.options.integrations), msg.integrations);
	    }
	    this._invoke('identify', new Identify(msg));
	    // emit
	    this.emit('identify', id, traits, options);
	    this._callback(fn);
	    return this;
	};
	/**
	 * Return the current user.
	 *
	 * @return {Object}
	 */
	Analytics.prototype.user = function () {
	    return user;
	};
	/**
	 * Identify a group by optional `id` and `traits`. Or, if no arguments are
	 * supplied, return the current group.
	 *
	 * @param {string} [id=group.id()] Group ID.
	 * @param {Object} [traits=null] Group traits.
	 * @param {Object} [options=null]
	 * @param {Function} [fn]
	 * @return {Analytics|Object}
	 */
	// Analytics.prototype.group = function(
	//   id: string,
	//   traits?: unknown,
	//   options?: unknown,
	//   fn?: unknown
	// ): SegmentAnalytics {
	//   /* eslint-disable no-unused-expressions, no-sequences */
	//   if (!arguments.length) return group;
	//   if (is.fn(options)) (fn = options), (options = null);
	//   if (is.fn(traits)) (fn = traits), (options = null), (traits = null);
	//   if (is.object(id)) (options = traits), (traits = id), (id = group.id());
	//   /* eslint-enable no-unused-expressions, no-sequences */
	//   // grab from group again to make sure we're taking from the source
	//   group.identify(id, traits);
	//   var msg = this.normalize({
	//     options: options,
	//     traits: group.traits(),
	//     groupId: group.id()
	//   });
	//   // Add the initialize integrations so the server-side ones can be disabled too
	//   // NOTE: We need to merge integrations, not override them with assign
	//   // since it is possible to change the initialized integrations at runtime.
	//   if (this.options.integrations) {
	//     msg.integrations = {
	//       ...this.options.integrations,
	//       ...msg.integrations
	//     }
	//   }
	//   this._invoke('group', new Group(msg));
	//   this.emit('group', id, traits, options);
	//   this._callback(fn);
	//   return this;
	// };
	/**
	 * Track an `event` that a user has triggered with optional `properties`.
	 *
	 * @param {string} event
	 * @param {Object} [properties=null]
	 * @param {Object} [options=null]
	 * @param {Function} [fn]
	 * @return {Analytics}
	 */
	Analytics.prototype.track = function (event, properties, options, fn) {
	    // Argument reshuffling.
	    /* eslint-disable no-unused-expressions, no-sequences */
	    if (is_1.fn(options))
	        (fn = options), (options = null);
	    if (is_1.fn(properties))
	        (fn = properties), (options = null), (properties = null);
	    /* eslint-enable no-unused-expressions, no-sequences */
	    // figure out if the event is archived.
	    var plan = this.options.plan || {};
	    var events = plan.track || {};
	    var planIntegrationOptions = {};
	    // normalize
	    var msg = this.normalize({
	        properties: properties,
	        options: options,
	        event: event
	    });
	    // plan.
	    plan = events[event];
	    if (plan) {
	        // this.log('plan %o - %o', event, plan);
	        if (plan.enabled === false) {
	            // Disabled events should always be sent to Segment.
	            planIntegrationOptions = { All: false, 'Segment.io': true };
	        }
	        else {
	            planIntegrationOptions = plan.integrations || {};
	        }
	    }
	    else {
	        var defaultPlan = events.__default || { enabled: true };
	        if (!defaultPlan.enabled) {
	            // Disabled events should always be sent to Segment.
	            planIntegrationOptions = { All: false, 'Segment.io': true };
	        }
	    }
	    // Add the initialize integrations so the server-side ones can be disabled too
	    // NOTE: We need to merge integrations, not override them with assign
	    // since it is possible to change the initialized integrations at runtime.
	    msg.integrations = __assign$4(__assign$4({}, this._mergeInitializeAndPlanIntegrations(planIntegrationOptions)), msg.integrations);
	    this._invoke('track', new Track(msg));
	    this.emit('track', event, properties, options);
	    this._callback(fn);
	    return this;
	};
	/**
	 * Helper method to track an outbound link that would normally navigate away
	 * from the page before the analytics calls were sent.
	 *
	 * BACKWARDS COMPATIBILITY: aliased to `trackClick`.
	 *
	 * @param {Element|Array} links
	 * @param {string|Function} event
	 * @param {Object|Function} properties (optional)
	 * @return {Analytics}
	 */
	// Analytics.prototype.trackClick = Analytics.prototype.trackLink = function(
	//   links: Element | Array<Element> | JQuery,
	//   event: any,
	//   properties?: any
	// ): SegmentAnalytics {
	//   let elements: Array<Element> = []
	//   if (!links) return this;
	//   // always arrays, handles jquery
	//   if (links instanceof Element) {
	//     elements = [links]
	//   } else if ("toArray" in links) {
	//     elements = links.toArray()
	//   } else {
	//     elements = links as Array<Element>
	//   }
	//   elements.forEach(el => {
	//     if (type(el) !== 'element') {
	//       throw new TypeError('Must pass HTMLElement to `analytics.trackLink`.');
	//     }
	//     on(el, 'click', (e) => {
	//       const ev = is.fn(event) ? event(el) : event;
	//       const props = is.fn(properties) ? properties(el) : properties;
	//       const href =
	//         el.getAttribute('href') ||
	//         el.getAttributeNS('http://www.w3.org/1999/xlink', 'href') ||
	//         el.getAttribute('xlink:href');
	//       this.track(ev, props);
	//       // @ts-ignore
	//       if (href && el.target !== '_blank' && !isMeta(e)) {
	//         prevent(e);
	//         this._callback(function() {
	//           window.location.href = href;
	//         });
	//       }
	//     });
	//   });
	//   return this;
	// };
	/**
	 * Helper method to track an outbound form that would normally navigate away
	 * from the page before the analytics calls were sent.
	 *
	 * BACKWARDS COMPATIBILITY: aliased to `trackSubmit`.
	 *
	 * @param {Element|Array} forms
	 * @param {string|Function} event
	 * @param {Object|Function} properties (optional)
	 * @return {Analytics}
	 */
	// Analytics.prototype.trackSubmit = Analytics.prototype.trackForm = function(
	//   forms: Element | Array<unknown>,
	//   event: any,
	//   properties?: any
	// ): SegmentAnalytics {
	//   if (!forms) return this;
	//   // always arrays, handles jquery
	//   if (type(forms) === 'element') forms = [forms];
	//   const elements = forms as Array<unknown>
	//   elements.forEach((el: { submit: () => void }) => {
	//     if (type(el) !== 'element')
	//       throw new TypeError('Must pass HTMLElement to `analytics.trackForm`.');
	//     const handler = (e) => {
	//       prevent(e);
	//       const ev = is.fn(event) ? event(el) : event;
	//       const props = is.fn(properties) ? properties(el) : properties;
	//       this.track(ev, props);
	//       self._callback(function() {
	//         el.submit();
	//       });
	//     }
	//     // Support the events happening through jQuery or Zepto instead of through
	//     // the normal DOM API, because `el.submit` doesn't bubble up events...
	//     var $ = window.jQuery || window.Zepto;
	//     if ($) {
	//       $(el).submit(handler);
	//     } else {
	//       on(el, 'submit', handler);
	//     }
	//   }, forms);
	//   return this;
	// };
	/**
	 * Trigger a pageview, labeling the current page with an optional `category`,
	 * `name` and `properties`.
	 *
	 * @param {string} [category]
	 * @param {string} [name]
	 * @param {Object|string} [properties] (or path)
	 * @param {Object} [options]
	 * @param {Function} [fn]
	 * @return {Analytics}
	 */
	Analytics.prototype.page = function (category, name, properties, options, fn) {
	    // Argument reshuffling.
	    /* eslint-disable no-unused-expressions, no-sequences */
	    if (is_1.fn(options))
	        (fn = options), (options = null);
	    if (is_1.fn(properties))
	        (fn = properties), (options = properties = null);
	    if (is_1.fn(name))
	        (fn = name), (options = properties = name = null);
	    if (componentType(category) === 'object')
	        (options = name), (properties = category), (name = category = null);
	    if (componentType(name) === 'object')
	        (options = properties), (properties = name), (name = null);
	    if (componentType(category) === 'string' && componentType(name) !== 'string')
	        (name = category), (category = null);
	    /* eslint-enable no-unused-expressions, no-sequences */
	    properties = cloneDeep_1$1.default(properties) || {};
	    if (name)
	        properties.name = name;
	    if (category)
	        properties.category = category;
	    // Ensure properties has baseline spec properties.
	    // TODO: Eventually move these entirely to `options.context.page`
	    // FIXME: This is purposely not overriding `defs`. There was a bug in the logic implemented by `@ndhoule/defaults`.
	    //        This bug made it so we only would overwrite values in `defs` that were set to `undefined`.
	    //        In some cases, though, pageDefaults  will return defaults with values set to "" (such as `window.location.search` defaulting to "").
	    //        The decision to not fix this bus was made to preserve backwards compatibility.
	    var defs = pageDefaults_1.pageDefaults();
	    properties = __assign$4(__assign$4({}, properties), defs);
	    // Mirror user overrides to `options.context.page` (but exclude custom properties)
	    // (Any page defaults get applied in `this.normalize` for consistency.)
	    // Weird, yeah--moving special props to `context.page` will fix this in the long term.
	    // const overrides = pick(properties, Object.keys(defs));
	    // if (!is.empty(overrides)) {
	    //   options = options || {};
	    //   options.context = options.context || {};
	    //   options.context.page = overrides;
	    // }
	    var msg = this.normalize({
	        properties: properties,
	        category: category,
	        options: options,
	        name: name
	    });
	    // Add the initialize integrations so the server-side ones can be disabled too
	    // NOTE: We need to merge integrations, not override them with assign
	    // since it is possible to change the initialized integrations at runtime.
	    if (this.options.integrations) {
	        msg.integrations = __assign$4(__assign$4({}, this.options.integrations), msg.integrations);
	    }
	    this._invoke('page', new Page(msg));
	    this.emit('page', category, name, properties, options);
	    this._callback(fn);
	    return this;
	};
	/**
	 * FIXME: BACKWARDS COMPATIBILITY: convert an old `pageview` to a `page` call.
	 * @api private
	 */
	// Analytics.prototype.pageview = function(url: string): SegmentAnalytics {
	//   const properties: { path?: string } = {};
	//   if (url) properties.path = url;
	//   this.page(properties);
	//   return this;
	// };
	/**
	 * Merge two previously unassociated user identities.
	 *
	 * @param {string} to
	 * @param {string} from (optional)
	 * @param {Object} options (optional)
	 * @param {Function} fn (optional)
	 * @return {Analytics}
	 */
	// Analytics.prototype.alias = function(
	//   to: string,
	//   from?: string,
	//   options?: unknown,
	//   fn?: unknown
	// ): SegmentAnalytics {
	//   // Argument reshuffling.
	//   /* eslint-disable no-unused-expressions, no-sequences */
	//   if (is.fn(options)) (fn = options), (options = null);
	//   if (is.fn(from)) (fn = from), (options = null), (from = null);
	//   if (is.object(from)) (options = from), (from = null);
	//   /* eslint-enable no-unused-expressions, no-sequences */
	//   var msg = this.normalize({
	//     options: options,
	//     previousId: from,
	//     userId: to
	//   });
	//   // Add the initialize integrations so the server-side ones can be disabled too
	//   // NOTE: We need to merge integrations, not override them with assign
	//   // since it is possible to change the initialized integrations at runtime.
	//   if (this.options.integrations) {
	//     msg.integrations = {
	//       ...this.options.integrations,
	//       ...msg.integrations
	//     }
	//   }
	//   this._invoke('alias', new Alias(msg));
	//   this.emit('alias', to, from, options);
	//   this._callback(fn);
	//   return this;
	// };
	/**
	 * Register a `fn` to be fired when all the analytics services are ready.
	 */
	Analytics.prototype.ready = function (fn) {
	    if (is_1.fn(fn)) {
	        if (this._readied) {
	            nextTick(fn);
	        }
	        else {
	            this.once('ready', fn);
	        }
	    }
	    return this;
	};
	/**
	 * Set the `timeout` (in milliseconds) used for callbacks.
	 */
	// Analytics.prototype.timeout = function(timeout: number) {
	//   this._timeout = timeout;
	// };
	/**
	 * Enable or disable debug.
	 */
	// Analytics.prototype.debug = function(str: string | boolean) {
	//   if (!arguments.length || str) {
	//     debug.enable('analytics:' + (str || '*'));
	//   } else {
	//     debug.disable();
	//   }
	// };
	/**
	 * Apply options.
	 * @api private
	 */
	Analytics.prototype._options = function (options) {
	    options = options || {};
	    this.options = options;
	    cookie_1.options(options.cookie);
	    // metrics.options(options.metrics);
	    store_1.options(options.localStorage);
	    user.options(options.user);
	    // group.options(options.group);
	    return this;
	};
	/**
	 * Callback a `fn` after our defined timeout period.
	 * @api private
	 */
	Analytics.prototype._callback = function (fn) {
	    if (is_1.fn(fn)) {
	        this._timeout ? setTimeout(fn, this._timeout) : nextTick(fn);
	    }
	    return this;
	};
	/**
	 * Call `method` with `facade` on all enabled integrations.
	 *
	 * @param {string} method
	 * @param {Facade} facade
	 * @return {Analytics}
	 * @api private
	 */
	Analytics.prototype._invoke = function (method, facade) {
	    var self = this;
	    try {
	        this._sourceMiddlewares.applyMiddlewares(extend(true, new Facade({}), facade), this._integrations, function (result) {
	            // A nullified payload should not be sent.
	            if (result === null) {
	                // self.log(
	                //   'Payload with method "%s" was null and dropped by source a middleware.',
	                //   method
	                // );
	                return;
	            }
	            // Check if the payload is still a Facade. If not, convert it to one.
	            if (!(result instanceof Facade)) {
	                result = new Facade(result);
	            }
	            self.emit('invoke', result);
	            // metrics.increment('analytics_js.invoke', {
	            //   method: method
	            // });
	            applyIntegrationMiddlewares(result);
	        });
	    }
	    catch (e) {
	        // metrics.increment('analytics_js.invoke.error', {
	        //   method: method
	        // });
	        // self.log(
	        //   'Error invoking .%s method of %s integration: %o',
	        //   method,
	        //   name,
	        //   e
	        // );
	    }
	    return this;
	    function applyIntegrationMiddlewares(facade) {
	        var failedInitializations = self.failedInitializations || [];
	        Object.keys(self._integrations).forEach(function (key) {
	            var integration = self._integrations[key];
	            var name = integration.name;
	            var facadeCopy = extend(true, new Facade({}), facade);
	            if (!facadeCopy.enabled(name))
	                return;
	            // Check if an integration failed to initialize.
	            // If so, do not process the message as the integration is in an unstable state.
	            if (failedInitializations.indexOf(name) >= 0) ;
	            else {
	                try {
	                    // Apply any integration middlewares that exist, then invoke the integration with the result.
	                    self._integrationMiddlewares.applyMiddlewares(facadeCopy, integration.name, function (result) {
	                        // A nullified payload should not be sent to an integration.
	                        if (result === null) {
	                            // self.log(
	                            //   'Payload to integration "%s" was null and dropped by a middleware.',
	                            //   name
	                            // );
	                            return;
	                        }
	                        // Check if the payload is still a Facade. If not, convert it to one.
	                        if (!(result instanceof Facade)) {
	                            result = new Facade(result);
	                        }
	                        // apply destination middlewares
	                        // Apply any integration middlewares that exist, then invoke the integration with the result.
	                        if (self._destinationMiddlewares[integration.name]) {
	                            self._destinationMiddlewares[integration.name].applyMiddlewares(facadeCopy, integration.name, function (result) {
	                                // A nullified payload should not be sent to an integration.
	                                if (result === null) {
	                                    // self.log(
	                                    //   'Payload to destination "%s" was null and dropped by a middleware.',
	                                    //   name
	                                    // );
	                                    return;
	                                }
	                                // Check if the payload is still a Facade. If not, convert it to one.
	                                if (!(result instanceof Facade)) {
	                                    result = new Facade(result);
	                                }
	                                // metrics.increment('analytics_js.integration.invoke', {
	                                //   method: method,
	                                //   integration_name: integration.name
	                                // });
	                                integration.invoke.call(integration, method, result);
	                            });
	                        }
	                        else {
	                            // metrics.increment('analytics_js.integration.invoke', {
	                            //   method: method,
	                            //   integration_name: integration.name
	                            // });
	                            integration.invoke.call(integration, method, result);
	                        }
	                    });
	                }
	                catch (e) {
	                    // metrics.increment('analytics_js.integration.invoke.error', {
	                    //   method: method,
	                    //   integration_name: integration.name
	                    // });
	                    // self.log(
	                    //   'Error invoking .%s method of %s integration: %o',
	                    //   method,
	                    //   name,
	                    //   e
	                    // );
	                }
	            }
	        });
	    }
	};
	// /**
	//  * Push `args`.
	//  *
	//  * @param {Array} args
	//  * @api private
	//  */
	// Analytics.prototype.push = function(args: any[]) {
	//   var method = args.shift();
	//   if (!this[method]) return;
	//   this[method].apply(this, args);
	// };
	// /**
	//  * Reset group and user traits and id's.
	//  *
	//  * @api public
	//  */
	// Analytics.prototype.reset = function() {
	//   this.user().logout();
	//   this.group().logout();
	// };
	// /**
	//  * Parse the query string for callable methods.
	//  *
	//  * @api private
	//  */
	// interface QueryStringParams {
	//   [key: string]: string | null;
	// }
	// Analytics.prototype._parseQuery = function(query: string): SegmentAnalytics {
	//   // Parse querystring to an object
	//   const parsed = url.parse(query);
	//
	//   const q = parsed.query.split('&').reduce((acc, str) => {
	//     const [k, v] = str.split('=');
	//     acc[k] = decodeURI(v).replace('+', ' ');
	//     return acc;
	//   }, {});
	//
	//   // Create traits and properties objects, populate from querysting params
	//   var traits = pickPrefix('ajs_trait_', q);
	//   var props = pickPrefix('ajs_prop_', q);
	//   // Trigger based on callable parameters in the URL
	//   if (q.ajs_uid) this.identify(q.ajs_uid, traits);
	//   if (q.ajs_event) this.track(q.ajs_event, props);
	//   if (q.ajs_aid) user.anonymousId(q.ajs_aid);
	//   return this;
	//
	//   /**
	//    * Create a shallow copy of an input object containing only the properties
	//    * whose keys are specified by a prefix, stripped of that prefix
	//    *
	//    * @return {Object}
	//    * @api private
	//    */
	//
	//   function pickPrefix(prefix: string, object: object) {
	//     var length = prefix.length;
	//     var sub;
	//     return Object.keys(object).reduce(function(acc, key) {
	//       if (key.substr(0, length) === prefix) {
	//         sub = key.substr(length);
	//         acc[sub] = object[key];
	//       }
	//       return acc;
	//     }, {});
	//   }
	// };
	/**
	 * Normalize the given `msg`.
	 */
	Analytics.prototype.normalize = function (msg) {
	    msg = normalize_1(msg, Object.keys(this._integrations));
	    if (msg.anonymousId)
	        user.anonymousId(msg.anonymousId);
	    msg.anonymousId = user.anonymousId();
	    // Ensure all outgoing requests include page data in their contexts.
	    msg.context.page = __assign$4(__assign$4({}, pageDefaults_1.pageDefaults()), msg.context.page);
	    return msg;
	};
	/**
	 * Merges the tracking plan and initialization integration options.
	 *
	 * @param  {Object} planIntegrations Tracking plan integrations.
	 * @return {Object}                  The merged integrations.
	 */
	Analytics.prototype._mergeInitializeAndPlanIntegrations = function (planIntegrations) {
	    // Do nothing if there are no initialization integrations
	    if (!this.options.integrations) {
	        return planIntegrations;
	    }
	    // Clone the initialization integrations
	    var integrations = extend({}, this.options.integrations);
	    var integrationName;
	    // Allow the tracking plan to disable integrations that were explicitly
	    // enabled on initialization
	    if (planIntegrations.All === false) {
	        integrations = { All: false };
	    }
	    for (integrationName in planIntegrations) {
	        if (planIntegrations.hasOwnProperty(integrationName)) {
	            // Don't allow the tracking plan to re-enable disabled integrations
	            if (this.options.integrations[integrationName] !== false) {
	                integrations[integrationName] = planIntegrations[integrationName];
	            }
	        }
	    }
	    return integrations;
	};
	/**
	 * No conflict support.
	 */
	// Analytics.prototype.noConflict = function(): SegmentAnalytics {
	//   window.analytics = _analytics;
	//   return this;
	// };
	/*
	 * Exports.
	 */
	var analytics = Analytics;
	// module.exports.cookie = cookie;
	// module.exports.memory = memory;
	// module.exports.store = store;
	// module.exports.metrics = metrics;
	var uuid = v4_1;
	analytics.uuid = uuid;

	var max = Math.max;

	/**
	 * Produce a new array composed of all but the first `n` elements of an input `collection`.
	 *
	 * @name drop
	 * @api public
	 * @param {number} count The number of elements to drop.
	 * @param {Array} collection The collection to iterate over.
	 * @return {Array} A new array containing all but the first element from `collection`.
	 * @example
	 * drop(0, [1, 2, 3]); // => [1, 2, 3]
	 * drop(1, [1, 2, 3]); // => [2, 3]
	 * drop(2, [1, 2, 3]); // => [3]
	 * drop(3, [1, 2, 3]); // => []
	 * drop(4, [1, 2, 3]); // => []
	 */
	var drop = function drop(count, collection) {
	  var length = collection ? collection.length : 0;

	  if (!length) {
	    return [];
	  }

	  // Preallocating an array *significantly* boosts performance when dealing with
	  // `arguments` objects on v8. For a summary, see:
	  // https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
	  var toDrop = max(Number(count) || 0, 0);
	  var resultsLength = max(length - toDrop, 0);
	  var results = new Array(resultsLength);

	  for (var i = 0; i < resultsLength; i += 1) {
	    results[i] = collection[i + toDrop];
	  }

	  return results;
	};

	/*
	 * Exports.
	 */

	var drop_1 = drop;

	var max$1 = Math.max;

	/**
	 * Produce a new array by passing each value in the input `collection` through a transformative
	 * `iterator` function. The `iterator` function is passed three arguments:
	 * `(value, index, collection)`.
	 *
	 * @name rest
	 * @api public
	 * @param {Array} collection The collection to iterate over.
	 * @return {Array} A new array containing all but the first element from `collection`.
	 * @example
	 * rest([1, 2, 3]); // => [2, 3]
	 */
	var rest$1 = function rest(collection) {
	  if (collection == null || !collection.length) {
	    return [];
	  }

	  // Preallocating an array *significantly* boosts performance when dealing with
	  // `arguments` objects on v8. For a summary, see:
	  // https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
	  var results = new Array(max$1(collection.length - 2, 0));

	  for (var i = 1; i < collection.length; i += 1) {
	    results[i - 1] = collection[i];
	  }

	  return results;
	};

	/*
	 * Exports.
	 */

	var rest_1$1 = rest$1;

	/*
	 * Module dependencies.
	 */




	var has$3 = Object.prototype.hasOwnProperty;
	var objToString = Object.prototype.toString;

	/**
	 * Returns `true` if a value is an object, otherwise `false`.
	 *
	 * @name isObject
	 * @api private
	 * @param {*} val The value to test.
	 * @return {boolean}
	 */
	// TODO: Move to a library
	var isObject$1 = function isObject(value) {
	  return Boolean(value) && typeof value === 'object';
	};

	/**
	 * Returns `true` if a value is a plain object, otherwise `false`.
	 *
	 * @name isPlainObject
	 * @api private
	 * @param {*} val The value to test.
	 * @return {boolean}
	 */
	// TODO: Move to a library
	var isPlainObject$1 = function isPlainObject(value) {
	  return Boolean(value) && objToString.call(value) === '[object Object]';
	};

	/**
	 * Assigns a key-value pair to a target object when the value assigned is owned,
	 * and where target[key] is undefined.
	 *
	 * @name shallowCombiner
	 * @api private
	 * @param {Object} target
	 * @param {Object} source
	 * @param {*} value
	 * @param {string} key
	 */
	var shallowCombiner = function shallowCombiner(target, source, value, key) {
	  if (has$3.call(source, key) && target[key] === undefined) {
	    target[key] = value;
	  }
	  return source;
	};

	/**
	 * Assigns a key-value pair to a target object when the value assigned is owned,
	 * and where target[key] is undefined; also merges objects recursively.
	 *
	 * @name deepCombiner
	 * @api private
	 * @param {Object} target
	 * @param {Object} source
	 * @param {*} value
	 * @param {string} key
	 * @return {Object}
	 */
	var deepCombiner = function(target, source, value, key) {
	  if (has$3.call(source, key)) {
	    if (isPlainObject$1(target[key]) && isPlainObject$1(value)) {
	        target[key] = defaultsDeep(target[key], value);
	    } else if (target[key] === undefined) {
	        target[key] = value;
	    }
	  }

	  return source;
	};

	/**
	 * TODO: Document
	 *
	 * @name defaultsWith
	 * @api private
	 * @param {Function} combiner
	 * @param {Object} target
	 * @param {...Object} sources
	 * @return {Object} Return the input `target`.
	 */
	var defaultsWith = function(combiner, target /*, ...sources */) {
	  if (!isObject$1(target)) {
	    return target;
	  }

	  combiner = combiner || shallowCombiner;
	  var sources = drop_1(2, arguments);

	  for (var i = 0; i < sources.length; i += 1) {
	    for (var key in sources[i]) {
	      combiner(target, sources[i], sources[i][key], key);
	    }
	  }

	  return target;
	};

	/**
	 * Copies owned, enumerable properties from a source object(s) to a target
	 * object when the value of that property on the source object is `undefined`.
	 * Recurses on objects.
	 *
	 * @name defaultsDeep
	 * @api public
	 * @param {Object} target
	 * @param {...Object} sources
	 * @return {Object} The input `target`.
	 */
	var defaultsDeep = function defaultsDeep(target /*, sources */) {
	  // TODO: Replace with `partial` call?
	  return defaultsWith.apply(null, [deepCombiner, target].concat(rest_1$1(arguments)));
	};

	/**
	 * Copies owned, enumerable properties from a source object(s) to a target
	 * object when the value of that property on the source object is `undefined`.
	 *
	 * @name defaults
	 * @api public
	 * @param {Object} target
	 * @param {...Object} sources
	 * @return {Object}
	 * @example
	 * var a = { a: 1 };
	 * var b = { a: 2, b: 2 };
	 *
	 * defaults(a, b);
	 * console.log(a); //=> { a: 1, b: 2 }
	 */
	var defaults = function(target /*, ...sources */) {
	  // TODO: Replace with `partial` call?
	  return defaultsWith.apply(null, [null, target].concat(rest_1$1(arguments)));
	};

	/*
	 * Exports.
	 */

	var defaults_1 = defaults;
	var deep = defaultsDeep;
	defaults_1.deep = deep;

	/*
	 * Module dependencies.
	 */



	var objToString$1 = Object.prototype.toString;

	/**
	 * Tests if a value is a number.
	 *
	 * @name isNumber
	 * @api private
	 * @param {*} val The value to test.
	 * @return {boolean} Returns `true` if `val` is a number, otherwise `false`.
	 */
	// TODO: Move to library
	var isNumber$1 = function isNumber(val) {
	  var type = typeof val;
	  return type === 'number' || (type === 'object' && objToString$1.call(val) === '[object Number]');
	};

	/**
	 * Tests if a value is an array.
	 *
	 * @name isArray
	 * @api private
	 * @param {*} val The value to test.
	 * @return {boolean} Returns `true` if the value is an array, otherwise `false`.
	 */
	// TODO: Move to library
	var isArray$2 = typeof Array.isArray === 'function' ? Array.isArray : function isArray(val) {
	  return objToString$1.call(val) === '[object Array]';
	};

	/**
	 * Tests if a value is array-like. Array-like means the value is not a function and has a numeric
	 * `.length` property.
	 *
	 * @name isArrayLike
	 * @api private
	 * @param {*} val
	 * @return {boolean}
	 */
	// TODO: Move to library
	var isArrayLike$2 = function isArrayLike(val) {
	  return val != null && (isArray$2(val) || (val !== 'function' && isNumber$1(val.length)));
	};

	/**
	 * Internal implementation of `each`. Works on arrays and array-like data structures.
	 *
	 * @name arrayEach
	 * @api private
	 * @param {Function(value, key, collection)} iterator The function to invoke per iteration.
	 * @param {Array} array The array(-like) structure to iterate over.
	 * @return {undefined}
	 */
	var arrayEach$1 = function arrayEach(iterator, array) {
	  for (var i = 0; i < array.length; i += 1) {
	    // Break iteration early if `iterator` returns `false`
	    if (iterator(array[i], i, array) === false) {
	      break;
	    }
	  }
	};

	/**
	 * Internal implementation of `each`. Works on objects.
	 *
	 * @name baseEach
	 * @api private
	 * @param {Function(value, key, collection)} iterator The function to invoke per iteration.
	 * @param {Object} object The object to iterate over.
	 * @return {undefined}
	 */
	var baseEach = function baseEach(iterator, object) {
	  var ks = keys_1$1(object);

	  for (var i = 0; i < ks.length; i += 1) {
	    // Break iteration early if `iterator` returns `false`
	    if (iterator(object[ks[i]], ks[i], object) === false) {
	      break;
	    }
	  }
	};

	/**
	 * Iterate over an input collection, invoking an `iterator` function for each element in the
	 * collection and passing to it three arguments: `(value, index, collection)`. The `iterator`
	 * function can end iteration early by returning `false`.
	 *
	 * @name each
	 * @api public
	 * @param {Function(value, key, collection)} iterator The function to invoke per iteration.
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @return {undefined} Because `each` is run only for side effects, always returns `undefined`.
	 * @example
	 * var log = console.log.bind(console);
	 *
	 * each(log, ['a', 'b', 'c']);
	 * //-> 'a', 0, ['a', 'b', 'c']
	 * //-> 'b', 1, ['a', 'b', 'c']
	 * //-> 'c', 2, ['a', 'b', 'c']
	 * //=> undefined
	 *
	 * each(log, 'tim');
	 * //-> 't', 2, 'tim'
	 * //-> 'i', 1, 'tim'
	 * //-> 'm', 0, 'tim'
	 * //=> undefined
	 *
	 * // Note: Iteration order not guaranteed across environments
	 * each(log, { name: 'tim', occupation: 'enchanter' });
	 * //-> 'tim', 'name', { name: 'tim', occupation: 'enchanter' }
	 * //-> 'enchanter', 'occupation', { name: 'tim', occupation: 'enchanter' }
	 * //=> undefined
	 */
	var each = function each(iterator, collection) {
	  return (isArrayLike$2(collection) ? arrayEach$1 : baseEach).call(this, iterator, collection);
	};

	/*
	 * Exports.
	 */

	var each_1 = each;

	/*
	 * Module dependencies.
	 */



	/**
	 * Check if a predicate function returns `true` for all values in a `collection`.
	 * Checks owned, enumerable values and exits early when `predicate` returns
	 * `false`.
	 *
	 * @name every
	 * @param {Function} predicate The function used to test values.
	 * @param {Array|Object|string} collection The collection to search.
	 * @return {boolean} True if all values passes the predicate test, otherwise false.
	 * @example
	 * var isEven = function(num) { return num % 2 === 0; };
	 *
	 * every(isEven, []); // => true
	 * every(isEven, [1, 2]); // => false
	 * every(isEven, [2, 4, 6]); // => true
	 */
	var every = function every(predicate, collection) {
	  if (typeof predicate !== 'function') {
	    throw new TypeError('`predicate` must be a function but was a ' + typeof predicate);
	  }

	  var result = true;

	  each_1(function(val, key, collection) {
	    result = !!predicate(val, key, collection);

	    // Exit early
	    if (!result) {
	      return false;
	    }
	  }, collection);

	  return result;
	};

	/*
	 * Exports.
	 */

	var every_1 = every;

	// Stringifier
	var toString$1 = commonjsGlobal.JSON && typeof JSON.stringify === 'function' ? JSON.stringify : String;

	/**
	 * Format the given `str`.
	 *
	 * @param {string} str
	 * @param {...*} [args]
	 * @return {string}
	 */
	function fmt(str) {
	  var args = Array.prototype.slice.call(arguments, 1);
	  var j = 0;

	  return str.replace(/%([a-z])/gi, function(match, f) {
	    return fmt[f] ? fmt[f](args[j++]) : match + f;
	  });
	}

	// Formatters
	fmt.o = toString$1;
	fmt.s = String;
	fmt.d = parseInt;

	/*
	 * Exports.
	 */

	var lib$6 = fmt;

	/*
	 * Module dependencies.
	 */



	/**
	 * Reduces all the values in a collection down into a single value. Does so by iterating through the
	 * collection from left to right, repeatedly calling an `iterator` function and passing to it four
	 * arguments: `(accumulator, value, index, collection)`.
	 *
	 * Returns the final return value of the `iterator` function.
	 *
	 * @name foldl
	 * @api public
	 * @param {Function} iterator The function to invoke per iteration.
	 * @param {*} accumulator The initial accumulator value, passed to the first invocation of `iterator`.
	 * @param {Array|Object} collection The collection to iterate over.
	 * @return {*} The return value of the final call to `iterator`.
	 * @example
	 * foldl(function(total, n) {
	 *   return total + n;
	 * }, 0, [1, 2, 3]);
	 * //=> 6
	 *
	 * var phonebook = { bob: '555-111-2345', tim: '655-222-6789', sheila: '655-333-1298' };
	 *
	 * foldl(function(results, phoneNumber) {
	 *  if (phoneNumber[0] === '6') {
	 *    return results.concat(phoneNumber);
	 *  }
	 *  return results;
	 * }, [], phonebook);
	 * // => ['655-222-6789', '655-333-1298']
	 */
	var foldl = function foldl(iterator, accumulator, collection) {
	  if (typeof iterator !== 'function') {
	    throw new TypeError('Expected a function but received a ' + typeof iterator);
	  }

	  each_1(function(val, i, collection) {
	    accumulator = iterator(accumulator, val, i, collection);
	  }, collection);

	  return accumulator;
	};

	/*
	 * Exports.
	 */

	var foldl_1 = foldl;

	// https://github.com/thirdpartyjs/thirdpartyjs-code/blob/master/examples/templates/02/loading-files/index.html

	/**
	 * Invoke `fn(err)` when the given `el` script loads.
	 *
	 * @param {Element} el
	 * @param {Function} fn
	 * @api public
	 */

	var scriptOnload = function(el, fn){
	  return el.addEventListener
	    ? add(el, fn)
	    : attach(el, fn);
	};

	/**
	 * Add event listener to `el`, `fn()`.
	 *
	 * @param {Element} el
	 * @param {Function} fn
	 * @api private
	 */

	function add(el, fn){
	  el.addEventListener('load', function(_, e){ fn(null, e); }, false);
	  el.addEventListener('error', function(e){
	    var err = new Error('script error "' + el.src + '"');
	    err.event = e;
	    fn(err);
	  }, false);
	}

	/**
	 * Attach event.
	 *
	 * @param {Element} el
	 * @param {Function} fn
	 * @api private
	 */

	function attach(el, fn){
	  el.attachEvent('onreadystatechange', function(e){
	    if (!/complete|loaded/.test(el.readyState)) return;
	    fn(null, e);
	  });
	  el.attachEvent('onerror', function(e){
	    var err = new Error('failed to load the script "' + el.src + '"');
	    err.event = e || window.event;
	    fn(err);
	  });
	}

	/**
	 * Module dependencies.
	 */

	/**
	 * Expose `loadScript`.
	 *
	 * @param {Object} options
	 * @param {Function} fn
	 * @api public
	 */

	var loadIframe = function loadIframe(options, fn){
	  if (!options) throw new Error('Cant load nothing...');

	  // Allow for the simplest case, just passing a `src` string.
	  if (is_1.string(options)) options = { src : options };

	  var https = document.location.protocol === 'https:' ||
	              document.location.protocol === 'chrome-extension:';

	  // If you use protocol relative URLs, third-party scripts like Google
	  // Analytics break when testing with `file:` so this fixes that.
	  if (options.src && options.src.indexOf('//') === 0) {
	    options.src = https ? 'https:' + options.src : 'http:' + options.src;
	  }

	  // Allow them to pass in different URLs depending on the protocol.
	  if (https && options.https) options.src = options.https;
	  else if (!https && options.http) options.src = options.http;

	  // Make the `<iframe>` element and insert it before the first iframe on the
	  // page, which is guaranteed to exist since this Javaiframe is running.
	  var iframe = document.createElement('iframe');
	  iframe.src = options.src;
	  iframe.width = options.width || 1;
	  iframe.height = options.height || 1;
	  iframe.style.display = 'none';

	  // If we have a fn, attach event handlers, even in IE. Based off of
	  // the Third-Party Javascript script loading example:
	  // https://github.com/thirdpartyjs/thirdpartyjs-code/blob/master/examples/templates/02/loading-files/index.html
	  if (is_1.fn(fn)) {
	    scriptOnload(iframe, fn);
	  }

	  nextTick(function(){
	    // Append after event listeners are attached for IE.
	    var firstScript = document.getElementsByTagName('script')[0];
	    firstScript.parentNode.insertBefore(iframe, firstScript);
	  });

	  // Return the iframe element in case they want to do anything special, like
	  // give it an ID or attributes.
	  return iframe;
	};

	/*
	 * Module dependencies.
	 */





	/**
	 * Loads a script asynchronously.
	 *
	 * @param {Object} options
	 * @param {Function} cb
	 */
	function loadScript(options, cb) {
	  if (!options) {
	    throw new Error('Can\'t load nothing...');
	  }

	  // Allow for the simplest case, just passing a `src` string.
	  if (componentType(options) === 'string') {
	    options = { src : options };
	  }

	  var https = document.location.protocol === 'https:' || document.location.protocol === 'chrome-extension:';

	  // If you use protocol relative URLs, third-party scripts like Google
	  // Analytics break when testing with `file:` so this fixes that.
	  if (options.src && options.src.indexOf('//') === 0) {
	    options.src = (https ? 'https:' : 'http:') + options.src;
	  }

	  // Allow them to pass in different URLs depending on the protocol.
	  if (https && options.https) {
	    options.src = options.https;
	  } else if (!https && options.http) {
	    options.src = options.http;
	  }

	  // Make the `<script>` element and insert it before the first script on the
	  // page, which is guaranteed to exist since this Javascript is running.
	  var script = document.createElement('script');
	  script.type = 'text/javascript';
	  script.async = true;
	  script.src = options.src;

	  // If we have a cb, attach event handlers. Does not work on < IE9 because
	  // older browser versions don't register element.onerror
	  if (componentType(cb) === 'function') {
	    scriptOnload(script, cb);
	  }

	  nextTick(function() {
	    // Append after event listeners are attached for IE.
	    var firstScript = document.getElementsByTagName('script')[0];
	    firstScript.parentNode.insertBefore(script, firstScript);
	  });

	  // Return the script element in case they want to do anything special, like
	  // give it an ID or attributes.
	  return script;
	}

	/*
	 * Exports.
	 */

	var loadScript_1 = loadScript;

	/**
	 * Expose `toNoCase`.
	 */

	var toNoCase_1 = toNoCase;


	/**
	 * Test whether a string is camel-case.
	 */

	var hasSpace = /\s/;
	var hasSeparator = /[\W_]/;


	/**
	 * Remove any starting case from a `string`, like camel or snake, but keep
	 * spaces and punctuation that may be important otherwise.
	 *
	 * @param {String} string
	 * @return {String}
	 */

	function toNoCase (string) {
	  if (hasSpace.test(string)) return string.toLowerCase();
	  if (hasSeparator.test(string)) return (unseparate(string) || string).toLowerCase();
	  return uncamelize(string).toLowerCase();
	}


	/**
	 * Separator splitter.
	 */

	var separatorSplitter = /[\W_]+(.|$)/g;


	/**
	 * Un-separate a `string`.
	 *
	 * @param {String} string
	 * @return {String}
	 */

	function unseparate (string) {
	  return string.replace(separatorSplitter, function (m, next) {
	    return next ? ' ' + next : '';
	  });
	}


	/**
	 * Camelcase splitter.
	 */

	var camelSplitter = /(.)([A-Z]+)/g;


	/**
	 * Un-camelcase a `string`.
	 *
	 * @param {String} string
	 * @return {String}
	 */

	function uncamelize (string) {
	  return string.replace(camelSplitter, function (m, previous, uppers) {
	    return previous + ' ' + uppers.toLowerCase().split('').join(' ');
	  });
	}

	var protos = createCommonjsModule(function (module, exports) {

	/**
	 * Module dependencies.
	 */



	// var events = require('analytics-events');









	/**
	 * hasOwnProperty reference.
	 */

	var has = Object.prototype.hasOwnProperty;

	/**
	 * No operation.
	 */

	var noop = function noop() {};

	/**
	 * Window defaults.
	 */

	var onerror = window.onerror;
	var onload = null;

	/**
	 * Mixin emitter.
	 */

	/* eslint-disable new-cap */
	componentEmitter(exports);
	/* eslint-enable new-cap */

	/**
	 * Initialize.
	 */

	exports.initialize = function () {
	  var ready = this.ready;
	  nextTick(ready);
	};

	/**
	 * Loaded?
	 *
	 * @api private
	 * @return {boolean}
	 */

	exports.loaded = function () {
	  return false;
	};

	/**
	 * Page.
	 *
	 * @api public
	 * @param {Page} page
	 */

	/* eslint-disable no-unused-vars */
	exports.page = function (page) {};
	/* eslint-enable no-unused-vars */

	/**
	 * Track.
	 *
	 * @api public
	 * @param {Track} track
	 */

	/* eslint-disable no-unused-vars */
	exports.track = function (track) {};
	/* eslint-enable no-unused-vars */

	/**
	 * Get values from items in `options` that are mapped to `key`.
	 * `options` is an integration setting which is a collection
	 * of type 'map', 'array', or 'mixed'
	 *
	 * Use cases include mapping events to pixelIds (map), sending generic
	 * conversion pixels only for specific events (array), or configuring dynamic
	 * mappings of event properties to query string parameters based on event (mixed)
	 *
	 * @api public
	 * @param {Object|Object[]|String[]} options An object, array of objects, or
	 * array of strings pulled from settings.mapping.
	 * @param {string} key The name of the item in options whose metadata
	 * we're looking for.
	 * @return {Array} An array of settings that match the input `key` name.
	 * @example
	 *
	 * // 'Map'
	 * var events = { my_event: 'a4991b88' };
	 * .map(events, 'My Event');
	 * // => ["a4991b88"]
	 * .map(events, 'whatever');
	 * // => []
	 *
	 * // 'Array'
	 * * var events = ['Completed Order', 'My Event'];
	 * .map(events, 'My Event');
	 * // => ["My Event"]
	 * .map(events, 'whatever');
	 * // => []
	 *
	 * // 'Mixed'
	 * var events = [{ key: 'my event', value: '9b5eb1fa' }];
	 * .map(events, 'my_event');
	 * // => ["9b5eb1fa"]
	 * .map(events, 'whatever');
	 * // => []
	 */

	exports.map = function (options, key) {
	  var normalizedComparator = toNoCase_1(key);
	  var mappingType = getMappingType(options);

	  if (mappingType === 'unknown') {
	    return [];
	  }

	  return foldl_1(function (matchingValues, val, key_) {
	    var compare;
	    var result;

	    if (mappingType === 'map') {
	      compare = key_;
	      result = val;
	    }

	    if (mappingType === 'array') {
	      compare = val;
	      result = val;
	    }

	    if (mappingType === 'mixed') {
	      compare = val.key;
	      result = val.value;
	    }

	    if (toNoCase_1(compare) === normalizedComparator) {
	      matchingValues.push(result);
	    }

	    return matchingValues;
	  }, [], options);
	};

	/**
	 * Invoke a `method` that may or may not exist on the prototype with `args`,
	 * queueing or not depending on whether the integration is "ready". Don't
	 * trust the method call, since it contains integration party code.
	 *
	 * @api private
	 * @param {string} method
	 * @param {...*} args
	 */

	exports.invoke = function (method) {
	  if (!this[method]) return;
	  var args = Array.prototype.slice.call(arguments, 1);
	  if (!this._ready) return this.queue(method, args);

	  // this.debug('%s with %o', method, args);
	  return this[method].apply(this, args);
	};

	/**
	 * Queue a `method` with `args`.
	 *
	 * @api private
	 * @param {string} method
	 * @param {Array} args
	 */

	exports.queue = function (method, args) {
	  this._queue.push({ method: method, args: args });
	};

	/**
	 * Flush the internal queue.
	 *
	 * @api private
	 */

	exports.flush = function () {
	  this._ready = true;
	  var self = this;

	  each_1(function (call) {
	    self[call.method].apply(self, call.args);
	  }, this._queue);

	  // Empty the queue.
	  this._queue.length = 0;
	};

	/**
	 * Reset the integration, removing its global variables.
	 *
	 * @api private
	 */

	exports.reset = function () {
	  for (var i = 0; i < this.globals.length; i++) {
	    window[this.globals[i]] = undefined;
	  }

	  window.onerror = onerror;
	  window.onload = onload;
	};

	/**
	 * Load a tag by `name`.
	 *
	 * @param {string} name The name of the tag.
	 * @param {Object} locals Locals used to populate the tag's template variables
	 * (e.g. `userId` in '<img src="https://whatever.com/{{ userId }}">').
	 * @param {Function} [callback=noop] A callback, invoked when the tag finishes
	 * loading.
	 */

	exports.load = function (name, locals, callback) {
	  // Argument shuffling
	  if (typeof name === 'function') { callback = name; locals = null; name = null; }
	  if (name && typeof name === 'object') { callback = locals; locals = name; name = null; }
	  if (typeof locals === 'function') { callback = locals; locals = null; }

	  // Default arguments
	  name = name || 'library';
	  locals = locals || {};

	  locals = this.locals(locals);
	  var template = this.templates[name];
	  if (!template) throw new Error(lib$6('template "%s" not defined.', name));
	  var attrs = render(template, locals);
	  callback = callback || noop;
	  // var self = this;
	  var el;

	  switch (template.type) {
	    case 'img':
	      attrs.width = 1;
	      attrs.height = 1;
	      el = loadImage(attrs, callback);
	      break;
	    case 'script':
	      el = loadScript_1(attrs, function (err) {
	        if (!err) return callback();
	        // self.debug('error loading "%s" error="%s"', self.name, err);
	      });
	      // TODO: hack until refactoring load-script
	      delete attrs.src;
	      each_1(function (val, key) {
	        el.setAttribute(key, val);
	      }, attrs);
	      break;
	    case 'iframe':
	      el = loadIframe(attrs, callback);
	      break;
	        // No default case
	  }

	  return el;
	};

	/**
	 * Locals for tag templates.
	 *
	 * By default it includes a cache buster and all of the options.
	 *
	 * @param {Object} [locals]
	 * @return {Object}
	 */

	exports.locals = function (locals) {
	  locals = locals || {};
	  var cache = Math.floor(new Date().getTime() / 3600000);
	  if (!locals.hasOwnProperty('cache')) locals.cache = cache; // eslint-disable-line no-prototype-builtins
	  each_1(function (val, key) {
	    if (!locals.hasOwnProperty(key)) locals[key] = val; // eslint-disable-line no-prototype-builtins
	  }, this.options);
	  return locals;
	};

	/**
	 * Simple way to emit ready.
	 *
	 * @api public
	 */

	exports.ready = function () {
	  this.emit('ready');
	};

	/**
	 * Wrap the initialize method in an exists check, so we don't have to do it for
	 * every single integration.
	 *
	 * @api private
	 */

	exports._wrapInitialize = function () {
	  var initialize = this.initialize;
	  this.initialize = function () {
	    // this.debug('initialize');
	    this._initialized = true;
	    var ret = initialize.apply(this, arguments);
	    this.emit('initialize');
	    return ret;
	  };
	};

	/**
	 * Wrap the page method to call to noop the first page call if the integration assumes
	 * a pageview.
	 *
	 * @api private
	 */

	exports._wrapPage = function () {
	  var page = this.page;
	  var initialPageSkipped = false;
	  this.page = function () {
	    if (this._assumesPageview && !initialPageSkipped) {
	      initialPageSkipped = true;
	      return;
	    }
	    return page.apply(this, arguments);
	  };
	};

	/**
	 * Wrap the track method to call other ecommerce methods if available depending
	 * on the `track.event()`.
	 *
	 * @api private
	 */

	exports._wrapTrack = function () {
	  var t = this.track;
	  this.track = function (track) {
	    var event = track.event();
	    var ret;

	    // for (var method in events) {
	    //   if (has.call(events, method)) {
	    //     var regexp = events[method];
	    //     if (!this[method]) continue;
	    //     if (!regexp.test(event)) continue;
	    //     ret = this[method].apply(this, arguments);
	    //     called = true;
	    //     break;
	    //   }
	    // }

	    ret = t.apply(this, arguments);
	    return ret;
	  };
	};

	/**
	 * Determine the type of the option passed to `#map`
	 *
	 * @api private
	 * @param {Object|Object[]} mapping
	 * @return {String} mappingType
	 */

	function getMappingType(mapping) {
	  if (is_1.array(mapping)) {
	    return every_1(isMixed, mapping) ? 'mixed' : 'array';
	  }
	  if (is_1.object(mapping)) return 'map';
	  return 'unknown';
	}

	/**
	 * Determine if item in mapping array is a valid "mixed" type value
	 *
	 * Must be an object with properties "key" (of type string)
	 * and "value" (of any type)
	 *
	 * @api private
	 * @param {*} item
	 * @return {Boolean}
	 */

	function isMixed(item) {
	  if (!is_1.object(item)) return false;
	  if (!is_1.string(item.key)) return false;
	  if (!has.call(item, 'value')) return false;
	  return true;
	}

	/**
	 * TODO: Document me
	 *
	 * @api private
	 * @param {Object} attrs
	 * @param {Function} fn
	 * @return {Image}
	 */

	function loadImage(attrs, fn) {
	  fn = fn || function () {};
	  var img = new Image();
	  img.onerror = error(fn, 'failed to load pixel', img);
	  img.onload = function () { fn(); };
	  img.src = attrs.src;
	  img.width = 1;
	  img.height = 1;
	  return img;
	}

	/**
	 * TODO: Document me
	 *
	 * @api private
	 * @param {Function} fn
	 * @param {string} message
	 * @param {Element} img
	 * @return {Function}
	 */

	function error(fn, message, img) {
	  return function (e) {
	    e = e || window.event;
	    var err = new Error(message);
	    err.event = e;
	    err.source = img;
	    fn(err);
	  };
	}

	/**
	 * Render template + locals into an `attrs` object.
	 *
	 * @api private
	 * @param {Object} template
	 * @param {Object} locals
	 * @return {Object}
	 */

	function render(template, locals) {
	  return foldl_1(function (attrs, val, key) {
	    attrs[key] = val.replace(/\{\{\ *(\w+)\ *\}\}/g, function (_, $1) { // eslint-disable-line no-useless-escape
	      return locals[$1];
	    });
	    return attrs;
	  }, {}, template.attrs);
	}
	});

	/**
	 * Expose `parse`.
	 */

	var domify = parse$4;

	/**
	 * Tests for browser support.
	 */

	var innerHTMLBug = false;
	var bugTestDiv;
	if (typeof document !== 'undefined') {
	  bugTestDiv = document.createElement('div');
	  // Setup
	  bugTestDiv.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
	  // Make sure that link elements get serialized correctly by innerHTML
	  // This requires a wrapper element in IE
	  innerHTMLBug = !bugTestDiv.getElementsByTagName('link').length;
	  bugTestDiv = undefined;
	}

	/**
	 * Wrap map from jquery.
	 */

	var map = {
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
	  // for script/link/style tags to work in IE6-8, you have to wrap
	  // in a div with a non-whitespace character in front, ha!
	  _default: innerHTMLBug ? [1, 'X<div>', '</div>'] : [0, '', '']
	};

	map.td =
	map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

	map.option =
	map.optgroup = [1, '<select multiple="multiple">', '</select>'];

	map.thead =
	map.tbody =
	map.colgroup =
	map.caption =
	map.tfoot = [1, '<table>', '</table>'];

	map.polyline =
	map.ellipse =
	map.polygon =
	map.circle =
	map.text =
	map.line =
	map.path =
	map.rect =
	map.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];

	/**
	 * Parse `html` and return a DOM Node instance, which could be a TextNode,
	 * HTML DOM Node of some kind (<div> for example), or a DocumentFragment
	 * instance, depending on the contents of the `html` string.
	 *
	 * @param {String} html - HTML string to "domify"
	 * @param {Document} doc - The `document` instance to create the Node for
	 * @return {DOMNode} the TextNode, DOM Node, or DocumentFragment instance
	 * @api private
	 */

	function parse$4(html, doc) {
	  if ('string' != typeof html) throw new TypeError('String expected');

	  // default to the global `document` object
	  if (!doc) doc = document;

	  // tag name
	  var m = /<([\w:]+)/.exec(html);
	  if (!m) return doc.createTextNode(html);

	  html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace

	  var tag = m[1];

	  // body support
	  if (tag == 'body') {
	    var el = doc.createElement('html');
	    el.innerHTML = html;
	    return el.removeChild(el.lastChild);
	  }

	  // wrap map
	  var wrap = map[tag] || map._default;
	  var depth = wrap[0];
	  var prefix = wrap[1];
	  var suffix = wrap[2];
	  var el = doc.createElement('div');
	  el.innerHTML = prefix + html + suffix;
	  while (depth--) el = el.lastChild;

	  // one element
	  if (el.firstChild == el.lastChild) {
	    return el.removeChild(el.firstChild);
	  }

	  // several elements
	  var fragment = doc.createDocumentFragment();
	  while (el.firstChild) {
	    fragment.appendChild(el.removeChild(el.firstChild));
	  }

	  return fragment;
	}

	/*
	 * Module dependencies.
	 */



	var strIndexOf = String.prototype.indexOf;

	/**
	 * Object.is/sameValueZero polyfill.
	 *
	 * @api private
	 * @param {*} value1
	 * @param {*} value2
	 * @return {boolean}
	 */
	// TODO: Move to library
	var sameValueZero = function sameValueZero(value1, value2) {
	  // Normal values and check for 0 / -0
	  if (value1 === value2) {
	    return value1 !== 0 || 1 / value1 === 1 / value2;
	  }
	  // NaN
	  return value1 !== value1 && value2 !== value2;
	};

	/**
	 * Searches a given `collection` for a value, returning true if the collection
	 * contains the value and false otherwise. Can search strings, arrays, and
	 * objects.
	 *
	 * @name includes
	 * @api public
	 * @param {*} searchElement The element to search for.
	 * @param {Object|Array|string} collection The collection to search.
	 * @return {boolean}
	 * @example
	 * includes(2, [1, 2, 3]);
	 * //=> true
	 *
	 * includes(4, [1, 2, 3]);
	 * //=> false
	 *
	 * includes(2, { a: 1, b: 2, c: 3 });
	 * //=> true
	 *
	 * includes('a', { a: 1, b: 2, c: 3 });
	 * //=> false
	 *
	 * includes('abc', 'xyzabc opq');
	 * //=> true
	 *
	 * includes('nope', 'xyzabc opq');
	 * //=> false
	 */
	var includes$1 = function includes(searchElement, collection) {
	  var found = false;

	  // Delegate to String.prototype.indexOf when `collection` is a string
	  if (typeof collection === 'string') {
	    return strIndexOf.call(collection, searchElement) !== -1;
	  }

	  // Iterate through enumerable/own array elements and object properties.
	  each_1(function(value) {
	    if (sameValueZero(value, searchElement)) {
	      found = true;
	      // Exit iteration early when found
	      return false;
	    }
	  }, collection);

	  return found;
	};

	/*
	 * Exports.
	 */

	var includes_1$2 = includes$1;

	var statics = createCommonjsModule(function (module, exports) {

	/**
	 * Module dependencies.
	 */






	/**
	 * Mix in emitter.
	 */

	/* eslint-disable new-cap */
	componentEmitter(exports);
	/* eslint-enable new-cap */

	/**
	 * Add a new option to the integration by `key` with default `value`.
	 *
	 * @api public
	 * @param {string} key
	 * @param {*} value
	 * @return {Integration}
	 */

	exports.option = function (key, value) {
	  this.prototype.defaults[key] = value;
	  return this;
	};

	/**
	 * Add a new mapping option.
	 *
	 * This will create a method `name` that will return a mapping for you to use.
	 *
	 * @api public
	 * @param {string} name
	 * @return {Integration}
	 * @example
	 * Integration('My Integration')
	 *   .mapping('events');
	 *
	 * new MyIntegration().track('My Event');
	 *
	 * .track = function(track){
	 *   var events = this.events(track.event());
	 *   each(send, events);
	 *  };
	 */

	exports.mapping = function (name) {
	  this.option(name, []);
	  this.prototype[name] = function (key) {
	    return this.map(this.options[name], key);
	  };
	  return this;
	};

	/**
	 * Register a new global variable `key` owned by the integration, which will be
	 * used to test whether the integration is already on the page.
	 *
	 * @api public
	 * @param {string} key
	 * @return {Integration}
	 */

	exports.global = function (key) {
	  this.prototype.globals.push(key);
	  return this;
	};

	/**
	 * Mark the integration as assuming an initial pageview, so to defer the first page call, keep track of
	 * whether we already nooped the first page call.
	 *
	 * @api public
	 * @return {Integration}
	 */

	exports.assumesPageview = function () {
	  this.prototype._assumesPageview = true;
	  return this;
	};

	/**
	 * Mark the integration as being "ready" once `load` is called.
	 *
	 * @api public
	 * @return {Integration}
	 */

	exports.readyOnLoad = function () {
	  this.prototype._readyOnLoad = true;
	  return this;
	};

	/**
	 * Mark the integration as being "ready" once `initialize` is called.
	 *
	 * @api public
	 * @return {Integration}
	 */

	exports.readyOnInitialize = function () {
	  this.prototype._readyOnInitialize = true;
	  return this;
	};

	/**
	 * Define a tag to be loaded.
	 *
	 * @api public
	 * @param {string} [name='library'] A nicename for the tag, commonly used in
	 * #load. Helpful when the integration has multiple tags and you need a way to
	 * specify which of the tags you want to load at a given time.
	 * @param {String} str DOM tag as string or URL.
	 * @return {Integration}
	 */

	exports.tag = function (name, tag) {
	  if (tag == null) {
	    tag = name;
	    name = 'library';
	  }
	  this.prototype.templates[name] = objectify(tag);
	  return this;
	};

	/**
	 * Given a string, give back DOM attributes.
	 *
	 * Do it in a way where the browser doesn't load images or iframes. It turns
	 * out domify will load images/iframes because whenever you construct those
	 * DOM elements, the browser immediately loads them.
	 *
	 * @api private
	 * @param {string} str
	 * @return {Object}
	 */

	function objectify(str) {
	  // replace `src` with `data-src` to prevent image loading
	  str = str.replace(' src="', ' data-src="');

	  var el = domify(str);
	  var attrs = {};

	  each_1(function (attr) {
	    // then replace it back
	    var name = attr.name === 'data-src' ? 'src' : attr.name;
	    if (!includes_1$2(attr.name + '=', str)) return;
	    attrs[name] = attr.value;
	  }, el.attributes);

	  return {
	    type: el.tagName.toLowerCase(),
	    attrs: attrs,
	  };
	}
	});

	/**
	 * Module dependencies.
	 */


	// var debug = require('debug');


	// var slug = require('slug-component');



	/**
	 * Create a new `Integration` constructor.
	 *
	 * @constructs Integration
	 * @param {string} name
	 * @return {Function} Integration
	 */

	function createIntegration(name) {
	  /**
	   * Initialize a new `Integration`.
	   *
	   * @class
	   * @param {Object} options
	   */

	  function Integration(options) {
	    if (options && options.addIntegration) {
	      // plugin
	      return options.addIntegration(Integration);
	    }
	    // this.debug = debug('analytics:integration:' + slug(name));
	    var clonedOpts = {};
	    extend(true, clonedOpts, options); // deep clone options
	    this.options = defaults_1(clonedOpts || {}, this.defaults);
	    this._queue = [];
	    this.once('ready', componentBind(this, this.flush));

	    Integration.emit('construct', this);
	    this.ready = componentBind(this, this.ready);
	    this._wrapInitialize();
	    this._wrapPage();
	    this._wrapTrack();
	  }

	  Integration.prototype.defaults = {};
	  Integration.prototype.globals = [];
	  Integration.prototype.templates = {};
	  Integration.prototype.name = name;
	  extend(Integration, statics);
	  extend(Integration.prototype, protos);

	  return Integration;
	}

	/**
	 * Exports.
	 */

	var lib$7 = createIntegration;

	/**
	 * Analytics.js
	 *
	 * (C) 2013-2016 Segment.io Inc.
	 */


	// Create a new `analytics` singleton.
	var analytics$1 = new analytics();
	// Expose `require`.
	// TODO(ndhoule): Look into deprecating, we no longer need to expose it in tests
	analytics$1.require = commonjsRequire;
	// Expose package version.
	analytics$1.VERSION = '4.1.5';
	analytics$1.createIntegration = lib$7;
	/*
	 * Exports.
	 */
	var build = analytics$1;

	return build;

}());

/* h5a-adapter 0.1.0 */
(function () {
  var win = window;
  var doc = document;
  // TODO: noConflict
  var analytics = win.analytics;

  function noop() { }

  function trim(a) {
    return a ? a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '') : '';
  }

  var isArray = Array.isArray || function (a) {
    return Object.prototype.toString.call(a) === '[object Array]';
  };

  function isString(a) {
    return (typeof a === 'string') || a instanceof String;
  }

  var libName = trim(window.H5AnalyticsObject) || 'h5a';
  var lib = window[libName];

  var timingStart = lib.l || +new Date();

  // ** script base
  var scriptBase = '/';
  var scripts = [].slice.call(doc.scripts, 0);
  var REG_ANALYTICS = /(.+\/)analytics\.js$/;
  for (var si = 0; si < scripts.length; si += 1) {
    var simatches = scripts[si].src.match(REG_ANALYTICS);
    if (simatches) {
      scriptBase = simatches[1];
      break;
    }
  }

  /**
   * @param {Date} now
   * @return {Integer}
   */
  analytics.timing = function (now) {
    return (now || new Date()) - timingStart;
  }

  function sendError(message, tracker) {
    // FIXME:
    console.log(message, tracker);
  }

  var REG_COMMAND = /^(?:(\w+)\.)?(?:(\w+):)?(\w+)$/; // [trackerName.][pluginName:]methodName

  var integrations = [];

  // FIXME:
  var Utils = analytics.createIntegration('utils').tag('script', '<script src="{{ script }}">');
  var utils = new Utils();

  var REG_ALIAS = /[A-Z]/g;

  function Loader(name, options) {
    this.name = name;
    this.alias = name.match(REG_ALIAS).join('');
    this.REG_NAME = new RegExp('(' + this.name + ')|(' + this.alias + ')');

    var analyticsInterface = {};
    analyticsInterface[name] = options;

    var init = ['init', analyticsInterface];
    this.q = [init];

    this.script = options.script;
    if (!this.script) {
      this.script = scriptBase + 'analytics-integration-' + name.toLocaleLowerCase().replace(/\s/ig, '-') + '.js';
    }
  }

  Loader.prototype.enqueue = function enqueue(options) {
    this.q.push(options);
  }

  Loader.prototype.padding = function padding(args, min) {
    var len = args.length;
    var properties = {};
    var options = { $$intg: this.name };
    if (len < min) {
      console.warn('invalid args', args, min);
    } else if (len === min) {
      return args.concat([properties, options]);
    } else if (len === min + 1) {
      return args.concat([options]);
    } else if (len === min + 2) {
      var opts = args.pop();
      if (!this.REG_NAME.test(opts.$exclude)) {
        opts.$$intg = options.$$intg;
      }
      delete opts.$exclude;
      return args.concat([opts]);
    } else {
      console.warn('invalid args', args, min);
    }
  }

  Loader.prototype.send = function send(options) {
    if (this._ready) {
      // console.log(JSON.stringify(options));
      var hitType = options[0];
      var action = options.slice(1, options.length);
      if (hitType === 'init') {
        analytics.init(action[0]);
      } else if (hitType === 'identify') {
        action = this.padding(action, action.length - 1); // NOTE: only append options
        // console.log(this.name, JSON.stringify(options));
        // console.log(this.name, JSON.stringify(action));
        analytics.identify.apply(null, action);
      } else if (hitType === 'page') {
        action = this.padding(action, 0);
        // console.log(this.name, JSON.stringify(options));
        // console.log(this.name, JSON.stringify(action));
        analytics.page.apply(null, action);
      } else if (hitType === 'track') {
        action = this.padding(action, 1);
        // console.log(this.name, JSON.stringify(options));
        // console.log(this.name, JSON.stringify(action));
        analytics.track.apply(null, action);
      } else {
        var ig = hitType;
        if (ig === this.name) {
          this.send(action);
        }
      }
    } else {
      this.enqueue(options);
    }
  }

  Loader.prototype.ready = function ready() {
    this._ready = true;
    // console.log(this.q);
    if (this.q.length > 0) {
      var q = this.q.shift();
      while (q) {
        this.send([this.name].concat(q));
        q = this.q.shift();
      }
    }
  }

  function h5a() {
    var args = [].slice.call(arguments);
    var command = args[0];
    var options = args.slice(1);

    var c = REG_COMMAND.exec(command);
    var trackerName = c[1] || '';
    var pluginName = c[2] || '';
    var methodName = c[3];
    console.assert(methodName, 'methodName is required');

    switch (methodName) {
      case 'init':
        if (options.length === 1) {
          var only = options[0];
          var onlykey = Object.keys(only)[0];
          options = [onlykey, only[onlykey]];
        }
        if (options.length === 2) {
          var intg = options[0];
          var options = options[1];

          var loader = new Loader(intg, options);
          integrations.push(loader);
          utils.load('script', { script: loader.script }, function () {
            loader.ready();
          });
        } else {
          sendError('invalid init options');
        }
        break;
      case 'send':
        integrations.forEach(function (ig) {
          ig.send(JSON.parse(JSON.stringify(options)));
        });
        break;
      default:
        console.warn('invalid command');
        break;
    }
  }

  /**
   * @param {String} trackingId    The unique id of the tracked app
   * @param {String} cookieDomain  TODO
   * @param {String} trackerName   Each tracker can have its own gif, defaults, etc.
   */

  var queue = [];
  var q = lib && lib.q;
  if (isArray(q)) {
    for (var i = 0; i < q.length; i++) {
      h5a.apply(h5a, q[i]);
    }

    window[libName] = h5a;
  } else {
    console.warn('invalid lib.q');
  }
}(window));

/* h5a-identify 1.0.0 */
(function () {
  var xauthn = localStorage.getItem('x-auth-n');
  // eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiJoYnJscyJ9.xxx
  if (xauthn) {
    var payload = JSON.parse(atob(xauthn.split('.')[1]));
    h5a('send', 'identify', payload.uid);
  }
}());
