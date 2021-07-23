import faker from "faker";

import connectionDB from "../../src/config/database";

export class Genre {
    private static _id: number = 0;
    public id: number;
    public name: string;
    constructor(name: string = faker.name.findName()) {
        this.id = ++Genre._id;
        this.name = name;
    }
}

export async function add(name: string): Promise<void> {
  await connectionDB.query(
    `INSERT INTO genres (name) 
      VALUES ($1)`,
    [name]
  );
}
