const GiangVienModel = require('../Model/GiangVienModel');
exports.GetAllList = (req, res) => {
  GiangVienModel.Get().then((result) => {
    // console.log(result);
    // console.log('this permission' + result.Items);
    res.json(result.Items);
  });
};
exports.createNewRecord = (req, res) => {
  let GiangVienReqData = req.body;
  // console.log(GiangVienReqData)
  GiangVienModel.Create(GiangVienReqData).then((result) => {
    // console.log(result);
    res.status(201).json(result);
  });
};
exports.GetOneRecord = (req, res) => {
  const ID = req.params.id;
  GiangVienModel.GetById(ID).then((result) => {
    // console.log(result);
    res.json(result.Items);
  });
};
exports.updateRecord = (req, res) => {
  let GiangVienReqData = req.body;
  const ID = req.params.id;
  //  console.log(GiangVienReqData)
  GiangVienModel.Update(ID, GiangVienReqData).then((result) => {
    // console.log(result);
    res.status(200).json(result);
  });
};
exports.deleteRecord = (req, res) => {
  const ID = req.params.id;
  GiangVienModel.Delete(ID).then((result) => {
    // console.log(result);
    res.status(200).json(result);
  });
};
