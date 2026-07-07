import { Router } from "express";
import { z } from "zod";
import { citiesController } from "../controllers/cities.controller.js";
import { ApiError } from "../lib/errors.js";

const createSchema = z.object({
  name: z.string().min(1),
});

const searchSchema = z.object({
  q: z.string().min(1),
});

export const citiesRouter = Router();

citiesRouter.get("/", async (_req, res, next) => {
  try {
    const cities = await citiesController.list();
    res.json(cities);
  } catch (error) {
    next(error);
  }
});

citiesRouter.get("/search", async (req, res, next) => {
  try {
    const parsed = searchSchema.safeParse(req.query);

    if (!parsed.success) {
      throw new ApiError(400, "Параметр q обязателен");
    }

    const results = await citiesController.search(parsed.data.q);
    res.json(results);
  } catch (error) {
    next(error);
  }
});

citiesRouter.post("/", async (req, res, next) => {
  try {
    const parsed = createSchema.safeParse(req.body);

    if (!parsed.success) {
      throw new ApiError(400, "Название города обязательно");
    }

    const city = await citiesController.create(parsed.data.name);
    res.status(201).json(city);
  } catch (error) {
    next(error);
  }
});

citiesRouter.delete("/:id", async (req, res, next) => {
  try {
    await citiesController.remove(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});
