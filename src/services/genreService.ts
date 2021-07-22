import * as genreRepository from "../repositories/genreRepository";
import * as recommendationRepository from "../repositories/recommendationRepository";

export async function post(name: string) {
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
    
    const recommendationsList = {
        ...genre,
        score,

    }

    return recommendationsQuery.rows;
}
