import * as graphService from '../services/graph.service.js';

export async function getChampionGraph(req, res, next) {
  try {
    const data = await graphService.getChampionGraph(req.params.championId);
    res.json({ data });
  } catch (err) { next(err); }
}

export async function getPlayerOverview(req, res, next) {
  try {
    const data = await graphService.getPlayerOverview(req.params.puuid);
    res.json({ data });
  } catch (err) { next(err); }
}

export async function getActiveTeams(req, res, next) {
  try {
    const data = await graphService.getActiveTeams();
    res.json({ data });
  } catch (err) { next(err); }
}

export async function getProProfile(req, res, next) {
  try {
    const data = await graphService.getProProfile(req.params.id);
    res.json({ data });
  } catch (err) { next(err); }
}

export async function getOrgGraph(req, res, next) {
  try {
    const data = await graphService.getOrgGraph();
    res.json({ data });
  } catch (err) { next(err); }
}

export async function getFullGraph(req, res, next) {
  try {
    const data = await graphService.getFullGraph();
    res.json({ data });
  } catch (err) { next(err); }
}
