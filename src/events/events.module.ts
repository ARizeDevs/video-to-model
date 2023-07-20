import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import Handlers from './handlers';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [CoreModule],
  providers: [EventsService, ...Handlers],
})
export class EventsModule {}
