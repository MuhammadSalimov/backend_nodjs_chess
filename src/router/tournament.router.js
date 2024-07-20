const { Router } = require("express");
const {
  createTournament,
  getTournaments,
  updateTournament,
  deleteTournament,
} = require("../controllers/tournament.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const {isActiveted , isAdmin} = require("../middlewares/users.middleware")
const tournamentRouter = Router();

const route = "/tournament";

tournamentRouter.post(`${route}`, [authMiddleware ,isAdmin], createTournament);
tournamentRouter.get(`${route}`, getTournaments);
tournamentRouter.put(`${route}/:id`,[authMiddleware ,isAdmin] , updateTournament);
tournamentRouter.delete(`${route}/:id`,[authMiddleware ,isAdmin] , deleteTournament);

module.exports = tournamentRouter;
