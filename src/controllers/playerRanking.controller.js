import PlayerRankingService from "../services/PlayerRanking.service.js";
class PlayerRankingController {
    async getHistory(req, res) {
        try {
            const { playerId } = req.params;
            const history = await PlayerRankingService.getPlayerHistory(playerId);
            res.json(history);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async sync(req, res) {
        try {
            const { summonerId, playerIdInternal } = req.body;
            const result = await PlayerRankingService.syncPlayerRanking(summonerId, playerIdInternal);
            res.status(201).json({ message: "Sincronización exitosa", data: result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new PlayerRankingController();