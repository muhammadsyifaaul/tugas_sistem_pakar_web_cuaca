const express = require('express');
const { homePage, search, surveiPage, olahDataCuaca, logout } = require('../controllers/userController');
const router = express.Router()


router.get('/homePage',homePage)
router.get('/search',search)
router.get('/surveiPage',surveiPage)
router.post('/olahData',olahDataCuaca)
router.post('/logout',logout)
module.exports = router;