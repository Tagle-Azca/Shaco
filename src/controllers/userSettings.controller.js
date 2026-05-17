import { getSettings, updateSettings, getFirstSettings } from "../services/userSettings.service.js";

export const getUserSettings = async (req, res, next) => {
    try {
        const settings = await getSettings(req.params.id)
        res.status(200).json(settings);
    } catch (error) {
        next(error);
    }
};

export const updateUserSettings = async (req, res, next) => {
    try {
        const settings = await updateSettings(req.params.id, req.body)
        res.status(200).json(settings);
    } catch (error) {
        next(error);
    }
};

export const getFirstSettingsController = async (req, res, next) => {
    try {
        const settings = await getFirstSettings();
        res.status(200).json(settings);
    } catch (error) {
        next(error);
    }
};
