import { findPicksByPatch, getWinrateByChampionInPatch, findResultsByTournament } from '../repositories/tournament.repository.js';

export const getWinratesByPatch = async (req, res, next) => {
    try {
        const winrates = await getWinrateByChampionInPatch(req.params.patchId);
        res.status(200).json(winrates);
    } catch (error) {
        next(error);
    }
};

export const getPicksByPatch = async (req, res, next) => {
    try {
        const picks = await findPicksByPatch(req.params.patchId);
        res.status(200).json(picks);
    } catch (error) {
        next(error);
    }
};

export const getTournamentResults = async (req, res, next) => {
    try {
        const results = await findResultsByTournament(req.params.tournamentId);
        res.status(200).json(results);
    } catch (error) {
        next(error);
    }
};
