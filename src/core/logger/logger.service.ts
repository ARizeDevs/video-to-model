import { LoggingWinston as GoogleCloudWinstonLogging } from '@google-cloud/logging-winston';
import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class LoggerService implements NestLoggerService {
  logger: winston.Logger = null;

  constructor() {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const isStaging = process.env.NODE_ENV === 'staging';
    const isProduction = process.env.NODE_ENV === 'production';

    this.logger = winston.createLogger({
      level: 'error',
      format: winston.format.json(),
      transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
      ],
    });

    if (isStaging || isProduction) {
      this.logger.add(new GoogleCloudWinstonLogging());
    }

    if (isDevelopment) {
      this.logger.add(
        new winston.transports.Console({
          level: 'debug',
          format: winston.format.combine(
            winston.format.colorize({
              all: true,
              colors: {
                info: 'green', // fontStyle color
                warn: 'italic yellow',
                error: 'bold red',
                debug: 'inverse white',
                verbose: 'bold blue',
              },
            }),
            winston.format.label({ label: '[LOGGER]' }),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:MM:SS' }),
            winston.format.printf(
              (info) =>
                `${info.label} |${info.timestamp}| ${info.level} : ${info.message}`,
            ),
          ),
        }),
      );
    }
  }

  log(message: any) {
    this.logger.info(message);
  }

  error(message: any, ...optionalParams: any[]) {
    this.logger.error(message);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.logger.warn(message);
  }

  debug?(message: any, ...optionalParams: any[]) {
    this.logger.debug(message);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    this.logger.verbose(message);
  }
}
