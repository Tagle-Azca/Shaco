// ─── Nodos: Players (cuentas ranked) ─────────────────────────────────────────
// puuid debe coincidir con el puuid en MongoDB (mongoData.js)

export const PLAYER_NODES = [
  { uid: '_:p_faker',     'dgraph.type': 'Player', puuid: 'puuid-faker-001',     summonerName: 'Faker',     region: 'kr'   },
  { uid: '_:p_caps',      'dgraph.type': 'Player', puuid: 'puuid-caps-002',      summonerName: 'Caps',      region: 'euw1' },
  { uid: '_:p_chovy',     'dgraph.type': 'Player', puuid: 'puuid-chovy-003',     summonerName: 'Chovy',     region: 'kr'   },
  { uid: '_:p_showmaker', 'dgraph.type': 'Player', puuid: 'puuid-showmaker-004', summonerName: 'ShowMaker', region: 'kr'   },
  { uid: '_:p_ruler',     'dgraph.type': 'Player', puuid: 'puuid-ruler-005',     summonerName: 'Ruler',     region: 'kr'   },
  { uid: '_:p_knight',    'dgraph.type': 'Player', puuid: 'puuid-knight-006',    summonerName: 'Knight',    region: 'kr'   },
  { uid: '_:p_bjergsen',  'dgraph.type': 'Player', puuid: 'puuid-bjergsen-007',  summonerName: 'Bjergsen',  region: 'na1'  },
  { uid: '_:p_uzi',       'dgraph.type': 'Player', puuid: 'puuid-uzi-008',       summonerName: 'Uzi',       region: 'kr'   },
  { uid: '_:p_theshy',    'dgraph.type': 'Player', puuid: 'puuid-theshy-009',    summonerName: 'TheShy',    region: 'kr'   },
  { uid: '_:p_rekkles',   'dgraph.type': 'Player', puuid: 'puuid-rekkles-010',   summonerName: 'Rekkles',   region: 'euw1' },
];

// ─── Aristas: PLAYED_WITH ────────────────────────────────────────────────────
// Bidireccionales — quiénes han jugado juntos en SoloQ
// Facets: gamesShared, wins, losses, lastPlayed

function playedWith(a, b, gamesShared, wins, losses, lastPlayed) {
  return [
    { uid: a, played_with: { uid: b, 'played_with|gamesShared': gamesShared, 'played_with|wins': wins, 'played_with|losses': losses, 'played_with|lastPlayed': lastPlayed } },
    { uid: b, played_with: { uid: a, 'played_with|gamesShared': gamesShared, 'played_with|wins': wins, 'played_with|losses': losses, 'played_with|lastPlayed': lastPlayed } },
  ];
}

export const PLAYED_WITH_EDGES = [
  ...playedWith('_:p_faker',     '_:p_chovy',     84, 51, 33, '2024-03-20'),
  ...playedWith('_:p_faker',     '_:p_showmaker', 62, 38, 24, '2024-02-14'),
  ...playedWith('_:p_caps',      '_:p_rekkles',   47, 28, 19, '2024-01-30'),
  ...playedWith('_:p_ruler',     '_:p_chovy',     55, 32, 23, '2024-03-18'),
  ...playedWith('_:p_knight',    '_:p_uzi',       38, 22, 16, '2024-03-10'),
  ...playedWith('_:p_theshy',    '_:p_knight',    44, 27, 17, '2024-02-28'),
  ...playedWith('_:p_bjergsen',  '_:p_caps',      29, 15, 14, '2023-11-05'),
];

// ─── Aristas: MAINS (Player → Champion) ──────────────────────────────────────
// Los blank nodes de campeones (_:ahri, etc.) vienen definidos en championsData.js
// pero al estar en la misma mutate() se pueden referenciar aquí sin problema
// Facets: gamesPlayed, winRate (0-1), avgKDA, avgCSPerMin, lastPlayed, rank

export const MAINS_EDGES = [
  { uid: '_:p_faker',     mains: { uid: '_:ahri',    'mains|gamesPlayed': 312, 'mains|winRate': 0.615, 'mains|avgKDA': '8.2/2.1/7.4', 'mains|avgCSPerMin': 9.8,  'mains|lastPlayed': '2024-03-20', 'mains|rank': 'S'  } },
  { uid: '_:p_faker',     mains: { uid: '_:yasuo',   'mains|gamesPlayed': 198, 'mains|winRate': 0.571, 'mains|avgKDA': '7.5/2.8/5.2', 'mains|avgCSPerMin': 10.1, 'mains|lastPlayed': '2024-03-18', 'mains|rank': 'A+' } },
  { uid: '_:p_faker',     mains: { uid: '_:leblanc', 'mains|gamesPlayed': 175, 'mains|winRate': 0.594, 'mains|avgKDA': '9.1/2.4/6.8', 'mains|avgCSPerMin': 9.5,  'mains|lastPlayed': '2024-03-15', 'mains|rank': 'S+' } },
  { uid: '_:p_chovy',     mains: { uid: '_:zed',     'mains|gamesPlayed': 276, 'mains|winRate': 0.630, 'mains|avgKDA': '9.1/1.9/6.3', 'mains|avgCSPerMin': 10.4, 'mains|lastPlayed': '2024-03-19', 'mains|rank': 'S+' } },
  { uid: '_:p_chovy',     mains: { uid: '_:akali',   'mains|gamesPlayed': 221, 'mains|winRate': 0.608, 'mains|avgKDA': '8.4/2.2/5.9', 'mains|avgCSPerMin': 10.2, 'mains|lastPlayed': '2024-03-17', 'mains|rank': 'S'  } },
  { uid: '_:p_caps',      mains: { uid: '_:ahri',    'mains|gamesPlayed': 245, 'mains|winRate': 0.592, 'mains|avgKDA': '7.8/2.3/8.1', 'mains|avgCSPerMin': 9.5,  'mains|lastPlayed': '2024-03-17', 'mains|rank': 'S'  } },
  { uid: '_:p_caps',      mains: { uid: '_:leblanc', 'mains|gamesPlayed': 189, 'mains|winRate': 0.614, 'mains|avgKDA': '8.9/2.6/7.2', 'mains|avgCSPerMin': 9.3,  'mains|lastPlayed': '2024-03-14', 'mains|rank': 'S'  } },
  { uid: '_:p_showmaker', mains: { uid: '_:syndra',  'mains|gamesPlayed': 298, 'mains|winRate': 0.602, 'mains|avgKDA': '7.9/2.5/7.6', 'mains|avgCSPerMin': 9.6,  'mains|lastPlayed': '2024-03-16', 'mains|rank': 'S'  } },
  { uid: '_:p_showmaker', mains: { uid: '_:azir',    'mains|gamesPlayed': 201, 'mains|winRate': 0.578, 'mains|avgKDA': '6.8/2.9/8.4', 'mains|avgCSPerMin': 9.9,  'mains|lastPlayed': '2024-03-12', 'mains|rank': 'A+' } },
  { uid: '_:p_ruler',     mains: { uid: '_:jinx',    'mains|gamesPlayed': 334, 'mains|winRate': 0.621, 'mains|avgKDA': '8.7/2.0/7.1', 'mains|avgCSPerMin': 10.5, 'mains|lastPlayed': '2024-03-20', 'mains|rank': 'S+' } },
  { uid: '_:p_ruler',     mains: { uid: '_:kaisa',   'mains|gamesPlayed': 267, 'mains|winRate': 0.599, 'mains|avgKDA': '8.1/2.2/6.8', 'mains|avgCSPerMin': 10.3, 'mains|lastPlayed': '2024-03-19', 'mains|rank': 'S'  } },
  { uid: '_:p_knight',    mains: { uid: '_:viktor',  'mains|gamesPlayed': 289, 'mains|winRate': 0.618, 'mains|avgKDA': '7.6/2.4/9.2', 'mains|avgCSPerMin': 9.7,  'mains|lastPlayed': '2024-03-18', 'mains|rank': 'S'  } },
  { uid: '_:p_knight',    mains: { uid: '_:orianna', 'mains|gamesPlayed': 214, 'mains|winRate': 0.605, 'mains|avgKDA': '6.9/2.6/9.8', 'mains|avgCSPerMin': 9.4,  'mains|lastPlayed': '2024-03-15', 'mains|rank': 'S'  } },
  { uid: '_:p_bjergsen',  mains: { uid: '_:syndra',  'mains|gamesPlayed': 401, 'mains|winRate': 0.583, 'mains|avgKDA': '7.1/2.7/7.8', 'mains|avgCSPerMin': 9.2,  'mains|lastPlayed': '2024-03-10', 'mains|rank': 'S'  } },
  { uid: '_:p_uzi',       mains: { uid: '_:jinx',    'mains|gamesPlayed': 512, 'mains|winRate': 0.645, 'mains|avgKDA': '9.8/1.8/6.4', 'mains|avgCSPerMin': 11.2, 'mains|lastPlayed': '2024-03-08', 'mains|rank': 'S+' } },
  { uid: '_:p_uzi',       mains: { uid: '_:caitlyn', 'mains|gamesPlayed': 388, 'mains|winRate': 0.631, 'mains|avgKDA': '9.2/1.9/5.8', 'mains|avgCSPerMin': 11.0, 'mains|lastPlayed': '2024-03-07', 'mains|rank': 'S+' } },
  { uid: '_:p_theshy',    mains: { uid: '_:fiora',   'mains|gamesPlayed': 445, 'mains|winRate': 0.638, 'mains|avgKDA': '8.9/2.1/5.3', 'mains|avgCSPerMin': 10.8, 'mains|lastPlayed': '2024-03-09', 'mains|rank': 'S+' } },
  { uid: '_:p_theshy',    mains: { uid: '_:jax',     'mains|gamesPlayed': 312, 'mains|winRate': 0.607, 'mains|avgKDA': '7.8/2.4/4.9', 'mains|avgCSPerMin': 10.5, 'mains|lastPlayed': '2024-03-06', 'mains|rank': 'S'  } },
  { uid: '_:p_rekkles',   mains: { uid: '_:xayah',   'mains|gamesPlayed': 356, 'mains|winRate': 0.601, 'mains|avgKDA': '7.4/2.2/8.6', 'mains|avgCSPerMin': 10.1, 'mains|lastPlayed': '2024-03-11', 'mains|rank': 'S'  } },
  { uid: '_:p_rekkles',   mains: { uid: '_:ezreal',  'mains|gamesPlayed': 290, 'mains|winRate': 0.587, 'mains|avgKDA': '6.8/2.4/8.9', 'mains|avgCSPerMin': 9.8,  'mains|lastPlayed': '2024-03-09', 'mains|rank': 'A+' } },
];
