const express = require('express');
const route = express.Router();
const { UserModel } = require('../models/User')
const { hash, compare } = require('../lib/bcrypt');
const { sign } = require('../lib/jwt');
const { checkLogin } = require('../lib/authenticate');

route.get('/signup',(req,res)=>{
    res.render('signup');
})

route.post('/signup',(req,res)=>{
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
route.get('/signin',(req,res)=>{
    res.render('signin')
})
route.post('/signin',(req,res)=>{
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

route.get('/logout',checkLogin,(req,res)=>{
    res.clearCookie('token').redirect('/signin');
})
module.exports = route
