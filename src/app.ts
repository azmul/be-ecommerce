import express, { Application } from "express";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import winston from "winston";
import routes from "./routes";
import connect from "./db/connect";
import rateLimit from "express-rate-limit";
import log from "./logger";
import { createServer } from "http";
import { log as logger } from "./logger/logging";

dotenv.config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000 // limit each IP to 1000 requests per windowMs
});

const app: Application = express();

const port = process.env.PORT || 8080;

app.set("port", port);
app.use(cors());
app.use(compression());
app.use(limiter);
app.use(helmet());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

const httpServer = createServer(app);

httpServer.listen(port, () => {
  log.info(`Listening on port ${port}...`);
  connect();
  routes(app);
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
});
