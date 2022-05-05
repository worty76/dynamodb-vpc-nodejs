const LopModel = require('../Model/LopModel');
exports.GetAllList = (req, res) => {
  LopModel.Get().then((result) => {
    // console.log(result);
    res.json(result.Items);
  });
};
exports.createNewRecord = (req, res) => {
  let LopReqData = req.body;
  // console.log(LopReqData)
  LopModel.Create(LopReqData).then((result) => {
    // console.log(result);
    res.status(201).json(result);
  });
};
exports.GetOneRecord = (req, res) => {
  const ID = req.params.id;
  LopModel.GetById(ID).then((result) => {
    // console.log(result);
    res.json(result.Items);
  });
};
exports.updateRecord = (req, res) => {
  let LopReqData = req.body;
  const ID = req.params.id;
  const Lop = req.body.TenLop;
  const Khoa = req.body.MaKhoa;
  //  console.log(LopReqData)
  LopModel.Update(ID, Lop, Khoa).then((result) => {
    // console.log(result);
    res.status(200).json(result);
  });
};
exports.deleteRecord = (req, res) => {
  const ID = req.params.id;
  LopModel.Delete(ID).then((result) => {
    // console.log(result);
    res.status(200).json(result);
  });
};
