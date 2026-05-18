const MatchLogRepository = require('../repositories/matchLog.repository');
const axios = require('axios');

class MatchLogService {
    async syncLatestMatch(puuid, playerIdInternal) {
        const region = process.env.RIOT_REGION_AMERICAS || 'americas';
        const apiKey = process.env.RIOT_API_KEY;

        try {
            // 1. Obtener el ID de la última partida jugada
            const matchIdsUrl = `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=1`;
            const idsResponse = await axios.get(matchIdsUrl, { headers: { "X-Riot-Token": apiKey } });
            
            if (!idsResponse.data.length) return null;
            const lastMatchId = idsResponse.data[0];

            // 2. Obtener los detalles de esa partida específica
            const matchDetailUrl = `https://${region}.api.riotgames.com/lol/match/v5/matches/${lastMatchId}`;
            const detailResponse = await axios.get(matchDetailUrl, { headers: { "X-Riot-Token": apiKey } });
            
            const info = detailResponse.data.info;
            const participant = info.participants.find(p => p.puuid === puuid);

            // 3. Mapear al modelo y guardar en el repositorio
            const matchData = {
                player_id: playerIdInternal,
                match_timestamp: info.gameStartTimestamp, // Riot da esto en milisegundos
                match_id: lastMatchId,
                game_mode: info.gameMode,
                champion_id: participant.championId,
                participants: info.participants.map(p => p.summonerName),
                win: participant.win,
                duration: info.gameDuration
            };

            await MatchLogRepository.create(matchData);
            return matchData;

        } catch (error) {
            console.error("Error al sincronizar partida:", error);
            throw error;
        }
    }

    async getPlayerLastMatch(playerId) {
        return await MatchLogRepository.getLatestByPlayer(playerId);
    }
}

module.exports = new MatchLogService();