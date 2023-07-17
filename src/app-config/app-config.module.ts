import { Module } from '@nestjs/common';
import { AppConfigService } from './app-config.service';

@Module({
  providers: [AppConfigService],
})
export class AppConfigModule {}
