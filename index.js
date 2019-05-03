require('./lib/dbconnect');
const express = require('express');
const parser = require('body-parser').urlencoded({extended:false})
const {UserModel} = require('./models/User')
const { hash, compare } = require('./lib/bcrypt');
const { sign, verify} = require('./lib/jwt');
const { checkLogin } = require('./lib/authenticate');
const flash = require('connect-flash'); 
const session = require('express-session');
const cookieParser = require('cookie-parser');
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
app.get('/signup',(req,res)=>{
    res.render('signup');
})
app.post('/signup',(req,res)=>{
    const {email, fullname, password, password_comfirmation} = req.body
    if(password != password_comfirmation){
        req.flash('error_msg','Password not match!');
        res.redirect('/signup')
    }
    hash(password)
    .then(passwordHash => {
        return UserModel.create({
            email, fullname, password: passwordHash
        })
    })
    .then((user)=>{
        console.log(user)
        res.redirect('/signin');
    })
    .catch(err=>{
        // req.flash('error_msg',err.message);
        req.flash('error_msg', 'Email existed!');
        res.redirect('/signup')
    })
});
app.get('/signin',(req,res)=>{
    res.render('signin')
})
app.post('/signin',(req,res)=>{
    const { email, password } = req.body;
    UserModel.findOne({email})
    .then(user=>{
        if(!user){
            req.flash('error_msg', 'User not found!');
            return res.redirect('/signin')
        }
        compare(password, user.password)
        .then(result=>{
            if(!result){
                req.flash('error_msg', 'Invalid password!');
                return res.redirect('/signin')
            }
            // sign jwt
            sign({_id: user._id})
            .then(token=>{
                // save token into cookie
                // 1 min
                return res.cookie('token',token,{maxAge: 600000}).redirect('/');
            })
            .catch(err=>{
                req.flash('error_msg', 'Try again!' );
                return res.redirect('/signin')
            })
        })
    })
    .catch(err=>{
        req.flash('error_msg', err.message);
        res.redirect('/signin')
    })
})
app.get('/',checkLogin,(req,res)=>{
    // return UserModel.findById(userId)
    return res.render('home', { fullname: 'Huong'});
});
app.get('/logout',checkLogin,(req,res)=>{
    res.clearCookie('token').redirect('/signin');
})

app.listen(3000,()=>{
    console.log('Connect to port 3000');
})
