const express = require('express')
const router = express.Router()
const loginController = require('../controllers/login')
const {ensureAuth, ensureGuest} = require('../middleware/auth')

router.get('/', ensureGuest, loginController.getIndex) 

router.get('/', (req, res)=>{
    res.render('login',{
        layout: 'login'
    })
})

module.exports = router