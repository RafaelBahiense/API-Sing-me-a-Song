import { Router } from "express";

const RecommendationRouter = Router();

RecommendationRouter.post("/recommendations", () => console.log(""));

RecommendationRouter.post("/recommendations/:id/upvote", () => console.log(""));

RecommendationRouter.post("/recommendations/:id/downvote", () =>
  console.log("")
);

RecommendationRouter.get("/recommendations/random", () => console.log(""));

RecommendationRouter.get("/recommendations/top/:amount", () => console.log(""));

export default RecommendationRouter;
