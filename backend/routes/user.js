const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')

const userCtrl = require('../controllers/userCtrl')

router.post('/signup',userCtrl.signup) // Sign In
router.post('/login',userCtrl.login) // Log In

router.get('/count',auth.admin,userCtrl.Count)
router.get('/profile',auth.all,userCtrl.userProfil)
router.get('/profile/:id',auth.all,userCtrl.userProfilById)
router.get('/profiles',auth.all,userCtrl.userProfils)
router.get('/profiles/moderate',auth.admin,userCtrl.userToModerate)

router.put('/profile',auth.all,userCtrl.userModif)
router.put('/profile/:id',auth.admin,userCtrl.moderate)

router.delete('',auth.all,userCtrl.selfDelete)
router.delete('/one/:id',auth.admin,userCtrl.delete)

module.exports = router
