import { Router } from 'express';
import { getUserSettings, updateUserSettings, getFirstSettingsController } from '../controllers/userSettings.controller.js';

const router = Router();

router.get('/', getFirstSettingsController);
router.get('/:id', getUserSettings);
router.patch('/:id', updateUserSettings);
export default router;