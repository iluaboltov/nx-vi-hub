import { createLogger, format, transports } from "winston";

const { colorize, combine, printf, timestamp } = format;

// Custom format for logs
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(colorize(), timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
  level: "info",
  transports: [new transports.Console(), new transports.File({ filename: "app.log" })],
});

export default logger;
