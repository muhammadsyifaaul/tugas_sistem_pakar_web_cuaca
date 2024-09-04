const express = require('express');
const { register, login } = require('../controllers/authController');
const { checkSession } = require('../middlewares/middleware');
const router = express.Router();

router.get('/', checkSession)

router.get('/register',(req,res) => {
    res.render('auth/register')
})

router.get('/login',(req,res) => {
    res.render('auth/login')
})

router.post('/register',register)
router.post('/login',login)
module.exports = router