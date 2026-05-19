const MatchLog = {
    player_id: null,        // UUID
    match_timestamp: null,  // Timestamp (ms)
    match_id: '',           // ID de Riot (ej. LA1_12345)
    game_mode: '',          // CLASSIC, ARENA, etc.
    champion_id: 0,
    participants: [],       // Array de strings (nombres de invocador)
    win: false,
    duration: 0             // Segundos
};

export default MatchLog;