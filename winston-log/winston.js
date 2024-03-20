const winston = require("winston");
const { transports, format } = require("winston");

const useFormat = format.printf(({ timestamp, level, message }) => {
  let severity = 'DEFAULT';
  if (level === 'error' || level === 'critical') {
    severity = 'ERROR';
  } else if (level === 'warn') {
    severity = 'WARNING';
  } else if (level === 'info') {
    severity = 'INFO';
  } else if (level === 'verbose' || level === 'debug') {
    severity = 'DEBUG';
  }

  const logEntry = {
    timestamp,
    severity,
    message,
  };

  return JSON.stringify(logEntry);
});

const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    useFormat,
  ),
  transports: [
    process.env.ENV === 'dev' ? new transports.File({ filename: "./logs/webapp.log" }) : new transports.File({ filename: "/var/log/webapp/webapp.log" }),
  ],
});

module.exports = { logger, winston };