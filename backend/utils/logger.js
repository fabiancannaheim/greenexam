require('dotenv').config()

const winston = require('winston')
const path = require('path')

const logLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
    trace: 4,
    sys: 5
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'blue',
    trace: 'magenta',
    sys: 'tile'
  }
}

const customFormat = winston.format.printf(({ timestamp, level, message, ...metadata }) => {
  let msg = `${timestamp} [${level.toUpperCase()}]: ${message}`
  if (Object.keys(metadata).length) {
    msg += JSON.stringify(metadata)
  }
  return msg
});

const logger = winston.createLogger({
  levels: logLevels.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    customFormat
  ),
  transports: [
    new winston.transports.File({ 
      filename: path.join(__dirname, '../logs/error.log'), 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: path.join(__dirname, '../logs/warn.log'), 
      level: 'warn' 
    }),
    new winston.transports.File({ 
      filename: path.join(__dirname, '../logs/info.log'), 
      level: 'info' 
    }),
    new winston.transports.File({ 
      filename: path.join(__dirname, '../logs/debug.log'), 
      level: 'debug' 
    }),
    new winston.transports.File({ 
      filename: path.join(__dirname, '../logs/trace.log'),
      level: 'trace' 
    }),
    new winston.transports.File({ 
      filename: path.join(__dirname, '../logs/sys.log'),
      level: 'sys' 
    }),
    new winston.transports.File({ 
      filename: path.join(__dirname, '../logs/combined.log') 
    })
  ]
})

// If we're not in production, log to the console as well
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }))
}

winston.addColors(logLevels.colors)

module.exports = logger
