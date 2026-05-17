import { findMatchesByPuuid, findMatchById } from '../repositories/match.repository.js';
import { syncMatchesForPlayer } from '../services/match.service.js';

export const getMatchesByPuuid = async (req, res, next) => {
    try {
        const matches = await findMatchesByPuuid(req.params.puuid);
        res.status(200).json(matches);
    } catch (error) {
        next(error);
    }
};

export const syncMatches = async (req, res, next) => {
    try {
        await syncMatchesForPlayer({ 
        puuid: req.params.puuid, 
        routingRegion: req.query.region || 'americas' 
        });
        res.status(200).json({ message: 'Matches synced' });
    } catch (error) {
        next(error);
    }
};

export const getMatchById = async (req, res, next) => {
    try {
        const match = await findMatchById(req.params.matchId);
        if (!match) return res.status(404).json({ message: 'Match not found' });
        res.status(200).json(match);
    } catch (error) {
        next(error);
    }
};
