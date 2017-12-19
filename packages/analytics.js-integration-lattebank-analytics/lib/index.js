var core = require('analytics');

/**
 * Module dependencies.
 */

var defaults = require('@ndhoule/defaults');
var dot = require('obj-case');
var each = require('component-each');
var parseUri = require('vanilla.js/uri/parseUri');
var parseMeta = require('./parseMeta');
var len = require('./object-length');
var utils = require('./utils');
var Modernizr = require('h5-modernizr');

/**
 * Expose plugin.
 */

function entry(analytics) {
  analytics.addIntegration(LBS);
};

entry.Integration = LBS;

/**
 * Expose `Latte Bank Stats` integration.
 *
 */

var LBS = core.createIntegration('Latte Bank Stats')
  .readyOnLoad()
  .option('domain', 'auto');

/**
 * On `construct` swap any config-based methods to the proper implementation.
 */

LBS.on('construct', function(integration) {
  var query = parseUri(window.location.href).queryKey;
  var meta = parseMeta();

  var opts = integration.options;

  if (query.p_o) { opts.p_o = query.p_o; }
  if (query.p_i) { opts.p_i = query.p_i; }
  if (query.p_u) { opts.p_u = query.p_u; }
  if (query.p_c) { opts.p_c = query.p_c; }

  if (query.r_c) { opts.r_c = query.r_c; }

  if (query.pageId) { opts.pageId = query.pageId; }

  if (query.pageName) {
    opts.pageName = query.pageName;
  } else {
    if (meta['page-name']) {
      opts.pageName = meta['page-name'];
    }
  }

  if (query.previousPageId) { opts.previousPageId = query.previousPageId; }
  if (query.viewId) { opts.viewId = query.viewId; }
  if (query.previousViewId) { opts.previousViewId = query.previousViewId; }
  if (query.correlationId) { opts.correlationId = query.correlationId; }

  if (meta.i) {
    opts.t_i = meta.i;
  }

  /**
   * 1. priority meta > t_c > channel
   * 2. meta is WTFPL override, use it with care
   */
  if (meta.c) {
    opts.channel = meta.c;
    opts.t_c = meta.c;
  } else if (meta.campaign) {
    opts.channel = meta.campaign;
    opts.t_c = meta.campaign;
  } else if (query.t_c) {
    opts.channel = query.t_c;
    opts.t_c = query.t_c;
  } else if (query.channel) {
    opts.channel = query.channel;
    opts.t_c = query.channel;
  }

  if (query.t_pp) {
    opts.t_pp = query.t_pp;
  }

  if (query.t_ab) {
    opts.t_ab = query.t_ab;
  }

  if (query.utm_campaign) { opts.utm_campaign = query.utm_campaign; }
  if (query.utm_source) { opts.utm_source = query.utm_source; }
  if (query.utm_medium) { opts.utm_medium = query.utm_medium; }
  if (query.utm_term) { opts.utm_term = query.utm_term; }
  if (query.utm_content) { opts.utm_content = query.utm_content; }
});

/**
 * Initialize.
 */

LBS.prototype.initialize = function() {
  this.pageCalled = false;
  var opts = this.options;
  // console.debug(opts);

  /**
   * Tom Riddle
   * Lord Voldemort
   * You-Know-Who
   * He-Who-Must-Not-Be-Named
   */
  var tom = this.analytics;

  // * User
  if (opts.p_u) {
    tom.identify(opts.p_u);
  }

  this.ready();
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

LBS.prototype.loaded = function() {
  return true;
};

/**
 * Page.
 *
 * @api public
 * @param {Page} page
 */

LBS.prototype.page = function(page) {
  // var category = page.category();
  var props = page.properties();
  var name = page.fullName();
  var opts = this.options;
  // console.debug(opts);
  var tom = this.analytics;

  // var pageview = {};
  var pagePath = path(props, opts);
  // var pageReferrer = page.referrer() || '';

  // // store for later
  // // TODO: Why? Document this better
  // this._category = category;

  // pageview.location = props.url;

  var REG_SPECIAL_CHARS = /[!@#\$%\^\&\*\)\(\+\=\.]/ig;

  // set
  var payload = {
    eventId: page.obj.eventId,
    event: 'pageview',
    data: {
      // FIXME: @chenjie
      // if pageview
      //     return data[pagename] or data[title]
      pagename: opts.pageName,
      title: name || props.title.replace(REG_SPECIAL_CHARS, '☒'), // FIXME:
      page: pagePath, // GA->dp
      t_p: pagePath,
      // TODO: better naming
      timing: tom.timing(),
      // TODO: pick
      network: Modernizr.network,
      screen: Modernizr.screen,
    },
  };
  // if (pageReferrer !== document.referrer) payload.referrer = pageReferrer; // allow referrer override if referrer was manually set
  // window.ga('set', payload);

  // if (this.pageCalled) delete pageview.location;

  // send
  utils.send.call(this, payload);

  // $web_page_load {
  // ** 一些流在外面的旧版的 App 仍然需要 $web_page_load 事件来把流程串起来，以及补数据
  var $web_page_load = {
    eventId: page.obj.eventId,
    event: '$web_page_load',
    data: {
      // FIXME: @chenjie
      // if $web_page_load
      //     return data[title]
      title: opts.pageName,
      title_: payload.data.title,
    },
  };
  utils.send.call(this, $web_page_load);
  // } $web_page_load

  this.pageCalled = true;
};

/**
 * Identify.
 *
 * @api public
 * @param {Identify} event
 */

LBS.prototype.identify = function(identify) {
  // var opts = this.options;

  // if (opts.sendUserId && identify.userId()) {
  //   window.ga('set', 'userId', identify.userId());
  // }
};

/**
 * Track.
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/events
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference
 *
 * @param {Track} event
 */

LBS.prototype.track = function(track, options) {
  // console.debug(track, options);
  // var contextOpts = track.options(this.name);
  // var interfaceOpts = this.options;
  // var opts = defaults(options || {}, contextOpts);
  // opts = defaults(opts, interfaceOpts);
  // var props = track.properties();

  var properties = defaults({}, track.obj.properties);

  var pagePath = path({ path: track.proxy('context.page.path') }, this.options);

  var payload = {
    eventId: track.obj.eventId,
    // event: 'buttonClick',
    // FIXME: @chenjie
    // if pageview
    //    use pageName
    // else
    //    use event
    event: properties.event || this.options.pageName,
    data: {
      action: track.event(),
      t_p: pagePath,
    },
  };

  // FIXME:
  delete properties.event;
  defaults(payload.data, properties);

  utils.send.call(this, payload);
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

  // FIXME: move to Facade
  var REGEX_JSESSIONID = /;jsessionid=[0-9a-zA-Z]{8,32}$/ig;
  str = str.replace(REGEX_JSESSIONID, '');

  if (options.includeSearch && properties.search) str += properties.search;
  return str;
}

/**
 * Format the value property to Google's liking.
 *
 * @param {Number} value
 * @return {Number}
 */

function formatValue(value) {
  if (!value || value < 0) return 0;
  return Math.round(value);
}

entry(core);
