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

    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,

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
      host: DATABASE_HOST,
      port: DATABASE_PORT ? parseInt(DATABASE_PORT, 10) : undefined,
      database: DATABASE_NAME,
      username: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
    },
    luma: {
      host: LUMA_HOST,
      apiKey: LUMA_API_KEY,
    },
  };

  return configurations;
};

export default configurations;
