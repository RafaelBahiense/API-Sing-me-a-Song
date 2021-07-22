import express, { Application } from "express";
import cors from "cors";

import MainRouter from "./routes/mainRouter";
import errorHandler from "./utilities/errorHandler";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/", MainRouter);

app.use(errorHandler);

export default app;
