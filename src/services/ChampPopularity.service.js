const ChampPopularityRepository = require('../repositories/ChampPopularity.repository');
const MatchLogRepository = require('../repositories/MatchLog.repository'); 
const PlayerRankingRepository = require('../repositories/PlayerRanking.repository');

class ChampPopularityService {
    /**
     * Consolida de forma autónoma las estadísticas de la semana leyendo las partidas 
     * existentes en la base de datos y guardando el top resultante.
     */
    async generateWeeklyReport(weekNumber, playerIdList) {
        try {
            const championStats = {}; // Diccionario para consolidar en memoria
            console.log(`Iniciando consolidación de datos para la semana ${weekNumber}...`);

            for (const playerId of playerIdList) {
                const matches = await MatchLogRepository.getByPlayer(playerId);
                const rankingHistory = await PlayerRankingRepository.getHistoryByPlayer(playerId);
                const latestRank = rankingHistory[0] ? rankingHistory[0].tier : 'GOLD';

                for (const match of matches) {
                    const champId = match.champion_id;
                    if (!championStats[champId]) {
                        championStats[champId] = {
                            championId: champId,
                            pickCount: 0,
                            wins: 0,
                            tiers: []
                        };
                    }

                    
                    championStats[champId].pickCount += 1;
                    championStats[champId].tiers.push(latestRank);
                    if (match.win) {
                        championStats[champId].wins += 1;
                    }
                }
            }

           
            const consolidatedReports = Object.values(championStats).map(stat => {
                const winRate = parseFloat(((stat.wins / stat.pickCount) * 100).toFixed(2));
                
                const mostFrequentTier = stat.tiers.sort((a,b) =>
                    stat.tiers.filter(v => v === a).length - stat.tiers.filter(v => v === b).length
                ).pop() || 'GOLD';

                return {
                    week_number: weekNumber,
                    pick_count: stat.pickCount, 
                    champion_id: stat.championId,
                    tier_avg: mostFrequentTier,
                    win_rate_in_week: winRate
                };
            });
            const promises = consolidatedReports.map(report => 
                ChampPopularityRepository.createOrUpdate(report)
            );

            await Promise.all(promises);
            console.log(`Reporte semanal generado con éxito. ${consolidatedReports.length} campeones analizados.`);
            
            return { week: weekNumber, totalChampionsAnalyzed: consolidatedReports.length };

        } catch (error) {
            console.error("Error al consolidar la popularidad semanal:", error);
            throw error;
        }
    }

    async getWeeklyMetaRanking(weekNumber, topLimit) {
        return await ChampPopularityRepository.getTopChampionsByWeek(weekNumber, topLimit);
    }
}

module.exports = new ChampPopularityService();