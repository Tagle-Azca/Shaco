import { query } from '../utils/dgraph.js';
import ApiError  from '../utils/apiError.js';

// ─── Helpers privados ─────────────────────────────────────────────────────────

function toArray(val) {
  if (!val) return [];
  return Array.isArray(val) ? val : [val];
}

function normalizeFacets(items) {
  return toArray(items).map((item) => {
    const out = {};
    for (const [k, v] of Object.entries(item)) {
      out[k.includes('|') ? k.split('|')[1] : k] = v;
    }
    return out;
  });
}

function buildGraphData(data) {
  const nodesMap = new Map();
  const links    = [];

  function node(uid, name, type) {
    if (uid && !nodesMap.has(uid)) nodesMap.set(uid, { id: uid, name: name || uid, type });
  }
  function link(source, target, type) {
    if (source && target) links.push({ source, target, type });
  }

  for (const c of toArray(data.champions)) {
    node(c.uid, c.champName, 'Champion');
    for (const s  of toArray(c.synergizes_with)) { node(s.uid,  s.champName,  'Champion');  link(c.uid,  s.uid,  'SYNERGIZES_WITH'); }
    for (const ct of toArray(c.counters_edge))   { node(ct.uid, ct.champName, 'Champion');  link(c.uid,  ct.uid, 'COUNTERS');        }
  }
  for (const p of toArray(data.players)) {
    node(p.uid, p.summonerName, 'Player');
    for (const pw of toArray(p.played_with)) { node(pw.uid, pw.summonerName, 'Player');   link(p.uid, pw.uid, 'PLAYED_WITH'); }
    for (const m  of toArray(p.mains))       { node(m.uid,  m.champName,     'Champion'); link(p.uid, m.uid,  'MAINS');       }
  }
  for (const pp of toArray(data.proplayers)) {
    node(pp.uid, pp.proName, 'ProPlayer');
    for (const pf of toArray(pp.played_for)) { node(pf.uid, pf.teamName, 'Team');      link(pp.uid, pf.uid, 'PLAYED_FOR'); }
    for (const r  of toArray(pp.rival_of))   { node(r.uid,  r.proName,   'ProPlayer'); link(pp.uid, r.uid,  'RIVAL_OF');   }
  }
  for (const t of toArray(data.teams)) {
    node(t.uid, t.teamName, 'Team');
    for (const hp of toArray(t.has_player)) { node(hp.uid, hp.proName, 'ProPlayer'); link(t.uid, hp.uid, 'HAS_PLAYER'); }
  }
  for (const o of toArray(data.orgs)) {
    node(o.uid, o.orgName, 'Organization');
    for (const ht of toArray(o.has_team)) { node(ht.uid, ht.teamName, 'Team'); link(o.uid, ht.uid, 'HAS_TEAM'); }
  }

  return { nodes: [...nodesMap.values()], links };
}

function handle(fn) {
  return async (req, res, next) => {
    try { res.json({ data: await fn(req) }); }
    catch (err) { next(err); }
  };
}

// ─── Champion ─────────────────────────────────────────────────────────────────

export const getChampionGraph = handle(async (req) => {
  const { championId } = req.params;
  if (!championId) throw new ApiError('championId is required', 400);

  const dql = `
    query champion($id: string) {
      champion(func: eq(championId, $id)) {
        champName
        synergizes_with @facets(gamesPlayed, winRate, avgCombinedDamage) {
          championId champName
        }
        ~counters_edge @facets(matchups, winRateFavor, avgKDADifference, position) {
          championId champName
        }
      }
    }
  `;
  const data  = await query(dql, { $id: championId });
  const champ = data.champion?.[0];
  if (!champ) return { synergies: [], counters: [] };

  return {
    synergies: normalizeFacets(champ.synergizes_with).map((s) => ({
      championId:        s.championId,
      champion:          s.champName,
      gamesPlayed:       s.gamesPlayed       ?? 0,
      winRate:           s.winRate            ?? 0,
      avgCombinedDamage: s.avgCombinedDamage  ?? 0,
    })),
    counters: normalizeFacets(champ['~counters_edge']).map((c) => ({
      championId:       c.championId,
      champion:         c.champName,
      matchups:         c.matchups         ?? 0,
      winRateFavor:     c.winRateFavor     ?? 0,
      avgKDADifference: c.avgKDADifference ?? 0,
      position:         c.position         ?? '',
    })),
  };
});

// ─── Player ───────────────────────────────────────────────────────────────────

export const getPlayerOverview = handle(async (req) => {
  const { puuid } = req.params;
  if (!puuid) throw new ApiError('puuid is required', 400);

  const dql = `
    query player($id: string) {
      player(func: eq(puuid, $id)) {
        summonerName
        mains @facets(gamesPlayed, winRate, avgKDA, avgCSPerMin, lastPlayed, rank) {
          championId champName
        }
        played_with @facets(gamesShared, wins, losses, lastPlayed) {
          puuid summonerName region
        }
      }
    }
  `;
  const data   = await query(dql, { $id: puuid });
  const player = data.player?.[0];
  if (!player) return { mains: [], network: [] };

  return {
    mains: normalizeFacets(player.mains).map((m) => ({
      championId:  m.championId,
      name:        m.champName,
      gamesPlayed: m.gamesPlayed ?? 0,
      winRate:     m.winRate     ?? 0,
      avgKDA:      m.avgKDA      ?? '0/0/0',
      avgCSPerMin: m.avgCSPerMin ?? 0,
      lastPlayed:  m.lastPlayed  ?? '',
      rank:        m.rank        ?? '',
    })),
    network: normalizeFacets(player.played_with).map((p) => ({
      puuid:        p.puuid,
      summonerName: p.summonerName,
      region:       p.region,
      gamesShared:  p.gamesShared ?? 0,
      wins:         p.wins        ?? 0,
      losses:       p.losses      ?? 0,
      lastPlayed:   p.lastPlayed  ?? '',
    })),
  };
});

// ─── Pro ──────────────────────────────────────────────────────────────────────

export const getActiveTeams = handle(async () => {
  const dql = `
    {
      teams(func: type(Team)) {
        teamId teamName region
        has_player @facets(role, joinDate, isActive) {
          proPlayerId proName nationality
        }
      }
    }
  `;
  const data = await query(dql);
  return (data.teams || []).map((t) => ({
    teamId: t.teamId,
    name:   t.teamName,
    region: t.region,
    roster: normalizeFacets(t.has_player).map((p) => ({
      proPlayerId: p.proPlayerId,
      username:    p.proName,
      nationality: p.nationality,
      role:        p.role     ?? '',
      joinDate:    p.joinDate ?? '',
      isActive:    p.isActive ?? false,
    })),
  }));
});

export const getProProfile = handle(async (req) => {
  const { id: proPlayerId } = req.params;
  if (!proPlayerId) throw new ApiError('proPlayerId is required', 400);

  const dql = `
    query pro($id: string) {
      pro(func: eq(proPlayerId, $id)) {
        proPlayerId proName nationality
        played_for @facets(startDate, endDate, region, tournamentsPlayed) {
          teamId teamName
        }
        rival_of @facets(totalMatches, winsA, winsB, lastEncounter, tournaments) {
          proPlayerId proName
        }
      }
    }
  `;
  const data = await query(dql, { $id: proPlayerId });
  const pro  = data.pro?.[0];
  if (!pro) throw new ApiError(`Pro player '${proPlayerId}' not found`, 404);

  return {
    proPlayerId: pro.proPlayerId,
    proName:     pro.proName,
    nationality: pro.nationality,
    career: normalizeFacets(pro.played_for).map((t) => ({
      teamId:            t.teamId,
      teamName:          t.teamName,
      startDate:         t.startDate         ?? '',
      endDate:           t.endDate           ?? '',
      region:            t.region            ?? '',
      tournamentsPlayed: t.tournamentsPlayed ?? 0,
    })),
    rivalries: normalizeFacets(pro.rival_of).map((r) => ({
      proPlayerId:   r.proPlayerId,
      proName:       r.proName,
      totalMatches:  r.totalMatches  ?? 0,
      winsA:         r.winsA         ?? 0,
      winsB:         r.winsB         ?? 0,
      lastEncounter: r.lastEncounter ?? '',
      tournaments:   r.tournaments   ?? '',
    })),
  };
});

export const getOrgGraph = handle(async () => {
  const dql = `
    {
      orgs(func: type(Organization)) {
        orgId orgName
        has_team @facets(joinDate, isActive) {
          teamId teamName region
          has_player @facets(role, joinDate, isActive) {
            proPlayerId proName nationality
          }
        }
      }
    }
  `;
  const data = await query(dql);
  return (data.orgs || []).map((org) => ({
    orgId:   org.orgId,
    orgName: org.orgName,
    teams:   normalizeFacets(org.has_team).map((team) => ({
      teamId:   team.teamId,
      teamName: team.teamName,
      region:   team.region,
      joinDate: team.joinDate,
      isActive: team.isActive,
      players:  normalizeFacets(team.has_player).map((p) => ({
        proPlayerId: p.proPlayerId,
        proName:     p.proName,
        nationality: p.nationality,
        role:        p.role,
        joinDate:    p.joinDate,
        isActive:    p.isActive,
      })),
    })),
  }));
});

// ─── Full graph ───────────────────────────────────────────────────────────────

export const getFullGraph = handle(async () => {
  const dql = `
    {
      champions(func: type(Champion)) {
        uid champName
        synergizes_with { uid champName }
        counters_edge   { uid champName }
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
  const data = await query(dql);
  return buildGraphData(data);
});
