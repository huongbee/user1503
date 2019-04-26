require('./lib/dbconnect');
const express = require('express');
const parser = require('body-parser').urlencoded({extended:false})
const {UserModel} = require('./models/User')
const { hash, compare } = require('./lib/bcrypt');
const app = express()
app.set('view engine','ejs')
app.use(parser)

app.get('/signup',(req,res)=>{
    res.render('signup');
})
app.post('/signup',(req,res)=>{
    const {email, fullname, password, password_comfirmation} = req.body
    if(password != password_comfirmation)
        return res.send({'error':'Password not match!'});
    hash(password)
    .then(passwordHash=>{
        return UserModel.create({
            email, fullname, password: passwordHash
        })
    })
    .then((user)=>{
        console.log(user)
        res.redirect('/signin');
    })
    .catch(err=>{
        res.send('error',err.message)
    })
});
app.get('/signin',(req,res)=>{
    res.render('signin')
})

app.listen(3000,()=>{
    console.log('Connect to port 3000');
})