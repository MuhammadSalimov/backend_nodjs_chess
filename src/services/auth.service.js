
const bcrypt = require("bcrypt");
const tokenService = require("./token.service");
const mailService = require("./mail.service");
const BaseError = require("../error/base.error");
const prisma = require("../utils/connection");
const UserDto = require("../dto/user.dto")
class AuthService {

  async register(email, password , name) {

    const existUser = await prisma.user.findUnique({where:{email}});
  
    if (existUser) throw BaseError.BadRequest("email already exist");

    const hashedPass = await bcrypt.hash(password, 10);
    
    const user = await prisma.user.create({
      data:{
        email,
        password:hashedPass,
        name:name
      }
    })
    const userDto =new UserDto(user)
    await mailService.sendMail(email,`${process.env.API_URL}/api/auth/activation/${userDto.id}`);

    const tokens = await tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(user.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }

  async activated(id) {

    const user = await prisma.user.findFirst({where:{id}})

    if (!user)  throw BaseError.BadRequest("User Not found");
    const activitedUser = await prisma.user.update({
      where:{id},
      data:{isActivated:true}
    })
    return activitedUser;
  }

  async login(email, password) {
    const user = await prisma.user.findUnique({where:{email}})
    
    if (!user) {
     throw BaseError.BadRequest("User is not defined");
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (! isPassword) throw BaseError.BadRequest("password is incorrect");

    const userDto = new UserDto(user);
    const tokens = await tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }

  async logout(refreshToken) {
    return await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
     return BaseError.UnauthorizedError("Bad authorization");
    }

    const userPayload = tokenService.validateRefreshToken(refreshToken);
    const tokenDb = await tokenService.findToken(refreshToken);

    if (!userPayload || !tokenDb) {
    return  BaseError.UnauthorizedError("Bad authorization");
    }

    const user = await prisma.user.findFirst({where:{id:userPayload.id}})

    const userDto = new UserDto(user);

    const tokens = await tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }
}

module.exports = new AuthService();
