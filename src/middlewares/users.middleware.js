const BaseError = require("../error/base.error")

class ControllerMiddlewares{
  isActiveted (req ,__ ,next){
    const {isActivated} = req.userData
    if(isActivated == false) return next(BaseError.BadRequest("confirm your email" , "user is not activited"))
    next()
  }
  isAdmin (req , __ , next){
    const {role} = req.userData
    if(!(role =='admin')) return next(BaseError.BadRequest("" , "role is not admin"))
    next()
  }
}

module.exports = new ControllerMiddlewares