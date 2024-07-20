const { Router } = require("express");
const authController = require("../auth/auth.controller");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");
const authRouter = Router();

const route = "/auth";

authRouter.post(
  `${route}/register`,
  body("password").isString({}),
  body("email").isEmail({}),
  authController.register
);

authRouter.post(
  `${route}/login`,
  body("password").isString({}),
  body("email").isEmail({}),
  authController.login
);

authRouter.post(`${route}/logout`, authController.logout);
authRouter.get(`${route}/refresh`, authController.refresh);
authRouter.get(`${route}/activation/:id`, authController.activation);

module.exports = authRouter;
