var helper = require('../utils/helper');
var integrations = require('./integrations');
var loadjs = require('loadjs');
var timing = require('./timing');

(function () {
  var win = window;
  var doc = document;
  var jsLoader = loadjs || win.loadjs;
  // TODO: noConflict
  var analytics = win.analytics;

  function noop() { }

  var libName = helper.trim(window.H5AnalyticsObject) || 'h5a';
  var lib = window[libName];

  var baseAnalyticsJsPath = (lib && lib.basePath) || '/';

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
        } else if (hitType === 'timing') {
          if (lib.winLoaded === true) {
            sendPerfMetrics();
          } else {
            win.addEventListener('load', sendPerfMetrics, false);
          }
        } else {
          console.warn('invalid command args');
        }
        break;
      default:
        console.warn('invalid command');
        break;
    }
  }

  function sendPerfMetrics() {
    setTimeout(function () {
      var timingInfo = timing.getTimes({ simple: true });
      timingInfo.event = 'timing';
      analytics.track.call(null, 'timing', timingInfo);
    }, 0);
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
        enqueue(args);
        var integrationJSList = helper.keys(options).map(function (itkey) {
          return baseAnalyticsJsPath + integrations.find(function (it) {
            return it.id === itkey
          }).file
        });
        jsLoader(integrationJSList, {
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
    lib.q = lib.q || [];
    lib.q.push(args);
  }

  function dequeues() {
    var clonedQueue = helper.cloneArray(lib && lib.q);
    if (helper.isArray(clonedQueue)) {
      var h5aLib = lib.integrationLoaded ? h5a : h5aIntegrationLoader;
      for (var i = 0; i < clonedQueue.length; i++) {
        h5aLib.apply(h5aLib, clonedQueue[i]);
      }
    } else {
      console.warn('invalid lib.q');
    }
    if (lib.integrationLoaded === true) {
      window[libName] = h5a;
    }
  }

  window[libName] = h5aIntegrationLoader;

  dequeues();
}(window));