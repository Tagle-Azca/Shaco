import * as cassandra from '../utils/cassandra.js';

/**
 * 1. Seguimiento Histórico del Ranking
 * Obtiene la evolución de elo de un jugador ordenado por fecha (desc).
 */
export const getPlayerRankingHistory = async (playerId) => {
  const cql = `SELECT * FROM player_ranking_history WHERE player_id = ?`;
  return await cassandra.query(cql, [playerId]);
};

/**
 * 2. Log de partidas por usuario
 * Obtiene las últimas N partidas de un jugador.
 */
export const getPlayerMatchLog = async (playerId, limit = 10) => {
  const cql = `SELECT * FROM player_match_log WHERE player_id = ? LIMIT ?`;
  return await cassandra.query(cql, [playerId, limit]);
};

/**
 * 3. Registro de Cambios en el Meta
 * Obtiene las estadísticas de un campeón específico en un parche determinado.
 */
export const getChampionStatsByPatch = async (patchVersion, championId) => {
  const cql = `SELECT * FROM meta_changes_by_patch WHERE patch_version = ? AND champion_id = ?`;
  return await cassandra.query(cql, [patchVersion, championId]);
};

/**
 * 4. Resultados en Torneos Internacionales
 * Obtiene todos los encuentros de un torneo específico.
 */
export const getTournamentMatches = async (tournamentId) => {
  const cql = `SELECT * FROM international_tournaments WHERE tournament_id = ?`;
  return await cassandra.query(cql, [tournamentId]);
};

/**
 * 5. Historial de Objetivos Tempranos
 * Filtra por modo de juego (ej. 'CLASSIC' o 'RANKED_SOLO_5x5') y fecha.
 */
export const getEarlyGameStatsByMode = async (gameMode, limit = 20) => {
  const cql = `SELECT * FROM early_game_stats WHERE game_mode = ? LIMIT ?`;
  return await cassandra.query(cql, [gameMode, limit]);
};

/**
 * 6. Estadísticas Acumulativas por Temporada
 * Obtiene el resumen de desempeño de un jugador en una temporada específica.
 */
export const getPlayerSeasonStats = async (playerId, seasonId) => {
  const cql = `SELECT * FROM season_player_stats WHERE player_id = ? AND season_id = ?`;
  return await cassandra.query(cql, [playerId, seasonId]);
};

/**
 * 7. Registro de Popularidad Semanal
 * Obtiene los campeones más jugados de una semana específica.
 * Gracias al CLUSTERING ORDER, los resultados ya vienen ordenados por pick_count DESC.
 */
export const getWeeklyTopChampions = async (weekNumber, limit = 10) => {
  const cql = `SELECT * FROM champion_popularity_weekly WHERE week_number = ? LIMIT ?`;
  return await cassandra.query(cql, [weekNumber, limit]);
};