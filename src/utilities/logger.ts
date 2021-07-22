import winston from "winston";

const transports = [
  new winston.transports.File({ filename: "logs/error.log", level: "error" }),
  new winston.transports.File({ filename: "logs/warn.log", level: "warn" }),
  new winston.transports.File({ filename: "logs/info.log", level: "info" }),
];

const format = winston.format.combine(
  winston.format.errors({ stack: true }),
  winston.format.timestamp(),
  winston.format.json()
);

const logger = winston.createLogger({ transports, format });

const { NODE_ENV } = process.env;
if (NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.cli(),
    })
  );
}

export default logger;
