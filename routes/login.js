const express = require('express')
const router = express.Router()
const loginController = require('../controllers/login')
const {ensureAuth, ensureGuest} = require('../middleware/auth')

const Routine = require('../models/Routine')

router.get('/', ensureGuest, loginController.getIndex) 

router.get('/', (req, res)=>{
    res.render('login',{
        layout: 'login'
    })
})

module.exports = router