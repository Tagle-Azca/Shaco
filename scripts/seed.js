import 'dotenv/config';
import { connectMongo }  from '../src/utils/mongo.js';
import Player      from '../src/models/Player.js';
import Champion    from '../src/models/Champion.js';
import ProPlayer   from '../src/models/ProPlayer.js';
import Team        from '../src/models/Team.js';
import Match       from '../src/models/Match.js';
import PlayerStats from '../src/models/PlayerStats.js';
import UserSettings from '../src/models/UserSettings.js';
import TournamentResult from '../src/models/TournamentResult.js';
import Tournament from '../src/models/Tournament.js';

import { PLAYERS, TEAMS, PRO_PLAYERS, MATCHES, PLAYER_STATS, USER_SETTINGS, TOURNAMENT_RESULTS, COMPETITIVE_PATCHES } from './seed/mongoData.js';

async function seedMongo() {
  await Promise.all([
    Player.deleteMany(), Champion.deleteMany(), ProPlayer.deleteMany(),
    Team.deleteMany(), Match.deleteMany(), PlayerStats.deleteMany(), UserSettings.deleteMany(),
    TournamentResult.deleteMany(), TournamentResult.deleteMany
  ]);
  await Player.insertMany(PLAYERS);
  await Team.insertMany(TEAMS);
  await ProPlayer.insertMany(PRO_PLAYERS);
  await Match.insertMany(MATCHES);
  await PlayerStats.insertMany(PLAYER_STATS);
  await UserSettings.insertMany(USER_SETTINGS);
  await TournamentResult.insertMany(TOURNAMENT_RESULTS);
  await Tournament.insertMany(COMPETITIVE_PATCHES);
  console.log('MongoDB seeded');
}

async function seedChampionsMongo() {
    //patch actual
    const versions = await fetch('https://ddragon.leagueoflegends.com/api/versions.json')
      .then(r => r.json());
    const version = versions[0];
    //fetch campeones
    const { data } = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`)
      .then(r => r.json());

    const champIds = Object.keys(data);
    const champDetails = [];
    //fetch de detalles en bulks de 10
    for (let i = 0; i < champIds.length; i += 10) {
      const batch = champIds.slice(i, i + 10);
      const results = await Promise.all(
        batch.map(id =>
          fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${id}.json`)
            .then(r => r.json())
            .then(d => d.data[id])
        )
      );
      champDetails.push(...results);
      console.log(`Fetched ${Math.min(i + 10, champIds.length)}/${champIds.length} campeones...`);
    }

    const champions = champDetails.map(c => ({
      championId: c.id,
      name:       c.name,
      roles:      c.tags,
      baseStats: {
        hp:    c.stats.hp,
        armor: c.stats.armor,
        mr:    c.stats.spellblock,
        ad:    c.stats.attackdamage,
      },
      abilities: {
        passive: c.passive?.name ?? '',
        q: c.spells[0]?.name ?? '',
        w: c.spells[1]?.name ?? '',
        e: c.spells[2]?.name ?? '',
        r: c.spells[3]?.name ?? '',
      },
      recommendedMaxOrder: [],
      tips: c.blurb ? [c.blurb] : [],
    }));

    await Champion.insertMany(champions);
    console.log(`${champions.length} campeones insertados desde Data Dragon`);
  };

(async () => {
  await connectMongo();
  await seedMongo();
  await seedChampionsMongo();
  console.log('Seed completo — corre "npm run seed:dgraph" para poblar Dgraph');
  process.exit(0);
})().catch((err) => { console.error(err); process.exit(1); });

