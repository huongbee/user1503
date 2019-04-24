const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/user1503',{
    useNewUrlParser: true,
    useCreateIndex:true
})
mongoose.connection
.then(()=>console.log('DB connected!'))
.catch(err=>console.log(err.message))
