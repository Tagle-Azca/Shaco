const ChampPopularityRepository = require('../repositories/ChampPopularity.repository');

class ChampPopularityService {
    /**
     * Sincroniza el reporte de popularidad de una semana específica
     */
    async syncWeeklyPopularity(weekNumber, reportsArray) {
        try {
            const promises = reportsArray.map(report => {
                const formattedData = {
                    week_number: weekNumber,
                    pick_count: report.pickCount, // Debe venir consolidado (ej: 15450 elecciones)
                    champion_id: report.championId,
                    tier_avg: report.tierAvg,
                    win_rate_in_week: report.winRate
                };
                return ChampPopularityRepository.createOrUpdate(formattedData);
            });

            await Promise.all(promises);
            return { week: weekNumber, totalChampionsTracked: reportsArray.length };
        } catch (error) {
            console.error(`Error al actualizar popularidad de la semana ${weekNumber}:`, error);
            throw error;
        }
    }

    async getWeeklyMetaRanking(weekNumber, topLimit) {
        return await ChampPopularityRepository.getTopChampionsByWeek(weekNumber, topLimit);
    }
}

module.exports = new ChampPopularityService();