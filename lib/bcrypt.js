const bcrypt = require('bcrypt');

function hash(password){
    // return bcrypt.hashSync(password,10);
    return new Promise((resolve, reject)=>{
        bcrypt.hash(password, 10)
        .then(hash=>resolve(hash))
        .catch(err=>reject(err))
    })
}
// console.log(hash(12345));

function compare(password, hash){
    return new Promise((resolve, reject)=>{
        bcrypt.compare(password, hash)
        .then(result=>resolve(result))
        .catch(err=>reject(err))
    })
}

// hash('1234')
// .then(pwHash=>console.log(pwHash))
// .catch(err=>console.log(err.message))

// compare('1234','$2b$10$fFpjVuM.ANtagkpu6pTT0uy.1CN0/X9vcEj60EULc4oSl.ZtZU3.S')
// .then(r=>console.log(r))
// .catch(e=>console.log(e.message))

module.exports = { hash, compare }