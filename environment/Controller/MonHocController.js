const MonHocModel = require('../Model/MonHocModel');
exports.GetAllList = (req, res) => {
  MonHocModel.Get().then((result) => {
    console.log(result);
    res.json(result.Items);
  });
};
exports.createNewRecord = (req, res) => {
  let MonHocReqData = req.body;
  // console.log(MonHocReqData)
  MonHocModel.Create(MonHocReqData).then((result) => {
    console.log(result);
    res.status(201).json(result);
  });
};
exports.GetOneRecord = (req, res) => {
  const ID = req.params.id;
  MonHocModel.GetById(ID).then((result) => {
    console.log(result);
    res.json(result.Items);
  });
};
exports.updateRecord = (req, res) => {
  let MonHocReqData = req.body;
  const ID = req.params.id;
  console.log(MonHocReqData);
  MonHocModel.Update(ID, MonHocReqData).then((result) => {
    console.log(result);
    res.status(200).json(result);
  });
};
exports.deleteRecord = (req, res) => {
  const ID = req.params.id;
  MonHocModel.Delete(ID).then((result) => {
    console.log(result);
    res.status(200).json(result);
  });
};
