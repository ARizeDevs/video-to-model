import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { IAppConfig } from './interfaces/app.config.interface';
import { ILumaConfig } from './interfaces/luma.config.interface';

export interface Configurations {
  app: IAppConfig;
  database: PostgresConnectionOptions;
  luma: ILumaConfig;
}

const configurations: () => Configurations = () => {
  const {
    PORT = 3000,
    NODE_ENV = 'development',
    EXPOSE_ALL = false,

    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,

    LUMA_HOST = 'https://webapp.engineeringlumalabs.com',
    LUMA_API_KEY,
  } = process.env as any;

  const configurations: Configurations = {
    app: {
      port: +PORT,
      environment: NODE_ENV,
      exposeAll: EXPOSE_ALL === 'true',
    },
    database: {
      type: 'postgres',
      host: DB_HOST,
      port: DB_PORT ? parseInt(DB_PORT, 10) : undefined,
      database: DB_NAME,
      username: DB_USERNAME,
      password: DB_PASSWORD,
    },
    luma: {
      host: LUMA_HOST,
      apiKey: LUMA_API_KEY,
    },
  };

  return configurations;
};

export default configurations;
