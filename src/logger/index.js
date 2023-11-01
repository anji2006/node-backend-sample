import { createLogger, transports, format } from "winston";

// Define custom log format
const logFormat = format.combine(
  format.timestamp(),
  format.printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
  })
);

const logger = createLogger({
  level: "info", // Minimum log level to be captured
  format: logFormat,
  transports: [
    new transports.Console(), // Log to the console
    new transports.File({ filename: "error.log", level: "error" }), // Log errors to a file
    new transports.File({ filename: "combined.log" }), // Log all levels to a combined file
  ],
});

export default logger;
