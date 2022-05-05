const express = require("express")
const router = express.Router()

const MonHocController=require('../Controller/MonHocController');

router.get('/',MonHocController.GetAllList);

router.post('/',MonHocController.createNewRecord);

router.get('/:id',MonHocController.GetOneRecord);

router.put('/:id',MonHocController.updateRecord);

router.delete('/:id',MonHocController.deleteRecord)

module.exports = router;