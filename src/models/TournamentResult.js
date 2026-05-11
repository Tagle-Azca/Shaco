
import mongoose from 'mongoose';

const tournamentResultSchema = new mongoose.Schema(
  {
    tournamentId: {
      type: String,
      required: true,
      index: true,
    },
    matchDate: {
      type: Date,
      required: true,
    },
    teamA: {
      type: String,
      required: true,
    },
    teamB: {
      type: String,
      required: true,
    },
    teamAScore: {
      type: Number,
      required: true,
    },
    teamBScore: {
      type: Number,
      required: true,
    },
    winnerId: {
      type: String,
      required: true,
    },
    patch: String,
    duration: Number,
  },
  {
    timestamps: true,
    collection: 'tournament_results',
  }
);

const TournamentResult = mongoose.model('TournamentResult', tournamentResultSchema);
export default TournamentResult;