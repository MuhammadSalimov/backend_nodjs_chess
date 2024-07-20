const BaseError = require("../error/base.error")
const tokenService = require("../services/token.service")

module.exports = function (req,res,next){
  try {
    const authorization = req.headers.authorization
    const accessToken = authorization.split(" ")[1]

    if(!accessToken) {
      return  next(BaseError.UnauthorizedError())
    }
    const userData = tokenService.validateAccessToken(accessToken)
    if(!userData){
      return  next(BaseError.UnauthorizedError())
    }
    req.user = userData
    next()
  } catch (error) {
   return  next(BaseError.UnauthorizedError())
  }
}