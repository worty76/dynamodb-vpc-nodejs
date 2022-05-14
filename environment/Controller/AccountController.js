const GiangVienModel = require('../Model/AccountModel');
exports.GetOneRecord = (req, res) => {
  const UserName = req.params.username;
  const Password = req.params.password;
  GiangVienModel.GetById(UserName, Password).then((result) => {
    // console.log(result);
    res.json(result.Items);
  });
};
exports.GetAllList = (req, res) => {
  GiangVienModel.Get().then((result) => {
    // console.log(result);
    res.json(result.Items);
  });
};
exports.createNewRecord = (req, res) => {
  let DiemReqData = req.body;
  // console.log(DiemReqData)
  GiangVienModel.Create(DiemReqData).then((result) => {
    res.status(201).json('result');
  });
};
exports.updateRecord = (req, res) => {
  const ID = req.params.id;
  const ID1 = req.params.id1;
  GiangVienModel.Update(ID, ID1).then((result) => {
    // console.log(result);
    res.status(200).json(result);
  });
};
exports.updateRecord1 = (req, res) => {
  const ID = req.params.id;
  const ID1 = req.params.id1;
  GiangVienModel.Update1(ID, ID1).then((result) => {
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
