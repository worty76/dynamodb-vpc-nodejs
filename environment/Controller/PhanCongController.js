const DiemModel = require('../Model/PhanCongModel');
exports.GetAllList = (req, res) => {
  DiemModel.Get().then((result) => {
    // console.log(result);
    res.json(result.Items);
  });
};
exports.createNewRecord = (req, res) => {
  let DiemReqData = req.body;
  // console.log(DiemReqData)
  DiemModel.Create(DiemReqData).then((result) => {
    // console.log(result);
    res.status(201).json(result);
  });
};
exports.GetOneRecord = (req, res) => {
  const MaMon = req.params.mamon;
  const MaGV = req.params.magv;
  const MaLop = req.params.malop;
  DiemModel.GetById(MaGV, MaLop, MaMon).then((result) => {
    // console.log(result);
    res.json(result.Items);
  });
};

exports.GetOneRecord1 = (req, res) => {
  const MaGV = req.params.magv;
  DiemModel.GetByMaSV(MaGV).then((result) => {
    // console.log(result);
    res.json(result.Items);
  });
};

exports.updateRecord = (req, res) => {
  const MaMon = req.params.mamon;
  const MaGV = req.params.magv;
  const MaLop = req.params.malop;
  DiemModel.Update(MaGV, MaMon, MaLop).then((result) => {
    // console.log(result);
    res.status(200).json(result);
  });
};
exports.deleteRecord = (req, res) => {
  const MaMon = req.params.mamon;
  const MaGV = req.params.magv;
  const MaLop = req.params.malop;
  DiemModel.Delete(MaGV, MaMon, MaLop).then((result) => {
    // console.log(result);
    res.status(200).json(result);
  });
};
