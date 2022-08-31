const Books = require('../models/Books')
const User = require('../models/User')
const {ensureAuth, ensureGuest} = require('../middleware/auth')


module.exports = {
    getBooks: async (req,res)=>{
        try{
            const bookItems = await Books.find({user: req.user.id}).lean()
            const booksRead = await Books.countDocuments({user: req.user.id, completed: true})
            const booksUnread = await Books.countDocuments({user: req.user.id, completed: false})
            res.render('books.ejs', {
                name: `${req.user.firstName} ${req.user.lastName}`,
                books: bookItems, 
                read: booksRead,
                unread: booksUnread
            })
        }catch(err){
            console.log(err)
        }
    },
    createBook: async (req, res)=>{
        try {   
            const bookItems = await Books.find({user: req.user.id})
            const hasBook = await bookItems.some((book) => book.bookName.toLowerCase() === req.body.bookItem.toLowerCase() && book.user == req.user.id)
            if(hasBook){
                console.log(`${req.body.bookItem} already exists!`)
                res.redirect('/books') 
            } else {
                // use this commented out block of code if you want to capatalize every first letter of strings with multiple words
                // const newRoutine = req.body.routineItem.split(' ').length > 1 
                // ? req.body.routineItem.split(' ').map((word) => word[0].toUpperCase() + word.substring(1)).join(' ') 
                // : req.body.routineItem[0].toUpperCase() + req.body.routineItem.substring(1)
                const newBook = req.body.bookItem[0].toUpperCase() + req.body.bookItem.substring(1) // only capatalizes first letter of first word
                const newAuthor = req.body.authorName
                const pageCount = req.body.pageCount
                await Books.create({bookName: newBook, author: newAuthor, pageCount: pageCount, user: req.user.id, completed: false})
                console.log(`"${newBook}" has been added to your book list!`)
                res.redirect('/books') 
            }    
        } catch(err){
            console.log(err)
        }  
    },
    bookComplete: async (req, res)=>{
        try{
            await Books.findOneAndUpdate({_id:req.body.bookIdFromJSFile},{
                completed: true
            })
            console.log('Book Finished')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    bookIncomplete: async (req, res)=>{
        try{
            await Books.findOneAndUpdate({_id:req.body.bookIdFromJSFile},{
                completed: false
            })
            console.log('Marked Unread')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteBook: async (req, res)=>{
        try{
            await Books.findOneAndDelete({_id:req.body.bookIdFromJSFile})
            console.log('Deleted Book')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    