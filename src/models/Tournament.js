
import mongoose from 'mongoose';

const tournamentSchema = new mongoose.Schema(
  {
    patchId: {
      type: String,
      required: true,
      index: true,
    },
    tournament: {
      type: String,
      required: true,
      index: true,
    },
    picks: [
      {
        championId: String,
        teamId: String,
        items: [String],
        runes: [String],
        win: Boolean,
      },
    ],
  },
  {
    timestamps: true,
    collection: 'competitive_patches',
  }
);

const Tournament = mongoose.model('Tournament', tournamentSchema);
export default Tournament;