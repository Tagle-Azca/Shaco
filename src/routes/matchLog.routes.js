import express from 'express';
import MatchLogController from '../controllers/matchLog.controller.js';
const router = express.Router();
router.get('/:playerId/latest', MatchLogController.getLatest);
router.post('/sync', MatchLogController.sync);

export default router;