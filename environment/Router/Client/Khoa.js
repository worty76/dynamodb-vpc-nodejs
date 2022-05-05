const dotenv = require('dotenv');
dotenv.config({ path: '../../../.env' });

let ip = process.env.IP;
function LoadData() {
  $.ajax({
    type: 'GET',
    url: ip + '/khoa', //Tên servlet
    success: function (result) {
      console.log(result);
      var row = document.getElementById('row1');
      row.innerHTML = null;
      var htmlString = ``;
      let total = result.length;
      for (let item in result) {
        var total1 = item - '-1';
        let total2 = total - item - 1;
        htmlString +=
          `<tr>
                                <th scope="row"> ` +
          total1 +
          `</th>
                                <td>` +
          result[total2].MaKhoa +
          `</td>
                                <td>` +
          result[total2].TenKhoa +
          `</td>
                                
                                <td class="text-center">
                                    <!-- Button EDIT-->
                                    <button type="button" class="btn btn-outline-danger py-1" onclick="Load1('` +
          result[total2].MaKhoa +
          `')" data-bs-toggle="modal"
                                        data-bs-target="#edit-modal"><i class='bx bx-pen'></i> Sửa
                                    </button>
                                    <!-- Button DELETE -->
                                    <button type="button" class="btn btn-outline-warning py-1" onclick="Load2('` +
          result[total2].MaKhoa +
          `')" data-bs-toggle="modal"
                                        data-bs-target="#staticBackdrop">
                                        <i class='bx bx-x'></i>Xóa
                                    </button>
                                </td>
                            </tr>`;
        $('#row1').html(htmlString);
      }
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

// Insert

function Them() {
  var a = document.getElementById('MaKhoa').value;
  var b = document.getElementById('TenKhoa').value;
  $.ajax({
    type: 'POST',
    url: ip + '/khoa', //Tên servlet
    data: { MaKhoa: a, TenKhoa: b },
  });
}
function Load1(data) {
  $.ajax({
    type: 'Get',
    url: ip + '/khoa/' + data, //Tên servlet
    success: function (result) {
      document.getElementById('MaKhoa1').value = '';
      document.getElementById('TenKhoa1').value = '';
      document.getElementById('MaKhoa1').value = result[0].MaKhoa;
      document.getElementById('TenKhoa1').value = result[0].TenKhoa;
    },
  });
}
var deldata = null;
function Load2(data) {
  var row = document.getElementById('Mess');
  row.innerHTML = null;
  row.innerHTML = 'Bạn có chắc muốn xóa khoa ' + data;
  var row1 = document.getElementById('button');
  row1.innerHTML = null;
  row1.innerHTML =
    `<button type="button" class="btn btn-danger"
                                                        data-bs-dismiss="modal">Không</button>
                          <button type="button" class="btn btn-primary" onclick="Xoa('` +
    data +
    `')" data-bs-dismiss="modal">Xác nhận</button>`;
}

function Sua() {
  var a = document.getElementById('MaKhoa1').value;
  var b = document.getElementById('TenKhoa1').value;
  $.ajax({
    type: 'PUT',
    url: ip + '/khoa/' + a, //Tên servlet
    data: { TenKhoa: b },
  });
}
function Xoa(data) {
  $.ajax({
    type: 'Delete',
    url: ip + '/khoa/' + data, //Tên servlet
  });
}
function Logout() {
  document.cookie = 'name=;';
  CheckLogin();
}
