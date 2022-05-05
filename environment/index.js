const express = require('express');
const bodyParser = require('body-parser');
var cors=require('cors');
var cookieParser = require('cookie-parser');
const path = require('path')
var router = express.Router();

const port = 8080;
const app = express();

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cookieParser())
app.use(cors());

app.use('/public',express.static(path.join(__dirname,"public")))


const KhoaRouter=require('./Router/KhoaRouter')
app.use('/khoa',KhoaRouter);

const LopRouter=require('./Router/LopRouter')
app.use('/lop',LopRouter);

const SinhVienRouter=require('./Router/SinhVienRouter')
app.use('/SinhVien',SinhVienRouter);

const GiangVienRouter=require('./Router/GiangVienRouter')
app.use('/GiangVien',GiangVienRouter);

const MonHocRouter=require('./Router/MonHocRouter')
app.use('/MonHoc',MonHocRouter);

const PhanCongRouter=require('./Router/PhanCongRouter')
app.use('/PhanCong',PhanCongRouter);

const DiemRouter=require('./Router/DiemRouter')
app.use('/Diem',DiemRouter);


const AccountRouter=require('./Router/AccountRouter')
app.use('/account',AccountRouter);


const RouterPage=require('./Router/Routerpage')
app.use('/',RouterPage)


console.log(`Orders service listening on port ${port}`);
app.listen(port);