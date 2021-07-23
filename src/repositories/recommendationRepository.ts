import { QueryResult } from "pg";

import connectionDB from "../config/database";

type Recommendation = {
  id: number;
  name: string
  youtubeLink: string;
  score: number;
};

export async function post(
  name: string,
  youtubeLink: string
): Promise<Recommendation> {
  const queryResult = await connectionDB.query(
    `INSERT INTO recommendations (name, "youtubeLink") 
    VALUES ($1, $2)
    RETURNING *`,
    [name, youtubeLink]
  );

  return queryResult.rows[0];
}

export async function getById(
  id: number
): Promise<QueryResult<Recommendation>> {
  return await connectionDB.query(
    `SELECT * FROM recommendations 
    WHERE id = $1`,
    [id]
  );
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
    `SELECT recommendations.* FROM recommendations 
    JOIN genres_recommendations 
    ON genres_recommendations."recommendationId" = recommendations.id 
    WHERE genres_recommendations."genreId" = $1`,
    [id]
  );
}

export async function updateScore(
  id: number,
  vote: number
): Promise<Recommendation> {
  const queryResult = await connectionDB.query(
    `UPDATE recommendations
    SET score = score + $1
    WHERE id = $2
    RETURNING *`,
    [vote, id]
  );
  const recommendation: Recommendation = queryResult.rows[0];

  if (recommendation.score < -5) {
    await connectionDB.query(
      `DELETE FROM genres_recommendations
      WHERE "recommendationId" = $1`,
      [id]
    );
    await connectionDB.query(
      `DELETE FROM recommendations
      WHERE id = $1`,
      [id]
    );
  }

  return recommendation;
}

export async function scoreGreaterThan(
  score: number
): Promise<QueryResult<Recommendation>> {
  return await connectionDB.query(
    `SELECT * FROM recommendations 
    WHERE score < $1`,
    [score]
  );
}

export async function scoreBetween(
  min: number,
  max: number
): Promise<QueryResult<Recommendation>> {
  return await connectionDB.query(
    `SELECT * FROM recommendations 
    WHERE score >= $1 AND score <= $2`,
    [min, max]
  );
}

export async function byRange(
  amount: number
): Promise<QueryResult<Recommendation>> {
  return await connectionDB.query(
    `SELECT * FROM recommendations 
    ORDER BY score DESC
    LIMIT $1`,
    [amount]
  );
}
