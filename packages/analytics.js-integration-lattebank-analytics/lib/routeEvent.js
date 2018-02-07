
module.exports = {
  subscribe: function(handler) {
    // Avoid duplicate event trigger sometimes (React-Router _k hash change)
    var pattern = /[\?&]?_k=\w+/;
    if (!window.h5aRouteAlreadySubscribed) {
      window.addEventListener('hashchange', function(e) {
        if (e.oldURL.replace(pattern, '') !== e.newURL.replace(pattern, '')) {
          handler();
        }
      } , false);
      window.h5aRouteAlreadySubscribed = true;
    }
  }
}