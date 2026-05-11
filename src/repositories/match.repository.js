import Match from '../models/Match.js';

export const findMatchById = async (matchId) =>
  Match.findOne({ matchId }).lean();

export const findMatchesByPuuid = async (puuid) =>
  Match.find({ puuid }).lean();

export const upsertMatch = async (matchData) =>
  Match.findOneAndUpdate(
    { matchId: matchData.matchId },
    { $set: matchData },
    { new: true, upsert: true }
  ).lean();