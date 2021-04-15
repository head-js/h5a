(function(win, doc) {
  var oldErrorHandler = win.onerror;

  win.onerror = function(message, url, line) {
    if (!url) {
      return false;
    }

    h5a('send', 'exception', { message, url, line});

    if (oldErrorHandler) {
      return oldErrorHandler(msg, url, line);
    } else {
      return false;
    }
  }
})(window, document);
