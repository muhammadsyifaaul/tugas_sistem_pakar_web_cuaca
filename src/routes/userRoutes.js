const express = require('express');
const { homePage, search, surveiPage, olahDataCuaca } = require('../controllers/userController');
const router = express.Router()


router.get('/homePage',homePage)
router.get('/search',search)
router.get('/surveiPage',surveiPage)
router.post('/olahData',olahDataCuaca)
module.exports = router;