var core = window.analytics; // FIXME: rollup.external/globals

/**
 * Module dependencies.
 */

var each = require('component-each');
var user;

/**
 * Expose plugin.
 */

function entry(analytics) {
  analytics.addIntegration(GA);
  user = analytics.user();
};

entry.Integration = GA;

/**
 * Expose `GA` integration.

 * http://support.google.com/analytics/bin/answer.py?hl=en&answer=2558867
 * https://developers.google.com/analytics/devguides/collection/gajs/methods/gaJSApiBasicConfiguration#_gat.GA_Tracker_._setSiteSpeedSampleRate
 */

var GA = function () {};

/**
 * Identify.
 *
 * @api public
 * @param {Identify} event
 */

GA.prototype.identify = function(identify) {
  // Set dimensions
  var custom = metrics(user.traits(), opts);
};

/**
 * Map google's custom dimensions, metrics & content groupings with `obj`.
 *
 * Example:
 *
 *      metrics({ revenue: 1.9 }, { { metrics : { revenue: 'metric8' } });
 *      // => { metric8: 1.9 }
 *
 *      metrics({ revenue: 1.9 }, {});
 *      // => {}
 *
 * @param {Object} obj
 * @param {Object} data
 * @return {Object|null}
 * @api private
 */

function metrics(obj, data) {
  var dimensions = data.dimensions;
  var metrics = data.metrics;
  var contentGroupings = data.contentGroupings;

  var ret = {};

  each([metrics, dimensions, contentGroupings], function(group) {
    each(group, function(prop, key) {
      console.debug('each', prop, key);
    });
  });

  return ret;
}

entry(core);

