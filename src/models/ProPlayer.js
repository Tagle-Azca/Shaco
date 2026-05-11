
import mongoose from 'mongoose';

const proPlayerSchema = new mongoose.Schema(
  {
    proPlayerId: {
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
    username: {
      type: String,
      required: true,
      trim: true,
    },
    teamId: {
      type: String,
      required: true,
      index: true,
    },
    nationality: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ['TOP', 'JUNGLE', 'MID', 'BOT', 'SUPPORT'],
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'pro_players',
  }
);

const ProPlayer = mongoose.model('ProPlayer', proPlayerSchema);
export default ProPlayer;