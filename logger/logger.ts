import winston, { createLogger, format, transports } from "winston";

export const logger = createLogger({
    transports:
        new winston.transports.File({
            filename: 'logs/error.log',
            format: format.combine(
                format.timestamp({format: 'MM-DD-YYYY HH:mm:ss'}),
                format.align(),
                format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
            )
        })
})