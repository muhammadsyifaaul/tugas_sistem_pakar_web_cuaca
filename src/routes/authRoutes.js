const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

router.get('/', (req,res) => {
    res.redirect('/register')
})

router.get('/register',(req,res) => {
    res.render('auth/register')
})

router.get('/login',(req,res) => {
    res.render('auth/login')
})

router.post('/register',register)
router.post('/login',login)
module.exports = router