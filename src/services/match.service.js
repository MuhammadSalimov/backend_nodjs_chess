const prisma = require("../utils/connection");
const BaseError = require("../error/base.error");
const { updateLeaderboard } = require("./leaderboard.service");
const playerService = require("./player.service");

class MatchService {

  async createMatch(data) {
    try {
      data.result = "0-0"
      const match = await prisma.match.create({
        data: {
          round: data.round,
          player1Id: data.player1Id,
          player2Id: data.player2Id,
          result: data.result,
          tournamentId: data.tournamentId,
        },
      });
      return match;
    } catch (error) {
      throw BaseError.BadRequest("Match yaratishda xatolik", error);
    }
  }

  async updateMatch(id, data) {
    try {
      const match = await prisma.match.update({
        where: { id },
        data: {
          round: data.round,
          player1Id: data.player1Id,
          player2Id: data.player2Id,
          result: data.result,
          tournamentId: data.tournamentId,
        },
      });
      playerService.updateRating(match)
      await updateLeaderboard(match);
      return match;
    } catch (error) {
      console.log(error);
      throw BaseError.BadRequest("Matchni yangilashda xatolik", error);
    }
  }

  async deleteMatch(id) {
    try {
      await prisma.match.delete({
        where: { id },
      });
      await updateLeaderboard(match, true);
      return { message: "Match muvaffaqiyatli o'chirildi" };
    } catch (error) {
      throw BaseError.BadRequest("Matchni o'chirishda xatolik", error);
    }
  }

  async getMatches() {
    try {
      const matches = await prisma.match.findMany();
      return matches;
    } catch (error) {
      throw BaseError.BadRequest("Juftlashuvlarni olishda xatolik", error);
    }
  }

  async getMatch(id) {
    try {
      const match = await prisma.match.findUnique({
        where: { id },
      });
      return match;
    } catch (error) {
      throw BaseError.BadRequest("Juftlashuvni olishda xatolik", error);
    }
  }


}

module.exports = new MatchService();
