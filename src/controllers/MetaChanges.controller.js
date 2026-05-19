import MetaChangesService from "../services/MetaChanges.service.js";
class MetaChangesController {
    async getMeta(req, res) {
        try {
            const { patchVersion } = req.params;
            const meta = await MetaChangesService.getMetaByPatch(patchVersion);
            res.json(meta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async populate(req, res) {
        try {
            const { patchVersion, stats } = req.body;
            const result = await MetaChangesService.syncMetaForPatch(patchVersion, stats);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new MetaChangesController();