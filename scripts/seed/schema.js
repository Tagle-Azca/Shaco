// Dgraph schema — predicates + type definitions
// Each predicate on its own line (Dgraph requirement)
export const DGRAPH_SCHEMA = `
  puuid:        string @index(exact) @upsert .
  summonerName: string @index(term, trigram) .
  region:       string .
  championId:   string @index(exact) @upsert .
  champName:    string @index(term, trigram) .
  proPlayerId:  string @index(exact) @upsert .
  proName:      string @index(term) .
  nationality:  string .
  teamId:       string @index(exact) @upsert .
  teamName:     string @index(term) .
  orgId:        string @index(exact) @upsert .
  orgName:      string @index(term) .

  played_with:     [uid] @reverse .
  mains:           [uid] @reverse .
  synergizes_with: [uid] @reverse .
  counters_edge:   [uid] @reverse .
  has_team:        [uid] .
  has_player:      [uid] @reverse .
  played_for:      [uid] .
  rival_of:        [uid] @reverse .

  type Player {
    puuid
    summonerName
    region
    played_with
    mains
  }
  type Champion {
    championId
    champName
    synergizes_with
    counters_edge
  }
  type ProPlayer {
    proPlayerId
    proName
    nationality
    played_for
    rival_of
  }
  type Team {
    teamId
    teamName
    region
    has_player
  }
  type Organization {
    orgId
    orgName
    has_team
  }
`;
