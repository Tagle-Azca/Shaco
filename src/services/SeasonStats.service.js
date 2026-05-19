import SeasonStatsRepository from '../repositories/SeasonStats.repository.js';
import axios from 'axios';
class SeasonStatsService {
    async addMatchToSeasonStats(playerIdInternal, seasonId, matchId, puuid, summonerId) {
        try {
            const region = process.env.RIOT_REGION_AMERICAS || 'americas';
            const platform = process.env.RIOT_PLATFORM || 'la1';
            const apiKey = process.env.RIOT_API_KEY;

            const matchUrl = `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}`;
            const matchResponse = await axios.get(matchUrl, { headers: { "X-Riot-Token": apiKey } });
            const info = matchResponse.data.info;

            const participantData = info.participants.find(p => p.puuid === puuid);
            if (!participantData) {
                throw new Error(`El jugador con PUUID ${puuid} no participó en la partida ${matchId}`);
            }

            const leagueUrl = `https://${platform}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`;
            const leagueResponse = await axios.get(leagueUrl, { headers: { "X-Riot-Token": apiKey } });
            
            const soloQEntry = leagueResponse.data.find(entry => entry.queueType === 'RANKED_SOLO_5x5');
            const currentTier = soloQEntry ? soloQEntry.tier : 'UNRANKED';

            let currentStats = await SeasonStatsRepository.getByPlayerAndSeason(playerIdInternal, seasonId);

            if (!currentStats) {
                currentStats = {
                    player_id: playerIdInternal,
                    season_id: seasonId,
                    total_games_played: 0,
                    total_kills: 0,
                    total_deaths: 0,
                    total_assists: 0,
                    highest_tier_achieved: currentTier,
                    most_played_champion_id: participantData.championId,
                    average_kda: 0.0
                };
            }

            currentStats.total_games_played += 1;
            currentStats.total_kills += participantData.kills;
            currentStats.total_deaths += participantData.deaths;
            currentStats.total_assists += participantData.assists;
            
            currentStats.highest_tier_achieved = currentTier;

            const safeDeaths = currentStats.total_deaths === 0 ? 1 : currentStats.total_deaths;
            currentStats.average_kda = parseFloat(
                ((currentStats.total_kills + currentStats.total_assists) / safeDeaths).toFixed(2)
            );

            await SeasonStatsRepository.createOrUpdate(currentStats);
            return currentStats;

        } catch (error) {
            console.error("Error al actualizar estadísticas de temporada mediante API:", error);
            throw error;
        }
    }

    async getPlayerHistory(playerId) {
        return await SeasonStatsRepository.getAllSeasonsByPlayer(playerId);
    }
}

export default new SeasonStatsService();