import ApiError from '../utils/apiError.js';
import { getJson } from '../utils/http.js';
import { findMatchById, findMatchesByPuuid, upsertMatch } from '../repositories/match.repository.js';
import { get } from 'mongoose';
 
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

const riotHeaders = () => ({
    'X-Riot-Token': process.env.RIOT_API_KEY,
});

const getMatchByPuuid = async ({ puuid, routingRegion }) => {
    const url = `https://${routingRegion}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5`;
    return getJson(url, { headers: riotHeaders() });
}

const getMatchDetails = async ({ matchId, routingRegion }) => {
    const url = `https://${routingRegion}.api.riotgames.com/lol/match/v5/matches/${matchId}`;
    return getJson(url, { headers: riotHeaders() });
}

export const syncMatchesForPlayer = async ({ puuid, routingRegion }) => {
    ensureRiotKey();

    const matchIds = await getMatchByPuuid({ puuid, routingRegion });

    for (const matchId of matchIds) {
        const existingMatch = await findMatchById(matchId);
        if (existingMatch) {
            console.log(`Match ${matchId} already exists, skipping.`);
            continue;
        } else {
            const matchDetails = await getMatchDetails({ matchId, routingRegion });

            const matchData = {
                matchId:  matchDetails.metadata.matchId,
                duration: matchDetails.info.gameDuration,
                gameMode: matchDetails.info.gameMode,
                participants: matchDetails.info.participants.map(p => ({
                    puuid:    p.puuid,
                    champion: p.championName       || '',
                    kills:    p.kills              || 0,
                    deaths:   p.deaths             || 0,
                    assists:  p.assists            || 0,
                    win:      p.win                || false,
                    cs:       (p.totalMinionsKilled + p.neutralMinionsKilled) || 0,
                    damage:   p.totalDamageDealtToChampions || 0,
                })),
                goldGraph:   [],
                damageGraph: [],
                objectiveSummary: {
                    towers:  { blueTeam: matchDetails.info.teams?.[0]?.objectives?.tower?.kills  ?? 0,
                                redTeam:  matchDetails.info.teams?.[1]?.objectives?.tower?.kills  ?? 0 },
                    dragons: { blueTeam: matchDetails.info.teams?.[0]?.objectives?.dragon?.kills ?? 0,
                                redTeam:  matchDetails.info.teams?.[1]?.objectives?.dragon?.kills ?? 0 },
                    barons:  { blueTeam: matchDetails.info.teams?.[0]?.objectives?.baron?.kills  ?? 0,
                                redTeam:  matchDetails.info.teams?.[1]?.objectives?.baron?.kills  ?? 0 },
                },
            };
            await upsertMatch(matchData);
            console.log(`Match ${matchId} synced.`);
        }
    };
}