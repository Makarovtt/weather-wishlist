import { Router } from "express";
import { weatherController } from "../controllers/weather.controller.js";

export const weatherRouter = Router();

weatherRouter.get("/city/:cityId", async (req, res, next) => {
  try {
    const snapshot = await weatherController.getLatestForCity(Number(req.params.cityId));
    res.json(snapshot);
  } catch (error) {
    next(error);
  }
});

weatherRouter.post("/city/:cityId/refresh", async (req, res, next) => {
  try {
    const snapshot = await weatherController.refreshCity(Number(req.params.cityId));
    res.json(snapshot);
  } catch (error) {
    next(error);
  }
});

