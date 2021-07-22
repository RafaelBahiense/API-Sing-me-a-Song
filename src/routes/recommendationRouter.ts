import { Router } from "express";

import * as recommendationController from "../controllers/recommendationController";

const RecommendationRouter = Router();

RecommendationRouter.post("/recommendations", recommendationController.post);

RecommendationRouter.post("/recommendations/:id/upvote", () => console.log(""));

RecommendationRouter.post("/recommendations/:id/downvote", () =>
  console.log("")
);

RecommendationRouter.get("/recommendations/random", () => console.log(""));

RecommendationRouter.get("/recommendations/top/:amount", () => console.log(""));

RecommendationRouter.get("/recommendations/genres/:id/random", () => console.log(""));

export default RecommendationRouter;
