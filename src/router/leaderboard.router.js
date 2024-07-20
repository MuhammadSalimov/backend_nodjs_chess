const { Router } = require("express");
const { getLeaderboard } = require("../controllers/leaderboard.controller");

const leaderboardRouter = Router();

const route = "/leaderboard";

leaderboardRouter.get(`${route}/:id`, getLeaderboard);

module.exports = leaderboardRouter;
