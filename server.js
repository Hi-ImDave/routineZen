const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/database')

const authRoutes = require('./routes/auth')
const homeRoutes = require('./routes/home')
const loginRoutes = require('./routes/login')
const routineRoutes = require('./routes/routines')
const bookRoutes = require('./routes/books')

dotenv.config({path: './config/.env'})

require('./config/passport')(passport)
connectDB()

const app = express()

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

const PORT = process.env.PORT || 5000
const SESSION_SECRET = process.env.SESSION_SECRET

app.set('view engine', 'ejs')

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.DB_STRING})
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', loginRoutes)
app.use('/auth', authRoutes)
app.use('/home', homeRoutes)
app.use('/routines', routineRoutes)
app.use('/books', bookRoutes)
 
app.listen(PORT, ()=>{
    console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`)
})    