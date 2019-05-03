const { verify } = require('./jwt');

function checkLogin(req, res, next){
    const token = req.cookies.token
    if(!token){
        req.flash('error_msg', 'Please login first!' );
        return res.redirect('/signin')
    }
    verify(token)
    .then(decoded=>{
        res.locals.userId = decoded._id
        next();
    })
    .catch(err=>{
        req.flash('error_msg', err.message);
        res.redirect('/signin')
    })
}
module.exports = { checkLogin }