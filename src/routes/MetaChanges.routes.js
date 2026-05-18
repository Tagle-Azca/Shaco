const express = require('express');
const router = express.Router();
const MetaChangesController = require('../controllers/MetaChanges.controller');

// Obtener estadísticas de todos los campeones en un parche
router.get('/:patchVersion', MetaChangesController.getMeta);

// Poblar datos del meta (usualmente llamado por un script de ingesta)
router.post('/populate', MetaChangesController.populate);

module.exports = router;