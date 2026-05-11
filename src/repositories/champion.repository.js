import Champion from '../models/Champion.js';

export const findChampionById = async (championId) =>
  Champion.findOne({ championId }).lean();

export const findChampionByName = async (name) =>
  Champion.findOne({ name: new RegExp(name, 'i') }).lean();

export const findChampionsByRole = async (role) =>
  Champion.find({ roles: role }).lean();

export const getAllChampions = async () =>
  Champion.find({}).select('championId name roles baseStats recommendedMaxOrder').lean();

export const upsertChampion = async (championData) => {
  return Champion.findOneAndUpdate(
    { championId: championData.championId },
    { $set: championData },
    { upsert: true, new: true }
  ).lean();
};
