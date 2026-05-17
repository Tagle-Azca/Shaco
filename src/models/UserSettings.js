import mongoose from 'mongoose';

const userSettingsSchema = new mongoose.Schema(
  {
    favoriteChampions: [{ type: String }],
    favoritePlayers: [{ type: String }],
    language: {
      type: String,
      default: 'en',
      enum: ['en', 'es', 'fr', 'de', 'pt', 'ja', 'ko', 'zh'],
    },
    theme: {
      type: String,
      default: 'dark',
      enum: ['light', 'dark'],
    },
    notificationsEnabled: {
      type: Boolean,
      default: true,
    },
    emailNotifications: {
      type: Boolean,
      default: false,
    },
    preferences: {
      showRankingHistory: { type: Boolean, default: true },
      showMatchDetails: { type: Boolean, default: true },
      autoRefresh: { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,
    collection: 'user_settings',
  }
);

const UserSettings = mongoose.model('UserSettings', userSettingsSchema);
export default UserSettings;
