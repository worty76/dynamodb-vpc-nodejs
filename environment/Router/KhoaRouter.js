const express = require("express")
const router = express.Router()

const KhoaController=require('../Controller/KhoaController');

router.get('/',KhoaController.GetAllList);

router.post('/',KhoaController.createNewRecord);

router.get('/:id',KhoaController.GetOneRecord);

router.put('/:id',KhoaController.updateRecord);

router.delete('/:id',KhoaController.deleteRecord)

module.exports = router;