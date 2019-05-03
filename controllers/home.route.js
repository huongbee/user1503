const express = require('express');
const route = express.Router();
const { UserModel } = require('../models/User');

route.get('/',(req,res)=>{
    const userId = res.locals.userId
    UserModel.findById(userId)
    .then(user=>{
        if(!user){
            req.flash('error_msg', 'Cannot find user!');
            return res.redirect('/signin')
        }
        return res.render('home', { fullname: user.fullname});
    })
});
route.get('/test',(req,res)=>{

})
module.exports = route

