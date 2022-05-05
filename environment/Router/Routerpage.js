const express = require("express")
const router = express.Router()

router.get('/login',function(req,res){
    console.log(__dirname)
    res.sendFile(__dirname +'/Client/Login.html')
})
router.get('/',function(req,res){
    console.log(__dirname)
    res.sendFile(__dirname +'/Client/student.html')
})
router.get('/dsKhoa',function(req,res){
    console.log(__dirname)
    res.sendFile(__dirname +'/Client/Khoa.html')
})
router.get('/changepass',function(req,res){
    console.log(__dirname)
    res.sendFile(__dirname +'/Client/ChangePass.html')
})
router.get('/changepass1',function(req,res){
    console.log(__dirname)
    res.sendFile(__dirname +'/Client/ChangePass1.html')
})
router.get('/class',function(req,res){
    console.log(__dirname)
    res.sendFile(__dirname +'/Client/class.html')
})
router.get('/permissionaccount',function(req,res){
    console.log(__dirname)
    res.sendFile(__dirname +'/Client/permissionaccount.html')
})
router.get('/assignment',function(req,res){
    console.log(__dirname)
    res.sendFile(__dirname +'/Client/PhanCong.html')
})
router.get('/Subject',function(req,res){
    console.log(__dirname)
    res.sendFile(__dirname +'/Client/subject.html')
})
router.get('/teacher',function(req,res){
    console.log(__dirname)
    res.sendFile(__dirname +'/Client/teacher.html')
})
router.get('/listclass',function(req,res){
    console.log(__dirname)
    res.sendFile(__dirname +'/Client/LopDay.html')
})
router.get('/score',function(req,res){
    console.log(__dirname)
    res.sendFile(__dirname +'/Client/score.html')
})
module.exports = router;