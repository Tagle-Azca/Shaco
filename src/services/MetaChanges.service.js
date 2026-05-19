import MetaChangesRepository from '../repositories/MetaChanges.repository.js';
import axios from 'axios';
class MetaChangesService {
    async syncMetaForPatch(patchVersion) {
        try {
            const riotUrl = `https://ddragon.leagueoflegends.com/cdn/${patchVersion}.1/data/es_MX/champion.json`;
            
            console.log(`Consumiendo datos de Riot para el parche ${patchVersion}...`);
            const response = await axios.get(riotUrl);
            
            const championsData = response.data.data; 
            const championsList = Object.values(championsData); 
            const promises = championsList.map(champion => {
                
                const simulatedWinRate = parseFloat((45 + Math.random() * 10).toFixed(2));  // Entre 45% y 55%
                const simulatedPickRate = parseFloat((1 + Math.random() * 15).toFixed(2));  // Entre 1% y 16%
                const simulatedBanRate = parseFloat((0 + Math.random() * 20).toFixed(2));   // Entre 0% y 20%
                const simulatedTotalGames = 50000 + Math.floor(Math.random() * 100000);

                const data = {
                    patch_version: patchVersion,
                    champion_id: parseInt(champion.key), 
                    global_win_rate: simulatedWinRate,
                    global_pick_rate: simulatedPickRate,
                    global_ban_rate: simulatedBanRate,
                    total_games_analyzed: simulatedTotalGames
                };
                return MetaChangesRepository.updateOrInsert(data);
            });
            await Promise.all(promises);
            console.log(`¡Poblamiento exitoso! Se registraron ${championsList.length} campeones.`);
            return { patch: patchVersion, championsUpdated: championsList.length };
            
        } catch (error) {
            console.error("Error al consumir de Riot o poblar Cassandra:", error);
            throw error;
        }
    }

    async getMetaByPatch(patchVersion) {
        // Lee directamente de Cassandra sin tocar la API de Riot
        return await MetaChangesRepository.getByPatch(patchVersion);
    }
}

export default new MetaChangesService();