
import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema(
  {
    matchId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    puuid: {
      type: String,
      required: true,
      index: true,
    },
    champion: { type: String, default: '' },
    kills: { type: Number, default: 0 },
    deaths: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
    win: { type: Boolean, default: false },
    cs: { type: Number, default: 0 },
    damage: { type: Number, default: 0 },
    duration: { type: Number, default: 0 },
    gameMode: { type: String, default: '' },
    goldGraph: [
      {
        minute: Number,
        blueTeam: Number,
        redTeam: Number,
      },
    ],
    damageGraph: [
      {
        minute: Number,
        blueTeam: Number,
        redTeam: Number,
      },
    ],
    objectiveSummary: {
      towers: {
        blueTeam: Number,
        redTeam: Number,
      },
      dragons: {
        blueTeam: Number,
        redTeam: Number,
      },
      barons: {
        blueTeam: Number,
        redTeam: Number,
      },
    },
  },
  {
    timestamps: true,
    collection: 'matches',
  }
);

const Match = mongoose.model('Match', matchSchema);
export default Match;