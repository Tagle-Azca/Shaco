const dgraph = require('../utils/dgraph');

// Aplana claves con formato "predicate|facetName" → { facetName: value }
function normalizeFacets(items) {
  return (items || []).map((item) => {
    const out = {};
    for (const [k, v] of Object.entries(item)) {
      out[k.includes('|') ? k.split('|')[1] : k] = v;
    }
    return out;
  });
}

// ─── Champion ────────────────────────────────────────────────────────────────

async function getSynergies(championId) {
  const dql = `
    query synergies($id: string) {
      champion(func: eq(championId, $id)) {
        champName
        synergizes_with @facets(gamesPlayed, winRate, avgCombinedDamage) {
          championId
          champName
        }
      }
    }
  `;
  const data = await dgraph.query(dql, { $id: championId });
  const champ = data.champion?.[0];
  if (!champ) return [];
  return normalizeFacets(champ.synergizes_with).map((s) => ({
    champion: s.champName,
    gamesPlayed: s.gamesPlayed ?? 0,
    winRate: s.winRate ?? 0,
    avgCombinedDamage: s.avgCombinedDamage ?? 0,
  }));
}

async function getCounters(championId) {
  const dql = `
    query counters($id: string) {
      champion(func: eq(championId, $id)) {
        champName
        ~counters_edge @facets(matchups, winRateFavor, avgKDADifference, position) {
          championId
          champName
        }
      }
    }
  `;
  const data = await dgraph.query(dql, { $id: championId });
  const champ = data.champion?.[0];
  if (!champ) return [];
  return normalizeFacets(champ['~counters_edge']).map((c) => ({
    champion: c.champName,
    matchups: c.matchups ?? 0,
    winRateFavor: c.winRateFavor ?? 0,
    avgKDADifference: c.avgKDADifference ?? 0,
    position: c.position ?? '',
  }));
}

// ─── Player ──────────────────────────────────────────────────────────────────

async function getPlayerMains(puuid) {
  const dql = `
    query mains($id: string) {
      player(func: eq(puuid, $id)) {
        summonerName
        mains @facets(gamesPlayed, winRate, avgKDA, avgCSPerMin, lastPlayed, rank) {
          championId
          champName
        }
      }
    }
  `;
  const data = await dgraph.query(dql, { $id: puuid });
  const player = data.player?.[0];
  if (!player) return [];
  return normalizeFacets(player.mains).map((m) => ({
    championId: m.championId,
    name: m.champName,
    gamesPlayed: m.gamesPlayed ?? 0,
    winRate: m.winRate ?? 0,
    avgKDA: m.avgKDA ?? '0/0/0',
    avgCSPerMin: m.avgCSPerMin ?? 0,
    lastPlayed: m.lastPlayed ?? '',
    rank: m.rank ?? '',
  }));
}

async function getPlayerNetwork(puuid) {
  const dql = `
    query network($id: string) {
      player(func: eq(puuid, $id)) {
        summonerName
        played_with @facets(gamesShared, wins, losses, lastPlayed) {
          puuid
          summonerName
          region
        }
      }
    }
  `;
  const data = await dgraph.query(dql, { $id: puuid });
  const player = data.player?.[0];
  if (!player) return [];
  return normalizeFacets(player.played_with).map((p) => ({
    puuid: p.puuid,
    summonerName: p.summonerName,
    region: p.region,
    gamesShared: p.gamesShared ?? 0,
    wins: p.wins ?? 0,
    losses: p.losses ?? 0,
    lastPlayed: p.lastPlayed ?? '',
  }));
}

// ─── Pro ─────────────────────────────────────────────────────────────────────

async function getOrgGraph() {
  const dql = `
    {
      orgs(func: type(Organization)) {
        orgId
        orgName
        has_team @facets(joinDate, isActive) {
          teamId
          teamName
          region
          has_player @facets(role, joinDate, isActive) {
            proPlayerId
            proName
            nationality
          }
        }
      }
    }
  `;
  const data = await dgraph.query(dql);
  return (data.orgs || []).map((org) => ({
    orgId: org.orgId,
    orgName: org.orgName,
    teams: normalizeFacets(org.has_team).map((team) => ({
      teamId: team.teamId,
      teamName: team.teamName,
      region: team.region,
      joinDate: team.joinDate,
      isActive: team.isActive,
      players: normalizeFacets(team.has_player).map((p) => ({
        proPlayerId: p.proPlayerId,
        proName: p.proName,
        nationality: p.nationality,
        role: p.role,
        joinDate: p.joinDate,
        isActive: p.isActive,
      })),
    })),
  }));
}

async function getProCareer(proPlayerId) {
  const dql = `
    query career($id: string) {
      pro(func: eq(proPlayerId, $id)) {
        proPlayerId
        proName
        played_for @facets(startDate, endDate, region, tournamentsPlayed) {
          teamId
          teamName
        }
      }
    }
  `;
  const data = await dgraph.query(dql, { $id: proPlayerId });
  const pro = data.pro?.[0];
  if (!pro) return null;
  return {
    proPlayerId: pro.proPlayerId,
    proName: pro.proName,
    career: normalizeFacets(pro.played_for).map((t) => ({
      teamId: t.teamId,
      teamName: t.teamName,
      startDate: t.startDate ?? '',
      endDate: t.endDate ?? '',
      region: t.region ?? '',
      tournamentsPlayed: t.tournamentsPlayed ?? 0,
    })),
  };
}

async function getProRivalry(proPlayerId) {
  const dql = `
    query rivalry($id: string) {
      pro(func: eq(proPlayerId, $id)) {
        proPlayerId
        proName
        rival_of @facets(totalMatches, winsA, winsB, lastEncounter, tournaments) {
          proPlayerId
          proName
        }
      }
    }
  `;
  const data = await dgraph.query(dql, { $id: proPlayerId });
  const pro = data.pro?.[0];
  if (!pro) return null;
  return {
    proPlayerId: pro.proPlayerId,
    proName: pro.proName,
    rivalries: normalizeFacets(pro.rival_of).map((r) => ({
      proPlayerId: r.proPlayerId,
      proName: r.proName,
      totalMatches: r.totalMatches ?? 0,
      winsA: r.winsA ?? 0,
      winsB: r.winsB ?? 0,
      lastEncounter: r.lastEncounter ?? '',
      tournaments: r.tournaments ?? '',
    })),
  };
}

// ─── Full graph (para visualización) ─────────────────────────────────────────

function buildGraphData(data) {
  const nodesMap = new Map();
  const links = [];

  function node(uid, name, type) {
    if (uid && !nodesMap.has(uid)) nodesMap.set(uid, { id: uid, name: name || uid, type });
  }
  function link(source, target, type) {
    if (source && target) links.push({ source, target, type });
  }

  for (const c of data.champions || []) {
    node(c.uid, c.champName, 'Champion');
    for (const s of c.synergizes_with || []) { node(s.uid, s.champName, 'Champion'); link(c.uid, s.uid, 'SYNERGIZES_WITH'); }
    for (const ct of c.counters_edge || []) { node(ct.uid, ct.champName, 'Champion'); link(c.uid, ct.uid, 'COUNTERS'); }
  }
  for (const p of data.players || []) {
    node(p.uid, p.summonerName, 'Player');
    for (const pw of p.played_with || []) { node(pw.uid, pw.summonerName, 'Player'); link(p.uid, pw.uid, 'PLAYED_WITH'); }
    for (const m of p.mains || []) { node(m.uid, m.champName, 'Champion'); link(p.uid, m.uid, 'MAINS'); }
  }
  for (const pp of data.proplayers || []) {
    node(pp.uid, pp.proName, 'ProPlayer');
    for (const pf of pp.played_for || []) { node(pf.uid, pf.teamName, 'Team'); link(pp.uid, pf.uid, 'PLAYED_FOR'); }
    for (const r of pp.rival_of || []) { node(r.uid, r.proName, 'ProPlayer'); link(pp.uid, r.uid, 'RIVAL_OF'); }
  }
  for (const t of data.teams || []) {
    node(t.uid, t.teamName, 'Team');
    for (const hp of t.has_player || []) { node(hp.uid, hp.proName, 'ProPlayer'); link(t.uid, hp.uid, 'HAS_PLAYER'); }
  }
  for (const o of data.orgs || []) {
    node(o.uid, o.orgName, 'Organization');
    for (const ht of o.has_team || []) { node(ht.uid, ht.teamName, 'Team'); link(o.uid, ht.uid, 'HAS_TEAM'); }
  }

  return { nodes: [...nodesMap.values()], links };
}

async function getFullGraph() {
  const dql = `
    {
      champions(func: type(Champion)) {
        uid champName
        synergizes_with { uid champName }
        counters_edge    { uid champName }
      }
      players(func: type(Player)) {
        uid summonerName
        played_with { uid summonerName }
        mains       { uid champName }
      }
      proplayers(func: type(ProPlayer)) {
        uid proName
        played_for { uid teamName }
        rival_of   { uid proName }
      }
      teams(func: type(Team)) {
        uid teamName
        has_player { uid proName }
      }
      orgs(func: type(Organization)) {
        uid orgName
        has_team { uid teamName }
      }
    }
  `;
  const data = await dgraph.query(dql);
  return buildGraphData(data);
}

module.exports = { getSynergies, getCounters, getPlayerMains, getPlayerNetwork, getOrgGraph, getProCareer, getProRivalry, getFullGraph };
