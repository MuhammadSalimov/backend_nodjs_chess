const BaseError = require("../error/base.error");
const prisma  = require("../utils/connection")

class TournamentService {
  async createTournament(data) {
    try {
      const tournament = await prisma.tournament.create({
        data: {
          name: data.name,
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate)
        }
      });
      return tournament;
    } catch (error) {
      throw BaseError.BadRequest('Turnir yaratishda xatolik' , error);
    }
  }

  async updateTournament(id, data) {
    try {
      if(data.startDate) data.startDate = new Date(data.startDate)
      if(data.endDate) data.endDate = new Date(data.endDate)
        data.updatedAt = new Date()
      const tournament = await prisma.tournament.update({
        where: { id },
        data,
      });
      return tournament;
    } catch (error) {
      console.log(error);
      throw BaseError.BadRequest('Turnirni yangilashda xatolik' , error);
    }
  }

  async deleteTournament(id) {
    try {
      await prisma.tournament.delete({
        where: { id }
      });
      return { message: 'Turnir muvaffaqiyatli o\'chirildi' };
    } catch (error) {
      throw  BaseError.BadRequest('Turnirni o\'chirishda xatolik',error);
    }
  }

  async getTournaments() {
    try {
      const tournaments = await prisma.tournament.findMany()
      return tournaments; 
    } catch (error) {
      throw BaseError.BadRequest("Turnirlarni olishda xatolik" , error);
    }
  }
  
}

module.exports =new TournamentService;
