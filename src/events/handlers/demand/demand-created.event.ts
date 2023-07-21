import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LoggerService } from 'src/core/logger/logger.service';
import { DemandEntity } from 'src/database/entities/demand.entity';
import { EVENTS } from 'src/events';
import { SlackUtilsService } from 'src/slack-utils/slack-utils.service';

@Injectable()
export class DemandCreatedEventHandler {
  /**
   *
   */
  constructor(
    private readonly loggerService: LoggerService,
    private readonly slackUtilsService: SlackUtilsService,
  ) {}

  @OnEvent(EVENTS.demand.demandCreated)
  async demandCreatedEvent(obj: { demand: DemandEntity }) {
    // this.slackUtilsService.sendMessageDefaultChannel(
    //   `
    //   ****************************************************************
    //   Demand ${obj.demand.name} (${obj.demand.uid}) has been created.
    //   Video: ${obj.demand.videoUrl}
    //   `,
    // );
  }
}
