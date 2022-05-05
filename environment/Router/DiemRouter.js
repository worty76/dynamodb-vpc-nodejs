const express = require("express")
const router = express.Router()

const DiemController=require('../Controller/DiemController');

router.get('/',DiemController.GetAllList);

router.post('/',DiemController.createNewRecord);

router.get('/:mamon/:masv',DiemController.GetOneRecord);

router.get('/:mamon',DiemController.GetOneRecord1);

router.put('/:mamon/:masv',DiemController.updateRecord);

router.delete('/:mamon/:masv',DiemController.deleteRecord)

module.exports = router;