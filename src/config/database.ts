import pg from "pg";

const {
  NODE_ENV,
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_PORT,
  DATABASE_URL,
} = process.env;

const { Pool } = pg;

export const connectionDB = new Pool(
  NODE_ENV === "development" || NODE_ENV === "test"
    ? {
        user: DB_USERNAME,
        host: DB_HOST,
        port: parseInt(DB_PORT || "5432"),
        database: DB_DATABASE,
        password: DB_PASSWORD,
      }
    : {
        connectionString: DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
);
