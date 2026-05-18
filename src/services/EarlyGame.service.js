const EarlyGameRepository = require('../repositories/EarlyGame.repository');
const axios = require('axios');

class EarlyGameService {
    async syncEarlyGameStats(matchId) {
        const region = process.env.RIOT_REGION_AMERICAS || 'americas';
        const url = `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}`;

        try {
            const response = await axios.get(url, {
                headers: { "X-Riot-Token": process.env.RIOT_API_KEY }
            });

            const info = response.data.info;
            
            const team100 = info.teams.find(t => t.teamId === 100);
            const team200 = info.teams.find(t => t.teamId === 200);

            let fbTeam = 'NONE';
            if (team100.objectives.champion.first) fbTeam = '100';
            else if (team200.objectives.champion.first) fbTeam = '200';

            let fdTeam = 'NONE';
            if (team100.objectives.dragon.first) fdTeam = '100';
            else if (team200.objectives.dragon.first) fdTeam = '200';

            // Determinar quién hizo el primer Heraldo (Nota: en parches recientes puede ser el Atormentador del Vacío)
            let fhTeam = 'NONE';
            if (team100.objectives.riftHerald && team100.objectives.riftHerald.first) fhTeam = '100';
            else if (team200.objectives.riftHerald && team200.objectives.riftHerald.first) fhTeam = '200';

            // Quién ganó la partida
            const winner = team100.win ? 'WIN_TEAM_100' : 'WIN_TEAM_200';

            const earlyStats = {
                game_mode: info.gameMode,
                match_timestamp: info.gameStartTimestamp,
                match_id: matchId,
                first_blood_team_id: fbTeam,
                first_blood_time: 0, 
                first_dragon_team_id: fdTeam,
                first_dragon_type: 'UNKNOWN', 
                first_herald_team_id: fhTeam,
                win_loss_result: winner
            };

            await EarlyGameRepository.create(earlyStats);
            return earlyStats;

        } catch (error) {
            console.error(`Error procesando early game para la partida ${matchId}:`, error);
            throw error;
        }
    }

    async getStatsByMode(gameMode) {
        return await EarlyGameRepository.getByGameMode(gameMode);
    }
}

module.exports = new EarlyGameService();