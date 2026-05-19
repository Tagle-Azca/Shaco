import EarlyGameRepository from '../repositories/EarlyGame.repository.js';
import axios from 'axios';

class EarlyGameService {
    async syncEarlyGameStats(matchId) {
        const token = process.env.RIOT_API_KEY;
        const url = `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}`;

        try {
            const response = await axios.get(url, {
                headers: { "X-Riot-Token": token }
            });

            const matchData = response.data;
            
            // 1. Validar que la data e "info" existan
            if (!matchData || !matchData.info) {
                throw new Error("No se pudo obtener la información detallada de la partida.");
            }

            const info = matchData.info;
            const teams = info.teams;

            if (!teams || teams.length < 2) {
                throw new Error("La estructura de equipos de la partida está incompleta.");
            }

            const blueTeam = teams.find(t => t.teamId === 100);
            const redTeam = teams.find(t => t.teamId === 200);

            let firstBloodTeamId = "NONE";
            if (blueTeam?.objectives?.champion?.first) firstBloodTeamId = "100";
            else if (redTeam?.objectives?.champion?.first) firstBloodTeamId = "200";

            let firstDragonTeamId = "NONE";
            if (blueTeam?.objectives?.dragon?.first) firstDragonTeamId = "100";
            else if (redTeam?.objectives?.dragon?.first) firstDragonTeamId = "200";

            let firstHordeOrHeraldTeamId = "NONE";
            if (blueTeam?.objectives?.riftHerald?.first) firstHordeOrHeraldTeamId = "100";
            else if (redTeam?.objectives?.riftHerald?.first) firstHordeOrHeraldTeamId = "200";

            const earlyStatsEntry = {
                game_mode: info.gameMode,
                match_timestamp: new Date(info.gameStartTimestamp), // O info.gameCreation
                match_id: matchId,
                first_blood_team_id: firstBloodTeamId,
                first_blood_time: 0, // Nota: El tiempo exacto requiere procesar la Timeline de la partida, puedes dejarlo en 0 por ahora
                first_dragon_team_id: firstDragonTeamId,
                first_dragon_type: firstDragonTeamId !== "NONE" ? "UNKNOWN" : "NONE", // Mismo caso, requiere timeline para saber el elemento exacto
                first_herald_team_id: firstHordeOrHeraldTeamId,
                win_loss_result: info.teams[0].win ? "BLUE_WIN" : "RED_WIN"
            };
            
            console.log(`[EarlyGameService] Estadísticas tempranas procesadas para la partida ${matchId}`);
            return earlyStatsEntry;

        } catch (error) {
            console.error(`Error procesando early game para la partida ${matchId}:`, error.message);
            throw error;
        }
    }
}

export default new EarlyGameService();