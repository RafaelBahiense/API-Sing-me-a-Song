import { QueryResult } from "pg";

import connectionDB from "../config/database";

type Genre = {
  id: number;
  name: string;
};

export async function getById(id: number): Promise<Genre> {
  const queryResult = await connectionDB.query(`SELECT * FROM genres WHERE id = $1`, [id]);
  return queryResult.rows[0];
}

export async function getAll(): Promise<QueryResult<Genre>> {
  return await connectionDB.query(`SELECT * FROM genres`);
}

export async function getByName(name: string): Promise<QueryResult<Genre>> {
  return await connectionDB.query(
    `SELECT * FROM genres 
    WHERE name = $1`,
    [name]
  );
}

export async function post(name: string): Promise<void> {
  await connectionDB.query(
    `INSERT INTO genres (name) 
    VALUES ($1)`,
    [name]
  );
}

export async function getFromRecommendations(id: number): Promise<Genre[]> {
  const queryResult = await connectionDB.query(
    `SELECT genres.* FROM genres
    JOIN genres_recommendations
    ON genres_recommendations."genreId" = genres.id
    WHERE genres_recommendations."recommendationId" = $1`,
    [id]
  );
  return queryResult.rows;
}