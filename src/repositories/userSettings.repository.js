import UserSettings from '../models/UserSettings.js'

export const findSettingsById = async (id) => 
    await UserSettings.findById(id).lean();

export const updateSettingsById = async (id, data) =>
    UserSettings.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true, upsert: true }
    ).lean();

export const findFirstSettings = async () => UserSettings.findOne().lean();
