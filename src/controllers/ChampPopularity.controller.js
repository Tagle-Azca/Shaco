const ChampPopularityService = require('../services/ChampPopularity.service');

class ChampPopularityController {
    async getMetaRanking(req, res) {
        try {
            const { weekNumber } = req.params;
            const limit = req.query.limit ? parseInt(req.query.limit) : 10;
            
            const ranking = await ChampPopularityService.getWeeklyMetaRanking(parseInt(weekNumber), limit);
            res.json(ranking);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async populateWeek(req, res) {
        try {
            const { weekNumber, popularityData } = req.body;
            const result = await ChampPopularityService.syncWeeklyPopularity(parseInt(weekNumber), popularityData);
            res.status(201).json({ message: "Métricas semanales de popularidad guardadas", data: result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ChampPopularityController();