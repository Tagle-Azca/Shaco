const SeasonStatsService = require('../services/SeasonStats.service');

class SeasonStatsController {
    async getHistory(req, res) {
        try {
            const { playerId } = req.params;
            const history = await SeasonStatsService.getPlayerHistory(playerId);
            res.json(history);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateStats(req, res) {
        try {
            const { playerIdInternal, seasonId, matchParticipantData, currentTier } = req.body;
            const updated = await SeasonStatsService.addMatchToSeasonStats(
                playerIdInternal, 
                seasonId, 
                matchParticipantData, 
                currentTier
            );
            res.status(200).json({ message: "Estadísticas de temporada actualizadas", data: updated });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new SeasonStatsController();