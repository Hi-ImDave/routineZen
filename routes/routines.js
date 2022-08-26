const express = require('express')
const router = express.Router()
const routinesController = require('../controllers/routines')
const {ensureAuth, ensureGuest} = require('../middleware/auth')


router.get('/', ensureAuth, routinesController.getRoutines)

router.post('/createRoutine', routinesController.createRoutine)

router.put('/markComplete', routinesController.markComplete)

router.put('/markIncomplete', routinesController.markIncomplete)

router.delete('/deleteRoutine', routinesController.deleteRoutine)

module.exports = router