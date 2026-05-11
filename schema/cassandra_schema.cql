CREATE KEYSPACE IF NOT EXISTS shaco_analytics 
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE shaco_analytics;

-- 1. Seguimiento Histórico del Ranking
CREATE TABLE IF NOT EXISTS player_ranking_history (
    player_id uuid,
    date timestamp,
    tier text,
    rank text,
    league_points int,
    wins int,
    losses int,
    series_progress text,
    PRIMARY KEY (player_id, date)
) WITH CLUSTERING ORDER BY (date DESC);

-- 2. Log de la última partida por usuario
CREATE TABLE IF NOT EXISTS player_match_log (
    player_id uuid,
    match_timestamp timestamp,
    match_id text,
    game_mode text,
    champion_id int,
    participants list<text>,
    win boolean,
    duration int,
    PRIMARY KEY (player_id, match_timestamp)
) WITH CLUSTERING ORDER BY (match_timestamp DESC);

-- 3. Registro de Cambios en el Meta (Campeones por Patch)
CREATE TABLE IF NOT EXISTS meta_changes_by_patch (
    patch_version text,
    champion_id int,
    global_win_rate float,
    global_pick_rate float,
    global_ban_rate float,
    total_games_analyzed bigint,
    PRIMARY KEY (patch_version, champion_id)
);

-- 4. Resultados en Torneos Internacionales
CREATE TABLE IF NOT EXISTS international_tournaments (
    tournament_id uuid,
    match_date timestamp,
    match_id text,
    team_a_name text,
    team_b_name text,
    team_a_score int,
    team_b_score int,
    winner_id text,
    stage text,
    PRIMARY KEY (tournament_id, match_date, match_id)
);

-- 5. Historial de First Blood y Objetivos Tempranos
CREATE TABLE IF NOT EXISTS early_game_stats (
    game_mode text,
    match_timestamp timestamp,
    match_id text,
    first_blood_team_id text,
    first_blood_time int,
    first_dragon_team_id text,
    first_dragon_type text,
    first_herald_team_id text,
    win_loss_result text,
    PRIMARY KEY (game_mode, match_timestamp, match_id)
);

-- 6. Estadísticas Acumulativas por Temporada
CREATE TABLE IF NOT EXISTS season_player_stats (
    player_id uuid,
    season_id text,
    total_games_played int,
    total_kills int,
    total_deaths int,
    total_assists int,
    highest_tier_achieved text,
    most_played_champion_id int,
    average_kda float,
    PRIMARY KEY (player_id, season_id)
);

-- 7. Registro de Popularidad (Pick Rate) por Semana
CREATE TABLE IF NOT EXISTS champion_popularity_weekly (
    week_number int,
    pick_count bigint,
    champion_id int,
    tier_avg text,
    win_rate_in_week float,
    PRIMARY KEY (week_number, pick_count, champion_id)
) WITH CLUSTERING ORDER BY (pick_count DESC, champion_id ASC);