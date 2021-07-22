import * as recommendationRepository from "../repositories/recommendationRepository";
import * as genreRepository from "../repositories/genreRepository";
import * as genreRecommendationRepository from "../repositories/genreRecommendationRepository";

type Recommendation = {
    id: number;
    youtubeLink: string;
    score: number;
};

export async function post(
  name: string,
  youtubeLink: string,
  genresIds: number[]
) {
  const genresQuery = await Promise.all(
    genresIds.map(async (genreId) => await genreRepository.getById(genreId))
  );
  const existentGenres = genresQuery.filter((el) => el !== undefined);
  if (existentGenres.length < genresIds.length) return null;

  const existent = await recommendationRepository.getByLink(youtubeLink);
  if (existent.rowCount) return false;

  const recommendation = await recommendationRepository.post(name, youtubeLink);
  await Promise.all(
    genresIds.map(
      async (genreId) =>
        await genreRecommendationRepository.post(recommendation.id, genreId)
    )
  );
  return true;
}

export async function vote(
  id: number,
  vote: number
) {
  const existent = await recommendationRepository.getById(id);
  if (!existent.rowCount) return false;

  return await recommendationRepository.updateScore(id, vote);
}


export async function getRecommendationsRandom() {
    let random = Math.random() * 100;
    let recommendationList: Recommendation[] | null = null;
    if (random > 30) {
        const queryResult =  await recommendationRepository.scoreGreaterThan(10);
        if(!queryResult.rowCount) random = 15;
        recommendationList = queryResult.rows;
    }
    if (random <= 30 ) {
        const queryResult =  await recommendationRepository.scoreBetween(-5, 10);
        recommendationList = queryResult.rows;
    }
    random = Math.floor(Math.random() * (recommendationList as Recommendation[]).length);
    if ((recommendationList as Recommendation[]).length < 1) return false;
    return (recommendationList as Recommendation[])[random];
}