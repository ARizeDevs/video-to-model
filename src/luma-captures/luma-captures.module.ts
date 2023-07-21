import { Module } from '@nestjs/common';
import { LumaCapturesService } from './luma-captures.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [LumaCapturesService],
  exports: [LumaCapturesService],
})
export class LumaCapturesModule {}
