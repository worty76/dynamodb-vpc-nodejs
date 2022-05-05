const dotenv = require('dotenv');
dotenv.config({ path: '../../../.env' });

let ip = process.env.IP;

function LoadData() {
  $.ajax({
    type: 'GET',
    url: ip + '/sinhvien/', //Tên servlet
    success: function (result) {
      console.log(result);
      var row = document.getElementById('ROW1');
      row.innerHTML = null;
      var htmlString = ``;
      let total = result.length;
      for (let item in result) {
        var total1 = item - '-1';
        let total2 = total - item - 1;
        htmlString +=
          `<tr>
                            <th scope="row">` +
          total1 +
          `</th>
                            <td>` +
          result[total2].MaSV +
          `</td>
                            <td>` +
          result[total2].TenSV +
          `</td>
                            <td>` +
          result[total2].GioiTinh +
          `</td>
                            <td>` +
          result[total2].NgaySinh +
          `</td>
                            <td>` +
          result[total2].QueQuan +
          `</td>
                            <td>` +
          result[total2].MaLop +
          `</td>
                            <td class="text-center">
                                <!-- Button EDIT-->
                                <button type="button" class="btn btn-outline-danger py-1" onclick="Load1('` +
          result[total2].MaSV +
          `')" data-bs-toggle="modal"
                                    data-bs-target="#edit-modal"><i class='bx bx-pen'></i> Sửa
                                </button>
                                <!-- EDIT Modal -->
                                
                                <!-- Button DELETE -->
                                <button type="button" class="btn btn-outline-warning py-1" data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop" onclick="Load2('` +
          result[total2].MaSV +
          `')">
                                    <i class='bx bx-x'></i>Xóa
                                </button>
                                <!-- DELETE Modal -->
                                
                            </td>
                        </tr>`;
        $('#ROW1').html(htmlString);
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
    window.location = '/Login';
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

function Them() {
  var MSSV = document.getElementById('sv_mssv').value;
  var Name = document.getElementById('sv_name').value;
  var Sex = '';
  if (document.getElementById('sv_boy').checked == true) {
    Sex = 'Nam';
  } else {
    Sex = 'Nữ';
  }
  var BirthDay = document.getElementById('sv_birth-day').value;
  var Que = document.getElementById('sv_hometown').value;
  var Lop = document.getElementById('sv_class').value;

  $.ajax({
    type: 'POST',
    url: ip + '/SinhVien', //Tên servlet
    data: {
      MaSV: MSSV,
      TenSV: Name,
      GioiTinh: Sex,
      NgaySinh: BirthDay,
      QueQuan: Que,
      MaLop: Lop,
    },
  });
}
function Load1(data) {
  $.ajax({
    type: 'Get',
    url: ip + '/Sinhvien/' + data, //Tên servlet
    success: function (result) {
      console.log(result);
      if (result[0].GioiTinh == 'Nam') {
        document.getElementById('sv_boy1').checked = true;
      } else {
        document.getElementById('sv_girl1').checked = false;
      }
      document.getElementById('sv_mssv1').value = result[0].MaSV;
      document.getElementById('sv_name1').value = result[0].TenSV;
      document.getElementById('sv_birth-day1').value = result[0].NgaySinh;
      document.getElementById('sv_hometown1').value = result[0].QueQuan;
      document.getElementById('sv_class1').value = result[0].MaLop;
    },
  });
}
function Sua() {
  console.log(123);
  var MSSV = document.getElementById('sv_mssv1').value;
  var Name = document.getElementById('sv_name1').value;
  var Sex = '';
  if (document.getElementById('sv_boy1').checked == true) {
    Sex = 'Nam';
  } else {
    Sex = 'Nữ';
  }
  var BirthDay = document.getElementById('sv_birth-day1').value;
  var Que = document.getElementById('sv_hometown1').value;
  var Lop = document.getElementById('sv_class1').value;
  $.ajax({
    type: 'PUT',
    url: ip + '/Sinhvien/' + MSSV, //Tên servlet
    data: {
      MaSV: MSSV,
      TenSV: Name,
      GioiTinh: Sex,
      NgaySinh: BirthDay,
      QueQuan: Que,
      MaLop: Lop,
    },
  });
}
function Load2(data) {
  var row = document.getElementById('Mess');
  row.innerHTML = null;
  row.innerHTML = 'Bạn có chắc muốn xóa sinh viên ' + data;
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
  console.log(data);
  $.ajax({
    type: 'Delete',
    url: ip + '/SinhVien/' + data, //Tên servlet
  });
}
function Logout() {
  document.cookie = 'name=;';
  CheckLogin();
}
