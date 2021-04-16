/* analytics.js-integration-h5a-interface 0.1.0 */
(function (analytics) {
	var core = analytics;

	/**
	 * Expose plugin.
	 */

	function entry(analytics) {
	  analytics.addIntegration(HAI);
	};

	entry.Integration = HAI;

	/**
	 * Expose `H5 A Interface` integration.
	 *
	 */

	var HAI = core.createIntegration('H5 A Interface')
	  .readyOnLoad()
	  .option('domain', 'auto');

	/**
	 * On `construct` swap any config-based methods to the proper implementation.
	 */

	HAI.on('construct', function(integration) {
	});

	/**
	 * Initialize.
	 */

	HAI.prototype.initialize = function() {
	  this.pageCalled = false;
	  var opts = this.options;

	  /**
	   * Tom Riddle
	   * Lord Voldemort
	   * You-Know-Who
	   * He-Who-Must-Not-Be-Named
	   */
	  var tom = this.analytics;

	  // * User
	  if (opts.userId) {
	    tom.identify(opts.userId);
	  }

	  this.ready();
	};

	/**
	 * Loaded?
	 *
	 * @return {Boolean}
	 */

	HAI.prototype.loaded = function() {
	  return true;
	};

	/**
	 * Page.
	 *
	 * @api public
	 * @param {Page} page
	 */

	HAI.prototype.page = function(page) {
	  if (page.obj.context.$$intg !== this.constructor.prototype.name) {
	    return;
	  }

	  var props = page.properties();
	  var opts = this.options;

	  var tom = this.analytics;

	  var pagePath = path(props, opts);

	  // set
	  var payload = {
	    eventId: page.obj.eventId,
	    event: 'pageview',
	    data: {
	      page: pagePath,
	      timing: tom.timing(),
	    },
	  };

		// send
		console.log('utils.send', JSON.stringify(payload));

	  this.pageCalled = true;
	};

	/**
	 * Identify.
	 *
	 * @api public
	 * @param {Identify} event
	 */

	HAI.prototype.identify = function(identify) {
	};

	/**
	 * Track.
	 *
	 * https://developers.google.com/analytics/devguides/collection/analyticsjs/events
	 * https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference
	 *
	 * @param {Track} event
	 */

	HAI.prototype.track = function(track, options) {
	  if (track.obj.context.$$intg !== this.constructor.prototype.name) {
	    return;
	  }

	  var pagePath = path({ path: track.proxy('context.page.path') }, this.options);

	  var payload = {
	    eventId: track.obj.eventId,
	    data: {
	      action: track.event(),
	      page: pagePath,
	    },
		};

		Object.keys(track.obj.properties).map(function (key) {
			payload.data[key] = track.obj.properties[key];
		});

		console.log('utils.send', JSON.stringify(payload));
	};

	/**
	 * Return the path based on `properties` and `options`.
	 *
	 * @param {Object} properties
	 * @param {Object} options
	 * @return {string|undefined}
	 */

	function path(properties, options) {
	  if (!properties) return;
	  var str = properties.path;

	  if (options.includeSearch && properties.search) str += properties.search;
	  return str;
	}

	entry(core);

}(window.analytics));
