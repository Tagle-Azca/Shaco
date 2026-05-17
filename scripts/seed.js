import 'dotenv/config';
import { connectMongo } from '../src/utils/mongo.js';
import Player    from '../src/models/Player.js';
import Champion  from '../src/models/Champion.js';
import ProPlayer from '../src/models/ProPlayer.js';
import Team      from '../src/models/Team.js';
import { PLAYERS, TEAMS, PRO_PLAYERS } from './seed/mongoData.js';

async function seedMongo() {
  await Promise.all([Player.deleteMany(), Champion.deleteMany(), ProPlayer.deleteMany(), Team.deleteMany()]);
  await Player.insertMany(PLAYERS);
  await Team.insertMany(TEAMS);
  await ProPlayer.insertMany(PRO_PLAYERS);
  console.log('MongoDB seeded');
}

(async () => {
  await connectMongo();
  await seedMongo();
  console.log('Seed completo — corre "npm run seed:dgraph" para poblar Dgraph');
  process.exit(0);
})().catch((err) => { console.error(err); process.exit(1); });
