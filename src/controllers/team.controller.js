import Team from '../models/Team.js';
import ProPlayer from '../models/ProPlayer.js';

export const getAllTeams = async (req, res, next) => {
  try {
    const teams = await Team.find({}).lean();
    res.status(200).json(teams);
  } catch (error) {
    next(error);
  }
};

export const getAllProPlayers = async (req, res, next) => {
  try {
    const players = await ProPlayer.find({}).lean();
    res.status(200).json(players);
  } catch (error) {
    next(error);
  }
};

export const getTeamById = async (req, res, next) => {
  try {
    const team = await Team.findOne({ teamId: req.params.teamId }).lean();
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.status(200).json(team);
  } catch (error) {
    next(error);
  }
};