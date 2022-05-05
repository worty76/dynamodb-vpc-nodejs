const SinhVienModel = require('../Model/SinhVienModel');
exports.GetAllList = (req, res) => {
  SinhVienModel.Get().then((result) => {
    // console.log(result);
    res.json(result.Items);
  });
};
exports.createNewRecord = (req, res) => {
  let SinhVienReqData = req.body;
  // console.log(SinhVienReqData)
  SinhVienModel.Create(SinhVienReqData).then((result) => {
    // console.log(result);
    res.status(201).json(result);
  });
};
exports.GetOneRecord = (req, res) => {
  const ID = req.params.id;
  SinhVienModel.GetById(ID).then((result) => {
    // console.log(result);
    res.json(result.Items);
  });
};

exports.GetOneRecord1 = (req, res) => {
  const ID = req.params.id;
  SinhVienModel.GetById1(ID).then((result) => {
    // console.log(result);
    res.json(result.Items);
  });
};

exports.updateRecord = (req, res) => {
  let SinhVienReqData = req.body;
  const ID = req.params.id;
  //  console.log(SinhVienReqData)
  SinhVienModel.Update(ID, SinhVienReqData).then((result) => {
    // console.log(result);
    res.status(200).json(result);
  });
};
exports.deleteRecord = (req, res) => {
  const ID = req.params.id;
  SinhVienModel.Delete(ID).then((result) => {
    // console.log(result);
    res.status(200).json(result);
  });
};
