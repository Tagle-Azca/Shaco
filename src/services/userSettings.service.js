import ApiError from '../utils/apiError.js';
import { findSettingsById, updateSettingsById, findFirstSettings } from '../repositories/userSettings.repository.js';

export const getSettings = async (id) => {
    if (!id) throw new ApiError(400, 'User ID is required');
    const settings = await findSettingsById(id);
    if (!settings) throw new ApiError(404, 'User settings not found');
    return settings;
};

export const updateSettings = async (id, data) => {
    if (!id) throw new ApiError(400, 'User ID is required');
    return updateSettingsById(id, data);
}

export const getFirstSettings = async () => {
    const settings = await findFirstSettings();
    if (!settings) throw new ApiError(404, 'First user settings not found');
    return settings;
}