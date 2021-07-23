import supertest from "supertest";

import "../../src/config/env";
import app from "../../src/app";
import { truncateTable, endConnection } from "../helpers/database";
import * as recommendationFactory from "../factories/recommendations";

beforeAll(async () => {
  await truncateTable("recommendations");
});

afterAll(async () => {
  await truncateTable("recommendations");
  endConnection();
});

const agent = supertest(app);

describe("POST /recommendations", () => {
  const route = "/recommendations";

  it("returns status 400 for no body", async () => {
    const result = await agent.post(route).send({});
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for empty name", async () => {
    const result = await agent
      .post(route)
      .send(new recommendationFactory.Recommendation(""));
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for null name", async () => {
    const result = await agent
      .post(route)
      .send(new recommendationFactory.Recommendation(null));
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for empty youtubeLink", async () => {
    const result = await agent
      .post(route)
      .send(new recommendationFactory.Recommendation("test", ""));
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for null youtubeLink", async () => {
    const result = await agent
      .post(route)
      .send(new recommendationFactory.Recommendation("test", null));
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for empty genres", async () => {
    const result = await agent
      .post(route)
      .send(
        new recommendationFactory.Recommendation(
          "test",
          "https://www.youtube.com/watch?v=_Ua-d9OeUOg",
          []
        )
      );
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for null genres", async () => {
    const result = await agent
      .post(route)
      .send(
        new recommendationFactory.Recommendation(
          "test",
          "https://www.youtube.com/watch?v=_Ua-d9OeUOg",
          null
        )
      );
    expect(result.status).toEqual(400);
  });
});

describe("POST /recommendations/:id/upvote", () => {
  const route = "/recommendations/1/upvote";

  it("returns status 404 for not existent", async () => {
    await truncateTable("recommendations");

    const result = await agent.post(route);
    expect(result.status).toEqual(404);
  });

  it("returns status 200 for valid params", async () => {
    await truncateTable("recommendations");
    const recommendation = new recommendationFactory.Recommendation();
    await recommendationFactory.add(
      recommendation.name as string,
      recommendation.youtubeLink as string
    );

    const result = await agent.post(route);
    expect(result.status).toEqual(200);
  });
});

describe("POST /recommendations/:id/downvote", () => {
  const route = "/recommendations/1/downvote";

  it("returns status 404 for not existent", async () => {
    await truncateTable("recommendations");

    const result = await agent.post(route);
    expect(result.status).toEqual(404);
  });

  it("returns status 200 for valid params", async () => {
    await truncateTable("recommendations");
    const recommendation = new recommendationFactory.Recommendation();
    await recommendationFactory.add(
      recommendation.name as string,
      recommendation.youtubeLink as string
    );

    const result = await agent.post(route);
    expect(result.status).toEqual(200);
  });
});

describe("GET /recommendations/random", () => {
  const route = "/recommendations/random";

  it("returns status 200", async () => {
    await truncateTable("recommendations");
    const recommendation = new recommendationFactory.Recommendation();
    await recommendationFactory.add(
      recommendation.name as string,
      recommendation.youtubeLink as string
    );

    const result = await agent.get(route);
    expect(result.status).toEqual(200);
  });
});

describe("GET /recommendations/top/:amount", () => {
  const route = "/recommendations/top/1";

  it("returns status 200", async () => {
    await truncateTable("recommendations");
    const recommendation = new recommendationFactory.Recommendation();
    await recommendationFactory.add(
      recommendation.name as string,
      recommendation.youtubeLink as string
    );

    const result = await agent.get(route);
    expect(result.status).toEqual(200);
  });
});
