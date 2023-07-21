import { Module } from '@nestjs/common';
import { SlackUtilsService } from './slack-utils.service';
import { HttpModule } from '@nestjs/axios';
import { AppConfigModule } from 'src/app-config/app-config.module';

@Module({
  imports: [HttpModule, AppConfigModule],
  providers: [SlackUtilsService],
  exports: [SlackUtilsService],
})
export class SlackUtilsModule {}
