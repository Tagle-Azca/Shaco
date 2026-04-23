# Shaco — League of Legends Competitions Tracker

Backend analytics platform for League of Legends competitive data. Built on a multi-database NoSQL architecture, it provides multidimensional analysis of player performance, champion relationships, and the competitive ecosystem — all sourced from the Riot Games API.

> ITESO — Bases de Datos No Relacionales · Equipo Lobo Dinamita Buena Onda

---

## Tech Stack

- **Runtime**: Node.js 18+ (ES Modules)
- **Framework**: Express.js
- **Databases**: MongoDB · Cassandra · Dgraph
- **External APIs**: Riot Games API (Summoner, Match, Data Dragon) · Leaguepedia

---

## Database Architecture

Each database is chosen for a specific access pattern. They are not interchangeable.

### MongoDB — Profiles & Catalogs

Flexible document store for data that evolves frequently (game patches, user preferences).

| Collection | Description |
|---|---|
| `players` | Summoner profiles (`puuid`, `summonerName`, `region`, etc.) |
| `playerStats` | Computed performance (`avgKDA`, `winrate`, `preferredRoles`, recent matches) |
| `champions` | Full champion catalog from Data Dragon (stats, abilities, tips) |
| `userSettings` | User preferences (favorites, language, theme) |
| `matchAnalysis` | Processed match data (gold/damage graphs, objective summary) |
| `proTeams` | Pro team rosters from Leaguepedia |
| `proPlayers` | Pro player profiles linked to teams |
| `competitivePicks` | Champion picks & builds per patch and tournament |

### Dgraph — Graph Engine

Models the social and competitive fabric of the game. All relationship data lives here.

**Nodes**

| Type | Key Fields |
|---|---|
| `Player` | `puuid`, `summonerName`, `region` |
| `Champion` | `championId`, `name`, `roles` |
| `ProPlayer` | `proPlayerId`, `name`, `nationality` |
| `Team` | `teamId`, `name`, `region` |
| `Organization` | `orgId`, `name` |

**Edges**

| Edge | Direction | Attributes | Description |
|---|---|---|---|
| `PLAYED_WITH` | Player ↔ Player | `gamesShared`, `wins`, `losses`, `lastPlayed` | Party/duo co-participation network |
| `SYNERGIZES_WITH` | Champion ↔ Champion | `gamesPlayed`, `winRate`, `avgCombinedDamage` | Best champion pairs in same team |
| `COUNTERS` | Champion → Champion | `matchups`, `winRateFavor`, `avgKDADifference`, `position` | Directional lane counter relationships |
| `HAS_TEAM` | Organization → Team | `isActive` | Org structure |
| `HAS_PLAYER` | Team → ProPlayer | `role`, `joinDate`, `isActive` | Active roster |
| `PLAYED_FOR` | ProPlayer → Team | `startDate`, `endDate`, `region`, `tournamentsPlayed` | Career transfer history |
| `RIVAL_OF` | ProPlayer ↔ ProPlayer | `totalMatches`, `winsA`, `winsB`, `lastEncounter`, `tournaments` | Head-to-head rivalry records |
| `MAINS` | Player → Champion | `gamesPlayed`, `winRate`, `avgKDA`, `avgCSPerMin`, `lastPlayed`, `rank` | Champion pool affinity |

### Cassandra — Time-Series & High-Volume Logs

Optimized for chronological, write-heavy data that must scale linearly.

| Table | Partition Key | Description |
|---|---|---|
| `rank_history` | `player_id` | Daily MMR/LP snapshots per player |
| `match_log` | `player_id` | Last match per player (mode, champion, participants) |
| `meta_changes` | `patch_version` | Champion win/ban rates per game version |
| `tournament_results` | `tournament_id` | Series results from official competitions |
| `early_objectives` | `match_id` | First blood team, first dragon time, outcome |
| `season_stats` | `player_id, season_year` | End-of-season cumulative stats archive |
| `champion_pick_rate` | `week_number` | Weekly pick count per champion in competitive play |

---

## Request Flow

```
HTTP Request
    ↓
src/routes/
    ↓
src/controllers/    ← HTTP only: parse params, return response
    ↓
src/services/       ← Business logic, orchestration, external APIs
    ↓
src/repositories/   ← DB queries only (Mongo / Cassandra / Dgraph)
    ↓
Databases
```

Never skip layers. Controllers have no business logic. Repositories have no conditionals.

---

## Project Structure

```
/src
├── config/             # DB connections (mongodb.js, cassandra.js, dgraph.js)
├── models/             # Mongoose schemas
├── repositories/       # Data access layer (one file per DB concern)
├── services/           # Business logic & API orchestration
├── controllers/        # Thin HTTP handlers
├── routes/             # Express routers (aggregated in index.js, all under /api)
├── middleware/         # requireAuth.js (JWT)
└── utils/              # apiError.js, logger.js, cache.js, http.js

/scripts
├── seed.js             # Seeds all databases from Riot API
└── ...

server.js               # Express app, DB init, middleware stack
docker-compose.yml      # MongoDB + Cassandra + Dgraph local containers
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- Riot Games API key

### Setup

```bash
# 1. Clone and install
git clone <repo-url>
cd shaco
npm install

# 2. Configure environment
cp .env.example .env
# Fill in RIOT_API_KEY and other variables

# 3. Start databases
npm run db:up

# 4. Seed data
npm run seed

# 5. Start server
npm run dev
```

### Environment Variables

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/lol_tracker
CASSANDRA_HOST=127.0.0.1
CASSANDRA_KEYSPACE=lol_telemetry
DGRAPH_URL=localhost:9080
RIOT_API_KEY=RGAPI-...
```

---

## Commands

```bash
npm run dev        # Start with nodemon auto-reload
npm start          # Production start
npm run db:up      # Start MongoDB, Cassandra, Dgraph via Docker
npm run db:down    # Stop all DB containers
npm run seed       # Seed all databases from Riot API
```

---

## Error Handling

Throw `ApiError` from `utils/apiError.js` in services. The Express error middleware in `server.js` catches everything and returns structured JSON. Never call `res.send()` directly for errors.

```js
// In a service
throw new ApiError('Player not found', 404)

// In a controller
try {
  const data = await playerService.getProfile(puuid)
  res.json(data)
} catch (err) {
  next(err)
}
```

---

## Team

| Name | Role |
|---|---|
| Ethan Gabriel Orozco Madrid | MongoDB |
| Rafael Takata García | Cassandra |
| Andrés Gómez Tagle Azcárraga | Dgraph |

**Course**: Bases de Datos No Relacionales — ITESO, Universidad Jesuita de Guadalajara  
**Instructor**: Omar Antonio Madriz Almanza
