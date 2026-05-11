import dotenv from 'dotenv';
dotenv.config();

import { connectMongo } from '../src/utils/mongo.js';
import { findChampionById, findChampionsByRole, getAllChampions } from '../src/repositories/champion.repository.js';
import { findMatchesByPuuid } from '../src/repositories/match.repository.js';
import { findPicksByPatch, getWinrateByChampionInPatch, findResultsByTournament } from '../src/repositories/tournament.repository.js';
import { findPlayersByRegion } from '../src/repositories/ranking.repository.js';
import { findPlayerByPuuid } from '../src/repositories/player.repository.js';
import { syncSummonerProfile } from '../src/services/player.service.js';
import { syncMatchesForPlayer } from '../src/services/match.service.js';
import { syncChampions } from '../src/services/champion.service.js';

const test = async () => {
    await connectMongo();

    console.log('\n--- findPlayerByPuuid ---');
    const player = await findPlayerByPuuid('puuid-faker-001');
    console.log(player);

    console.log('\n--- findChampionById ---');
    const champ = await findChampionById('157');
    console.log(champ);

    console.log('\n--- findChampionsByRole ---');
    const mids = await findChampionsByRole('MID');
    console.log(mids);

    console.log('\n--- getAllChampions ---');
    const all = await getAllChampions();
    console.log(all);

    console.log('\n--- findMatchesByPuuid ---');
    const matches = await findMatchesByPuuid('puuid-faker-001');
    console.log(matches);

    console.log('\n--- findPicksByPatch ---');
    const picks = await findPicksByPatch('14.6');
    console.log(picks);

    console.log('\n--- getWinrateByChampionInPatch (PIPELINE) ---');
    const winrates = await getWinrateByChampionInPatch('14.6');
    console.log(winrates);

    console.log('\n--- findResultsByTournament ---');
    const results = await findResultsByTournament('LCK_Spring_2024');
    console.log(results);

    console.log('\n--- findPlayersByRegion ---');
    const krPlayers = await findPlayersByRegion('kr');
    console.log(krPlayers);
    /*
    console.log('\n--- Riot API: syncSummonerProfile ---');
    const riotPlayer = await syncSummonerProfile({
    region: 'la1',
    gameName: 'Alica',
    tagLine: 'Xia'
    });
    console.log(riotPlayer);

    console.log('\n--- Riot API: syncMatchesForPlayer ---');
    await syncMatchesForPlayer({
        puuid: riotPlayer.puuid,
        routingRegion: 'americas'
    });
    console.log('Matches synced.');
    */
    console.log('\n --- Syncing champions from DataDragon ---');
    await syncChampions();
    console.log('Champions synced.');   

    
    process.exit(0);
};

test().catch((err) => {
    console.error('Error:', err);
    process.exit(1);
});