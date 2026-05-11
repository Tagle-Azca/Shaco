import { syncChampions } from '../services/champion.service.js';
import { findChampionById, findChampionsByRole, getAllChampions, findChampionByName } from '../repositories/champion.repository.js';

export const syncAllChampions = async (req, res, next) => {
    try {
        await syncChampions();
        res.status(200).json({ message: 'Champions synced successfully' });
    } catch (error) {
        next(error);
    }
};

export const getChampionsByRole = async (req, res, next) => {
    try {
        const champions = await findChampionsByRole(req.params.role);
        res.status(200).json(champions);
    } catch (error) {
        next(error);
    }
};


export const listAllChampions = async (req, res, next) => {
    try {
        const champions = await getAllChampions();
        res.status(200).json(champions);
    } catch (error) {
        next(error);
    }
};

export const getChampionById = async (req, res, next) => {
    try {
        const champion = await findChampionById(req.params.championId);
        res.status(200).json(champion);
    } catch (error) {
        next(error);
    }
};

export const getChampionByName = async (req, res, next) => {
    try {
        const champion = await findChampionByName(req.query.name);
        res.status(200).json(champion);
    } catch (error) {
        next(error);
    }
};

export const getChampionByRole = async (req, res, next) => {
    try {
        const champions = await findChampionsByRole(req.params.role);
        res.status(200).json(champions);
    } catch (error) {
        next(error);
    }
};