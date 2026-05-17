import 'dotenv/config';
import { connectMongo }  from '../src/utils/mongo.js';
import { mutate, alter, dropAll } from '../src/utils/dgraph.js';
import Player    from '../src/models/Player.js';
import Champion  from '../src/models/Champion.js';
import ProPlayer from '../src/models/ProPlayer.js';
import Team      from '../src/models/Team.js';
import Match from '../src/models/Match.js';
import PlayerStats from '../src/models/PlayerStats.js';
import UserSettings from '../src/models/UserSettings.js';

import { DGRAPH_SCHEMA } from './seed/schema.js';
import { PLAYERS, TEAMS, PRO_PLAYERS, MATCHES, PLAYER_STATS, USER_SETTINGS } from './seed/mongoData.js';
import { CHAMPION_NODES, SYNERGY_EDGES, COUNTER_EDGES } from './seed/championsData.js';
import { PLAYER_NODES, PLAYED_WITH_EDGES, MAINS_EDGES } from './seed/playersData.js';
import { ORG_NODES, TEAM_NODES, HAS_TEAM_EDGES, PRO_PLAYER_NODES, HAS_PLAYER_EDGES, PLAYED_FOR_EDGES, RIVAL_OF_EDGES } from './seed/proData.js';

async function seedMongo() {
  await Promise.all([Player.deleteMany(), Champion.deleteMany(), ProPlayer.deleteMany(), Team.deleteMany(), Match.deleteMany(), PlayerStats.deleteMany(), UserSettings.deleteMany()]);
  await Player.insertMany(PLAYERS);
  await Team.insertMany(TEAMS);
  await ProPlayer.insertMany(PRO_PLAYERS);
  await Match.insertMany(MATCHES);
  await PlayerStats.insertMany(PLAYER_STATS);
  await UserSettings.insertMany(USER_SETTINGS);
  console.log('MongoDB seeded');
}

async function seedDgraph() {
  await dropAll();
  await alter(DGRAPH_SCHEMA);

  // Todo en una sola mutación — los blank nodes (_:xxx) solo resuelven dentro del mismo batch
  await mutate([
    ...CHAMPION_NODES,    ...SYNERGY_EDGES,  ...COUNTER_EDGES,
    ...PLAYER_NODES,      ...PLAYED_WITH_EDGES, ...MAINS_EDGES,
    ...ORG_NODES,         ...TEAM_NODES,     ...HAS_TEAM_EDGES,
    ...PRO_PLAYER_NODES,  ...HAS_PLAYER_EDGES,
    ...PLAYED_FOR_EDGES,  ...RIVAL_OF_EDGES,
  ]);
  console.log('Dgraph seeded');
}

(async () => {
  await connectMongo();
  await seedMongo();
  await seedDgraph();
  console.log('Seed completo');
  process.exit(0);
})().catch((err) => { console.error(err); process.exit(1); });
