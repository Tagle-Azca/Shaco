import 'dotenv/config';
import { mutate, alter, dropAll } from '../src/utils/dgraph.js';

import { DGRAPH_SCHEMA }                                    from './seed/schema.js';
import { CHAMPION_NODES, SYNERGY_EDGES, COUNTER_EDGES }    from './seed/championsData.js';
import { PLAYER_NODES, PLAYED_WITH_EDGES, MAINS_EDGES }    from './seed/playersData.js';
import { ORG_NODES, TEAM_NODES, HAS_TEAM_EDGES,
         PRO_PLAYER_NODES, HAS_PLAYER_EDGES,
         PLAYED_FOR_EDGES, RIVAL_OF_EDGES }                from './seed/proData.js';

(async () => {
  await dropAll();
  console.log('Dgraph limpiado');

  await alter(DGRAPH_SCHEMA);
  console.log('Schema aplicado');

  await mutate([
    ...CHAMPION_NODES,   ...SYNERGY_EDGES,     ...COUNTER_EDGES,
    ...PLAYER_NODES,     ...PLAYED_WITH_EDGES,  ...MAINS_EDGES,
    ...ORG_NODES,        ...TEAM_NODES,         ...HAS_TEAM_EDGES,
    ...PRO_PLAYER_NODES, ...HAS_PLAYER_EDGES,
    ...PLAYED_FOR_EDGES, ...RIVAL_OF_EDGES,
  ]);
  console.log('Dgraph seeded');
  process.exit(0);
})().catch((err) => { console.error(err); process.exit(1); });
