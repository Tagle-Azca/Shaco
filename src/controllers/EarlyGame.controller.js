const EarlyGameService = require('../services/EarlyGame.service');

class EarlyGameController {
    async getStats(req, res) {
        try {
            const { gameMode } = req.params;
            const stats = await EarlyGameService.getStatsByMode(gameMode.toUpperCase());
            res.json(stats);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async syncMatch(req, res) {
        try {
            const { matchId } = req.body;
            const result = await EarlyGameService.syncEarlyGameStats(matchId);
            res.status(201).json({ message: "Métricas de Early Game procesadas", data: result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new EarlyGameController();