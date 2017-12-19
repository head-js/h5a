var merge = require('deepmerge');
var uniform = require('./uniform.js');


function noop() {}

function createImg(a) {
  var img = document.createElement('img');
  img.width = 1;
  img.height = 1;
  img.src = a;
  return img;
};

function sendImage(url, data, callback) {
  var img = createImg(url + '?' + data);
  img.onload = img.onerror = function () {
    img.onload = null;
    img.onerror = null;
    callback();
  };
};

module.exports = {
  send: function (payload) {
    var defaults = merge(uniform.defaults.call(this), this.options.defaults ? this.options.defaults() : {});
    // ** assert: payload should be an {}
    payload.data = merge(uniform.context.call(this), payload.data);

    var fields = merge(defaults, payload);

    // FIXME:
    fields.data = JSON.stringify(fields.data);

    // ** collect only the non-null fields
    var str = [];
    for (var k in fields) {
      if (fields[k]) {
        str.push(k + '=' + fields[k]);
      }
    }
    str = str.join('&');

    sendImage(this.options.gif, str, noop);
  },
};
