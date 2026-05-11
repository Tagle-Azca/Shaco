import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectMongo } from '../src/utils/mongo.js';
import Champion from '../src/models/Champion.js';
import Match from '../src/models/Match.js';
import ProPlayer from '../src/models/ProPlayer.js';
import Team from '../src/models/Team.js';
import Tournament from '../src/models/Tournament.js';
import TournamentResult from '../src/models/TournamentResult.js';
import Player from '../src/models/Player.js';

dotenv.config();

const seed = async () => {
  await connectMongo();

  // Limpiar colecciones
  await Promise.all([
    Player.deleteMany(),
    Champion.deleteMany(),
    Match.deleteMany(),
    ProPlayer.deleteMany(),
    Team.deleteMany(),
    Tournament.deleteMany(),
    TournamentResult.deleteMany(),
  ]);

  console.log('Colecciones limpiadas');

  // Players
  await Player.insertMany([
    {
      puuid: 'puuid-faker-001',
      summonerName: 'Faker',
      tag: 'KR1',
      profileIconId: 4895,
      summonerLevel: 412,
      region: 'kr',
    },
    {
      puuid: 'puuid-caps-002',
      summonerName: 'Caps',
      tag: 'EUW1',
      profileIconId: 3210,
      summonerLevel: 380,
      region: 'euw1',
    },
    {
      puuid: 'puuid-chovy-003',
      summonerName: 'Chovy',
      tag: 'KR2',
      profileIconId: 1234,
      summonerLevel: 395,
      region: 'kr',
    },
  ]);

  console.log('Players seeded');

  // Teams
  await Team.insertMany([
    {
      teamId: 'T1_KR',
      name: 'T1',
      region: 'LCK',
      roster: [
        { proPlayerId: 'pro_001', username: 'Zeus', role: 'TOP' },
        { proPlayerId: 'pro_002', username: 'Oner', role: 'JUNGLE' },
        { proPlayerId: 'pro_003', username: 'Faker', role: 'MID' },
        { proPlayerId: 'pro_004', username: 'Gumayusi', role: 'BOT' },
        { proPlayerId: 'pro_005', username: 'Keria', role: 'SUPPORT' },
      ],
    },
    {
      teamId: 'GEN_KR',
      name: 'Gen.G',
      region: 'LCK',
      roster: [
        { proPlayerId: 'pro_006', username: 'Doran', role: 'TOP' },
        { proPlayerId: 'pro_007', username: 'Peanut', role: 'JUNGLE' },
        { proPlayerId: 'pro_008', username: 'Chovy', role: 'MID' },
        { proPlayerId: 'pro_009', username: 'Peyz', role: 'BOT' },
        { proPlayerId: 'pro_010', username: 'Lehends', role: 'SUPPORT' },
      ],
    },
  ]);

  console.log('Teams seeded');

  // ProPlayers
  await ProPlayer.insertMany([
    {
      proPlayerId: 'pro_003',
      name: 'Lee Sang-hyeok',
      username: 'Faker',
      teamId: 'T1_KR',
      nationality: 'KR',
      role: 'MID',
    },
    {
      proPlayerId: 'pro_008',
      name: 'Jeong Ji-hoon',
      username: 'Chovy',
      teamId: 'GEN_KR',
      nationality: 'KR',
      role: 'MID',
    },
  ]);

  console.log('ProPlayers seeded');

  // Matches
  await Match.insertMany([
    {
      matchId: 'KR_123456',
      puuid: 'puuid-faker-001',
      goldGraph: [
        { minute: 5, blueTeam: 8200, redTeam: 7900 },
        { minute: 10, blueTeam: 18500, redTeam: 17200 },
        { minute: 20, blueTeam: 42000, redTeam: 38500 },
        { minute: 30, blueTeam: 71000, redTeam: 65000 },
      ],
      damageGraph: [
        { minute: 10, blueTeam: 12000, redTeam: 11500 },
        { minute: 20, blueTeam: 38000, redTeam: 35000 },
        { minute: 30, blueTeam: 72000, redTeam: 68000 },
      ],
      objectiveSummary: {
        towers: { blueTeam: 8, redTeam: 3 },
        dragons: { blueTeam: 3, redTeam: 1 },
        barons: { blueTeam: 1, redTeam: 0 },
      },
    },
  ]);

  console.log('Matches seeded');

  // Tournaments
  await Tournament.insertMany([
    {
      patchId: '14.6',
      tournament: 'LCK_Spring_2024',
      picks: [
        {
          championId: '157',
          teamId: 'T1_KR',
          items: ['Trinity Force', 'Immortal Shieldbow', 'Infinity Edge'],
          runes: ['Lethal Tempo', 'Triumph', 'Legend: Alacrity'],
          win: true,
        },
        { 
          championId: '238',
          teamId: 'GEN_KR',
          items: ['Duskblade', 'Serpent\'s Fang', 'Edge of Night'],
          runes: ['Electrocute', 'Sudden Impact', 'Eyeball Collection'],
          win: false,
        },
        {
          championId: '91',
          teamId: 'T1_KR',
          items: ['Duskblade', 'Edge of Night', 'Serpent\'s Fang'],
          runes: ['Electrocute', 'Sudden Impact', 'Treasure Hunter'],
          win: true,
        },
      ],
    },
  ]);

  console.log('Tournaments seeded');

  // Tournament Results
  await TournamentResult.insertMany([
    {
      tournamentId: 'LCK_Spring_2024',
      matchDate: new Date('2024-03-15'),
      teamA: 'T1_KR',
      teamB: 'GEN_KR',
      teamAScore: 2,
      teamBScore: 0,
      winnerId: 'T1_KR',
      patch: '14.6',
      duration: 1842,
    },
    {
      tournamentId: 'LCK_Spring_2024',
      matchDate: new Date('2024-03-20'),
      teamA: 'GEN_KR',
      teamB: 'T1_KR',
      teamAScore: 2,
      teamBScore: 1,
      winnerId: 'GEN_KR',
      patch: '14.6',
      duration: 2100,
    },
  ]);

  console.log('Tournament Results seeded');
  console.log('Seed completo');
  process.exit(0);
};

seed().catch((err) => {
  console.error('Error en seed:', err);
  process.exit(1);
});