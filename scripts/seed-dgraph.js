import 'dotenv/config';
import { connectMongo }         from '../src/utils/mongo.js';
import { query, mutate, alter } from '../src/utils/dgraph.js';
import { DGRAPH_SCHEMA }        from './seed/schema.js';
import Player    from '../src/models/Player.js';
import Team      from '../src/models/Team.js';
import ProPlayer from '../src/models/ProPlayer.js';
import Match     from '../src/models/Match.js';
import Champion  from '../src/models/Champion.js';

async function isAlreadySeeded() {
  const data = await query(`{ result(func: type(Player), first: 1) { uid } }`);
  return (data.result?.length ?? 0) > 0;
}

function buildPlayerNodes(players) {
  return players.map((p) => ({
    uid:           `_:player_${p.puuid}`,
    'dgraph.type': 'Player',
    puuid:         p.puuid,
    summonerName:  p.summonerName,
    region:        p.region,
  }));
}

function buildChampionNodes(champions) {
  return champions.map((c) => ({
    uid:           `_:champ_${c.championId}`,
    'dgraph.type': 'Champion',
    championId:    c.championId,
    champName:     c.name,
  }));
}

function buildTeamNodes(teams) {
  const mutations = [];
  for (const t of teams) {
    mutations.push({
      uid:           `_:team_${t.teamId}`,
      'dgraph.type': 'Team',
      teamId:        t.teamId,
      teamName:      t.name,
      region:        t.region,
    });
    for (const member of t.roster) {
      mutations.push({
        uid: `_:team_${t.teamId}`,
        has_player: {
          uid:                   `_:pro_${member.proPlayerId}`,
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
      uid:           `_:pro_${pro.proPlayerId}`,
      'dgraph.type': 'ProPlayer',
      proPlayerId:   pro.proPlayerId,
      proName:       pro.username,
      nationality:   pro.nationality ?? '',
    });
    if (pro.teamId) {
      mutations.push({
        uid: `_:pro_${pro.proPlayerId}`,
        played_for: {
          uid:                  `_:team_${pro.teamId}`,
          'played_for|region':  pro.role ?? '',
          'played_for|endDate': '',
        },
      });
    }
  }
  return mutations;
}

// RIVAL_OF: mismo rol, misma región, diferente equipo
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

// PLAYED_WITH: compañeros de equipo en la misma partida (agrupados por win)
// MAINS: cada jugador → campeón que jugó con sus stats
function buildMatchEdges(matches) {
  const playedWithMap = new Map(); // "puuidA|puuidB" → { gamesShared, wins, losses }
  const mainsMap      = new Map(); // "puuid|championId" → { gamesPlayed, wins, totalKDA, totalCS }

  for (const match of matches) {
    const winners = match.participants.filter((p) => p.win);
    const losers  = match.participants.filter((p) => !p.win);

    for (const team of [winners, losers]) {
      // PLAYED_WITH entre todos los compañeros del equipo
      for (let i = 0; i < team.length; i++) {
        for (let j = i + 1; j < team.length; j++) {
          const a   = team[i].puuid;
          const b   = team[j].puuid;
          const key = [a, b].sort().join('|');
          const won = team[i].win;
          if (!playedWithMap.has(key)) playedWithMap.set(key, { a, b, gamesShared: 0, wins: 0, losses: 0 });
          const entry = playedWithMap.get(key);
          entry.gamesShared++;
          won ? entry.wins++ : entry.losses++;
        }
      }
    }

    // MAINS por cada participante
    for (const p of match.participants) {
      const key = `${p.puuid}|${p.champion}`;
      if (!mainsMap.has(key)) mainsMap.set(key, { puuid: p.puuid, champion: p.champion, gamesPlayed: 0, wins: 0, totalKills: 0, totalDeaths: 0, totalAssists: 0, totalCS: 0 });
      const entry = mainsMap.get(key);
      entry.gamesPlayed++;
      if (p.win) entry.wins++;
      entry.totalKills   += p.kills;
      entry.totalDeaths  += p.deaths;
      entry.totalAssists += p.assists;
      entry.totalCS      += p.cs;
    }
  }

  const mutations = [];
  const today = new Date().toISOString().split('T')[0];

  for (const { a, b, gamesShared, wins, losses } of playedWithMap.values()) {
    mutations.push(
      { uid: `_:player_${a}`, played_with: { uid: `_:player_${b}`, 'played_with|gamesShared': gamesShared, 'played_with|wins': wins, 'played_with|losses': losses, 'played_with|lastPlayed': today } },
      { uid: `_:player_${b}`, played_with: { uid: `_:player_${a}`, 'played_with|gamesShared': gamesShared, 'played_with|wins': wins, 'played_with|losses': losses, 'played_with|lastPlayed': today } },
    );
  }

  for (const e of mainsMap.values()) {
    const winRate = e.gamesPlayed > 0 ? e.wins / e.gamesPlayed : 0;
    const avgKDA  = e.totalDeaths > 0
      ? `${(e.totalKills / e.gamesPlayed).toFixed(1)}/${(e.totalDeaths / e.gamesPlayed).toFixed(1)}/${(e.totalAssists / e.gamesPlayed).toFixed(1)}`
      : `${e.totalKills}/${e.totalDeaths}/${e.totalAssists}`;
    const avgCS   = e.gamesPlayed > 0 ? +(e.totalCS / e.gamesPlayed).toFixed(1) : 0;

    mutations.push({
      uid: `_:player_${e.puuid}`,
      mains: {
        uid:                  `_:champ_${e.champion}`,
        'mains|gamesPlayed':  e.gamesPlayed,
        'mains|winRate':      +winRate.toFixed(3),
        'mains|avgKDA':       avgKDA,
        'mains|avgCSPerMin':  avgCS,
        'mains|lastPlayed':   today,
        'mains|rank':         winRate >= 0.6 ? 'S' : winRate >= 0.5 ? 'A' : 'B',
      },
    });
  }

  return mutations;
}

(async () => {
  await connectMongo();
  await alter(DGRAPH_SCHEMA);

  if (await isAlreadySeeded()) {
    console.log('Dgraph ya tiene datos — seed omitido');
    process.exit(0);
  }

  const [players, teams, proPlayers, matches, champions] = await Promise.all([
    Player.find().lean(),
    Team.find().lean(),
    ProPlayer.find().lean(),
    Match.find().lean(),
    Champion.find().lean(),
  ]);

  const mutations = [
    ...buildPlayerNodes(players),
    ...buildChampionNodes(champions),
    ...buildTeamNodes(teams),
    ...buildProNodes(proPlayers),
    ...buildRivalries(teams),
    ...buildMatchEdges(matches),
  ];

  await mutate(mutations);

  console.log(`Dgraph seeded — ${players.length} players, ${teams.length} teams, ${proPlayers.length} pros, ${champions.length} champions, ${matches.length} matches procesados`);
  process.exit(0);
})().catch((err) => { console.error(err); process.exit(1); });
