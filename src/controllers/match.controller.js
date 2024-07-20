const matchService = require('../services/match.service');


class MatchController {
  
  async createMatch(req, res , next) {
    try {
      const match = await matchService.createMatch(req.body);
      res.status(201).json(match);
    } catch (error) {
      next(error)
    }
  }

  async updateMatch(req, res , next) {
    const { id } = req.params;
    try {
      const match = await matchService.updateMatch(id, req.body);
      res.status(200).json(match);
    } catch (error) {
      next(error)
    }
  }

  async deleteMatch(req, res , next) {
    const { id } = req.params;
    try {
      const result = await matchService.deleteMatch(id);
      res.status(200).json(result);
    } catch (error) {
      next(error)
    }
  }

  async getMatches(req, res , next) {
    try {
      const matches = await matchService.getMatches();
      res.status(200).json(matches);
    } catch (error) {
      next(error)
    }
  }

  async getMatch(req, res , next) {
    const { id } = req.params;
    try {
      const match = await matchService.getMatch(id);
      res.status(200).json(match);
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new MatchController();
