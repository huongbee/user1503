require('./lib/dbconnect');
const express = require('express');
const parser = require('body-parser').urlencoded({extended:false})
const app = express()
app.set('view engine','ejs')
app.use(parser)

app.get('/signup',(req,res)=>{
    res.render('signup');
})
app.post('/signup',(req,res)=>{
    const {email, fullname, password, password_comfirmation} = req.body
    res.send({email, fullname, password, password_comfirmation})
});

app.listen(3000,()=>{
    console.log('Connect to port 3000');
})