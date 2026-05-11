import Player from '../models/Player.js';

export const findPlayersByRegion = async (region) =>
  Player.find({ region: region.toLowerCase() })
    .select('puuid summonerName tag summonerLevel region')
    .lean();
