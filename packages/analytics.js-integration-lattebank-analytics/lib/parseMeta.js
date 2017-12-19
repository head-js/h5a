var $find = require('vanilla.js/jquery/find');


module.exports = function parseMeta() {
  var $meta = $find('meta[name="h5a"]');

  var d = {};

  if ($meta) {
    var content = $meta.getAttribute('content').split(';');
    var c;
    var kv;
    var k;
    var v;
    for (var i = 0; i < content.length; i++) {
      c = content[i];
      if (c) {
        kv = c.split('=');
        k = kv[0];
        v = kv[1];
        if (k && v) {
          d[k] = v;
        }
      }
    }
  }

  return d;
};
