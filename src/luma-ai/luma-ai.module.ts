import { Module } from '@nestjs/common';
import { LumaAiService } from './luma-ai.service';

@Module({
  providers: [LumaAiService]
})
export class LumaAiModule {}
