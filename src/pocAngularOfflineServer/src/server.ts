import { HockeyPlayer } from './model/hockeyPlayer';
import express from "express";
import winston from "winston";
import cors from "cors";

// Create logger
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

// Get datetime of the start of the API
let lastModifiedDate: Date = new Date();
lastModifiedDate.setMilliseconds(0);

// Create the application
const app: express.Application = express();

// Remove all cache option
const nocache = require('nocache');
app.use(nocache());

// Enable cors so our web application can reach the server
app.use(cors())

// Remove etag
app.set('etag', false); // turn off

// Log request
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.info(`Request to ${req.path}`);
  logger.info(req.headers);
  next();
});

// Simple GET hockey player list
app.get(
  "/hockey-players",
  (req, res): void => {

    // Set this header for caching purpose
    res.setHeader("last-modified", lastModifiedDate.toUTCString());

    const ifLastModifiedSinceHeader = req.get('if-last-modified-since');
    console.log(ifLastModifiedSinceHeader);
    if (ifLastModifiedSinceHeader) {
      const ifLastModifiedDate: Date = new Date(Date.parse(ifLastModifiedSinceHeader));

      if (ifLastModifiedDate >= lastModifiedDate) {
        console.log('Latest version, return 304');
        res.sendStatus(304);
        return;
      }

    }
    console.log('Not in cache, return 200');

    // #1
    let hockeyPlayers: HockeyPlayer[] = [
      { id: "131", firstname: "Carey", lastname: "Price" },
      { id: "113", firstname: "Max", lastname: "Domi" },
      { id: "192", firstname: "Jonathan", lastname: "Drouin" },
      { id: "124", firstname: "Philippe", lastname: "Danault" },
    ]

    // #2
    /*
    let hockeyPlayers: HockeyPlayer[] = [
      { id: "130", firstname: "Antti", lastname: "Niemi" },
      { id: "111", firstname: "Brendan", lastname: "Gallagher" },
      { id: "127", firstname: "Karl", lastname: "Alzner" },
      { id: "126", firstname: "Jeff", lastname: "Pretry" },
    ]
    */

    res.json(hockeyPlayers);

  }
);

// The port the express app will listen on
const port: number = 8080;
app.listen(port, () => {
  // Success callback
  logger.info(`Listening at http://localhost:${port}/`);
});
