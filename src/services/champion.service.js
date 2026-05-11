import ApiError from '../utils/apiError.js';
import { getJson } from '../utils/http.js';
import { findChampionById, findChampionByName, findChampionsByRole, getAllChampions, upsertChampion } from '../repositories/champion.repository.js';

const ensureRiotKey = () => {
    if (!process.env.RIOT_API_KEY) {
        throw new ApiError('RIOT_API_KEY is not configured', 500);
    }
};

const riotHeaders = () => ({
    'X-Riot-Token': process.env.RIOT_API_KEY,
});

const getChampionData = async () => {
    const versionsUrl = 'https://ddragon.leagueoflegends.com/api/versions.json';
    const versions = await getJson(versionsUrl);
    const latestVersion = versions[0];

    const url = `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/champion.json`;
    const catalogData = await getJson(url);

    const championNames = Object.keys(catalogData.data);

    const detailedChampions = await Promise.all(
    championNames.map(async (name) => {
        const detailUrl = `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/champion/${name}.json`;
        const detail = await getJson(detailUrl);
        return detail.data[name];
        })
    );

return { version: latestVersion, champions: detailedChampions };
};

export const syncChampions = async () => {
    const { champions } = await getChampionData();

    const champData = champions.map(champ => ({
        championId: champ.key,
        name: champ.name,
        roles: champ.tags,
        baseStats: {
            hp: champ.stats.hp,
            armor: champ.stats.armor,
            mr: champ.stats.spellblock,
            ad: champ.stats.attackdamage,
        },
        abilities: {
            passive: champ.passive?.name || '',
            q: champ.spells?.[0]?.name || '',
            w: champ.spells?.[1]?.name || '',
            e: champ.spells?.[2]?.name || '',
            r: champ.spells?.[3]?.name || '',
        },
            recommendedMaxOrder: [],
            tips: champ.allytips?.slice(0, 3) || [],
    }));

    await Promise.all(champData.map(champ => upsertChampion(champ)));
    console.log(`${champData.length} campeones sincronizados`);
};
