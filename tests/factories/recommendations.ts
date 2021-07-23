import faker from "faker";

import connectionDB from "../../src/config/database";

export class Recommendation {
  private static _id: number = 1;
  public id: number;
  public name: string | null;
  public youtubeLink: string | null;
  public genres: number[] | null;

  constructor(
    name: string | null = faker.name.findName(),
    youtubeLink: string | null = "https://www.youtube.com/watch?v=_Ua-d9OeUOg",
    genres: number[] | null = [Math.floor(Math.random() * 3)]
  ) {
    this.id = Recommendation._id++;
    this.name = name;
    this.youtubeLink = youtubeLink
      ? youtubeLink + Recommendation._id
      : youtubeLink;
    this.genres = genres;
  }
}

export async function add(name: string, youtubeLink: string): Promise<void> {
  await connectionDB.query(
    `INSERT INTO recommendations (name, "youtubeLink") 
      VALUES ($1, $2)`,
    [name, youtubeLink]
  );
}
