const BaseError = require("../error/base.error");
const authService = require("../services/auth.service");
const { validationResult } = require("express-validator");
const bcrypt = require('bcrypt')
const prisma = require("../utils/connection");

class AuthController {
  async addAdmin() {
    const data = {
      email: "admin@gmail.com",
      password: "1Aw@356Dt5",
      name: "Admin",
    }; 
    const hashedPass = await bcrypt.hash(data.password, 10);
    const checkAdmin = await prisma.user.findUnique({where:{email:data.email}})
    if(!checkAdmin){
      await prisma.user.create({
        data: {
          email:data.email,
          password:hashedPass,
          name:data.name,
          role: "admin",
          isActivated: true,
        },
      });
      console.log("admin created");
    }
  }
  async register(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          BaseError.BadRequest("Error with validation", errors.array())
        );
      }
      const { email, password, name } = req.body;
      const data = await authService.register(email, password, name);

      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 3600 * 1000,
      });

      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async activation(req, res, next) {
    try {
      const { id } = req.params;
      const user = await authService.activated(id);
      return res.redirect("/");
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          BaseError.BadRequest("Error with validation", errors.array())
        );
      }
      const { email, password } = req.body;
      const data = await authService.login(email, password);
      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 3600 * 1000,
      });
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await authService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const data = await authService.refresh(refreshToken);
      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 3600 * 1000,
      });
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
