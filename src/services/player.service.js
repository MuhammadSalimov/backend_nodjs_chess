const prisma = require("../utils/connection");
const BaseError = require("../error/base.error");
class PlayerService {
  async addPlayer(data) {
    try {
      const checkUser = await prisma.player.findFirst({
        where: { userId: data.userId },
      });
      console.log(checkUser);
      if (checkUser)
        throw BaseError.BadRequest(
          "Bitta foydalanuvchi",
          "UserId is already exist"
        );
      const player = await prisma.player.create({
        data: {
          name: data.name,
          age: data.age,
          rating: data.rating,
          country: data.country,
          userId: data.userId,
        },
      });
      return player;
    } catch (error) {
      throw BaseError.BadRequest("O'yinchi qo'shishda xatolik", error);
    }
  }

  async updatePlayer(id, data) {
    try {
      const player = await prisma.player.update({
        where: { id },
        data: {
          name: data.name,
          age: data.age,
          rating: data.rating,
          country: data.country,
        },
      });
      return player;
    } catch (error) {
      throw BaseError.BadRequest("O'yinchini yangilashda xatolik", error);
    }
  }

  async deletePlayer(id) {
    try {
      await prisma.player.delete({
        where: { id },
      });
      return { message: "O'yinchi muvaffaqiyatli o'chirildi" };
    } catch (error) {
      console.log(error);
      throw BaseError.BadRequest("O'yinchini o'chirishda xatolik", error);
    }
  }

  async getPlayers() {
    try {
      const players = await prisma.player.findMany();
      return players;
    } catch (error) {
      throw BaseError.BadRequest("O'yinchilarni olishda xatolik", error);
    }
  }

  async updateRating({ player1Id, player2Id, result }) {

    const { rating: player1Rating } = await prisma.player.findUnique({
      where: { id: player1Id },
      select: {
        rating: true,
      },
    });

    const { rating: player2Rating } = await prisma.player.findUnique({
      where: { id: player2Id },
      select: {
        rating: true,
      },
    });

    let  { rating1, rating2 } = this.calculateNewRatings(
      player1Rating,
      player2Rating,
      result
    )
    console.log(rating1 , rating2);
    await prisma.player.update({
      where: { id: player1Id },
      data: {
        rating:+rating1.toFixed(2),
      },
    });

    await prisma.player.update({
      where: {
        id: player2Id,
      },
      data: {
        rating: +rating2.toFixed(2),
      },
    });
  }

  calculateNewRatings(player1Rating, player2Rating, result) {
    const K = 16;

    const expectedScore1 =
      1 / (1 + Math.pow(10, (player2Rating - player1Rating) / 400));
    const expectedScore2 =
      1 / (1 + Math.pow(10, (player1Rating - player2Rating) / 400));

    const actualScore1 = result.split("-")[0];
    const actualScore2 = result.split("-")[1];

    const rating1 = player1Rating + K * (actualScore1 - expectedScore1);
    const rating2 = player2Rating + K * (actualScore2 - expectedScore2);

    return {
      rating1,
      rating2,
    };
  }

}

module.exports = new PlayerService();
