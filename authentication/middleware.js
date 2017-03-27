function authenticationMiddleware () {  
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/') // Redirect to login failure
  }
}

module.exports = authenticationMiddleware