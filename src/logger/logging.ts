import winston from 'winston';
 
export const log = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'doctor-service' },
  transports: [
    //
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});