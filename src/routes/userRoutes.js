const express = require('express')
const router = express.Router()


router.get('/homePage',(req,res) => {
    res.render('main/index')
})

module.exports = router;