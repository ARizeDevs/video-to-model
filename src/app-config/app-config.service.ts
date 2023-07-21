import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import configurations from './configurations';
import { IAppConfig } from './interfaces/app.config.interface';
import { ILumaConfig } from './interfaces/luma.config.interface';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ISlackConfig } from './interfaces/slack.config.interface';

@Injectable()
export class AppConfigService {
  constructor(protected readonly configService: ConfigService) {}

  private _configuration = configurations();

  get app(): IAppConfig {
    return this._configuration.app;
  }

  get luma(): ILumaConfig {
    return this._configuration.luma;
  }

  get db(): PostgresConnectionOptions {
    return this._configuration.database;
  }

  get slack(): ISlackConfig {
    return this._configuration.slack;
  }
}
