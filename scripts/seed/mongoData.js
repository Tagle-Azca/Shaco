// Datos de referencia para MongoDB
// Estos son los mismos jugadores/equipos que se seedean en Dgraph — los IDs deben coincidir

export const PLAYERS = [
  { puuid: 'puuid-faker-001',     summonerName: 'Faker',     tag: 'KR1',  profileIconId: 4895, summonerLevel: 412, region: 'kr'   },
  { puuid: 'puuid-caps-002',      summonerName: 'Caps',      tag: 'EUW',  profileIconId: 3210, summonerLevel: 380, region: 'euw1' },
  { puuid: 'puuid-chovy-003',     summonerName: 'Chovy',     tag: 'KR2',  profileIconId: 1234, summonerLevel: 395, region: 'kr'   },
  { puuid: 'puuid-showmaker-004', summonerName: 'ShowMaker', tag: 'KR3',  profileIconId: 2001, summonerLevel: 402, region: 'kr'   },
  { puuid: 'puuid-ruler-005',     summonerName: 'Ruler',     tag: 'KR4',  profileIconId: 3301, summonerLevel: 367, region: 'kr'   },
  { puuid: 'puuid-knight-006',    summonerName: 'Knight',    tag: 'CN1',  profileIconId: 4102, summonerLevel: 388, region: 'kr'   },
  { puuid: 'puuid-bjergsen-007',  summonerName: 'Bjergsen',  tag: 'NA1',  profileIconId: 1501, summonerLevel: 350, region: 'na1'  },
  { puuid: 'puuid-uzi-008',       summonerName: 'Uzi',       tag: 'CN2',  profileIconId: 5001, summonerLevel: 420, region: 'kr'   },
  { puuid: 'puuid-theshy-009',    summonerName: 'TheShy',    tag: 'CN3',  profileIconId: 4412, summonerLevel: 435, region: 'kr'   },
  { puuid: 'puuid-rekkles-010',   summonerName: 'Rekkles',   tag: 'EUW2', profileIconId: 2803, summonerLevel: 372, region: 'euw1' },
];

export const TEAMS = [
  { teamId: 'T1_KR',  name: 'T1',        region: 'LCK', roster: [
    { proPlayerId: 'pro_001', username: 'Zeus',      role: 'TOP'     },
    { proPlayerId: 'pro_002', username: 'Oner',      role: 'JUNGLE'  },
    { proPlayerId: 'pro_003', username: 'Faker',     role: 'MID'     },
    { proPlayerId: 'pro_004', username: 'Gumayusi',  role: 'BOT'     },
    { proPlayerId: 'pro_005', username: 'Keria',     role: 'SUPPORT' },
  ]},
  { teamId: 'GEN_KR', name: 'Gen.G',     region: 'LCK', roster: [
    { proPlayerId: 'pro_006', username: 'Doran',   role: 'TOP'     },
    { proPlayerId: 'pro_007', username: 'Peanut',  role: 'JUNGLE'  },
    { proPlayerId: 'pro_008', username: 'Chovy',   role: 'MID'     },
    { proPlayerId: 'pro_009', username: 'Peyz',    role: 'BOT'     },
    { proPlayerId: 'pro_010', username: 'Lehends', role: 'SUPPORT' },
  ]},
  { teamId: 'G2_EU',  name: 'G2 Esports',region: 'LEC', roster: [
    { proPlayerId: 'pro_011', username: 'BrokenBlade', role: 'TOP'     },
    { proPlayerId: 'pro_012', username: 'Jankos',      role: 'JUNGLE'  },
    { proPlayerId: 'pro_013', username: 'Caps',        role: 'MID'     },
    { proPlayerId: 'pro_014', username: 'Flakked',     role: 'BOT'     },
    { proPlayerId: 'pro_015', username: 'Mikyx',       role: 'SUPPORT' },
  ]},
  { teamId: 'C9_NA',  name: 'Cloud9',    region: 'LCS', roster: [
    { proPlayerId: 'pro_016', username: 'Fudge',     role: 'TOP'     },
    { proPlayerId: 'pro_017', username: 'Blaber',    role: 'JUNGLE'  },
    { proPlayerId: 'pro_018', username: 'Jensen',    role: 'MID'     },
    { proPlayerId: 'pro_019', username: 'Berserker', role: 'BOT'     },
    { proPlayerId: 'pro_020', username: 'Zven',      role: 'SUPPORT' },
  ]},
  { teamId: 'BLG_CN', name: 'BLG',       region: 'LPL', roster: [
    { proPlayerId: 'pro_021', username: 'Bin',    role: 'TOP'     },
    { proPlayerId: 'pro_022', username: 'Wei',    role: 'JUNGLE'  },
    { proPlayerId: 'pro_023', username: 'Knight', role: 'MID'     },
    { proPlayerId: 'pro_024', username: 'Elk',    role: 'BOT'     },
    { proPlayerId: 'pro_025', username: 'ON',     role: 'SUPPORT' },
  ]},
  { teamId: 'DK_KR',  name: 'Dplus KIA', region: 'LCK', roster: [
    { proPlayerId: 'pro_026', username: 'Kiin',      role: 'TOP'     },
    { proPlayerId: 'pro_027', username: 'Canyon',    role: 'JUNGLE'  },
    { proPlayerId: 'pro_028', username: 'ShowMaker', role: 'MID'     },
    { proPlayerId: 'pro_029', username: 'Aiming',    role: 'BOT'     },
    { proPlayerId: 'pro_030', username: 'Kellin',    role: 'SUPPORT' },
  ]},
];

export const PRO_PLAYERS = [
  { proPlayerId: 'pro_003', name: 'Lee Sang-hyeok', username: 'Faker',      teamId: 'T1_KR',  nationality: 'KR', role: 'MID'     },
  { proPlayerId: 'pro_008', name: 'Jeong Ji-hoon',  username: 'Chovy',      teamId: 'GEN_KR', nationality: 'KR', role: 'MID'     },
  { proPlayerId: 'pro_013', name: 'Rasmus Winther', username: 'Caps',       teamId: 'G2_EU',  nationality: 'DK', role: 'MID'     },
  { proPlayerId: 'pro_028', name: 'Heo Su',         username: 'ShowMaker',  teamId: 'DK_KR',  nationality: 'KR', role: 'MID'     },
  { proPlayerId: 'pro_023', name: 'Zhuo Ding',      username: 'Knight',     teamId: 'BLG_CN', nationality: 'CN', role: 'MID'     },
  { proPlayerId: 'pro_001', name: 'Choi Woo-je',    username: 'Zeus',       teamId: 'T1_KR',  nationality: 'KR', role: 'TOP'     },
  { proPlayerId: 'pro_021', name: 'Chen Ze-Bin',    username: 'Bin',        teamId: 'BLG_CN', nationality: 'CN', role: 'TOP'     },
  { proPlayerId: 'pro_002', name: 'Moon Hyeon-jun', username: 'Oner',       teamId: 'T1_KR',  nationality: 'KR', role: 'JUNGLE'  },
  { proPlayerId: 'pro_027', name: 'Kim Geon-bu',    username: 'Canyon',     teamId: 'DK_KR',  nationality: 'KR', role: 'JUNGLE'  },
  { proPlayerId: 'pro_004', name: 'Lee Min-hyeong', username: 'Gumayusi',   teamId: 'T1_KR',  nationality: 'KR', role: 'BOT'     },
  { proPlayerId: 'pro_009', name: 'Kim Jae-hyeon',  username: 'Peyz',       teamId: 'GEN_KR', nationality: 'KR', role: 'BOT'     },
  { proPlayerId: 'pro_005', name: 'Ryu Min-seok',   username: 'Keria',      teamId: 'T1_KR',  nationality: 'KR', role: 'SUPPORT' },
];

export const MATCHES = [
    { matchId: 'KR1_1718466893', duration: 1682, gameMode: 'CLASSIC',
      participants: [
        { puuid: 'puuid-faker-001',     champion: 'Ahri',    kills: 5,  deaths: 6, assists: 10, win: true,  cs: 281, damage: 30304
  },
        { puuid: 'puuid-caps-002',      champion: 'Zed',     kills: 8,  deaths: 3, assists: 4,  win: true,  cs: 240, damage: 28000
  },
        { puuid: 'puuid-chovy-003',     champion: 'Viktor',  kills: 3,  deaths: 5, assists: 7,  win: false, cs: 210, damage: 22000
  },
        { puuid: 'puuid-showmaker-004', champion: 'Syndra',  kills: 6,  deaths: 4, assists: 5,  win: true,  cs: 260, damage: 27000
  },
        { puuid: 'puuid-ruler-005',     champion: 'Jinx',    kills: 10, deaths: 2, assists: 3,  win: true,  cs: 310, damage: 35000
  },
        { puuid: 'puuid-bjergsen-007',  champion: 'Orianna', kills: 4,  deaths: 6, assists: 9,  win: false, cs: 220, damage: 21000
  },
        { puuid: 'puuid-uzi-008',       champion: 'Ezreal',  kills: 7,  deaths: 3, assists: 2,  win: true,  cs: 290, damage: 31000
  },
        { puuid: 'puuid-theshy-009',    champion: 'Irelia',  kills: 9,  deaths: 5, assists: 6,  win: true,  cs: 200, damage: 26000
  },
        { puuid: 'puuid-rekkles-010',   champion: 'Caitlyn', kills: 5,  deaths: 4, assists: 8,  win: false, cs: 270, damage: 24000
  },
        { puuid: 'puuid-knight-006',    champion: 'Azir',    kills: 2,  deaths: 7, assists: 11, win: false, cs: 195, damage: 19000
  },
      ],
      objectiveSummary: { towers: { blueTeam: 3, redTeam: 10 }, dragons: { blueTeam: 1, redTeam: 4 }, barons: { blueTeam: 0,
  redTeam: 1 } }
    },
    { matchId: 'KR1_1718466898', duration: 1720, gameMode: 'CLASSIC',
      participants: [
        { puuid: 'puuid-faker-001',     champion: 'Syndra',  kills: 9,  deaths: 3, assists: 12, win: true,  cs: 295, damage: 33450
  },
        { puuid: 'puuid-caps-002',      champion: 'Ahri',    kills: 5,  deaths: 4, assists: 6,  win: true,  cs: 250, damage: 25000
  },
        { puuid: 'puuid-chovy-003',     champion: 'Orianna', kills: 7,  deaths: 2, assists: 9,  win: true,  cs: 280, damage: 29000
  },
        { puuid: 'puuid-showmaker-004', champion: 'LeBlanc', kills: 4,  deaths: 5, assists: 3,  win: false, cs: 230, damage: 23000
  },
        { puuid: 'puuid-ruler-005',     champion: 'Xayah',   kills: 8,  deaths: 3, assists: 5,  win: true,  cs: 300, damage: 32000
  },
        { puuid: 'puuid-bjergsen-007',  champion: 'Viktor',  kills: 3,  deaths: 6, assists: 8,  win: false, cs: 215, damage: 20000
  },
        { puuid: 'puuid-uzi-008',       champion: 'Aphelios', kills: 11, deaths: 2, assists: 4, win: true,  cs: 320, damage: 37000
  },
        { puuid: 'puuid-theshy-009',    champion: 'Garen',   kills: 6,  deaths: 4, assists: 7,  win: false, cs: 185, damage: 18000
  },
        { puuid: 'puuid-rekkles-010',   champion: 'Jinx',    kills: 7,  deaths: 3, assists: 6,  win: true,  cs: 285, damage: 30000
  },
        { puuid: 'puuid-knight-006',    champion: 'Azir',    kills: 5,  deaths: 5, assists: 10, win: false, cs: 240, damage: 26000
  },
      ],
      objectiveSummary: { towers: { blueTeam: 8, redTeam: 4 }, dragons: { blueTeam: 3, redTeam: 1 }, barons: { blueTeam: 1, redTeam:0 } }
    },
    { matchId: 'KR1_1718466899', duration: 1655, gameMode: 'CLASSIC',
      participants: [
        { puuid: 'puuid-faker-001',     champion: 'Orianna', kills: 6,  deaths: 4, assists: 7,  win: false, cs: 270, damage: 28990
  },
        { puuid: 'puuid-caps-002',      champion: 'Syndra',  kills: 4,  deaths: 5, assists: 5,  win: false, cs: 235, damage: 22000
  },
        { puuid: 'puuid-chovy-003',     champion: 'Azir',    kills: 8,  deaths: 3, assists: 6,  win: true,  cs: 275, damage: 31000
  },
        { puuid: 'puuid-showmaker-004', champion: 'Zoe',     kills: 5,  deaths: 4, assists: 8,  win: true,  cs: 245, damage: 27000
  },
        { puuid: 'puuid-ruler-005',     champion: 'Varus',   kills: 7,  deaths: 2, assists: 4,  win: true,  cs: 295, damage: 33000
  },
        { puuid: 'puuid-bjergsen-007',  champion: 'Taliyah', kills: 3,  deaths: 5, assists: 9,  win: false, cs: 205, damage: 21000
  },
        { puuid: 'puuid-uzi-008',       champion: 'Caitlyn', kills: 9,  deaths: 3, assists: 3,  win: true,  cs: 305, damage: 34000
  },
        { puuid: 'puuid-theshy-009',    champion: 'Fiora',   kills: 7,  deaths: 5, assists: 5,  win: true,  cs: 190, damage: 24000
  },
        { puuid: 'puuid-rekkles-010',   champion: 'Ezreal',  kills: 6,  deaths: 4, assists: 7,  win: false, cs: 265, damage: 28000
  },
        { puuid: 'puuid-knight-006',    champion: 'Viktor',  kills: 4,  deaths: 6, assists: 10, win: false, cs: 230, damage: 23000
  },
      ],
      objectiveSummary: { towers: { blueTeam: 6, redTeam: 7 }, dragons: { blueTeam: 2, redTeam: 2 }, barons: { blueTeam: 0, redTeam: 1 } }
    },
    { matchId: 'KR1_1718466900', duration: 1810, gameMode: 'CLASSIC',
      participants: [
        { puuid: 'puuid-faker-001',     champion: 'Taliyah', kills: 11, deaths: 2, assists: 14, win: true,  cs: 305, damage: 36110
  },
        { puuid: 'puuid-caps-002',      champion: 'Orianna', kills: 6,  deaths: 3, assists: 8,  win: true,  cs: 260, damage: 27000
  },
        { puuid: 'puuid-chovy-003',     champion: 'LeBlanc', kills: 9,  deaths: 2, assists: 7,  win: true,  cs: 285, damage: 32000
  },
        { puuid: 'puuid-showmaker-004', champion: 'Viktor',  kills: 5,  deaths: 4, assists: 6,  win: false, cs: 240, damage: 25000
  },
        { puuid: 'puuid-ruler-005',     champion: 'Aphelios', kills: 12, deaths: 1, assists: 5, win: true,  cs: 330, damage: 38000
  },
        { puuid: 'puuid-bjergsen-007',  champion: 'Syndra',  kills: 4,  deaths: 5, assists: 9,  win: false, cs: 220, damage: 22000
  },
        { puuid: 'puuid-uzi-008',       champion: 'Jinx',    kills: 8,  deaths: 3, assists: 4,  win: true,  cs: 300, damage: 33000
  },
        { puuid: 'puuid-theshy-009',    champion: 'Darius',  kills: 7,  deaths: 4, assists: 6,  win: false, cs: 195, damage: 26000
  },
        { puuid: 'puuid-rekkles-010',   champion: 'Xayah',   kills: 9,  deaths: 2, assists: 7,  win: true,  cs: 290, damage: 31000
  },
        { puuid: 'puuid-knight-006',    champion: 'Ahri',    kills: 6,  deaths: 5, assists: 11, win: false, cs: 250, damage: 28000
  },
      ],
      objectiveSummary: { towers: { blueTeam: 10, redTeam: 2 }, dragons: { blueTeam: 4, redTeam: 1 }, barons: { blueTeam: 1,
  redTeam: 0 } }
    },
    { matchId: 'KR1_1718466901', duration: 1698, gameMode: 'CLASSIC',
      participants: [
        { puuid: 'puuid-faker-001',     champion: 'LeBlanc', kills: 8,  deaths: 5, assists: 9,  win: false, cs: 258, damage: 31220
  },
        { puuid: 'puuid-caps-002',      champion: 'Taliyah', kills: 5,  deaths: 4, assists: 7,  win: false, cs: 245, damage: 24000
  },
        { puuid: 'puuid-chovy-003',     champion: 'Syndra',  kills: 10, deaths: 2, assists: 8,  win: true,  cs: 290, damage: 34000
  },
        { puuid: 'puuid-showmaker-004', champion: 'Ahri',    kills: 7,  deaths: 3, assists: 6,  win: true,  cs: 265, damage: 29000
  },
        { puuid: 'puuid-ruler-005',     champion: 'Ezreal',  kills: 6,  deaths: 4, assists: 4,  win: false, cs: 280, damage: 28000
  },
        { puuid: 'puuid-bjergsen-007',  champion: 'Orianna', kills: 4,  deaths: 6, assists: 10, win: true,  cs: 210, damage: 23000
  },
        { puuid: 'puuid-uzi-008',       champion: 'Varus',   kills: 9,  deaths: 3, assists: 5,  win: false, cs: 295, damage: 32000
  },
        { puuid: 'puuid-theshy-009',    champion: 'Jax',     kills: 8,  deaths: 4, assists: 7,  win: true,  cs: 200, damage: 27000
  },
        { puuid: 'puuid-rekkles-010',   champion: 'Caitlyn', kills: 7,  deaths: 3, assists: 6,  win: false, cs: 275, damage: 30000
  },
        { puuid: 'puuid-knight-006',    champion: 'Zoe',     kills: 5,  deaths: 6, assists: 9,  win: true,  cs: 235, damage: 25000
  },
      ],
      objectiveSummary: { towers: { blueTeam: 5, redTeam: 8 }, dragons: { blueTeam: 1, redTeam: 3 }, barons: { blueTeam: 0, redTeam: 1 } }
    },
  ];
export const PLAYER_STATS = [
  { puuid: 'puuid-faker-001', avgKDA: 4.2, winrate: 68, preferredRoles: ['MID'], totalGamesPlayed: 1500, totalKills: 3200, totalDeaths: 760, totalAssists: 2100},
  { puuid: 'puuid-caps-002', avgKDA: 3.8, winrate: 62, preferredRoles: ['MID'], totalGamesPlayed: 1200, totalKills: 2400, totalDeaths: 650, totalAssists: 1800},
  { puuid: 'puuid-chovy-003', avgKDA: 4.0, winrate: 65, preferredRoles: ['MID'], totalGamesPlayed: 1400, totalKills: 2900, totalDeaths: 720, totalAssists: 2000},
  { puuid: 'puuid-showmaker-004', avgKDA: 3.9, winrate: 64, preferredRoles: ['MID'], totalGamesPlayed: 1350, totalKills: 2750, totalDeaths: 690, totalAssists: 1950},
  { puuid: 'puuid-ruler-005', avgKDA: 3.5, winrate: 60, preferredRoles: ['BOT'], totalGamesPlayed: 1100, totalKills: 2200, totalDeaths: 700, totalAssists: 1600},
];

export const USER_SETTINGS = [
  { puuid: 'puuid-faker-001', favoriteChampions: ['Ahri', 'Syndra', 'Orianna'], favoritePlayers: ['puuid-caps-002', 'puuid-chovy-003'], language: 'ko', theme: 'dark', notificationsEnabled: true, emailNotifications: false, preferences: { showRankingHistory: true, showMatchDetails: true, autoRefresh: false } },
  { puuid: 'puuid-caps-002', favoriteChampions: ['Zed', 'Syndra', 'Ahri'], favoritePlayers: ['puuid-faker-001'], language: 'en', theme: 'dark', notificationsEnabled: true, emailNotifications: true, preferences: { showRankingHistory: true, showMatchDetails: true, autoRefresh: true } },
  { puuid: 'puuid-chovy-003', favoriteChampions: ['Orianna', 'Viktor', 'Azir'], favoritePlayers: [], language: 'ko', theme: 'light', notificationsEnabled: false, emailNotifications: false, preferences: { showRankingHistory: false, showMatchDetails: true, autoRefresh: false } },
  { puuid: 'puuid-showmaker-004', favoriteChampions: ['LeBlanc', 'Taliyah', 'Zoe'], favoritePlayers: ['puuid-faker-001', 'puuid-chovy-003'], language: 'ko', theme: 'dark', notificationsEnabled: true, emailNotifications: true, preferences: { showRankingHistory: true, showMatchDetails: true, autoRefresh: true } },
  { puuid: 'puuid-ruler-005', favoriteChampions: ['Aphelios', 'Xayah', 'Varus'], favoritePlayers: [], language: 'ko', theme: 'dark', notificationsEnabled: true, emailNotifications: false, preferences: { showRankingHistory: true, showMatchDetails: false, autoRefresh: false } },
];