const { sign, verify } = require("jsonwebtoken");
const prisma = require("../utils/connection");
class TokenService {
  generateToken(pyload) {
    const accessToken = sign(pyload, process.env.JWT_ACCESS_KEY, {
      expiresIn: "15m",
    });
    const refreshToken = sign(pyload, process.env.JWT_REFRESH_KEY, {
      expiresIn: "15d",
    });
    return { accessToken, refreshToken };
  }

  async saveToken(userId, refreshToken) {
    const existToken = await prisma.token.findFirst({ where: { userId } });

    if (existToken) {
      return await prisma.token.update({
        where: { id: existToken.id },
        data: { refreshToken: refreshToken },
      });
    }

    const token = await prisma.token.create({ data: { userId, refreshToken } });
    return token;
  }

  async removeToken(refreshToken) {
    const data = await prisma.token.findFirst({ where: { refreshToken } });
    return await prisma.token.delete({ where: { id: data.id } });
  }

  async findToken(refreshToken) {
    return await prisma.token.findFirst({ where: { refreshToken } });
  }

  validateRefreshToken(token) {
    try {
      return verify(token, process.env.JWT_REFRESH_KEY);
    } catch (error) {
      return null;
    }
  }

  validateAccessToken(token) {
    try {
      return verify(token, process.env.JWT_ACCESS_KEY);
    } catch (error) {
      return null;
    }
  }
}

module.exports = new TokenService();
