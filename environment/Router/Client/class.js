const dotenv = require('dotenv');
dotenv.config({ path: '../../../.env' });

let ip = process.env.IP;
function LoadCombo() {
  $.ajax({
    type: 'GET',
    url: ip + '/khoa', //Tên servlet
    success: function (result) {
      console.log(result);
      var row = document.getElementById('Brand1');
      row.innerHTML = null;
      var htmlString = ``;
      for (let item in result) {
        htmlString +=
          `<option value="` +
          result[item].MaKhoa +
          `">` +
          result[item].TenKhoa +
          `</option>`;
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
  LoadCombo();
  LoadData();
  CheckLogin();
});
function LoadData() {
  $.ajax({
    type: 'GET',
    url: ip + '/lop', //Tên servlet
    success: function (result) {
      console.log(result);
      var row = document.getElementById('row1');
      row.innerHTML = null;
      var htmlString = ``;
      let total = result.length;
      for (let item in result) {
        var total1 = item - '-1';
        let total2 = total - item - 1;
        console.log(total2);
        htmlString +=
          ` <tr>
                        <th scope="row">` +
          total1 +
          `</th>
                        <td>` +
          result[total2].MaLop +
          `</td>
                        <td>` +
          result[total2].TenLop +
          `</td>
                        <td>` +
          result[total2].MaKhoa +
          `</td>
                        <td class="text-center">
                            <button type="submit" data-bs-toggle="modal"
                                    data-bs-target="#edit-modal" onclick="Load1('` +
          result[total2].MaLop +
          `')" class="btn btn-outline-danger py-1">Sửa</button>
                            <button type="submit" class="btn btn-outline-warning py-1" onclick="Load2('` +
          result[total2].MaLop +
          `')" data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop">Xóa</button>
                        </td>
                      </tr>`;
      }
      row.innerHTML = htmlString;
      console.log('1');
    },
  });
}
function Them() {
  var Khoa = $('#Brand1').find(':selected').val();
  var a = document.getElementById('MaLop').value;
  var b = document.getElementById('TenLop').value;
  $.ajax({
    type: 'POST',
    url: ip + '/Lop', //Tên servlet
    data: { MaLop: a, TenLop: b, MaKhoa: Khoa },
  });
}
function Load1(data) {
  var a = '';
  $.ajax({
    type: 'Get',
    url: ip + '/lop/' + data, //Tên servlet
    success: function (result) {
      document.getElementById('MaLop1').value = '';
      document.getElementById('TenLop1').value = '';
      document.getElementById('MaLop1').value = result[0].MaLop;
      document.getElementById('TenLop1').value = result[0].TenLop;
      a = document.getElementById('Brand2').value = result[0].MaKhoa;
      $.ajax({
        type: 'GET',
        url: ip + '/khoa', //Tên servlet
        success: function (result) {
          console.log(result);
          var row = document.getElementById('Brand2');
          row.innerHTML = null;
          var htmlString = ``;
          for (let item in result) {
            htmlString +=
              `<option value="` +
              result[item].MaKhoa +
              `">` +
              result[item].TenKhoa +
              `</option>`;
          }
          row.innerHTML = htmlString;
          document.getElementById('Brand2').value = a;
        },
      });
    },
  });
}
function Sua() {
  var Khoa = $('#Brand2').find(':selected').val();
  var a = document.getElementById('MaLop1').value;
  var b = document.getElementById('TenLop1').value;
  $.ajax({
    type: 'PUT',
    url: ip + '/lop/' + a, //Tên servlet
    data: { TenLop: b, MaKhoa: Khoa },
  });
}
function Load2(data) {
  var row = document.getElementById('Mess');
  row.innerHTML = null;
  row.innerHTML = 'Bạn có chắc muốn xóa lớp ' + data;
  var row1 = document.getElementById('button');
  row1.innerHTML = null;
  row1.innerHTML =
    `<button type="button" class="btn btn-danger"
                                                    data-bs-dismiss="modal">Không</button>
                      <button type="button" class="btn btn-primary" onclick="Xoa('` +
    data +
    `')" data-bs-dismiss="modal">Xác nhận</button>`;
}
function Xoa(data) {
  $.ajax({
    type: 'Delete',
    url: ip + '/lop/' + data, //Tên servlet
  });
}
function Logout() {
  document.cookie = 'name=;';
  CheckLogin();
}
