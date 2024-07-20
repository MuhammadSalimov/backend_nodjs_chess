const { Router } = require("express");
const {
  addPlayer,
  getPlayers,
  updatePlayer,
  deletePlayer,
} = require("../controllers/player.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const {isAdmin} = require("../middlewares/users.middleware");

const playerRouter = Router();

const route = "/player";

playerRouter.post(`${route}`,[authMiddleware ,isAdmin ],  addPlayer);
playerRouter.get(`${route}`,[authMiddleware ,isAdmin ], getPlayers);
playerRouter.put(`${route}/:id`,[authMiddleware ,isAdmin ], updatePlayer);
playerRouter.delete(`${route}/:id`,[authMiddleware ,isAdmin ], deletePlayer);

module.exports = playerRouter;
