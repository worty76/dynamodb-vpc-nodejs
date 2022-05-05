const dotenv = require('dotenv');
dotenv.config({ path: '../../../.env' });

let ip = process.env.IP;
var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined
        ? true
        : decodeURIComponent(sParameterName[1]);
    }
  }
  return false;
};
function Change() {
  var a = document.getElementById('Cu').value;
  var b = document.getElementById('Moi').value;
  if (a == b) {
    document.getElementById('Luu').disabled = true;
  } else {
    document.getElementById('Luu').disabled = false;
  }
}
function Them() {
  var a = document.getElementById('Cu').value;
  var b = document.getElementById('Moi').value;
  var c = document.getElementById('Lai').value;
  var allcookies = document.cookie;
  cookiearray = allcookies.split(';');
  var value = cookiearray[0].split('=')[1];
  console.v;
  $.ajax({
    type: 'GET',
    url: ip + '/account/' + value + '/' + a, //Tên servlet
    success: function (result) {
      console.log(result);
      if (result.length > 0) {
        $.ajax({
          type: 'PUT',
          url: ip + '/account/change/' + value + '/' + b,
        });
        const theOneFunc = (delay) => {
          document.cookie = 'name=;';
          window.location = '/login';
        };
        setTimeout(theOneFunc, 2 * 1000, 4);
      }
    },
  });
}
