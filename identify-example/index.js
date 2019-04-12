/* h5a-identify 1.0.0 */
(function () {
  var xauthn = localStorage.getItem('x-auth-n');
  // eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiJoYnJscyJ9.xxx
  if (xauthn) {
    var payload = JSON.parse(atob(xauthn.split('.')[1]));
    h5a('send', 'identify', payload.uid);
  }
}());
