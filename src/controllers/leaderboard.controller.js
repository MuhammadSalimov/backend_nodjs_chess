const leaderboardService = require('../services/leaderboard.service');

class LeaderboardController {

  async getLeaderboard(req, res) {
    try {
      const leaderboard = await leaderboardService.getLeaderboard();
      res.status(200).json(leaderboard);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new LeaderboardController;
