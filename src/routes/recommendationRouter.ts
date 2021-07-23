import { Router } from "express";

import * as recommendationController from "../controllers/recommendationController";

const RecommendationRouter = Router();

RecommendationRouter.post("/recommendations", recommendationController.post);

RecommendationRouter.post("/recommendations/:id/upvote", (req, res, next) =>
  recommendationController.vote(req, res, next, 1)
);

RecommendationRouter.post("/recommendations/:id/downvote", (req, res, next) =>
  recommendationController.vote(req, res, next, -1)
);

RecommendationRouter.get("/recommendations/random", recommendationController.getRecommendationsRandom);

RecommendationRouter.get("/recommendations/top/:amount", recommendationController.getRecommendationsAmount);

RecommendationRouter.get("/recommendations/genres/:id/random", () =>
  console.log("")
);

export default RecommendationRouter;
