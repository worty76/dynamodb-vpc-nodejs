const dotenv = require('dotenv');
dotenv.config({ path: '../../../.env' });

let ip = process.env.IP;
   
   function LoadData()
    {
        $.ajax({
            type: "GET",
            url: ip+"/MonHoc/", //Tên servlet
            success:function (result){
                console.log(result)
                var row = document.getElementById("ROW1")
                row.innerHTML = null;
                var htmlString=``;
                let total=result.length
                for(let item in result)
                {
                    var total1=item-'-1'
                    let total2=total-item-1
                htmlString+=`<tr>
                                <th scope="row">`+(total1)+`</th>
                                <td>`+result[total2].MaMon+`</td>
                                <td>`+result[total2].TenMon+`</td>
                                <td>`+result[total2].TinChi+`</td>
                                <td>`+result[total2].SoTiet+`</td>
                                <td class="text-center">
                                    <!-- Button EDIT-->
                                    <button type="button" class="btn btn-outline-danger py-1" onclick="Load1('`+result[total2].MaMon+`')" data-bs-toggle="modal"
                                        data-bs-target="#edit-modal"><i class='bx bx-pen'></i> Sửa
                                    </button>
                                    <!-- EDIT Modal -->
                                    
                                    <!-- Button DELETE -->
                                    <button type="button" class="btn btn-outline-warning py-1" data-bs-toggle="modal"
                                        data-bs-target="#staticBackdrop" onclick="Load2('`+result[total2].MaMon+`')">
                                        <i class='bx bx-x'></i>Xóa
                                    </button>
                                    <!-- DELETE Modal -->
                                    
                                </td>
                            </tr>`
                            $('#ROW1').html(htmlString);
                        }
            }
        })
    }
    function CheckLogin()
    {
        var allcookies = document.cookie;
        cookiearray = allcookies.split(';');
        var value = cookiearray[0].split('=')[1];
        console.log(value)
        if(value==null||value=='')
        {
            window.location="/login"
        }
        else{
            $.ajax({
            type: "Get",
            url: "http://3.239.174.40:8080/GiangVien/"+value, //Tên servlet
            success:function (result){
                console.log(result)
                var row = document.getElementById("HI")
                row.innerHTML = null;
                row.innerHTML="Hi! "+result[0].MaGV
                }
            })
        }
        
    }
    $(document).ready(function(){
        LoadData()
        CheckLogin()
    })
    
    function Them()
    {
        var MaMon=document.getElementById('mamon').value
        var TenMon=document.getElementById('tenmon').value
        var TinChi=document.getElementById('tinchi').value
        var SoTiet=document.getElementById('sotiet').value
        
        $.ajax({
            type: "POST",
            url: ip+"/MonHoc", //Tên servlet
            data: {"MaMon":MaMon,"TenMon":TenMon,"TinChi":TinChi,"SoTiet":SoTiet}
        })
    }
    function Load1(data)
    {
        $.ajax({
            type: "Get",
            url: ip+"/MonHoc/"+data, //Tên servlet
            success:function (result){
                console.log(result)
                document.getElementById('mamon1').value=result[0].MaMon
                document.getElementById('tenmon1').value=result[0].TenMon
                document.getElementById('tinchi1').value=result[0].TinChi
                document.getElementById('sotiet1').value=result[0].SoTiet
            }
        })
    }
    function Sua()
    {
        var MaMon=document.getElementById('mamon1').value
        var TenMon=document.getElementById('tenmon1').value
        var TinChi=document.getElementById('tinchi1').value
        var SoTiet=document.getElementById('sotiet1').value
        
        $.ajax({
            type: "PUT",
            url: ip+"/MonHoc/"+MaMon, //Tên servlet
            data: {"MaMon":MaMon,"TenMon":TenMon,"TinChi":TinChi,"SoTiet":SoTiet}
        })
    }
    function Load2(data)
    {
        var row = document.getElementById("Mess")
        row.innerHTML = null;
        row.innerHTML="Bạn có chắc muốn xóa môn học "+ data;
        var row1 = document.getElementById("button")
        row1.innerHTML = null;
        row1.innerHTML = `<button type="button" class="btn btn-danger"
                                                        data-bs-dismiss="modal">Không</button>
                          <button type="button" class="btn btn-primary" onclick="Xoa('`+data+`')" data-bs-dismiss="modal">Xác nhận</button>`

    }
    function Xoa(data)
    {
        console.log(data);
        $.ajax({
            type: "Delete",
            url: ip+"/monhoc/"+data, //Tên servlet
        })
    }
    function Logout()
    {
        document.cookie = "name=;"
        CheckLogin()
    }