import { QueryResult } from "pg";

import connectionDB from "../config/database";

type Recommendation = {
  id: number;
  youtubeLink: string;
  score: number;
};

export async function post(name: string, youtubeLink: string): Promise<Recommendation> {
  const queryResult = await connectionDB.query(
    `INSERT INTO recommendations (name, "youtubeLink") 
    VALUES ($1, $2)
    RETURNING *`,
    [name, youtubeLink]
  );

  return queryResult.rows[0];
}

export async function getByLink(
  youtubeLink: string
): Promise<QueryResult<Recommendation>> {
  return await connectionDB.query(
    `SELECT * FROM recommendations 
    WHERE "youtubeLink" = $1`,
    [youtubeLink]
  );
}

export async function getByGenreId(
  id: number
): Promise<QueryResult<Recommendation>> {
  return await connectionDB.query(
    `SELECT * FROM recommendations 
    JOIN genres_recommendations 
    ON genres_recommendations.recommendationId = recommendations.id 
    WHERE genres_recommendations.genreId`,
    [id]
  );
}
