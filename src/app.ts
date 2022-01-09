import express, { Application } from "express";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import winston from 'winston';
import routes from "./routes"
import connect from "./db/connect"
import log from "./logger";
import { createServer } from "http";
import {log as logger} from "./logger/logging";

dotenv.config();

const app: Application = express();

const port = process.env.PORT || 8080;

app.set("port", port);
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));

const httpServer = createServer(app);

httpServer.listen(port, () => {
    log.info(`Listening on port ${port}...`);
    connect();
    routes(app);
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }
);