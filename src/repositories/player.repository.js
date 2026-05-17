import Player from '../models/Player.js';

export const findPlayerByPuuid = async (puuid) => Player.findOne({ puuid }).lean();

export const upsertPlayerProfile = async (profile) =>
	Player.findOneAndUpdate(
		{ puuid: profile.puuid },
		{ $set: profile },
		{
			new: true,
			upsert: true,
			runValidators: true,
			setDefaultsOnInsert: true,
		}
	).lean();

export const findPlayerBySummonerName = async (summonerName) =>
	Player.findOne({ summonerName: new RegExp(`^${summonerName}$`, 'i') }).lean();

export const findPlayerByRiotId = async ({ summonerName, tag }) =>
	Player.findOne({
		summonerName: new RegExp(`^${summonerName}$`, 'i'),
		tag: new RegExp(`^${tag}$`, 'i'),
	}).lean();

