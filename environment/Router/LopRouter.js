const express = require("express")
const router = express.Router()

const LopController=require('../Controller/LopController');

router.get('/',LopController.GetAllList);

router.post('/',LopController.createNewRecord);

router.get('/:id',LopController.GetOneRecord);

router.put('/:id',LopController.updateRecord);

router.delete('/:id',LopController.deleteRecord)

module.exports = router;