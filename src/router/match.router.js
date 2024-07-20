const { Router } = require("express");
const {
  createMatch,
  getMatches,
  getMatch,
  updateMatch,
  deleteMatch,
} = require("../controllers/match.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const {isAdmin} = require("../middlewares/users.middleware");

const matchRouter = Router();

const route = "/match";

matchRouter.post(`${route}`,[authMiddleware,isAdmin], createMatch);
matchRouter.get(`${route}`,[authMiddleware,isAdmin], getMatches);
matchRouter.get(`${route}/:id`,[authMiddleware,isAdmin], getMatch);
matchRouter.put(`${route}/:id`,[authMiddleware,isAdmin], updateMatch);
matchRouter.delete(`${route}/:id`,[authMiddleware,isAdmin], deleteMatch);

module.exports = matchRouter;
