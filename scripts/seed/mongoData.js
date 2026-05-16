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
