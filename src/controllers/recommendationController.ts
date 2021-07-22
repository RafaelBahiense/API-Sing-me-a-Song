import { NextFunction, Request, Response } from "express";

import * as recommendationService from "../services/recommendationService";

export async function post(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      name,
      youtubeLink,
      genresIds,
    }: { name: string; youtubeLink: string; genresIds: number[] } = req.body;
    if (!(name && youtubeLink && genresIds)) return res.sendStatus(400);

    const sucess = await recommendationService.post(
      name,
      youtubeLink,
      genresIds
    );
    if (sucess) res.sendStatus(201);
    else if (sucess == null) res.sendStatus(404);
    else res.sendStatus(409);
  } catch (e) {
    next(e);
  }
}

export async function vote(req: Request, res: Response, next: NextFunction, vote: number) {
  try {
    const id = parseInt(req.params["id"]);
    if (isNaN(id)) return res.sendStatus(400);

    const sucess = await recommendationService.vote(id, vote);
    if (sucess) res.status(200).send(sucess);
    else res.sendStatus(404);
  } catch (e) {
    next(e);
  }
}
