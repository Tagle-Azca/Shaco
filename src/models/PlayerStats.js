import mongoose from 'mongoose';

const playerStatsSchema = new mongoose.Schema(
  {
    puuid: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    avgKDA: {
      type: Number,
      default: 0,
    },
    winrate: {
      type: Number,
      default: 0,
    },
    preferredRoles: [{ type: String }],
    totalGamesPlayed: {
      type: Number,
      default: 0,
    },
    totalKills: {
      type: Number,
      default: 0,
    },
    totalDeaths: {
      type: Number,
      default: 0,
    },
    totalAssists: {
      type: Number,
      default: 0,
    },
    recentMatches: [
      {
        matchId: String,
        champion: String,
        result: Boolean,
        kda: String,
        date: Date,
      },
    ],
  },
  {
    timestamps: true,
    collection: 'player_stats',
  }
);

const PlayerStats = mongoose.model('PlayerStats', playerStatsSchema);
export default PlayerStats;
