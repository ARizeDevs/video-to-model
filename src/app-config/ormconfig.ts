import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { join } from 'path';

dotenv.config();

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
}: {
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
} = process.env as any;

const databaseConfigurations = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  dropSchema: false,
  // Run migrations automatically,
  migrationsRun: true,
  logging: ['warn', 'error'],
  logger: process.env.NODE_ENV !== 'development' ? 'file' : 'debug',
  entities: ['dist/**/*.entity{.ts,.js}'],
  // entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: ['src/database/migrations/*{.ts,.js}'],
});

export default databaseConfigurations;
