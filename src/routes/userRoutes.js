const express = require('express');
const { homePage, search } = require('../controllers/userController');
const router = express.Router()


router.get('/homePage',homePage)
router.get('/search',search)
module.exports = router;