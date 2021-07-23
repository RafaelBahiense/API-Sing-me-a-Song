import supertest from "supertest";

import "../../src/config/env";
import app from "../../src/app";
import { truncateTable, endConnection } from "../helpers/database";
import * as genresFactory from "../factories/genres";


beforeAll(async () => {
  await truncateTable("genres");
});

afterAll(async () => {
  await truncateTable("genres");
  endConnection();
});

const agent = supertest(app);

const genres = [
  new genresFactory.Genre,
  new genresFactory.Genre,
  new genresFactory.Genre,
]

describe("POST /genres", () => {
  const route = "/genres";

  it("returns status 400 for no body", async () => {
    const result = await agent
      .post(route)
      .send({});
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for empty name", async () => {
    const result = await agent
      .post(route)
      .send({ name: "" });
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for null name", async () => {
    const result = await agent
      .post(route)
      .send({ name: null });
    expect(result.status).toEqual(400);
  });

});

describe("GET /genres", () => {
  const route = "/genres";

  it("returns status 200 with the following response", async () => {
    await truncateTable("genres")
    await Promise.all(genres.map(async (genre) => await genresFactory.add(genre.name)));

    const result = await agent
      .get(route);
    expect(result.body).toEqual(genres);
  });

});

describe("GET /genres:id", () => {
  const route = "/genres/2";

  it("returns status 200", async () => {
    await truncateTable("genres")
    await Promise.all(genres.map(async (genre) => await genresFactory.add(genre.name)));

    const result = await agent
      .get(route);
    expect(result.status).toEqual(200);
  });

});