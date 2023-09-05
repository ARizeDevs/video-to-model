import { Module } from '@nestjs/common';
import { LumaApiKeysService } from './luma-api-keys.service';
import { LumaApiKeysController } from './luma-api-keys.controller';
import { DatabaseModule } from 'src/database/database.module';
import { LumaAiModule } from 'src/luma-ai/luma-ai.module';

@Module({
  imports: [DatabaseModule, LumaAiModule],
  providers: [LumaApiKeysService],
  controllers: [LumaApiKeysController],
  exports: [LumaApiKeysService],
})
export class LumaApiKeysModule {}
