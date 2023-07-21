import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import Handlers from './handlers';
import { CoreModule } from 'src/core/core.module';
import { SlackUtilsModule } from 'src/slack-utils/slack-utils.module';
import { LumaAiModule } from 'src/luma-ai/luma-ai.module';

@Module({
  imports: [CoreModule, SlackUtilsModule, LumaAiModule],
  providers: [EventsService, ...Handlers],
})
export class EventsModule {}
