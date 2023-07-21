import { Module } from '@nestjs/common';
import { DemandsController } from './demands.controller';
import { DemandsService } from './demands.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DemandsController],
  providers: [DemandsService],
  exports: [DemandsService],
})
export class DemandsModule {}
