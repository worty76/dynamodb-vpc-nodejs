const dotenv = require('dotenv');
dotenv.config({ path: '../../../.env' });

let ip = process.env.IP;
var allcookies = document.cookie;
cookiearray = allcookies.split(';');
var value = cookiearray[0].split('=')[1];
console.log(value);
//#############################################################
function LoadData() {
  $.ajax({
    type: 'GET',
    url: ip + '/phancong/' + value, //Tên servlet
    success: function (result) {
      console.log(result);
      var row = document.getElementById('ROW1');
      row.innerHTML = null;
      var htmlString = ``;
      for (let it in result) {
        htmlString +=
          `<li><a href="/score?Lop=` +
          result[it].MaLop +
          `&Mon=` +
          result[it].MaMon +
          `" style="color:black">Lớp ` +
          result[it].MaLop +
          ` Môn ` +
          result[it].MaMon +
          `</a></li>`;
      }
      row.innerHTML = htmlString;
    },
  });
}
function CheckLogin() {
  var allcookies = document.cookie;
  cookiearray = allcookies.split(';');
  var value = cookiearray[0].split('=')[1];
  console.log(value);
  if (value == null || value == '') {
    window.location = '/login';
  } else {
    $.ajax({
      type: 'Get',
      url: ip + '/GiangVien/' + value, //Tên servlet
      success: function (result) {
        console.log(result);
        var row = document.getElementById('HI');
        row.innerHTML = null;
        row.innerHTML = 'Hi! ' + result[0].MaGV;
      },
    });
  }
}
$(document).ready(function () {
  LoadData();
  CheckLogin();
});
function CapQuyen(data01) {
  $.ajax({
    type: 'Put',
    url: ip + '/account/' + data01 + '/admin', //Tên servlet
    success: function (result) {},
  });
}
function Logout() {
  document.cookie = 'name=;';
  CheckLogin();
}
