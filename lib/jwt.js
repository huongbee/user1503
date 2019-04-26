const jwt = require('jsonwebtoken')
const SECRET_KEY = 'chuoibaomatnaodo';

async function sign(obj){
    const token = await jwt.sign(obj,SECRET_KEY,{expiresIn:60})
    return token;
}
async function verify(token){
    const decoded = await jwt.verify(token,SECRET_KEY)
    return decoded;
}
//ObjectId("5cc2e5d7ccbcf2041151d9b6")
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2MyZTVkN2NjYmNmMjA0MTE1MWQ5YjYiLCJpYXQiOjE1NTYyODEzOTksImV4cCI6MTU1NjI4MTQ1OX0.E4vJz2n02-EC32V5RaKgFhEqpNCkPwxpN5AvM8wt6kw'

// const objUser = {_id:'5cc2e5d7ccbcf2041151d9b6'}
// sign(objUser)
// .then(token=>console.log({token}))
// .catch(err=>console.log(err.message))

// verify(token)
// .then(decoded=>console.log({decoded}))
// .catch(err=>console.log({error: err.message}))

// { _id: '5cc2e5d7ccbcf2041151d9b6',
// iat: 1556281399,
// exp: 1556281459 } 