import { HockeyPlayer } from './model/hockeyPlayer';
import express from "express";
import winston from "winston";
import cors from "cors";

const logger = winston.createLogger({
  format: winston.format.json(),
  level: "info",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error"
    }),
    new winston.transports.File({ filename: "logs/combined.log" })
  ]
});

// Create the application
const app: express.Application = express();

// Enable cors so our web application can reach the server
app.use(cors())

// Log request
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.info(`Request done to ${req.path}`);
  next();
});

// Simple GET hockey player list
app.get(
  "/hockey-players",
  (req, res): void => {

    let hockeyPlayers: HockeyPlayer[] = [
      { id: "131", firstname: "Carey", lastname: "Price" },
      { id: "113", firstname: "Max", lastname: "Domi" },
      { id: "192", firstname: "Jonathan", lastname: "Drouin" },
      { id: "124", firstname: "Philippe", lastname: "Danault" },
    ]

    res.send(hockeyPlayers);
  }
);

// The port the express app will listen on
const port: number = 8080;
logger.debug("Hello");
app.listen(port, () => {
  // Success callback
  logger.info(`Listening at http://localhost:${port}/`);
});
