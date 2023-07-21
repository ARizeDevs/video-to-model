import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { CoreModule } from 'src/core/core.module';
import { DemandsModule } from 'src/demands/demands.module';
import { LumaAiModule } from 'src/luma-ai/luma-ai.module';
import { LumaApiKeysModule } from 'src/luma-api-keys/luma-api-keys.module';
import { LumaCapturesModule } from 'src/luma-captures/luma-captures.module';
import { SharedModule } from 'src/shared/shared.module';
import { SlackUtilsModule } from 'src/slack-utils/slack-utils.module';

@Module({
  imports: [
    CoreModule,
    SlackUtilsModule,
    LumaAiModule,
    LumaApiKeysModule,
    DemandsModule,
    LumaCapturesModule,
    SharedModule,
  ],
  providers: [SchedulerService],
})
export class SchedulerModule {}
