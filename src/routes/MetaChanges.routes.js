import express from 'express';
import MetaChangesController from '../controllers/MetaChanges.controller.js';
const router = express.Router();

// Obtener estadísticas de todos los campeones en un parche
router.get('/:patchVersion', MetaChangesController.getMeta);

// Poblar datos del meta (usualmente llamado por un script de ingesta)
router.post('/populate', MetaChangesController.populate);

export default router;