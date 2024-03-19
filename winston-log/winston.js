const winston = require("winston");
const { transports, format } = require("winston");

const customFormat = format.printf(({ timestamp, level, message }) => {
  return `(${timestamp}) - [${level.toUpperCase()}] - "${message}"`;
});

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
      new winston.transports.Console(),
      // process.env.ENV === 'dev' ? new transports.File({ filename: "./logs/audit.log", level: "error" }) : new transports.File({ filename: "./var/log/audit.log", level: "error" }),
      process.env.ENV === 'dev' ? new transports.File({ filename: "./logs/webapp.log" }) : new transports.File({ filename: "/var/log/webapp/webapp.log" }),
    ],
});

module.exports = { logger, winston };