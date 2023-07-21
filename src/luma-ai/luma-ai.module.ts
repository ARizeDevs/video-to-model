import { Module } from '@nestjs/common';
import { LumaAiService } from './luma-ai.service';
import { AppConfigModule } from 'src/app-config/app-config.module';
import { CoreModule } from 'src/core/core.module';
import { SlackUtilsModule } from 'src/slack-utils/slack-utils.module';

@Module({
  imports: [AppConfigModule, CoreModule, SlackUtilsModule],
  providers: [LumaAiService],
  exports: [LumaAiService],
})
export class LumaAiModule {}
