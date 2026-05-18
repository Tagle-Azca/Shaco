const PlayerRankingRepository = require('../repositories/playerRanking.repository');
const axios = require('axios');

class PlayerRankingService {
    async syncPlayerRanking(summonerId, playerIdInternal) {
        // 1. Llamada a Riot Games API
        const url = `https://${process.env.RIOT_PLATFORM}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner_id}`;
        
        try {
            const response = await axios.get(url, {
                headers: { "X-Riot-Token": process.env.RIOT_API_KEY }
            });

            const rankData = response.data[0];
            
            if (!rankData) return null;

            // 2. Mapeo y Poblamiento en Cassandra
            const newEntry = {
                player_id: playerIdInternal,
                date: new Date(),
                tier: rankData.tier,
                rank: rankData.rank,
                league_points: rankData.leaguePoints,
                wins: rankData.wins,
                losses: rankData.losses,
                series_progress: rankData.miniSeries ? rankData.miniSeries.progress : null
            };

            await PlayerRankingRepository.create(newEntry);
            return newEntry;

        } catch (error) {
            console.error("Error sincronizando ranking:", error);
            throw error;
        }
    }

    async getPlayerHistory(playerId) {
        return await PlayerRankingRepository.getHistoryByPlayer(playerId);
    }
}

module.exports = new PlayerRankingService();