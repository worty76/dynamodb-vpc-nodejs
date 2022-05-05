const dotenv = require('dotenv');
dotenv.config({ path: '../../../.env' });

let ip = process.env.IP;

var allcookies = document.cookie;
cookiearray = allcookies.split(';');
var value = cookiearray[0].split('=')[1];
console.log(value);
//#############################################################
var data1;
var data2;
function GomMang(data) {
  for (var i in data1) {
    for (var j in data2) {
      if (data1[i].MaGV == data2[j].User_Id) {
        data.push({
          MaGV: data1[i].MaGV,
          TenGV: data1[i].TenGV,
          NgaySinh: data1[i].NgaySinh,
          MaKhoa: data1[i].MaKhoa,
          Role: data2[j].Role1,
        });
        console.log(data);
      }
    }
  }

  var row = document.getElementById('ROW1');
  row.innerHTML = null;
  var htmlString = ``;
  let total = data.length;
  for (let item in data) {
    var total1 = item - '-1';
    let total2 = total - item - 1;
    htmlString +=
      `<tr>
                            <th scope="row">` +
      total1 +
      `</th>
                            <td>` +
      data[total2].MaGV +
      `</td>
                            <td>` +
      data[total2].TenGV +
      `</td>
                            <td>` +
      data[total2].NgaySinh +
      `</td>
                            <td>` +
      data[total2].MaKhoa +
      `</td>`;
    //console.log(data[total2].Role)
    if (data[total2].Role != 'admin') {
      htmlString +=
        `<td class="text-center">
                                                <!-- Button EDIT-->
                                                <button type="button" class="btn btn-outline-danger py-1" onclick="CapQuyen('` +
        data[total2].MaGV +
        `')"><i class='bx bx-pen'>Cấp quyền</i> 
                                                </button>
                                             </td>`;
    }
    `</tr>`;
    $('#ROW1').html(htmlString);
  }
}
function LoadData() {
  var data = [];
  $.ajax({
    type: 'GET',
    url: ip + '/GiangVien/', //Tên servlet
    success: function (result) {
      data1 = result;
      console.log(data1);
      $.ajax({
        type: 'GET',
        url: ip + '/account/', //Tên servlet
        success: function (result1) {
          data2 = result1;
          console.log(data2);
          GomMang(data);
        },
      });
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
