import Tournament from '../models/Tournament.js';
import TournamentResult from '../models/TournamentResult.js';

export const findPicksByPatch = async (patchId) =>
  Tournament.findOne({ patchId }).lean();

export const findPicksByTournament = async (tournament) =>
  Tournament.find({ tournament }).lean();

export const getWinrateByChampionInPatch = async (patchId) => {
  return Tournament.aggregate([
    { $match: { patchId } },
    { $unwind: '$picks' },
    {
      $group: {
        _id: '$picks.championId',
        totalPicks: { $sum: 1 },
        totalWins: { $sum: { $cond: ['$picks.win', 1, 0] } },
      },
    },
    {
      $addFields: {
        winrate: {
          $multiply: [{ $divide: ['$totalWins', '$totalPicks'] }, 100],
        },
      },
    },
    { $sort: { totalPicks: -1 } },
  ]);
};

export const findResultsByTournament = async (tournamentId) =>
  TournamentResult.find({ tournamentId }).sort({ matchDate: -1 }).lean();
