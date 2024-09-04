const express = require('express')
const router = express.Router()
const User = require('../models/UserModel')
const authController = require('../controllers/authController')


router.get('/homePage',(req,res) => {
    res.render('main/index')
})

module.exports = router;