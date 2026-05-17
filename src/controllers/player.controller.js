import { getPlayerProfile, getPlayerProfileByRiotId, syncSummonerProfile, getPlayerStatsService } from '../services/player.service.js';

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

export const getStoredPlayerProfileByRiotId = async (req, res, next) => {
	try {
		const profile = await getPlayerProfileByRiotId(req.query);
		res.status(200).json(profile);
	} catch (error) {
		next(error);
	}
};

export const getPlayerStats = async (req, res, next) => {
    try {
        const stats = await getPlayerStatsService(req.params.puuid);
        res.status(200).json(stats);
    } catch (error) {
        next(error);
    }
};
