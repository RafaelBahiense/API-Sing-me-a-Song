import { Router } from "express";

import * as genreController from "../controllers/genreController";

const GenreRouter = Router();

GenreRouter.post("/genres", genreController.post);

GenreRouter.get("/genres", genreController.get);

GenreRouter.get("/genres/:id", genreController.getRecommendations);

export default GenreRouter;
