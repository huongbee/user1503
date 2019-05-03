const jwt = require('jsonwebtoken')
const SECRET_KEY = 'chuoibaomatnaodo';

async function sign(obj){
    const token = await jwt.sign(obj,SECRET_KEY,{expiresIn:600})
    return token;
}
async function verify(token){
    const decoded = await jwt.verify(token,SECRET_KEY)
    return decoded;
}
module.exports = { sign, verify }
