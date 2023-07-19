import { Module } from '@nestjs/common';
import { LumaAiService } from './luma-ai.service';
import { AppConfigModule } from 'src/app-config/app-config.module';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [AppConfigModule, CoreModule],
  providers: [LumaAiService],
  exports: [LumaAiService],
})
export class LumaAiModule {}
