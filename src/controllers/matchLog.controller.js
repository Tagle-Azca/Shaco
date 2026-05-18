const MatchLogService = require('../services/matchLog.service');

class MatchLogController {
    async getLatest(req, res) {
        try {
            const { playerId } = req.params;
            const match = await MatchLogService.getPlayerLastMatch(playerId);
            if (!match) return res.status(404).json({ message: "No se encontraron partidas" });
            res.json(match);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async sync(req, res) {
        try {
            // Recibimos el PUUID de Riot y nuestro ID interno de la base de datos
            const { puuid, playerIdInternal } = req.body;
            const result = await MatchLogService.syncLatestMatch(puuid, playerIdInternal);
            res.status(201).json({ message: "Partida sincronizada", data: result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new MatchLogController();