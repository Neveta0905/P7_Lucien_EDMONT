const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')

const postCtrl = require('../controllers/postCtrl')

router.get('',auth.all,postCtrl.getAll)
router.get('/one/:id',auth.all,postCtrl.getOne)
router.get('/moderated',auth.all,postCtrl.getModerated)
router.get('/moderated/:limit',auth.all,postCtrl.getModerated)
router.get('/moderate',auth.admin,postCtrl.getToModerate)
router.get('/count',auth.admin,postCtrl.count)
router.post('',auth.all,postCtrl.create)
router.put('/:id',auth.admin,postCtrl.moderate)
router.delete('/:id',auth.admin,postCtrl.delete)

module.exports = router
