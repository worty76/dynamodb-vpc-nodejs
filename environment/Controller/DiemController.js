const DiemModel = require('../Model/DiemModel');
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
  const ID = req.params.mamon;
  const ID1 = req.params.masv;
  DiemModel.GetById(ID, ID1).then((result) => {
    // console.log(result);
    res.json(result.Items);
  });
};

exports.GetOneRecord1 = (req, res) => {
  const ID = req.params.mamon;
  DiemModel.GetById1(ID).then((result) => {
    // console.log(result);
    res.json(result.Items);
  });
};

exports.updateRecord = (req, res) => {
  let DiemReqData = req.body;
  const ID = req.params.mamon;
  const ID1 = req.params.masv;
  //  console.log(DiemReqData)
  DiemModel.Update(ID, ID1, DiemReqData).then((result) => {
    // console.log(result);
    res.status(200).json(result);
  });
};
exports.deleteRecord = (req, res) => {
  const ID = req.params.mamon;
  const ID1 = req.params.masv;
  DiemModel.Delete(ID, ID1).then((result) => {
    // console.log(result);
    res.status(200).json(result);
  });
};
