export const ORG_NODES = [
  { uid: '_:org_t1',  'dgraph.type': 'Organization', orgId: 'ORG_T1',   orgName: 'T1 Corp'         },
  { uid: '_:org_gen', 'dgraph.type': 'Organization', orgId: 'ORG_GENG', orgName: 'Gen.G Corp'      },
  { uid: '_:org_g2',  'dgraph.type': 'Organization', orgId: 'ORG_G2',   orgName: 'G2 Esports'      },
  { uid: '_:org_c9',  'dgraph.type': 'Organization', orgId: 'ORG_C9',   orgName: 'Cloud9 Corp'     },
  { uid: '_:org_blg', 'dgraph.type': 'Organization', orgId: 'ORG_BLG',  orgName: 'BLG Corp'        },
  { uid: '_:org_dk',  'dgraph.type': 'Organization', orgId: 'ORG_DK',   orgName: 'Dplus KIA Corp'  },
];

export const TEAM_NODES = [
  // Activos
  { uid: '_:t_t1',    'dgraph.type': 'Team', teamId: 'T1_KR',  teamName: 'T1',             region: 'LCK' },
  { uid: '_:t_gen',   'dgraph.type': 'Team', teamId: 'GEN_KR', teamName: 'Gen.G',          region: 'LCK' },
  { uid: '_:t_g2',    'dgraph.type': 'Team', teamId: 'G2_EU',  teamName: 'G2 Esports',     region: 'LEC' },
  { uid: '_:t_c9',    'dgraph.type': 'Team', teamId: 'C9_NA',  teamName: 'Cloud9',         region: 'LCS' },
  { uid: '_:t_blg',   'dgraph.type': 'Team', teamId: 'BLG_CN', teamName: 'BLG',            region: 'LPL' },
  { uid: '_:t_dk',    'dgraph.type': 'Team', teamId: 'DK_KR',  teamName: 'Dplus KIA',      region: 'LCK' },
  // Históricos
  { uid: '_:t_fnatic', 'dgraph.type': 'Team', teamId: 'FNC_EU',  teamName: 'Fnatic',          region: 'LEC' },
  { uid: '_:t_tsm',    'dgraph.type': 'Team', teamId: 'TSM_NA',  teamName: 'TSM',             region: 'LCS' },
  { uid: '_:t_ssg',    'dgraph.type': 'Team', teamId: 'SSG_KR',  teamName: 'Samsung Galaxy',  region: 'LCK' },
  { uid: '_:t_jdg',    'dgraph.type': 'Team', teamId: 'JDG_CN',  teamName: 'JDG',             region: 'LPL' },
  { uid: '_:t_damwon', 'dgraph.type': 'Team', teamId: 'DWG_KR',  teamName: 'Damwon Gaming',   region: 'LCK' },
  { uid: '_:t_ig',     'dgraph.type': 'Team', teamId: 'IG_CN',   teamName: 'Invictus Gaming', region: 'LPL' },
];

export const HAS_TEAM_EDGES = [
  { uid: '_:org_t1',  has_team: { uid: '_:t_t1',  'has_team|isActive': true } },
  { uid: '_:org_gen', has_team: { uid: '_:t_gen', 'has_team|isActive': true } },
  { uid: '_:org_g2',  has_team: { uid: '_:t_g2',  'has_team|isActive': true } },
  { uid: '_:org_c9',  has_team: { uid: '_:t_c9',  'has_team|isActive': true } },
  { uid: '_:org_blg', has_team: { uid: '_:t_blg', 'has_team|isActive': true } },
  { uid: '_:org_dk',  has_team: { uid: '_:t_dk',  'has_team|isActive': true } },
];

export const PRO_PLAYER_NODES = [
  // T1
  { uid: '_:pro_zeus',      'dgraph.type': 'ProPlayer', proPlayerId: 'pro_001', proName: 'Zeus',       nationality: 'KR' },
  { uid: '_:pro_oner',      'dgraph.type': 'ProPlayer', proPlayerId: 'pro_002', proName: 'Oner',       nationality: 'KR' },
  { uid: '_:pro_faker',     'dgraph.type': 'ProPlayer', proPlayerId: 'pro_003', proName: 'Faker',      nationality: 'KR' },
  { uid: '_:pro_guma',      'dgraph.type': 'ProPlayer', proPlayerId: 'pro_004', proName: 'Gumayusi',   nationality: 'KR' },
  { uid: '_:pro_keria',     'dgraph.type': 'ProPlayer', proPlayerId: 'pro_005', proName: 'Keria',      nationality: 'KR' },
  // Gen.G
  { uid: '_:pro_doran',     'dgraph.type': 'ProPlayer', proPlayerId: 'pro_006', proName: 'Doran',      nationality: 'KR' },
  { uid: '_:pro_peanut',    'dgraph.type': 'ProPlayer', proPlayerId: 'pro_007', proName: 'Peanut',     nationality: 'KR' },
  { uid: '_:pro_chovy',     'dgraph.type': 'ProPlayer', proPlayerId: 'pro_008', proName: 'Chovy',      nationality: 'KR' },
  { uid: '_:pro_peyz',      'dgraph.type': 'ProPlayer', proPlayerId: 'pro_009', proName: 'Peyz',       nationality: 'KR' },
  { uid: '_:pro_lehends',   'dgraph.type': 'ProPlayer', proPlayerId: 'pro_010', proName: 'Lehends',    nationality: 'KR' },
  // G2
  { uid: '_:pro_bb',        'dgraph.type': 'ProPlayer', proPlayerId: 'pro_011', proName: 'BrokenBlade',nationality: 'DE' },
  { uid: '_:pro_jankos',    'dgraph.type': 'ProPlayer', proPlayerId: 'pro_012', proName: 'Jankos',     nationality: 'PL' },
  { uid: '_:pro_caps',      'dgraph.type': 'ProPlayer', proPlayerId: 'pro_013', proName: 'Caps',       nationality: 'DK' },
  { uid: '_:pro_flakked',   'dgraph.type': 'ProPlayer', proPlayerId: 'pro_014', proName: 'Flakked',    nationality: 'ES' },
  { uid: '_:pro_mikyx',     'dgraph.type': 'ProPlayer', proPlayerId: 'pro_015', proName: 'Mikyx',      nationality: 'SI' },
  // C9
  { uid: '_:pro_fudge',     'dgraph.type': 'ProPlayer', proPlayerId: 'pro_016', proName: 'Fudge',      nationality: 'AU' },
  { uid: '_:pro_blaber',    'dgraph.type': 'ProPlayer', proPlayerId: 'pro_017', proName: 'Blaber',     nationality: 'US' },
  { uid: '_:pro_jensen',    'dgraph.type': 'ProPlayer', proPlayerId: 'pro_018', proName: 'Jensen',     nationality: 'DK' },
  { uid: '_:pro_berserker', 'dgraph.type': 'ProPlayer', proPlayerId: 'pro_019', proName: 'Berserker',  nationality: 'KR' },
  { uid: '_:pro_zven',      'dgraph.type': 'ProPlayer', proPlayerId: 'pro_020', proName: 'Zven',       nationality: 'ES' },
  // BLG
  { uid: '_:pro_bin',       'dgraph.type': 'ProPlayer', proPlayerId: 'pro_021', proName: 'Bin',        nationality: 'CN' },
  { uid: '_:pro_wei',       'dgraph.type': 'ProPlayer', proPlayerId: 'pro_022', proName: 'Wei',        nationality: 'CN' },
  { uid: '_:pro_knight',    'dgraph.type': 'ProPlayer', proPlayerId: 'pro_023', proName: 'Knight',     nationality: 'CN' },
  { uid: '_:pro_elk',       'dgraph.type': 'ProPlayer', proPlayerId: 'pro_024', proName: 'Elk',        nationality: 'CN' },
  { uid: '_:pro_on',        'dgraph.type': 'ProPlayer', proPlayerId: 'pro_025', proName: 'ON',         nationality: 'CN' },
  // Dplus KIA
  { uid: '_:pro_kiin',      'dgraph.type': 'ProPlayer', proPlayerId: 'pro_026', proName: 'Kiin',       nationality: 'KR' },
  { uid: '_:pro_canyon',    'dgraph.type': 'ProPlayer', proPlayerId: 'pro_027', proName: 'Canyon',     nationality: 'KR' },
  { uid: '_:pro_showmaker', 'dgraph.type': 'ProPlayer', proPlayerId: 'pro_028', proName: 'ShowMaker',  nationality: 'KR' },
  { uid: '_:pro_aiming',    'dgraph.type': 'ProPlayer', proPlayerId: 'pro_029', proName: 'Aiming',     nationality: 'KR' },
  { uid: '_:pro_kellin',    'dgraph.type': 'ProPlayer', proPlayerId: 'pro_030', proName: 'Kellin',     nationality: 'KR' },
  // Leyendas
  { uid: '_:pro_rekkles',   'dgraph.type': 'ProPlayer', proPlayerId: 'pro_031', proName: 'Rekkles',    nationality: 'SE' },
  { uid: '_:pro_uzi',       'dgraph.type': 'ProPlayer', proPlayerId: 'pro_032', proName: 'Uzi',        nationality: 'CN' },
  { uid: '_:pro_theshy',    'dgraph.type': 'ProPlayer', proPlayerId: 'pro_033', proName: 'TheShy',     nationality: 'CN' },
  { uid: '_:pro_bjergsen',  'dgraph.type': 'ProPlayer', proPlayerId: 'pro_034', proName: 'Bjergsen',   nationality: 'DK' },
  { uid: '_:pro_ruler',     'dgraph.type': 'ProPlayer', proPlayerId: 'pro_035', proName: 'Ruler',      nationality: 'KR' },
];

export const HAS_PLAYER_EDGES = [
  { uid: '_:t_t1',  has_player: { uid: '_:pro_zeus',      'has_player|role': 'TOP',     'has_player|joinDate': '2022-01-01', 'has_player|isActive': true } },
  { uid: '_:t_t1',  has_player: { uid: '_:pro_oner',      'has_player|role': 'JUNGLE',  'has_player|joinDate': '2022-01-01', 'has_player|isActive': true } },
  { uid: '_:t_t1',  has_player: { uid: '_:pro_faker',     'has_player|role': 'MID',     'has_player|joinDate': '2013-01-01', 'has_player|isActive': true } },
  { uid: '_:t_t1',  has_player: { uid: '_:pro_guma',      'has_player|role': 'BOT',     'has_player|joinDate': '2021-01-01', 'has_player|isActive': true } },
  { uid: '_:t_t1',  has_player: { uid: '_:pro_keria',     'has_player|role': 'SUPPORT', 'has_player|joinDate': '2021-01-01', 'has_player|isActive': true } },
  { uid: '_:t_gen', has_player: { uid: '_:pro_doran',     'has_player|role': 'TOP',     'has_player|joinDate': '2022-01-01', 'has_player|isActive': true } },
  { uid: '_:t_gen', has_player: { uid: '_:pro_peanut',    'has_player|role': 'JUNGLE',  'has_player|joinDate': '2023-01-01', 'has_player|isActive': true } },
  { uid: '_:t_gen', has_player: { uid: '_:pro_chovy',     'has_player|role': 'MID',     'has_player|joinDate': '2022-01-01', 'has_player|isActive': true } },
  { uid: '_:t_gen', has_player: { uid: '_:pro_peyz',      'has_player|role': 'BOT',     'has_player|joinDate': '2023-01-01', 'has_player|isActive': true } },
  { uid: '_:t_gen', has_player: { uid: '_:pro_lehends',   'has_player|role': 'SUPPORT', 'has_player|joinDate': '2022-01-01', 'has_player|isActive': true } },
  { uid: '_:t_g2',  has_player: { uid: '_:pro_bb',        'has_player|role': 'TOP',     'has_player|joinDate': '2021-01-01', 'has_player|isActive': true } },
  { uid: '_:t_g2',  has_player: { uid: '_:pro_jankos',    'has_player|role': 'JUNGLE',  'has_player|joinDate': '2018-01-01', 'has_player|isActive': true } },
  { uid: '_:t_g2',  has_player: { uid: '_:pro_caps',      'has_player|role': 'MID',     'has_player|joinDate': '2019-01-01', 'has_player|isActive': true } },
  { uid: '_:t_g2',  has_player: { uid: '_:pro_flakked',   'has_player|role': 'BOT',     'has_player|joinDate': '2022-01-01', 'has_player|isActive': true } },
  { uid: '_:t_g2',  has_player: { uid: '_:pro_mikyx',     'has_player|role': 'SUPPORT', 'has_player|joinDate': '2018-01-01', 'has_player|isActive': true } },
  { uid: '_:t_c9',  has_player: { uid: '_:pro_fudge',     'has_player|role': 'TOP',     'has_player|joinDate': '2021-01-01', 'has_player|isActive': true } },
  { uid: '_:t_c9',  has_player: { uid: '_:pro_blaber',    'has_player|role': 'JUNGLE',  'has_player|joinDate': '2020-01-01', 'has_player|isActive': true } },
  { uid: '_:t_c9',  has_player: { uid: '_:pro_jensen',    'has_player|role': 'MID',     'has_player|joinDate': '2023-01-01', 'has_player|isActive': true } },
  { uid: '_:t_c9',  has_player: { uid: '_:pro_berserker', 'has_player|role': 'BOT',     'has_player|joinDate': '2023-01-01', 'has_player|isActive': true } },
  { uid: '_:t_c9',  has_player: { uid: '_:pro_zven',      'has_player|role': 'SUPPORT', 'has_player|joinDate': '2023-01-01', 'has_player|isActive': true } },
  { uid: '_:t_blg', has_player: { uid: '_:pro_bin',       'has_player|role': 'TOP',     'has_player|joinDate': '2023-01-01', 'has_player|isActive': true } },
  { uid: '_:t_blg', has_player: { uid: '_:pro_wei',       'has_player|role': 'JUNGLE',  'has_player|joinDate': '2023-01-01', 'has_player|isActive': true } },
  { uid: '_:t_blg', has_player: { uid: '_:pro_knight',    'has_player|role': 'MID',     'has_player|joinDate': '2024-01-01', 'has_player|isActive': true } },
  { uid: '_:t_blg', has_player: { uid: '_:pro_elk',       'has_player|role': 'BOT',     'has_player|joinDate': '2023-01-01', 'has_player|isActive': true } },
  { uid: '_:t_blg', has_player: { uid: '_:pro_on',        'has_player|role': 'SUPPORT', 'has_player|joinDate': '2023-01-01', 'has_player|isActive': true } },
  { uid: '_:t_dk',  has_player: { uid: '_:pro_kiin',      'has_player|role': 'TOP',     'has_player|joinDate': '2022-01-01', 'has_player|isActive': true } },
  { uid: '_:t_dk',  has_player: { uid: '_:pro_canyon',    'has_player|role': 'JUNGLE',  'has_player|joinDate': '2020-01-01', 'has_player|isActive': true } },
  { uid: '_:t_dk',  has_player: { uid: '_:pro_showmaker', 'has_player|role': 'MID',     'has_player|joinDate': '2020-01-01', 'has_player|isActive': true } },
  { uid: '_:t_dk',  has_player: { uid: '_:pro_aiming',    'has_player|role': 'BOT',     'has_player|joinDate': '2022-01-01', 'has_player|isActive': true } },
  { uid: '_:t_dk',  has_player: { uid: '_:pro_kellin',    'has_player|role': 'SUPPORT', 'has_player|joinDate': '2022-01-01', 'has_player|isActive': true } },
];

export const PLAYED_FOR_EDGES = [
  { uid: '_:pro_faker',     played_for: { uid: '_:t_t1',    'played_for|startDate': '2013-01-17', 'played_for|endDate': '',           'played_for|region': 'LCK', 'played_for|tournamentsPlayed': 42 } },
  { uid: '_:pro_caps',      played_for: { uid: '_:t_fnatic', 'played_for|startDate': '2017-11-01', 'played_for|endDate': '2018-11-30', 'played_for|region': 'LEC', 'played_for|tournamentsPlayed': 4  } },
  { uid: '_:pro_caps',      played_for: { uid: '_:t_g2',    'played_for|startDate': '2019-01-01', 'played_for|endDate': '',           'played_for|region': 'LEC', 'played_for|tournamentsPlayed': 12 } },
  { uid: '_:pro_rekkles',   played_for: { uid: '_:t_fnatic', 'played_for|startDate': '2014-01-01', 'played_for|endDate': '2020-12-31', 'played_for|region': 'LEC', 'played_for|tournamentsPlayed': 14 } },
  { uid: '_:pro_rekkles',   played_for: { uid: '_:t_g2',    'played_for|startDate': '2021-01-01', 'played_for|endDate': '2021-12-31', 'played_for|region': 'LEC', 'played_for|tournamentsPlayed': 2  } },
  { uid: '_:pro_ruler',     played_for: { uid: '_:t_ssg',   'played_for|startDate': '2017-01-01', 'played_for|endDate': '2017-12-31', 'played_for|region': 'LCK', 'played_for|tournamentsPlayed': 3  } },
  { uid: '_:pro_ruler',     played_for: { uid: '_:t_gen',   'played_for|startDate': '2018-01-01', 'played_for|endDate': '2022-12-31', 'played_for|region': 'LCK', 'played_for|tournamentsPlayed': 11 } },
  { uid: '_:pro_ruler',     played_for: { uid: '_:t_jdg',   'played_for|startDate': '2023-01-01', 'played_for|endDate': '2023-12-31', 'played_for|region': 'LPL', 'played_for|tournamentsPlayed': 3  } },
  { uid: '_:pro_ruler',     played_for: { uid: '_:t_gen',   'played_for|startDate': '2024-01-01', 'played_for|endDate': '',           'played_for|region': 'LCK', 'played_for|tournamentsPlayed': 2  } },
  { uid: '_:pro_theshy',    played_for: { uid: '_:t_ig',    'played_for|startDate': '2018-01-01', 'played_for|endDate': '2020-12-31', 'played_for|region': 'LPL', 'played_for|tournamentsPlayed': 6  } },
  { uid: '_:pro_bjergsen',  played_for: { uid: '_:t_tsm',   'played_for|startDate': '2013-01-01', 'played_for|endDate': '2021-08-31', 'played_for|region': 'LCS', 'played_for|tournamentsPlayed': 20 } },
  { uid: '_:pro_bjergsen',  played_for: { uid: '_:t_c9',    'played_for|startDate': '2022-01-01', 'played_for|endDate': '',           'played_for|region': 'LCS', 'played_for|tournamentsPlayed': 4  } },
  { uid: '_:pro_canyon',    played_for: { uid: '_:t_damwon', 'played_for|startDate': '2020-01-01', 'played_for|endDate': '2021-12-31', 'played_for|region': 'LCK', 'played_for|tournamentsPlayed': 5  } },
  { uid: '_:pro_canyon',    played_for: { uid: '_:t_dk',    'played_for|startDate': '2022-01-01', 'played_for|endDate': '',           'played_for|region': 'LCK', 'played_for|tournamentsPlayed': 7  } },
  { uid: '_:pro_showmaker', played_for: { uid: '_:t_damwon', 'played_for|startDate': '2020-01-01', 'played_for|endDate': '2021-12-31', 'played_for|region': 'LCK', 'played_for|tournamentsPlayed': 5  } },
  { uid: '_:pro_showmaker', played_for: { uid: '_:t_dk',    'played_for|startDate': '2022-01-01', 'played_for|endDate': '',           'played_for|region': 'LCK', 'played_for|tournamentsPlayed': 7  } },
  { uid: '_:pro_chovy',     played_for: { uid: '_:t_gen',   'played_for|startDate': '2022-01-01', 'played_for|endDate': '',           'played_for|region': 'LCK', 'played_for|tournamentsPlayed': 8  } },
  { uid: '_:pro_uzi',       played_for: { uid: '_:t_ssg',   'played_for|startDate': '2014-01-01', 'played_for|endDate': '2014-12-31', 'played_for|region': 'LCK', 'played_for|tournamentsPlayed': 2  } },
];

function rivalry(a, b, totalMatches, winsA, winsB, lastEncounter, tournaments) {
  return [
    { uid: a, rival_of: { uid: b, 'rival_of|totalMatches': totalMatches, 'rival_of|winsA': winsA, 'rival_of|winsB': winsB, 'rival_of|lastEncounter': lastEncounter, 'rival_of|tournaments': tournaments } },
    { uid: b, rival_of: { uid: a, 'rival_of|totalMatches': totalMatches, 'rival_of|winsA': winsB, 'rival_of|winsB': winsA, 'rival_of|lastEncounter': lastEncounter, 'rival_of|tournaments': tournaments } },
  ];
}

export const RIVAL_OF_EDGES = [
  ...rivalry('_:pro_faker',    '_:pro_chovy',     38, 22, 16, '2024-03-20', 'LCK,MSI,Worlds'),
  ...rivalry('_:pro_faker',    '_:pro_caps',      22, 14, 8,  '2023-10-28', 'Worlds,MSI'),
  ...rivalry('_:pro_faker',    '_:pro_knight',    18, 10, 8,  '2023-11-04', 'Worlds,MSI'),
  ...rivalry('_:pro_faker',    '_:pro_bjergsen',  12, 8,  4,  '2017-10-21', 'Worlds'),
  ...rivalry('_:pro_chovy',    '_:pro_showmaker', 31, 18, 13, '2024-03-15', 'LCK'),
  ...rivalry('_:pro_uzi',      '_:pro_ruler',     24, 14, 10, '2022-11-05', 'Worlds,MSI'),
  ...rivalry('_:pro_caps',     '_:pro_showmaker', 16, 9,  7,  '2022-10-30', 'Worlds'),
];
