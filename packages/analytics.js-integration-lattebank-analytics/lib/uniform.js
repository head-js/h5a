function pick(from_, to, fields) {
  var f;
  for (var i = 0; i < fields.length; i++) {
    f = fields[i];
    if (from_[f]) {
      to[f] = from_[f];
    }
  }
}


module.exports = {
  defaults: function () { // ** append to root
    var d = {};

    d.timestamp = 1 * new Date();
    
    pick(this.options, d, ['p_o', 'p_i', 'p_u', 'p_c', 'r_c', 'pageId', 'pageName', 'previousPageId', 'viewId', 'previousViewId', 'correlationId']);

    return d;
  },

  context: function () { // ** append to data
    var opts = this.options;

    var d = {};

    pick(opts, d, ['t_i', 't_c', 't_pp', 't_ab', 'channel', 'utm_campaign', 'utm_source', 'utm_medium', 'utm_term', 'utm_content']);

    var tom = this.analytics;

    // * User
    var user = tom.user();
    d.ajsId = user.id() || user.anonymousId();

    return d;
  },
};
