import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LoggerService } from 'src/core/logger/logger.service';
import { DemandEntity } from 'src/database/entities/demand.entity';
import { EVENTS } from 'src/events';

@Injectable()
export class DemandCreatedEventHandler {
  /**
   *
   */
  constructor(private readonly loggerService: LoggerService) {}

  @OnEvent(EVENTS.demand.demandCreated)
  async demandCreatedEvent(obj: { demand: DemandEntity }) {
    this.loggerService.warn(obj);
  }
}
