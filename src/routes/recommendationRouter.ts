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

RecommendationRouter.get("/recommendations/random", () => console.log(""));

RecommendationRouter.get("/recommendations/top/:amount", () => console.log(""));

RecommendationRouter.get("/recommendations/genres/:id/random", () =>
  console.log("")
);

export default RecommendationRouter;
