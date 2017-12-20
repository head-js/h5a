(function () {
  var win = window;
  var doc = document;
  // TODO: noConflict
  var analytics = win.analytics;

  function noop() {}

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
          options = options.shift();
          analytics.init(options);
        } else {
          sendError('invalid init options');
        }
        break;
      case 'send':
        var hitType = options.shift();
        if (hitType === 'page') {
          analytics.page.apply(options);
        } else if (hitType === 'track') {
          analytics.track.apply(null, options);
        } else {
          console.warn('invalid command args');
        }
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
