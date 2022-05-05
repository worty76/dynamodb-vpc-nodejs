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
var dat3;
var mon1;
function GomMang(data) {
  for (var i in data1) {
    var temp = 0;
    for (var j in data2) {
      if (data1[i].MaSV == data2[j].MaSV) {
        temp = temp - -1;
        data.push({
          MaSV: data1[i].MaSV,
          TenSV: data1[i].TenSV,
          ChuyenCan: data2[j].DiemChuyenCan,
          QuaTrinh: data2[j].DiemGiuaKi,
          Cuoiki: data2[j].DiemCuoiKi,
        });
      }
    }
    if (temp == 0) {
      data.push({
        MaSV: data1[i].MaSV,
        TenSV: data1[i].TenSV,
        ChuyenCan: '',
        QuaTrinh: '',
        Cuoiki: '',
      });
    }
  }
  console.log(data);

  var row = document.getElementById('ROW1');
  row.innerHTML = null;
  var htmlString = ``;
  let total = data.length;
  dat3 = data;
  for (let item in data) {
    var total1 = item - '-1';
    let total2 = total - item - 1;
    htmlString +=
      `<tr>
                            <th scope="row">` +
      total1 +
      `</th>
                            <td>` +
      data[total2].MaSV +
      `</td>
                            <td>` +
      data[total2].TenSV +
      `</td>
                            <td>` +
      data[total2].ChuyenCan +
      `</td>
                            <td>` +
      data[total2].QuaTrinh +
      `</td>
                            <td>` +
      data[total2].Cuoiki +
      `</td>
                            <td class="text-center">`;
    if (
      data[total2].ChuyenCan == '' &&
      data[total2].QuaTrinh == '' &&
      data[total2].Cuoiki == ''
    ) {
      htmlString +=
        `<button type="button" class="btn btn-outline-danger py-1" data-bs-toggle="modal"
                    data-bs-target="#add-modal" onclick="Load1('` +
        total2 +
        `')"><i class='bx bx-pen'>Nhập điểm</i> 
                                </button>`;
    } else {
      htmlString +=
        `<button type="button" data-bs-toggle="modal"
                    data-bs-target="#add-modal" class="btn btn-outline-danger py-1" onclick="Load1(` +
        total2 +
        `)"><i class='bx bx-pen'>Sửa điểm</i> 
                                </button>`;
    }
    `</td>
                            </tr>`;
  }
  $('#ROW1').html(htmlString);
}
function LoadData() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const Lop = urlParams.get('Lop');
  const Mon = urlParams.get('Mon');
  mon1 = Mon;
  console.log(Lop, mon1);
  var data = [];
  $.ajax({
    type: 'Get',
    url: ip + '/sinhvien/class/' + Lop, //Tên servlet
    success: function (result) {
      data1 = result;
      console.log(data1);
      $.ajax({
        type: 'Get',
        url: ip + '/diem/' + Mon, //Tên servlet
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

function Logout() {
  document.cookie = 'name=;';
  CheckLogin();
}

function Load1(id) {
  document.getElementById('mssv').value = dat3[id].MaSV;
  document.getElementById('name').value = dat3[id].TenSV;
  document.getElementById('chuyencan').value = dat3[id].ChuyenCan;
  document.getElementById('quatrinh').value = dat3[id].QuaTrinh;
  document.getElementById('cuoiki').value = dat3[id].Cuoiki;
  var row = document.getElementById('St');
  row.innerHTML = null;
  var htmlString = ``;
  if (
    dat3[id].ChuyenCan == '' &&
    dat3[id].QuaTrinh == '' &&
    dat3[id].Cuoiki == ''
  ) {
    htmlString += `<button type="button" class="btn btn-danger"
                     data-bs-dismiss="modal">Thoát</button>
                     <button type="submit" class="btn btn-primary" onclick="Them()" data-bs-dismiss="modal">Lưu</button>`;
  } else {
    htmlString += `<button type="button" class="btn btn-danger"
                     data-bs-dismiss="modal">Thoát</button>
                     <button type="submit" class="btn btn-primary" onclick="Sua()" data-bs-dismiss="modal">Lưu</button>`;
  }
  row.innerHTML = htmlString;
}
function Them() {
  MaSV = document.getElementById('mssv').value;
  TenSV = document.getElementById('name').value;
  ChuyenCan = document.getElementById('chuyencan').value;
  QuaTrinh = document.getElementById('quatrinh').value;
  Cuoiki = document.getElementById('cuoiki').value;

  $.ajax({
    type: 'post',
    url: ip + '/diem/', //Tên servlet
    data: {
      DiemChuyenCan: ChuyenCan,
      DiemGiuaKi: QuaTrinh,
      DiemCuoiKi: Cuoiki,
      MaMon: mon1,
      MaSV: MaSV,
    },
  });
}
function Sua() {
  MaSV = document.getElementById('mssv').value;
  TenSV = document.getElementById('name').value;
  ChuyenCan = document.getElementById('chuyencan').value;
  QuaTrinh = document.getElementById('quatrinh').value;
  Cuoiki = document.getElementById('cuoiki').value;

  $.ajax({
    type: 'put',
    url: ip + '/diem/' + mon1 + '/' + MaSV + '/', //Tên servlet
    data: {
      DiemChuyenCan: ChuyenCan,
      DiemGiuaKi: QuaTrinh,
      DiemCuoiKi: Cuoiki,
    },
  });
}
