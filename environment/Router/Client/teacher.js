const dotenv = require('dotenv');
dotenv.config({ path: '../../../.env' });

let ip = process.env.IP;

function LoadData() {
  $.ajax({
    type: 'GET',
    url: ip + '/GiangVien/', //Tên servlet
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
          result[total2].MaGV +
          `</td>
                                <td>` +
          result[total2].TenGV +
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
          result[total2].MaKhoa +
          `</td>
                                <td class="text-center">
                                    <!-- Button EDIT-->
                                    <button type="button" class="btn btn-outline-danger py-1" onclick="Load1('` +
          result[total2].MaGV +
          `')" data-bs-toggle="modal"
                                        data-bs-target="#edit-modal"><i class='bx bx-pen'></i> Sửa
                                    </button>
                                    <!-- EDIT Modal -->
                                    
                                    <!-- Button DELETE -->
                                    <button type="button" class="btn btn-outline-warning py-1" data-bs-toggle="modal"
                                        data-bs-target="#staticBackdrop" onclick="Load2('` +
          result[total2].MaGV +
          `')">
                                        <i class='bx bx-x'></i>Xóa
                                    </button>
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
    url: ip + '/GiangVien', //Tên servlet
    data: {
      MaGV: MSSV,
      TenGV: Name,
      GioiTinh: Sex,
      NgaySinh: BirthDay,
      QueQuan: Que,
      MaKhoa: Lop,
    },
  });
  $.ajax({
    type: 'POST',
    url: ip + '/account/', //Tên servlet
    data: { UserName: MSSV, PassWord: MSSV, Role: 'Teacher', User_Id: MSSV },
  });
}
function Load1(data) {
  $.ajax({
    type: 'Get',
    url: ip + '/GiangVien/' + data, //Tên servlet
    success: function (result) {
      console.log(result);
      if (result[0].GioiTinh == 'Nam') {
        document.getElementById('sv_boy1').checked = true;
      } else {
        document.getElementById('sv_girl1').checked = false;
      }
      document.getElementById('sv_mssv1').value = result[0].MaGV;
      document.getElementById('sv_name1').value = result[0].TenGV;
      document.getElementById('sv_birth-day1').value = result[0].NgaySinh;
      document.getElementById('sv_hometown1').value = result[0].QueQuan;
      document.getElementById('sv_class1').value = result[0].MaKhoa;
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
    url: ip + '/GiangVien/' + MSSV, //Tên servlet
    data: {
      MaGV: MSSV,
      TenGV: Name,
      GioiTinh: Sex,
      NgaySinh: BirthDay,
      QueQuan: Que,
      MaKhoa: Lop,
    },
  });
}
function Load2(data) {
  var row = document.getElementById('Mess');
  row.innerHTML = null;
  row.innerHTML = 'Bạn có chắc muốn xóa giảng viên ' + data;
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
    url: ip + '/GiangVien/' + data, //Tên servlet
  });
}
function Logout() {
  document.cookie = 'name=;';
  CheckLogin();
}
