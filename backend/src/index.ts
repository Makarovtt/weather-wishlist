import { app } from "./app.js";
import { config } from "./config/index.js";
import { prisma } from "./lib/prisma.js";
import { schedulerService } from "./services/scheduler.service.js";
import { weatherService } from "./services/weather.service.js";

async function bootstrap() {
  await prisma.$connect();
  await weatherService.refreshAll();
  schedulerService.start();

  app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
  });
}

bootstrap().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
