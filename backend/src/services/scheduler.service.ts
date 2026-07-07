import { config } from "../config/index.js";
import { weatherService } from "./weather.service.js";

export class SchedulerService {
  start() {
    setInterval(() => {
      weatherService.refreshAll().catch((error) => {
        console.error("Scheduled weather refresh failed:", error);
      });
    }, config.weatherUpdateIntervalSeconds * 1000);
  }
}

export const schedulerService = new SchedulerService();
