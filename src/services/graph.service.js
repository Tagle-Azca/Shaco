const repo = require('../repositories/graph.repository');
const { ApiError } = require('../utils/apiError');

async function fetchSynergies(championId) {
  if (!championId) throw new ApiError('championId is required', 400);
  return repo.getSynergies(championId);
}

async function fetchCounters(championId) {
  if (!championId) throw new ApiError('championId is required', 400);
  return repo.getCounters(championId);
}

async function fetchPlayerMains(puuid) {
  if (!puuid) throw new ApiError('puuid is required', 400);
  return repo.getPlayerMains(puuid);
}

async function fetchPlayerNetwork(puuid) {
  if (!puuid) throw new ApiError('puuid is required', 400);
  return repo.getPlayerNetwork(puuid);
}

async function fetchOrgGraph() {
  return repo.getOrgGraph();
}

async function fetchProCareer(proPlayerId) {
  if (!proPlayerId) throw new ApiError('proPlayerId is required', 400);
  const result = await repo.getProCareer(proPlayerId);
  if (!result) throw new ApiError(`Pro player '${proPlayerId}' not found`, 404);
  return result;
}

async function fetchProRivalry(proPlayerId) {
  if (!proPlayerId) throw new ApiError('proPlayerId is required', 400);
  const result = await repo.getProRivalry(proPlayerId);
  if (!result) throw new ApiError(`Pro player '${proPlayerId}' not found`, 404);
  return result;
}

async function fetchFullGraph() {
  return repo.getFullGraph();
}

module.exports = { fetchSynergies, fetchCounters, fetchPlayerMains, fetchPlayerNetwork, fetchOrgGraph, fetchProCareer, fetchProRivalry, fetchFullGraph };
