import { Router } from "express";

import GenreRouter from "./genreRouter";
import RecommendationRouter from "./recommendationRouter";

const MainRouter = Router();

MainRouter.use("/", GenreRouter);

MainRouter.use("/", RecommendationRouter);

export default MainRouter;
