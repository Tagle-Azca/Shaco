import PlayerRankingRepository from '../repositories/playerRanking.repository.js';
import axios from 'axios';

class PlayerRankingService {
    async syncPlayerRanking(riotId, playerIdInternal) {
        const token = process.env.RIOT_API_KEY;
        const platform = process.env.RIOT_PLATFORM || 'la1'; 
        const regionalRoute = 'americas'; 

        try {
            if (!riotId.includes('#')) {
                throw new Error("El formato del Riot ID debe ser 'Nombre#Etiqueta' (ej: Celeste#257)");
            }
            const [gameName, tagLine] = riotId.split('#');

            // --- PASO 1: Obtener el PUUID desde el Riot ID (Account-V1) ---
            const accountUrl = `https://${regionalRoute}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`;
            const accountResponse = await axios.get(accountUrl, { headers: { "X-Riot-Token": token } });
            const puuid = accountResponse.data.puuid;

            // --- PASO 2: Obtener el Ranking en SoloQ / Flex directamente por PUUID (League-V4) ---
            // Usamos el endpoint moderno de Riot que acepta el PUUID directamente
            const leagueUrl = `https://${platform}.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`;
            const leagueResponse = await axios.get(leagueUrl, { headers: { "X-Riot-Token": token } });

            const entries = leagueResponse.data;
            
            // Si el arreglo está vacío, el jugador es unranked
            if (!entries || entries.length === 0) {
                console.log(`El jugador ${riotId} no registra partidas clasificatorias activas en esta season (Unranked).`);
                return null;
            }

            // Buscamos SoloQ (RANKED_SOLO_5x5), si no se encuentra tomamos la primera cola disponible (ej: Flex)
            const rankData = entries.find(entry => entry.queueType === 'RANKED_SOLO_5x5') || entries[0];

            // --- PASO 3: Mapeo y Poblamiento en Cassandra ---
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
            console.log(`[PlayerRankingService] Ranking sincronizado con éxito para ${riotId}`);
            return newEntry;

        } catch (error) {
            console.error("Error sincronizando ranking en PlayerRankingService:", error.response ? error.response.data : error.message);
            throw error;
        }
    }

    async getPlayerHistory(playerId) {
        return await PlayerRankingRepository.getHistoryByPlayer(playerId);
    }
}

export default new PlayerRankingService();