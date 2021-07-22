import { Router } from "express";

const GenreRouter = Router();

GenreRouter.post("/genres", () => console.log(""));

GenreRouter.get("/genres", () => console.log(""));

GenreRouter.get("/genres/:id", () => console.log(""));

export default GenreRouter;
