import connectionDB from "../config/database";

export async function post(recommendationId: number, genreId: number): Promise<void> {
  await connectionDB.query(
    `INSERT INTO genres_recommendations ("genreId", "recommendationId") 
    VALUES ($1, $2)`,
    [genreId, recommendationId]
  );
}
