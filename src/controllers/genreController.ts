import { NextFunction, Request, Response } from "express";

import * as genreService from "../services/genreService";

export async function post(req: Request, res: Response, next: NextFunction) {
  try {
    const { name }: { name: string } = req.body;
    if (!name) return res.sendStatus(400);

    const sucess = await genreService.post(name);
    if (sucess) res.status(201).send({ name });
    else res.sendStatus(409);
    
  } catch (e) {
    next(e);
  }
}

export async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const genres = await genreService.getAll();
    res.status(200).send(genres.rows);

  } catch (e) {
    next(e);
  }
}

export async function getRecommendations(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params["id"]);
    if (isNaN(id)) return res.sendStatus(400);

    const recommendationsList = await genreService.getAllById(id);
    if (!recommendationsList) res.sendStatus(404);
    else res.status(200).send(recommendationsList);

  } catch (e) {
    next(e);
  }
}
