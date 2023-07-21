import { Module } from '@nestjs/common';
import { LumaApiKeysService } from './luma-api-keys.service';
import { LumaApiKeysController } from './luma-api-keys.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [LumaApiKeysService],
  controllers: [LumaApiKeysController],
})
export class LumaApiKeysModule {}
