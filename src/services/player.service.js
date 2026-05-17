import ApiError from '../utils/apiError.js';
import { getJson } from '../utils/http.js';
import { findPlayerByPuuid, findPlayerByRiotId, upsertPlayerProfile } from '../repositories/player.repository.js';
import { syncMatchesForPlayer } from './match.service.js';
import { getPlayerStats } from '../repositories/match.repository.js';

const ROUTING_BY_PLATFORM_REGION = {
    br1: 'americas',
    eun1: 'europe',
    euw1: 'europe',
    jp1: 'asia',
    kr: 'asia',
    lan: 'americas',
    la1: 'americas',
    las: 'americas',
    la2: 'americas',
    na1: 'americas',
    oc1: 'sea',
    ru: 'europe',
    tr1: 'europe',
    ph2: 'sea',
    sg2: 'sea',
    th2: 'sea',
    tw2: 'sea',
    vn2: 'sea',
};

const normalizeRegion = (region) => region?.trim().toLowerCase();

const ensureRiotKey = () => {
	if (!process.env.RIOT_API_KEY) {
		throw new ApiError('RIOT_API_KEY is not configured', 500);
	}
};

const getRoutingRegion = (platformRegion) => {
	const normalizedRegion = normalizeRegion(platformRegion);

	if (!normalizedRegion) {
		throw new ApiError('region is required', 400);
	}

	const routingRegion = ROUTING_BY_PLATFORM_REGION[normalizedRegion];

	if (!routingRegion) {
		throw new ApiError(`Unsupported region: ${platformRegion}`, 400);
	}

	return routingRegion;
};

const riotHeaders = () => ({
	'X-Riot-Token': process.env.RIOT_API_KEY,
});

const getAccountByRiotId = async ({ gameName, tagLine, routingRegion }) => {
	const url = `https://${routingRegion}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`;
	return getJson(url, { headers: riotHeaders() });
};

const getSummonerByPuuid = async ({ puuid, platformRegion }) => {
	const url = `https://${platformRegion}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${encodeURIComponent(puuid)}`;
	return getJson(url, { headers: riotHeaders() });
};

export const syncSummonerProfile = async ({ region, gameName, tagLine }) => {
	ensureRiotKey();
	if (!region || !gameName || !tagLine) {
		throw new ApiError('region, gameName and tagLine are required', 400);
	}

	const platformRegion = normalizeRegion(region);
	const routingRegion = getRoutingRegion(platformRegion);

	const account = await getAccountByRiotId({ gameName, tagLine, routingRegion });
	const summoner = await getSummonerByPuuid({ puuid: account.puuid, platformRegion });

	const profile = {
		puuid: account.puuid,
		summonerName: summoner.name || account.gameName || gameName,
		tag: account.tagLine || tagLine,
		profileIconId: summoner.profileIconId,
		summonerLevel: summoner.summonerLevel,
		region: platformRegion,
	};

	const savedProfile = await upsertPlayerProfile(profile);

	// Sincronizar partidas automáticamente
	syncMatchesForPlayer({ 
		puuid: account.puuid, 
		routingRegion 
	}).catch(err => console.error('Error syncing matches:', err));

	return savedProfile;
};
export const getPlayerProfile = async (puuid) => {
	if (!puuid) {
		throw new ApiError('puuid is required', 400);
	}

	const player = await findPlayerByPuuid(puuid);

	if (!player) {
		throw new ApiError('Player not found', 404);
	}

	return player;
};

export const getPlayerProfileByRiotId = async ({ gameName, tagLine }) => {
	if (!gameName || !tagLine) {
		throw new ApiError('gameName and tagLine are required', 400);
	}

	const player = await findPlayerByRiotId({ summonerName: gameName, tag: tagLine });

	if (!player) {
		throw new ApiError('Player not found', 404);
	}

	return player;
};

export const getPlayerStatsService = async (puuid) => {
	if (!puuid) throw new ApiError('puuid is required', 400);
	return getPlayerStats(puuid);
};