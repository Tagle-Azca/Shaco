import { getPlayerProfile, syncSummonerProfile } from '../services/player.service.js';

export const syncPlayerProfile = async (req, res, next) => {
	try {
		const profile = await syncSummonerProfile(req.query);
		res.status(200).json(profile);
	} catch (error) {
		next(error);
	}
};

export const getStoredPlayerProfile = async (req, res, next) => {
	try {
		const profile = await getPlayerProfile(req.params.puuid);
		res.status(200).json(profile);
	} catch (error) {
		next(error);
	}
};

export const getPlayerProfileBySummonerName = async (req, res, next) => {
	try {
		const profile = await getPlayerProfile(req.query.summonerName);
		res.status(200).json(profile);
	}
	catch (error) {
		next(error);
	}
};

