var helper = require('../utils/helper');
var integrations = require('./integrations');
var loadjs = require('loadjs')

(function () {
  var win = window;
  var doc = document;
  var jsLoader = loadjs || win.loadjs;
  // TODO: noConflict
  var analytics = win.analytics;

  function noop() {}

  var libName = helper.trim(window.H5AnalyticsObject) || 'h5a';
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

  function h5aIntegrationLoader() {
    var args = [].slice.call(arguments);

    var command = args[0];
    var options = args.slice(1);

    var c = REG_COMMAND.exec(command);
    var trackerName = c[1] || '';
    var pluginName = c[2] || '';
    var methodName = c[3];
    console.assert(methodName, 'methodName is required');

    if (methodName === 'init' && lib.integrationLoaded !== true) {
      if (options.length === 1) {
        options = options.shift();
        var integrationJSList = helper.keys(options).map(function (itkey) {
          return integrations.find(function (it) {
            return it.id === itkey
          }).file
        });
        console.debug('Integration js: ', integrationJSList);
        jsLoader(integrationList, {
          success: function () {
            lib.integrationLoaded = true;
            dequeues();
          }
        })
      } else {
        sendError('invalid init options');
      }
    } else {
      enqueue(args);
    }
  }

  function enqueue(args) {
    window[libName].q = window[libName].q || [];
    q.push(args);
  }

  function dequeues() {
    var q = lib && lib.q;
    if (helper.isArray(q)) {
      for (var i = 0; i < q.length; i++) {
        h5a.apply(h5a, q[i]);
      }
    } else {
      console.warn('invalid lib.q');
    }
    window[libName] = h5a;
  }

  window[libName] = h5aIntegrationLoader;
}(window));