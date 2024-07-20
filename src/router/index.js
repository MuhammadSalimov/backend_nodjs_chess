const authRouter = require("./auth.router");
const matchRouter = require("./match.router");
const playerRouter = require("./player.router");
const tournamentRouter = require("./tournament.router");
const loaderboardRouter = require("./leaderboard.router");


module.exports = [
  authRouter,
  tournamentRouter,
  playerRouter,
  matchRouter,
  loaderboardRouter
];
