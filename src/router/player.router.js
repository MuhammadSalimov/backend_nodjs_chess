const { Router } = require("express");
const {
  addPlayer,
  getPlayers,
  updatePlayer,
  deletePlayer,
} = require("../controllers/player.controller");

const playerRouter = Router();

const route = "/player";

playerRouter.post(`${route}`, addPlayer);
playerRouter.get(`${route}`, getPlayers);
playerRouter.put(`${route}/:id`, updatePlayer);
playerRouter.delete(`${route}/:id`, deletePlayer);

module.exports = playerRouter;
