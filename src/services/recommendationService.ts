import * as recommendationRepository from "../repositories/recommendationRepository";
import * as genreRepository from "../repositories/genreRepository";
import * as genreRecommendationRepository from "../repositories/genreRecommendationRepository";

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
