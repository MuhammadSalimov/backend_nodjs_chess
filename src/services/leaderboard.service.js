const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class LeaderboardService {
  async updateLeaderboard(match, isDelete = false) {
    const { player1Id, player2Id, result, tournamentId } = match;

    let player1Points = 0;
    let player2Points = 0;

    if (!isDelete) {
      player1Points = +result.split("-")[0];
      player2Points = +result.split("-")[1];
    }

    const checkPlayer1 = await prisma.leaderboard.findUnique({
      where: { playerId_tournamentId: { playerId: player1Id, tournamentId } },
    });
    if (checkPlayer1) {
      await prisma.leaderboard.update({
        where: { playerId_tournamentId: { playerId: player1Id, tournamentId } },
        data: {
          points: player1Points,
        },
      });
    } else {
      await prisma.leaderboard.create({
        data: {
          playerId: player1Id,
          tournamentId,
          points: player1Points,
        },
      });
    }
    const checkPlayer2 = await prisma.leaderboard.findUnique({
      where: { playerId_tournamentId: { playerId: player2Id, tournamentId } },
    });
    if (checkPlayer2) {
      await prisma.leaderboard.update({
        where: {
          playerId_tournamentId: { playerId: player2Id, tournamentId },
        },
        data: {
          points: player2Points,
        },
      });
    } else {
      await prisma.leaderboard.create({
        data: {
          playerId: player2Id,
          tournamentId,
          points: player2Points,
        },
      });
    }
  }

  async getLeaderboard() {
    try {
      const leaderboard = await prisma.leaderboard.findMany({
        include: {
          player: true,
          tournament: true,
        },
      });
      return leaderboard;
    } catch (error) {
      throw new Error("Leaderboardni olishda xatolik");
    }
  }
}

module.exports = new LeaderboardService();
