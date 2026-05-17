export const CHAMPION_NODES = [
  // TOP
  { uid: '_:darius',   'dgraph.type': 'Champion', championId: 'Darius',    champName: 'Darius'     },
  { uid: '_:garen',    'dgraph.type': 'Champion', championId: 'Garen',     champName: 'Garen'      },
  { uid: '_:fiora',    'dgraph.type': 'Champion', championId: 'Fiora',     champName: 'Fiora'      },
  { uid: '_:camille',  'dgraph.type': 'Champion', championId: 'Camille',   champName: 'Camille'    },
  { uid: '_:malphite', 'dgraph.type': 'Champion', championId: 'Malphite',  champName: 'Malphite'   },
  { uid: '_:renekton', 'dgraph.type': 'Champion', championId: 'Renekton',  champName: 'Renekton'   },
  { uid: '_:sett',     'dgraph.type': 'Champion', championId: 'Sett',      champName: 'Sett'       },
  { uid: '_:jax',      'dgraph.type': 'Champion', championId: 'Jax',       champName: 'Jax'        },
  // JUNGLE
  { uid: '_:leesin',   'dgraph.type': 'Champion', championId: 'LeeSin',    champName: 'Lee Sin'    },
  { uid: '_:vi',       'dgraph.type': 'Champion', championId: 'Vi',        champName: 'Vi'         },
  { uid: '_:hecarim',  'dgraph.type': 'Champion', championId: 'Hecarim',   champName: 'Hecarim'    },
  { uid: '_:graves',   'dgraph.type': 'Champion', championId: 'Graves',    champName: 'Graves'     },
  { uid: '_:nidalee',  'dgraph.type': 'Champion', championId: 'Nidalee',   champName: 'Nidalee'    },
  { uid: '_:viego',    'dgraph.type': 'Champion', championId: 'Viego',     champName: 'Viego'      },
  { uid: '_:khazix',   'dgraph.type': 'Champion', championId: 'Khazix',    champName: "Kha'Zix"    },
  { uid: '_:kindred',  'dgraph.type': 'Champion', championId: 'Kindred',   champName: 'Kindred'    },
  // MID
  { uid: '_:ahri',     'dgraph.type': 'Champion', championId: 'Ahri',      champName: 'Ahri'       },
  { uid: '_:yasuo',    'dgraph.type': 'Champion', championId: 'Yasuo',     champName: 'Yasuo'      },
  { uid: '_:zed',      'dgraph.type': 'Champion', championId: 'Zed',       champName: 'Zed'        },
  { uid: '_:syndra',   'dgraph.type': 'Champion', championId: 'Syndra',    champName: 'Syndra'     },
  { uid: '_:azir',     'dgraph.type': 'Champion', championId: 'Azir',      champName: 'Azir'       },
  { uid: '_:viktor',   'dgraph.type': 'Champion', championId: 'Viktor',    champName: 'Viktor'     },
  { uid: '_:orianna',  'dgraph.type': 'Champion', championId: 'Orianna',   champName: 'Orianna'    },
  { uid: '_:leblanc',  'dgraph.type': 'Champion', championId: 'LeBlanc',   champName: 'LeBlanc'    },
  { uid: '_:akali',    'dgraph.type': 'Champion', championId: 'Akali',     champName: 'Akali'      },
  { uid: '_:taliyah',  'dgraph.type': 'Champion', championId: 'Taliyah',   champName: 'Taliyah'    },
  // BOT
  { uid: '_:jinx',     'dgraph.type': 'Champion', championId: 'Jinx',      champName: 'Jinx'       },
  { uid: '_:caitlyn',  'dgraph.type': 'Champion', championId: 'Caitlyn',   champName: 'Caitlyn'    },
  { uid: '_:jhin',     'dgraph.type': 'Champion', championId: 'Jhin',      champName: 'Jhin'       },
  { uid: '_:ezreal',   'dgraph.type': 'Champion', championId: 'Ezreal',    champName: 'Ezreal'     },
  { uid: '_:aphelios', 'dgraph.type': 'Champion', championId: 'Aphelios',  champName: 'Aphelios'   },
  { uid: '_:zeri',     'dgraph.type': 'Champion', championId: 'Zeri',      champName: 'Zeri'       },
  { uid: '_:xayah',    'dgraph.type': 'Champion', championId: 'Xayah',     champName: 'Xayah'      },
  { uid: '_:kaisa',    'dgraph.type': 'Champion', championId: 'Kaisa',     champName: "Kai'Sa"     },
  // SUPPORT
  { uid: '_:thresh',   'dgraph.type': 'Champion', championId: 'Thresh',    champName: 'Thresh'     },
  { uid: '_:lulu',     'dgraph.type': 'Champion', championId: 'Lulu',      champName: 'Lulu'       },
  { uid: '_:nautilus', 'dgraph.type': 'Champion', championId: 'Nautilus',  champName: 'Nautilus'   },
  { uid: '_:leona',    'dgraph.type': 'Champion', championId: 'Leona',     champName: 'Leona'      },
  { uid: '_:soraka',   'dgraph.type': 'Champion', championId: 'Soraka',    champName: 'Soraka'     },
  { uid: '_:blitz',    'dgraph.type': 'Champion', championId: 'Blitzcrank',champName: 'Blitzcrank' },
  { uid: '_:alistar',  'dgraph.type': 'Champion', championId: 'Alistar',   champName: 'Alistar'    },
  { uid: '_:lux',      'dgraph.type': 'Champion', championId: 'Lux',       champName: 'Lux'        },
  { uid: '_:lillia',   'dgraph.type': 'Champion', championId: 'Lillia',    champName: 'Lillia'     },
  { uid: '_:morgana',  'dgraph.type': 'Champion', championId: 'Morgana',   champName: 'Morgana'    },
];

function synergy(a, b, gamesPlayed, winRate, avgCombinedDamage) {
  return [
    { uid: a, synergizes_with: { uid: b, 'synergizes_with|gamesPlayed': gamesPlayed, 'synergizes_with|winRate': winRate, 'synergizes_with|avgCombinedDamage': avgCombinedDamage } },
    { uid: b, synergizes_with: { uid: a, 'synergizes_with|gamesPlayed': gamesPlayed, 'synergizes_with|winRate': winRate, 'synergizes_with|avgCombinedDamage': avgCombinedDamage } },
  ];
}

export const SYNERGY_EDGES = [
  // Bot lane clásica
  ...synergy('_:jinx',     '_:thresh',   4820, 58.3, 52000),
  ...synergy('_:caitlyn',  '_:lux',      3910, 56.8, 49500),
  ...synergy('_:aphelios', '_:leona',    5200, 57.4, 53200),
  ...synergy('_:zeri',     '_:lulu',     4100, 59.1, 48000),
  ...synergy('_:xayah',    '_:nautilus', 3600, 55.9, 47800),
  ...synergy('_:ezreal',   '_:soraka',   2900, 54.2, 44500),
  ...synergy('_:kaisa',    '_:nautilus', 4400, 57.0, 50100),
  ...synergy('_:jhin',     '_:blitz',    3800, 57.6, 48900),
  // Mid combos
  ...synergy('_:yasuo',    '_:malphite', 6800, 62.5, 55000),
  ...synergy('_:orianna',  '_:malphite', 5900, 61.3, 53800),
  ...synergy('_:ahri',     '_:lux',      3200, 55.1, 47500),
  ...synergy('_:hecarim',  '_:orianna',  2800, 58.7, 51200),
  ...synergy('_:viktor',   '_:nautilus', 2400, 56.2, 50800),
  ...synergy('_:taliyah',  '_:leesin',   2100, 60.4, 48600),
  ...synergy('_:akali',    '_:viego',    1900, 57.3, 51500),
  ...synergy('_:azir',     '_:vi',       2300, 56.8, 50200),
  // Top/Jungle combos
  ...synergy('_:graves',   '_:camille',  3100, 57.9, 49000),
  ...synergy('_:sett',     '_:lillia',   1500, 55.0, 47200),
  ...synergy('_:kindred',  '_:morgana',  1200, 53.8, 44100),
];

function counter(a, b, matchups, winRateFavor, avgKDADifference, position) {
  return { uid: a, counters_edge: { uid: b, 'counters_edge|matchups': matchups, 'counters_edge|winRateFavor': winRateFavor, 'counters_edge|avgKDADifference': avgKDADifference, 'counters_edge|position': position } };
}

export const COUNTER_EDGES = [
  // TOP
  counter('_:fiora',    '_:malphite', 8200, 62.1, 2.1, 'TOP'),
  counter('_:renekton', '_:darius',   7100, 57.8, 1.5, 'TOP'),
  counter('_:darius',   '_:garen',    6400, 56.2, 1.3, 'TOP'),
  counter('_:camille',  '_:jax',      5900, 55.4, 1.1, 'TOP'),
  counter('_:malphite', '_:jax',      5300, 54.9, 0.9, 'TOP'),
  // MID
  counter('_:zed',      '_:syndra',   9100, 54.7, 1.2, 'MID'),
  counter('_:leblanc',  '_:viktor',   6800, 56.3, 1.4, 'MID'),
  counter('_:akali',    '_:ahri',     7200, 53.8, 0.8, 'MID'),
  counter('_:yasuo',    '_:orianna',  5400, 52.9, 0.7, 'MID'),
  counter('_:taliyah',  '_:azir',     4100, 55.6, 1.0, 'MID'),
  // JUNGLE
  counter('_:graves',   '_:nidalee',  6200, 57.1, 1.3, 'JUNGLE'),
  counter('_:hecarim',  '_:kindred',  5100, 54.3, 0.9, 'JUNGLE'),
  counter('_:khazix',   '_:nidalee',  5800, 56.4, 1.1, 'JUNGLE'),
  counter('_:leesin',   '_:viego',    4700, 53.9, 0.8, 'JUNGLE'),
  // BOT
  counter('_:caitlyn',  '_:jinx',     7800, 53.4, 0.7, 'BOT'),
  counter('_:zeri',     '_:jhin',     5600, 55.2, 1.0, 'BOT'),
  counter('_:ezreal',   '_:aphelios', 6300, 52.8, 0.6, 'BOT'),
  // SUPPORT
  counter('_:leona',    '_:soraka',   8900, 59.3, 1.8, 'SUPPORT'),
  counter('_:thresh',   '_:alistar',  5200, 53.1, 0.7, 'SUPPORT'),
  counter('_:blitz',    '_:soraka',   7400, 57.8, 1.5, 'SUPPORT'),
];
