import * as genreRepository from "../repositories/genreRepository";
import * as recommendationRepository from "../repositories/recommendationRepository";
import { GenreSchema } from "../schemas/schemas";

export async function post(name: string) {
    await GenreSchema.validateAsync(name);

    const existent = await genreRepository.getByName(name);
    if(existent.rowCount) return false;

    await genreRepository.post(name);
    return true;
}

export async function getAll() {
    return await genreRepository.getAll();
}

export async function getAllById(id: number) {
    const genre = await genreRepository.getById(id);
    if(!genre) return false;

    const recommendationsQuery = await recommendationRepository.getByGenreId(id);
    const score = recommendationsQuery.rows.reduce((total, recommendation) => total += recommendation.score, 0)
    const recommendation = recommendationsQuery.rows;
    
    const recommendationsList = {
        ...genre,
        score,
        recommendation
    }

    return recommendationsList;
}
