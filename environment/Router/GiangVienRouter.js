const express = require("express")
const router = express.Router()

const GiangVienController=require('../Controller/GiangVienController');

router.get('/',GiangVienController.GetAllList);

router.post('/',GiangVienController.createNewRecord);

router.get('/:id',GiangVienController.GetOneRecord);

router.put('/:id',GiangVienController.updateRecord);

router.delete('/:id',GiangVienController.deleteRecord)

module.exports = router;