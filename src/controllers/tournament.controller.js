const tournamentService = require('../services/tournament.service');


class TournamentController {
  async createTournament(req, res ,next) {
    try {
      const {name,startDate,endDate} = req.body
      const tournament = await tournamentService.createTournament({name,startDate,endDate});
      res.status(201).json(tournament);
    } catch (error) {
      next(error)
    }
  }

  async updateTournament(req, res , next) {
    const { id } = req.params;
    try {
      const tournament = await tournamentService.updateTournament(id, req.body);
      res.status(200).json(tournament);
    } catch (error) {
     next(error)
    }
  }

  async deleteTournament(req, res , next) {
    const { id } = req.params;
    try {
      const result = await tournamentService.deleteTournament(id);
      res.status(200).json(result);
    } catch (error) {
     next(error)
    }
  }

  async getTournaments(req, res , next) {
    try {
      const tournaments = await tournamentService.getTournaments();
      res.status(200).json(tournaments);
    } catch (error) {
     next(error)
    }
  }
}

module.exports = new TournamentController();
