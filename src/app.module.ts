import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LumaAiModule } from './luma-ai/luma-ai.module';
import { DatabaseModule } from './database/database.module';
import { DemandsModule } from './demands/demands.module';
import { AppConfigModule } from './app-config/app-config.module';
import { config } from 'dotenv';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configurations from './app-config/configurations';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { EventsModule } from './events/events.module';
import { CoreModule } from './core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from './database/typeorm/typeorm-ex.module';
import { repositories } from './database/repositories';
import { AppConfigService } from './app-config/app-config.service';
import { LumaApiKeysModule } from './luma-api-keys/luma-api-keys.module';

config();
@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
      envFilePath: ['.env'],
    }),
    LumaAiModule,
    DatabaseModule,
    DemandsModule,
    AppConfigModule,
    EventsModule,
    CoreModule,
    LumaApiKeysModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
