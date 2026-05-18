const express = require('express');
const router = express.Router();
const MatchLogController = require('../controllers/matchLog.controller');

router.get('/:playerId/latest', MatchLogController.getLatest);
router.post('/sync', MatchLogController.sync);

module.exports = router;