const SeasonStatsRepository = require('../repositories/SeasonStats.repository');

class SeasonStatsService {
    async addMatchToSeasonStats(playerIdInternal, seasonId, matchParticipantData, currentTier) {
        try {
            // 1. Intentar obtener estadísticas existentes de la temporada
            let currentStats = await SeasonStatsRepository.getByPlayerAndSeason(playerIdInternal, seasonId);

            if (!currentStats) {
                // Si no existe, inicializamos el objeto con valores en 0
                currentStats = {
                    player_id: playerIdInternal,
                    season_id: seasonId,
                    total_games_played: 0,
                    total_kills: 0,
                    total_deaths: 0,
                    total_assists: 0,
                    highest_tier_achieved: currentTier,
                    most_played_champion_id: matchParticipantData.championId,
                    average_kda: 0.0
                };
            }

            // 2. Acumular nuevas métricas de la partida
            currentStats.total_games_played += 1;
            currentStats.total_kills += matchParticipantData.kills;
            currentStats.total_deaths += matchParticipantData.deaths;
            currentStats.total_assists += matchParticipantData.assists;
            
            // Actualizar la liga más alta si aplica (Lógica simplificada)
            if (currentTier) {
                currentStats.highest_tier_achieved = currentTier;
            }

            // 3. Recalcular el KDA Promedio (Evitando división por cero)
            const safeDeaths = currentStats.total_deaths === 0 ? 1 : currentStats.total_deaths;
            currentStats.average_kda = parseFloat(
                ((currentStats.total_kills + currentStats.total_assists) / safeDeaths).toFixed(2)
            );

            // 4. Persistir los datos consolidados en Cassandra
            await SeasonStatsRepository.createOrUpdate(currentStats);
            return currentStats;

        } catch (error) {
            console.error("Error al actualizar estadísticas de temporada:", error);
            throw error;
        }
    }

    async getPlayerHistory(playerId) {
        return await SeasonStatsRepository.getAllSeasonsByPlayer(playerId);
    }
}

module.exports = new SeasonStatsService();