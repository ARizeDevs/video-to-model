import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from './typeorm/typeorm-ex.module';
import { repositories } from './repositories';
import { DemandEntity } from './entities/demand.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigService } from 'src/app-config/app-config.service';
import { AppConfigModule } from 'src/app-config/app-config.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: (appConfigService: AppConfigService) => {
        const { type, host, port, database, username, password } =
          appConfigService.db;

        return {
          type: 'postgres',
          host: host || 'localhost',
          port: +port,
          username: username || '',
          password: password,
          database: database,
          synchronize: true,
          logging: false,
          autoLoadEntities: true,
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        };
      },
      inject: [AppConfigService],
    }),
    TypeOrmModule.forFeature([DemandEntity]),
    TypeOrmExModule.forCustomRepository([...repositories]),
  ],
})
export class DatabaseModule {}
