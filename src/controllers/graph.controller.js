const service = require('../services/graph.service');

async function getSynergies(req, res, next) {
  try {
    const data = await service.fetchSynergies(req.params.championId);
    res.json({ data });
  } catch (err) { next(err); }
}

async function getCounters(req, res, next) {
  try {
    const data = await service.fetchCounters(req.params.championId);
    res.json({ data });
  } catch (err) { next(err); }
}

async function getPlayerMains(req, res, next) {
  try {
    const data = await service.fetchPlayerMains(req.params.puuid);
    res.json({ data });
  } catch (err) { next(err); }
}

async function getPlayerNetwork(req, res, next) {
  try {
    const data = await service.fetchPlayerNetwork(req.params.puuid);
    res.json({ data });
  } catch (err) { next(err); }
}

async function getOrgGraph(req, res, next) {
  try {
    const data = await service.fetchOrgGraph();
    res.json({ data });
  } catch (err) { next(err); }
}

async function getProCareer(req, res, next) {
  try {
    const data = await service.fetchProCareer(req.params.id);
    res.json({ data });
  } catch (err) { next(err); }
}

async function getProRivalry(req, res, next) {
  try {
    const data = await service.fetchProRivalry(req.params.id);
    res.json({ data });
  } catch (err) { next(err); }
}

async function getFullGraph(req, res, next) {
  try {
    const data = await service.fetchFullGraph();
    res.json({ data });
  } catch (err) { next(err); }
}

module.exports = { getSynergies, getCounters, getPlayerMains, getPlayerNetwork, getOrgGraph, getProCareer, getProRivalry, getFullGraph };
