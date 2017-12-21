function trim(a) {
  return a ? a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '') : '';
}

var isArray = Array.isArray || function (a) {
  return Object.prototype.toString.call(a) === '[object Array]';
};

function isString(a) {
  return (typeof a === 'string') || a instanceof String;
}

var has = Object.prototype.hasOwnProperty;

var keys = Object.keys || function (obj) {
  var a = [];
  for (var key in obj) {
    if (has.call(obj, key)) {
      a.push(key);
    }
  }
  return a;
};

module.exports = {
  trim: trim,
  isArray: isArray,
  isString: isString,
  keys: keys
}