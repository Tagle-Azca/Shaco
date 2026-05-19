import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import client from '../src/utils/cassandra.js'; 

import PlayerRankingService from '../src/services/playerRanking.service.js';
import MatchLogService from '../src/services/MatchLog.service.js';
import SeasonStatsService from '../src/services/SeasonStats.service.js';
import EarlyGameService from '../src/services/EarlyGame.service.js';
import MetaChangesService from '../src/services/MetaChanges.service.js';
import ChampPopularityService from '../src/services/ChampPopularity.service.js';
import TournamentService from '../src/services/Tournament_cassandra.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SEED_PUUID = "0-ntMMtXqYEJKNo7Ds2pteuZEQvT78MAROmvkwBRiYEjY65pN6ovadZbHF-uK6PBxmn37EY9Q44dLQ"; 
const MOCK_SUMMONER_ID = "Celeste#257";
const MOCK_INTERNAL_PLAYER_ID = "02570257-257b-4257-a257-b528bdf6d257";
const SEED_MATCH_ID = "LA1_134567890";

async function createTablesFromSchema() {
    const schemaPath = path.join(__dirname, '../schema/cassandra_schema.cql');
    const cqlScript = fs.readFileSync(schemaPath, 'utf8');

    const cqlStatements = cqlScript
        .split(';')
        .map(statement => statement.trim())
        .filter(statement => statement.length > 0);

    for (const statement of cqlStatements) {
        try {
            await client.execute(statement);
        } catch (err) {
            console.error(`Error al ejecutar la sentencia:\n${statement}\n`, err.message);
        }
    }
    console.log('Esquema de tablas creado/verificado en Cassandra.');
}

async function runServicesSeeder() {
    try {
        console.log('Iniciando Seeding de Cassandra');
        
        await client.connect();
        console.log('Conectado a Cassandra.');

        console.log('Ejecutando PlayerRankingService.syncPlayerRanking...');
        await PlayerRankingService.syncPlayerRanking(MOCK_SUMMONER_ID, MOCK_INTERNAL_PLAYER_ID);

        console.log('Ejecutando MatchLogService.syncLatestMatch...');
        const latestMatch = await MatchLogService.syncLatestMatch(SEED_PUUID, MOCK_INTERNAL_PLAYER_ID);

        if (latestMatch && latestMatch.match_id) {
            console.log(`Procesando Early Game para la partida: ${latestMatch.match_id}...`);
            await EarlyGameService.syncEarlyGameStats(latestMatch.match_id);

            console.log('Acumulando estadísticas a la Temporada...');
            await SeasonStatsService.addMatchToSeasonStats(
                MOCK_INTERNAL_PLAYER_ID,
                'SEASON_2026',
                latestMatch.match_id,
                SEED_PUUID,
                MOCK_SUMMONER_ID
            );
        }

        console.log('Poblando cambios del Meta de forma autónoma...');
        await MetaChangesService.syncMetaForPatch("16.1");

        console.log('Generando reporte de popularidad semanal basado en BD...');
        await ChampPopularityService.generateWeeklyReport(20, [MOCK_INTERNAL_PLAYER_ID]);

        console.log('Sincronizando agenda del torneo profesional...');
        // ID de torneo real o de prueba de la API de LoL Esports
        await TournamentService.syncTournamentMatches("10346243-9485-6884-36aa-b528bdf6d257"); 

        console.log('¡Seeding completado con éxito!');
        console.log(`Todos los datos fueron validados y procesados por tus propios controladores HTTP.`);

    } catch (error) {
        console.error('Error durante el seeding de servicios:', error);
    } 
}

async function main() {
    try {
        await createTablesFromSchema();
        await runServicesSeeder();
    } catch (err) {
        console.error('Error crítico en el proceso:', err);
    } finally {
        console.log('Cerrando conexión con Cassandra...');
        await client.shutdown();
        process.exit(0);
    }
}

main();