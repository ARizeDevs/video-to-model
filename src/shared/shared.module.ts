import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { LumaApiKeysModule } from 'src/luma-api-keys/luma-api-keys.module';
import { LumaAiModule } from 'src/luma-ai/luma-ai.module';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [LumaAiModule, LumaApiKeysModule, CoreModule],
  providers: [SharedService],
  exports: [SharedService],
})
export class SharedModule {}
