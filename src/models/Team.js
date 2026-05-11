
import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema(
  {
    teamId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    region: {
      type: String,
      required: true,
      index: true,
    },
    roster: [
      {
        proPlayerId: String,
        username: String,
        role: {
          type: String,
          enum: ['TOP', 'JUNGLE', 'MID', 'BOT', 'SUPPORT'],
        },
      },
    ],
  },
  {
    timestamps: true,
    collection: 'pro_teams',
  }
);

const Team = mongoose.model('Team', teamSchema);
export default Team;