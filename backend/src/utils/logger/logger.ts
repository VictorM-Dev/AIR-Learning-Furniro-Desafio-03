import { createLogger, format, transports } from 'winston'

const { combine, timestamp, printf, colorize } = format

const logFormat = printf((info) => {
    return `${info['timestamp']} [${info.level}]: ${info.message}`
})

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        colorize(),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'src/utils/logger/logs_registers/info.log', level: 'info' }),
        new transports.File({ filename: 'src/utils/logger/logs_registers/error.log', level: 'error' }),
        new transports.File({ filename: 'src/utils/logger/logs_registers/warn.log', level: 'warn' })
    ],
    exceptionHandlers: [
        new transports.File({ filename: 'src/utils/logger/logs_registers/exceptions.log' })
    ]
})

export default logger
