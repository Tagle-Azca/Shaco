import Match from '../models/Match.js';

export const findMatchById = async (matchId) =>
  Match.findOne({ matchId }).lean();

export const findMatchesByPuuid = async (puuid) =>
  Match.find({ 'participants.puuid': puuid }).lean();

export const upsertMatch = async (matchData) =>
  Match.findOneAndUpdate(
    { matchId: matchData.matchId },
    { $set: matchData },
    { new: true, upsert: true }
  ).lean();

  export const getPlayerStats = async (puuid) =>
      Match.aggregate([
          { $match: { 'participants.puuid': puuid } }, //este es para las partidas donde jugó
          { $unwind: '$participants' },
          { $match: { 'participants.puuid': puuid } }, //este es para sacar el participante
          {
              $facet: {
                stats: [
                    {
                        $group: {
                            _id: '$participants.puuid',
                            avgDamage:   { $avg: '$participants.damage' },
                            avgCSPerMin: { $avg: { $divide: ['$participants.cs', { $divide: ['$duration', 60] }] } },
                            avgKDA: {
                                $avg: {
                                    $divide: [
                                        { $add: ['$participants.kills', '$participants.assists'] },
                                        { $cond: [{ $eq: ['$participants.deaths', 0] }, 1, '$participants.deaths'] }
                                    ]
                                }
                            },
                            winrate: { $avg: { $cond: ['$participants.win', 1, 0] } },
                        }
                    }
                ],
                mains: [
                    { $group: { _id: '$participants.champion', count: { $sum: 1 } } },
                    { $sort:  { count: -1 } },
                    { $limit: 3 },
                    { $project: { _id: 0, champion: '$_id', count: 1 } }
                ]
            }
          }
      ])