const express = require('express');
const router = express.Router();

const GiangVienController = require('../Controller/AccountController');

router.get('/account', GiangVienController.GetAllList);
router.post('/account', GiangVienController.createNewRecord);
router.get('/', GiangVienController.GetAllList);

router.post('/', GiangVienController.createNewRecord);

router.get('/:username/:password', GiangVienController.GetOneRecord);

router.put('/:id/:id1', GiangVienController.updateRecord);

router.put('/change/:id/:id1', GiangVienController.updateRecord1);

router.delete('/:id', GiangVienController.deleteRecord);

module.exports = router;
