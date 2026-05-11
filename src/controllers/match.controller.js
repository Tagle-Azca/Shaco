import { findMatchesByPuuid } from '../repositories/match.repository.js';
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
