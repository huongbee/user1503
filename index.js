require('./lib/dbconnect');
const express = require('express');
const parser = require('body-parser').urlencoded({extended:false})
const flash = require('connect-flash'); 
const session = require('express-session');
const cookieParser = require('cookie-parser');
const userRouter = require('./controllers/user.route')
const homeRouter = require('./controllers/home.route')
const { checkLogin } = require('./lib/authenticate');

const app = express()
app.set('view engine','ejs')
app.use(cookieParser())
app.use(parser)
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))
app.use(flash()) 
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
})
app.use('/',userRouter)
app.use('/',checkLogin,homeRouter)

app.listen(3000,()=>{
    console.log('Connect to port 3000');
})
