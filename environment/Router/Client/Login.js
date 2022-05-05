const dotenv = require('dotenv');
dotenv.config({ path: '../../../.env' });

let ip = process.env.IP;
$(document).ready(function () {
  document.getElementById('admin').checked = true;
});
function Login() {
  var a = document.getElementById('username').value;
  var b = document.getElementById('password').value;
  var c = document.getElementById('admin').checked;
  if (a != '' && b != '') {
    $.ajax({
      type: 'GET',
      url: ip + '/account/' + a + '/' + b, //Tên servlet
      success: function (result) {
        if (result.length > 0) {
          console.log(result[0].Role1);
          if (result[0].Role1 == 'admin' && c == true) {
            cookievalue = escape(result[0].User_Id) + ';';
            document.cookie = 'name=' + cookievalue;

            var allcookies = document.cookie;
            cookiearray = allcookies.split(';');
            window.location = '/';
          } else {
            cookievalue = escape(result[0].User_Id) + ';';
            document.cookie = 'name=' + cookievalue;

            var allcookies = document.cookie;
            cookiearray = allcookies.split(';');
            window.location = '/listclass';
          }
        } else {
          alert('tài khoản hoặc mật khẩu không chính xác');
          document.getElementById('password').value = '';
          document.getElementById('username').value = '';
        }
      },
    });
  }
}
