const KhoaModel = require('../Model/KhoaModel');
exports.GetAllList = (req, res) => {
  KhoaModel.Get().then((result) => {
    // console.log(result);
    res.json(result.Items);
  });
};
exports.createNewRecord = (req, res) => {
  let KhoaReqData = req.body;
  // console.log(KhoaReqData)
  KhoaModel.Create(KhoaReqData).then((result) => {
    // console.log(result);
    res.status(201).json(result);
  });
};
exports.GetOneRecord = (req, res) => {
  const ID = req.params.id;
  KhoaModel.GetById(ID).then((result) => {
    // console.log(result);
    res.json(result.Items);
  });
};
exports.updateRecord = (req, res) => {
  let KhoaReqData = req.body;
  const ID = req.params.id;
  const Khoa = req.body.TenKhoa;
  KhoaModel.Update(ID, Khoa).then((result) => {
    // console.log(result);
    res.status(200).json(result);
  });
};
exports.deleteRecord = (req, res) => {
  const ID = req.params.id;
  KhoaModel.Delete(ID).then((result) => {
    // console.log(result);
    res.status(200).json(result);
  });
};
