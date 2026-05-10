/**
 * Seed Dgraph — una sola mutación para que los blank nodes sean consistentes.
 *
 * Uso: npm run seed
 * Requiere: npm run db:up (Dgraph en Docker, puerto 9080)
 */

require('dotenv').config();
const dgraph = require('dgraph-js');
const grpc   = require('@grpc/grpc-js');
const fs     = require('fs');
const path   = require('path');

const DGRAPH_URL = process.env.DGRAPH_URL || 'localhost:9080';
const stub   = new dgraph.DgraphClientStub(DGRAPH_URL, grpc.credentials.createInsecure());
const client = new dgraph.DgraphClient(stub);

async function alter(schema) {
  const op = new dgraph.Operation();
  op.setSchema(schema);
  await client.alter(op);
  console.log('✓ Schema aplicado');
}

async function mutate(payload) {
  const txn = client.newTxn();
  try {
    const mu = new dgraph.Mutation();
    mu.setSetJson(JSON.stringify(payload));
    mu.setCommitNow(true);
    await txn.mutate(mu);
    console.log('✓ Mutación completada');
  } catch (err) {
    await txn.discard();
    throw err;
  }
}

async function seed() {
  const schema = fs.readFileSync(path.join(__dirname, '../schema/schema.dql'), 'utf8');
  await alter(schema);

  console.log('\nInsertando todos los nodos y aristas en una sola transacción...');

  await mutate([
    // ── Champions ────────────────────────────────────────────────────────────
    { uid: '_:ahri',     'dgraph.type': 'Champion', championId: 'Ahri',     champName: 'Ahri' },
    { uid: '_:jinx',     'dgraph.type': 'Champion', championId: 'Jinx',     champName: 'Jinx' },
    { uid: '_:thresh',   'dgraph.type': 'Champion', championId: 'Thresh',   champName: 'Thresh' },
    { uid: '_:yasuo',    'dgraph.type': 'Champion', championId: 'Yasuo',    champName: 'Yasuo' },
    { uid: '_:leesin',   'dgraph.type': 'Champion', championId: 'LeeSin',   champName: 'Lee Sin' },
    { uid: '_:darius',   'dgraph.type': 'Champion', championId: 'Darius',   champName: 'Darius' },
    { uid: '_:lux',      'dgraph.type': 'Champion', championId: 'Lux',      champName: 'Lux' },
    { uid: '_:zed',      'dgraph.type': 'Champion', championId: 'Zed',      champName: 'Zed' },
    { uid: '_:nautilus', 'dgraph.type': 'Champion', championId: 'Nautilus', champName: 'Nautilus' },
    { uid: '_:akali',    'dgraph.type': 'Champion', championId: 'Akali',    champName: 'Akali' },
    { uid: '_:caitlyn',  'dgraph.type': 'Champion', championId: 'Caitlyn',  champName: 'Caitlyn' },
    { uid: '_:orianna',  'dgraph.type': 'Champion', championId: 'Orianna',  champName: 'Orianna' },

    // ── Players (soloq) ──────────────────────────────────────────────────────
    { uid: '_:p-faker', 'dgraph.type': 'Player', puuid: 'puuid-faker-001', summonerName: 'Faker', region: 'KR' },
    { uid: '_:p-caps',  'dgraph.type': 'Player', puuid: 'puuid-caps-002',  summonerName: 'Caps',  region: 'EUW' },
    { uid: '_:p-ruler', 'dgraph.type': 'Player', puuid: 'puuid-ruler-003', summonerName: 'Ruler', region: 'KR' },
    { uid: '_:p-chovy', 'dgraph.type': 'Player', puuid: 'puuid-chovy-004', summonerName: 'Chovy', region: 'KR' },

    // ── Organizations ────────────────────────────────────────────────────────
    { uid: '_:org-t1',  'dgraph.type': 'Organization', orgId: 'org-t1',  orgName: 'T1 Corp' },
    { uid: '_:org-gen', 'dgraph.type': 'Organization', orgId: 'org-gen', orgName: 'Gen.G Esports' },
    { uid: '_:org-g2',  'dgraph.type': 'Organization', orgId: 'org-g2',  orgName: 'G2 Gaming' },
    { uid: '_:org-fnc', 'dgraph.type': 'Organization', orgId: 'org-fnc', orgName: 'Fnatic' },
    { uid: '_:org-c9',  'dgraph.type': 'Organization', orgId: 'org-c9',  orgName: 'Cloud9' },
    { uid: '_:org-edg', 'dgraph.type': 'Organization', orgId: 'org-edg', orgName: 'EDward Gaming' },

    // ── Teams ────────────────────────────────────────────────────────────────
    { uid: '_:team-t1',  'dgraph.type': 'Team', teamId: 'T1',  teamName: 'T1',           region: 'LCK' },
    { uid: '_:team-gen', 'dgraph.type': 'Team', teamId: 'GEN', teamName: 'Gen.G',         region: 'LCK' },
    { uid: '_:team-g2',  'dgraph.type': 'Team', teamId: 'G2',  teamName: 'G2 Esports',    region: 'LEC' },
    { uid: '_:team-fnc', 'dgraph.type': 'Team', teamId: 'FNC', teamName: 'Fnatic',        region: 'LEC' },
    { uid: '_:team-c9',  'dgraph.type': 'Team', teamId: 'C9',  teamName: 'Cloud9',        region: 'LCS' },
    { uid: '_:team-edg', 'dgraph.type': 'Team', teamId: 'EDG', teamName: 'EDward Gaming', region: 'LPL' },

    // ── ProPlayers ───────────────────────────────────────────────────────────
    { uid: '_:pp-zeus',        'dgraph.type': 'ProPlayer', proPlayerId: 'pp-zeus',        proName: 'Zeus',        nationality: 'KR' },
    { uid: '_:pp-oner',        'dgraph.type': 'ProPlayer', proPlayerId: 'pp-oner',        proName: 'Oner',        nationality: 'KR' },
    { uid: '_:pp-faker',       'dgraph.type': 'ProPlayer', proPlayerId: 'pp-faker',       proName: 'Faker',       nationality: 'KR' },
    { uid: '_:pp-gumayusi',    'dgraph.type': 'ProPlayer', proPlayerId: 'pp-gumayusi',    proName: 'Gumayusi',    nationality: 'KR' },
    { uid: '_:pp-keria',       'dgraph.type': 'ProPlayer', proPlayerId: 'pp-keria',       proName: 'Keria',       nationality: 'KR' },
    { uid: '_:pp-kiin',        'dgraph.type': 'ProPlayer', proPlayerId: 'pp-kiin',        proName: 'Kiin',        nationality: 'KR' },
    { uid: '_:pp-canyon',      'dgraph.type': 'ProPlayer', proPlayerId: 'pp-canyon',      proName: 'Canyon',      nationality: 'KR' },
    { uid: '_:pp-chovy',       'dgraph.type': 'ProPlayer', proPlayerId: 'pp-chovy',       proName: 'Chovy',       nationality: 'KR' },
    { uid: '_:pp-ruler',       'dgraph.type': 'ProPlayer', proPlayerId: 'pp-ruler',       proName: 'Ruler',       nationality: 'KR' },
    { uid: '_:pp-lehends',     'dgraph.type': 'ProPlayer', proPlayerId: 'pp-lehends',     proName: 'Lehends',     nationality: 'KR' },
    { uid: '_:pp-brokenblade', 'dgraph.type': 'ProPlayer', proPlayerId: 'pp-brokenblade', proName: 'BrokenBlade', nationality: 'TR' },
    { uid: '_:pp-jankos',      'dgraph.type': 'ProPlayer', proPlayerId: 'pp-jankos',      proName: 'Jankos',      nationality: 'PL' },
    { uid: '_:pp-caps',        'dgraph.type': 'ProPlayer', proPlayerId: 'pp-caps',        proName: 'Caps',        nationality: 'DK' },
    { uid: '_:pp-hans-sama',   'dgraph.type': 'ProPlayer', proPlayerId: 'pp-hans-sama',   proName: 'Hans Sama',   nationality: 'FR' },
    { uid: '_:pp-mikyx',       'dgraph.type': 'ProPlayer', proPlayerId: 'pp-mikyx',       proName: 'Mikyx',       nationality: 'SI' },
    { uid: '_:pp-oscarinin',   'dgraph.type': 'ProPlayer', proPlayerId: 'pp-oscarinin',   proName: 'Oscarinin',   nationality: 'ES' },
    { uid: '_:pp-razork',      'dgraph.type': 'ProPlayer', proPlayerId: 'pp-razork',      proName: 'Razork',      nationality: 'ES' },
    { uid: '_:pp-humanoid',    'dgraph.type': 'ProPlayer', proPlayerId: 'pp-humanoid',    proName: 'Humanoid',    nationality: 'CZ' },
    { uid: '_:pp-noah',        'dgraph.type': 'ProPlayer', proPlayerId: 'pp-noah',        proName: 'Noah',        nationality: 'DE' },
    { uid: '_:pp-jun',         'dgraph.type': 'ProPlayer', proPlayerId: 'pp-jun',         proName: 'Jun',         nationality: 'KR' },
    { uid: '_:pp-fudge',       'dgraph.type': 'ProPlayer', proPlayerId: 'pp-fudge',       proName: 'Fudge',       nationality: 'AU' },
    { uid: '_:pp-blaber',      'dgraph.type': 'ProPlayer', proPlayerId: 'pp-blaber',      proName: 'Blaber',      nationality: 'US' },
    { uid: '_:pp-jojopyun',    'dgraph.type': 'ProPlayer', proPlayerId: 'pp-jojopyun',    proName: 'jojopyun',    nationality: 'KR' },
    { uid: '_:pp-berserker',   'dgraph.type': 'ProPlayer', proPlayerId: 'pp-berserker',   proName: 'Berserker',   nationality: 'KR' },
    { uid: '_:pp-zven',        'dgraph.type': 'ProPlayer', proPlayerId: 'pp-zven',        proName: 'Zven',        nationality: 'ES' },
    { uid: '_:pp-ale',         'dgraph.type': 'ProPlayer', proPlayerId: 'pp-ale',         proName: 'Ale',         nationality: 'CN' },
    { uid: '_:pp-jiejie',      'dgraph.type': 'ProPlayer', proPlayerId: 'pp-jiejie',      proName: 'JieJie',      nationality: 'CN' },
    { uid: '_:pp-scout',       'dgraph.type': 'ProPlayer', proPlayerId: 'pp-scout',       proName: 'Scout',       nationality: 'KR' },
    { uid: '_:pp-viper',       'dgraph.type': 'ProPlayer', proPlayerId: 'pp-viper',       proName: 'Viper',       nationality: 'KR' },
    { uid: '_:pp-meiko',       'dgraph.type': 'ProPlayer', proPlayerId: 'pp-meiko',       proName: 'Meiko',       nationality: 'CN' },

    // ── SYNERGIZES_WITH ──────────────────────────────────────────────────────
    { uid: '_:jinx', synergizes_with: [
      { uid: '_:thresh',   'synergizes_with|gamesPlayed': 342, 'synergizes_with|winRate': 58.2, 'synergizes_with|avgCombinedDamage': 52400 },
      { uid: '_:nautilus', 'synergizes_with|gamesPlayed': 287, 'synergizes_with|winRate': 55.8, 'synergizes_with|avgCombinedDamage': 48200 },
      { uid: '_:lux',      'synergizes_with|gamesPlayed': 201, 'synergizes_with|winRate': 54.1, 'synergizes_with|avgCombinedDamage': 49800 },
    ]},
    { uid: '_:thresh', synergizes_with: [
      { uid: '_:jinx', 'synergizes_with|gamesPlayed': 342, 'synergizes_with|winRate': 58.2, 'synergizes_with|avgCombinedDamage': 52400 },
    ]},
    { uid: '_:orianna', synergizes_with: [
      { uid: '_:leesin', 'synergizes_with|gamesPlayed': 198, 'synergizes_with|winRate': 61.1, 'synergizes_with|avgCombinedDamage': 44100 },
      { uid: '_:yasuo',  'synergizes_with|gamesPlayed': 156, 'synergizes_with|winRate': 57.4, 'synergizes_with|avgCombinedDamage': 51200 },
    ]},

    // ── COUNTERS ─────────────────────────────────────────────────────────────
    { uid: '_:zed',     counters_edge: [{ uid: '_:ahri',  'counters_edge|matchups': 412, 'counters_edge|winRateFavor': 54.2, 'counters_edge|avgKDADifference': 0.8, 'counters_edge|position': 'MID' }] },
    { uid: '_:yasuo',   counters_edge: [{ uid: '_:ahri',  'counters_edge|matchups': 321, 'counters_edge|winRateFavor': 56.1, 'counters_edge|avgKDADifference': 1.1, 'counters_edge|position': 'MID' }] },
    { uid: '_:orianna', counters_edge: [{ uid: '_:yasuo', 'counters_edge|matchups': 289, 'counters_edge|winRateFavor': 53.8, 'counters_edge|avgKDADifference': 0.5, 'counters_edge|position': 'MID' }] },
    { uid: '_:lux',     counters_edge: [{ uid: '_:yasuo', 'counters_edge|matchups': 245, 'counters_edge|winRateFavor': 55.3, 'counters_edge|avgKDADifference': 0.9, 'counters_edge|position': 'MID' }] },

    // ── MAINS ────────────────────────────────────────────────────────────────
    { uid: '_:p-faker', mains: [
      { uid: '_:akali',   'mains|gamesPlayed': 156, 'mains|winRate': 0.72, 'mains|avgKDA': '8.2/2.1/5.8', 'mains|avgCSPerMin': 9.5,  'mains|lastPlayed': '2026-05-06', 'mains|rank': '1' },
      { uid: '_:orianna', 'mains|gamesPlayed': 134, 'mains|winRate': 0.69, 'mains|avgKDA': '7.1/2.4/7.2', 'mains|avgCSPerMin': 9.8,  'mains|lastPlayed': '2026-05-05', 'mains|rank': '2' },
      { uid: '_:zed',     'mains|gamesPlayed': 98,  'mains|winRate': 0.65, 'mains|avgKDA': '9.3/3.1/4.2', 'mains|avgCSPerMin': 9.1,  'mains|lastPlayed': '2026-05-04', 'mains|rank': '3' },
    ]},
    { uid: '_:p-caps', mains: [
      { uid: '_:ahri',  'mains|gamesPlayed': 189, 'mains|winRate': 0.63, 'mains|avgKDA': '7.4/3.2/6.8', 'mains|avgCSPerMin': 9.2, 'mains|lastPlayed': '2026-05-06', 'mains|rank': '1' },
      { uid: '_:yasuo', 'mains|gamesPlayed': 112, 'mains|winRate': 0.58, 'mains|avgKDA': '6.8/4.1/5.3', 'mains|avgCSPerMin': 8.9, 'mains|lastPlayed': '2026-05-05', 'mains|rank': '2' },
    ]},
    { uid: '_:p-ruler', mains: [
      { uid: '_:caitlyn', 'mains|gamesPlayed': 201, 'mains|winRate': 0.67, 'mains|avgKDA': '5.2/2.8/9.1', 'mains|avgCSPerMin': 10.4, 'mains|lastPlayed': '2026-05-06', 'mains|rank': '1' },
      { uid: '_:jinx',    'mains|gamesPlayed': 143, 'mains|winRate': 0.64, 'mains|avgKDA': '6.1/3.0/8.5', 'mains|avgCSPerMin': 10.1, 'mains|lastPlayed': '2026-05-04', 'mains|rank': '2' },
    ]},
    { uid: '_:p-chovy', mains: [
      { uid: '_:akali',   'mains|gamesPlayed': 178, 'mains|winRate': 0.74, 'mains|avgKDA': '10.1/2.3/4.9', 'mains|avgCSPerMin': 10.1, 'mains|lastPlayed': '2026-05-06', 'mains|rank': '1' },
      { uid: '_:orianna', 'mains|gamesPlayed': 122, 'mains|winRate': 0.70, 'mains|avgKDA': '8.4/2.6/6.3',  'mains|avgCSPerMin': 9.9,  'mains|lastPlayed': '2026-05-05', 'mains|rank': '2' },
    ]},

    // ── PLAYED_WITH ──────────────────────────────────────────────────────────
    { uid: '_:p-faker', played_with: [
      { uid: '_:p-ruler', 'played_with|gamesShared': 48, 'played_with|wins': 31, 'played_with|losses': 17, 'played_with|lastPlayed': '2026-05-06' },
      { uid: '_:p-chovy', 'played_with|gamesShared': 36, 'played_with|wins': 22, 'played_with|losses': 14, 'played_with|lastPlayed': '2026-05-05' },
    ]},
    { uid: '_:p-ruler', played_with: [
      { uid: '_:p-chovy', 'played_with|gamesShared': 29, 'played_with|wins': 18, 'played_with|losses': 11, 'played_with|lastPlayed': '2026-05-04' },
    ]},

    // ── HAS_TEAM ─────────────────────────────────────────────────────────────
    { uid: '_:org-t1',  has_team: [{ uid: '_:team-t1',  'has_team|joinDate': '2021-01-01', 'has_team|isActive': true }] },
    { uid: '_:org-gen', has_team: [{ uid: '_:team-gen', 'has_team|joinDate': '2020-01-01', 'has_team|isActive': true }] },
    { uid: '_:org-g2',  has_team: [{ uid: '_:team-g2',  'has_team|joinDate': '2014-01-01', 'has_team|isActive': true }] },
    { uid: '_:org-fnc', has_team: [{ uid: '_:team-fnc', 'has_team|joinDate': '2004-01-01', 'has_team|isActive': true }] },
    { uid: '_:org-c9',  has_team: [{ uid: '_:team-c9',  'has_team|joinDate': '2012-01-01', 'has_team|isActive': true }] },
    { uid: '_:org-edg', has_team: [{ uid: '_:team-edg', 'has_team|joinDate': '2014-01-01', 'has_team|isActive': true }] },

    // ── HAS_PLAYER ───────────────────────────────────────────────────────────
    { uid: '_:team-t1', has_player: [
      { uid: '_:pp-zeus',     'has_player|role': 'TOP',     'has_player|joinDate': '2022-01-01', 'has_player|isActive': true },
      { uid: '_:pp-oner',     'has_player|role': 'JUNGLE',  'has_player|joinDate': '2022-01-01', 'has_player|isActive': true },
      { uid: '_:pp-faker',    'has_player|role': 'MID',     'has_player|joinDate': '2013-01-01', 'has_player|isActive': true },
      { uid: '_:pp-gumayusi', 'has_player|role': 'BOT',     'has_player|joinDate': '2021-01-01', 'has_player|isActive': true },
      { uid: '_:pp-keria',    'has_player|role': 'SUPPORT', 'has_player|joinDate': '2021-01-01', 'has_player|isActive': true },
    ]},
    { uid: '_:team-gen', has_player: [
      { uid: '_:pp-kiin',    'has_player|role': 'TOP',     'has_player|joinDate': '2023-01-01', 'has_player|isActive': true },
      { uid: '_:pp-canyon',  'has_player|role': 'JUNGLE',  'has_player|joinDate': '2023-01-01', 'has_player|isActive': true },
      { uid: '_:pp-chovy',   'has_player|role': 'MID',     'has_player|joinDate': '2022-01-01', 'has_player|isActive': true },
      { uid: '_:pp-ruler',   'has_player|role': 'BOT',     'has_player|joinDate': '2023-01-01', 'has_player|isActive': true },
      { uid: '_:pp-lehends', 'has_player|role': 'SUPPORT', 'has_player|joinDate': '2022-01-01', 'has_player|isActive': true },
    ]},
    { uid: '_:team-g2', has_player: [
      { uid: '_:pp-brokenblade', 'has_player|role': 'TOP',     'has_player|joinDate': '2020-01-01', 'has_player|isActive': true },
      { uid: '_:pp-jankos',      'has_player|role': 'JUNGLE',  'has_player|joinDate': '2016-01-01', 'has_player|isActive': true },
      { uid: '_:pp-caps',        'has_player|role': 'MID',     'has_player|joinDate': '2018-01-01', 'has_player|isActive': true },
      { uid: '_:pp-hans-sama',   'has_player|role': 'BOT',     'has_player|joinDate': '2022-01-01', 'has_player|isActive': true },
      { uid: '_:pp-mikyx',       'has_player|role': 'SUPPORT', 'has_player|joinDate': '2019-01-01', 'has_player|isActive': true },
    ]},
    { uid: '_:team-fnc', has_player: [
      { uid: '_:pp-oscarinin', 'has_player|role': 'TOP',     'has_player|joinDate': '2023-01-01', 'has_player|isActive': true },
      { uid: '_:pp-razork',    'has_player|role': 'JUNGLE',  'has_player|joinDate': '2022-01-01', 'has_player|isActive': true },
      { uid: '_:pp-humanoid',  'has_player|role': 'MID',     'has_player|joinDate': '2022-01-01', 'has_player|isActive': true },
      { uid: '_:pp-noah',      'has_player|role': 'BOT',     'has_player|joinDate': '2023-01-01', 'has_player|isActive': true },
      { uid: '_:pp-jun',       'has_player|role': 'SUPPORT', 'has_player|joinDate': '2023-01-01', 'has_player|isActive': true },
    ]},
    { uid: '_:team-c9', has_player: [
      { uid: '_:pp-fudge',     'has_player|role': 'TOP',     'has_player|joinDate': '2021-01-01', 'has_player|isActive': true },
      { uid: '_:pp-blaber',    'has_player|role': 'JUNGLE',  'has_player|joinDate': '2019-01-01', 'has_player|isActive': true },
      { uid: '_:pp-jojopyun',  'has_player|role': 'MID',     'has_player|joinDate': '2022-01-01', 'has_player|isActive': true },
      { uid: '_:pp-berserker', 'has_player|role': 'BOT',     'has_player|joinDate': '2022-01-01', 'has_player|isActive': true },
      { uid: '_:pp-zven',      'has_player|role': 'SUPPORT', 'has_player|joinDate': '2022-01-01', 'has_player|isActive': true },
    ]},
    { uid: '_:team-edg', has_player: [
      { uid: '_:pp-ale',    'has_player|role': 'TOP',     'has_player|joinDate': '2021-01-01', 'has_player|isActive': true },
      { uid: '_:pp-jiejie', 'has_player|role': 'JUNGLE',  'has_player|joinDate': '2020-01-01', 'has_player|isActive': true },
      { uid: '_:pp-scout',  'has_player|role': 'MID',     'has_player|joinDate': '2019-01-01', 'has_player|isActive': true },
      { uid: '_:pp-viper',  'has_player|role': 'BOT',     'has_player|joinDate': '2021-01-01', 'has_player|isActive': true },
      { uid: '_:pp-meiko',  'has_player|role': 'SUPPORT', 'has_player|joinDate': '2017-01-01', 'has_player|isActive': true },
    ]},

    // ── PLAYED_FOR ───────────────────────────────────────────────────────────
    { uid: '_:pp-faker', played_for: [
      { uid: '_:team-t1', 'played_for|startDate': '2013-01-01', 'played_for|endDate': '', 'played_for|region': 'LCK', 'played_for|tournamentsPlayed': 24 },
    ]},
    { uid: '_:pp-caps', played_for: [
      { uid: '_:team-fnc', 'played_for|startDate': '2017-01-01', 'played_for|endDate': '2018-12-31', 'played_for|region': 'LEC', 'played_for|tournamentsPlayed': 4 },
      { uid: '_:team-g2',  'played_for|startDate': '2019-01-01', 'played_for|endDate': '',            'played_for|region': 'LEC', 'played_for|tournamentsPlayed': 12 },
    ]},
    { uid: '_:pp-ruler', played_for: [
      { uid: '_:team-gen', 'played_for|startDate': '2023-01-01', 'played_for|endDate': '', 'played_for|region': 'LCK', 'played_for|tournamentsPlayed': 6 },
    ]},
    { uid: '_:pp-chovy', played_for: [
      { uid: '_:team-gen', 'played_for|startDate': '2022-01-01', 'played_for|endDate': '', 'played_for|region': 'LCK', 'played_for|tournamentsPlayed': 8 },
    ]},

    // ── RIVAL_OF ─────────────────────────────────────────────────────────────
    { uid: '_:pp-faker', rival_of: [
      { uid: '_:pp-chovy', 'rival_of|totalMatches': 18, 'rival_of|winsA': 11, 'rival_of|winsB': 7,  'rival_of|lastEncounter': '2026-05-02', 'rival_of|tournaments': 'MSI 2026, Worlds 2025' },
      { uid: '_:pp-caps',  'rival_of|totalMatches': 12, 'rival_of|winsA': 8,  'rival_of|winsB': 4,  'rival_of|lastEncounter': '2025-11-01', 'rival_of|tournaments': 'Worlds 2025, MSI 2025' },
    ]},
    { uid: '_:pp-chovy', rival_of: [
      { uid: '_:pp-caps', 'rival_of|totalMatches': 6, 'rival_of|winsA': 4, 'rival_of|winsB': 2, 'rival_of|lastEncounter': '2025-10-28', 'rival_of|tournaments': 'Worlds 2025' },
    ]},
  ]);

  console.log('\n✅ Dgraph seed completado.');
  stub.close();
}

seed().catch((err) => {
  console.error('Seed falló:', err.message);
  process.exit(1);
});
