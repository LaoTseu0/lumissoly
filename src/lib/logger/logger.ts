// utils/logger.ts

type LogLevel = "ERROR" | "WARN" | "INFO" | "DEBUG";

interface LogLevels {
  [key: string]: number;
}

const LOG_LEVELS: LogLevels = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
};

let currentLogLevel: number =
  process.env.NODE_ENV === "production" ? LOG_LEVELS.INFO : LOG_LEVELS.DEBUG;

interface LogMeta {
  [key: string]: any;
}

function formatMessage(
  level: LogLevel,
  message: string,
  meta: LogMeta = {}
): string {
  const timestamp = new Date().toISOString();

  return JSON.stringify([timestamp, level, message, meta]);
}

function formatError(error: unknown): LogMeta {
  if (error instanceof Error) {
    return {
      message: error.message,
      name: error.name,
    };
  }
  return { error };
}

function log(level: LogLevel, message: string, meta: LogMeta = {}): void {
  if (LOG_LEVELS[level] <= currentLogLevel) {
    const formattedMessage = formatMessage(level, message, meta);
    console.log(formattedMessage);
  }
}

interface Logger {
  error(message: string, error?: unknown, meta?: LogMeta): void;
  warn(message: string, meta?: LogMeta): void;
  info(message: string, meta?: LogMeta): void;
  debug(message: string, meta?: LogMeta): void;
  setLogLevel(level: LogLevel): void;
  getLogLevel(): LogLevel;
}

const logger: Logger = {
  error: (message: string, error?: unknown, meta: LogMeta = {}) => {
    const errorInfo = error ? formatError(error) : {};
    log("ERROR", message, { ...errorInfo, ...meta });
  },
  warn: (message: string, meta: LogMeta = {}) => log("WARN", message, meta),
  info: (message: string, meta: LogMeta = {}) => log("INFO", message, meta),
  debug: (message: string, meta: LogMeta = {}) => log("DEBUG", message, meta),

  setLogLevel: (level: LogLevel) => {
    if (level in LOG_LEVELS) {
      currentLogLevel = LOG_LEVELS[level];
      logger.info(`Log level set to ${level}`);
    } else {
      console.error(`Invalid log level: ${level}`);
    }
  },

  getLogLevel: (): LogLevel => {
    return Object.keys(LOG_LEVELS).find(
      (key) => LOG_LEVELS[key] === currentLogLevel
    ) as LogLevel;
  },
};

export default logger;
