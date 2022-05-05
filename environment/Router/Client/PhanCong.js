const dotenv = require('dotenv');
dotenv.config({ path: '../../../.env' });

let ip = process.env.IP;
function LoadCombo() {
  $.ajax({
    type: 'GET',
    url: ip + '/lop', //Tên servlet
    success: function (result) {
      console.log(result);
      var row = document.getElementById('Lop1');
      row.innerHTML = null;
      var htmlString = ``;
      for (let item in result) {
        htmlString +=
          `<option value="` +
          result[item].MaLop +
          `">` +
          result[item].TenLop +
          `</option>`;
      }
      row.innerHTML = htmlString;
    },
  });
  $.ajax({
    type: 'GET',
    url: ip + '/monhoc', //Tên servlet
    success: function (result) {
      console.log(result);
      var row = document.getElementById('Mon1');
      row.innerHTML = null;
      var htmlString = ``;
      for (let item in result) {
        htmlString +=
          `<option value="` +
          result[item].MaMon +
          `">` +
          result[item].TenMon +
          `</option>`;
      }
      row.innerHTML = htmlString;
    },
  });
  $.ajax({
    type: 'GET',
    url: ip + '/giangvien', //Tên servlet
    success: function (result) {
      console.log(result);
      var row = document.getElementById('GV1');
      row.innerHTML = null;
      var htmlString = ``;
      for (let item in result) {
        htmlString +=
          `<option value="` +
          result[item].MaGV +
          `">` +
          result[item].TenGV +
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
    url: ip + '/phancong', //Tên servlet
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
          result[total2].MaGV +
          `</td>
                        <td>` +
          result[total2].MaMon +
          `</td>
                        <td class="text-center">
                            <button type="submit" class="btn btn-outline-warning py-1" onclick="Load2('` +
          result[total2].MaLop +
          `','` +
          result[total2].MaGV +
          `','` +
          result[total2].MaMon +
          `')" data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop">Xóa</button>
                        </td>
                      </tr>`;
      }
      row.innerHTML = htmlString;
    },
  });
}
function Load2(data) {
  var row = document.getElementById('Mess');
  row.innerHTML = null;
  row.innerHTML = 'Bạn có chắc muốn xóa';
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
function Them() {
  var Lop = $('#Lop1').find(':selected').val();
  var Mon = $('#Mon1').find(':selected').val();
  var GV = $('#GV1').find(':selected').val();
  $.ajax({
    type: 'POST',
    url: ip + '/phancong', //Tên servlet
    data: { MaLop: Lop, MaGV: GV, MaMon: Mon },
  });
}
