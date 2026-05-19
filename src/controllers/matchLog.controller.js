import matchLogService from "../repositories/matchLog.service.js";
class MatchLogController {
    async getLatest(req, res) {
        try {
            const { playerId } = req.params;
            const match = await matchLogService.getPlayerLastMatch(playerId);
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
            const result = await matchLogService.syncLatestMatch(puuid, playerIdInternal);
            res.status(201).json({ message: "Partida sincronizada", data: result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new MatchLogController();