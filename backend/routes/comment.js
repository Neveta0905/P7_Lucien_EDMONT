const express = require('express')
const router = express.Router();

const commmentCtrl = require('../controllers/commentCtrl')
const auth = require('../middleware/auth')

router.get('',auth.all,commmentCtrl.getAll)
router.get('/count',auth.admin,commmentCtrl.Count)
router.get('/moderate',auth.admin,commmentCtrl.getToModerate)
router.get('/:id',auth.all,commmentCtrl.getOne)

router.post('',auth.all,commmentCtrl.send)

router.put('/:id',auth.all,commmentCtrl.moderate)

router.delete('/:id',auth.admin,commmentCtrl.delete)
module.exports = router