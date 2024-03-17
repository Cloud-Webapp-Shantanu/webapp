const winston = require("winston");
const { createLogger, transports, format } = require("winston");

const customFormat = format.printf(({ timestamp, level, message }) => {
  return `(${timestamp}) - [${level.toUpperCase()}] - "${message}"`;
});

const {LoggingWinston} = require('@google-cloud/logging-winston');
const loggingWinston = new LoggingWinston();

const logger = winston.createLogger({
    level: "info",
    format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        customFormat
    ),
    defaultMeta: {
      service: "webapp",
    },
    transports: [
        new transports.File({ filename: "./logs/audit.log", level: "error" }),
        new transports.File({ filename: "./logs/webapp.log" }),
        loggingWinston,
    ],
});

module.exports = { logger, winston };
