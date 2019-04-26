const bcrypt = require('bcrypt');

function hash(password){
    // return bcrypt.hashSync(password,10);
    return new Promise((resolve, reject)=>{
        bcrypt.hash(password, 10)
        .then(hash=>resolve(hash))
        .catch(err=>reject(err))
    })
}

function compare(password, hash){
    return new Promise((resolve, reject)=>{
        bcrypt.compare(password, hash)
        .then(result=>resolve(result))
        .catch(err=>reject(err))
    })
}

module.exports = { hash, compare }