const BaseError = require("../error/base.error")

class ControllerMiddlewares{
  isActiveted (req ,__ ,next){
    const {isActivated} = req.userData
    if(isActivated == false) return next(BaseError.BadRequest("confirm your email" , "user is not activited"))
    next()
  }
  isAdmin (req , __ , next){
    try {
      const {role} = req.user
    if(!(role =='admin')) return next(BaseError.BadRequest("" , "role is not admin"))
    next()
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ControllerMiddlewares