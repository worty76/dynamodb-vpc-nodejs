const express = require("express")
const router = express.Router()

const DiemController=require('../Controller/PhanCongController');

router.get('/',DiemController.GetAllList);

router.get('/:magv',DiemController.GetOneRecord1);

router.post('/',DiemController.createNewRecord);

router.get('/:mamon/:magv/:malop',DiemController.GetOneRecord);

router.put('/:mamon/:magv/:malop',DiemController.updateRecord);

router.delete('/:mamon/:magv/:malop',DiemController.deleteRecord)

module.exports = router;