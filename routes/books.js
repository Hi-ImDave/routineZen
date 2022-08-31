const express = require('express')
const router = express.Router()
const booksController = require('../controllers/books')
const {ensureAuth, ensureGuest} = require('../middleware/auth')


router.get('/', ensureAuth, booksController.getBooks)

router.post('/createBook', booksController.createBook)

router.put('/bookComplete', booksController.bookComplete)

router.put('/markUnread', booksController.bookIncomplete)

router.delete('/deleteBook', booksController.deleteBook)

module.exports = router