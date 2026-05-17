import 'dotenv/config';
import { connectMongo }              from '../src/utils/mongo.js';
import { query, mutate, alter }      from '../src/utils/dgraph.js';
import { DGRAPH_SCHEMA }             from './seed/schema.js';
import Player    from '../src/models/Player.js';
import Team      from '../src/models/Team.js';
import ProPlayer from '../src/models/ProPlayer.js';

async function isAlreadySeeded() {
  const data = await query(`{ result(func: type(Player), first: 1) { uid } }`);
  return (data.result?.length ?? 0) > 0;
}

function buildPlayerNodes(players) {
  return players.map((p) => ({
    uid:          `_:player_${p.puuid}`,
    'dgraph.type': 'Player',
    puuid:        p.puuid,
    summonerName: p.summonerName,
    region:       p.region,
  }));
}

function buildTeamNodes(teams) {
  const mutations = [];
  for (const t of teams) {
    mutations.push({
      uid:          `_:team_${t.teamId}`,
      'dgraph.type': 'Team',
      teamId:   t.teamId,
      teamName: t.name,
      region:   t.region,
    });
    for (const member of t.roster) {
      mutations.push({
        uid: `_:team_${t.teamId}`,
        has_player: {
          uid: `_:pro_${member.proPlayerId}`,
          'has_player|role':     member.role,
          'has_player|isActive': true,
        },
      });
    }
  }
  return mutations;
}

function buildProNodes(proPlayers) {
  const mutations = [];
  for (const pro of proPlayers) {
    mutations.push({
      uid:          `_:pro_${pro.proPlayerId}`,
      'dgraph.type': 'ProPlayer',
      proPlayerId: pro.proPlayerId,
      proName:     pro.username,
      nationality: pro.nationality ?? '',
    });
    if (pro.teamId) {
      mutations.push({
        uid: `_:pro_${pro.proPlayerId}`,
        played_for: {
          uid: `_:team_${pro.teamId}`,
          'played_for|region':  pro.role ?? '',
          'played_for|endDate': '',
        },
      });
    }
  }
  return mutations;
}

// Rivalidades estructurales: mismo rol, misma región, diferente equipo
// No necesita datos de partidas — si dos mids de LCK existen, son rivales
function buildRivalries(teams) {
  const byRegion = {};
  for (const t of teams) {
    if (!byRegion[t.region]) byRegion[t.region] = [];
    byRegion[t.region].push(t);
  }

  const mutations = [];
  for (const regionTeams of Object.values(byRegion)) {
    for (let i = 0; i < regionTeams.length; i++) {
      for (let j = i + 1; j < regionTeams.length; j++) {
        const teamA = regionTeams[i];
        const teamB = regionTeams[j];
        for (const memberA of teamA.roster) {
          const memberB = teamB.roster.find((m) => m.role === memberA.role);
          if (!memberB) continue;
          mutations.push(
            { uid: `_:pro_${memberA.proPlayerId}`, rival_of: { uid: `_:pro_${memberB.proPlayerId}`, 'rival_of|totalMatches': 0, 'rival_of|winsA': 0, 'rival_of|winsB': 0, 'rival_of|tournaments': teamA.region } },
            { uid: `_:pro_${memberB.proPlayerId}`, rival_of: { uid: `_:pro_${memberA.proPlayerId}`, 'rival_of|totalMatches': 0, 'rival_of|winsA': 0, 'rival_of|winsB': 0, 'rival_of|tournaments': teamA.region } },
          );
        }
      }
    }
  }
  return mutations;
}

function buildMutations(players, teams, proPlayers) {
  return [
    ...buildPlayerNodes(players),
    ...buildTeamNodes(teams),
    ...buildProNodes(proPlayers),
    ...buildRivalries(teams),
  ];
}

(async () => {
  await connectMongo();
  await alter(DGRAPH_SCHEMA);

  if (await isAlreadySeeded()) {
    console.log('Dgraph ya tiene datos — seed omitido');
    process.exit(0);
  }

  const [players, teams, proPlayers] = await Promise.all([
    Player.find().lean(),
    Team.find().lean(),
    ProPlayer.find().lean(),
  ]);

  const mutations = await buildMutations(players, teams, proPlayers);
  await mutate(mutations);

  console.log(`Dgraph seeded — ${players.length} players, ${teams.length} teams, ${proPlayers.length} pros`);
  process.exit(0);
})().catch((err) => { console.error(err); process.exit(1); });
