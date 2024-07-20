const { Router } = require("express");
const {
  createMatch,
  getMatches,
  getMatch,
  updateMatch,
  deleteMatch,
} = require("../controllers/match.controller");

const matchRouter = Router();

const route = "/match";

matchRouter.post(`${route}`, createMatch);
matchRouter.get(`${route}`, getMatches);
matchRouter.get(`${route}/:id`, getMatch);
matchRouter.put(`${route}/:id`, updateMatch);
matchRouter.delete(`${route}/:id`, deleteMatch);

module.exports = matchRouter;
