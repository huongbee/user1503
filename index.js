const express = require('express');
const app = express()
app.set('view engine','ejs')

app.get('/signup',(req,res)=>{
    res.render('signup');
})

app.listen(3000,()=>{
    console.log('Connect to port 3000');
})