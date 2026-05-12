<<<<<<< HEAD
import { Router } from 'express';
import { getMatchesByPuuid, syncMatches } from '../controllers/match.controller.js';

const router = Router();
router.get('/:puuid', getMatchesByPuuid);
router.post('/sync/:puuid', syncMatches);

export default router;
=======
const { Router } = require('express');

const router = Router();

// TODO Ethan (MongoDB)

module.exports = router;
>>>>>>> 8494115 (router)
