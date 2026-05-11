import mongoose from 'mongoose';

const championSchema = new mongoose.Schema(
  {
    championId: {
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
    roles: [{ type: String }],
    baseStats: {
      hp: Number,
      armor: Number,
      mr: Number,
      ad: Number,
    },
    abilities: {
      passive: String,
      q: String,
      w: String,
      e: String,
      r: String,
    },
    recommendedMaxOrder: [{ type: String }],
    tips: [{ type: String }],
  },
  {
    timestamps: true,
    collection: 'champions',
  }
);

const Champion = mongoose.model('Champion', championSchema);
export default Champion;