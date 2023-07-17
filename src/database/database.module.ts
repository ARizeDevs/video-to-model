import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from './typeorm/typeorm-ex.module';
import { repositories } from './repositories';
import { DemandEntity } from './entities/demand.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => {
        return {
          type: 'postgres',
          host: process.env.DB_HOST,
          port: +process.env.DB_PORT,
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          synchronize: true,
          logging: false,
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmExModule.forCustomRepository([...repositories]),
    TypeOrmModule.forFeature([DemandEntity]),
  ],
  providers: [...repositories],
  exports: [...repositories],
})
export class DatabaseModule {}
