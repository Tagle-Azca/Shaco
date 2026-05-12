<<<<<<< HEAD
import { Router } from 'express';
import { getStoredPlayerProfile, syncPlayerProfile } from '../controllers/player.controller.js';

const router = Router();

router.get('/profile', syncPlayerProfile);
router.get('/:puuid', getStoredPlayerProfile);

export default router;
=======
const { Router } = require('express');
>>>>>>> 8494115 (router)

const router = Router();

// TODO Ethan (MongoDB)

module.exports = router;
