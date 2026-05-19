import SeasonStatsRepository from '../repositories/SeasonStats.repository.js';
import axios from 'axios';

class SeasonStatsService {
    async addMatchToSeasonStats(playerIdInternal, seasonId, matchId, puuid, summonerId) {
        try {
            const region = process.env.RIOT_REGION_AMERICAS || 'americas';
            const platform = process.env.RIOT_PLATFORM || 'la1';
            const apiKey = process.env.RIOT_API_KEY;

            // 1. Obtener los detalles de la partida reciente (Match-V5)
            const matchUrl = `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}`;
            const matchResponse = await axios.get(matchUrl, { headers: { "X-Riot-Token": apiKey } });
            const info = matchResponse.data.info;

            // Buscar al jugador en los participantes mediante su PUUID
            const participantData = info.participants.find(p => p.puuid === puuid);
            if (!participantData) {
                throw new Error(`El jugador con PUUID ${puuid} no participó en la partida ${matchId}`);
            }

            // 2. Obtener la liga actual usando directamente el PUUID (Moderno, evita el 403)
            const leagueUrl = `https://${platform}.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`;
            const leagueResponse = await axios.get(leagueUrl, { headers: { "X-Riot-Token": apiKey } });
            
            // Riot regresa un arreglo, buscamos la entrada de SoloQ
            const leagueData = leagueResponse.data || [];
            const soloQEntry = leagueData.find(entry => entry.queueType === 'RANKED_SOLO_5x5') || leagueData[0];
            const currentTier = soloQEntry ? soloQEntry.tier : 'UNRANKED';

            // 3. Consultar o inicializar las estadísticas acumuladas en tu BD Cassandra
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

            // 4. Acumular métricas de la nueva partida
            currentStats.total_games_played += 1;
            currentStats.total_kills += participantData.kills;
            currentStats.total_deaths += participantData.deaths;
            currentStats.total_assists += participantData.assists;
            
            // Actualizar tier actual detectado
            currentStats.highest_tier_achieved = currentTier;

            // Calcular el KDA promedio de forma segura para evitar divisiones entre cero
            const safeDeaths = currentStats.total_deaths === 0 ? 1 : currentStats.total_deaths;
            currentStats.average_kda = parseFloat(
                ((currentStats.total_kills + currentStats.total_assists) / safeDeaths).toFixed(2)
            );

            // 5. Guardar actualización en el repositorio de Cassandra
            await SeasonStatsRepository.createOrUpdate(currentStats);
            console.log(`[SeasonStatsService] Estadísticas acumuladas con éxito para la temporada ${seasonId}`);
            return currentStats;

        } catch (error) {
            console.error("Error al actualizar estadísticas de temporada mediante API:", error.response ? error.response.data : error.message);
            throw error;
        }
    }

    async getPlayerHistory(playerId) {
        return await SeasonStatsRepository.getAllSeasonsByPlayer(playerId);
    }
}

export default new SeasonStatsService();