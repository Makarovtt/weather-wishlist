import cors from "cors";
import express, { json } from "express";
import { config } from "./config/index.js";
import { ApiError } from "./lib/errors.js";
import { citiesRouter } from "./routes/cities.routes.js";
import { weatherRouter } from "./routes/weather.routes.js";

export const app = express();

app.use(cors({ origin: config.corsOrigin }));
app.use(json());

app.use("/api/cities", citiesRouter);
app.use("/api/weather", weatherRouter);

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err);
    const status = err instanceof ApiError ? err.status : 500;
    res.status(status).json({ error: err.message || "Internal server error" });
  }
);
