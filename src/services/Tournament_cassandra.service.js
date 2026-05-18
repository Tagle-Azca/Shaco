const TournamentRepository = require('../repositories/Tournament_cassandra.repository');
const axios = require('axios');

class TournamentService {
    /**
     * Consume la API de LoL Esports de Riot para obtener la agenda/resultados
     * de un torneo y actualiza la tabla en Cassandra de forma directa.
     */
    async syncTournamentMatches(tournamentId) {
        try {
            const esportsUrl = `https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=es-MX&tournamentId=${tournamentId}`;
            
            console.log(`Consumiendo partidos del torneo ${tournamentId} desde Riot Esports...`);
            
            const response = await axios.get(esportsUrl, {
                headers: { 
                    "X-Riot-Token": process.env.RIOT_API_KEY
                }
            });
            const events = response.data.data.schedule.events;
            const completedMatches = events.filter(event => 
                event.type === 'match' && 
                event.state === 'completed'
            );

            if (!completedMatches.length) {
                return { tournamentId, status: "No se encontraron partidas completadas para actualizar." };
            }

            const promises = completedMatches.map(event => {
                const matchDetails = event.match;
                const teamA = matchDetails.teams[0];
                const teamB = matchDetails.teams[1];

                let winnerId = 'TBD';
                if (teamA.result && teamA.result.outcome === 'win') {
                    winnerId = teamA.id; // ID oficial del equipo (ej: T1, G2)
                } else if (teamB.result && teamB.result.outcome === 'win') {
                    winnerId = teamB.id;
                }

                const data = {
                    tournament_id: tournamentId,                     
                    match_date: new Date(event.startTime),           
                    match_id: matchDetails.id,                       
                    team_a_name: teamA.name,
                    team_b_name: teamB.name,
                    team_a_score: teamA.result ? teamA.result.gameWins : 0, 
                    team_b_score: teamB.result ? teamB.result.gameWins : 0, 
                    winner_id: winnerId,
                    stage: event.blockName || 'Playoffs'             
                };

                return TournamentRepository.create(data);
            });

            await Promise.all(promises);
            
            console.log(`¡Sincronización de torneo completada! ${promises.length} partidos actualizados.`);
            return { 
                tournamentId, 
                status: "SUCCESS", 
                matchesUpdated: promises.length 
            };

        } catch (error) {
            console.error(`Error crítico al sincronizar el torneo ${tournamentId}:`, error);
            throw error;
        }
    }

    async getTournamentBracket(tournamentId) {
        return await TournamentRepository.getMatchesByTournament(tournamentId);
    }
}

module.exports = new TournamentService();