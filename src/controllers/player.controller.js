const playerService = require("../services/player.service")

class PlayerController {

  async addPlayer(req, res , next) {
    try {
      const player = await playerService.addPlayer(req.body);
      res.status(201).json(player);
    } catch (error) {
      next(error)
    }
  }

  async updatePlayer(req, res , next) {
    const { id } = req.params;
    try {
      const player = await playerService.updatePlayer(id, req.body);
      res.status(200).json(player);
    } catch (error) {
      next(error)
    }
  }

  async deletePlayer(req, res , next) {
    const { id } = req.params;
    try {
      const result = await playerService.deletePlayer(id);
      res.status(200).json(result);
    } catch (error) {
      next(error)
    }
  }

  async getPlayers(req, res , next) {
    try {
      const players = await playerService.getPlayers();
      res.status(200).json(players);
    } catch (error) {
      next(error)
    }
  }

}

module.exports = new PlayerController();
