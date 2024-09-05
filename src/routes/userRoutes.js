const express = require('express');
const { homePage } = require('../controllers/userController');
const router = express.Router()


router.get('/homePage',homePage)

module.exports = router;