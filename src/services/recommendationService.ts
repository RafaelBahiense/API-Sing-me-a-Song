import * as recommendationRepository from "../repositories/recommendationRepository";
import * as genreRecommendationRepository from "../repositories/genreRecommendationRepository";

export async function post(name: string, youtubeLink: string, genresIds: number[]) {
    const existent = await recommendationRepository.getByLink(youtubeLink);
    if(existent.rowCount) return false;

    const recommendation = await recommendationRepository.post(name, youtubeLink);
    genresIds.forEach(async (genreId) => await genreRecommendationRepository.post(recommendation.id, genreId))
    return true;
}