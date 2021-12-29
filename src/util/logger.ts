import winston, { createLogger, format, transports } from "winston";
import "winston-mongodb";
import path from "path";
const uri = process.env.MONGODB_URI;
const errorLogFile = path.resolve(__dirname, "error.log");
const infoLogFile = path.resolve(__dirname, "info.log");

const logger = createLogger({
    level: 'info',
    format: format.json(),
    transports: [   
        new transports.File({ filename: errorLogFile, level: 'error' }),
        new transports.MongoDB({
            level: 'error',
            db: `${uri}/logs`,
            collection: 'error_logs',
            options: {
                useUnifiedTopology: true
            }
        })
        // new transports.File({ filename: infoLogFile, level: 'info' })
      ]
});

if(process.env.NODE_ENV !== "production") {
    logger.add(new transports.Console({
        format: format.combine(
            format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
            format.align(),
            format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
        )
    }));
}

winston.add(logger);

export default logger;