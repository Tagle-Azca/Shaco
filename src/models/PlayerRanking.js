const PlayerRanking = {
    player_id: null,        // UUID
    date: null,             // Timestamp
    tier: '',               // Gold, Platinum, etc.
    rank: '',               // I, II, III, IV
    league_points: 0,
    wins: 0,
    losses: 0,
    series_progress: null   // Opcional (WLL)
};

module.exports = PlayerRanking;